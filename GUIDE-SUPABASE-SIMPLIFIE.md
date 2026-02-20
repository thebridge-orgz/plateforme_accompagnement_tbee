# 🚀 GUIDE SIMPLIFIÉ SUPABASE POUR TBEE

**Temps estimé : 20 minutes**

---

## 📍 ÉTAPE 1 : Créer votre projet Supabase (5 min)

1. Allez sur **https://supabase.com** et connectez-vous (ou créez un compte)
2. Cliquez sur **"New Project"**
3. Remplissez :
   - **Name:** `tbee-production`
   - **Database Password:** Choisissez un mot de passe fort et **NOTEZ-LE** ⚠️
   - **Region:** `Europe (Paris)` (pour la France)
   - **Pricing Plan:** `Free` (suffisant pour commencer)
4. Cliquez sur **"Create new project"**
5. ⏳ Attendez 2-3 minutes (préparez-vous un café ☕)

---

## 📍 ÉTAPE 2 : Copier-coller le schéma SQL (2 min)

### 2.1 Ouvrir l'éditeur SQL

1. Dans le menu de gauche, cliquez sur **"SQL Editor"** (icône 📝)
2. Cliquez sur **"+ New query"** en haut

### 2.2 Copier TOUT le code ci-dessous

**Sélectionnez TOUT le code entre les lignes de tirets et copiez-le (Ctrl+A puis Ctrl+C) :**

