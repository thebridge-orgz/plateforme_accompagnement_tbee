-- ============================================
-- SCHÉMA BASE DE DONNÉES TBEE - SUPABASE
-- Plateforme d'accompagnement vers l'alternance
-- Parcours en 5 semaines avec focus RQTH
-- ============================================

-- ============================================
-- 1. EXTENSION NÉCESSAIRE
-- ============================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 2. TYPES ENUM
-- ============================================

-- Type de rôle utilisateur
CREATE TYPE user_role AS ENUM ('student', 'admin');

-- Statut de module
CREATE TYPE module_status AS ENUM ('Brouillon', 'Publié');

-- Statut de validation
CREATE TYPE validation_status AS ENUM ('pending', 'validated', 'rejected');

-- Statut d'offre d'emploi
CREATE TYPE job_offer_status AS ENUM ('active', 'archived', 'applied');

-- ============================================
-- 3. TABLE PROFILES (Extension de auth.users)
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'student',
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  
  -- Informations onboarding
  has_rqth BOOLEAN DEFAULT false,
  rqth_details TEXT,
  desired_field TEXT,
  experience_level TEXT,
  motivation TEXT,
  
  -- Tracking de connexion (pour métriques temps réel)
  last_seen TIMESTAMPTZ,
  
  -- Métadonnées
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- ============================================
-- 4. TABLE MODULES (Contenu pédagogique)
-- ============================================

CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  thematic TEXT NOT NULL,
  week TEXT NOT NULL,
  order_in_week INTEGER NOT NULL DEFAULT 1,
  status module_status NOT NULL DEFAULT 'Brouillon',
  
  -- Contenu du module
  content JSONB, -- Structure flexible pour le contenu (texte, vidéos, exercices)
  
  -- Statistiques
  total_users INTEGER DEFAULT 0,
  completion_rate INTEGER DEFAULT 0,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- Index pour performances
CREATE INDEX idx_modules_status ON modules(status);
CREATE INDEX idx_modules_week ON modules(week);
CREATE INDEX idx_modules_thematic ON modules(thematic);

-- ============================================
-- 5. TABLE USER_MODULE_PROGRESS (Progression)
-- ============================================

CREATE TABLE user_module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  
  -- Progression
  status TEXT NOT NULL DEFAULT 'not_started', -- not_started, in_progress, completed, validated
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  
  -- Validation humaine (non-bloquante)
  validation_status validation_status DEFAULT 'pending',
  validation_feedback TEXT,
  validated_by UUID REFERENCES profiles(id),
  validated_at TIMESTAMPTZ,
  
  -- Contenu soumis par l'utilisateur (exercices, etc.)
  submission_data JSONB,
  
  -- Métadonnées
  started_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id, module_id)
);

-- Index pour performances
CREATE INDEX idx_progress_user ON user_module_progress(user_id);
CREATE INDEX idx_progress_module ON user_module_progress(module_id);
CREATE INDEX idx_progress_status ON user_module_progress(status);

-- ============================================
-- 6. TABLE JOB_OFFERS (Suivi des offres)
-- ============================================

CREATE TABLE job_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Informations de l'offre
  company_name TEXT NOT NULL,
  position_title TEXT NOT NULL,
  location TEXT,
  contract_type TEXT,
  description TEXT,
  url TEXT,
  
  -- Suivi
  status job_offer_status NOT NULL DEFAULT 'active',
  application_date DATE,
  notes TEXT,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_job_offers_user ON job_offers(user_id);
CREATE INDEX idx_job_offers_status ON job_offers(status);

-- Contrainte : Maximum 15 offres actives par utilisateur
CREATE OR REPLACE FUNCTION check_max_job_offers()
RETURNS TRIGGER AS $$
BEGIN
  IF (SELECT COUNT(*) FROM job_offers 
      WHERE user_id = NEW.user_id 
      AND status = 'active') >= 15 THEN
    RAISE EXCEPTION 'Vous ne pouvez pas suivre plus de 15 offres actives';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_max_job_offers
BEFORE INSERT ON job_offers
FOR EACH ROW
WHEN (NEW.status = 'active')
EXECUTE FUNCTION check_max_job_offers();

