# TBEE Design System

## Vue d'ensemble
Système de design cohérent, accessible et premium pour la plateforme TBEE - plateforme inclusive d'accompagnement vers l'alternance avec focus RQTH.

---

## 🎨 Couleurs (Color Styles)

### Couleurs principales
- **Primary (Jaune)**: `#FFD600` - CTA principaux, éléments d'action
- **Primary Foreground**: `#1E1548` - Texte sur fond jaune

### Couleurs de structure
- **Foreground (Bleu foncé)**: `#1E1548` - Texte principal, titres
- **Background**: `#ffffff` - Fond principal
- **Muted**: `#F8F9FD` - Fonds secondaires, zones désactivées
- **Muted Foreground**: `#6B7280` - Texte secondaire

### Couleurs d'accentuation
- **Secondary (Bleu clair)**: `#E8ECFF` - Accents, backgrounds légers
- **Accent**: `#E8ECFF` - Zones mises en avant

### Couleurs fonctionnelles
- **Border**: `rgba(30, 21, 72, 0.1)` - Bordures
- **Ring**: `#FFD600` - Focus states
- **Input Background**: `#F8F9FD` - Fonds de champs

---

## ✍️ Typographie (Text Styles)

**Police unique**: Poppins (Google Fonts)

### Échelle typographique

| Style | Taille | Line Height | Weight | Usage |
|-------|--------|-------------|--------|-------|
| **H1** | 48px | 56px | 700 | Titres principaux |
| **H2** | 32px | 40px | 700 | Titres de sections |
| **H3** | 24px | 32px | 600 | Titres de cartes |
| **H4** | 20px | 28px | 600 | Sous-titres |
| **Body** | 16px | 26px | 400 | Paragraphes |
| **Small** | 14px | 22px | 400 | Texte secondaire |
| **Label** | 14px | 20px | 500 | Labels de formulaire |

### Règles
- Largeur max paragraphes: **600px**
- Largeur max conteneur: **1200px** (centré)

---

## 📐 Layout & Spacing

### Système 8pt
Tous les espacements suivent un multiple de 8: **8 / 16 / 24 / 32 / 48 / 64 / 80**

### Conteneur principal
- Max-width: **1200px**
- Padding horizontal: **24px** (desktop) / **16-20px** (mobile)

### Espacement par section
- Padding vertical: **80px** (desktop) / **48px** (mobile)
- Gap entre sections: **64px** (desktop) / **40px** (mobile)

---

## 🧩 Composants (Components)

### Button (Bouton)
**Propriétés communes**:
- Height: `48px` minimum
- Padding: `12px vertical` + `20-24px horizontal`
- Border-radius: `12px`
- Font-weight: `500`

**Variants**:
- **Primary**: `bg-primary` + `text-primary-foreground`
- **Secondary**: `border` + `bg-background`

**États**:
- Hover: `scale-105` ou `opacity-90`
- Focus: `ring-2 ring-ring`
- Disabled: `opacity-50` + `cursor-not-allowed`

### Card
**Propriétés**:
- Border-radius: `16px`
- Padding: `24px`
- Border: `1px solid border`
- Shadow: Subtile au hover (`hover:shadow-lg`)

**Gap interne**: `12-16px`

### Input (Champ de formulaire)
**Propriétés**:
- Height: `48px`
- Padding: `12px horizontal`
- Border-radius: `12px`
- Background: `input-background` (#F8F9FD)
- Border: `1px solid border`
- Focus: `ring-2 ring-ring`

### Icon Container
**Propriétés**:
- Size: `48x48px`
- Border-radius: `12px`
- Background: `accent` ou `primary`

---

## ♿ Accessibilité

### Contraste
- Ratio minimum: **4.5:1** pour le texte normal
- Ratio minimum: **3:1** pour le texte large

### Focus visible
- Tous les éléments interactifs: `focus-visible:ring-2 ring-ring`
- Border-radius cohérent avec l'élément

### Zones cliquables
- Taille minimum: **48x48px**
- Padding confortable pour touch targets

### Navigation clavier
- Ordre logique de tabulation
- États focus clairement visibles

---

## 📱 Responsive

### Breakpoints
- **Mobile**: 390px
- **Desktop**: 1440px

### Règles
- Mobile-first approach
- Grid: `grid-cols-1` (mobile) → `md:grid-cols-2/3` (desktop)
- Padding réduit sur mobile
- Spacing vertical réduit sur mobile

---

## 🎯 Pages créées

### 1. Landing Page
- Hero avec CTA doubles
- 3 cards de présentation
- Section statistiques
- 6 features en grille
- CTA final avec image

### 2. Page Connexion
- Card centrée (max-width: 480px)
- Email + Password
- Lien mot de passe oublié
- Lien vers inscription

### 3. Page Inscription
- Form multi-sections (max-width: 840px)
- Informations personnelles (2 colonnes desktop)
- Formation (2 colonnes)
- Question RQTH avec UI respectueuse
- Checkbox CGU obligatoire

---

## 🔧 Composants réutilisables

### Navbar
Navigation principale avec logo, liens et CTA

### Footer
3 colonnes (desktop), 1 colonne (mobile)
Liens organisés par catégorie

### FeatureCard
Card avec icône, titre et description
Variants: accent / primary

### IconContainer
Conteneur d'icône avec background
Variants: accent / primary
Sizes: sm / md

---

## 📝 Bonnes pratiques

1. **Toujours utiliser Poppins** (pas d'autre police)
2. **Respecter le système 8pt** pour tous les espacements
3. **Largeur max 600px** pour les paragraphes
4. **Focus visible obligatoire** sur tous les éléments interactifs
5. **Min-height 48px** pour tous les boutons et champs
6. **Border-radius cohérent**: 12px (boutons/inputs) / 16px (cards)
7. **Jamais de contenu "collé"**: toujours du padding et gap
8. **Mobile responsive**: tester sur 390px minimum

---

## 🚀 Variables CSS disponibles

Toutes les variables sont définies dans `/src/styles/theme.css`:

```css
/* Couleurs */
--primary: #FFD600
--foreground: #1E1548
--background: #ffffff
--secondary: #E8ECFF
--muted: #F8F9FD
--border: rgba(30, 21, 72, 0.1)
--ring: #FFD600

/* Typographie */
--text-h1-size: 48px
--text-h1-line: 56px
--text-h1-weight: 700
/* ... (voir theme.css pour la liste complète) */

/* Border radius */
--radius: 0.75rem (12px)
```

---

**Version**: 1.0  
**Dernière mise à jour**: Décembre 2024  
**Créé pour**: TBEE - Plateforme inclusive vers l'alternance
