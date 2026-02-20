# Guide Rapide - TBEE

Guide de démarrage rapide pour comprendre et utiliser le projet TBEE.

---

## 🚀 Démarrage rapide

### Navigation dans l'application
L'application fonctionne actuellement avec une navigation par état (sans router).

**Pages disponibles:**
- `/` - Landing page (accueil)
- `/login` - Page de connexion
- `/signup` - Page d'inscription

**Navigation:**
- Cliquer sur le logo → Retour accueil
- Bouton "Se connecter" → Page connexion
- Bouton "S'inscrire" → Page inscription
- Liens contextuels dans les pages

---

## 🎨 Utiliser le Design System

### Couleurs

**Pour un bouton CTA principal:**
```tsx
<button className="bg-primary text-primary-foreground">
  Mon CTA
</button>
```

**Pour un fond clair:**
```tsx
<div className="bg-muted">
  Contenu
</div>
```

**Pour du texte secondaire:**
```tsx
<p className="text-muted-foreground">
  Texte secondaire
</p>
```

### Typographie

**Titres (utilisent automatiquement l'échelle):**
```tsx
<h1>Titre principal</h1>  {/* 48px/700 */}
<h2>Titre section</h2>    {/* 32px/700 */}
<h3>Titre carte</h3>      {/* 24px/600 */}
<h4>Sous-titre</h4>       {/* 20px/600 */}
```

**Paragraphes (style inline obligatoire):**
```tsx
{/* Body text */}
<p style={{ fontSize: '16px', lineHeight: '26px' }}>
  Texte principal
</p>

{/* Small text */}
<p style={{ fontSize: '14px', lineHeight: '22px' }}>
  Texte secondaire
</p>
```

### Spacing

**Utiliser le système 8pt:**
```tsx
{/* Gap entre éléments */}
<div className="gap-3">   {/* 12px */}
<div className="gap-4">   {/* 16px */}
<div className="gap-6">   {/* 24px */}

{/* Padding */}
<div className="p-6">     {/* 24px */}
<div className="p-8">     {/* 32px */}

{/* Margin */}
<div className="mb-4">    {/* 16px */}
<div className="mb-8">    {/* 32px */}
```

### Border Radius
```tsx
<button className="rounded-xl">    {/* 12px - boutons/inputs */}
<div className="rounded-2xl">      {/* 16px - cards */}
<div className="rounded-full">     {/* Pill shape - badges */}
```

---

## 🧩 Utiliser les composants

### Button
```tsx
import { Button } from './components';

{/* Primary (jaune) */}
<Button variant="primary" onClick={handleClick}>
  Commencer
</Button>

{/* Secondary (bordure) */}
<Button variant="secondary">
  En savoir plus
</Button>

{/* Ghost (transparent) */}
<Button variant="ghost">
  Annuler
</Button>

{/* Large size */}
<Button size="large">
  Grand bouton
</Button>

{/* Full width */}
<Button fullWidth>
  Pleine largeur
</Button>
```

### Section
```tsx
import { Section } from './components';

<Section background="muted" padding="large" id="features">
  <h2>Mon contenu</h2>
</Section>
```

**Variants:**
- `background`: `'default'` | `'muted'` | `'gradient'`
- `padding`: `'default'` (12-16) | `'large'` (16-20)

### SectionHeader
```tsx
import { SectionHeader } from './components';

<SectionHeader 
  title="Titre de la section"
  description="Description optionnelle"
  centered={true}
/>
```

### FeatureCard
```tsx
import { FeatureCard } from './components';
import { Users } from 'lucide-react';

<FeatureCard
  icon={<Users className="w-6 h-6 text-primary-foreground" />}
  title="Parcours structuré"
  description="Des étapes claires pour progresser"
  variant="accent"
/>
```

### FormInput
```tsx
import { FormInput } from './components';

const [email, setEmail] = useState("");
const [error, setError] = useState("");

<FormInput
  id="email"
  label="Adresse email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="ton.email@exemple.fr"
  required
  error={error}
/>
```

### Badge
```tsx
import { Badge } from './components';
import { Shield } from 'lucide-react';

<Badge icon={<Shield />} variant="default">
  Plateforme inclusive
</Badge>
```

---

## 🎯 Créer une nouvelle page

### 1. Créer le composant
```tsx
// src/app/components/NouvellePage.tsx
interface NouvellePageProps {
  onNavigate?: (page: 'landing') => void;
}

export function NouvellePage({ onNavigate }: NouvellePageProps) {
  return (
    <div className="w-full min-h-screen">
      <Section padding="large">
        <SectionHeader 
          title="Ma nouvelle page"
          description="Description de la page"
        />
        
        {/* Contenu */}
      </Section>
    </div>
  );
}
```

### 2. Ajouter à App.tsx
```tsx
// Importer
import { NouvellePage } from './components/NouvellePage';

// Ajouter le type
type Page = 'landing' | 'login' | 'signup' | 'nouvelle';

// Ajouter la condition
{currentPage === 'nouvelle' && <NouvellePage onNavigate={handleNavigate} />}
```

### 3. Ajouter navigation
Dans Navbar ou ailleurs :
```tsx
<Button onClick={() => onNavigate('nouvelle')}>
  Nouvelle page
</Button>
```

---

## 📱 Rendre un composant responsive

### Pattern standard
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* Mobile: 1 colonne, Desktop: 3 colonnes */}
</div>

