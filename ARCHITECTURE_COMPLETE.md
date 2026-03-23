# 🏗️ Architecture Complète TBEE - Supabase + React

## 📊 Vue d'ensemble du flux de données

```
┌────────────────────────────────────────────────────────────────┐
│                    PLATEFORME TBEE                             │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │           INTERFACE FRONT (React + TypeScript)           │ │
│  │                                                          │ │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │ │
│  │  │ Étudiants  │  │   Admins   │  │   Auth    │        │ │
│  │  │ Dashboard  │  │ Dashboard  │  │  Système  │        │ │
│  │  └────────────┘  └────────────┘  └────────────┘        │ │
│  │                                                          │ │
│  │              ↓↓↓ (Appels Supabase) ↓↓↓                   │ │
│  └──────────────────────────────────────────────────────────┘ │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │              SUPABASE CLIENT (JS)                        │ │
│  │  - Auth Manager                                          │ │
│  │  - Database Queries                                      │ │
│  │  - RLS Enforcement                                       │ │
│  └──────────────────────────────────────────────────────────┘ │
│                           ↓↓↓                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │           SUPABASE BACKEND (Cloud)                       │ │
│  │                                                          │ │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │         POSTGRESQL DATABASE                         │ │
│  │  │                                                     │ │
│  │  │  • profiles (Utilisateurs)                         │ │
│  │  │  • modules (4 semaines)                            │ │
│  │  │  • lessons (Contenu)                               │ │
│  │  │  • user_lesson_progress (Suivi)                    │ │
│  │  │  • job_offers (Offres d'emploi)                    │ │
│  │  │  • user_tracked_offers (Candidatures)              │ │
│  │  │  • user_statistics (Métriques)                     │ │
│  │  │  • admin_messages (Messages admins)                │ │
│  │  │  • cv_data (CVs)                                   │ │
│  │  │                                                     │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  │                      ↓↓↓                                   │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │  ROW LEVEL SECURITY (RLS) POLICIES                  │ │
│  │  │                                                     │ │
│  │  │  Étudiants :                                        │ │
│  │  │  ├─ Voir leur profil uniquement                    │ │
│  │  │  ├─ Accéder à leurs modules/leçons                │ │
│  │  │  ├─ Suivre leurs candidatures                      │ │
│  │  │  └─ Voir leurs messages/stats                      │ │
│  │  │                                                     │ │
│  │  │  Admins :                                           │ │
│  │  │  ├─ Voir TOUS les profils                          │ │
│  │  │  ├─ Valider les leçons                             │ │
│  │  │  ├─ Gérer les modules/leçons                       │ │
│  │  │  ├─ Voir toutes les statistiques                   │ │
│  │  │  └─ Envoyer des messages                           │ │
│  │  │                                                     │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  │                                                           │ │
│  │  ┌─────────────────────────────────────────────────────┐ │
│  │  │  TRIGGERS & FONCTIONS AUTOMATIQUES                  │ │
│  │  │                                                     │ │
│  │  │  ✓ Profil auto-créé à l'inscription               │ │
│  │  │  ✓ Statistiques initialisées                       │ │
│  │  │  ✓ CV structure créée                              │ │
│  │  │  ✓ Timestamp updated_at auto-maj                   │ │
│  │  │                                                     │ │
│  │  └─────────────────────────────────────────────────────┘ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
```

---

## 🔐 Flux d'authentification

```
INSCRIPTION :
┌─────────────────────────────────────────────────────────┐
│ 1. Utilisateur remplit le formulaire d'inscription     │
│    (email, password, firstName, lastName, hasRQTH)     │
└────────────────────────────────────┬────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Supabase Auth crée l'utilisateur dans auth.users    │
│    + enregistre les métadonnées                         │
└────────────────────────────────────┬────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────┐
│ 3. TRIGGER on_auth_user_created s'active               │
│    ↓                                                    │
│    ├─ Crée ligne dans profiles (role = 'student')   │
│    ├─ Crée ligne dans user_statistics                  │
│    └─ Crée ligne dans cv_data                          │
└────────────────────────────────────┬────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────┐
│ 4. Front affiche le dashboard étudiant                 │
│    + charge les 4 modules depuis la BD                 │
└─────────────────────────────────────────────────────────┘

CONNEXION :
┌─────────────────────────────────────────────────────────┐
│ 1. Utilisateur se connecte (email, password)           │
└────────────────────────────────────┬────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────┐
│ 2. Supabase Auth authentifie l'utilisateur             │
│    + retourne le JWT token                             │
└────────────────────────────────────┬────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────┐
│ 3. Front récupère le profil depuis profiles            │
│    + détermine le rôle (student vs admin)            │
└────────────────────────────────────┬────────────────────┘
                                     ↓
┌─────────────────────────────────────────────────────────┐
│ 4. ROUTE VERS LE BON DASHBOARD :                        │
│    ├─ student → studentLayout (modules, stats, CVs)  │
│    └─ admin → AdminDashboard (users, validations)      │
└─────────────────────────────────────────────────────────┘
```

