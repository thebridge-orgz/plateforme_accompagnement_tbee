# 🎨 GUIDE VISUEL RAPIDE - TBEE

## 🎯 EN 3 ÉTAPES

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ÉTAPE 1 : SUPABASE (5 min)                              │
│  ════════════════════════════                             │
│                                                            │
│  1. Ouvrir https://supabase.com/dashboard                 │
│  2. SQL Editor → New Query                                │
│  3. Copier supabase-complete-setup.sql                    │
│  4. Run ✅                                                 │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ÉTAPE 2 : LOCAL (3 min)                                  │
│  ═══════════════════                                      │
│                                                            │
│  1. Télécharger le code depuis Figma Make                 │
│  2. Créer .env.local à la racine :                        │
│                                                            │
│     VITE_SUPABASE_URL=https://xxx.supabase.co            │
│     VITE_SUPABASE_ANON_KEY=eyJ...                        │
│                                                            │
│  3. Terminal :                                             │
│     npm install                                            │
│     npm run dev                                            │
│                                                            │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                                                            │
│  ÉTAPE 3 : TEST (5 min)                                   │
│  ══════════════════                                       │
│                                                            │
│  1. Ouvrir http://localhost:5173/diagnostic-supabase.html │
│  2. Vérifier que tout est vert ✅                         │
│  3. Test 2 : Créer un compte                              │
│  4. Test 1 : Se connecter                                 │
│  5. Ouvrir http://localhost:5173 → Connexion              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## 🚦 INDICATEURS DE STATUT

### ✅ TOUT FONCTIONNE

```
┌─────────────────────────────────────────────────────┐
│  Page de diagnostic                                 │
│  ═══════════════════                                │
│                                                     │
│  ✅ VITE_SUPABASE_URL trouvé                        │
│  ✅ VITE_SUPABASE_ANON_KEY trouvé                   │
│  ✅ Client Supabase créé avec succès                │
│  ✅ Connexion réseau OK                             │
│  ✅ Table "profiles" accessible                     │
│                                                     │
│  Tests interactifs :                                │
│  ✅ Inscription → Compte créé + Profil créé         │
│  ✅ Connexion → Redirection vers dashboard          │
│                                                     │
└─────────────────────────────────────────────────────┘

Console (F12) :
┌─────────────────────────────────────────────────────┐
│ 🔐 Session initiale trouvée: test@example.com      │
│ 🔍 Récupération du profil pour: xxxxxxxx-xxxx...   │
│ ✅ Profil récupéré: { id: "...", role: "student" } │
│ 🔐 Auth event: INITIAL_SESSION                      │
│ ⏭️ INITIAL_SESSION ignoré (déjà traité)             │
└─────────────────────────────────────────────────────┘

Application :
┌─────────────────────────────────────────────────────┐
│  http://localhost:5173                              │
│  ═══════════════════════                            │
│                                                     │
│  ✅ Menu de gauche (sidebar) visible                │
│  ✅ "Candidat" affiché en haut                      │
│  ✅ Modules visibles                                │
│  ✅ Pas de boucle infinie                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### ❌ PROBLÈME : Variables d'environnement

```
┌─────────────────────────────────────────────────────┐
│  Page de diagnostic                                 │
│  ═══════════════════                                │
│                                                     │
│  ❌ ERREUR : VITE_SUPABASE_URL non défini !         │
│                                                     │
│  👉 SOLUTION :                                       │
│     1. Créer .env.local à la RACINE                 │
│     2. Ajouter les 2 lignes (URL + KEY)            │
│     3. Redémarrer le serveur (Ctrl+C puis npm run dev) │
│     4. Recharger la page (Ctrl+Shift+R)            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### ❌ PROBLÈME : Table profiles

