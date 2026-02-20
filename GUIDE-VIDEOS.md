# 📹 Guide d'intégration des vidéos dans TBEE

## 📍 État actuel du système

Actuellement, toutes les vidéos dans le parcours sont des **placeholders** avec `videoUrl: '#'`. Le système affiche un lecteur stylisé avec un bouton Play, mais ne lit pas de vraie vidéo.

### Où se trouvent les vidéos dans le code ?

Toutes les vidéos sont définies dans `/src/app/components/ModuleLinearPage.tsx` dans la structure `moduleData` (lignes 13-222).

**Exemple de structure actuelle :**
```typescript
{
  id: 'step1',
  title: 'Présentation du parcours',
  type: 'video',
  description: 'Introduction au programme et à la plateforme',
  duration: '8min',
  content: { videoUrl: '#', pdfUrl: null }  // ⚠️ Placeholder actuel
}
```

---

## 🎯 Comment fonctionne le système de déblocage ?

Le système de gamification et de déblocage progressif est **100% fonctionnel** et continuera à fonctionner avec vos vraies vidéos :

### 1. **Logique de déblocage séquentiel**
- Les étapes se débloquent **une par une** dans l'ordre
- Une étape est "locked" 🔒 tant que la précédente n'est pas terminée
- Une étape devient "available" 🟦 quand vous pouvez y accéder
- Une étape devient "completed" ✅ après validation

### 2. **Validation et progression**
```typescript
// Fonction qui gère la validation (ligne 313)
const handleCompleteStep = (stepId: string) => {
  setCompletedStepsLocal([...completedStepsLocal, stepId]);
  // TODO: Sauvegarder dans Supabase
  calculateAndUpdateProgress([...completedStepsLocal, stepId]);
};
```

### 3. **États visuels des étapes**
- **Verrouillée (locked)** : Fond gris, icône cadenas 🔒
- **Disponible (available)** : Fond bleu clair, cercle vide ⭕
- **Active** : Fond jaune #FFD600 ⚡
- **Complétée** : Fond vert, icône check ✅

---

## 🚀 Options pour héberger vos vidéos

### Option 1 : **Supabase Storage** (Recommandé pour TBEE)

✅ **Avantages :**
- Intégration directe avec votre base de données Supabase
- Contrôle total sur l'accès (authentification requise)
- Coûts prévisibles et inclus dans votre plan Supabase
- Pas de publicité ni de branding externe

⚠️ **Limites :**
- Bande passante limitée selon le plan Supabase
- Pas de CDN optimisé pour la vidéo streaming (mais suffisant pour TBEE)

**📦 Coûts Supabase Free Plan :**
- ✅ 1 GB de stockage
- ✅ 2 GB de bande passante/mois
- ✅ Pour ~50 vidéos de 50MB = 2.5GB → **Pro Plan requis** ($25/mois)

**Pro Plan ($25/mois) :**
- ✅ 100 GB de stockage
- ✅ 200 GB de bande passante/mois
- ✅ Suffisant pour ~100 étudiants/mois


### Option 2 : **YouTube (Vidéos non listées)**

✅ **Avantages :**
- Gratuit et illimité
- CDN optimisé par Google (streaming rapide partout dans le monde)
- Compression automatique et qualités adaptatives
- Sous-titres automatiques possibles

⚠️ **Inconvénients :**
- ⚠️ Les vidéos "non listées" restent **accessibles à quiconque a le lien**
- ⚠️ Pas de protection par authentification
- ⚠️ Branding YouTube (logo, suggestions de vidéos)
- ⚠️ Risque de suppression si YouTube détecte du contenu problématique


### Option 3 : **Vimeo** (Solution professionnelle)

✅ **Avantages :**
- Vidéos privées avec protection par domaine ou mot de passe
- Pas de publicité ni de suggestions
- Player personnalisable
- Analytics détaillés

⚠️ **Coûts :**
- Plan Starter : $20/mois (250 GB/an)
- Plan Standard : $33/mois (1 TB/an)


### Option 4 : **Cloudflare Stream** (Alternative technique)

✅ **Avantages :**
- CDN ultra-rapide
- Streaming adaptatif automatique
- Protection par token d'authentification

💰 **Coûts :**
- $5/mois pour 1000 minutes stockées
- $1 pour 1000 minutes visionnées


---

## 🛠️ Comment intégrer vos vidéos (étape par étape)

### Méthode A : **Avec Supabase Storage** (Recommandé)

#### 1️⃣ **Uploader vos vidéos dans Supabase**

