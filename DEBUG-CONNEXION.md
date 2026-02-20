# 🐛 GUIDE DE DÉBOGAGE - PROBLÈME DE CONNEXION

## 🚨 Symptôme

L'application reste bloquée sur **"Connexion en cours..."** après avoir cliqué sur le bouton de connexion ou d'inscription.

Les utilisateurs sont créés dans Supabase (on les voit dans Authentication > Users), mais la redirection vers le dashboard ne se fait pas.

---

## ✅ Solutions appliquées

### 1. **Amélioration du hook useAuth** (`/src/hooks/useAuth.tsx`)

**Problèmes corrigés :**
- Ajout d'un délai de 500ms pour laisser le trigger SQL créer le profil
- Gestion des erreurs avec try/catch
- `loading` passe toujours à `false`, même en cas d'erreur
- Logs console pour déboguer

**Code ajouté :**
```tsx
// Attendre un peu pour laisser le trigger créer le profil
await new Promise(resolve => setTimeout(resolve, 500));

console.log('Auth state changed:', event, session?.user?.email);
console.log('Profil récupéré:', profile);
```

### 2. **Amélioration de la redirection** (`/src/app/App.tsx`)

**Problèmes corrigés :**
- La condition `user && user.profile` était trop stricte
- Si le profil n'est pas chargé, redirection vers l'onboarding par défaut
- Message de warning dans la console pour déboguer

**Code modifié :**
```tsx
if (user.profile) {
  // Redirection selon le rôle
} else {
  // Fallback si le profil n'est pas chargé
  console.warn('Utilisateur connecté mais profil non chargé, redirection vers onboarding');
  setCurrentPage('onboarding-step1');
}
```

### 3. **Correction du script SQL** (`/supabase-setup.sql`)

**Problème :** Manquait une politique RLS pour l'INSERT

**Code ajouté :**
```sql
-- Les utilisateurs peuvent insérer leur propre profil (pour le trigger)
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);
```

---

## 🔍 Comment déboguer

### Étape 1 : Vérifier les logs dans la console

Ouvrez la console du navigateur (F12 ou clic droit > Inspecter > Console) et recherchez :

**✅ Logs attendus lors de la connexion :**
```
Auth state changed: SIGNED_IN ibrahimo.sinho@gmail.com
Profil récupéré: { id: "...", email: "...", first_name: "...", last_name: "...", role: "student" }
```

**❌ Logs problématiques :**
```
Erreur lors de la récupération du profil: { code: "...", message: "..." }
Utilisateur connecté mais profil non chargé, redirection vers onboarding
```

### Étape 2 : Vérifier la table `profiles` dans Supabase

1. Allez dans **Supabase Dashboard**
2. Table Editor → `profiles`
3. Vérifiez que l'utilisateur existe avec les bonnes données :
   ```
   | id | email | first_name | last_name | role | created_at |
   |----|-------|------------|-----------|------|------------|
   | xxx | ibrahimo.sinho@gmail.com | Ibrahimo | Sinho | student | 2026-02-12 |
   ```

### Étape 3 : Vérifier les politiques RLS

1. Allez dans **Supabase Dashboard**
2. Table Editor → `profiles` → **RLS enabled** (petit bouclier vert)
3. Cliquez sur le bouclier pour voir les politiques
4. Vérifiez que ces 4 politiques existent :
   - ✅ `Users can read own profile` (SELECT)
   - ✅ `Users can insert own profile` (INSERT) ← **IMPORTANT**
   - ✅ `Users can update own profile` (UPDATE)
   - ✅ `Admins can read all profiles` (SELECT)

### Étape 4 : Tester la requête SQL manuellement

Dans **SQL Editor**, exécutez cette requête :

```sql
-- Vérifier si le trigger fonctionne
SELECT * FROM public.profiles WHERE email = 'ibrahimo.sinho@gmail.com';
```

**Résultat attendu :** 1 ligne avec toutes les infos

**Si aucun résultat :** Le trigger ne fonctionne pas → Réexécutez le script `/supabase-setup.sql`

### Étape 5 : Tester la connexion manuellement

Dans **SQL Editor**, exécutez :

```sql
-- Vérifier si vous pouvez lire votre propre profil
SELECT * FROM public.profiles WHERE id = auth.uid();
```

**Si erreur "permission denied" :** Les politiques RLS bloquent → Réexécutez les politiques

---

## 🛠️ Solutions si le problème persiste

### Solution 1 : Re-créer le script SQL complet

1. Allez dans **Supabase → SQL Editor**
2. **Supprimez tout** (⚠️ ATTENTION : cela supprimera tous les profils) :
   ```sql
   DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
   DROP FUNCTION IF EXISTS public.handle_new_user();
   DROP TABLE IF EXISTS public.profiles CASCADE;
   ```

