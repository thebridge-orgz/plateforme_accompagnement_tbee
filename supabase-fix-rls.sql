-- ============================================
-- SCRIPT DE RÉPARATION - PROBLÈME DE CONNEXION
-- ============================================
-- Ce script corrige le problème de connexion bloquée
-- Exécutez-le si vous avez le message "Connexion en cours..." infini

-- 1. Supprimer les anciennes politiques (si elles existent)
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;

-- 2. Recréer les politiques RLS CORRECTES
-- Permettre la lecture de son propre profil
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Permettre l'insertion de son propre profil (IMPORTANT pour le trigger)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Permettre la mise à jour de son propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Permettre aux admins de tout lire
CREATE POLICY "Admins can read all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 3. Vérifier que le trigger existe
-- Si ce message d'erreur apparaît : "trigger does not exist", exécutez le script complet /supabase-setup.sql
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. Vérifier les profils existants
-- Cette requête affiche tous les profils (utile pour déboguer)
SELECT 
  id,
  email,
  first_name,
  last_name,
  role,
  created_at
FROM public.profiles
ORDER BY created_at DESC;

-- ============================================
-- RÉSULTAT ATTENDU
-- ============================================
-- Vous devriez voir :
-- - 4 politiques créées avec succès
-- - 1 trigger créé avec succès
-- - La liste de tous les profils existants

-- ============================================
-- TEST APRÈS EXÉCUTION
-- ============================================
-- 1. Déconnectez-vous de l'application
-- 2. Reconnectez-vous avec un compte existant
-- 3. Vous devriez être redirigé vers le dashboard en 1-2 secondes

-- Si le problème persiste, consultez /DEBUG-CONNEXION.md