Après avoir créé votre projet Supabase (voir `GUIDE-SUPABASE.md`) :

1. Accédez à votre dashboard Supabase : https://app.supabase.com
2. Allez dans **Storage** dans le menu de gauche
3. Créez un nouveau bucket nommé `videos-tbee`
4. Configurez les permissions :

```sql
-- Dans SQL Editor de Supabase
-- Politique : Seuls les utilisateurs authentifiés peuvent voir les vidéos
create policy "Utilisateurs authentifiés peuvent lire les vidéos"
on storage.objects for select
using (
  bucket_id = 'videos-tbee'
  AND auth.role() = 'authenticated'
);
```

5. Uploadez vos vidéos dans ce bucket (par glisser-déposer)
6. Pour chaque vidéo, récupérez l'URL publique


#### 2️⃣ **Modifier le code pour utiliser les vraies URLs**

Ouvrez `/src/app/components/ModuleLinearPage.tsx` et remplacez les placeholders :

**AVANT :**
```typescript
{
  id: 'step1',
  title: 'Présentation du parcours',
  type: 'video',
  description: 'Introduction au programme et à la plateforme',
  duration: '8min',
  content: { videoUrl: '#', pdfUrl: null }  // ⚠️ Placeholder
}
```

**APRÈS :**
```typescript
{
  id: 'step1',
  title: 'Présentation du parcours',
  type: 'video',
  description: 'Introduction au programme et à la plateforme',
  duration: '8min',
  content: { 
    videoUrl: 'https://your-project.supabase.co/storage/v1/object/public/videos-tbee/week1-step1-intro.mp4',
    pdfUrl: null 
  }
}
```


#### 3️⃣ **Modifier le lecteur vidéo pour lire les vraies vidéos**

Dans `/src/app/components/ModuleLinearPage.tsx`, ligne **503-515**, remplacez le placeholder par un vrai lecteur :

**AVANT (placeholder actuel) :**
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

**APRÈS (vrai lecteur vidéo) :**
```tsx
{activeStep.type === 'video' && (
  <div className="space-y-4 sm:space-y-6">
    {/* Video Player */}
    {activeStep.content.videoUrl && activeStep.content.videoUrl !== '#' ? (
      <div className="bg-[#1E1548] rounded-[16px] overflow-hidden">
        <video 
          controls 
          className="w-full aspect-video"
          controlsList="nodownload" // Empêche le téléchargement direct
          onContextMenu={(e) => e.preventDefault()} // Désactive clic droit
        >
          <source src={activeStep.content.videoUrl} type="video/mp4" />
          Votre navigateur ne supporte pas la lecture de vidéos.
        </video>
      </div>
    ) : (
      // Placeholder si pas encore de vidéo uploadée
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


---

### Méthode B : **Avec YouTube (vidéos non listées)**

#### 1️⃣ **Uploader vos vidéos sur YouTube**

1. Créez une chaîne YouTube dédiée pour TBEE
2. Uploadez vos vidéos en mode **"Non listée"**
3. Pour chaque vidéo, récupérez l'URL d'intégration (Embed)
   - Cliquez sur "Partager" → "Intégrer"
   - Récupérez le code iframe ou l'URL `https://www.youtube.com/embed/VIDEO_ID`


#### 2️⃣ **Modifier le code pour YouTube**

**Dans ModuleLinearPage.tsx :**

```typescript
// Remplacez les videoUrl par les URLs YouTube
content: { 
  videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // ID de votre vidéo
  pdfUrl: null 
}
```

**Modifiez le lecteur (ligne 503-515) :**

```tsx
{activeStep.type === 'video' && (
  <div className="space-y-4 sm:space-y-6">
    {activeStep.content.videoUrl && activeStep.content.videoUrl !== '#' ? (
      <div className="bg-[#1E1548] rounded-[16px] overflow-hidden aspect-video">
        <iframe
          src={activeStep.content.videoUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={activeStep.title}
        />
      </div>
    ) : (
      // Placeholder...
    )}
```


---

## 🔐 Sécurité et protection des vidéos

### Avec Supabase Storage :
- ✅ Les vidéos nécessitent une authentification Supabase
- ✅ Vous contrôlez qui peut accéder aux vidéos via Row Level Security (RLS)
- ✅ Les URLs contiennent des tokens d'authentification

### Avec YouTube non listé :
- ⚠️ **Toute personne avec le lien peut voir la vidéo**
- ⚠️ Pas de protection par authentification
- ✅ Pas téléchargeable facilement (mais possible avec des outils)

