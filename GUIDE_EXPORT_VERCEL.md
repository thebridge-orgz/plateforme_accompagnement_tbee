# 🚀 Guide d'Export et de Déploiement TBEE

Ce guide explique comment exporter le code source depuis Figma Make et le déployer sur Vercel avec Supabase.

---

## 📦 Étape 1 : Exporter le Code Source

### Depuis Figma Make

1. **Cliquer sur le bouton "Export"** en haut à droite de l'interface
2. **Télécharger l'archive ZIP** contenant tout le code source
3. **Extraire l'archive** dans un dossier local sur votre machine

### Vérification du contenu

Assurez-vous que l'archive contient bien :
```
tbee-export/
├── src/
│   ├── app/
│   │   ├── components/       # Tous les composants React
│   │   └── App.tsx
│   ├── context/              # UserDataContext.tsx
│   ├── utils/                # initialState.ts
│   ├── types/                # index.ts
│   └── styles/
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
└── README.md (et autres .md)
```

---

## 🔧 Étape 2 : Initialiser Git

```bash
cd tbee-export

# Initialiser un repo Git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit - TBEE Platform with real-time tracking"

# Créer un repo sur GitHub et le lier
git remote add origin https://github.com/votre-username/tbee.git
git branch -M main
git push -u origin main
```

---

## ☁️ Étape 3 : Déployer sur Vercel

### Option A : Via l'interface Vercel

