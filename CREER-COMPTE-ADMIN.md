# 👨‍💼 Comment créer un compte ADMIN sur TBEE

## 🎯 Important à savoir

Les comptes **ADMIN** ne peuvent PAS être créés via la page d'inscription.  
Ils doivent être créés **manuellement** via le dashboard Supabase pour des raisons de sécurité.

---

## 📋 Méthode 1 : Via Supabase Dashboard (RECOMMANDÉE)

### Étape 1 : Créer l'utilisateur

1. Connectez-vous à https://supabase.com
2. Sélectionnez votre projet TBEE
3. Dans le menu de gauche, cliquez sur **Authentication**
4. Cliquez sur **Users**
5. Cliquez sur **Add user** → **Create new user**

6. Remplissez le formulaire :
   ```
   Email: admin@tbee.fr (ou votre email)
   Password: ********** (choisissez un mot de passe sécurisé)
   ```
   
7. ✅ **IMPORTANT** : Cochez la case **"Auto Confirm User"**  
   (Sinon l'utilisateur devra confirmer son email)

8. Cliquez sur **Create user**

### Étape 2 : Donner le rôle admin

1. Dans Supabase, allez dans **SQL Editor**
2. Cliquez sur **+ New query**
3. Collez ce code SQL (en remplaçant l'email) :

```sql
-- Remplacez 'admin@tbee.fr' par votre email admin
UPDATE public.profiles 
SET 
  role = 'admin',
  first_name = 'Admin',
  last_name = 'TBEE'
WHERE email = 'admin@tbee.fr';
```

4. Cliquez sur **Run** (bouton en bas à droite)
5. Vérifiez le message : **Success. 1 rows affected**

### ✅ C'est terminé !

Vous pouvez maintenant vous connecter avec :
- Email : admin@tbee.fr
- Password : (celui que vous avez créé)
- Onglet : **👨‍💼 Admin**

---

## 📋 Méthode 2 : Via SQL uniquement

Si vous préférez tout faire en SQL :

```sql
-- 1. Créer l'utilisateur dans auth.users
-- NOTE: Cette méthode nécessite des droits superadmin
-- Il est plus sûr d'utiliser la Méthode 1 ci-dessus

-- 2. Ensuite, créer le profil admin
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT 
  id, 
  email, 
  'Admin', 
  'TBEE', 
  'admin'
FROM auth.users
WHERE email = 'admin@tbee.fr'
ON CONFLICT (id) DO UPDATE 
SET role = 'admin';
```

---

## 🔐 Créer plusieurs admins

Répétez simplement les étapes pour chaque admin :

### Admin 1 : Administrateur principal
```sql
UPDATE public.profiles 
SET 
  role = 'admin',
  first_name = 'Marie',
  last_name = 'Martin'
WHERE email = 'marie.martin@tbee.fr';
```

### Admin 2 : Support technique
```sql
UPDATE public.profiles 
SET 
  role = 'admin',
  first_name = 'Paul',
  last_name = 'Durand'
WHERE email = 'paul.durand@tbee.fr';
```

---

## ✅ Vérifier qu'un compte est admin

Pour vérifier le rôle d'un utilisateur :

```sql
SELECT 
  email, 
  first_name, 
  last_name, 
  role,
  created_at
FROM public.profiles 
WHERE role = 'admin';
```

Résultat attendu :
```
email              | first_name | last_name | role  | created_at
-------------------+------------+-----------+-------+------------------------
admin@tbee.fr      | Admin      | TBEE      | admin | 2024-02-12 10:30:00
```

---

## 🧪 Tester le compte admin

### 1. Aller sur la page de connexion
- URL locale : http://localhost:5173
- URL production : https://votre-app.vercel.app

### 2. Sélectionner l'onglet "👨‍💼 Admin"

### 3. Se connecter
- Email : admin@tbee.fr
- Password : (celui que vous avez créé)

### 4. Vérifications
- ✅ Connexion réussie
- ✅ Redirection vers le dashboard admin
- ✅ "Admin TBEE" affiché dans la sidebar
- ✅ Accès à toutes les fonctionnalités admin

---

## ⚠️ Sécurité

### ❌ NE PAS FAIRE :
- Ne créez PAS de comptes admin avec des mots de passe faibles
- Ne partagez PAS les identifiants admin par email non chiffré
- Ne stockez PAS les mots de passe en clair

### ✅ BONNES PRATIQUES :
- ✅ Utilisez des mots de passe de **12 caractères minimum**
- ✅ Utilisez un gestionnaire de mots de passe (1Password, Bitwarden, etc.)
- ✅ Activez l'authentification à 2 facteurs (2FA) sur Supabase
- ✅ Limitez le nombre d'admins au strict nécessaire
- ✅ Supprimez les comptes admin qui ne sont plus utilisés

---

## 🔄 Changer un candidat en admin

Si un candidat s'est inscrit et vous voulez le promouvoir admin :

```sql
-- Remplacez 'candidat@exemple.fr' par l'email du candidat
UPDATE public.profiles 
SET role = 'admin'
WHERE email = 'candidat@exemple.fr';
```

⚠️ **Attention** : Le candidat devra se **déconnecter** puis se **reconnecter** avec l'onglet "Admin".

---

## 🔄 Rétrograder un admin en candidat

Si vous voulez retirer les droits admin :

```sql
-- Remplacez 'admin@exemple.fr' par l'email de l'admin
UPDATE public.profiles 
SET role = 'student'
WHERE email = 'admin@exemple.fr';
```

⚠️ **Attention** : L'admin perdra immédiatement l'accès au dashboard admin.

---

## 🆘 Problèmes courants

### "Accès refusé" lors de la connexion admin

**Cause** : Le rôle n'est pas défini à `admin` dans la BDD

**Solution** :
```sql
SELECT email, role FROM public.profiles WHERE email = 'votre@email.com';

-- Si le rôle n'est pas 'admin', le corriger :
UPDATE public.profiles SET role = 'admin' WHERE email = 'votre@email.com';
```

### Le nom ne s'affiche pas (affiche "Utilisateur")

**Cause** : Le profil n'existe pas dans la table `profiles`

**Solution** :
```sql
-- Créer le profil manuellement
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Admin', 'TBEE', 'admin'
FROM auth.users
WHERE email = 'votre@email.com';
```

### L'utilisateur n'apparaît pas dans auth.users

**Cause** : L'utilisateur n'a pas été créé dans Supabase Auth

**Solution** : Utilisez la **Méthode 1** (via le dashboard) pour créer l'utilisateur d'abord.

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez que le script SQL `supabase-setup.sql` a été exécuté
2. Vérifiez que l'utilisateur existe dans **Authentication > Users**
3. Vérifiez que le profil existe dans la table `profiles`
4. Consultez le fichier `GUIDE-SUPABASE.md` pour plus de détails

---

**✅ Votre compte admin est prêt ! Vous pouvez maintenant gérer la plateforme TBEE.**
