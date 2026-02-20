# ⚡ AIDE-MÉMOIRE RAPIDE - TBEE

## 🔥 COMMANDES ESSENTIELLES

```bash
# Installation
npm install

# Lancer le serveur
npm run dev

# Arrêter le serveur
Ctrl + C

# Vider le cache et relancer
Ctrl + C
rm -rf node_modules/.vite
npm run dev
```

---

## 📂 FICHIERS CLÉS

```
tbee-project/
├── .env.local                          ← VARIABLES D'ENVIRONNEMENT
├── diagnostic-supabase.html            ← PAGE DE TEST
├── supabase-complete-setup.sql         ← SCRIPT SQL
├── GUIDE-REPARATION-COMPLET.md         ← GUIDE PAS-À-PAS
├── RECAPITULATIF.md                    ← VUE D'ENSEMBLE
├── package.json
└── src/
    ├── lib/supabase.ts                 ← CLIENT SUPABASE
    ├── hooks/useAuth.tsx               ← AUTHENTIFICATION
    └── app/
        ├── App.tsx                     ← APP PRINCIPALE
        └── components/
            ├── LoginPage.tsx           ← PAGE CONNEXION
            └── SignupPage.tsx          ← PAGE INSCRIPTION
```

---

## 🔗 URLS IMPORTANTES

| URL | Utilité |
|-----|---------|
| `http://localhost:5173` | Application TBEE |
| `http://localhost:5173/diagnostic-supabase.html` | Page de diagnostic |
| https://supabase.com/dashboard | Dashboard Supabase |
| https://vercel.com | Déploiement |

---

## 🔑 VARIABLES D'ENVIRONNEMENT

### Fichier : `.env.local` (à la racine)

```bash
VITE_SUPABASE_URL=https://xxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Où trouver les clés ?

**Supabase Dashboard** → **Settings** → **API**

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** → `VITE_SUPABASE_ANON_KEY`

---

## 🧪 TESTS RAPIDES

### Test 1 : Vérifier les variables d'environnement

```bash
# Dans le terminal
cat .env.local

# Résultat attendu :
VITE_SUPABASE_URL=https://...
VITE_SUPABASE_ANON_KEY=eyJ...
```

### Test 2 : Vérifier la connexion Supabase

Ouvrir : `http://localhost:5173/diagnostic-supabase.html`

**✅ Si tout fonctionne :**
```
✅ VITE_SUPABASE_URL trouvé
✅ VITE_SUPABASE_ANON_KEY trouvé
✅ Client Supabase créé avec succès
✅ Connexion réseau OK
✅ Table "profiles" accessible
```

### Test 3 : Inscription

Sur la page de diagnostic, section **Test 2 : Inscription** :
- Email : `test@example.com`
- Password : `password123`
- Cliquer sur **Créer un compte**

**✅ Résultat attendu :**
```
✅ COMPTE CRÉÉ !
✅ PROFIL TROUVÉ !
```

### Test 4 : Connexion

Sur la page de diagnostic, section **Test 1 : Connexion** :
- Email : `test@example.com`
- Password : `password123`
- Cliquer sur **Se connecter**

**✅ Résultat attendu :**
```
✅ CONNEXION RÉUSSIE !
✅ PROFIL TROUVÉ !
```

---

## 🐛 DÉPANNAGE EXPRESS

### Erreur : "Variables d'environnement non trouvées"

```bash
# Solution :
1. Vérifier que .env.local existe à la RACINE
2. Vérifier le contenu : cat .env.local
3. Redémarrer le serveur : Ctrl+C puis npm run dev
4. Recharger la page : Ctrl+Shift+R
```

### Erreur : "Table profiles not found"

```bash
# Solution :
1. Ouvrir Supabase Dashboard → SQL Editor
2. Copier le contenu de supabase-complete-setup.sql
3. Coller et cliquer sur Run
4. Recharger la page : Ctrl+Shift+R
```

### Erreur : "Boucle infinie" (console spam)

```bash
# Solution :
1. Recharger COMPLÈTEMENT : Ctrl+Shift+R
2. Vider le cache : F12 → Application → Clear storage
3. Redémarrer le serveur : Ctrl+C puis npm run dev
```

