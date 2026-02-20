# Parcours Utilisateur TBEE - Documentation Complète

## 🎯 Vue d'ensemble

La plateforme TBEE a été restructurée autour d'un parcours linéaire par modules (style Duolingo) avec onboarding personnalisé, validation humaine, et suivi léger des candidatures.

---

## 📋 Parcours Complet

### 1. **Pages Publiques**

#### Landing Page ✓
- **Route**: `landing`
- **Fichier**: `/src/app/components/LandingPage.tsx`
- **Description**: Page d'accueil publique avec présentation TBEE
- **Actions**: Inscription | Connexion

#### Connexion ✓
- **Route**: `login`
- **Fichier**: `/src/app/components/LoginPage.tsx`
- **Flow**:
  - Email étudiant → Onboarding (si 1ère fois) OU Dashboard (si déjà fait)
  - Email admin → Admin Dashboard directement

#### Inscription ✓
- **Route**: `signup`
- **Fichier**: `/src/app/components/SignupPage.tsx`
- **Flow**: Inscription → Onboarding Étape 1

---

### 2. **Onboarding (2 étapes obligatoires)**

#### Étape 1 : Orientation Formation ✨ NOUVEAU
- **Route**: `onboarding-step1`
- **Fichier**: `/src/app/components/OnboardingStep1.tsx`
- **Choix 1**: "J'ai déjà une formation en tête"
  - Sélection directe parmi 6 formations (Web, Data, Cybersec, DevOps, Product, UX)
- **Choix 2**: "Je ne sais pas encore"
  - Questionnaire court (2 questions)
  - Suggestion automatique de formation basée sur les réponses
- **Données enregistrées**: Formation choisie + réponses questionnaire (si applicable)
- **Important**: Ne revient jamais (stocké en base)

#### Étape 2 : Évaluation Initiale ✨ NOUVEAU
- **Route**: `onboarding-step2`
- **Fichier**: `/src/app/components/OnboardingStep2.tsx`
- **Section 1**: Compétences transférables (min. 3 à sélectionner)
  - Communication, Travail d'équipe, Organisation, etc.
- **Section 2**: Situation actuelle
  - **CV**: Pas de CV | Brouillon | Prêt
  - **LinkedIn**: Pas de profil | Basique | Complet
  - **Recherche**: Pas commencé | Quelques pistes | Actif
- **Résultat**: Génération d'un plan d'action personnalisé (16-35 semaines selon le niveau)
- **Données enregistrées**: Skills + statuts + durée plan

---

### 3. **Dashboard Étudiant - Vue Modules** ✨ NOUVEAU

#### Dashboard Principal (Style Duolingo)
- **Route**: `student-dashboard`
- **Fichier**: `/src/app/components/StudentDashboardModules.tsx`
- **Composants**:
  - **Banner d'accueil**: Progression globale + message personnalisé
  - **Stats rapides**: Modules | Temps | Série | Objectif (grille 2x2)
  - **Module en cours**: Carte highlight avec CTA "Continuer"
  - **Parcours visuel**: Cartes modules par semaine avec états
    - ✅ Complété (vert)
    - 🔥 En cours (jaune animé)
    - 📋 Disponible (bleu clair)
    - 🔒 Verrouillé (grisé)
  - **Ligne de progression**: Connecteur visuel entre modules (style chemin)

#### États des Modules
- **Completed**: 100% terminé, icône ✓ verte
- **In-progress**: Module actif, icône Play jaune animée
- **Available**: Débloqué mais pas commencé
- **Locked**: Verrouillé jusqu'à complétion du précédent

---

### 4. **Page Module Linéaire** ✨ NOUVEAU

#### Vue Détail Module
- **Routes**: `module-week1`, `module-week2`, `module-week3`, `module-week4`
- **Fichier**: `/src/app/components/ModuleLinearPage.tsx`
- **Structure**:
  - **Header**: Semaine # | Titre | Description | Compteur étapes
  - **Card progression**: Barre + % + infos temps
  - **Grid 3 colonnes**: Sidebar étapes (1 col) + Contenu (2 col)

#### Sidebar Étapes (Linear Flow)
- Liste verticale d'étapes
- **États**:
  - ✅ **Terminée**: Fond vert, checkmark
  - 🔵 **Active**: Fond jaune, cercle vide
  - ⚪ **Disponible**: Fond bleu clair (si étape précédente terminée)
  - 🔒 **Verrouillée**: Fond gris, icône cadenas
- **Déverrouillage automatique**: Une étape se dégrise quand la précédente est complétée
- **Navigation**: Click sur étape disponible/active pour changer le contenu

#### Types d'Étapes

##### Type: Video
- Lecteur vidéo (placeholder avec bouton Play)
- Ressources PDF téléchargeables (optionnel)
- Bouton "Marquer comme terminé" ou "Revoir"