```sql
-- ============================================
-- SCHÉMA COMPLET TBEE - Copier-coller tout ce code
-- ============================================

-- 1. Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Types personnalisés
CREATE TYPE user_role AS ENUM ('student', 'admin');
CREATE TYPE module_status AS ENUM ('Brouillon', 'Publié');
CREATE TYPE validation_status AS ENUM ('pending', 'validated', 'rejected');
CREATE TYPE job_offer_status AS ENUM ('active', 'archived', 'applied');

-- 3. Table PROFILES (Profils utilisateurs)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'student',
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  has_rqth BOOLEAN DEFAULT false,
  rqth_details TEXT,
  desired_field TEXT,
  experience_level TEXT,
  motivation TEXT,
  last_seen TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);

-- 4. Table MODULES (Contenu des formations)
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  thematic TEXT NOT NULL,
  week TEXT NOT NULL,
  order_in_week INTEGER NOT NULL DEFAULT 1,
  status module_status NOT NULL DEFAULT 'Brouillon',
  content JSONB,
  total_users INTEGER DEFAULT 0,
  completion_rate INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

CREATE INDEX idx_modules_status ON modules(status);
CREATE INDEX idx_modules_week ON modules(week);

-- 5. Table USER_MODULE_PROGRESS (Progression des étudiants)
CREATE TABLE user_module_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'not_started',
  progress_percentage INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  validation_status validation_status DEFAULT 'pending',
  validation_feedback TEXT,
  validated_by UUID REFERENCES profiles(id),
  validated_at TIMESTAMPTZ,
  submission_data JSONB,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, module_id)
);

CREATE INDEX idx_progress_user ON user_module_progress(user_id);
CREATE INDEX idx_progress_module ON user_module_progress(module_id);

-- 6. Table JOB_OFFERS (Suivi des 15 offres max)
CREATE TABLE job_offers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  position_title TEXT NOT NULL,
  location TEXT,
  contract_type TEXT,
  description TEXT,
  url TEXT,
  status job_offer_status NOT NULL DEFAULT 'active',
  application_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_job_offers_user ON job_offers(user_id);

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

-- 7. Table CV_FILES (CVs uploadés)
CREATE TABLE cv_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  is_active BOOLEAN DEFAULT true,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cv_files_user ON cv_files(user_id);

-- 8. Table ADMIN_VALIDATIONS (Historique des validations)
CREATE TABLE admin_validations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_id UUID NOT NULL REFERENCES profiles(id),
  user_id UUID NOT NULL REFERENCES profiles(id),
  module_id UUID NOT NULL REFERENCES modules(id),
  progress_id UUID NOT NULL REFERENCES user_module_progress(id) ON DELETE CASCADE,
  decision validation_status NOT NULL,
  feedback TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_validations_admin ON admin_validations(admin_id);

-- 9. Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON modules FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_progress_updated_at BEFORE UPDATE ON user_module_progress FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER update_job_offers_updated_at BEFORE UPDATE ON job_offers FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 10. Activer Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_validations ENABLE ROW LEVEL SECURITY;

-- 11. Policies pour PROFILES
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 12. Policies pour MODULES
CREATE POLICY "Anyone can view published modules" ON modules FOR SELECT USING (status = 'Publié');
CREATE POLICY "Admins can view all modules" ON modules FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Admins can create modules" ON modules FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Admins can update modules" ON modules FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 13. Policies pour USER_MODULE_PROGRESS
CREATE POLICY "Users can view own progress" ON user_module_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own progress" ON user_module_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_module_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all progress" ON user_module_progress FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Admins can update all progress" ON user_module_progress FOR UPDATE USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));

-- 14. Policies pour JOB_OFFERS
CREATE POLICY "Users can view own job offers" ON job_offers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own job offers" ON job_offers FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own job offers" ON job_offers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own job offers" ON job_offers FOR DELETE USING (auth.uid() = user_id);

-- 15. Policies pour CV_FILES
CREATE POLICY "Users can view own cv files" ON cv_files FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upload own cv files" ON cv_files FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own cv files" ON cv_files FOR DELETE USING (auth.uid() = user_id);

-- 16. Policies pour ADMIN_VALIDATIONS
CREATE POLICY "Admins can create validations" ON admin_validations FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Admins can view all validations" ON admin_validations FOR SELECT USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'));
CREATE POLICY "Users can view own validations" ON admin_validations FOR SELECT USING (auth.uid() = user_id);

-- 17. Données de test (5 modules)
INSERT INTO modules (name, description, thematic, week, order_in_week, status) VALUES
('Découverte de l''alternance', 'Introduction au programme et aux formations disponibles', 'Alternance', 'Semaine 1', 1, 'Publié'),
('CV & LinkedIn', 'Créer un CV professionnel et optimiser son profil LinkedIn', 'CV et candidature', 'Semaine 2', 1, 'Publié'),
('Recherche d''entreprise', 'Stratégies pour trouver votre entreprise d''alternance', 'Recherche d''emploi', 'Semaine 3', 1, 'Publié'),
('Candidatures', 'Rédiger des candidatures efficaces et personnalisées', 'CV et candidature', 'Semaine 4', 1, 'Publié'),
('Entretiens', 'Préparer et réussir ses entretiens d''embauche', 'Entretien', 'Semaine 5', 1, 'Publié');

-- ============================================
-- ✅ FIN DU SCHÉMA - Tout est prêt !
-- ============================================
```

### 2.3 Exécuter le code

1. **Collez** tout le code dans l'éditeur SQL de Supabase
2. Cliquez sur **"Run"** (ou appuyez sur `Ctrl + Enter`)
3. ✅ Attendez 5-10 secondes
4. **Vérifiez** qu'il y a un message vert `Success. No rows returned`

> ⚠️ **Si vous voyez une erreur rouge**, copiez l'erreur et dites-moi ce qui ne va pas.

---

## 📍 ÉTAPE 3 : Configurer le Storage pour les CVs (3 min)

### 3.1 Créer le bucket

1. Dans le menu de gauche, cliquez sur **"Storage"** (icône 📁)
2. Cliquez sur **"Create a new bucket"**
3. Remplissez :
   - **Name:** `cv-files`
   - **Public bucket:** ❌ **NON** (laissez décoché)
4. Cliquez sur **"Create bucket"**

### 3.2 Configurer les permissions

