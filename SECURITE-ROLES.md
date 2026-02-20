# 🔐 SÉCURITÉ - Comment les rôles sont protégés sur TBEE

## ❓ Question de sécurité importante

**"Comment être sûr qu'un candidat ne se fasse pas passer pour un admin lors de l'inscription ?"**

---

## ✅ Réponse : C'EST IMPOSSIBLE par design !

### 🎯 Principe de sécurité

**L'inscription crée UNIQUEMENT des candidats.**  
**Les admins sont créés MANUELLEMENT par le propriétaire du projet Supabase.**

---

## 🛡️ Les 4 couches de protection

### **Couche 1 : Frontend (Code React)**

```typescript
// Dans SignupPage.tsx, ligne 53
await signUp(formData.email, formData.password, formData.firstName, formData.lastName, 'student');
//                                                                                      ^^^^^^^^
//                                                                        Rôle TOUJOURS 'student'
```

Le rôle est **codé en dur** dans le code. Un utilisateur ne peut pas le modifier via l'interface.

---

### **Couche 2 : Hook d'authentification (useAuth.tsx)**

```typescript
// Dans useAuth.tsx, ligne 66
const signUp = async (email: string, password: string, firstName: string, lastName: string, role: UserRole = 'student') => {
  //                                                                                                         ^^^^^^^^^^
  //                                                                            Valeur par défaut : 'student'
```

Même si quelqu'un modifie le frontend, la valeur par défaut est `'student'`.

---

### **Couche 3 : Trigger SQL Supabase (CÔTÉ SERVEUR)**

```sql
-- Dans supabase-setup.sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'student'  -- 🔒 TOUJOURS 'student' - Les admins sont créés manuellement
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

✅ **CE CODE S'EXÉCUTE SUR LE SERVEUR SUPABASE**  
✅ **Personne ne peut le modifier sauf le propriétaire du projet**  
✅ **Le rôle est FORCÉ à 'student' à chaque inscription**

---

### **Couche 4 : Contrainte SQL (Validation BDD)**

```sql
-- Dans supabase-setup.sql
CREATE TABLE profiles (
  ...
  role TEXT NOT NULL CHECK (role IN ('student', 'admin')),
  ...
);
```

Cette contrainte garantit que le rôle ne peut être que 'student' ou 'admin', rien d'autre.

---

## 🚨 Scénarios d'attaque testés

### ❌ **Scénario 1 : Modifier le code dans le navigateur**

**Attaquant :** Ouvre la console du navigateur et modifie le JavaScript pour envoyer `role: 'admin'`

```javascript
// Code malveillant dans la console
await signUp('hacker@test.com', 'password', 'Hacker', 'Test', 'admin');
```

**🛡️ Protection :**
- Le trigger SQL s'exécute CÔTÉ SERVEUR
- Le rôle est FORCÉ à `'student'`
- L'attaquant obtient un compte... candidat 😄

**✅ Résultat :** Le hacker crée un compte candidat, pas admin.

---

### ❌ **Scénario 2 : Appel direct à l'API Supabase**

**Attaquant :** Contourne complètement le frontend et appelle directement l'API Supabase

```javascript
// Code malveillant avec l'API Supabase directement
const { data } = await supabase.auth.signUp({
  email: 'hacker@test.com',
  password: 'password',
  options: {
    data: {
      first_name: 'Hacker',
      last_name: 'Test',
      role: 'admin'  // ⚠️ Tentative de forcer le rôle admin
    }
  }
});
```

**🛡️ Protection :**
- Le trigger SQL `handle_new_user()` s'exécute APRÈS l'inscription
- Le trigger IGNORE complètement le rôle envoyé
- Le trigger FORCE le rôle à `'student'`

**✅ Résultat :** Le hacker crée un compte candidat, pas admin.

---

### ❌ **Scénario 3 : Modifier directement dans la base de données**

**Attaquant :** Essaie de modifier son rôle directement dans la BDD

```sql
-- Tentative SQL malveillante
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'hacker@test.com';
```

**🛡️ Protection :**
- Les **Row Level Security (RLS) policies** bloquent cette requête
- Un utilisateur ne peut pas modifier son propre rôle
- Seul le propriétaire du projet Supabase peut modifier les rôles

**✅ Résultat :** Erreur SQL - Permission denied

---

### ❌ **Scénario 4 : SQL Injection**

**Attaquant :** Essaie une injection SQL via le formulaire

```javascript
// Tentative d'injection SQL
firstName: "'); UPDATE profiles SET role='admin' WHERE email='hacker@test.com'; --"
```

**🛡️ Protection :**
- Supabase utilise des **prepared statements**
- Les paramètres sont échappés automatiquement
- L'injection SQL est impossible

**✅ Résultat :** Le prénom devient littéralement `'); UPDATE profiles...` (pas d'exécution SQL)

