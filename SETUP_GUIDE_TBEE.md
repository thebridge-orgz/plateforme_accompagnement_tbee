# 🚀 Guide Complet Installation - TBEE Supabase

## 📋 Étape 1 : Exécuter le script SQL

1. **Ouvrez votre projet Supabase** → https://app.supabase.com/
2. **Allez dans** : SQL Editor → New Query
3. **Copiez-collez** le contenu complet de `database_setup_tbee_new.sql`
4. **Exécutez** le script (bouton ► Run)
5. **Attendez** ~10 secondes

### ✅ Si succès :
Vous verrez à la fin de l'exécution :
```
🎉 Configuration TERMINÉE ! Base de données prête pour TBEE.
```

### ❌ Si erreur "relation 'public.profiles' does not exist" :
C'est que votre base vient d'être créée. **Relancez simplement le script**, il va créer toutes les tables depuis zéro.

---

## 🔐 Étape 2 : Créer un utilisateur ADMIN de test

1. **Allez dans** : Supabase → Authentication → Users
2. **Cliquez** : "Add user"
3. **Remplissez** :
   - Email : `admin@tbee.fr`
   - Password : `AdminTBEE2024!`
4. **Dans "User metadata"**, collez :
```json
{
  "first_name": "Admin",
  "last_name": "TBEE",
  "role": "admin",
  "has_rqth": false
}
```
5. **Confirmez** la création

**Alternative** : Vous pouvez aussi utiliser cette requête SQL dans l'SQL Editor :
```sql
-- ⚠️ Décommentez et lancez ce script UNIQUEMENT si le trigger on_auth_user_created fonctionne
-- INSERT INTO auth.users (
--     instance_id,
--     id,
--     aud,
--     role,
--     email,
--     encrypted_password,
--     email_confirmed_at,
--     raw_user_meta_data,
--     created_at,
--     updated_at
-- ) VALUES (
--     '00000000-0000-0000-0000-000000000000',
--     gen_random_uuid(),
--     'authenticated',
--     'authenticated',
--     'admin@tbee.fr',
--     crypt('AdminTBEE2024!', gen_salt('bf')),
--     NOW(),
--     '{"first_name": "Admin", "last_name": "TBEE", "role": "admin", "has_rqth": false}'::jsonb,
--     NOW(),
--     NOW()
-- );
```

---

## 🔗 Étape 3 : Vérifier la connexion Frontend

### Variables d'environnement (.env)

Vérifiez que votre `.env` contient :
```env
VITE_SUPABASE_URL=https://votre-project.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anonyme
```

Trouvez ces valeurs dans Supabase :
- **Project Settings** → **API** → "Project URL" et "anon key"

### Test de connexion

Le script diagnostic `diagnostic-supabase.html` pourra maintenant fonctionner sans erreur !

---

## 📊 Étape 4 : Comprendre la structure BD

### **PROFILES** (Utilisateurs)
Stocke les profils utilisateurs (étudiants + admins)
- Contient : email, nom, prénom, rôle, données onboarding
- RLS : Chacun voit son profil, admins voient tous

### **MODULES** (Parcours de formation)
Les 4 semaines du programme
- Semaine 1 : "Identifier mon projet" → Déverrouillé dès le départ
- Semaine 2 : "Construire mon CV" → Déverrouillé après semaine 1
- Semaine 3 : "Rechercher mon entreprise" → Déverrouillé après semaine 2
- Semaine 4 : "Réussir mon entretien" → Déverrouillé après semaine 3

### **LESSONS** (Contenu)
Leçons dans chaque module (videos, articles, exercices, quiz, checklist)
- Chaque leçon appartient à un module
- Les leçons peuvent nécessiter une validation admin

### **USER_LESSON_PROGRESS** (Progression étudiant)
Suit la progression de chaque étudiant dans chaque leçon
- Status : not_started → in_progress → completed/pending_validation → validated
- Contient les soumissions et feedback admin

### **JOB_OFFERS** (Offres d'emploi)
Base d'offres d'emploi (apprentissage, stage, professionnalisation)
- Peuvent venir de sources manuelles ou d'API (France Travail, Indeed)
- Supportent accessibilité RQTH, télétravail, etc.

### **USER_TRACKED_OFFERS** (Suivi des candidatures)
Les offres suivies par chaque étudiant
- Status : interested → applied → interview_scheduled → offer_received → accepted
- Permet aux étudiants de suivre leurs candidatures