1. Cliquez sur le bucket **`cv-files`** que vous venez de créer
2. Cliquez sur **"Policies"** dans le sous-menu
3. Cliquez sur **"New policy"**
4. Cliquez sur **"For full customization"**

**Copiez-collez les 3 policies suivantes une par une :**

#### Policy 1 : Upload des CVs

```sql
CREATE POLICY "Users can upload their own CVs"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'cv-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

Cliquez sur **"Review"** puis **"Save policy"**

#### Policy 2 : Lecture des CVs

```sql
CREATE POLICY "Users can view their own CVs"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'cv-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

Cliquez sur **"Review"** puis **"Save policy"**

#### Policy 3 : Suppression des CVs

```sql
CREATE POLICY "Users can delete their own CVs"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'cv-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

Cliquez sur **"Review"** puis **"Save policy"**

---

## 📍 ÉTAPE 4 : Récupérer vos clés API (2 min)

### 4.1 Trouver les clés

1. Cliquez sur **"Project Settings"** (icône ⚙️ en bas à gauche)
2. Cliquez sur **"API"** dans le menu
3. **Notez ces 2 informations** (vous en aurez besoin) :

```
Project URL: https://xxxxxxxxx.supabase.co
anon public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> 📋 **Copiez ces 2 valeurs dans un fichier texte**, vous en aurez besoin pour Vercel.

---

## 📍 ÉTAPE 5 : Créer votre premier compte admin (3 min)

### Méthode A : Via l'interface Supabase (Recommandé)

1. Allez dans **"Authentication"** > **"Users"** dans le menu de gauche
2. Cliquez sur **"Add user"**
3. Remplissez :
   - **Email:** votre adresse email admin (ex: `admin@tbee.fr`)
   - **Password:** un mot de passe fort (notez-le !)
   - **Auto Confirm User:** ✅ **OUI** (cochez la case)
4. Cliquez sur **"Create user"**
5. ✅ Un utilisateur apparaît dans la liste - **copiez son ID** (format : `123e4567-e89b-12d3-a456-426614174000`)

### Créer le profil admin

1. Retournez dans **"SQL Editor"**
2. Cliquez sur **"+ New query"**
3. **Remplacez** `VOTRE-UUID-ICI` et `votre-email@example.com` par vos vraies valeurs :

```sql
-- Créer le profil admin
INSERT INTO profiles (id, email, role, full_name, onboarding_completed)
VALUES (
  'VOTRE-UUID-ICI',  -- ⚠️ Remplacez par l'UUID copié ci-dessus
  'votre-email@example.com',  -- ⚠️ Remplacez par votre email
  'admin',
  'Votre Nom',  -- ⚠️ Remplacez par votre nom
  true
);
```

4. Cliquez sur **"Run"**
5. ✅ Vous devriez voir `Success. 1 row created`

---

## 📍 ÉTAPE 6 : Configurer l'authentification (2 min)

### 6.1 URLs de redirection

1. Allez dans **"Authentication"** > **"URL Configuration"**
2. **Ajoutez ces URLs** :

**Site URL:**
```
http://localhost:5173
```

**Redirect URLs** (une URL par ligne) :
```
http://localhost:5173/**
https://votre-app.vercel.app/**
```

> ⚠️ **Remplacez** `votre-app.vercel.app` par votre vraie URL Vercel plus tard

3. Cliquez sur **"Save"**

### 6.2 Vérifier les providers

