-- =============================================================
-- TBEE - Script RLS DEFINITIF pour la table `profiles`
-- =============================================================
-- CE SCRIPT FAIT TOUT : supprime les anciennes policies,
-- recrée les bonnes, et vérifie le trigger de création de profil.
--
-- INSTRUCTIONS :
-- 1. Va sur https://supabase.com/dashboard
-- 2. Sélectionne ton projet TBEE
-- 3. Va dans "SQL Editor" (icône terminal à gauche)
-- 4. Colle ce script EN ENTIER
-- 5. Clique sur "Run" (ou Ctrl+Enter)
-- 6. Tu dois voir "Success. No rows returned" -> c'est normal et correct
-- 7. Redémarre ton serveur local (npm run dev)
-- =============================================================


-- =============================================
-- ETAPE 1 : Supprimer TOUTES les anciennes policies sur profiles
-- =============================================
-- On supprime tout pour repartir de zéro (pas d'erreur si elles n'existent pas)

DO $$
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN
        SELECT policyname
        FROM pg_policies
        WHERE tablename = 'profiles' AND schemaname = 'public'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON public.profiles', pol.policyname);
        RAISE NOTICE 'Policy supprimee: %', pol.policyname;
    END LOOP;
END $$;


-- =============================================
-- ETAPE 2 : S'assurer que RLS est activé
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;


-- =============================================
-- ETAPE 3 : Créer les nouvelles policies SANS RECURSION
-- =============================================
-- IMPORTANT : On utilise auth.jwt() pour lire le rôle depuis le token JWT
-- au lieu de faire un SELECT sur profiles (ce qui causait la boucle infinie)

-- 3a. Un utilisateur peut lire SON PROPRE profil
CREATE POLICY "Users can view own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id);

-- 3b. Les admins peuvent lire TOUS les profils
-- On lit le rôle depuis le JWT (auth.jwt()), PAS depuis la table profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- 3c. Un utilisateur peut modifier SON PROPRE profil
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 3d. Les admins peuvent modifier TOUS les profils
CREATE POLICY "Admins can update all profiles"
ON public.profiles
FOR UPDATE
USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
)
WITH CHECK (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);

-- 3e. Permettre l'insertion de profil (pour le trigger de création)
-- Le service_role bypass RLS, mais on ajoute cette policy par sécurité
CREATE POLICY "Allow insert for authenticated users"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- 3f. Les admins peuvent supprimer des profils
CREATE POLICY "Admins can delete profiles"
ON public.profiles
FOR DELETE
USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
);


-- =============================================
-- ETAPE 4 : Créer/Remplacer le trigger de création automatique de profil
-- =============================================
-- Quand un utilisateur s'inscrit via signUp(), ce trigger crée
-- automatiquement une ligne dans `profiles` avec les infos du user_metadata

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER  -- Important: s'exécute avec les droits du propriétaire (bypass RLS)
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, first_name, last_name, role, created_at, updated_at)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'last_name', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'role', 'student'),
        NOW(),
        NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
        email = EXCLUDED.email,
        first_name = COALESCE(EXCLUDED.first_name, profiles.first_name),
        last_name = COALESCE(EXCLUDED.last_name, profiles.last_name),
        updated_at = NOW();
    
    RETURN NEW;
END;
$$;

-- Supprimer l'ancien trigger s'il existe, puis le recréer
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();


-- =============================================
-- ETAPE 5 : Vérification
-- =============================================
-- Affiche les policies actuelles pour confirmer que tout est bon

SELECT 
    policyname AS "Policy",
    cmd AS "Operation",
    qual AS "USING condition (simplifie)"
FROM pg_policies
WHERE tablename = 'profiles' AND schemaname = 'public'
ORDER BY policyname;