-- ============================================
-- 7. TABLE CV_FILES (CVs uploadés)
-- ============================================

CREATE TABLE cv_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  
  -- Informations du fichier
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL, -- Chemin dans Supabase Storage
  file_size INTEGER,
  mime_type TEXT,
  
  -- Statut
  is_active BOOLEAN DEFAULT true,
  
  -- Métadonnées
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_cv_files_user ON cv_files(user_id);
CREATE INDEX idx_cv_files_active ON cv_files(is_active);

-- ============================================
-- 8. TABLE ADMIN_VALIDATIONS (Historique)
-- ============================================

CREATE TABLE admin_validations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES profiles(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  module_id UUID NOT NULL REFERENCES modules(id),
  progress_id UUID NOT NULL REFERENCES user_module_progress(id) ON DELETE CASCADE,
  
  -- Validation
  decision validation_status NOT NULL,
  feedback TEXT,
  
  -- Métadonnées
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performances
CREATE INDEX idx_validations_admin ON admin_validations(admin_id);
CREATE INDEX idx_validations_user ON admin_validations(user_id);

-- ============================================
-- 9. FUNCTIONS UTILITAIRES
-- ============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer aux tables concernées
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_modules_updated_at
BEFORE UPDATE ON modules
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_progress_updated_at
BEFORE UPDATE ON user_module_progress
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_job_offers_updated_at
BEFORE UPDATE ON job_offers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================
-- 10. ROW LEVEL SECURITY (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_validations ENABLE ROW LEVEL SECURITY;

-- ============================================
-- POLICIES - PROFILES
-- ============================================

-- Les utilisateurs peuvent voir leur propre profil
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

-- Les utilisateurs peuvent mettre à jour leur propre profil
CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Les admins peuvent voir tous les profils
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- ============================================
-- POLICIES - MODULES
-- ============================================

-- Tout le monde peut voir les modules publiés
CREATE POLICY "Anyone can view published modules"
ON modules FOR SELECT
USING (status = 'Publié');

-- Les admins peuvent tout voir
CREATE POLICY "Admins can view all modules"
ON modules FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Les admins peuvent créer des modules
CREATE POLICY "Admins can create modules"
ON modules FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Les admins peuvent mettre à jour des modules
CREATE POLICY "Admins can update modules"
ON modules FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- ============================================
-- POLICIES - USER_MODULE_PROGRESS
-- ============================================

-- Les utilisateurs peuvent voir leur propre progression
CREATE POLICY "Users can view own progress"
ON user_module_progress FOR SELECT
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leur propre progression
CREATE POLICY "Users can create own progress"
ON user_module_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leur propre progression
CREATE POLICY "Users can update own progress"
ON user_module_progress FOR UPDATE
USING (auth.uid() = user_id);

-- Les admins peuvent voir toutes les progressions
CREATE POLICY "Admins can view all progress"
ON user_module_progress FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Les admins peuvent mettre à jour toutes les progressions (validation)
CREATE POLICY "Admins can update all progress"
ON user_module_progress FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- ============================================
-- POLICIES - JOB_OFFERS
-- ============================================

-- Les utilisateurs peuvent voir leurs propres offres
CREATE POLICY "Users can view own job offers"
ON job_offers FOR SELECT
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent créer leurs propres offres
CREATE POLICY "Users can create own job offers"
ON job_offers FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent mettre à jour leurs propres offres
CREATE POLICY "Users can update own job offers"
ON job_offers FOR UPDATE
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres offres
CREATE POLICY "Users can delete own job offers"
ON job_offers FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- POLICIES - CV_FILES
-- ============================================

-- Les utilisateurs peuvent voir leurs propres CVs
CREATE POLICY "Users can view own cv files"
ON cv_files FOR SELECT
USING (auth.uid() = user_id);

-- Les utilisateurs peuvent uploader leurs propres CVs
CREATE POLICY "Users can upload own cv files"
ON cv_files FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Les utilisateurs peuvent supprimer leurs propres CVs
CREATE POLICY "Users can delete own cv files"
ON cv_files FOR DELETE
USING (auth.uid() = user_id);

-- ============================================
-- POLICIES - ADMIN_VALIDATIONS
-- ============================================

-- Les admins peuvent créer des validations
CREATE POLICY "Admins can create validations"
ON admin_validations FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Les admins peuvent voir toutes les validations
CREATE POLICY "Admins can view all validations"
ON admin_validations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Les utilisateurs peuvent voir leurs propres validations
CREATE POLICY "Users can view own validations"
ON admin_validations FOR SELECT
USING (auth.uid() = user_id);

-- ============================================
-- 11. DONNÉES DE TEST (OPTIONNEL)
-- ============================================

-- Modules de test (à exécuter après création d'un admin)
INSERT INTO modules (name, description, thematic, week, order_in_week, status, content) VALUES
('Rédiger son CV', 'Apprenez à créer un CV professionnel et attractif adapté à l''alternance', 'CV et candidature', 'Semaine 1', 1, 'Publié', '{"lessons": [{"title": "Structure d''un CV", "content": "..."}, {"title": "Mise en valeur des compétences", "content": "..."}]}'),
('Comprendre l''alternance', 'Découvrez le fonctionnement de l''alternance et ses avantages', 'Alternance', 'Semaine 1', 2, 'Publié', '{"lessons": [{"title": "Qu''est-ce que l''alternance?", "content": "..."}, {"title": "Droits et devoirs", "content": "..."}]}'),
('Préparer son entretien', 'Maîtrisez les techniques d''entretien d''embauche', 'Entretien', 'Semaine 2', 1, 'Publié', '{"lessons": [{"title": "Questions fréquentes", "content": "..."}, {"title": "Communication non-verbale", "content": "..."}]}'),
('Rechercher son entreprise', 'Stratégies pour trouver votre entreprise d''alternance', 'Recherche d''emploi', 'Semaine 3', 1, 'Publié', '{"lessons": [{"title": "Identifier les entreprises cibles", "content": "..."}, {"title": "Réseaux et plateformes", "content": "..."}]}'),
('Postuler efficacement', 'Optimisez vos candidatures et démarquez-vous', 'CV et candidature', 'Semaine 3', 2, 'Publié', '{"lessons": [{"title": "La lettre de motivation", "content": "..."}, {"title": "Relances et suivi", "content": "..."}]}');

-- ============================================
-- 12. VUES UTILES (OPTIONNEL)
-- ============================================

-- Vue pour statistiques globales
CREATE OR REPLACE VIEW admin_stats AS
SELECT
  (SELECT COUNT(*) FROM profiles WHERE role = 'student') as total_students,
  (SELECT COUNT(*) FROM profiles WHERE role = 'admin') as total_admins,
  (SELECT COUNT(*) FROM modules WHERE status = 'Publié') as published_modules,
  (SELECT COUNT(*) FROM modules WHERE status = 'Brouillon') as draft_modules,
  (SELECT COUNT(*) FROM user_module_progress WHERE status = 'completed') as total_completions,
  (SELECT ROUND(AVG(progress_percentage))::INTEGER FROM user_module_progress) as avg_progress;

-- Vue pour dashboard étudiant
CREATE OR REPLACE VIEW student_dashboard AS
SELECT
  p.id as user_id,
  p.full_name,
  COUNT(DISTINCT ump.module_id) as modules_started,
  COUNT(DISTINCT CASE WHEN ump.status = 'completed' THEN ump.module_id END) as modules_completed,
  COALESCE(ROUND(AVG(ump.progress_percentage))::INTEGER, 0) as avg_progress,
  COUNT(DISTINCT jo.id) as active_job_offers
FROM profiles p
LEFT JOIN user_module_progress ump ON p.id = ump.user_id
LEFT JOIN job_offers jo ON p.id = jo.user_id AND jo.status = 'active'
WHERE p.role = 'student'
GROUP BY p.id, p.full_name;

-- ============================================
-- FIN DU SCHÉMA
-- ============================================

-- Note: N'oubliez pas de configurer Supabase Storage pour les CVs
-- Créer un bucket "cv-files" avec les policies appropriées