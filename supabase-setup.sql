-- ============================================
-- SCRIPT DE CONFIGURATION SUPABASE POUR TBEE
-- ============================================
-- À exécuter dans Supabase SQL Editor

-- 1. Créer la table profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Activer Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Créer les politiques RLS
-- Les utilisateurs peuvent lire leur propre profil
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Les utilisateurs peuvent insérer leur propre profil (pour le trigger)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Les admins peuvent tout lire
CREATE POLICY "Admins can read all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. Créer une fonction pour créer automatiquement un profil lors de l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'student'  -- 🔒 TOUJOURS 'student' - Les admins sont créés manuellement
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. Créer un trigger pour appeler la fonction lors de l'inscription
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 6. Créer un admin par défaut (MODIFIEZ L'EMAIL ET LE MOT DE PASSE)
-- NOTE: Cet utilisateur doit d'abord être créé via Supabase Auth
-- Puis exécutez cette requête pour lui donner le rôle admin
-- Remplacez 'admin@tbee.fr' par l'email de votre admin

-- INSERT INTO public.profiles (id, email, first_name, last_name, role)
-- SELECT id, email, 'Admin', 'TBEE', 'admin'
-- FROM auth.users
-- WHERE email = 'admin@tbee.fr'
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';

-- ============================================
-- INSTRUCTIONS D'UTILISATION
-- ============================================
-- 1. Copiez tout ce script
-- 2. Allez dans Supabase → SQL Editor
-- 3. Créez une nouvelle requête et collez ce script
-- 4. Cliquez sur "Run" pour exécuter
-- 5. Pour créer un admin :
--    - Décommentez les lignes 66-70
--    - Remplacez 'admin@tbee.fr' par l'email de votre admin
--    - Créez d'abord cet utilisateur via Authentication > Users
--    - Puis exécutez cette requête UPDATE