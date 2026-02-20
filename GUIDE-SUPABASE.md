# 📘 Guide de Configuration Supabase pour TBEE

## 🎯 Vue d'ensemble

Ce guide vous explique comment configurer Supabase pour l'application TBEE avec :
- ✅ Authentification sécurisée
- ✅ Séparation stricte des rôles (candidats / admins)
- ✅ Stockage des profils utilisateurs
- ✅ Récupération automatique du nom depuis la BDD

---

## 📋 Étape 1 : Configurer la base de données

### 1.1 - Accéder au SQL Editor

1. Connectez-vous à https://supabase.com
2. Sélectionnez votre projet TBEE
3. Dans le menu de gauche, cliquez sur **SQL Editor**
4. Cliquez sur **+ New query**

### 1.2 - Exécuter le script SQL

1. Ouvrez le fichier `/supabase-setup.sql` à la racine du projet
2. **Copiez tout le contenu** du fichier
3. **Collez-le** dans le SQL Editor de Supabase
4. Cliquez sur **Run** (bouton en bas à droite)

✅ **Ce script va créer :**
- La table `profiles` pour stocker les infos utilisateurs
- Les politiques RLS (Row Level Security) pour la sécurité
- Un trigger pour créer automatiquement un profil lors de l'inscription
- Les contraintes de validation des rôles

---

## 📋 Étape 2 : Créer un compte admin

### Option A : Via Supabase Dashboard (RECOMMANDÉ)

1. Dans Supabase, allez dans **Authentication** > **Users**
2. Cliquez sur **Add user** > **Create new user**
3. Remplissez :
   - Email : `admin@tbee.fr` (ou votre email admin)
   - Password : Créez un mot de passe sécurisé
   - ✅ **Cochez** "Auto Confirm User"
4. Cliquez sur **Create user**

5. **Donnez le rôle admin** à ce user :
   - Dans le SQL Editor, exécutez cette requête en remplaçant l'email :

```sql
UPDATE public.profiles 
SET role = 'admin',
    first_name = 'Admin',
    last_name = 'TBEE'
WHERE email = 'admin@tbee.fr';
```

### Option B : Via le script SQL (Alternative)

Dans le fichier `supabase-setup.sql`, décommentez les lignes 66-70 et remplacez l'email :

```sql
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Admin', 'TBEE', 'admin'
FROM auth.users
WHERE email = 'admin@tbee.fr'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

---

## 📋 Étape 3 : Récupérer vos clés Supabase

### 3.1 - Accéder aux clés API

1. Dans Supabase, cliquez sur **Settings** (icône engrenage en bas à gauche)
2. Allez dans **API**
3. Vous verrez 2 informations importantes :

### 3.2 - Copier les clés

```
Project URL : https://xxxxxxxxxx.supabase.co
anon public : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📋 Étape 4 : Configurer l'environnement local

### 4.1 - Créer le fichier `.env.local`

À la **racine du projet**, créez un fichier nommé `.env.local` :

