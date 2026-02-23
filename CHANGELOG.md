# Journal des modifications (Changelog)

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-02-23

### Ajouté
*   **Authentification complète avec Supabase** :
    *   Mise en place du client Supabase dans `src/app/auth/supabaseClient.ts`
    *   Création du contexte d'authentification (`AuthContext`) pour gérer l'état utilisateur global
    *   Implémentation des fonctions `signIn`, `signUp` et `signOut`
    *   Gestion des sessions persistantes et restauration automatique au chargement
*   **Système de routes protégées** :
    *   Création du composant `ProtectedRoute` pour restreindre l'accès selon le rôle (`student`/`admin`)
    *   Vérification de l'authentification et redirection automatique vers la page de connexion
*   **Onboarding étudiant** :
    *   Parcours d'onboarding en deux étapes pour les nouveaux étudiants
    *   Collecte des préférences de formation (choix direct ou via questionnaire d'orientation)
    *   Évaluation des compétences transférables et de la situation actuelle (CV, LinkedIn, recherche)
    *   Sauvegarde des données dans Supabase (colonne `onboarding_data` au format JSON)
    *   Redirection automatique vers l'onboarding lors de la première connexion
*   **Tableau de bord utilisateur** :
    *   Dashboard étudiant (`src/app/pages/student/Dashboard.tsx`) accessible après onboarding
    *   Dashboard admin (`src/app/pages/admin/Dashboard.tsx`) pour la gestion de la plateforme
*   **Nouveaux types TypeScript** dans `src/types/` :
    *   `user.ts` : Interface `UserProfile` avec rôle et statut onboarding
    *   `onboarding.ts` : Typage complet des données d'onboarding
*   **Menu utilisateur dynamique** dans la `Navbar` :
    *   Affichage des boutons de connexion/inscription pour les visiteurs
    *   Menu déroulant avec initiales, nom, email et badge de rôle pour les utilisateurs connectés
    *   Options "Mon tableau de bord" et "Déconnexion"
*   **Synchronisation entre onglets** avec `BroadcastChannel` pour maintenir l'état cohérent

### Modifié
*   **Réorganisation complète de l'architecture** pour une meilleure maintenabilité :
    *   Restructuration du dossier `src/app/pages/` par domaine fonctionnel :
        *   `public/` : Pages accessibles à tous (Home, SignIn, SignUp, mentions légales, etc.)
        *   `student/` : Pages dédiées aux étudiants (Dashboard, Onboarding)
        *   `admin/` : Pages dédiées aux administrateurs (Dashboard)
    *   Déplacement des composants d'onboarding dans `src/app/components/onboarding/` pour une meilleure organisation
    *   Conservation de `NotFound.tsx` à la racine de `pages/` comme page spéciale 404
*   **Amélioration de la gestion des redirections** :
    *   Utilisation de `useEffect` pour les redirections conditionnelles (correction de l'avertissement React)
    *   Ajout de l'option `replace: true` pour une navigation plus propre
*   **Mise à jour du `ProtectedRoute`** :
    *   Ajout du paramètre `requireOnboarding` pour contrôler l'accès à l'onboarding
    *   Redirection intelligente basée sur le rôle et le statut onboarding

### Corrigé
*   Résolution du problème de persistance de session lors du rafraîchissement de la page
*   Correction de l'erreur "new row violates row-level security policy" lors de l'inscription
*   Suppression des erreurs 406/PGRST116 liées à la récupération des profils
*   Correction du chargement infini après déconnexion
*   Résolution de l'avertissement React "Cannot update a component while rendering a different component"
*   Correction de la synchronisation entre onglets pour la déconnexion

## [0.1.0] - 2026-02-21

### Ajouté
*   Création d'un nouveau dossier `/pages` dans `src/app/` pour organiser les composants de page.
*   Fichier [routes.tsx](src/app/routes.tsx) pour centraliser et typer la configuration des routes.
*   Page 404 personnalisée [NotFound.tsx](src/app/pages/NotFound.tsx).
*   Gestion dynamique du titre de la page dans [App.tsx](src/app/App.tsx) en fonction de la route active.
*   Fichiers [README.md](README.md) et [CHANGELOG.md](CHANGELOG.md) à la racine du projet.

### Déplacé
*   **Composants de page** : Les fichiers suivants ont été déplacés de `src/app/components/` vers `src/app/pages/` pour mieux refléter leur rôle de pages principales :
    *   [Home.tsx](src/app/pages/Home.tsx) - LandingPage
    *   [Commitments.tsx](src/app/pages/Commitments.tsx) - Nos engagements
    *   [PrivacyPolicy.tsx](src/app/pages/PrivacyPolicy.tsx) - Politique de confidentialité
    *   [LegalNotice.tsx](src/app/pages/LegalNotice.tsx) - Mentions légales
    *   [SignIn.tsx](src/app/pages/SignIn.tsx) - Se connecter
    *   [SignUp.tsx](src/app/pages/SignUp.tsx) - S'inscrire
*   **Composants réutilisables** : Les composants [Navbar.tsx](src/app/components/Navbar.tsx), [Footer.tsx](src/app/components/Footer.tsx) et autres (comme [ScrollToAnchor.tsx](src/app/components/ScrollToAnchor.tsx), [ImageWithFallback.tsx](src/app/components/figma/ImageWithFallback.tsx)) restent dans `src/app/components/` où ils ont leur place en tant que briques d'interface réutilisables.

### Modifié
*   Refactorisation complète du routage :
    *   [main.tsx](src/main.tsx) enveloppe maintenant l'application avec `BrowserRouter`.
    *   [App.tsx](src/app/App.tsx) utilise désormais la configuration centralisée des routes ([routes.tsx](src/app/routes.tsx)) pour définir les `<Route>`.
    *   Correction des chemins d'import dans les composants déplacés (les imports de `Navbar`, `Footer`, `ROUTES` pointent désormais vers `../components/...` et `../routes`).
    *   La navigation met maintenant correctement à jour l'URL du navigateur.

### Corrigé
*   Résolution du problème où l'URL n'était pas mise à jour lors de la navigation entre les pages, donnant l'impression d'être sur une seule page (application "one-page" factice).