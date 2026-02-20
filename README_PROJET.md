# TBEE - Plateforme inclusive vers l'alternance

## 📋 Description

TBEE est une plateforme d'accompagnement dédiée aux étudiants qui cherchent une alternance, avec une attention particulière pour les personnes bénéficiant d'une Reconnaissance de Qualité de Travailleur Handicapé (RQTH).

La plateforme propose un accompagnement personnalisé, des ressources adaptées et accessibles, dans le respect de la confidentialité de chacun.

---

## 🎨 Design & Direction Artistique

### Principes de design
- **Premium & Moderne**: Design aéré, cohérent avec des finitions soignées
- **Accessible**: Contraste élevé, focus visible, zones cliquables confortables
- **Inclusif**: UI respectueuse, langage bienveillant, confidentialité prioritaire
- **Responsive**: Optimisé pour Desktop (1440px) et Mobile (390px)

### Palette de couleurs
- **Jaune (#FFD600)**: Couleur primaire pour les CTA et actions importantes
- **Bleu foncé (#1E1548)**: Texte principal, éléments structurels
- **Bleu clair (#E8ECFF)**: Accents, backgrounds légers
- **Gris doux (#F8F9FD)**: Backgrounds secondaires, zones désactivées

### Typographie
- **Police unique**: Poppins (400, 500, 600, 700)
- **Échelle cohérente**: H1 (48px) → H2 (32px) → H3 (24px) → H4 (20px) → Body (16px) → Small (14px)

---

## 🏗️ Structure du projet

### Pages créées

1. **Landing Page** (`/`)
   - Hero avec double CTA
   - 3 cartes de présentation
   - Section statistiques
   - 6 features détaillées
   - CTA final avec visuel

2. **Page Connexion** (`/login`)
   - Formulaire centré et épuré
   - Email + Mot de passe
   - Lien "Mot de passe oublié"
   - Redirection vers inscription

3. **Page Inscription** (`/signup`)
   - Formulaire structuré en 3 sections :
     - Informations personnelles
     - Ma formation
     - Accompagnement personnalisé (RQTH)
   - Question RQTH avec UI respectueuse et info confidentialité
   - Validation CGU obligatoire

### Composants réutilisables

- **Navbar**: Navigation principale avec logo et CTA
- **Footer**: Footer moderne en 3 colonnes
- **FeatureCard**: Carte de fonctionnalité avec icône
- **IconContainer**: Conteneur d'icône stylisé
- **Link**: Lien avec styles cohérents

---

## 🚀 Navigation

L'application utilise un système de navigation par état (useState) pour basculer entre les pages :

```tsx
// Navigation entre pages
onNavigate('landing') // Accueil
onNavigate('login')   // Connexion
onNavigate('signup')  // Inscription
```

---

## ♿ Accessibilité

### Implémentations
- ✅ Contraste texte minimum 4.5:1
- ✅ Focus visible sur tous les éléments interactifs
- ✅ Zones cliquables minimum 48x48px
- ✅ Labels explicites sur tous les champs
- ✅ Texte alternatif sur les images
- ✅ Navigation au clavier fluide

### Question RQTH
La question sur la RQTH est présentée avec :
- Un encadré informatif expliquant l'usage des données
- Une mention de **confidentialité stricte**
- Un design non stigmatisant (Oui/Non neutres)
- Pas d'obligation de réponse

---

## 📐 Système de Spacing

Tous les espacements suivent un système 8pt :
- **8px**: Gap minimal
- **16px**: Padding interne standard
- **24px**: Padding horizontal page / Padding card
- **32px**: Gap entre éléments importants
- **48px**: Padding vertical section (mobile)
- **64px**: Gap entre sections (desktop)
- **80px**: Padding vertical section (desktop)

---

## 🎯 Règles de cohérence

### Boutons
- **Height**: 48px minimum
- **Padding**: 12px vertical + 20-24px horizontal
- **Border-radius**: 12px
- **Primary**: Jaune avec texte foncé
- **Secondary**: Bordure avec fond blanc

### Cards
- **Border-radius**: 16px
- **Padding**: 24px
- **Border**: 1px solid avec couleur subtile
- **Shadow**: Légère au hover

### Champs de formulaire
- **Height**: 48px
- **Padding**: 12px horizontal
- **Border-radius**: 12px
- **Background**: #F8F9FD (gris doux)

---

## 📱 Responsive Design

### Mobile (390px)
- Layout 1 colonne
- Padding réduit (16-20px)
- Spacing vertical réduit (48px)
- Navigation simplifiée

### Desktop (1440px)
- Layout multi-colonnes (2-3 colonnes)
- Max-width conteneur: 1200px
- Padding standard (24px)
- Spacing vertical: 80px

---

## 🔧 Technologies utilisées

- **React 18.3**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icônes)
- **Vite** (build tool)

---

## 📝 Prochaines étapes

### Fonctionnalités à ajouter
- [ ] Backend API (authentification, base de données)
- [ ] Système de progression personnalisé
- [ ] Bibliothèque de vidéos
- [ ] Communauté / Forum
- [ ] Outils de candidature (CV, lettre de motivation)
- [ ] Suivi des candidatures

### Améliorations design
- [ ] Animations de transition entre pages
- [ ] Micro-interactions sur les boutons
- [ ] Skeleton loaders
- [ ] Toast notifications
- [ ] Modal de confirmation

---

## 💡 Notes importantes

### Contenu textuel
Le contenu actuel est basé sur l'image fournie. Certaines phrases peuvent nécessiter des ajustements pour améliorer la clarté ou corriger des fautes de frappe.

### Confidentialité RQTH
Le projet traite des données sensibles (statut RQTH). Il est **impératif** de :
- Ne jamais partager ces données sans consentement explicite
- Respecter le RGPD
- Implémenter un système de gestion des données robuste
- Permettre la suppression des données à tout moment

### Images
L'image du CTA final utilise Unsplash. Pour la production, privilégier des photos de vraies personnes de la communauté (avec leur accord).

---

## 🎨 Design System

Pour plus de détails sur le design system, consultez [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md)

---

**Version**: 1.0  
**Date**: Décembre 2024  
**Contact**: TBEE Team
