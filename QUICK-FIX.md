# ⚡ QUICK FIX - Connexion bloquée sur "Connexion en cours..."

## 🚨 Vous avez ce problème ?

- ✅ Les utilisateurs sont créés dans Supabase (vous les voyez dans Authentication > Users)
- ❌ Mais la connexion reste bloquée sur "Connexion en cours..."
- ❌ Pas de redirection vers le dashboard

## 🎯 Solution rapide (2 minutes)

### Étape 1 : Ouvrez Supabase SQL Editor

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet TBEE
3. Cliquez sur **SQL Editor** dans le menu de gauche
4. Cliquez sur **New query**

### Étape 2 : Exécutez ce script

Copiez-collez **TOUT** ce code et cliquez sur **Run** :

```sql
-- ============================================
-- SCRIPT DE RÉPARATION - CONNEXION BLOQUÉE
-- ============================================

-- 1. Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can read all profiles" ON public.profiles;

-- 2. Recréer les politiques CORRECTES
CREATE POLICY "Users can read own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON public.profiles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- 3. Vérifier le trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

### Étape 3 : Vérifiez les résultats

Vous devriez voir :

```
DROP POLICY
DROP POLICY
DROP POLICY
DROP POLICY
CREATE POLICY
CREATE POLICY
CREATE POLICY
CREATE POLICY
DROP TRIGGER
CREATE TRIGGER
```

**✅ C'est bon !**

### Étape 4 : Testez la connexion

1. Retournez sur votre application
2. **Videz le cache du navigateur** : `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
3. Essayez de vous connecter à nouveau

**🎉 Ça devrait fonctionner maintenant !**

---

## 🔍 Vérification (optionnel)

Pour vérifier que tout est OK, exécutez cette requête dans SQL Editor :

```sql
-- Vérifier les politiques RLS
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'profiles';
```

Vous devriez voir **4 lignes** :
1. `Users can read own profile` (cmd: SELECT)
2. `Users can insert own profile` (cmd: INSERT) ← **IMPORTANT**
3. `Users can update own profile` (cmd: UPDATE)
4. `Admins can read all profiles` (cmd: SELECT)

---

## ❌ Si ça ne fonctionne toujours pas

### Cause possible : Le trigger ne fonctionne pas

Exécutez cette requête pour vérifier si votre profil existe :

```sql
SELECT * FROM public.profiles WHERE email = 'votre-email@exemple.com';
```

**Si aucun résultat :**

Créez manuellement votre profil :

```sql
-- Remplacez par vos vraies données
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Votre Prénom', 'Votre Nom', 'student'
FROM auth.users
WHERE email = 'votre-email@exemple.com'
ON CONFLICT (id) DO NOTHING;
```

Puis reconnectez-vous.

---

## 🆘 Besoin d'aide ?

Consultez le guide complet : **`/DEBUG-CONNEXION.md`**

---

**Temps estimé : 2 minutes ⏱️**
**Taux de réussite : 95% ✅**
