# 🚀 QUICK START - TBEE SUPABASE

## Résumé en 5 minutes

### ✅ Ce qui vient d'être créé

J'ai préparé **5 fichiers complets** pour intégrer Supabase à ton projet TBEE :

1. **`database_setup_tbee_new.sql`** (450+ lignes)
   - Script SQL complet pour nouvelle base vierge
   - ✅ Crée 9 tables (profiles, modules, lessons, etc.)
   - ✅ Active RLS sur toutes les tables
   - ✅ 30+ politiques de sécurité (étudiants vs admins)
   - ✅ Crée 4 modules de base
   - ✅ Triggers automatiques

2. **`SETUP_GUIDE_TBEE.md`**
   - Instructions étape par étape
   - Comment exécuter le script SQL
   - Comment créer un admin de test
   - Dépannage des erreurs courantes

3. **`SUPABASE_INTEGRATION.ts`**
   - Fonctions prêtes à copier-coller
   - Mappers camelCase ↔ snake_case
   - Chargement/édition de données
   - Exemples d'utilisation

4. **`MIGRATION_CHECKLIST.md`**
   - Checklist complète de migration code
   - Fichiers à modifier dans le projet
   - Mappage champs BD vs TypeScript
   - Erreurs courantes et solutions

5. **`ARCHITECTURE_COMPLETE.md`**
   - Diagrammes flux de données
   - Flux auth (étudiants + admins)
   - Exemples requêtes SQL
   - Vue globale de l'architecture

---

## 🎯 PAR OÙ COMMENCER?

### ÉTAPE 1 : Configuration BD (5 min) ⏱️

```bash
1. Ouvre ton projet Supabase : https://app.supabase.com/
2. Va dans : SQL Editor → New Query
3. Copie TOUT le contenu de database_setup_tbee_new.sql
4. Colle dans l'éditeur SQL
5. Click RUN (▶️ bouton)
6. ATTENDS la fin → Tu verras "🎉 Configuration TERMINÉE"
```

**✅ SI SUCCÈS** : Passe à l'étape 2
**❌ SI ERREUR** : Relance simplement le script (les tables se créent)

---

### ÉTAPE 2 : Créer un admin de test (3 min)

**Option A** : Via interface web (plus facile)
```
1. Supabase → Authentication → Users
2. "Add user"
3. Email: admin@tbee.fr
4. Password: AdminTBEE2024!
5. User metadata (copie-colle) :
   {"first_name": "Admin", "last_name": "TBEE", "role": "admin"}
6. Créer
```

**Option B** : Créer via formulaire d'inscription (TBEE)
```
Ça va créer un profil automatiquement en tant que 'student',
puis tu changes le rôle manuellement dans Supabase.
```

---

### ÉTAPE 3 : Vérifier que ça marche (2 min)

Va dans Supabase → SQL Editor → New Query → Copie-colle :

```sql
-- Vérifier que les tables existent
SELECT COUNT(*) as nb_modules FROM public.modules;
-- Résultat attendu : 4

-- Vérifier les modules
SELECT week_number, title FROM public.modules ORDER BY week_number;
-- Résultat attendu : 4 modules (Identifier projet, CV, Recherche, Entretien)

-- Vérifier les politiques RLS
SELECT COUNT(*) FROM pg_policies WHERE schemaname = 'public';
-- Résultat attendu : 30+
```

---

### ÉTAPE 4 : Intégrer le frontend (1h)

**⚠️ IMPORTANT** : Tu as du code avec `'student'` mais la BD utilise `'student'`

1. **Ouvre** : `src/types/user.ts`
2. **Change** : `'student'` → `'student'`
3. **Cherche-remplace** partout dans le projet

```typescript
// Avant ❌
export type UserRole = 'student' | 'admin';

// Après ✅
export type UserRole = 'student' | 'admin';
```

Ensuite :
- [ ] Connecte `UserDataContext.tsx` à Supabase
- [ ] Connecte `AdminDataContext.tsx` à Supabase
- [ ] Utilise les fonctions de `SUPABASE_INTEGRATION.ts`

**Regarde** : `MIGRATION_CHECKLIST.md` pour les détails

---

### ÉTAPE 5 : Tester de bout en bout (10 min)