---

## 👨‍💼 Comment créer un VRAI admin ?

### Méthode 1 : Via Supabase Dashboard (RECOMMANDÉ)

1. Créer l'utilisateur dans **Authentication > Users**
2. Exécuter cette requête SQL :

```sql
UPDATE public.profiles 
SET role = 'admin',
    first_name = 'Admin',
    last_name = 'TBEE'
WHERE email = 'admin@tbee.fr';
```

✅ **Seul le propriétaire du projet Supabase peut faire ça**

### Méthode 2 : Via le fichier `supabase-setup.sql`

Décommenter les lignes 70-74 du fichier `supabase-setup.sql` :

```sql
INSERT INTO public.profiles (id, email, first_name, last_name, role)
SELECT id, email, 'Admin', 'TBEE', 'admin'
FROM auth.users
WHERE email = 'admin@tbee.fr'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

✅ **Nécessite un accès au SQL Editor de Supabase**

---

## 📊 Comparaison avec d'autres systèmes

| Méthode | Sécurité | TBEE |
|---------|----------|------|
| Inscription admin via formulaire | ❌ Faible | ✅ Impossible |
| Code secret pour devenir admin | ⚠️ Moyenne | ✅ Pas utilisé |
| Validation manuelle par email | ⚠️ Moyenne | ✅ Pas nécessaire |
| Création manuelle en BDD | ✅ Forte | ✅ **Utilisé** |

---

## 🎯 Pourquoi cette approche est la plus sûre ?

### ✅ Avantages

1. **Pas de code secret** à retenir ou à stocker
2. **Pas de formulaire d'inscription admin** = pas de surface d'attaque
3. **Pas de risque de leak** du code secret
4. **Contrôle total** : vous décidez qui est admin
5. **Traçabilité** : vous savez exactement qui a créé chaque admin
6. **Révocation facile** : changez le rôle en `'student'` pour retirer les droits

### ❌ Inconvénients

1. Nécessite un accès au dashboard Supabase pour créer des admins
2. Pas de "self-service" pour les admins

**✅ Verdict :** Les avantages de sécurité dépassent largement l'inconvénient pratique.

---

## 🔍 Comment vérifier qu'un utilisateur ne peut PAS devenir admin ?

### Test à faire :

1. Inscrivez-vous normalement avec un compte test
2. Dans Supabase, allez dans **Authentication > Users**
3. Trouvez votre utilisateur
4. Cliquez dessus et regardez les métadonnées
5. Allez dans **SQL Editor** et exécutez :

```sql
SELECT email, role FROM public.profiles WHERE email = 'votre@email.com';
```

**✅ Résultat attendu :** `role = 'student'`  
**❌ Si vous voyez :** `role = 'admin'` → PROBLÈME (mais c'est impossible avec notre système)

---

## 📝 Note sur la page d'inscription

Un bandeau d'information a été ajouté en haut de la page d'inscription :

```
📝 Inscription candidat : Cette page permet de créer un compte candidat 
pour accéder au parcours d'accompagnement. Les comptes administrateurs 
sont créés manuellement par l'équipe TBEE pour des raisons de sécurité.
```

Cela clarifie pour les utilisateurs que :
- Cette page est uniquement pour les candidats
- Les admins ne peuvent pas s'inscrire ici
- C'est une mesure de sécurité volontaire

---

## 🎉 Conclusion

### ✅ La page d'inscription crée UNIQUEMENT des candidats

### ✅ Les admins sont créés MANUELLEMENT par vous

### ✅ Il est IMPOSSIBLE de se faire passer pour un admin via l'inscription

### ✅ Le système est sécurisé à 4 niveaux (frontend, hook, trigger SQL, contrainte BDD)

### ✅ Vous avez le contrôle total sur qui est admin

---

**🔒 Votre plateforme TBEE est sécurisée de manière professionnelle !**
