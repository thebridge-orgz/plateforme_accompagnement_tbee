# Journal des modifications (Changelog)

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.1.0/), et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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