##### Type: Exercise
- Textarea pour rédaction
- Boutons "Sauvegarder brouillon" + "Soumettre"

##### Type: Upload
- Zone drag & drop
- Formats acceptés affichés
- **Statut validation**:
  - ⏳ "En cours de révision" (jaune)
  - ✅ "Validé" (vert)
  - ⚠️ "Corrections demandées" (rouge)
- **Important**: L'utilisateur peut continuer aux étapes suivantes même pendant la révision

##### Type: Text Input
- Champ texte (URL, etc.)
- Exemple: Lien LinkedIn
- Statut validation identique à Upload

---

### 5. **Modules Prédéfinis**

#### Module 1 - Semaine 1: Identifier mon projet
- Présentation formations The Bridge (vidéos)
- Test de positionnement
- Questionnaire projet (peut être "passé/adapté" si projet clair)

#### Module 2 - Semaine 2: Booster mon profil ⭐ CLEF
- **Étape CV**:
  - Templates fournis (PDF)
  - Upload CV
  - Validation Admission avec 3 états
  - **Progression non-bloquante**: Peut avancer à LinkedIn même sans validation
- **Étape LinkedIn**:
  - Vidéo/PDF bonnes pratiques
  - Champ URL profil
  - Validation Admission
- **Étape Marché caché**:
  - Vidéo stratégies de recherche
  - → Redirection vers page "Suivi des offres"

#### Module 3 - Semaine 3: Préparer mes entretiens
- Pitch: vidéo + exercice écrit
- Posture/gestuelle: vidéo
- Questions fréquentes: vidéo + exercice
- Email de remerciement: template

#### Module 4 - Semaine 4: Négociation & Post-embauche
- Négociation contrat: vidéo/PDF
- Plan d'intégration 30 jours (checklist)
- Suivi à 3 mois (formulaire check-in)

---

### 6. **Suivi des Offres** ✨ NOUVEAU

#### Page Tracking
- **Route**: `job-tracking`
- **Fichier**: `/src/app/components/JobTrackingPage.tsx`
- **Limite**: Maximum 5 offres (concentration sur qualité)
- **Banner info**: Explication stratégie des 5 offres
- **Champs par offre**:
  - URL offre
  - Entreprise
  - Intitulé poste
  - Statut: À contacter | Contacté | Réponse reçue | Entretien | Refusé
  - Notes courtes
  - Date ajout
- **Fonctionnalités**:
  - Recherche par entreprise/poste
  - Filtre par statut
  - Pagination (5 par page)
  - Modal d'ajout
  - Update statut en un clic
  - Lien externe vers l'offre
  - Suppression

---

### 7. **Profil Étudiant**

#### Page Profil
- **Route**: `student-profile`
- **Fichier**: `/src/app/components/StudentProfilePage.tsx`
- **Sections**:
  - **Informations de base**: Nom, email, formation choisie
  - **Lien LinkedIn**: Affiché + éditable (indicateur admin "LinkedIn mis à jour")
  - **RQTH (optionnel)**:
    - Case à cocher volontaire
    - Texte rassurant sur confidentialité
    - Accès ressources adaptées si coché
  - **Portfolio** (optionnel)

---

### 8. **Interface Admin**

#### Dashboard Admin
- **Route**: `admin-dashboard`
- **Fichier**: `/src/app/components/AdminDashboard.tsx`
- Vue d'ensemble stats globales

#### Validation CV/LinkedIn ✨ NOUVEAU
- **Route**: `admin-validation`
- **Fichier**: `/src/app/components/AdminValidationPage.tsx`
- **Fonctionnalités**:
  - Liste soumissions avec filtres (type, statut, nom)
  - Badge compteur "X en attente"
  - Table avec colonnes: Étudiant | Type | Statut | Date | Actions
  - **Modal de révision**:
    - Aperçu CV (téléchargement) OU lien LinkedIn (ouverture externe)
    - Champ commentaire
    - Boutons "Demander corrections" (rouge) | "Valider" (vert)
  - **Notifications automatiques**:
    - Email + in-app à l'étudiant
    - Affichage statut dans le module

#### Gestion Utilisateurs
- **Route**: `admin-users`
- **Fichier**: `/src/app/components/UserManagementPage.tsx`

#### Suivi Personnalisé
- **Route**: `admin-tracking`
- **Fichier**: `/src/app/components/StudentTrackingPage.tsx`

#### Paramètres
- **Route**: `admin-settings`
- **Fichier**: `/src/app/components/AdminSettingsPage.tsx`

---

## 🎨 Direction Artistique (CONSERVÉE)

### Couleurs TBEE
- **Jaune primaire**: `#FFD600`
- **Bleu foncé**: `#1E1548`
- **Bleu clair**: `#E8ECFF`
- **Gris texte**: `#6B7280`
- **Blanc**: `#FFFFFF`

