# 📊 Système de Tracking en Temps Réel - TBEE

Ce document explique comment fonctionne le système de tracking de progression en temps réel dans l'application TBEE.

## ✅ Fonctionnalités Implémentées

### 1. **Affichage du Nom du Candidat**

**Fichier**: `/src/app/App.tsx` (lignes 71-87)

Les données d'onboarding sont maintenant **automatiquement transmises** au contexte `UserDataProvider` :

```typescript
const initialUserData = onboardingData.step1 ? {
  userProfile: {
    firstName: onboardingData.step1?.firstName || null,
    lastName: onboardingData.step1?.lastName || null,
    // ... autres champs
  }
} : undefined;

<UserDataProvider initialData={initialUserData}>
```

**Résultat** :
- ✅ Le Dashboard affiche maintenant "Bienvenue, [Prénom] !" au lieu de "Bienvenue, Candidat"
- ✅ Synchronisation automatique après l'onboarding

---

### 2. **Tracking de la Progression des Modules**

**Fichier**: `/src/app/components/ModuleLinearPage.tsx`

Le composant utilise maintenant le contexte `UserData` pour tracker **toutes les actions** de l'étudiant :

#### **Actions Trackées** :

| Action | Fonction Appelée | Effet |
|--------|------------------|-------|
| Démarrer un module | `startModule()` | Change le statut du module à "in_progress" |
| Compléter une étape | `handleCompleteStep()` | Incrémente le temps d'étude, met à jour la progression |
| Terminer un module | `completeModule()` | Marque le module comme terminé, débloque le suivant |
| Première activité du jour | `updateStreak()` | Met à jour la série de jours consécutifs |

#### **Exemple de Flow** :

```
Étudiant regarde une vidéo de 8min
    ↓
Clique sur "Marquer comme terminé"
    ↓
handleCompleteStep() est appelé
    ↓
1. incrementStudyTime(8) → Temps d'étude +8min
2. updateModuleProgress(id, 20%) → Progression module +20%
3. Si toutes les étapes terminées → completeModule()
    ↓
Dashboard mis à jour automatiquement
```

---

## 🔄 Synchronisation en Temps Réel

### **Comment ça fonctionne ?**

1. **Contexte Global** (`/src/context/UserDataContext.tsx`)
   - Contient TOUTES les données utilisateur (profil, stats, modules, offres, CV)
   - Les modifications sont appliquées **immédiatement** dans l'état local
   - Les composants qui utilisent `useUserData()` sont **automatiquement re-rendus**

2. **Computed Values Automatiques**
   - `globalProgress` : Calculé automatiquement à partir des modules
   - `completedModulesCount` : Nombre de modules terminés
   - `currentModule` : Module en cours ou prochain disponible
   - `isNewUser` : Détecte si l'utilisateur a déjà commencé

3. **Propagation des Changements**
   ```
   ModuleLinearPage → completeModule()
        ↓
   UserDataContext → met à jour modules[]
        ↓
   StudentDashboard → détecte le changement via useUserData()
        ↓
   Re-render automatique avec les nouvelles données
   ```

---

## 📈 Statistiques Mises à Jour

### **Dashboard** (`/src/app/components/StudentDashboard.tsx`)

Affiche en temps réel :
- ✅ **Modules terminés** : `3/4` (se met à jour après `completeModule()`)
- ✅ **Temps d'étude** : `1h 23min` (se met à jour après chaque vidéo/exercice)
- ✅ **Série en cours** : `5 jours` (se met à jour quotidiennement)
- ✅ **Objectif mensuel** : `75%` (calculé depuis `globalProgress`)
- ✅ **Barre de progression** : Animation fluide lors des changements

### **Mon Parcours** (`/src/app/components/StudentDashboardModules.tsx`)

Affiche la même synchronisation :
- ✅ Modules débloqués automatiquement
- ✅ Progression visuelle de chaque module
- ✅ Statistiques identiques au Dashboard

---

## 🎯 Exemple Concret

