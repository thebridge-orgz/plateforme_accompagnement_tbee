# ❓ FAQ - Questions fréquentes sur l'authentification TBEE

## 🔐 Sécurité et Rôles

### Q1 : Comment savoir si quelqu'un est candidat ou admin ?

**Réponse :** Le rôle est stocké dans la table `profiles` de Supabase avec 2 valeurs possibles :
- `role: 'student'` = Candidat
- `role: 'admin'` = Administrateur

Vous pouvez vérifier le rôle d'un utilisateur avec cette requête SQL :

```sql
SELECT email, first_name, last_name, role 
FROM public.profiles 
WHERE email = 'utilisateur@exemple.com';
```

---

### Q2 : Un candidat peut-il se faire passer pour un admin lors de l'inscription ?

**Réponse :** **NON, c'est impossible.**

Le système a **4 couches de sécurité** :

1. **Frontend** : Le rôle est codé en dur à `'student'`
2. **Hook useAuth** : Valeur par défaut `'student'`
3. **Trigger SQL** : Force le rôle à `'student'` côté serveur
4. **Contrainte BDD** : Valide que le rôle est `'student'` ou `'admin'`

Consultez le fichier `/SECURITE-ROLES.md` pour tous les détails.

---

### Q3 : Comment créer un compte admin ?

**Réponse :** Les admins sont créés **MANUELLEMENT** via le dashboard Supabase :

**Étape 1 :** Créer l'utilisateur dans **Authentication > Users**

**Étape 2 :** Donner le rôle admin via SQL :

```sql
UPDATE public.profiles 
SET role = 'admin',
    first_name = 'Admin',
    last_name = 'TBEE'
WHERE email = 'admin@tbee.fr';
```

Consultez le fichier `/CREER-COMPTE-ADMIN.md` pour le guide complet.

---

### Q4 : Pourquoi il n'y a pas de page d'inscription pour les admins ?

**Réponse :** C'est un **choix de sécurité volontaire**.

**✅ Avantages :**
- Pas de surface d'attaque (pas de formulaire à pirater)
- Contrôle total sur qui devient admin
- Pas de code secret à protéger ou à faire "leaker"
- Traçabilité complète des créations d'admin

**❌ Alternatives moins sûres :**
- Code secret → Peut être deviné, partagé, ou volé
- Validation par email → Peut être contournée
- Auto-inscription → Trop dangereux

---

### Q5 : Et si je modifie le code frontend pour envoyer `role: 'admin'` ?

**Réponse :** Le **trigger SQL côté serveur** ignorera votre modification.

Le trigger force **TOUJOURS** le rôle à `'student'` :

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    'student'  -- 🔒 TOUJOURS 'student', jamais 'admin'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

Le trigger s'exécute sur le **SERVEUR Supabase**, pas dans le navigateur.

---

## 🔑 Connexion

### Q6 : Pourquoi y a-t-il 2 onglets (Candidat / Admin) sur la page de connexion ?

**Réponse :** Pour **vérifier le rôle** avant de connecter l'utilisateur.

- Si vous êtes candidat et cliquez sur "Admin" → **Erreur**
- Si vous êtes admin et cliquez sur "Candidat" → **Erreur**

Cela empêche :
- Un candidat d'accéder au dashboard admin
- Un admin d'accéder au dashboard candidat

---

### Q7 : Que se passe-t-il si je me trompe d'onglet lors de la connexion ?

**Réponse :** Vous verrez un message d'erreur :

```
❌ Accès refusé : cette page est réservée aux administrateurs
```

ou

```
❌ Accès refusé : cette page est réservée aux candidats
```

Vous serez **automatiquement déconnecté** et devrez vous reconnecter avec le bon onglet.

---

### Q8 : Pourquoi le nom affiché est "Utilisateur" ?

**Réponse :** Plusieurs causes possibles :

**Cause 1 :** Vous êtes en mode Figma Make (sans `.env.local`)
- **Solution :** Créez le fichier `.env.local` avec vos clés Supabase

**Cause 2 :** Le profil n'existe pas dans la table `profiles`
- **Solution :** Exécutez le script `/supabase-setup.sql` dans Supabase

**Cause 3 :** Le trigger SQL n'a pas été exécuté
- **Solution :** Vérifiez que le trigger existe :

```sql
SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
```

---

## 📧 Emails et Confirmation

### Q9 : Dois-je confirmer mon email après l'inscription ?

**Réponse :** **Oui**, par défaut Supabase envoie un email de confirmation.

**Pour désactiver la confirmation :**

1. Allez dans Supabase → **Authentication** → **Email Templates**
2. Désactivez "Confirm signup" si vous voulez autoriser les connexions sans confirmation

---

### Q10 : Je ne reçois pas l'email de confirmation

