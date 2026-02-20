# 🎨 FAVICON TBEE

## ✅ Fichiers créés

Le favicon TBEE a été créé avec le logo en forme de **T** sur fond bleu foncé `#1E1548` avec bords arrondis, comme dans le panneau de gauche de l'application.

### 📁 Fichiers disponibles

```
/public/
├── favicon.svg              # Favicon principal (32x32px)
├── favicon-64.svg           # Version haute résolution (64x64px)
└── apple-touch-icon.svg     # Icon pour iOS/macOS (180x180px)
```

### 📄 Configuration HTML

Le fichier `/index.html` a été créé avec les références au favicon :

```html
<!-- Titre professionnel et impactant -->
<title>TBEE - Ta réussite en alternance commence ici</title>

<!-- Favicon SVG (moderne) -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">

<!-- Fallback ICO (anciens navigateurs) -->
<link rel="alternate icon" href="/favicon.ico">

<!-- Apple Touch Icon (iOS/macOS) -->
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

**📱 Titres dynamiques par page :**

Le titre de la page change automatiquement selon la page visitée :
- **Page d'accueil** : "TBEE - Ta réussite en alternance commence ici"
- **Connexion** : "Connexion - TBEE"
- **Inscription** : "Créer un compte - TBEE"
- **Dashboard candidat** : "Tableau de bord - TBEE"
- **Dashboard admin** : "Dashboard Admin - TBEE"
- Et bien d'autres...

Cela améliore l'expérience utilisateur et le référencement SEO !

---

## 🎨 Design du favicon

### Couleurs
- **Fond** : `#1E1548` (bleu foncé TBEE)
- **Lettre T** : `#FFFFFF` (blanc)

### Typographie
- **Police** : Poppins Bold
- **Taille** : Adaptée selon la résolution

### Forme
- **Bords arrondis** : Proportionnels à la taille (8px pour 32px, 16px pour 64px, etc.)
- **Lettre centrée** : Parfaitement alignée au centre

---

## 🚀 Installation en local

Une fois que vous téléchargez le code et l'installez en local :

### Option 1 : Utiliser les SVG (RECOMMANDÉ)

Les fichiers SVG sont déjà dans `/public/`. Ils fonctionneront automatiquement avec Vite.

**✅ Avantages :**
- Scalable (s'adapte à toutes les tailles)
- Léger (quelques octets)
- Moderne (supporté par tous les navigateurs récents)

### Option 2 : Convertir en PNG/ICO

Si vous voulez des fichiers PNG ou ICO pour une meilleure compatibilité :

**Outils recommandés :**
- [RealFaviconGenerator](https://realfavicongenerator.net/) (en ligne)
- [Favicon.io](https://favicon.io/favicon-converter/) (en ligne)

**Étapes :**
1. Téléchargez `favicon-64.svg`
2. Uploadez sur RealFaviconGenerator
3. Téléchargez le pack généré
4. Placez les fichiers dans `/public/`

---

## 📱 Aperçu sur différents navigateurs

### Chrome / Edge / Firefox
Affiche : `favicon.svg` (32x32px)

### Safari
Affiche : `favicon.svg` ou `favicon.ico` selon la version

### iOS / macOS (ajout à l'écran d'accueil)
Affiche : `apple-touch-icon.png` (180x180px)

### Onglet navigateur
Le favicon apparaît dans l'onglet avec le titre :
```
[T] TBEE - Accompagnement vers l'alternance
```

---

## 🔧 Personnalisation

### Changer la couleur de fond

Éditez `/public/favicon.svg` :

```svg
<!-- Remplacer #1E1548 par votre couleur -->
<rect width="32" height="32" rx="8" fill="#VOTRE_COULEUR"/>
```

### Changer la lettre

Éditez `/public/favicon.svg` :

```svg
<!-- Remplacer T par une autre lettre -->
<text x="16" y="22" ... >VOTRE_LETTRE</text>
```

### Changer les bords arrondis

Éditez `/public/favicon.svg` :

```svg
<!-- Remplacer rx="8" par votre valeur -->
<rect width="32" height="32" rx="VOTRE_VALEUR" fill="#1E1548"/>
```

---

## ✅ Vérification

### En mode Figma Make

Le favicon apparaît automatiquement dans l'onglet du navigateur.

### En local (après téléchargement)

1. Lancez `npm run dev`
2. Ouvrez `http://localhost:5173`
3. Vérifiez l'onglet du navigateur → Le **T** bleu doit apparaître

### En production (Vercel)

Après déploiement sur Vercel :
1. Allez sur votre URL (ex: `https://tbee.vercel.app`)
2. Vérifiez l'onglet → Le **T** bleu doit apparaître

---

## 🐛 Dépannage

### Le favicon ne s'affiche pas

**Cause 1 : Cache du navigateur**
- **Solution** : Videz le cache (Ctrl+Shift+R ou Cmd+Shift+R)

**Cause 2 : Fichier manquant**
- **Solution** : Vérifiez que `/public/favicon.svg` existe

**Cause 3 : Chemin incorrect**
- **Solution** : Dans `index.html`, vérifiez que le chemin est `/favicon.svg` (avec le `/` au début)

### Le favicon est pixelisé

**Cause** : Utilisation d'un fichier PNG trop petit
- **Solution** : Utilisez le fichier SVG (scalable)

### Le favicon iOS ne s'affiche pas

**Cause** : Fichier `apple-touch-icon.png` manquant
- **Solution** : Convertissez `apple-touch-icon.svg` en PNG 180x180px

---

## 📚 Ressources

### Outils de conversion
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)
- [CloudConvert](https://cloudconvert.com/svg-to-png) (SVG → PNG)

### Documentation
- [MDN - Favicon](https://developer.mozilla.org/fr/docs/Web/HTML/Element/link#providing_icons_for_different_usage_contexts)
- [Can I Use - SVG favicons](https://caniuse.com/link-icon-svg)

---

## 🎉 Résultat final

✅ **Favicon SVG** moderne et scalable  
✅ **Apple Touch Icon** pour iOS/macOS  
✅ **Couleurs TBEE** respectées (#1E1548 + blanc)  
✅ **Bords arrondis** comme le logo de la sidebar  
✅ **Prêt pour production** sur Vercel  

---

**Le favicon TBEE est maintenant configuré et prêt à être utilisé ! 🚀**