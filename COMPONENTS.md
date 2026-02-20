# Composants TBEE

Documentation complète des composants réutilisables créés pour la plateforme TBEE.

---

## 🏗️ Layout Components

### Navbar
Navigation principale sticky en haut de page.

**Props:**
- `onNavigate?: (page: 'landing' | 'login' | 'signup') => void` - Fonction de navigation
- `currentPage?: 'landing' | 'login' | 'signup'` - Page actuelle

**Usage:**
```tsx
<Navbar onNavigate={handleNavigate} currentPage="landing" />
```

---

### Footer
Footer moderne en 3 colonnes (responsive).

**Usage:**
```tsx
<Footer />
```

---

### Section
Conteneur de section avec max-width et padding cohérents.

**Props:**
- `children: ReactNode` - Contenu
- `className?: string` - Classes supplémentaires
- `background?: 'default' | 'muted' | 'gradient'` - Variante de fond
- `padding?: 'default' | 'large'` - Taille du padding
- `id?: string` - ID pour ancres

**Usage:**
```tsx
<Section background="muted" padding="large" id="features">
  {/* Contenu */}
</Section>
```

---

### SectionHeader
Titre et description de section.

**Props:**
- `title: string` - Titre (H2)
- `description?: string` - Description optionnelle
- `centered?: boolean` - Centré ou aligné à gauche (défaut: true)

**Usage:**
```tsx
<SectionHeader 
  title="Un accompagnement complet" 
  description="Toutes les ressources dont tu as besoin"
  centered={true}
/>
```

---

## 🎨 UI Components

### Button
Bouton cohérent avec variants et états.

**Props:**
- `children: ReactNode` - Contenu du bouton
- `variant?: 'primary' | 'secondary' | 'ghost'` - Style (défaut: primary)
- `size?: 'default' | 'large'` - Taille (défaut: default)
- `fullWidth?: boolean` - Pleine largeur (défaut: false)
- Tous les props HTML button standards

**Usage:**
```tsx
<Button variant="primary" size="large" onClick={handleClick}>
  Commencer gratuitement
</Button>

<Button variant="secondary">
  En savoir plus
</Button>
```

