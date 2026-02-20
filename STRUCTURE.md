# Structure du projet TBEE

## 📁 Arborescence

```
/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── figma/
│   │   │   │   └── ImageWithFallback.tsx    # Composant image protégé
│   │   │   ├── ui/                          # Composants UI shadcn/ui
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   └── ... (autres composants UI)
│   │   │   │
│   │   │   ├── Badge.tsx                    # Badge avec icône
│   │   │   ├── Button.tsx                   # Bouton cohérent
│   │   │   ├── FeatureCard.tsx              # Carte de feature
│   │   │   ├── Footer.tsx                   # Footer 3 colonnes
│   │   │   ├── FormInput.tsx                # Input avec label
│   │   │   ├── IconContainer.tsx            # Conteneur d'icône
│   │   │   ├── LandingPage.tsx              # Page d'accueil
│   │   │   ├── Link.tsx                     # Lien stylisé
│   │   │   ├── LoginPage.tsx                # Page connexion
│   │   │   ├── Navbar.tsx                   # Navigation principale
│   │   │   ├── Section.tsx                  # Conteneur de section
│   │   │   ├── SectionHeader.tsx            # En-tête de section
│   │   │   ├── SignupPage.tsx               # Page inscription
│   │   │   ├── StatItem.tsx                 # Item statistique
│   │   │   └── index.ts                     # Exports centralisés
│   │   │
│   │   └── App.tsx                          # Point d'entrée principal
│   │
│   └── styles/
│       ├── fonts.css                        # Import Poppins
│       ├── index.css                        # Imports + global styles
│       ├── tailwind.css                     # Config Tailwind
│       └── theme.css                        # Variables CSS + Design System
│
├── COMPONENTS.md                            # Documentation composants
├── DESIGN_SYSTEM.md                         # Documentation design system
├── README_PROJET.md                         # Documentation projet
├── STRUCTURE.md                             # Ce fichier
├── package.json                             # Dépendances
└── vite.config.ts                           # Configuration Vite
```

---

## 🎯 Points d'entrée

### 1. App.tsx
Composant racine qui gère :
- Navigation entre pages (useState)
- Affichage conditionnel des pages
- Scroll to top lors de navigation

### 2. index.css
Import de tous les styles :
- Fonts (Poppins)
- Tailwind CSS
- Theme (variables + typographie)
- Global styles (scroll-behavior)

### 3. theme.css
Définit TOUT le design system :
- Couleurs (primary, foreground, background, etc.)
- Typographie (échelle H1→Small)
- Spacing (système 8pt)
- Border radius

---

## 📄 Pages

### Landing Page (`/`)
**Fichier**: `LandingPage.tsx`

**Sections** (ordre):
1. **Hero**
   - Badge "Plateforme inclusive"
   - Titre H1 avec mot souligné
   - Description (max-width 600px)
   - 2 CTA (primary + secondary)
   - 3 cards de présentation

2. **Stats**
   - Fond gris (muted)
   - 3 stats en grille
   - Format: Nombre + Label

3. **Features**
   - Titre + description centrés
   - 6 features en grille 2 colonnes
   - Alternance bg accent/primary

4. **CTA Final**
   - Gradient background
   - 2 colonnes: texte + image
   - CTA primary

---

### Login Page (`/login`)
**Fichier**: `LoginPage.tsx`

**Structure**:
- Card centrée (max-width: 480px)
- Formulaire:
  - Email
  - Password (avec toggle visibilité)
  - Lien "Mot de passe oublié"
  - Bouton "Se connecter"
- Divider "ou"
- Lien vers inscription
- Lien retour accueil

---

### Signup Page (`/signup`)
**Fichier**: `SignupPage.tsx`

**Structure**:
- Card large (max-width: 840px)
- 3 sections de formulaire:

**1. Informations personnelles**
- Prénom + Nom (grid 2 cols desktop)
- Email
- Password + Confirm (grid 2 cols desktop)

**2. Ma formation**
- Type de formation (select)
- Niveau d'études (select)
- Grid 2 colonnes desktop

**3. Accompagnement personnalisé**
- Question RQTH (Oui/Non)
- Encadré info confidentialité
- UI respectueuse (2 boutons égaux)

**Footer formulaire**:
- Checkbox CGU (obligatoire)
- Bouton "Créer mon compte" (disabled si pas CGU)
- Lien vers connexion
- Lien retour accueil

---

## 🧩 Composants réutilisables

### Layout
- `Navbar`: Navigation sticky
- `Footer`: Footer 3 colonnes
- `Section`: Conteneur max-width 1200px
- `SectionHeader`: Titre + description

### UI
- `Button`: 3 variants (primary, secondary, ghost)
- `Badge`: Badge avec icône optionnelle
- `IconContainer`: Conteneur icône 48x48
- `FeatureCard`: Card avec icône + texte
- `StatItem`: Nombre + label

### Form
- `FormInput`: Input avec label + erreur

### Utility
- `Link`: Lien avec focus visible

---

## 🎨 Design System (theme.css)

### Variables de couleurs
```css
--primary: #FFD600           /* Jaune CTA */
--primary-foreground: #1E1548 /* Texte sur jaune */
--foreground: #1E1548         /* Texte principal */
--background: #ffffff         /* Fond principal */
--secondary: #E8ECFF          /* Bleu clair */
--muted: #F8F9FD              /* Gris doux */
--muted-foreground: #6B7280   /* Texte secondaire */
--accent: #E8ECFF             /* Accent */
--border: rgba(30,21,72,0.1)  /* Bordures */
--ring: #FFD600               /* Focus ring */
```