**Réponses possibles :**

1. **Vérifiez vos spams** (dossier courrier indésirable)

2. **Email de développement** : En mode dev, Supabase ne peut pas envoyer d'emails. Vérifiez dans le dashboard Supabase → **Authentication** → **Users** → Cliquez sur le user → **Email confirmed** (manuel)

3. **Configurez un provider SMTP** dans Supabase → **Settings** → **Auth** → **SMTP Settings**

---

## 🗄️ Base de données

### Q11 : Où sont stockés les mots de passe ?

**Réponse :** Dans la table `auth.users` de Supabase, **hachés avec bcrypt**.

⚠️ **JAMAIS en clair** dans la BDD.

Les mots de passe ne sont **PAS** stockés dans la table `profiles`.

---

### Q12 : Comment supprimer un utilisateur ?

**Réponse :** Via le dashboard Supabase :

1. Allez dans **Authentication** → **Users**
2. Trouvez l'utilisateur
3. Cliquez sur le menu **...** → **Delete user**

⚠️ **ATTENTION :** Cela supprime aussi le profil dans la table `profiles` (grâce à `ON DELETE CASCADE`)

---

### Q13 : Comment changer le rôle d'un utilisateur ?

**Pour promouvoir un candidat en admin :**

```sql
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'candidat@exemple.com';
```

**Pour rétrograder un admin en candidat :**

```sql
UPDATE public.profiles 
SET role = 'student' 
WHERE email = 'admin@exemple.com';
```

⚠️ L'utilisateur doit se **déconnecter et reconnecter** pour que le changement prenne effet.

---

## 🚀 Déploiement

### Q14 : Comment déployer sur Vercel ?

**Réponse :** Suivez ces étapes :

1. **Pusher le code sur GitHub**
2. **Connecter le repo à Vercel**
3. **Ajouter les variables d'environnement** dans Vercel :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. **Deploy !**

Consultez le fichier `/GUIDE-SUPABASE.md` section "Étape 6 : Déployer sur Vercel"

---

### Q15 : L'app fonctionne en local mais pas sur Vercel

**Causes possibles :**

1. **Variables d'environnement manquantes**
   - Vérifiez dans Vercel → **Settings** → **Environment Variables**

2. **Mauvaises clés Supabase**
   - Vérifiez que vous avez copié les bonnes clés depuis Supabase

3. **Script SQL non exécuté**
   - Exécutez le fichier `/supabase-setup.sql` dans Supabase SQL Editor

---

## 🔄 Migration et données

### Q16 : Comment sauvegarder les données ?

**Réponse :** Supabase fait des backups automatiques.

**Pour un backup manuel :**

```sql
-- Exporter tous les profils
COPY (SELECT * FROM public.profiles) 
TO '/tmp/profiles_backup.csv' 
WITH CSV HEADER;
```

---

### Q17 : Comment importer des utilisateurs existants ?

**Réponse :** Utilisez l'API Supabase ou le SQL Editor :

```sql
-- 1. Créer les users dans auth.users (nécessite les droits superadmin)
-- 2. Puis créer les profils
INSERT INTO public.profiles (id, email, first_name, last_name, role)
VALUES 
  ('uuid-1', 'user1@exemple.com', 'User', 'One', 'student'),
  ('uuid-2', 'user2@exemple.com', 'User', 'Two', 'student');
```

---

## 🐛 Debugging

### Q18 : Comment voir les erreurs d'authentification ?

**Réponse :** Ouvrez la console du navigateur (F12) et regardez l'onglet **Console**.

Les erreurs Supabase sont affichées en rouge.

---

### Q19 : L'app affiche un écran blanc

**Réponse :** Vérifiez la console du navigateur pour voir l'erreur exacte.

**Causes fréquentes :**
1. Erreur dans le client Supabase (mauvaises clés)
2. Le hook `useAuth` n'arrive pas à se connecter
3. Une erreur JavaScript bloque le rendu

---

### Q20 : Comment tester sans vraie BDD ?

**Réponse :** L'app fonctionne en **mode mock** sans fichier `.env.local`.

Dans ce mode :
- Pas de connexion à Supabase
- Pas d'authentification réelle
- Nom par défaut : "Utilisateur"
- Parfait pour tester l'interface

---

## 📞 Support

### Q21 : J'ai un problème non listé ici

**Consultez ces fichiers :**

- `/GUIDE-SUPABASE.md` - Guide complet de configuration
- `/SECURITE-ROLES.md` - Sécurité des rôles
- `/CREER-COMPTE-ADMIN.md` - Création de comptes admin
- `/RECAP-MODIFICATIONS.md` - Résumé des modifications

---

**🎉 Si votre question n'est toujours pas résolue, vérifiez les logs Supabase dans le dashboard !**