### Erreur : "Profil non créé"

```sql
-- Solution : Vérifier le trigger dans Supabase
-- SQL Editor → Exécuter :
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';

-- Si vide, réexécuter supabase-complete-setup.sql
```

---

## 📊 LOGS ATTENDUS (Console)

### ✅ CONNEXION RÉUSSIE

```
🔐 Session initiale trouvée: test@example.com
🔍 Récupération du profil pour: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
✅ Profil récupéré: { id: "...", email: "...", role: "student" }
🔐 Auth event: INITIAL_SESSION
⏭️ INITIAL_SESSION ignoré (déjà traité)
```

### ❌ BOUCLE INFINIE (PROBLÈME)

```
🔐 Auth event: SIGNED_IN
🔍 Récupération du profil pour: xxxxxxxx
🔐 Auth event: SIGNED_IN
🔍 Récupération du profil pour: xxxxxxxx
🔐 Auth event: SIGNED_IN
... (répété à l'infini)
```

**Si vous voyez ça → Rechargez avec Ctrl+Shift+R**

---

## 🔧 SQL RAPIDE

### Créer un admin

```sql
-- Dans Supabase SQL Editor
UPDATE public.profiles 
SET role = 'admin',
    first_name = 'Admin',
    last_name = 'TBEE'
WHERE email = 'votre@email.com';
```

### Voir tous les utilisateurs

```sql
SELECT id, email, first_name, last_name, role, created_at 
FROM public.profiles 
ORDER BY created_at DESC;
```

### Supprimer un utilisateur

```sql
-- ⚠️ ATTENTION : Ceci supprime DÉFINITIVEMENT l'utilisateur
DELETE FROM auth.users WHERE email = 'test@example.com';
-- Le profil sera supprimé automatiquement (ON DELETE CASCADE)
```

### Vérifier que le trigger existe

```sql
SELECT tgname, tgenabled 
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';
```

### Vérifier les politiques RLS

```sql
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE tablename = 'profiles';
```

---

## 📞 OBTENIR DE L'AIDE

### Ordre de priorité :

1. **Page de diagnostic** → `http://localhost:5173/diagnostic-supabase.html`
2. **GUIDE-REPARATION-COMPLET.md** → Guide pas-à-pas détaillé
3. **RECAPITULATIF.md** → Vue d'ensemble + checklist
4. **Console du navigateur** (F12) → Logs détaillés

### Informations à fournir si problème :

```bash
# 1. Version Node.js
node --version

# 2. Contenu .env.local (MASQUÉ)
cat .env.local | sed 's/\(.\{30\}\)$/******************************/'

# 3. Résultat de la page de diagnostic
# Copier les logs de la console (F12)

# 4. État de Supabase
# Capture d'écran : Supabase → Database → Triggers

# 5. Logs du serveur
# Copier les logs du terminal où tourne npm run dev
```

---

## ⏱️ TEMPS ESTIMÉS

| Action | Temps |
|--------|-------|
| Télécharger code | 2 min |
| Exécuter script SQL | 30 sec |
| Créer .env.local | 1 min |
| npm install | 2 min |
| npm run dev | 10 sec |
| Page de diagnostic | 5 min |
| Test complet | 5 min |
| **TOTAL** | **~15 min** |

---

## 🎯 CHECKLIST ULTRA-RAPIDE

```
□ Code téléchargé depuis Figma Make
□ Script SQL exécuté dans Supabase
□ .env.local créé à la racine
□ npm install exécuté
□ npm run dev lancé
□ Page diagnostic affiche tout en vert
□ Test inscription réussi
□ Test connexion réussi
□ Application fonctionne sur http://localhost:5173
```

**Si TOUTES les cases sont cochées → ✅ C'EST BON !**

---

## 🚀 DÉPLOIEMENT VERCEL (1 ligne)

```bash
# Après avoir tout testé en local :
vercel --prod
```

Puis configurer les variables d'environnement dans Vercel Dashboard.

---

**📘 Pour plus de détails → GUIDE-REPARATION-COMPLET.md**
