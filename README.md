# 🚀 TBEE - Plateforme d'Accompagnement vers l'Alternance

> Plateforme inclusive et accessible d'accompagnement vers l'alternance avec un focus RQTH

---

## 🔥 COMMENCEZ ICI !

**📖 SI VOUS ÊTES BLOQUÉ → LISEZ : [`MOUSSA-LISEZ-CECI.md`](./MOUSSA-LISEZ-CECI.md)**

**🧪 DIAGNOSTIC AUTOMATIQUE → OUVREZ : `http://localhost:5173/diagnostic-supabase.html`**

**📘 GUIDE COMPLET → SUIVEZ : [`GUIDE-REPARATION-COMPLET.md`](./GUIDE-REPARATION-COMPLET.md)**

---

## 🚨 PROBLÈME DE CONNEXION RÉSOLU !

### 🔥 NOUVEAUX OUTILS DE DIAGNOSTIC

| Outil | Temps | Description |
|-------|-------|-------------|
| **[🧪 diagnostic-supabase.html](http://localhost:5173/diagnostic-supabase.html)** | 3 min | Page interactive qui teste TOUT automatiquement |
| **[📜 supabase-complete-setup.sql](./supabase-complete-setup.sql)** | 30 sec | Script SQL complet à exécuter dans Supabase |
| **[📘 GUIDE-REPARATION-COMPLET.md](./GUIDE-REPARATION-COMPLET.md)** | 15 min | Guide pas-à-pas détaillé avec dépannage |
| **[⚡ AIDE-MEMOIRE.md](./AIDE-MEMOIRE.md)** | 1 min | Commandes et vérifications rapides |
| **[🎯 RECAPITULATIF.md](./RECAPITULATIF.md)** | 5 min | Vue d'ensemble + checklist complète |
| **[🎨 GUIDE-VISUEL.md](./GUIDE-VISUEL.md)** | 3 min | Guide visuel avec schémas |

---

## 🎯 DÉMARRAGE RAPIDE (17 MIN)

### ÉTAPE 1 : Configuration Supabase (5 min)

1. Ouvrez https://supabase.com/dashboard
2. **SQL Editor** → **New Query**
3. Copiez le contenu de **`supabase-complete-setup.sql`**
4. Collez et cliquez sur **Run**

**✅ Résultat attendu :**
```
✅ Table profiles : OK
✅ RLS activé : OK
✅ 4 politiques créées
✅ Trigger créé : OK
🎉 Configuration terminée !
```

### ÉTAPE 2 : Configuration locale (3 min)

1. **Téléchargez** le code depuis Figma Make
2. **Créez** le fichier `.env.local` à la racine :

```bash
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. **Installez** et **lancez** :

```bash
npm install
npm run dev
```

---

## ✅ Système d'authentification sécurisé avec Supabase

### 🎯 Fonctionnalités principales

✅ **Inscription candidat** automatique avec profil complet  
✅ **Connexion sécurisée** avec séparation stricte des rôles  
✅ **Dashboard candidat** avec parcours de 5 semaines  
✅ **Dashboard admin** pour validation et suivi  
✅ **Protection complète** contre l'usurpation de rôle  

---

## 📚 Documentation complète

**📖 Pour naviguer dans la documentation** → Consultez [`INDEX.md`](./INDEX.md)

### Guides essentiels

| Document | Description |
|----------|-------------|
| **[📘 GUIDE-SUPABASE.md](./GUIDE-SUPABASE.md)** | Configuration complète de Supabase (COMMENCEZ ICI) |
| **[🔐 SECURITE-ROLES.md](./SECURITE-ROLES.md)** | Comment les rôles sont protégés |
| **[👨‍💼 CREER-COMPTE-ADMIN.md](./CREER-COMPTE-ADMIN.md)** | Créer un compte administrateur |
| **[❓ FAQ.md](./FAQ.md)** | Questions fréquentes (20+ réponses) |

---

## 🚀 Installation rapide

### 1. Configuration Supabase (OBLIGATOIRE)

```bash
# 1. Créer un projet Supabase sur https://supabase.com
# 2. Ouvrir le SQL Editor
# 3. Copier-coller le contenu du fichier supabase-setup.sql
# 4. Cliquer sur "Run"
```

### 2. Configuration locale

```bash
# Cloner ou télécharger le code
# Créer le fichier .env.local à la racine
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

### 3. Créer votre premier admin

```sql
-- Dans Supabase SQL Editor
UPDATE public.profiles 
SET role = 'admin',
    first_name = 'Admin',
    last_name = 'TBEE'
WHERE email = 'votre@email.com';
```

---

## 🔐 Sécurité

### Comment les rôles sont protégés

**❌ Impossible de créer un compte admin via l'inscription**

Le système utilise **4 couches de sécurité** :

1. **Frontend** → Rôle codé en dur à `'student'`
2. **Hook React** → Valeur par défaut `'student'`
3. **Trigger SQL** → Force le rôle à `'student'` côté serveur
4. **Contrainte BDD** → Valide le rôle (`'student'` ou `'admin'`)

📖 **Pour comprendre en détail** : [`SECURITE-ROLES.md`](./SECURITE-ROLES.md)

---

## 🧪 Tests à effectuer

```bash
# Après configuration Supabase et .env.local

✅ Test 1 : Inscription candidat
   → Vérifier la création du compte
   → Vérifier l'email de confirmation
   → Vérifier la redirection vers l'onboarding

✅ Test 2 : Connexion candidat
   → Onglet "👨‍🎓 Candidat"
   → Vérifier l'accès au dashboard
   → Vérifier que le nom s'affiche

✅ Test 3 : Connexion admin
   → Onglet "👨‍💼 Admin"
   → Vérifier l'accès au dashboard admin
   → Vérifier que "Admin TBEE" s'affiche

✅ Test 4 : Séparation des rôles
   → Essayer connexion candidat en tant qu'admin → Erreur ✅
   → Essayer connexion admin en tant que candidat → Erreur ✅
```

---

## 📦 Déploiement sur Vercel

```bash
# 1. Pousser le code sur GitHub
git init
git add .
git commit -m "Initial commit - TBEE platform"
git remote add origin https://github.com/votre-username/tbee-platform.git
git push -u origin main

# 2. Sur Vercel (https://vercel.com)
# - Importer le repo GitHub
# - Ajouter les variables d'environnement :
#   VITE_SUPABASE_URL
#   VITE_SUPABASE_ANON_KEY
# - Cliquer sur "Deploy"
```

---

## 🏗️ Structure de la base de données

### Table `profiles`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | ID de l'utilisateur (FK vers auth.users) |
| `email` | TEXT | Email unique |
| `first_name` | TEXT | Prénom |
| `last_name` | TEXT | Nom |
| `role` | TEXT | 'student' ou 'admin' |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

### Sécurité (RLS)

- ✅ Un utilisateur peut lire son propre profil
- ✅ Les admins peuvent lire tous les profils
- ✅ Personne ne peut modifier le rôle d'un autre utilisateur
- ✅ Trigger automatique pour créer le profil à l'inscription

---

## 🎨 Design System TBEE

### Couleurs principales

```css
--primary-yellow: #FFD600
--dark-blue: #1E1548
--light-blue: #E8ECFF
--background: #F8F9FD
```

### Typographie

```css
font-family: 'Poppins', sans-serif
```

### Espacement

```css
spacing: 8pt grid system
```

### Composants

```css
buttons: height 48px
cards: border-radius 16px
```

---

## 📂 Fichiers clés

```
/
├── 📄 INDEX.md                    # Navigation dans la documentation
├── 📄 GUIDE-SUPABASE.md           # Guide de configuration complet
├── 📄 supabase-setup.sql          # Script SQL à exécuter
│
└── src/
    ├── lib/
    │   └── supabase.ts            # Client Supabase
    ├── hooks/
    │   └── useAuth.tsx            # Hook d'authentification
    └── app/
        ├── App.tsx                # App principale
        └── components/
            ├── LoginPage.tsx      # Page de connexion
            └── SignupPage.tsx     # Page d'inscription
```

---

## 🆘 Besoin d'aide ?

### Documentation disponible

- **[📖 INDEX.md](./INDEX.md)** → Navigation complète
- **[📘 GUIDE-SUPABASE.md](./GUIDE-SUPABASE.md)** → Configuration étape par étape
- **[❓ FAQ.md](./FAQ.md)** → 20+ questions répondues
- **[🔐 SECURITE-ROLES.md](./SECURITE-ROLES.md)** → Sécurité des rôles

### Problèmes fréquents

| Problème | Solution |
|----------|----------|
| Erreur `onAuthStateChange is not a function` | ✅ Corrigé dans le client mock |
| Nom affiché : "Utilisateur" | Créez le fichier `.env.local` |
| "Accès refusé" lors de la connexion | Vérifiez le rôle dans la BDD |
| Écran blanc | Vérifiez la console du navigateur |

---

## ✅ Checklist de déploiement

- [ ] Script SQL exécuté dans Supabase
- [ ] Compte admin créé et testé
- [ ] Variables d'environnement configurées
- [ ] Inscription candidat testée
- [ ] Connexion candidat testée
- [ ] Connexion admin testée
- [ ] Séparation des rôles vérifiée
- [ ] Nom utilisateur s'affiche correctement
- [ ] Déploiement Vercel réussi

---

## 🎉 Prêt à commencer ?

**👉 Ouvrez [`GUIDE-SUPABASE.md`](./GUIDE-SUPABASE.md) et suivez les étapes !**

---

## 📜 Licence

Ce projet est développé pour TBEE - Plateforme d'accompagnement vers l'alternance.

---

**Bon déploiement ! 🚀**