```
┌─────────────────────────────────────────────────────┐
│  Page de diagnostic                                 │
│  ═══════════════════                                │
│                                                     │
│  ✅ VITE_SUPABASE_URL trouvé                        │
│  ✅ VITE_SUPABASE_ANON_KEY trouvé                   │
│  ✅ Client Supabase créé avec succès                │
│  ✅ Connexion réseau OK                             │
│  ❌ ERREUR : Table "profiles" introuvable           │
│                                                     │
│  👉 SOLUTION :                                       │
│     1. Ouvrir Supabase Dashboard → SQL Editor      │
│     2. Copier supabase-complete-setup.sql          │
│     3. Coller et Run                                │
│     4. Recharger la page                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### ❌ PROBLÈME : Boucle infinie

```
┌─────────────────────────────────────────────────────┐
│  Console (F12)                                      │
│  ═══════════════                                    │
│                                                     │
│  🔐 Auth event: SIGNED_IN                           │
│  🔍 Récupération du profil pour: xxxxxxxx           │
│  🔐 Auth event: SIGNED_IN                           │
│  🔍 Récupération du profil pour: xxxxxxxx           │
│  🔐 Auth event: SIGNED_IN                           │
│  ... (répété à l'infini)                            │
│                                                     │
│  👉 SOLUTION :                                       │
│     1. Recharger complètement : Ctrl+Shift+R       │
│     2. Vider le cache : F12 → Application → Clear  │
│     3. Redémarrer le serveur                        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 📂 STRUCTURE VISUELLE DU PROJET

```
tbee-project/
│
├── 📄 .env.local               ← CRÉER CE FICHIER ICI !
│   ├─ VITE_SUPABASE_URL=...
│   └─ VITE_SUPABASE_ANON_KEY=...
│
├── 📄 package.json
├── 📄 index.html
├── 📄 vite.config.ts
│
├── 🧪 diagnostic-supabase.html   ← PAGE DE TEST
│
├── 📜 supabase-complete-setup.sql ← SCRIPT SQL
│
├── 📘 GUIDE-REPARATION-COMPLET.md ← GUIDE PAS-À-PAS
├── 📘 RECAPITULATIF.md
├── 📘 AIDE-MEMOIRE.md
├── 📘 README.md
│
└── src/
    ├── lib/
    │   └── supabase.ts         ← Client Supabase
    │
    ├── hooks/
    │   └── useAuth.tsx         ← Hook d'authentification
    │
    └── app/
        ├── App.tsx             ← App principale
        └── components/
            ├── LoginPage.tsx
            └── SignupPage.tsx
```

---

## 🎮 COMMANDES VISUELLES

```
┌─────────────────────────────────────────────────────┐
│  TERMINAL                                           │
│  ════════                                           │
│                                                     │
│  $ cd tbee-project         # Aller dans le dossier │
│  $ npm install             # Installer (1ère fois) │
│  $ npm run dev             # Lancer le serveur     │
│                                                     │
│  VITE v5.x.x  ready in 500 ms                      │
│  ➜  Local:   http://localhost:5173/                │
│                                                     │
│  (Pour arrêter : Ctrl+C)                           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🔍 VÉRIFICATIONS VISUELLES

### ✅ Vérifier .env.local

```bash
$ cat .env.local

VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**✅ BON** : 2 lignes, pas d'espace, pas de guillemets  
**❌ MAUVAIS** : Fichier vide, espaces, guillemets, commentaires

### ✅ Vérifier Supabase

```
Supabase Dashboard → Database → Tables
┌─────────────────────────────────────────────────────┐
│  Tables                                             │
│  ══════                                             │
│                                                     │
│  ✅ profiles                                        │
│     ├─ id (uuid)                                    │
│     ├─ email (text)                                 │
│     ├─ first_name (text)                            │
│     ├─ last_name (text)                             │
│     ├─ role (text)                                  │
│     ├─ created_at (timestamptz)                     │
│     └─ updated_at (timestamptz)                     │
│                                                     │
└─────────────────────────────────────────────────────┘

Supabase Dashboard → Database → Triggers
┌─────────────────────────────────────────────────────┐
│  Triggers                                           │
│  ════════                                           │
│                                                     │
│  ✅ on_auth_user_created                            │
│     Table: auth.users                               │
│     Event: AFTER INSERT                             │
│     Function: handle_new_user()                     │
│     Enabled: ✅                                      │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 WORKFLOW VISUEL

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│   DÉVELOPPEMENT                 TEST                PRODUCTION │
│   ═════════════                 ════                ══════════ │
│                                                               │
│   Figma Make                    Local               Vercel    │
│   └─ Mode démo                  └─ Supabase réel    └─ Prod  │
│   └─ Pas d'auth                 └─ .env.local       └─ Vars env │
│   └─ Mock client                └─ npm run dev      └─ Deploy │
│                                                               │
│        ↓                            ↓                  ↓       │
│                                                               │
│   ❌ PAS D'AUTH                  ✅ AUTH RÉELLE     ✅ AUTH   │
│                                                               │
└───────────────────────────────────────────────────────────────┘
```

---

## 📊 TIMELINE DE CONNEXION

```
TEMPS   ACTION                              LOGS
═════   ══════                              ════

0ms     Page chargée
        └─ useAuth.tsx s'initialise
        └─ App.tsx démarre

100ms   initAuth() vérifie la session
        └─ supabase.auth.getSession()     → 🔐 Session initiale trouvée

200ms   Session trouvée
        └─ fetchUserProfile() appelé      → 🔍 Récupération du profil...

500ms   Profil récupéré
        └─ setUser() appelé               → ✅ Profil récupéré

600ms   INITIAL_SESSION event déclenché
        └─ Ignoré (déjà traité)           → ⏭️ INITIAL_SESSION ignoré

700ms   Redirection dashboard
        └─ useEffect dans App.tsx         → ✅ Redirection student-dashboard

800ms   ✅ CONNEXION TERMINÉE
        └─ Dashboard affiché
        └─ Menu de gauche visible
```

**Temps total : ~800ms** 🚀

---

## 🎨 CODES COULEURS DES LOGS

```
🔐  = Événement d'authentification
🔍  = Récupération de données
✅  = Succès
❌  = Erreur
⚠️  = Avertissement
⏳  = En cours
⏭️  = Ignoré
👋  = Déconnexion
```

---

## 🆘 AIDE VISUELLE RAPIDE

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│  PROBLÈME                 FICHIER À CONSULTER              │
│  ════════                 ═══════════════════              │
│                                                            │
│  Variables non trouvées   AIDE-MEMOIRE.md (p.1)           │
│  Table profiles manquante GUIDE-REPARATION-COMPLET.md     │
│  Boucle infinie           CORRECTION-BOUCLE-INFINIE.md    │
│  Profil non créé          supabase-complete-setup.sql     │
│  Commandes rapides        AIDE-MEMOIRE.md                 │
│  Vue d'ensemble           RECAPITULATIF.md                │
│  Test automatique         diagnostic-supabase.html        │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST VISUELLE

```
CONFIGURATION
□ ✅ Code téléchargé
□ ✅ .env.local créé à la racine
□ ✅ Script SQL exécuté dans Supabase
□ ✅ npm install exécuté
□ ✅ npm run dev lancé

DIAGNOSTIC
□ ✅ Page diagnostic affiche tout en vert
□ ✅ Pas d'erreur dans la console

TESTS
□ ✅ Inscription fonctionne
□ ✅ Connexion fonctionne
□ ✅ Dashboard s'affiche
□ ✅ Menu de gauche visible
□ ✅ Pas de boucle infinie
```

---

**🎯 Pour plus de détails → [GUIDE-REPARATION-COMPLET.md](./GUIDE-REPARATION-COMPLET.md)**
