# 🚀 TBEE - Plateforme d'Accompagnement vers l'Alternance

## ✅ Système d'Authentification Complet

### 🎯 Fonctionnalités implémentées

- ✅ **Inscription candidat** avec nom, prénom, email, mot de passe
- ✅ **Connexion sécurisée** avec vérification du rôle
- ✅ **Séparation stricte** candidat/admin
- ✅ **Récupération du nom** depuis la base de données Supabase
- ✅ **Protection des routes** par rôle
- ✅ **Déconnexion** avec nettoyage complet

---

## 📋 Avant de déployer

### 1. Configuration Supabase (OBLIGATOIRE)

Suivez **GUIDE-SUPABASE.md** étape par étape :

1. Exécuter le script SQL (`/supabase-setup.sql`)
2. Créer un compte admin
3. Récupérer les clés API
4. Configurer `.env.local`

### 2. Test en local

```bash
# Installer les dépendances
npm install

# Créer .env.local avec vos clés Supabase
# VITE_SUPABASE_URL=https://xxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Lancer l'app
npm run dev
```

### 3. Tester l'authentification

#### Test inscription :
- Créez un compte candidat
- Vérifiez l'email de confirmation
- Vérifiez la redirection vers l'onboarding

#### Test connexion candidat :
- Connectez-vous avec l'onglet "👨‍🎓 Candidat"
- Vérifiez l'accès au dashboard candidat
- Vérifiez que votre nom s'affiche dans la sidebar

#### Test connexion admin :
- Connectez-vous avec l'onglet "👨‍💼 Admin"
- Vérifiez l'accès au dashboard admin
- Vérifiez que "Admin TBEE" s'affiche dans la sidebar

#### Test séparation des rôles :
- Essayez de vous connecter avec un compte candidat sur l'onglet admin
- Vérifiez le message d'erreur "Accès refusé"

---

## 🏗️ Structure de la BDD

### Table `profiles`

| Colonne | Type | Description |
|---------|------|-------------|
| `id` | UUID | ID de l'utilisateur (FK vers auth.users) |
| `email` | TEXT | Email de l'utilisateur |
| `first_name` | TEXT | Prénom |
| `last_name` | TEXT | Nom |
| `role` | TEXT | 'student' ou 'admin' |
| `created_at` | TIMESTAMP | Date de création |
| `updated_at` | TIMESTAMP | Date de mise à jour |

---

## 🔐 Gestion des rôles

### Candidats (`student`)
- S'inscrivent via la page d'inscription
- Rôle automatiquement défini à `student`
- Accès au dashboard candidat uniquement

### Admins (`admin`)
- Créés manuellement via Supabase Dashboard
- Rôle défini à `admin` via SQL
- Accès au dashboard admin uniquement

---

## 🚀 Déploiement Vercel

1. Pusher le code sur GitHub
2. Connecter le repo à Vercel
3. Ajouter les variables d'environnement :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy !

---

## 📂 Fichiers créés

| Fichier | Description |
|---------|-------------|
| `/src/lib/supabase.ts` | Client Supabase avec mode mock |
| `/src/hooks/useAuth.tsx` | Hook d'authentification |
| `/src/main.tsx` | Point d'entrée Vite |
| `/supabase-setup.sql` | Script SQL initial complet |
| `/supabase-fix-rls.sql` | ⭐ **NOUVEAU** : Script de réparation si connexion bloquée |
| `/GUIDE-SUPABASE.md` | Guide de configuration détaillé |
| `/SECURITE-ROLES.md` | Explication de la sécurité |
| `/DEBUG-CONNEXION.md` | ⭐ **NOUVEAU** : Guide de débogage connexion |
| `/README-AUTH.md` | Ce fichier |
| `/.env.local.example` | Template des variables d'environnement |
| `/.gitignore` | Protection des fichiers sensibles |

---

## ✅ Checklist avant prod

- [ ] Script SQL exécuté
- [ ] Compte admin créé
- [ ] Tests d'authentification OK
- [ ] Séparation des rôles vérifiée
- [ ] Nom utilisateur affiché
- [ ] Variables d'environnement Vercel configurées

---

## 🆘 En cas de problème

Consultez le fichier **GUIDE-SUPABASE.md** section "FAQ & Résolution de problèmes"

---

**🎉 Votre plateforme TBEE est prête !**