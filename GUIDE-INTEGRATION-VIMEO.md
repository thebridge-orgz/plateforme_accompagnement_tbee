# 🎬 Guide d'intégration Vimeo pour TBEE

## ✅ Pourquoi Vimeo est un excellent choix pour TBEE

- ✅ **Vidéos privées** avec protection par domaine
- ✅ **Pas de publicité** ni de suggestions externes
- ✅ **Player personnalisable** aux couleurs TBEE (#FFD600, #1E1548)
- ✅ **Analytics détaillés** : qui regarde quoi, combien de temps, etc.
- ✅ **Professionnel** et adapté à une plateforme éducative
- ✅ **Sous-titres** et transcriptions automatiques possibles
- ✅ **Qualité adaptative** automatique selon la connexion

---

## 💰 Plan Vimeo recommandé pour TBEE

### **Vimeo Standard : $33/mois (ou $20/mois si payé annuellement)**

**Ce qui est inclus :**
- ✅ 1 TB (1000 GB) d'espace de stockage par an
- ✅ Vidéos privées illimitées
- ✅ Protection par mot de passe ou par domaine
- ✅ Player personnalisable (couleurs, logo)
- ✅ Analytics avancés
- ✅ Pas de publicité Vimeo
- ✅ Support prioritaire

**Estimation pour TBEE :**
- 15 vidéos × 80 MB = 1.2 GB utilisés
- ✅ **Largement suffisant !**

---

## 📋 Étapes à suivre quand vos vidéos seront prêtes

### 1️⃣ **Créer votre compte Vimeo et uploader les vidéos**

1. Créez un compte Vimeo : https://vimeo.com/join
2. Choisissez le plan **Standard** ($33/mois)
3. Uploadez vos vidéos avec cette convention de nommage :

```
TBEE - Semaine 1 - Étape 1 - Présentation du parcours
TBEE - Semaine 1 - Étape 2 - Les formations en alternance
TBEE - Semaine 1 - Étape 3 - Choisir sa formation
TBEE - Semaine 2 - Étape 1 - Créer son CV
TBEE - Semaine 2 - Étape 2 - Optimiser son profil LinkedIn
...
```

### 2️⃣ **Configurer la confidentialité des vidéos**

Pour **chaque vidéo** uploadée sur Vimeo :

1. Allez dans **Paramètres** (Settings) de la vidéo
2. Onglet **Privacy** (Confidentialité)
3. Sélectionnez : **"Hide from Vimeo.com"**
4. Activez : **"Only on sites I choose"** (Uniquement sur les sites que je choisis)
5. Ajoutez votre domaine : `votre-domaine-tbee.vercel.app` ou votre domaine personnalisé
6. **Désactivez** : "Allow share buttons" (pour éviter les partages)

**⚠️ Important :** Cette protection empêche :
- ❌ Les vidéos d'apparaître sur Vimeo.com
- ❌ Les gens de partager les vidéos
- ❌ L'intégration sur d'autres sites
- ✅ MAIS permet la lecture sur votre domaine TBEE uniquement

### 3️⃣ **Personnaliser le player Vimeo aux couleurs TBEE**

1. Dans **Paramètres de la vidéo** → Onglet **Embed** (Intégration)
2. Cliquez sur **"Show options"**
3. Personnalisez :

```
Player Color: #FFD600 (jaune TBEE)
Title: OFF (masquer le titre)
Byline: OFF (masquer l'auteur)
Portrait: OFF (masquer la photo de profil)
Speed: ON (permettre de changer la vitesse)
Quality Selector: ON (permettre de changer la qualité)
```

4. Cliquez sur **"Save"**

### 4️⃣ **Récupérer les liens d'intégration**

Pour **chaque vidéo** :

1. Ouvrez la vidéo sur Vimeo
2. Cliquez sur le bouton **"Share"** (Partager)
3. Copiez le lien dans la section **"Embed"** (Intégration)

**Format du lien Vimeo :**
```
https://player.vimeo.com/video/123456789?h=abcdef1234
```

**ℹ️ Note :** Le paramètre `?h=...` est un **token de sécurité** unique à chaque vidéo.

---

## 🛠️ Modification du code TBEE

### **Étape 1 : Remplacer les URLs des vidéos**

Ouvrez le fichier `/src/app/components/ModuleLinearPage.tsx`

**Cherchez les lignes avec `videoUrl: '#'` et remplacez-les :**

#### **Semaine 1 - Module 1 : Découverte de l'alternance**

```typescript
// Ligne ~30
{
  id: 'step1',
  title: 'Présentation du parcours',
  type: 'video',
  description: 'Introduction au programme et à la plateforme',
  duration: '8min',
  content: { 
    videoUrl: 'https://player.vimeo.com/video/VOTRE_VIDEO_ID_1?h=TOKEN',  // ⬅️ Remplacez
    pdfUrl: null 
  }
},

// Ligne ~38
{
  id: 'step2',
  title: 'Les formations en alternance',
  type: 'video',
  description: 'Découvre tous les domaines proposés',
  duration: '15min',
  content: { 
    videoUrl: 'https://player.vimeo.com/video/VOTRE_VIDEO_ID_2?h=TOKEN',  // ⬅️ Remplacez
    pdfUrl: '/pdf/formations.pdf' 
  }
},

// Ligne ~62
{
  id: 'step3',
  title: 'Validation',
  type: 'validation',
  description: 'Validation de ton parcours',
  duration: '10min',
  content: { 
    videoUrl: 'https://player.vimeo.com/video/VOTRE_VIDEO_ID_3?h=TOKEN'  // ⬅️ Remplacez
  }
}
```

#### **Semaine 2 - Module 2 : CV & LinkedIn**

```typescript
// Ligne ~78
{
  id: 'step1',
  title: 'Créer son CV',
  type: 'video',
  description: 'Structure, mise en page et contenu',
  duration: '12min',
  content: { 
    videoUrl: 'https://player.vimeo.com/video/VOTRE_VIDEO_ID_4?h=TOKEN',  // ⬅️ Remplacez
    pdfUrl: '/pdf/cv-guide.pdf' 
  }
},

// Ligne ~95
{
  id: 'step2',
  title: 'Optimiser son profil LinkedIn',
  type: 'video',
  description: 'Bonnes pratiques et visibilité',
  duration: '15min',
  content: { 
    videoUrl: 'https://player.vimeo.com/video/VOTRE_VIDEO_ID_5?h=TOKEN',  // ⬅️ Remplacez
    pdfUrl: '/pdf/linkedin-guide.pdf' 
  }
}
```

**... Et ainsi de suite pour toutes les autres vidéos** (voir le fichier complet)

---

### **Étape 2 : Modifier le composant lecteur vidéo**

Dans le même fichier `/src/app/components/ModuleLinearPage.tsx`, cherchez la ligne **~503** et remplacez le code du lecteur vidéo :

**❌ AVANT (code actuel - placeholder) :**

```tsx
{activeStep.type === 'video' && (
  <div className="space-y-4 sm:space-y-6">
    {/* Video Player */}
    <div className="bg-[#1E1548] rounded-[16px] overflow-hidden aspect-video flex items-center justify-center relative">
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, rgba(255, 214, 0, 0.1) 0%, rgba(232, 236, 255, 0.1) 100%)'
      }} />
      <div className="relative z-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[rgba(255,214,0,0.2)] rounded-full flex items-center justify-center backdrop-blur-sm mb-4">
          <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFD600]" fill="#FFD600" />
        </div>
      </div>
    </div>
```

**✅ APRÈS (avec Vimeo intégré) :**

```tsx
{activeStep.type === 'video' && (
  <div className="space-y-4 sm:space-y-6">
    {/* Video Player - Vimeo */}
    {activeStep.content.videoUrl && activeStep.content.videoUrl !== '#' ? (
      <div className="bg-[#1E1548] rounded-[16px] overflow-hidden aspect-video">
        <iframe
          src={`${activeStep.content.videoUrl}&color=FFD600&title=0&byline=0&portrait=0`}
          className="w-full h-full rounded-[16px]"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title={activeStep.title}
        />
      </div>
    ) : (
      // Placeholder si vidéo pas encore uploadée
      <div className="bg-[#1E1548] rounded-[16px] overflow-hidden aspect-video flex items-center justify-center relative">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(255, 214, 0, 0.1) 0%, rgba(232, 236, 255, 0.1) 100%)'
        }} />
        <div className="relative z-10 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[rgba(255,214,0,0.2)] rounded-full flex items-center justify-center backdrop-blur-sm mb-4 mx-auto">
            <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFD600]" fill="#FFD600" />
          </div>
          <p className="text-[#E8ECFF] text-sm">Vidéo à venir</p>
        </div>
      </div>
    )}
```

**📝 Explications des paramètres ajoutés dans l'URL :**
- `&color=FFD600` → Couleur jaune TBEE pour les contrôles
- `&title=0` → Masque le titre de la vidéo
- `&byline=0` → Masque le nom de l'auteur
- `&portrait=0` → Masque la photo de profil

---

## 🎨 Personnalisation avancée du player Vimeo (optionnel)

Vous pouvez ajouter d'autres paramètres dans l'URL pour personnaliser davantage :

```tsx
src={`${activeStep.content.videoUrl}&color=FFD600&title=0&byline=0&portrait=0&speed=1&quality_selector=1&autoplay=0`}
```

**Paramètres disponibles :**
- `autoplay=1` → Lecture automatique (⚠️ peut être bloquée par les navigateurs)
- `loop=1` → Lecture en boucle
- `muted=1` → Démarrer en mode muet
- `speed=1` → Afficher le sélecteur de vitesse (0.5x, 1x, 1.5x, 2x)
- `quality_selector=1` → Afficher le sélecteur de qualité (360p, 720p, 1080p)
- `pip=1` → Permettre le mode Picture-in-Picture

**📚 Documentation complète :** https://developer.vimeo.com/player/sdk/embed

---

## 📊 Suivi des Analytics Vimeo

Une fois vos vidéos intégrées, vous pourrez suivre dans le dashboard Vimeo :

✅ **Nombre de vues** par vidéo
✅ **Durée moyenne de visionnage** (combien de temps les étudiants regardent)
✅ **Taux de complétion** (% d'étudiants qui finissent la vidéo)
✅ **Moments où les étudiants quittent** (pour améliorer le contenu)
✅ **Appareils utilisés** (desktop, mobile, tablette)
✅ **Localisation géographique**

**💡 Astuce :** Ces données vous aideront à identifier les vidéos qui fonctionnent bien et celles à améliorer !

---

## 🔐 Sécurité supplémentaire (optionnel mais recommandé)

### **Protection par mot de passe Vimeo**

Pour une sécurité maximale, vous pouvez ajouter un mot de passe unique à toutes vos vidéos :

1. Dans **Paramètres de la vidéo** → **Privacy**
2. Activez **"Password"**
3. Définissez un mot de passe (ex: `TBEE2025!`)
4. Communiquez ce mot de passe uniquement aux étudiants inscrits

**⚠️ Inconvénient :** Les étudiants devront entrer le mot de passe la première fois qu'ils regardent une vidéo.

### **Protection par domaine (recommandé)**

C'est la méthode que je recommande pour TBEE :

- ✅ Pas besoin de mot de passe
- ✅ Vidéos lisibles uniquement sur votre domaine
- ✅ Expérience fluide pour les étudiants

---

## 📋 Checklist avant de déployer avec les vidéos Vimeo

### **Sur Vimeo :**
- [ ] Compte Vimeo Standard créé ($33/mois)
- [ ] Toutes les vidéos uploadées avec nommage cohérent
- [ ] Privacy configurée : "Hide from Vimeo.com" + "Only on sites I choose"
- [ ] Domaine TBEE ajouté dans la liste blanche
- [ ] Player personnalisé aux couleurs TBEE (#FFD600)
- [ ] Tous les liens d'intégration copiés

### **Dans le code TBEE :**
- [ ] Fichier `/src/app/components/ModuleLinearPage.tsx` ouvert
- [ ] Toutes les `videoUrl: '#'` remplacées par les liens Vimeo
- [ ] Composant lecteur vidéo modifié (ligne ~503)
- [ ] Test local : vérifier qu'au moins une vidéo s'affiche correctement
- [ ] Commit et push sur Vercel

### **Après déploiement :**
- [ ] Tester la lecture des vidéos sur le domaine de production
- [ ] Vérifier que le player est bien aux couleurs TBEE
- [ ] Vérifier que les vidéos ne sont pas accessibles directement sur Vimeo.com
- [ ] Tester le déblocage progressif des modules (gamification)

---

## 🆘 Résolution de problèmes courants

### ❌ **La vidéo ne s'affiche pas**
**Causes possibles :**
1. Le domaine TBEE n'est pas dans la liste blanche Vimeo
   - **Solution :** Ajoutez `votre-domaine.vercel.app` dans Privacy → "Only on sites I choose"
2. L'URL Vimeo est incorrecte
   - **Solution :** Vérifiez que vous avez copié le lien depuis la section "Embed", pas "Link"

### ❌ **La vidéo s'affiche mais pas aux couleurs TBEE**
**Cause :** Les paramètres de personnalisation ne sont pas dans l'URL
**Solution :** Ajoutez `&color=FFD600&title=0&byline=0&portrait=0` à la fin de l'URL

### ❌ **Message "This video is private"**
**Cause :** La vidéo est en mode totalement privé
**Solution :** Changez Privacy → "Hide from Vimeo.com" au lieu de "Private"

### ❌ **Les vidéos sont lentes à charger**
**Cause :** Problème de bande passante ou qualité trop élevée
**Solutions :**
1. Activez la qualité adaptative dans Vimeo
2. Compressez vos vidéos avant upload (bitrate 2-5 Mbps)
3. Ajoutez `&quality=auto` dans l'URL

---

## 💡 Conseils pour optimiser vos vidéos avant upload

### **Compression recommandée avec Handbrake (gratuit)**

**Paramètres optimaux pour TBEE :**
```
Format: MP4
Video Codec: H.264
Framerate: 30 fps
Quality: Constant Quality = 23 (bon équilibre qualité/taille)
Resolution: 1920x1080 (1080p) ou 1280x720 (720p)
Audio Codec: AAC
Audio Bitrate: 128 kbps
```

**Résultat attendu :**
- Vidéo de 10 min en 1080p → ~80-100 MB
- Qualité excellente pour une plateforme e-learning
- Chargement rapide

---

## 📅 Timeline recommandée

### **Semaine 1-2 : Production des vidéos**
- Tournage et montage de toutes les vidéos
- Compression et export en MP4

### **Semaine 3 : Upload et configuration Vimeo**
- Création du compte Vimeo Standard
- Upload de toutes les vidéos (peut prendre du temps)
- Configuration de la confidentialité et du player

### **Semaine 4 : Intégration dans le code**
- Remplacement de tous les `videoUrl: '#'`
- Modification du composant lecteur vidéo
- Tests locaux

### **Semaine 5 : Déploiement et tests**
- Push sur Vercel
- Tests de lecture sur tous les appareils
- Vérification du système de déblocage
- Feedback des premiers utilisateurs

---

## 🎯 Récapitulatif : Ce qui change dans TBEE avec Vimeo

### **Avant (actuellement) :**
```tsx
content: { videoUrl: '#', pdfUrl: null }
// → Placeholder avec bouton Play stylisé
```

### **Après (avec Vimeo) :**
```tsx
content: { 
  videoUrl: 'https://player.vimeo.com/video/123456789?h=abc123',
  pdfUrl: null 
}
// → Vrai lecteur Vimeo intégré aux couleurs TBEE
```

### **Ce qui reste INCHANGÉ :**
✅ Le système de déblocage progressif (gamification)
✅ La validation manuelle par l'admin
✅ La barre de progression du module
✅ Les états visuels des étapes (verrouillé, disponible, complété)
✅ L'affichage des ressources PDF
✅ Toute la logique d'apprentissage

---

## ✅ Conclusion

Vimeo est **parfaitement adapté à TBEE** :
- 🎓 Solution professionnelle pour l'e-learning
- 🔐 Sécurité et confidentialité optimales
- 🎨 Personnalisation aux couleurs de votre marque
- 📊 Analytics pour améliorer vos contenus
- 💰 Prix raisonnable ($33/mois) pour la qualité offerte

**Vous pouvez continuer à développer maintenant, et intégrer vos vidéos Vimeo plus tard sans aucun problème !** 🚀

La plateforme TBEE est déjà prête à recevoir vos vidéos - il suffira de remplacer les URLs et modifier le composant lecteur. C'est tout ! ✨
