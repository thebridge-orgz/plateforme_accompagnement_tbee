# 🔥 GUIDE ULTIME - RÉPARATION AUTHENTIFICATION TBEE

## 🎯 OBJECTIF
Faire fonctionner l'authentification Supabase **EN LOCAL** avant de déployer.

## ⏱️ TEMPS ESTIMÉ
**15 minutes** (en suivant chaque étape)

---

## 📋 PRÉREQUIS

Avant de commencer, vérifiez que vous avez :

- [ ] Node.js installé (version 18+)
- [ ] Un projet Supabase créé sur https://supabase.com
- [ ] Le code TBEE téléchargé depuis Figma Make
- [ ] Un éditeur de code (VS Code recommandé)

---

## 🚀 ÉTAPE 1 : CONFIGURATION SUPABASE (5 min)

### 1.1 Ouvrir Supabase Dashboard

1. Allez sur https://supabase.com/dashboard
2. Connectez-vous
3. Sélectionnez votre projet **TBEE**

### 1.2 Exécuter le script SQL de configuration

1. Dans le menu de gauche, cliquez sur **SQL Editor**
2. Cliquez sur **New Query**
3. Ouvrez le fichier `supabase-complete-setup.sql` (créé ci-dessus)
4. **COPIEZ TOUT LE CONTENU** du fichier
5. **COLLEZ** dans l'éditeur SQL de Supabase
6. Cliquez sur **Run** (ou `Ctrl+Enter`)

**✅ RÉSULTAT ATTENDU :**

Vous devriez voir en bas :

```
✅ Table profiles : OK
✅ RLS activé : OK
✅ 4 politiques créées
✅ Trigger créé : OK
✅ 0 profils (normal au début)
🎉 Configuration terminée !
```

**❌ SI ERREUR :**

- Vérifiez que vous êtes bien connecté en tant que **propriétaire** du projet
- Relancez le script (il supprime tout avant de recréer)
- Consultez les logs : **Logs** → **Postgres Logs**

### 1.3 Récupérer vos clés API