---

## 👥 Flux des données ÉTUDIANT

```
┌─────────────────────────────────────────────────────────────┐
│              DASHBOARD ÉTUDIANT                             │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1. PROFIL PERSONNEL                                 │  │
│  │                                                      │  │
│  │    UserDataContext.loadUserProfile()                │  │
│  │           ↓                                          │  │
│  │    SELECT * FROM profiles WHERE id = auth.uid()    │  │
│  │           ↓                                          │  │
│  │    Affiche : nom, prénom, email, données onboarding │  │
│  │           ↓                                          │  │
│  │    Possibilité de mettre à jour via UPDATE          │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 2. MODULES & PROGRESSION                             │  │
│  │                                                      │  │
│  │    UserDataContext.loadUserModules()                │  │
│  │           ↓                                          │  │
│  │    1) SELECT * FROM modules WHERE is_published=true │  │
│  │    2) Pour chaque module, récupérer les leçons      │  │
│  │       SELECT * FROM lessons WHERE module_id = X     │  │
│  │    3) Pour chaque leçon, voir la progression        │  │
│  │       SELECT * FROM user_lesson_progress            │  │
│  │           ↓                                          │  │
│  │    Affiche : 4 modules, progression %, déverrouillage │ │
│  │           ↓                                          │  │
│  │    Clique sur module → toggle status in_progress    │  │
│  │    Complète leçon → UPDATE user_lesson_progress     │  │
│  │    Leçon validée → admin approuve/rejette           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 3. OFFRES D'EMPLOI                                   │  │
│  │                                                      │  │
│  │    JobTrackingPage component                        │  │
│  │           ↓                                          │  │
│  │    1) SELECT * FROM job_offers                       │  │
│  │       WHERE is_active=true AND expires_at > now()   │  │
│  │    2) Affiche liste des offres disponibles           │  │
│  │           ↓                                          │  │
│  │    Clique "Suivre" → INSERT dans user_tracked_offers │  │
│  │    Met à jour statut → UPDATE application_status    │  │
│  │       (interested → applied → interview → offer)    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 4. STATISTIQUES PERSONNELLES                         │  │
│  │                                                      │  │
│  │    SELECT * FROM user_statistics WHERE user_id = me │  │
│  │           ↓                                          │  │
│  │    Affiche :                                         │  │
│  │    ├─ % progression global                          │  │
│  │    ├─ Leçons complétées/validées                    │  │
│  │    ├─ Semaine en cours                               │  │
│  │    ├─ Streak jours (chaîne d'activité)              │  │
│  │    ├─ Temps total passé                              │  │
│  │    └─ Stats candidatures/entretiens                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 5. CV & FEEDBACK ADMIN                               │  │
│  │                                                      │  │
│  │    SELECT * FROM cv_data WHERE user_id = me         │  │
│  │           ↓                                          │  │
│  │    Status :                                          │  │
│  │    • not_uploaded → Upload CV                        │  │
│  │    • uploaded → Envoyé aux admins                    │  │
│  │    • under_review → En attente de feedback           │  │
│  │    • approved → CV validé ✓                          │  │
│  │    • needs_revision → Commentaires pour améliorer   │  │
│  │           ↓                                          │  │
│  │    SELECT * FROM admin_messages                      │  │
│  │    WHERE user_id = me AND is_read = false            │  │
│  │       → Affiche les messages des admins              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 👨‍💼 Flux des données ADMIN

```
┌─────────────────────────────────────────────────────────────┐
│              DASHBOARD ADMIN                                │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 1. GESTION DES UTILISATEURS                          │  │
│  │                                                      │  │
│  │    SELECT * FROM profiles WHERE role = 'student'  │  │
│  │    ORDER BY created_at DESC                          │  │
│  │           ↓                                          │  │
│  │    Affiche liste → Voir profil, modifier, stats      │  │
│  │           ↓                                          │  │
│  │    UPDATE profiles SET role='admin' (promotion)      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 2. GESTION DES MODULES & LEÇONS                      │  │
│  │                                                      │  │
│  │    Admin peut :                                      │  │
│  │    ├─ CREATE/UPDATE/DELETE modules & lessons        │  │
│  │    ├─ Publier/dépublier du contenu                  │  │
│  │    ├─ Définir conditions de déverrouillage          │  │
│  │    └─ Modifier l'ordre des leçons                    │  │
│  │           ↓                                          │  │
│  │    Les permissions RLS permettent tout CRUD          │  │
│  │    car role = 'admin'                                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 3. VALIDATION DES LEÇONS                             │  │
│  │                                                      │  │
│  │    SELECT * FROM user_lesson_progress                │  │
│  │    WHERE validation_status = 'pending'               │  │
│  │    ORDER BY submitted_at ASC                         │  │
│  │           ↓                                          │  │
│  │    Pour chaque soumission :                          │  │
│  │    ├─ Voir le contenu soumis (user_submission JSONB) │  │
│  │    ├─ Voir les infos étudiant                        │  │
│  │    ├─ Voir la leçon elle-même                        │  │
│  │           ↓                                          │  │
│  │    Admin approuve/rejette :                          │  │
│  │    UPDATE user_lesson_progress SET                   │  │
│  │      validation_status = 'approved/rejected',        │  │
│  │      status = 'validated',                           │  │
│  │      admin_feedback = '...',                         │  │
│  │      validated_by = admin_id,                        │  │
│  │      validated_at = NOW()                            │  │
│  │           ↓                                          │  │
│  │    Étudiant reçoit notification/message              │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 4. CRITIQUES & FEEDBACK UTILISATEURS                 │  │
│  │                                                      │  │
│  │    Admin peut :                                      │  │
│  │    ├─ Envoyer des messages personalisés              │  │
│  │    │  (feedback, encouragement, question, validation)│  │
│  │    ├─ Voir les CVs uploadés                          │  │
│  │    ├─ Ajouter du feedback CV                          │  │
│  │    └─ Marquer au statut (approved/needs_revision)   │  │
│  │           ↓                                          │  │
│  │    INSERT INTO admin_messages                        │  │
│  │    INSERT/UPDATE cv_data feedback                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 5. SUIVI & STATISTIQUES GLOBALES                     │  │
│  │                                                      │  │
│  │    SELECT SUM(total_lessons_completed)               │  │
│  │    FROM user_statistics                              │  │
│  │           ↓                                          │  │
│  │    Affiche :                                         │  │
│  │    ├─ Total utilisateurs actifs                      │  │
│  │    ├─ Leçons complétées au total                     │  │
│  │    ├─ Taux de complétion moyen                       │  │
│  │    ├─ CVs en attente de review                       │  │
│  │    └─ Offres d'emploi actives                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 6. GESTION DES OFFRES D'EMPLOI                       │  │
│  │                                                      │  │
│  │    Admin peut :                                      │  │
│  │    ├─ Créer/modifier/supprimer des offres            │  │
│  │    ├─ Définir accessibilité (RQTH, télétravail)      │  │
│  │    ├─ Importer depuis APIs (France Travail, Indeed)  │  │
│  │    ├─ Publier/retirer des offres                     │  │
│  │    └─ Voir les candidatures étudiants pour chaque    │  │
│  │           ↓                                          │  │
│  │    INSERT/UPDATE job_offers                          │  │
│  │    SELECT * FROM user_tracked_offers + job_offers    │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Interactions clés (Étudiant ↔ Admin)