1. Allez dans **"Authentication"** > **"Providers"**
2. **Vérifiez que "Email" est activé** (normalement c'est le cas par défaut)

---

## 📍 ÉTAPE 7 : Tester que tout fonctionne (3 min)

### 7.1 Vérifier les tables

1. Allez dans **"Table Editor"** dans le menu de gauche
2. Vous devriez voir ces tables :
   - ✅ `profiles`
   - ✅ `modules`
   - ✅ `user_module_progress`
   - ✅ `job_offers`
   - ✅ `cv_files`
   - ✅ `admin_validations`

### 7.2 Vérifier les données de test

1. Cliquez sur la table **`modules`**
2. Vous devriez voir **5 modules** :
   - Découverte de l'alternance
   - CV & LinkedIn
   - Recherche d'entreprise
   - Candidatures
   - Entretiens

### 7.3 Vérifier votre compte admin

1. Cliquez sur la table **`profiles`**
2. Vous devriez voir **1 ligne** avec :
   - Votre email
   - Role: `admin`
   - onboarding_completed: `true`

---

## 📍 ÉTAPE 8 : Déployer sur Vercel (5 min)

### 8.1 Configurer les variables d'environnement

1. Allez sur **https://vercel.com** et connectez-vous
2. Cliquez sur **"Import Project"**
3. Sélectionnez votre repository GitHub `tbee`
4. Dans **"Environment Variables"**, ajoutez :

```
VITE_SUPABASE_URL = https://xxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

> ⚠️ Utilisez les valeurs que vous avez copiées à l'étape 4

5. Cliquez sur **"Deploy"**
6. ⏳ Attendez 2-3 minutes que le déploiement se termine

### 8.2 Mettre à jour l'URL dans Supabase

1. Une fois déployé, **copiez l'URL Vercel** (ex: `https://tbee-abc123.vercel.app`)
2. Retournez dans **Supabase** > **Authentication** > **URL Configuration**
3. **Ajoutez** cette URL dans "Redirect URLs" :
   ```
   https://tbee-abc123.vercel.app/**
   ```
4. Cliquez sur **"Save"**

---

## ✅ CHECKLIST FINALE

Vérifiez que tout est OK :

- [ ] Projet Supabase créé
- [ ] Schéma SQL exécuté sans erreurs
- [ ] Bucket `cv-files` créé avec 3 policies
- [ ] Clés API notées (Project URL + anon key)
- [ ] Compte admin créé et profil créé dans la table `profiles`
- [ ] URLs de redirection configurées
- [ ] 5 modules de test visibles dans la table `modules`
- [ ] App déployée sur Vercel avec les variables d'environnement
- [ ] URL Vercel ajoutée dans Supabase

---

## 🎉 C'EST TERMINÉ !

Votre base de données Supabase est **prête et fonctionnelle** ! 🚀

### 🧪 Test final

1. Allez sur votre app Vercel : `https://votre-app.vercel.app`
2. Connectez-vous avec votre compte admin
3. Vous devriez voir :
   - ✅ L'interface admin
   - ✅ Les 5 modules dans le dashboard
   - ✅ Les statistiques (même si vides pour l'instant)

---

## 🆘 PROBLÈMES COURANTS

### ❌ "relation does not exist"
**Solution :** Le schéma SQL n'a pas été exécuté correctement. Retournez à l'étape 2 et réexécutez tout le code SQL.

### ❌ "JWT expired" ou "Invalid token"
**Solution :** Vérifiez que vous avez bien copié la bonne `anon key` depuis Project Settings > API.

### ❌ "Not authorized" ou page blanche
**Solution :** Vérifiez que votre profil admin existe bien dans la table `profiles` avec `role = 'admin'`.

### ❌ Les modules ne s'affichent pas
**Solution :** Allez dans Table Editor > `modules` et vérifiez que les 5 modules ont bien `status = 'Publié'`.

### ❌ Erreur au déploiement Vercel
**Solution :** Vérifiez que les variables d'environnement `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` sont bien définies dans les settings Vercel.

---

## 📞 BESOIN D'AIDE ?

Si quelque chose ne fonctionne pas :

1. **Copiez l'erreur exacte** que vous voyez
2. **Vérifiez** quelle étape a échoué
3. **Relisez** l'étape en question
4. Si le problème persiste, dites-moi à quelle étape vous êtes bloqué !

---

**Bon courage ! 💪**