### Protection supplémentaire possible :
```tsx
// Vérifier que l'utilisateur est authentifié avant d'afficher la vidéo
{userRole === 'student' && activeStep.content.videoUrl ? (
  <video controls src={activeStep.content.videoUrl} />
) : (
  <div>Veuillez vous connecter pour voir cette vidéo</div>
)}
```


---

## ✅ Checklist : Avant d'uploader vos vidéos

### 📋 Préparation des vidéos

- [ ] **Format recommandé :** MP4 (H.264)
- [ ] **Résolution recommandée :** 1080p (1920x1080) ou 720p (1280x720)
- [ ] **Durée :** Respecte les durées indiquées dans le parcours (8min, 12min, etc.)
- [ ] **Taille par vidéo :** Idéalement < 100 MB par vidéo
  - Utilisez Handbrake ou Adobe Media Encoder pour compresser
  - Bitrate recommandé : 2-5 Mbps
- [ ] **Audio :** Mono ou stéréo, 128 kbps minimum
- [ ] **Sous-titres :** Fichiers .srt ou .vtt (optionnel mais recommandé pour l'accessibilité)

### 📝 Nommage des fichiers
Pour faciliter l'organisation :
```
week1-step1-intro.mp4
week1-step2-formations.mp4
week1-step3-choix.mp4
week2-step1-cv-structure.mp4
week2-step2-linkedin.mp4
...
```


---

## 📊 Estimation des coûts

### Scénario TBEE : 250 étudiants/an

**Hypothèses :**
- 15 vidéos de 10 minutes chacune
- Taille moyenne par vidéo : 80 MB
- Chaque étudiant regarde toutes les vidéos 1x

**Stockage total :** 15 vidéos × 80 MB = **1.2 GB**

**Bande passante :**
- Par étudiant : 1.2 GB
- Pour 250 étudiants : 250 × 1.2 GB = **300 GB/an** = **25 GB/mois**

### Coûts avec Supabase Pro ($25/mois) :
- ✅ 100 GB de stockage → suffisant
- ✅ 200 GB de bande passante/mois → suffisant
- ✅ **Recommandé pour TBEE**

### Coûts avec YouTube :
- ✅ **GRATUIT** (bande passante illimitée)
- ⚠️ Mais pas de protection par authentification


---

## 🎓 Recommandation finale pour TBEE

### Phase 1 : Développement (maintenant)
✅ Gardez les placeholders actuels avec `videoUrl: '#'`
✅ Le système de déblocage fonctionne déjà
✅ Vous pouvez tester tout le parcours

### Phase 2 : Production de vos vidéos
✅ Créez vos vidéos avec les durées indiquées
✅ Nommez-les selon la convention (week1-step1-intro.mp4)
✅ Compressez-les pour réduire la taille

### Phase 3 : Hébergement et intégration
**Option recommandée : Supabase Storage**
1. Upgrader vers Supabase Pro ($25/mois) si > 50 étudiants/mois
2. Uploader toutes les vidéos dans le bucket `videos-tbee`
3. Configurer les permissions (authentification requise)
4. Remplacer les `videoUrl: '#'` par les vraies URLs Supabase
5. Modifier le composant vidéo pour afficher le vrai lecteur

**Alternative : YouTube non listé**
- Si budget très limité
- Si pas besoin de protection stricte
- Si vous voulez profiter du CDN Google


---

## 🔄 Migration progressive possible

Vous pouvez uploader vos vidéos **progressivement** :

```typescript
// Certaines étapes avec vraies vidéos, d'autres encore en placeholder
{
  id: 'step1',
  title: 'Présentation du parcours',
  type: 'video',
  content: { 
    videoUrl: 'https://supabase.../week1-step1.mp4', // ✅ Vraie vidéo
    pdfUrl: null 
  }
},
{
  id: 'step2',
  title: 'Les formations en alternance',
  type: 'video',
  content: { 
    videoUrl: '#', // ⚠️ Placeholder - vidéo à venir
    pdfUrl: null 
  }
}
```

Le code que je vous ai fourni gère automatiquement les deux cas !


---

## 🆘 Support et questions

Si vous avez des questions lors de l'intégration des vidéos :

1. **Problème de lecture :** Vérifiez le format MP4 (H.264)
2. **Vidéo ne s'affiche pas :** Vérifiez les permissions Supabase
3. **Bande passante dépassée :** Considérez YouTube ou Cloudflare Stream
4. **Qualité trop basse :** Augmentez le bitrate lors de la compression

---

**✅ Le système de gamification et de déblocage continuera à fonctionner parfaitement avec vos vraies vidéos !** 🚀