1. Dans le menu de gauche, cliquez sur **Settings** (⚙️)
2. Cliquez sur **API**
3. Vous verrez :
   - **Project URL** : `https://xxxxxxxx.supabase.co`
   - **anon public** : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**📝 COPIEZ CES DEUX VALEURS** (vous en aurez besoin à l'étape suivante)

---

## 💻 ÉTAPE 2 : CONFIGURATION LOCALE (5 min)

### 2.1 Structure du projet

Votre dossier téléchargé doit ressembler à ça :

```
tbee-project/
├── package.json
├── index.html
├── vite.config.ts
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── components/
│   ├── lib/
│   │   └── supabase.ts
│   └── hooks/
│       └── useAuth.tsx
└── ... (autres fichiers)
```

### 2.2 Créer le fichier `.env.local`

1. **OUVREZ** le dossier du projet dans votre éditeur de code
2. À la **RACINE** (même niveau que `package.json`), créez un nouveau fichier
3. Nommez-le **EXACTEMENT** : `.env.local` (avec le point au début !)
4. Collez ce contenu (en remplaçant par VOS clés) :

```bash
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxxxxxxx
```

**⚠️ ATTENTION :**

- Pas d'espace autour du `=`
- Pas de guillemets `"` autour des valeurs
- Pas d'espace à la fin des lignes
- Le fichier doit être à la RACINE (pas dans `/src/`)

### 2.3 Vérifier le fichier

**CORRECT ✅**

```
tbee-project/
├── .env.local          ← ICI, à la racine !
├── package.json
├── index.html
└── src/
```

**INCORRECT ❌**

```
tbee-project/
├── package.json
└── src/
    └── .env.local      ← PAS ICI !
```

### 2.4 Installer les dépendances

Ouvrez un terminal dans le dossier du projet et lancez :

```bash
npm install
```

**⏱️ Temps : 1-2 minutes**

---

## 🧪 ÉTAPE 3 : DIAGNOSTIC (3 min)

### 3.1 Lancer le serveur de développement

Dans le terminal, lancez :

```bash
npm run dev
```

Vous devriez voir :

```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3.2 Ouvrir la page de diagnostic

1. Ouvrez votre navigateur
2. Allez sur : `http://localhost:5173/diagnostic-supabase.html`
3. **Ouvrez la console** (`F12` ou `Ctrl+Shift+I`)

### 3.3 Analyser les résultats

Vous devriez voir des tests automatiques s'exécuter :

**✅ TOUT FONCTIONNE si vous voyez :**

```
✅ VITE_SUPABASE_URL trouvé : https://xxxxxxxx.supabase.co
✅ VITE_SUPABASE_ANON_KEY trouvé : eyJhbGc...
✅ Client Supabase créé avec succès
✅ Connexion réseau OK
✅ Table "profiles" accessible
```

**❌ PROBLÈME si vous voyez :**

```
❌ ERREUR : VITE_SUPABASE_URL non défini !
```

**👉 SOLUTION :**

1. Vérifiez que le fichier `.env.local` existe à la RACINE
2. Vérifiez qu'il n'y a pas de faute de frappe : `VITE_SUPABASE_URL` (pas `SUPABASE_URL`)
3. **REDÉMARREZ le serveur** : `Ctrl+C` puis `npm run dev`
4. **RECHARGEZ la page** : `Ctrl+Shift+R`

---

## 🔐 ÉTAPE 4 : TEST D'INSCRIPTION (2 min)

### 4.1 Créer un compte de test

Sur la page de diagnostic (`http://localhost:5173/diagnostic-supabase.html`) :

1. Allez à **Test 2 : Inscription**
2. Remplissez les champs :
   - Email : `test@example.com`
   - Mot de passe : `password123`
   - Prénom : `Jean`
   - Nom : `Dupont`
3. Cliquez sur **Créer un compte**

**✅ RÉSULTAT ATTENDU :**

```
✅ COMPTE CRÉÉ !
Email : test@example.com
ID : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Confirmation email : En attente

⏳ Vérification du profil créé automatiquement...
✅ PROFIL TROUVÉ !
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "email": "test@example.com",
  "first_name": "Jean",
  "last_name": "Dupont",
  "role": "student",
  "created_at": "2026-02-13T..."
}
```

**❌ SI ERREUR : "Table profiles not found"**

→ Retournez à **ÉTAPE 1.2** et réexécutez le script SQL

**❌ SI ERREUR : "new row violates row-level security policy"**

→ Les politiques RLS bloquent. Exécutez ce script dans Supabase SQL Editor :

```sql
-- Désactiver temporairement RLS pour debug
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Tester l'inscription

-- Réactiver RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

**❌ SI ERREUR : "Profil non trouvé"**

→ Le trigger ne fonctionne pas. Vérifiez dans Supabase :

1. **Database** → **Triggers**
2. Cherchez `on_auth_user_created`
3. Vérifiez qu'il est **Enabled**

---

## 🎯 ÉTAPE 5 : TEST DE CONNEXION (1 min)

### 5.1 Se connecter avec le compte créé

Sur la page de diagnostic :

1. Allez à **Test 1 : Connexion**
2. Entrez :
   - Email : `test@example.com`
   - Mot de passe : `password123`
3. Cliquez sur **Se connecter**

**✅ RÉSULTAT ATTENDU :**

```
✅ CONNEXION RÉUSSIE !
Email : test@example.com
ID : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Session : Oui

✅ PROFIL TROUVÉ !
{
  "id": "...",
  "email": "test@example.com",
  "first_name": "Jean",
  "last_name": "Dupont",
  "role": "student"
}
```

---

## 🎉 ÉTAPE 6 : TEST SUR L'APPLICATION RÉELLE (1 min)

### 6.1 Ouvrir l'application

1. Allez sur `http://localhost:5173` (sans `/diagnostic-supabase.html`)
2. Cliquez sur **Connexion**
3. Entrez les identifiants du compte de test
4. Cliquez sur **Connexion en cours...**

**✅ RÉSULTAT ATTENDU :**

- Vous êtes redirigé vers le dashboard
- Le menu de gauche (sidebar) s'affiche
- Vous voyez "Candidat" en haut du menu

**✅ SI ÇA FONCTIONNE :**

🎉 **FÉLICITATIONS ! L'authentification fonctionne en local !**

Vous pouvez maintenant :
- Créer des comptes
- Se connecter/déconnecter
- Tester tout le parcours candidat

---

## 🚨 DÉPANNAGE - PROBLÈMES FRÉQUENTS

### Problème 1 : "Variables d'environnement non trouvées"

**Symptôme :**

```
❌ ERREUR : VITE_SUPABASE_URL non défini !
```

**Causes possibles :**

1. Le fichier `.env.local` n'existe pas
2. Le fichier est mal nommé (espace, extension .txt cachée)
3. Le fichier n'est pas à la racine
4. Le serveur n'a pas été redémarré après création du fichier

**Solutions :**

```bash
# 1. Vérifier que le fichier existe
ls -la | grep .env

# 2. Afficher le contenu (macOS/Linux)
cat .env.local

# 3. Afficher le contenu (Windows PowerShell)
type .env.local

# 4. Redémarrer le serveur
# Appuyez sur Ctrl+C pour arrêter
npm run dev
```

---

### Problème 2 : "Boucle infinie de connexion"

**Symptôme :**

La console affiche en boucle :

```
🔐 Auth event: SIGNED_IN
🔍 Récupération du profil pour: xxxxxxxx
🔐 Auth event: SIGNED_IN
🔍 Récupération du profil pour: xxxxxxxx
...
```

**Cause :**

Le hook `useAuth` entre en boucle (déjà corrigé dans les dernières modifications)

**Solution :**

1. **Rechargez complètement** la page : `Ctrl+Shift+R`
2. Si ça persiste, **videz le cache** :
   - Chrome : `F12` → `Application` → `Clear storage` → `Clear site data`
   - Firefox : `F12` → `Storage` → `Clear All`
3. **Redémarrez le serveur** : `Ctrl+C` puis `npm run dev`

---

### Problème 3 : "Profil non créé automatiquement"

**Symptôme :**

Après inscription, le message "Profil non trouvé" s'affiche.

**Cause :**

Le trigger `on_auth_user_created` ne fonctionne pas.

**Solution :**

1. Allez dans **Supabase Dashboard** → **Database** → **Triggers**
2. Vérifiez que `on_auth_user_created` existe et est **Enabled**
3. Si absent, réexécutez le script SQL (ÉTAPE 1.2)
4. Testez manuellement le trigger :

```sql
-- Créer un utilisateur de test pour vérifier le trigger
INSERT INTO auth.users (
    id,
    email,
    encrypted_password,
    email_confirmed_at,
    raw_user_meta_data,
    created_at,
    updated_at
) VALUES (
    gen_random_uuid(),
    'trigger-test@example.com',
    crypt('testpassword', gen_salt('bf')),
    NOW(),
    '{"first_name": "Trigger", "last_name": "Test", "role": "student"}'::jsonb,
    NOW(),
    NOW()
);

-- Vérifier que le profil a été créé
SELECT * FROM public.profiles WHERE email = 'trigger-test@example.com';
```

---

### Problème 4 : "RLS policy violation"

**Symptôme :**

```
❌ new row violates row-level security policy
```

**Cause :**

Les politiques RLS sont trop restrictives.

**Solution temporaire (DEBUG UNIQUEMENT) :**

```sql
-- ATTENTION : À utiliser uniquement pour le debug !
-- Ne PAS garder en production !

ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
```

**Solution permanente :**

Réexécutez les étapes 3-4 du script SQL :

```sql
-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON public.profiles;

-- Recréer les politiques (PERMISSIVES)
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Enable insert for authenticated users only"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);
```

---

## 📊 CHECKLIST FINALE

Avant de passer au déploiement, vérifiez que :

- [ ] ✅ Les variables d'environnement sont chargées (diagnostic)
- [ ] ✅ La table `profiles` existe dans Supabase
- [ ] ✅ Les politiques RLS sont activées (4 politiques)
- [ ] ✅ Le trigger `on_auth_user_created` est activé
- [ ] ✅ Inscription fonctionne (compte créé + profil créé)
- [ ] ✅ Connexion fonctionne (redirection vers dashboard)
- [ ] ✅ Pas de boucle infinie dans la console
- [ ] ✅ Le menu de gauche (sidebar) s'affiche correctement

---

## 🚀 PROCHAINE ÉTAPE : DÉPLOIEMENT

Une fois que **TOUT fonctionne en local**, vous pouvez déployer sur Vercel :

1. Poussez le code sur GitHub
2. Importez le projet dans Vercel
3. Configurez les variables d'environnement dans Vercel :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Déployez

**L'authentification fonctionnera automatiquement en production !** 🎉

---

## 🆘 BESOIN D'AIDE ?

Si après avoir suivi TOUTES ces étapes, ça ne fonctionne toujours pas :

1. **Partagez les logs** de la console (F12)
2. **Partagez les résultats** de la page de diagnostic
3. **Partagez une capture** de Supabase → Database → Triggers
4. **Vérifiez les logs Supabase** : Dashboard → Logs → Postgres Logs

---

**Version : 3.0.0**  
**Date : 13 février 2026**  
**Statut : Guide complet de réparation**