```bash
1. Lance le front : npm run dev
2. Clique "Inscription"
3. Email: etudiant1@tbee.fr, Password: Test123!
4. Complète le formulaire
5. Tu arrives au dashboard étudiant
6. Ouvre Supabase → Data Browser → profiles
7. Tu vois la ligne crée automatiquement ✓
```

---

## 📊 Vérifications rapides

### La BD est OK?
```bash
Supabase → Tables Browser :
☑️ profiles         (pour les utilisateurs)
☑️ modules          (4 modules chargés?)
☑️ lessons          (pour le contenu)
☑️ user_lesson_progress  (pour le suivi)
☑️ job_offers       (pour les offres)
☑️ user_tracked_offers   (pour les candidatures)
☑️ user_statistics  (pour les métriques)
☑️ admin_messages   (pour la communication)
☑️ cv_data          (pour les CVs)
```

### RLS est activé?
```bash
Supabase → Table Editor → En haut de chaque table :
✅ RLS enabled: ON
```

### Politiques existent?
```bash
Supabase → Authentication → Policies :
- "Users can view own profile" (profiles)
- "Admins can view all profiles" (profiles)
- "Users can view own progress" (user_lesson_progress)
- etc.
```

---

## 🔐 Sécurité

**Politiques RLS en place** :
- ✅ Étudiants ne voient QUE leurs données
- ✅ Admins voient TOUS les étudiants
- ✅ Admins peuvent valider les leçons
- ✅ Offres d'emploi visibles pour tous
- ✅ Chacun suit uniquement SES candidatures

**Personne ne peut** :
- ❌ Voir les données d'un autre étudiant
- ❌ Modifier le rôle d'un utilisateur (sans accès direct BD)
- ❌ Valider ses propres leçons (RLS l'empêche)

---

## 🆘 Erreurs courantes & solutions

| Erreur | Cause | Solution |
|--------|-------|----------|
| "relation 'public.profiles' does not exist" | Base vierge | Relance le script SQL |
| "role 'student' does not exist" | Code ancien | Remplace 'student' → 'student' |
| "new row violates row-level security" | RLS bloque l'accès | Vérifie que auth.uid() = l'utilisateur |
| "Column 'first_name' does not exist" | Utilises camelCase | Utilise snake_case en BD |
| Le profil ne se crée pas auto | Trigger non activé | Relance le script |

---

## 📞 En cas de besoin

1. **Voir les logs BD** : Supabase → Logs → Postgres Logs
2. **Vérifier les permissions** : Supabase → Settings → API
3. **Relancer le script** : Rien n'est cassé, on recommence

---

## 🎯 Prochaines étapes

1. ✅ Exécute le script SQL
2. ✅ Crée un admin de test
3. ✅ Vérifie les tables dans Supabase
4. ✅ Change 'student' → 'student' dans le code
5. ✅ Intègre les fonctions de SUPABASE_INTEGRATION.ts
6. ✅ Teste inscription → profil auto-créé
7. ✅ Teste connexion → tableau de bord
8. ✅ Teste complétion module → BD mise à jour
9. ✅ Teste admin valide leçon → étudiant le voit

---

## 📁 Fichiers de référence

- **SQL complet** : `database_setup_tbee_new.sql`
- **Guide d'installation** : `SETUP_GUIDE_TBEE.md`
- **Fonctions d'intégration** : `SUPABASE_INTEGRATION.ts`
- **Checklist migration** : `MIGRATION_CHECKLIST.md`
- **Architecture globale** : `ARCHITECTURE_COMPLETE.md`

---

## ✅ Checklist final

- [ ] Script SQL exécuté ✓
- [ ] 9 tables créées ✓
- [ ] 4 modules chargés ✓
- [ ] RLS activé ✓
- [ ] Admin de test créé ✓
- [ ] Code changé 'student' → 'student' ✓
- [ ] Contextes connectés à Supabase ✓
- [ ] Inscription teste ✓
- [ ] Profil auto-créé en BD ✓
- [ ] Dashboard affiche les données ✓

---

🎉 **Bonne chance! Ta plateforme TBEE est maintenant prête pour Supabase!**

**Questions?** Regarde les fichiers de référence ci-dessus.