```
ÉTAPE 1 : SOUMISSION D'EXERCICE PAR ÉTUDIANT
┌────────────────────────────────────────────────────────┐
│ Étudiant remplit un exercice                          │
│       ↓                                                │
│ UPDATE user_lesson_progress SET                       │
│   status = 'pending_validation',                      │
│   validation_status = 'pending',                      │
│   user_submission = { ... exercice JSON ... },        │
│   submitted_at = NOW()                                │
└─────────────────────────────┬──────────────────────────┘
                              ↓

ÉTAPE 2 : ADMIN REÇOIT NOTIFICATION
┌────────────────────────────────────────────────────────┐
│ Admin voit l'exercice dans AdminValidationPage        │
│       ↓                                                │
│ SELECT * FROM user_lesson_progress WHERE              │
│   validation_status = 'pending'                       │
└─────────────────────────────┬──────────────────────────┘
                              ↓

ÉTAPE 3 : ADMIN VALIDE OU REJETTE
┌────────────────────────────────────────────────────────┐
│ Admin examine l'exercice et approuve/rejette          │
│       ↓                                                │
│ UPDATE user_lesson_progress SET                       │
│   validation_status = 'approved/rejected',            │
│   status = 'validated',                               │
│   admin_feedback = '...',                             │
│   validated_by = admin_id,                            │
│   validated_at = NOW()                                │
│       ↓                                                │
│ INSERT INTO admin_messages (pour notifier l'étudiant) │
└─────────────────────────────┬──────────────────────────┘
                              ↓

ÉTAPE 4 : ÉTUDIANT REÇOIT FEEDBACK
┌────────────────────────────────────────────────────────┐
│ Étudiant voit le feedback dans studentProfilePage     │
│       ↓                                                │
│ SELECT * FROM admin_messages WHERE user_id = etudiant │
│       ↓                                                │
│ Si approved → leçon marquée comme validée ✓           │
│ Si rejected → peut réessayer                          │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Structure des fichiers clés

```
src/
├── app/
│   ├── auth/
│   │   ├── AuthContext.tsx          ← Gère authentification + création profil
│   │   ├── supabaseClient.ts        ← Initialise le client Supabase
│   │   └── ProtectedRoute.tsx       ← Vérifie que user est connecté
│   │
│   ├── components/
│   │   ├── studentProfilePage.tsx   ← Éditer profil (INTÉGRER SUPABASE)
│   │   ├── AdminDashboard.tsx       ← Vue admin (INTÉGRER SUPABASE)
│   │   ├── AdminValidationPage.tsx  ← Valider exercices
│   │   ├── ModuleDetailPage.tsx     ← Vue module + leçons
│   │   └── JobTrackingPage.tsx      ← Suivi candidatures
│   │
│   └── services/
│       └── supabase/                ← À remplir avec CRUD operations
│
├── context/
│   ├── UserDataContext.tsx          ← État utilisateur (À REFACTORISER)
│   ├── AdminDataContext.tsx         ← État admin (À REFACTORISER)
│   └── AuthContext.tsx              ← État auth global
│
├── types/
│   ├── index.ts                     ← Types TypeScript
│   └── user.ts                      ← Types utilisateur (RôLE!)
│
└── utils/
    └── initialState.ts              ← État initial (À REMPLACER)

