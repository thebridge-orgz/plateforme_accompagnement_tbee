# 🧪 COMMENT TESTER L'AUTHENTIFICATION EN LOCAL

## 🚨 IMPORTANT

**Vous ne pouvez PAS tester l'authentification complète dans Figma Make Preview !**

**Pourquoi ?**
- ❌ Figma Make n'a pas accès aux variables d'environnement
- ❌ Le client Supabase est en mode MOCK (démo)
- ❌ Le mode mock ne peut pas communiquer avec la vraie base de données Supabase

**Les utilisateurs sont créés dans Supabase parce que vous utilisez probablement un autre environnement de test (local ou Vercel).**

---

## ✅ SOLUTION : Tester en LOCAL

### Étape 1 : Télécharger le code depuis Figma Make

1. Cliquez sur le bouton **"Export"** en haut à droite de Figma Make
2. Téléchargez le fichier ZIP
3. Décompressez-le sur votre ordinateur

### Étape 2 : Installer Node.js (si pas déjà fait)

1. Allez sur [https://nodejs.org](https://nodejs.org)
2. Téléchargez la version LTS
3. Installez-la

### Étape 3 : Créer le fichier `.env.local`

À la racine du projet, créez un fichier nommé `.env.local` :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Comment trouver ces valeurs ?**

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet TBEE
3. Cliquez sur **Settings** (⚙️) dans le menu de gauche
4. Cliquez sur **API**
5. Copiez :
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public** → `VITE_SUPABASE_ANON_KEY`

### Étape 4 : Installer les dépendances

Ouvrez un terminal dans le dossier du projet et exécutez :

```bash
npm install
```

Attendez que l'installation se termine (1-2 minutes).

### Étape 5 : Lancer le serveur de développement

```bash
npm run dev
```

Vous devriez voir :

```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### Étape 6 : Tester l'authentification

1. Ouvrez votre navigateur sur **http://localhost:5173**
2. Cliquez sur **"S'inscrire"**
3. Remplissez le formulaire
4. Cliquez sur **"Créer mon compte"**

**✅ Résultat attendu :**
```
1. Message : "Compte créé ! Vérifiez vos emails."
2. Redirection automatique vers Onboarding (1-2 sec)
3. Le nom s'affiche dans la sidebar
```

### Étape 7 : Vérifier dans la console

Ouvrez la console du navigateur (F12) et vous devriez voir :

```
Auth state changed: SIGNED_IN votre-email@exemple.com
Profil récupéré: {
  id: "...",
  email: "votre-email@exemple.com",
  first_name: "Votre Prénom",
  last_name: "Votre Nom",
  role: "student"
}
```

---

## ❌ Si vous voyez des erreurs

### Erreur : "Cannot find module '@supabase/supabase-js'"

**Solution :**
```bash
npm install @supabase/supabase-js
```

### Erreur : "VITE_SUPABASE_URL is not defined"

**Solution :**
- Vérifiez que le fichier `.env.local` existe à la racine du projet
- Vérifiez qu'il n'y a pas de faute de frappe dans les noms des variables
- Redémarrez le serveur : `Ctrl+C` puis `npm run dev`

### Erreur : "Failed to fetch"

**Solution :**
- Vérifiez que votre URL Supabase est correcte
- Vérifiez que votre clé `anon public` est correcte
- Vérifiez que vous êtes connecté à Internet

---

## 🎯 CHECKLIST DE VÉRIFICATION

Avant de tester, assurez-vous que :

- [ ] Le script SQL `/supabase-setup.sql` a été exécuté dans Supabase
- [ ] Le fichier `.env.local` existe et contient les bonnes valeurs
- [ ] Node.js est installé (`node --version` dans le terminal)
- [ ] Les dépendances sont installées (`npm install`)
- [ ] Le serveur est lancé (`npm run dev`)
- [ ] Vous testez sur `http://localhost:5173` (pas dans Figma Make)

---

## ✅ RÉSULTAT FINAL

**Si tout fonctionne :**

### Inscription
```
1. Remplir le formulaire
2. Cliquer sur "Créer mon compte"
3. → Redirection automatique vers Onboarding (1-2 sec)
4. → Nom affiché dans la sidebar
```

### Connexion candidat
```
1. Onglet "👨‍🎓 Candidat"
2. Email + mot de passe
3. → Redirection automatique vers Dashboard candidat (1-2 sec)
4. → Nom affiché : "Moussa THIAM"
```

### Connexion admin
```
1. Onglet "👨‍💼 Admin"
2. Email + mot de passe
3. → Redirection automatique vers Dashboard admin (1-2 sec)
4. → Nom affiché : "Admin TBEE"
```

---

## 🚀 DÉPLOIEMENT SUR VERCEL (APRÈS TESTS LOCAUX)

Une fois que tout fonctionne en local :

### 1. Créer un repo GitHub

```bash
git init
git add .
git commit -m "Initial commit - TBEE platform"
git remote add origin https://github.com/votre-username/tbee-platform.git
git push -u origin main
```

### 2. Déployer sur Vercel

1. Allez sur [https://vercel.com](https://vercel.com)
2. Cliquez sur **"Add New Project"**
3. Importez votre repo GitHub
4. Ajoutez les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Cliquez sur **"Deploy"**

**⏱️ Temps de déploiement : 2-3 minutes**

### 3. Tester sur Vercel

Une fois déployé, vous aurez une URL type :
```
https://tbee-platform.vercel.app
```

Testez l'authentification sur cette URL !

---

## 📊 RÉCAPITULATIF

| Environnement | Client Supabase | Authentification | Tests possibles |
|---------------|-----------------|------------------|-----------------|
| **Figma Make Preview** | ❌ MOCK | ❌ Non fonctionnel | ❌ Interface uniquement |
| **Local (avec .env.local)** | ✅ RÉEL | ✅ Fonctionnel | ✅ Tous les tests |
| **Vercel (avec env vars)** | ✅ RÉEL | ✅ Fonctionnel | ✅ Tests production |

---

## 🆘 BESOIN D'AIDE ?

Si vous rencontrez des problèmes lors des tests en local :

1. Vérifiez la console du navigateur (F12)
2. Consultez [`DEBUG-CONNEXION.md`](./DEBUG-CONNEXION.md)
3. Vérifiez que le script SQL a bien été exécuté
4. Vérifiez que les variables `.env.local` sont correctes

---

**Version : 2.1.0**  
**Environnement de test : LOCAL ou VERCEL uniquement**  
**⚠️ Figma Make Preview ne supporte PAS l'authentification réelle**
