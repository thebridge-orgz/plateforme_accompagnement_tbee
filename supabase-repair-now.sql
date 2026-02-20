-- ============================================
-- 🚨 RÉPARATION D'URGENCE - CONNEXION BLOQUÉE
-- ============================================
-- Exécutez ce script si vous êtes bloqué sur "Connexion en cours..."
-- Temps d'exécution : 5 secondes
-- Date : 13 février 2026

-- ============================================
-- ÉTAPE 1 : ACTIVER RLS
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- ÉTAPE 2 : NETTOYER LES ANCIENNES POLITIQUES
-- ============================================

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Utilisateurs peuvent lire leur propre profil" ON public.profiles;
DROP POLICY IF EXISTS "Utilisateurs peuvent insérer leur propre profil" ON public.profiles;
DROP POLICY IF EXISTS "Utilisateurs peuvent mettre à jour leur propre profil" ON public.profiles;
DROP POLICY IF EXISTS "Admins peuvent lire tous les profils" ON public.profiles;

-- ============================================
-- ÉTAPE 3 : CRÉER LES BONNES POLITIQUES
-- ============================================

-- Politique 1 : Lecture de son propre profil
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Politique 2 : Insertion de son propre profil (pour le trigger)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Politique 3 : Mise à jour de son propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Politique 4 : Admins peuvent tout lire
CREATE POLICY "Admins can read all profiles"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- ============================================
-- ÉTAPE 4 : VÉRIFIER LE TRIGGER
-- ============================================

-- Créer ou recréer la fonction handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'student' -- Force le rôle à 'student' (sécurité)
  );
  RETURN NEW;
EXCEPTION
  WHEN unique_violation THEN
    -- Si le profil existe déjà, on ne fait rien
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Recréer le trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- ÉTAPE 5 : VÉRIFICATION
-- ============================================

-- Afficher les politiques créées
SELECT 
  policyname AS "Politique",
  cmd AS "Action"
FROM pg_policies
WHERE tablename = 'profiles'
ORDER BY policyname;

-- Afficher les profils existants
SELECT 
  id,
  email,
  first_name || ' ' || last_name AS "Nom complet",
  role AS "Rôle",
  created_at AS "Créé le"
FROM public.profiles
ORDER BY created_at DESC;

-- ============================================
-- 🎉 TERMINÉ !
-- ============================================
-- Si vous voyez :
-- - 4 politiques listées
-- - Vos profils utilisateurs listés
-- → C'est bon ! Testez la connexion maintenant.
--
-- Si votre profil n'apparaît PAS dans la liste :
-- → Exécutez le script /supabase-create-missing-profile.sql
-- ============================================