BD SUPABASE :
├── auth/users                       ← Géré par Supabase Auth
│
└── public/
    ├── profiles                     ← Profils utilisateurs ⭐
    ├── modules                      ← 4 modules de base
    ├── lessons                      ← Contenu pédagogique
    ├── user_lesson_progress         ← Suivi utilisateur
    ├── job_offers                   ← Offres d'emploi
    ├── user_tracked_offers          ← Candidatures étudiants
    ├── user_statistics              ← Stats/métriques
    ├── admin_messages               ← Messages admins → étudiants
    └── cv_data                      ← Données CV
```

---

## 🎯 Checklist d'intégration complète

```
PHASE 1 : Configuration Supabase
[✓] Script SQL exécuté
[✓] 9 tables créées
[✓] RLS activé sur toutes les tables
[✓] Triggers créés
[✓] 4 modules chargés

PHASE 2 : Authentification
[ ] AuthContext connecté à profiles table
[ ] Profil auto-créé à l'inscription
[ ] Rôle can be 'student' or 'admin'
[ ] Admin utilisateur créé

PHASE 3 : Frontend Étudiant
[ ] UserDataContext charge depuis Supabase
[ ] studentProfilePage relie l'édition profil
[ ] ModuleDetailPage charge leçons
[ ] Progression sync en BD
[ ] JobTrackingPage connecté

PHASE 4 : Frontend Admin
[ ] AdminDataContext charge tous les utilisateurs
[ ] AdminValidationPage affiche les soumissions
[ ] Admin peut approuver/rejeter
[ ] CVs affichent feedback admin

PHASE 5 : Tests Complets
[ ] Inscription → Profil auto-créé
[ ] Connexion → Dashboard correct (student vs admin)
[ ] Étudiant complète leçon → Status mis à jour
[ ] Admin approuve leçon → Étudiant le voit
[ ] Admin crée message → Étudiant le reçoit
```

---

🎉 **Cette architecture assure un flux de données sécurisé et performant !**