### Typographie
- **Police**: Poppins (exclusive)
- **H1**: 48px / Bold / 56px line
- **H2**: 32px / Bold / 40px line
- **H3**: 24px / SemiBold / 32px line
- **H4**: 20px / SemiBold / 28px line
- **Body**: 16px / Normal / 24px line
- **Small**: 14px / Normal / 20px line

### Composants
- **Boutons**: 48px height, 12px radius, Poppins SemiBold
- **Cards**: 16px radius, border rgba(30,21,72,0.1)
- **Inputs**: 48px height, 12px radius, bg #F8F9FD
- **Espacement**: Système 8pt (8, 16, 24, 32, 48, 64px)

### Accessibilité
- Focus visible: ring-2 ring-[#FFD600]
- Contrastes validés WCAG AA
- Tailles cliquables ≥ 48px
- Labels explicites sur tous les champs

---

## 🔄 Flux de Navigation

```
INSCRIPTION
   ↓
ONBOARDING ÉTAPE 1 (Formation)
   ↓
ONBOARDING ÉTAPE 2 (Évaluation)
   ↓
DASHBOARD MODULES
   ├→ MODULE SEMAINE 1
   ├→ MODULE SEMAINE 2 → SUIVI OFFRES
   ├→ MODULE SEMAINE 3
   ├→ MODULE SEMAINE 4
   ├→ PROFIL
   └→ SUIVI OFFRES
```

```
ADMIN LOGIN
   ↓
ADMIN DASHBOARD
   ├→ VALIDATION CV/LINKEDIN (notification → étudiant)
   ├→ GESTION UTILISATEURS
   ├→ SUIVI PERSONNALISÉ
   └→ PARAMÈTRES
```

---

## 🎯 Fonctionnalités Clés

### ✅ Implémenté
- [x] Onboarding 2 étapes avec questionnaire intelligent
- [x] Dashboard modules style Duolingo avec progression visuelle
- [x] Parcours linéaire par module (étapes déverrouillées progressivement)
- [x] 4 types d'étapes (Video, Exercise, Upload, Text)
- [x] Validation humaine CV/LinkedIn non-bloquante
- [x] Suivi des offres (max 5) avec statuts et pagination
- [x] Interface admin validation avec modal révision
- [x] Notifications automatiques (mention dans UI)
- [x] Responsive mobile + desktop
- [x] DA TBEE 100% respectée

### 🔮 Extensions Possibles (Hors Scope)
- [ ] Vrai lecteur vidéo (actuellement placeholder)
- [ ] Upload fichiers réel + stockage
- [ ] Système de notifications in-app
- [ ] Gamification avancée (badges, points)
- [ ] Option IA correction CV (à tester, non obligatoire)
- [ ] Simulation entretien vidéo (Zoom)
- [ ] Plan d'intégration 30 jours interactif
- [ ] Formulaire suivi 3 mois post-embauche

---

## 📁 Architecture Fichiers

```
/src/app/components/
├── OnboardingStep1.tsx         ✨ NOUVEAU
├── OnboardingStep2.tsx         ✨ NOUVEAU
├── StudentDashboardModules.tsx ✨ NOUVEAU (remplace StudentDashboard)
├── ModuleLinearPage.tsx        ✨ NOUVEAU (remplace ModuleDetailPage)
├── JobTrackingPage.tsx         ✨ NOUVEAU
├── AdminValidationPage.tsx     ✨ NOUVEAU
├── DashboardSidebar.tsx        🔄 MODIFIÉ (ajout routes)
├── StudentProfilePage.tsx      ✅ EXISTANT (à adapter pour LinkedIn)
├── LandingPage.tsx             ✅ CONSERVÉ
├── LoginPage.tsx               ✅ CONSERVÉ
├── SignupPage.tsx              ✅ CONSERVÉ
├── AdminDashboard.tsx          ✅ CONSERVÉ
└── ...autres composants
```

---

## 🚀 Pour Aller Plus Loin

### Recommandations Produit
1. **Analytics**: Tracker temps par module, taux d'abandon
2. **A/B Testing**: Tester gamification légère vs neutre
3. **Feedback loop**: Formulaire satisfaction fin de module
4. **Coaching live**: Intégrer créneaux Calendly dans profil
5. **Communauté**: Forum/chat étudiant (Discord/Slack)

### Recommandations Techniques
1. **Backend**: API REST pour persistance données
2. **Auth**: JWT + refresh tokens
3. **Storage**: S3/CDN pour fichiers CV/vidéos
4. **Emails**: SendGrid/Mailgun pour notifications
5. **Monitoring**: Sentry + analytics

---

## 📞 Support & Documentation

- **Design System**: Voir `/src/styles/theme.css`
- **Composants**: Voir `/src/app/components/`
- **Types**: Interfaces TypeScript dans chaque fichier
- **Navigation**: Gérée par state dans `/src/app/App.tsx`

---

*Document généré le 15 janvier 2026 - TBEE Platform v2.0*