### Variables de typographie
```css
/* H1 */
--text-h1-size: 48px
--text-h1-line: 56px
--text-h1-weight: 700

/* H2 */
--text-h2-size: 32px
--text-h2-line: 40px
--text-h2-weight: 700

/* H3 */
--text-h3-size: 24px
--text-h3-line: 32px
--text-h3-weight: 600

/* H4 */
--text-h4-size: 20px
--text-h4-line: 28px
--text-h4-weight: 600

/* Body */
--text-body-size: 16px
--text-body-line: 26px
--text-body-weight: 400

/* Small */
--text-small-size: 14px
--text-small-line: 22px
--text-small-weight: 400

/* Label */
--text-label-size: 14px
--text-label-line: 20px
--text-label-weight: 500
```

### Border Radius
```css
--radius: 0.75rem (12px)
```

---

## 📦 Dépendances principales

### UI & Styling
- `react` 18.3.1
- `tailwindcss` 4.1.12
- `lucide-react` 0.487.0 (icônes)

### Composants UI (Radix)
- `@radix-ui/react-*` (multiples packages)
- Utilisés par les composants shadcn/ui

### Utilitaires
- `clsx` - Gestion classes CSS
- `tailwind-merge` - Merge classes Tailwind
- `class-variance-authority` - Variants de composants

### Build
- `vite` 6.3.5
- `@vitejs/plugin-react` 4.7.0

---

## 🚀 Scripts

```bash
# Build production
npm run build

# (Dev server via Figma Make)
```

---

## 🎯 Workflows

### 1. Ajouter une nouvelle page
1. Créer `src/app/components/NomPage.tsx`
2. Ajouter le type dans `App.tsx`: `type Page = 'landing' | 'login' | 'signup' | 'nouvellePageRoute'`
3. Ajouter la condition d'affichage dans `App.tsx`
4. Ajouter navigation dans `Navbar` si nécessaire

### 2. Créer un nouveau composant
1. Créer `src/app/components/NomComposant.tsx`
2. Exporter dans `src/app/components/index.ts`
3. Importer: `import { NomComposant } from './components'`

### 3. Ajouter une nouvelle couleur
1. Définir dans `:root` de `theme.css`
2. Ajouter dans `@theme inline` pour Tailwind
3. Utiliser: `bg-[nom-variable]` ou `text-[nom-variable]`

### 4. Modifier la typographie
1. Modifier les variables `--text-*` dans `theme.css`
2. Mettre à jour les styles `@layer base` (h1, h2, etc.)

---

## 📱 Responsive Strategy

### Breakpoints
- Mobile: base (< 768px)
- Desktop: `md:` (≥ 768px)

### Patterns
```tsx
// Grille
grid-cols-1 md:grid-cols-2

// Padding
px-6 md:px-[24px]
py-12 md:py-16

// Flexbox
flex-col sm:flex-row

// Visibilité
hidden md:flex
```

---

## ♿ Accessibilité

### Éléments obligatoires
- Labels (`htmlFor` + `id`) sur tous les inputs
- `aria-label` sur boutons icônes
- Focus visible (`focus-visible:ring-2`)
- Alt text sur images
- Contraste min 4.5:1
- Min 48x48px zones cliquables

### Testés
- ✅ Navigation clavier
- ✅ Screen reader friendly
- ✅ Focus visible
- ✅ Contraste couleurs
- ✅ Textes alternatifs

---

## 🔒 Sécurité & Confidentialité

### Données sensibles (RQTH)
- Stockage sécurisé obligatoire
- Consentement explicite requis
- Confidentialité stricte
- Jamais partagé sans accord
- Suppression sur demande

### À implémenter (backend)
- Chiffrement données sensibles
- Authentification sécurisée
- HTTPS obligatoire
- Conformité RGPD
- Logs d'accès

---

## 📝 Notes de développement

### Conventions de nommage
- Composants: PascalCase (`Button.tsx`)
- Fichiers utils: camelCase
- CSS variables: kebab-case (`--primary-foreground`)

### Organisation imports
```tsx
// 1. React / Libraries
import { useState } from "react";
import { Shield } from "lucide-react";

// 2. Composants locaux
import { Button } from "./components/Button";

// 3. Assets
import logo from "./assets/logo.png";

// 4. Styles (si nécessaire)
import "./styles.css";
```

### Props typing
Toujours typer les props avec TypeScript :
```tsx
interface ComponentProps {
  required: string;
  optional?: number;
}
```

---

## 🎨 Fichiers de documentation

- **DESIGN_SYSTEM.md**: Règles de design, couleurs, typo, spacing
- **COMPONENTS.md**: Documentation complète de chaque composant
- **README_PROJET.md**: Vue d'ensemble du projet
- **STRUCTURE.md**: Ce fichier - structure technique

---

## 🚧 Prochaines étapes techniques

### Backend
- [ ] API REST ou GraphQL
- [ ] Base de données (PostgreSQL + Supabase ?)
- [ ] Authentification (JWT)
- [ ] Gestion des rôles

### Frontend
- [ ] Router (React Router)
- [ ] State management (Context ou Zustand)
- [ ] Formulaires (React Hook Form + Zod)
- [ ] Animations (Framer Motion)
- [ ] Tests (Vitest + Testing Library)

### DevOps
- [ ] CI/CD
- [ ] Environnements (dev/staging/prod)
- [ ] Monitoring
- [ ] Error tracking (Sentry)

---

**Version**: 1.0  
**Dernière mise à jour**: Décembre 2024  
**Mainteneur**: TBEE Team
