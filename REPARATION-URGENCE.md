# 🚨 RÉPARATION URGENCE - Connexion bloquée en boucle

## 🎯 SYMPTÔMES

- ❌ Bouton "Connexion en cours..." infini
- ❌ Console affiche "Auth state changed" en boucle
- ❌ Console affiche "Attente de la création du profil..." en boucle
- ❌ **JAMAIS** de message "✅ Profil récupéré" ou "❌ Erreur..."

## 🔍 CAUSE IDENTIFIÉE

**La requête pour récupérer le profil est bloquée par les politiques RLS manquantes.**

---

## ✅ SOLUTION (5 minutes)

### ÉTAPE 1 : Vérifier les nouveaux logs

1. **Ouvrez la console** (F12)
2. **Déconnectez-vous** (si connecté)
3. **Reconnectez-vous**
4. **Cherchez** ces messages :

```
🔍 Tentative de récupération du profil pour: [UUID]
📦 Réponse Supabase - data: null error: { ... }
❌ Erreur lors de la récupération du profil: { ... }
❌ Code erreur: XXXXX
❌ Message: ...
```

**Partagez le code erreur et le message !**

---

### ÉTAPE 2 : Exécuter le script de réparation RLS

1. **Allez sur** [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. **Sélectionnez** votre projet TBEE
3. **Cliquez sur** "SQL Editor" dans le menu de gauche
4. **Cliquez sur** "New Query"
5. **Copiez-collez** ce script :

```sql
-- ============================================
-- RÉPARATION DES POLITIQUES RLS
-- ============================================

-- 1. Activer RLS sur la table profiles (si pas déjà fait)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;

-- 3. Recréer les politiques CORRECTES
-- Permettre la lecture de son propre profil
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Permettre l'insertion de son propre profil
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Permettre la mise à jour de son propre profil
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Permettre aux admins de tout lire
CREATE POLICY "Admins can read all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 4. Vérifier que les politiques sont créées
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies
WHERE tablename = 'profiles';
```

6. **Cliquez sur** "Run" (ou `Ctrl+Enter`)

---

### ÉTAPE 3 : Vérifier que le trigger existe

Toujours dans le SQL Editor, exécutez :

```sql
-- Vérifier que le trigger existe
SELECT 
  trigger_name, 
  event_manipulation, 
  event_object_table, 
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
```

**Si aucun résultat** → Le trigger n'existe pas ! Exécutez :

```sql
-- Créer la fonction handle_new_user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'student' -- Force le rôle à 'student' (sécurité)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Créer le trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

### ÉTAPE 4 : Vérifier que vos profils existent

```sql
-- Afficher tous les profils
SELECT 
  id,
  email,
  first_name,
  last_name,
  role,
  created_at
FROM public.profiles
ORDER BY created_at DESC;
```

**Si votre email n'apparaît pas** → Le profil n'a pas été créé ! Créez-le manuellement :

```sql
-- Remplacez par vos vraies valeurs
INSERT INTO public.profiles (id, email, first_name, last_name, role)
VALUES (
  'VOTRE-UUID-ICI', -- Copiez l'UUID depuis auth.users
  'nous-contacter@gmail.com',
  'Moussa',
  'THIAM',
  'student'
);
```

**Pour trouver votre UUID** :

```sql
-- Trouver l'UUID de votre compte
SELECT id, email FROM auth.users WHERE email = 'nous-contacter@gmail.com';
```

---

### ÉTAPE 5 : Tester la connexion

1. **Retournez** sur `http://localhost:5173`
2. **Déconnectez-vous** (si connecté)
3. **Ouvrez la console** (F12)
4. **Reconnectez-vous**

**Logs attendus :**

```
🔐 Auth state changed: SIGNED_IN nous-contacter@gmail.com
⏳ Attente de la création du profil...
🔍 Tentative de récupération du profil pour: [UUID]
📦 Réponse Supabase - data: { ... } error: null
✅ Profil récupéré avec succès: { first_name: "Moussa", last_name: "THIAM", role: "student", ... }
✅ Redirection student-dashboard
```

**Résultat :**
- ✅ "Connexion en cours..." (1-2 sec)
- ✅ Redirection automatique vers Dashboard
- ✅ Nom affiché : "Moussa THIAM"

---

## 🆘 SI ÇA NE FONCTIONNE TOUJOURS PAS

### Cas 1 : Erreur "PGRST116" ou "permission denied"

**Cause** : Les politiques RLS bloquent la lecture

**Solution** : Vérifiez que la politique "Users can read own profile" existe bien :

```sql
SELECT policyname FROM pg_policies WHERE tablename = 'profiles';
```

Si absente, ré-exécutez l'ÉTAPE 2.

---

### Cas 2 : "data: null error: null" (pas de profil, pas d'erreur)

**Cause** : Le profil n'existe pas dans la table `profiles`

**Solution** : Créez le profil manuellement (voir ÉTAPE 4)

---

### Cas 3 : Boucle infinie continue

**Cause** : Autre problème dans le code

**Solution temporaire** : Désactivez RLS (TEMPORAIRE, pour tester) :

```sql
-- ⚠️ TEMPORAIRE - NE PAS UTILISER EN PRODUCTION
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
```

Testez la connexion. Si ça fonctionne → Le problème est bien RLS.

**PUIS** réactivez RLS :

```sql
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
```

Et ré-exécutez l'ÉTAPE 2.

---

### Cas 4 : "Cannot read property 'uid' of null"

**Cause** : Problème avec `auth.uid()` dans les politiques

**Solution** : Utilisez une approche différente :

```sql
-- Politique alternative sans auth.uid()
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;

CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (
    id = (SELECT auth.uid())
  );
```

---

## 📊 CHECKLIST DE VÉRIFICATION

Avant de dire que "ça ne marche pas", vérifiez :

- [ ] Le script RLS a été exécuté sans erreur dans Supabase
- [ ] La politique "Users can read own profile" existe (vérifiez avec la requête)
- [ ] Le trigger "on_auth_user_created" existe (vérifiez avec la requête)
- [ ] Votre profil existe dans la table `profiles` (vérifiez avec SELECT)
- [ ] Vous avez vidé le cache du navigateur (`Ctrl+Shift+R`)
- [ ] Vous avez regardé les nouveaux logs dans la console (🔍, 📦, ✅/❌)

---

## 🎯 LOGS À PARTAGER SI BESOIN D'AIDE

Si le problème persiste, partagez ces informations :

**1. Logs de la console (F12)** :
```
🔐 Auth state changed: ...
⏳ Attente de la création du profil...
🔍 Tentative de récupération du profil pour: ...
📦 Réponse Supabase - data: ... error: ...
```

**2. Résultat de cette requête** :
```sql
SELECT policyname FROM pg_policies WHERE tablename = 'profiles';
```

**3. Résultat de cette requête** :
```sql
SELECT id, email FROM public.profiles WHERE email = 'nous-contacter@gmail.com';
```

---

## ✅ RÉSULTAT ATTENDU

Une fois réparé :

```
🔐 Auth state changed: SIGNED_IN nous-contacter@gmail.com
⏳ Attente de la création du profil...
🔍 Tentative de récupération du profil pour: 2eae3c30-5f75-4765-9f84-c2ce5725abb5
📦 Réponse Supabase - data: { id: "...", email: "...", first_name: "Moussa", ... } error: null
✅ Profil récupéré avec succès: { first_name: "Moussa", last_name: "THIAM", role: "student" }
✅ Redirection student-dashboard
```

**Temps de résolution : 5-10 minutes**

---

**Version : 2.2.1**  
**Date : 13 février 2026**  
**Status : Guide de réparation urgente**