<div className="px-6 md:px-[24px] py-12 md:py-16">
  {/* Mobile: padding réduit, Desktop: padding normal */}
</div>

<div className="flex flex-col sm:flex-row gap-4">
  {/* Mobile: vertical, Desktop: horizontal */}
</div>
```

### Visibilité conditionnelle
```tsx
<div className="hidden md:flex">
  {/* Visible seulement sur desktop */}
</div>

<div className="md:hidden">
  {/* Visible seulement sur mobile */}
</div>
```

---

## ♿ Rendre un composant accessible

### Checklist
```tsx
{/* ✅ Label sur input */}
<label htmlFor="email">Email</label>
<input id="email" />

{/* ✅ Aria-label sur bouton icône */}
<button aria-label="Fermer">
  <X />
</button>

{/* ✅ Focus visible */}
<button className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
  Cliquer
</button>

{/* ✅ Alt sur image */}
<img src="..." alt="Description de l'image" />

{/* ✅ Zones cliquables min 48px */}
<button className="min-h-[48px] px-6">
  Bouton
</button>
```

---

## 🎨 Ajouter des icônes (Lucide React)

### 1. Vérifier que l'icône existe
```bash
grep "MonIcone" node_modules/lucide-react/dist/esm/icons/index.js
```

### 2. Importer et utiliser
```tsx
import { Users, Video, Heart, Shield } from 'lucide-react';

<Users className="w-6 h-6 text-foreground" />
<Video className="w-5 h-5 text-primary" />
```

### Tailles courantes
- `w-4 h-4`: 16px (petit, badges)
- `w-5 h-5`: 20px (moyen)
- `w-6 h-6`: 24px (standard)
- `w-8 h-8`: 32px (grand)

---

## 🔧 Modifier les couleurs du thème

### 1. Ouvrir theme.css
```css
:root {
  --primary: #FFD600;        /* Votre couleur */
  --foreground: #1E1548;     /* Votre couleur */
  /* ... */
}
```

### 2. Mettre à jour @theme inline
```css
@theme inline {
  --color-primary: var(--primary);
  /* ... */
}
```

### 3. Utiliser dans les composants
```tsx
<div className="bg-primary text-primary-foreground">
  Utilise vos nouvelles couleurs
</div>
```

---

## 📝 Conventions de code

### Nommage
- **Composants**: `PascalCase` (Button.tsx)
- **Functions**: `camelCase` (handleClick)
- **CSS Variables**: `kebab-case` (--primary-foreground)
- **Files**: `PascalCase` pour composants, `camelCase` pour utils

### Structure d'un composant
```tsx
import { ReactNode } from "react";
import { Icon } from "lucide-react";

interface ComponentProps {
  children: ReactNode;
  variant?: 'default' | 'primary';
  onClick?: () => void;
}

export function Component({ 
  children, 
  variant = 'default',
  onClick 
}: ComponentProps) {
  const handleClick = () => {
    // Logic
    onClick?.();
  };

  return (
    <div className="...">
      {children}
    </div>
  );
}
```

### Imports
```tsx
// 1. React / External
import { useState } from "react";
import { Users } from "lucide-react";

// 2. Local components
import { Button } from "./components/Button";

// 3. Types
import type { PageProps } from "./types";
```

---

## 🐛 Debugging

### Problème de style
1. Vérifier que Tailwind reconnaît la classe
2. Inspecter dans DevTools
3. Vérifier les variables CSS dans theme.css

### Problème de navigation
1. Vérifier que `onNavigate` est bien passé
2. Console.log la page actuelle
3. Vérifier les conditions dans App.tsx

### Icône manquante
```bash
# Vérifier l'icône existe
grep "MyIcon" node_modules/lucide-react/dist/esm/icons/index.js

# Si pas trouvé, chercher alternative
grep -i "similar" node_modules/lucide-react/dist/esm/icons/index.js
```

---

## 📚 Ressources

### Documentation
- [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md) - Design system complet
- [COMPONENTS.md](/COMPONENTS.md) - Documentation composants
- [STRUCTURE.md](/STRUCTURE.md) - Structure technique
- [README_PROJET.md](/README_PROJET.md) - Vue d'ensemble

### Outils externes
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev/icons)
- [Radix UI](https://www.radix-ui.com/)

---

## ✅ Checklist avant commit

- [ ] Code formaté et propre
- [ ] Pas d'erreurs TypeScript
- [ ] Composants responsive testés
- [ ] Accessibilité vérifiée (focus, labels, alt)
- [ ] Contraste couleurs OK
- [ ] Documentation à jour si nouveau composant

---

**Besoin d'aide ?**  
Consultez les fichiers de documentation ou contactez l'équipe TBEE.

**Version**: 1.0  
**Dernière mise à jour**: Décembre 2024