```bash
VITE_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Important :**
- Remplacez les valeurs par VOS vraies clés Supabase
- Ne commitez JAMAIS ce fichier dans Git (déjà dans `.gitignore`)

### 4.2 - Tester en local

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

---

## 🧪 Étape 5 : Tester l'authentification

### Test 1 : Inscription candidat

1. Allez sur la page d'inscription
2. Remplissez le formulaire :
   - Prénom : Jean
   - Nom : Dupont
   - Email : jean.dupont@test.fr
   - Mot de passe : test123
3. Cliquez sur "Créer mon compte"

✅ **Résultat attendu :**
- Message de succès
- Email de confirmation envoyé (vérifiez les spams)
- Redirection vers l'onboarding

### Test 2 : Connexion candidat

1. Allez sur la page de connexion
2. Sélectionnez l'onglet **👨‍🎓 Candidat**
3. Connectez-vous avec :
   - Email : jean.dupont@test.fr
   - Mot de passe : test123

✅ **Résultat attendu :**
- Connexion réussie
- Redirection vers le dashboard candidat
- Nom "Jean Dupont" affiché dans la sidebar

### Test 3 : Connexion admin

1. Allez sur la page de connexion
2. Sélectionnez l'onglet **👨‍💼 Admin**
3. Connectez-vous avec :
   - Email : admin@tbee.fr (votre email admin)
   - Mot de passe : (celui que vous avez créé)

✅ **Résultat attendu :**
- Connexion réussie
- Redirection vers le dashboard admin
- Nom "Admin TBEE" affiché dans la sidebar

### Test 4 : Séparation des rôles

1. Essayez de vous connecter avec un compte **candidat** sur l'onglet **Admin**
2. Essayez de vous connecter avec un compte **admin** sur l'onglet **Candidat**

✅ **Résultat attendu :**
- Message d'erreur : "Accès refusé : cette page est réservée aux..."
- Déconnexion automatique

---

## 🚀 Étape 6 : Déployer sur Vercel

### 6.1 - Préparer le code

1. Téléchargez le code source depuis Figma Make
2. Créez un repository Git :

```bash
git init
git add .
git commit -m "Initial commit - TBEE platform"
git branch -M main
git remote add origin https://github.com/votre-username/tbee-platform.git
git push -u origin main
```

### 6.2 - Déployer sur Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **Add New Project**
3. Importez votre repository GitHub
4. Dans **Environment Variables**, ajoutez :

```
VITE_SUPABASE_URL = https://xxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

5. Cliquez sur **Deploy**

✅ **Votre application est en production !**

---

## 🔐 Sécurité

### Que se passe-t-il avec les rôles ?

#### Pour les candidats (`student`) :
- ✅ Peuvent s'inscrire librement
- ✅ Accès au dashboard candidat
- ❌ Ne peuvent PAS accéder au dashboard admin

#### Pour les admins (`admin`) :
- ✅ Créés manuellement par vous via Supabase
- ✅ Accès au dashboard admin
- ❌ Ne peuvent PAS accéder au dashboard candidat

### Row Level Security (RLS)

Les politiques RLS garantissent que :
- Un utilisateur ne peut lire que son propre profil
- Les admins peuvent lire tous les profils
- Personne ne peut modifier le profil d'un autre utilisateur

---

## ❓ FAQ & Résolution de problèmes

### "Accès refusé" lors de la connexion

**Cause :** Le rôle dans la BDD ne correspond pas au rôle sélectionné

**Solution :**
1. Vérifiez le rôle dans Supabase : **Authentication > Users > Cliquez sur le user**
2. Vérifiez dans le SQL Editor :

```sql
SELECT email, role FROM public.profiles WHERE email = 'votre@email.com';
```

### Le nom ne s'affiche pas (affiche "Utilisateur")

**Cause :** Le profil n'existe pas dans la table `profiles`

**Solution :**
1. Vérifiez que le trigger fonctionne
2. Créez le profil manuellement :

```sql
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Prénom', 'Nom', 'student'
FROM auth.users
WHERE email = 'votre@email.com';
```

### Erreur "relation public.profiles does not exist"

**Cause :** Le script SQL n'a pas été exécuté

**Solution :** Exécutez le fichier `/supabase-setup.sql` dans le SQL Editor

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez que le script SQL a bien été exécuté
2. Vérifiez que vos variables d'environnement sont correctes
3. Vérifiez la console du navigateur pour les erreurs

---

## ✅ Checklist de déploiement

Avant de passer en production, vérifiez :

- [ ] Script SQL exécuté dans Supabase
- [ ] Compte admin créé et testé
- [ ] Variables d'environnement configurées en local
- [ ] Inscription candidat testée
- [ ] Connexion candidat testée
- [ ] Connexion admin testée
- [ ] Séparation des rôles vérifiée
- [ ] Nom utilisateur s'affiche correctement
- [ ] Variables d'environnement configurées sur Vercel
- [ ] Déploiement Vercel réussi

---

**Félicitations ! 🎉 Votre plateforme TBEE est prête pour la production !**