### Scénario : Marie termine le Module 1

**État Initial** :
```json
{
  "modules": [
    { "id": "module-week1", "status": "in_progress", "progress": 80 },
    { "id": "module-week2", "status": "locked", "progress": 0 }
  ],
  "statistics": {
    "totalTimeSpentMinutes": 45,
    "currentStreakDays": 2
  }
}
```

**Actions de Marie** :
1. Regarde la dernière vidéo (10min)
2. Clique sur "Marquer comme terminé"

**Résultat Automatique** :
```json
{
  "modules": [
    { "id": "module-week1", "status": "completed", "progress": 100 }, // ✅ Terminé
    { "id": "module-week2", "status": "available", "progress": 0 }    // ✅ Débloqué !
  ],
  "statistics": {
    "totalTimeSpentMinutes": 55,     // +10min
    "currentStreakDays": 3,          // +1 jour
    "currentWeek": 2                 // Passe à la semaine 2
  }
}
```

**Affichage Mis à Jour** :
- ✅ Dashboard : "Modules terminés : **1/4**" → "**2/4**" (après le module 2)
- ✅ Dashboard : "Temps d'étude : **45min**" → "**55min**"
- ✅ Dashboard : "Série : **2 jours**" → "**3 jours**"
- ✅ Mon Parcours : Module 2 passe de 🔒 (verrouillé) à ⭐ (disponible)

---

## 🚀 Prêt pour Supabase

### **TODOs marqués dans le code**

Tous les fichiers contiennent des commentaires `// TODO: update Supabase` aux endroits exacts où les appels API devront être ajoutés :

**Exemple** (`/src/context/UserDataContext.tsx`, ligne 147) :
```typescript
const updateModuleProgress = useCallback(async (moduleId: string, progress: number) => {
  // TODO: update Supabase user_lesson_progress
  // await supabase
  //   .from('user_lesson_progress')
  //   .update({ progress })
  //   .eq('module_id', moduleId)
  //   .eq('user_id', userId);
  
  setData(prev => ({
    ...prev,
    modules: prev.modules.map(m => 
      m.id === moduleId 
        ? { ...m, progress: Math.min(100, Math.max(0, progress)) }
        : m
    )
  }));
}, []);
```

### **Migration Supabase**

1. **Remplacer** `localStorage` par les appels Supabase
2. **Connecter** les fonctions existantes aux tables :
   - `users_profiles` → `updateUserProfile()`
   - `user_statistics` → `incrementStudyTime()`, `updateStreak()`
   - `user_lesson_progress` → `updateModuleProgress()`, `completeModule()`
   - `user_tracked_offers` → `addTrackedOffer()`, etc.

3. **Aucun changement** dans les composants React nécessaire !

---

## 📝 Résumé

| Fonctionnalité | État | Fichier Principal |
|----------------|------|-------------------|
| Nom du candidat affiché | ✅ Fonctionne | `/src/app/App.tsx` |
| Progression modules | ✅ Fonctionne | `/src/app/components/ModuleLinearPage.tsx` |
| Temps d'étude | ✅ Fonctionne | `/src/context/UserDataContext.tsx` |
| Série de jours | ✅ Fonctionne | `/src/context/UserDataContext.tsx` |
| Débloquage automatique | ✅ Fonctionne | `/src/context/UserDataContext.tsx` |
| Synchronisation Dashboard ↔ Mon Parcours | ✅ Fonctionne | Contexte global |
| Prêt pour Supabase | ✅ Prêt | Tous les fichiers |

---

## 🎉 Résultat Final

L'application est maintenant **pleinement fonctionnelle** avec une progression en temps réel :
- Chaque action de l'étudiant met à jour instantanément toutes les statistiques
- Le Dashboard et Mon Parcours sont toujours synchronisés
- Le prénom de l'étudiant s'affiche correctement
- Le code est prêt pour l'intégration Supabase sans modifications majeures

**Date de mise à jour** : 28 janvier 2026
