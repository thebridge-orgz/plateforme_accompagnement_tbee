-- ========================================
-- 🔧 SCRIPT DE RÉPARATION COMPLÈTE SUPABASE - TBEE
-- ========================================
-- Ce script configure TOUTES les tables, politiques et triggers
-- nécessaires pour l'authentification TBEE
--
-- 📋 À EXÉCUTER DANS : Supabase Dashboard → SQL Editor → New Query
-- ⏱️ Temps d'exécution : ~5 secondes
-- ========================================

-- ========================================
-- ÉTAPE 1 : SUPPRESSION ET RECRÉATION PROPRE
-- ========================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- ========================================
-- ÉTAPE 2 : CRÉER LA TABLE PROFILES
-- ========================================
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    first_name TEXT NOT NULL DEFAULT '',
    last_name TEXT NOT NULL DEFAULT '',
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Créer un index pour améliorer les performances
CREATE INDEX idx_profiles_email ON public.profiles(email);
CREATE INDEX idx_profiles_role ON public.profiles(role);

-- ========================================
-- ÉTAPE 3 : ACTIVER ROW LEVEL SECURITY
-- ========================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ========================================
-- ÉTAPE 4 : CRÉER LES POLITIQUES RLS (PERMISSIVES)
-- ========================================

-- Politique 1 : Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

-- Politique 2 : Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Politique 3 : Permettre l'insertion pour les utilisateurs authentifiés
CREATE POLICY "Enable insert for authenticated users only"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Politique 4 : Les admins peuvent voir tous les profils
CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- ========================================
-- ÉTAPE 5 : CRÉER LA FONCTION DE TRIGGER
-- ========================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Insérer le nouveau profil utilisateur
    INSERT INTO public.profiles (
        id, 
        email, 
        first_name, 
        last_name, 
        role
    )
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'role', 'student')
    );
    
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    -- En cas d'erreur, logger et continuer (ne pas bloquer l'inscription)
    RAISE WARNING 'Erreur lors de la création du profil: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- ========================================
-- ÉTAPE 6 : ACTIVER LE TRIGGER
-- ========================================
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ========================================
-- ÉTAPE 7 : CRÉER UN UTILISATEUR ADMIN DE TEST
-- ========================================
-- ⚠️ ATTENTION : Changez l'email et le mot de passe !
-- ⚠️ Cette commande peut échouer si l'email existe déjà, c'est normal.

-- Pour créer un admin, utilisez cette commande (décommentez) :
-- INSERT INTO auth.users (
--     instance_id,
--     id,
--     aud,
--     role,
--     email,
--     encrypted_password,
--     email_confirmed_at,
--     raw_user_meta_data,
--     created_at,
--     updated_at
-- ) VALUES (
--     '00000000-0000-0000-0000-000000000000',
--     gen_random_uuid(),
--     'authenticated',
--     'authenticated',
--     'admin@tbee.fr',
--     crypt('AdminTBEE2024!', gen_salt('bf')),
--     NOW(),
--     '{"first_name": "Admin", "last_name": "TBEE", "role": "admin"}'::jsonb,
--     NOW(),
--     NOW()
-- );

-- OU créez l'admin via l'interface Supabase :
-- 1. Allez dans Authentication → Users → Add user
-- 2. Email : admin@tbee.fr
-- 3. Password : AdminTBEE2024!
-- 4. User metadata : {"first_name": "Admin", "last_name": "TBEE", "role": "admin"}

-- ========================================
-- ÉTAPE 8 : VÉRIFICATION
-- ========================================

-- Vérifier que la table existe
SELECT 
    'Table profiles' AS element,
    CASE WHEN EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') 
        THEN '✅ OK' 
        ELSE '❌ ERREUR' 
    END AS status;

-- Vérifier que RLS est activé
SELECT 
    'RLS activé' AS element,
    CASE WHEN relrowsecurity THEN '✅ OK' ELSE '❌ ERREUR' END AS status
FROM pg_class
WHERE relname = 'profiles';

-- Vérifier les politiques
SELECT 
    'Politiques RLS' AS element,
    COUNT(*)::text || ' politiques créées' AS status
FROM pg_policies
WHERE tablename = 'profiles';

-- Vérifier que le trigger existe
SELECT 
    'Trigger créé' AS element,
    CASE WHEN EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
    ) THEN '✅ OK' ELSE '❌ ERREUR' END AS status;

-- Vérifier les profils existants
SELECT 
    'Profils existants' AS element,
    COUNT(*)::text || ' profils' AS status
FROM public.profiles;

-- ========================================
-- ÉTAPE 9 : TESTS
-- ========================================

-- Test 1 : Vérifier qu'on peut lire les profils (devrait être vide au début)
SELECT 'Test lecture' AS test, COUNT(*) AS nb_profils FROM public.profiles;

-- Test 2 : Afficher tous les profils (pour debug)
SELECT 
    id, 
    email, 
    first_name, 
    last_name, 
    role, 
    created_at 
FROM public.profiles
ORDER BY created_at DESC;

-- ========================================
-- 📊 RÉSULTAT ATTENDU
-- ========================================
-- Si tout fonctionne, vous devriez voir :
-- ✅ Table profiles : OK
-- ✅ RLS activé : OK
-- ✅ 4 politiques créées
-- ✅ Trigger créé : OK
-- ✅ X profils (selon vos utilisateurs existants)
--
-- ========================================
-- 🆘 EN CAS D'ERREUR
-- ========================================
-- 1. Vérifiez les permissions : Supabase → Settings → API
-- 2. Vérifiez que vous êtes connecté en tant qu'owner du projet
-- 3. Relancez ce script (il supprime tout avant de recréer)
-- 4. Consultez les logs : Supabase → Logs → Postgres Logs
-- ========================================

SELECT '🎉 Configuration terminée !' AS message;