**Variants:**
- `primary`: Jaune (#FFD600) avec hover scale
- `secondary`: Fond blanc avec bordure
- `ghost`: Transparent avec hover background

---

### Badge
Badge avec icône optionnelle.

**Props:**
- `children: ReactNode` - Texte du badge
- `icon?: ReactNode` - Icône optionnelle
- `variant?: 'default' | 'primary' | 'secondary'` - Style

**Usage:**
```tsx
<Badge icon={<Shield />} variant="default">
  Plateforme inclusive
</Badge>
```

---

### IconContainer
Conteneur d'icône stylisé (48x48 ou 40x40).

**Props:**
- `children: ReactNode` - Icône (Lucide React)
- `variant?: 'accent' | 'primary'` - Couleur de fond
- `size?: 'sm' | 'md'` - Taille (défaut: md)

**Usage:**
```tsx
<IconContainer variant="primary" size="md">
  <Users className="w-6 h-6 text-primary-foreground" />
</IconContainer>
```

---

### FeatureCard
Carte de fonctionnalité avec icône, titre et description.

**Props:**
- `icon: ReactNode` - Icône (sans conteneur)
- `title: string` - Titre (H3)
- `description: string` - Description
- `variant?: 'accent' | 'primary'` - Style de fond

**Usage:**
```tsx
<FeatureCard
  icon={<Users className="w-6 h-6 text-primary-foreground" />}
  title="Parcours personnalisé"
  description="Un accompagnement adapté à tes besoins"
  variant="accent"
/>
```

---

### StatItem
Élément statistique (nombre + label).

**Props:**
- `value: string` - Valeur (ex: "6", "100%", "24/7")
- `label: string` - Description

**Usage:**
```tsx
<StatItem 
  value="6" 
  label="Chapitres d'accompagnement" 
/>
```

---

## 📝 Form Components

### FormInput
Champ de formulaire avec label et gestion d'erreur.

**Props:**
- `label: string` - Label du champ
- `error?: string` - Message d'erreur
- `id: string` - ID (requis pour l'accessibilité)
- Tous les props HTML input standards

**Usage:**
```tsx
<FormInput
  id="email"
  label="Adresse email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="ton.email@exemple.fr"
  required
  error={emailError}
/>
```

---

## 🔗 Utility Components

### Link
Lien avec styles cohérents et focus visible.

**Props:**
- `href: string` - URL
- `children: ReactNode` - Contenu
- `className?: string` - Classes supplémentaires

**Usage:**
```tsx
<Link href="#features">
  Découvrir nos services
</Link>
```

---

## 📄 Page Components

### LandingPage
Page d'accueil complète avec hero, cards, stats, features et CTA final.

**Props:**
- `onNavigate?: (page: 'signup') => void` - Navigation vers inscription

**Sections incluses:**
1. Hero avec badge, titre souligné, description, 2 CTA
2. 3 cards de présentation
3. Section statistiques (3 items)
4. Section features (6 items en grille)
5. CTA final avec image

---

### LoginPage
Page de connexion avec formulaire centré.

**Props:**
- `onNavigate?: (page: 'landing' | 'signup') => void` - Navigation

**Éléments:**
- Card centrée (max-width: 480px)
- Champs email + password avec toggle visibilité
- Lien "Mot de passe oublié"
- Lien vers inscription
- Retour accueil

---

### SignupPage
Page d'inscription avec formulaire multi-sections.

**Props:**
- `onNavigate?: (page: 'landing' | 'login') => void` - Navigation

**Sections:**
1. **Informations personnelles**
   - Prénom + Nom (2 colonnes desktop)
   - Email
   - Password + Confirm password (2 colonnes)

2. **Ma formation**
   - Type de formation (select)
   - Niveau d'études (select)

3. **Accompagnement personnalisé**
   - Question RQTH (Oui/Non avec UI respectueuse)
   - Info confidentialité
   - Checkbox CGU obligatoire

---

## 🎨 Conventions de style

### Couleurs
Utiliser les variables CSS du design system :
- `bg-primary` / `text-primary-foreground`
- `bg-accent` / `text-accent-foreground`
- `bg-muted` / `text-muted-foreground`
- `border-border`

### Spacing
Toujours utiliser le système 8pt :
- Gap: `gap-3` (12px), `gap-4` (16px), `gap-6` (24px)
- Padding: `p-6` (24px), `p-8` (32px)
- Margin: `mb-4` (16px), `mb-6` (24px), `mb-8` (32px)

### Typography
Utiliser les styles inline pour respecter l'échelle :
```tsx
<h1>Titre H1</h1> // 48px/56px/700
<h2>Titre H2</h2> // 32px/40px/700
<h3>Titre H3</h3> // 24px/32px/600
<h4>Titre H4</h4> // 20px/28px/600

// Pour paragraphes
<p style={{ fontSize: '16px', lineHeight: '26px' }}>Body</p>
<p style={{ fontSize: '14px', lineHeight: '22px' }}>Small</p>
```

### Border Radius
- Boutons/Inputs: `rounded-xl` (12px)
- Cards: `rounded-2xl` (16px)
- Badges/Pills: `rounded-full`

### Focus States
Toujours inclure :
```tsx
className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
```

### Hover Effects
- Boutons primary: `hover:scale-105`
- Boutons secondary: `hover:bg-muted`
- Cards: `hover:shadow-lg`

---

## 📱 Responsive

Tous les composants sont responsive avec breakpoint `md:` (768px).

**Patterns communs:**
```tsx
// Grille
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

// Padding
<div className="px-6 md:px-[24px] py-12 md:py-16">

// Flexbox
<div className="flex flex-col sm:flex-row gap-4">
```

---

## ♿ Accessibilité

### Checklist par composant:
- ✅ Labels explicites (`htmlFor` + `id`)
- ✅ `aria-label` sur boutons icône
- ✅ Focus visible (`focus-visible:ring-2`)
- ✅ Texte alternatif sur images (`alt`)
- ✅ Contraste minimum 4.5:1
- ✅ Zones cliquables min 48x48px

---

## 🚀 Import rapide

```tsx
// Depuis index
import { 
  Button, 
  Badge, 
  FeatureCard, 
  Section, 
  SectionHeader 
} from './components';

// Ou individuellement
import { Button } from './components/Button';
```

---

**Version**: 1.0  
**Dernière mise à jour**: Décembre 2024