1. **Se connecter sur [vercel.com](https://vercel.com)**
2. **Cliquer sur "New Project"**
3. **Importer votre repo GitHub** `tbee`
4. **Configurer le projet** :
   - Framework Preset : **Vite**
   - Build Command : `npm run build`
   - Output Directory : `dist`
   - Install Command : `npm install`

5. **Cliquer sur "Deploy"**

### Option B : Via CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Suivre les instructions :
# - Set up and deploy? Yes
# - Which scope? [Votre compte]
# - Link to existing project? No
# - What's your project's name? tbee
# - In which directory is your code located? ./
# - Want to override settings? No

# Déployer en production
vercel --prod
```

### Résultat

Votre application sera disponible sur : `https://tbee.vercel.app` (ou un nom similaire)

---

## 🗄️ Étape 4 : Configurer Supabase

### Créer un projet Supabase

1. **Se connecter sur [supabase.com](https://supabase.com)**
2. **Créer un nouveau projet** :
   - Nom : `TBEE`
   - Mot de passe base de données : [Générer un mot de passe fort]
   - Région : EU West (ou la plus proche)

3. **Attendre la création** du projet (~2 minutes)

### Créer les tables

Aller dans **SQL Editor** et exécuter ce script :

```sql
-- ============================================
-- TABLES TBEE
-- ============================================

-- Table users_profiles (profils utilisateurs)
CREATE TABLE users_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'candidate', -- 'candidate' ou 'admin'
  
  -- Informations personnelles
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  birth_date DATE,
  has_rqth BOOLEAN DEFAULT false,
  
  -- Formation
  current_level TEXT,
  target_level TEXT,
  field_of_interest TEXT,
  city TEXT,
  postal_code TEXT,
  mobility_radius INTEGER,
  
  -- Statut
  onboarding_completed BOOLEAN DEFAULT false,
  onboarding_step INTEGER DEFAULT 1,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table user_statistics (statistiques)
CREATE TABLE user_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  
  -- Progression
  total_lessons_completed INTEGER DEFAULT 0,
  total_lessons_validated INTEGER DEFAULT 0,
  current_week INTEGER DEFAULT 1,
  current_streak_days INTEGER DEFAULT 0,
  longest_streak_days INTEGER DEFAULT 0,
  
  -- Activité
  last_activity_date DATE,
  total_time_spent_minutes INTEGER DEFAULT 0,
  
  -- Candidatures
  total_applications INTEGER DEFAULT 0,
  total_interviews INTEGER DEFAULT 0,
  
  -- Timestamps
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(user_id)
);

-- Table modules (modules de formation)
CREATE TABLE modules (
  id TEXT PRIMARY KEY, -- 'module-week1', 'module-week2', etc.
  week_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT,
  color_accent TEXT,
  order_index INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT true,
  unlock_condition TEXT DEFAULT 'previous_completed',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table user_lesson_progress (progression par module)
CREATE TABLE user_lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  
  -- Progression
  status TEXT NOT NULL DEFAULT 'locked', -- 'locked', 'available', 'in_progress', 'completed'
  progress INTEGER DEFAULT 0, -- 0-100
  xp INTEGER DEFAULT 0,
  
  -- Timestamps
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(user_id, module_id)
);

-- Table user_tracked_offers (offres suivies)
CREATE TABLE user_tracked_offers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  
  -- Informations offre
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  location TEXT,
  contract_type TEXT,
  application_status TEXT DEFAULT 'saved', -- 'saved', 'applied', 'interview_scheduled', 'rejected', 'accepted'
  
  -- Détails
  offer_url TEXT,
  notes TEXT,
  application_date DATE,
  interview_date TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  tracked_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Table cv_data (données CV)
CREATE TABLE cv_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users_profiles(id) ON DELETE CASCADE,
  
  -- Fichier
  file_name TEXT,
  file_url TEXT,
  file_size INTEGER,
  
  -- Validation
  validation_status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'revision_needed'
  admin_feedback TEXT,
  validated_at TIMESTAMP WITH TIME ZONE,
  validated_by UUID REFERENCES users_profiles(id),
  
  -- Timestamps
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  UNIQUE(user_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_user_lesson_progress_user_id ON user_lesson_progress(user_id);
CREATE INDEX idx_user_lesson_progress_module_id ON user_lesson_progress(module_id);
CREATE INDEX idx_user_tracked_offers_user_id ON user_tracked_offers(user_id);
CREATE INDEX idx_user_statistics_user_id ON user_statistics(user_id);
CREATE INDEX idx_cv_data_user_id ON cv_data(user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_users_profiles_updated_at
  BEFORE UPDATE ON users_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_statistics_updated_at
  BEFORE UPDATE ON user_statistics
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_lesson_progress_updated_at
  BEFORE UPDATE ON user_lesson_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_tracked_offers_updated_at
  BEFORE UPDATE ON user_tracked_offers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cv_data_updated_at
  BEFORE UPDATE ON cv_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DONNÉES INITIALES
-- ============================================

-- Insérer les 4 modules
INSERT INTO modules (id, week_number, title, description, icon_name, color_accent, order_index) VALUES
('module-week1', 1, 'Identifier mon projet', 'Définis ton projet professionnel et tes objectifs d''alternance', 'Target', '#FFD600', 1),
('module-week2', 2, 'Construire mon CV', 'Crée un CV professionnel et attractif adapté à l''alternance', 'FileText', '#1E1548', 2),
('module-week3', 3, 'Rechercher mon entreprise', 'Apprends à chercher et cibler les bonnes entreprises', 'Search', '#E8ECFF', 3),
('module-week4', 4, 'Réussir mon entretien', 'Maîtrise les techniques d''entretien et décroche ton contrat', 'Briefcase', '#10B981', 4);

-- ============================================
-- RLS (Row Level Security)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE users_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_tracked_offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE cv_data ENABLE ROW LEVEL SECURITY;

-- Politique : Les utilisateurs peuvent voir/modifier uniquement leurs propres données
CREATE POLICY "Users can view own profile" ON users_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own statistics" ON user_statistics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own statistics" ON user_statistics
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own progress" ON user_lesson_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON user_lesson_progress
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own tracked offers" ON user_tracked_offers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own tracked offers" ON user_tracked_offers
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own CV data" ON cv_data
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own CV data" ON cv_data
  FOR ALL USING (auth.uid() = user_id);

-- Politique : Les modules sont publics en lecture
CREATE POLICY "Modules are viewable by everyone" ON modules
  FOR SELECT USING (true);
```

### Récupérer les clés API

1. **Aller dans Settings → API**
2. **Copier** :
   - `Project URL` (ex: `https://xxxxx.supabase.co`)
   - `anon public` key (commence par `eyJh...`)

---

## 🔗 Étape 5 : Connecter Vercel et Supabase

### Ajouter les variables d'environnement sur Vercel

1. **Aller sur votre projet Vercel**
2. **Settings → Environment Variables**
3. **Ajouter** :

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...votre-clé
```

4. **Redéployer** : Settings → Deployments → ⋯ → Redeploy

---

## 💻 Étape 6 : Intégrer Supabase dans le Code

### Installer le client Supabase

```bash
npm install @supabase/supabase-js
```

### Créer `/src/lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Remplacer les TODOs dans `/src/context/UserDataContext.tsx`

**Exemple pour `updateModuleProgress`** :

```typescript
const updateModuleProgress = useCallback(async (moduleId: string, progress: number) => {
  // ✅ Mise à jour Supabase
  const { error } = await supabase
    .from('user_lesson_progress')
    .update({ 
      progress: Math.min(100, Math.max(0, progress)),
      updated_at: new Date().toISOString()
    })
    .eq('module_id', moduleId)
    .eq('user_id', userId);
  
  if (error) {
    console.error('Error updating module progress:', error);
    throw error;
  }
  
  // Mise à jour de l'état local
  setData(prev => ({
    ...prev,
    modules: prev.modules.map(m => 
      m.id === moduleId 
        ? { ...m, progress: Math.min(100, Math.max(0, progress)) }
        : m
    )
  }));
}, [userId]);
```

**Faire de même pour** :
- `startModule()`
- `completeModule()`
- `incrementStudyTime()`
- `updateStreak()`
- etc. (tous les TODOs marqués)

---

## ✅ Étape 7 : Tester l'Application

### En local

```bash
# Installer les dépendances
npm install

# Créer .env.local
echo "VITE_SUPABASE_URL=https://xxxxx.supabase.co" > .env.local
echo "VITE_SUPABASE_ANON_KEY=eyJhbGc..." >> .env.local

# Lancer en dev
npm run dev
```

### En production

1. **Ouvrir** `https://tbee.vercel.app`
2. **Tester le parcours complet** :
   - Inscription → Onboarding
   - Dashboard → Vérifier que le prénom s'affiche
   - Module → Compléter une étape → Vérifier la mise à jour temps réel
   - Retour Dashboard → Vérifier les statistiques

---

## 📊 Monitoring et Debug

### Logs Vercel

- **Vercel Dashboard** → Votre projet → **Deployments** → Cliquer sur un déploiement → **Logs**

### Logs Supabase

- **Supabase Dashboard** → **Database** → **Logs** → Voir toutes les requêtes SQL

### Debug local

Ouvrir la console du navigateur (F12) et regarder :
- Les appels réseau (onglet Network)
- Les erreurs console (onglet Console)
- Le storage local (onglet Application → Local Storage)

---

## 🚨 Résolution de Problèmes

### "Missing Supabase environment variables"

**Solution** : Vérifier que les variables sont bien définies sur Vercel et redéployer.

### "Error updating module progress"

**Solution** : Vérifier les RLS policies dans Supabase et que l'utilisateur est bien authentifié.

### "Le nom ne s'affiche pas"

**Solution** : Vérifier que les données d'onboarding sont bien passées au `UserDataProvider` dans `App.tsx`.

### "Les statistiques ne se mettent pas à jour"

**Solution** : Vérifier que toutes les fonctions du contexte appellent bien Supabase ET mettent à jour l'état local.

---

## 🎉 Félicitations !

Votre plateforme TBEE est maintenant :
- ✅ Déployée sur Vercel
- ✅ Connectée à Supabase
- ✅ Avec tracking en temps réel fonctionnel
- ✅ Prête pour la production

**Prochaines étapes** :
1. Ajouter l'authentification Supabase Auth
2. Implémenter l'upload de fichiers (CV) avec Supabase Storage
3. Ajouter des tests automatisés
4. Configurer un domaine personnalisé

---

**Besoin d'aide ?**
- 📖 Documentation Vercel : https://vercel.com/docs
- 📖 Documentation Supabase : https://supabase.com/docs
- 📧 Support : support@tbee.fr