3. **Réexécutez le script complet** `/supabase-setup.sql`

4. **Créez un nouveau compte test** pour vérifier

### Solution 2 : Désactiver temporairement RLS (DANGER ⚠️)

**⚠️ À FAIRE UNIQUEMENT EN DÉVELOPPEMENT, PAS EN PRODUCTION**

```sql
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
```

Puis testez la connexion. Si ça fonctionne, le problème vient des politiques RLS.

**N'OUBLIEZ PAS DE RÉACTIVER :**
```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

### Solution 3 : Vérifier les variables d'environnement

Vérifiez que `.env.local` contient :

```env
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ Vérifiez qu'il n'y a PAS d'espaces avant ou après les valeurs !**

Redémarrez le serveur :
```bash
npm run dev
```

### Solution 4 : Créer manuellement le profil

Si le trigger ne fonctionne vraiment pas, créez le profil manuellement :

```sql
-- Remplacez les valeurs par vos données
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Ibrahimo', 'Sinho', 'student'
FROM auth.users
WHERE email = 'ibrahimo.sinho@gmail.com'
ON CONFLICT (id) DO NOTHING;
```

Puis essayez de vous reconnecter.

---

## 📊 Checklist de vérification

Avant de contacter le support, vérifiez :

- [ ] Le script SQL `/supabase-setup.sql` a été exécuté complètement
- [ ] La table `profiles` existe dans Supabase
- [ ] RLS est activé sur la table `profiles`
- [ ] Les 4 politiques RLS existent (dont INSERT)
- [ ] Le trigger `on_auth_user_created` existe
- [ ] La fonction `handle_new_user()` existe
- [ ] Le profil existe dans la table `profiles` pour votre email
- [ ] Les variables `.env.local` sont correctes
- [ ] Le serveur a été redémarré après la modification de `.env.local`
- [ ] La console du navigateur affiche les logs (pas d'erreur réseau)

---

## 🎯 Test de validation

Une fois corrigé, voici le comportement attendu :

### ✅ Inscription
1. Je remplis le formulaire d'inscription
2. Je clique sur "Créer mon compte"
3. **→ Message : "Compte créé ! Vérifiez vos emails."**
4. **→ Redirection automatique vers Onboarding Étape 1**

### ✅ Connexion candidat
1. Je vais sur l'onglet "👨‍🎓 Candidat"
2. Je remplis email + mot de passe
3. Je clique sur "Se connecter"
4. **→ "Connexion en cours..." (max 1-2 secondes)**
5. **→ Redirection automatique vers Dashboard candidat**
6. **→ Mon nom "Ibrahimo Sinho" s'affiche dans la sidebar**

### ✅ Connexion admin
1. Je vais sur l'onglet "👨‍💼 Admin"
2. Je remplis email + mot de passe
3. Je clique sur "Se connecter"
4. **→ "Connexion en cours..." (max 1-2 secondes)**
5. **→ Redirection automatique vers Dashboard admin**
6. **→ Mon nom "Admin TBEE" s'affiche dans la sidebar**

---

## 📚 Logs attendus dans la console

### ✅ Logs de connexion réussie

```
[useAuth] Auth state changed: SIGNED_IN ibrahimo.sinho@gmail.com
[useAuth] Profil récupéré: {
  id: "4850a99f-afa0-4b3a-8e1f-63a54b6bfe41",
  email: "ibrahimo.sinho@gmail.com",
  first_name: "Ibrahimo",
  last_name: "Sinho",
  role: "student",
  created_at: "2026-02-12T16:38:33.000Z",
  updated_at: "2026-02-12T16:38:33.000Z"
}
[App.tsx] Redirection vers student-dashboard pour role: student
```

### ❌ Logs d'erreur

```
[useAuth] Erreur lors de la récupération du profil: {
  code: "PGRST116",
  message: "The result contains 0 rows"
}
[App.tsx] Utilisateur connecté mais profil non chargé, redirection vers onboarding
```

**→ Si vous voyez cette erreur :** Le profil n'existe pas → Vérifiez le trigger SQL

```
[useAuth] Erreur lors de la récupération du profil: {
  code: "42501",
  message: "new row violates row-level security policy"
}
```

**→ Si vous voyez cette erreur :** Problème RLS → Ajoutez la politique INSERT manquante

---

## 🆘 Besoin d'aide ?

Si le problème persiste après avoir suivi ce guide :

1. **Copiez les logs de la console**
2. **Faites une capture d'écran de la table `profiles` dans Supabase**
3. **Vérifiez que les 4 politiques RLS existent**
4. **Envoyez ces informations au support**

---

**🎉 Bonne chance !**