### **USER_STATISTICS** (Statistiques étudiant)
Métriques de chaque étudiant
- Leçons complétées/validées
- Jours de streak (chaîne d'activité)
- Temps passé sur la plateforme
- Nombre de candidatures + entretiens

### **ADMIN_MESSAGES** (Communication admins → étudiants)
Messages des administrateurs aux étudiants
- Types : feedback, encouragement, question, validation
- Marquables comme lus/non-lus

### **CV_DATA** (Données CV)
Stockage des CVs téléchargés et feedback admin
- Status : not_uploaded → uploaded → under_review → approved/needs_revision

---

## 🔒 Sécurité & Politiques RLS

### Permissions ÉTUDIANTS (role = 'student') :
- ✅ Voir profil personnel + modifier
- ✅ Voir tous les modules publiés + progression personnelle
- ✅ Voir toutes les leçons
- ✅ Créer/modifier progression personnelle
- ✅ Voir offres d'emploi actives
- ✅ Suivre/modifier offres personnelles
- ✅ Voir/modifier statistiques personnelles
- ✅ Voir messages adressés à eux
- ✅ Upload/modifier CV personnel
- ❌ Voir données d'autres utilisateurs
- ❌ Valider leçons d'autres
- ❌ Créer messages admin

### Permissions ADMINS (role = 'admin') :
- ✅ Voir TOUS les profils + modifier
- ✅ Créer/modifier/publier modules et leçons
- ✅ Voir progression de TOUS les étudiants
- ✅ Valider leçons (approuver/rejeter avec feedback)
- ✅ Voir toutes les statistiques
- ✅ Créer messages pour étudiants
- ✅ Voir/modifier tous les CVs
- ✅ Gérer offres d'emploi
- ✅ Voir toutes les candidatures

---

## 🧪 Étape 5 : Tests recommandés

### Test 1 : Inscription d'étudiant
```bash
# Via le formulaire d'inscription de votre app
Email: etudiant1@tbee.fr
Password: TBEEEtudiant123!
FirstName: Marie
LastName: Dupont
```

Puis allez dans Supabase SQL Editor et exécutez :
```sql
SELECT * FROM public.profiles WHERE email = 'etudiant1@tbee.fr';
```
Vous devriez voir le profil avec `role = 'student'` et `onboarding_step = 1`

### Test 2 : Vérifier statistiques auto-créées
```sql
SELECT * FROM public.user_statistics 
WHERE user_id = (SELECT id FROM public.profiles WHERE email = 'etudiant1@tbee.fr');
```

### Test 3 : Vérifier les modules chargés
```sql
SELECT week_number, title, unlock_condition FROM public.modules ORDER BY order_index;
```
Vous devriez voir 4 modules

### Test 4 : Vérifier les politiques RLS
```sql
SELECT * FROM pg_policies WHERE tablename = 'profiles' LIMIT 5;
```

---

## 📱 Intégration Frontend

### Fichiers à vérifier/mettre à jour :

#### `src/app/auth/AuthContext.tsx`
✅ La fonction `handle_new_user()` en BD crée automatiquement le profil
✅ Le trigger `on_auth_user_created` s'active à l'inscription

Assurez-vous que `loadUserProfile()` récupère depuis la table `profiles` :
```typescript
const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
```

#### `src/context/UserDataContext.tsx`
Connectez les actions aux vraies tables Supabase :
```typescript
const updateUserProfile = async (updates: Partial<UserProfile>) => {
    const { error } = await supabase
        .from('profiles')
        .update({
            first_name: updates.firstName,
            last_name: updates.lastName,
            // ... autres champs
        })
        .eq('id', userId);
};
```

#### `src/types/index.ts` et `src/types/user.ts`
✅ Les types correspondent exactement aux colonnes BD
✅ Utilisez snake_case en BD, camelCase en code

---

## 🚨 Dépannage

### "ERREUR: relation 'public.profiles' does not exist"
**Solution** : Relancez le script. Les tables se créent en premier.

### "ERREUR: new row violates row-level security policy"
**Cause** : L'utilisateur n'a pas d'accès à cette ressource (vérifiez les politiques RLS)
**Solution** : Vérifiez que `auth.uid()` correspond à l'utilisateur qui essaie d'accéder

### "Le profil de l'utilisateur ne se crée pas automatiquement à l'inscription"
**Cause** : Le trigger `on_auth_user_created` n'est pas activé
**Solution** : Relancez le script, le trigger se recréera

### "Les modules ne s'affichent pas"
**Cause** : Les modules ne sont pas publiés (`is_published = FALSE`)
**Solution** : Vérifiez avec :
```sql
SELECT * FROM public.modules WHERE is_published = TRUE;
```

---

## 📞 Contacts & Support

- **Supabase Docs** : https://supabase.com/docs
- **Schema SQL** : Tous les détails dans le script
- **APIs JavaScript** : `npm install @supabase/supabase-js`

---

## ✅ Checklist finale

- [ ] Script SQL exécuté avec succès
- [ ] 4 modules créés et visibles
- [ ] Admin utilisateur créé
- [ ] Étudiant de test créé
- [ ] Profils créés automatiquement en BD
- [ ] RLS activé sur toutes les tables
- [ ] Police RLS vérifiées
- [ ] `.env` configuré avec URLs Supabase
- [ ] Frontend peut se connecter
- [ ] Inscription fonctionne
- [ ] Profil auto-créé après inscription

---

🎉 **Votre base de données TBEE est maintenant opérationnelle !**
