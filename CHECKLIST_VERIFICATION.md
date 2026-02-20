# ✅ Checklist de Vérification - Tracking en Temps Réel

Cette checklist vous permet de vérifier rapidement que toutes les fonctionnalités de tracking sont bien implémentées.

---

## 🎯 Vérification Rapide (5 minutes)

### ✅ 1. Affichage du Nom

**Test** : Inscription → Onboarding → Dashboard

- [ ] À l'onboarding étape 1, j'ai saisi le prénom "Marie"
- [ ] J'ai complété l'onboarding étape 2
- [ ] Sur le Dashboard, je vois "Bienvenue, Marie !" (et non "Bienvenue, Candidat")
- [ ] Sur Mon Parcours, je vois également "Bienvenue, Marie !"

**Si ça ne fonctionne pas** : Vérifier `/src/app/App.tsx` lignes 71-87 et 140

---

### ✅ 2. Temps d'Étude

**Test** : Module → Compléter une étape de 8min

- [ ] Dashboard initial : "Temps d'étude : 0min"
- [ ] J'entre dans le Module semaine 1
- [ ] Je complète l'étape 1 (vidéo 8min)
- [ ] Je reviens au Dashboard
- [ ] Dashboard mis à jour : "Temps d'étude : 8min"

**Si ça ne fonctionne pas** : Vérifier `/src/app/components/ModuleLinearPage.tsx` → `handleCompleteStep()` → `incrementStudyTime()`

---

### ✅ 3. Progression du Module

**Test** : Module → Compléter plusieurs étapes

- [ ] Dashboard initial : Module semaine 1 à 0%
- [ ] J'entre dans le Module semaine 1 (5 étapes)
- [ ] Je complète l'étape 1 → Progression : 20% (1/5)
- [ ] Je complète l'étape 2 → Progression : 40% (2/5)
- [ ] Je complète l'étape 3 → Progression : 60% (3/5)
- [ ] La barre de progression s'anime à chaque fois

**Si ça ne fonctionne pas** : Vérifier `handleCompleteStep()` → `updateModuleProgress()`

---

### ✅ 4. Modules Terminés

**Test** : Module → Terminer toutes les étapes

- [ ] Dashboard initial : "Modules terminés : 0/4"
- [ ] Je complète les 5 étapes du Module semaine 1
- [ ] Dashboard mis à jour : "Modules terminés : 1/4"
- [ ] Sur Mon Parcours, Module 1 a un badge vert "Completed"

**Si ça ne fonctionne pas** : Vérifier `handleCompleteStep()` → `completeModule()`

---

### ✅ 5. Débloquage Automatique

**Test** : Module → Terminer le module 1

- [ ] Mon Parcours initial : Module 2 avec icône 🔒 (verrouillé)
- [ ] Je termine toutes les étapes du Module 1
- [ ] Je retourne sur Mon Parcours
- [ ] Module 2 a maintenant un badge bleu "Disponible" ⭐
- [ ] Je peux cliquer sur le Module 2

**Si ça ne fonctionne pas** : Vérifier `completeModule()` dans `/src/context/UserDataContext.tsx` lignes 177-214

---

### ✅ 6. Série de Jours

**Test** : Première activité de la journée

- [ ] Dashboard initial : "Série en cours : 0 jour"
- [ ] Je démarre le Module semaine 1
- [ ] Dashboard mis à jour : "Série en cours : 1 jour"
- [ ] (Le lendemain) Je reviens et fais une action
- [ ] Dashboard mis à jour : "Série en cours : 2 jours"

**Si ça ne fonctionne pas** : Vérifier `startModule()` → `updateStreak()` dans `/src/context/UserDataContext.tsx`

---

### ✅ 7. Synchronisation Dashboard ↔ Mon Parcours

**Test** : Vérifier que les deux pages affichent les mêmes données

Dashboard | Mon Parcours | Valeur
----------|--------------|-------
Modules terminés | Nombre de badges verts | Identique
Progression globale | Barre de progression | Identique
Temps d'étude | Affichage "Temps d'étude" | Identique
Série | Affichage "Série" | Identique

- [ ] Toutes les valeurs sont identiques entre les deux pages
- [ ] Si je fais une action, les deux pages se mettent à jour

---

### ✅ 8. Progression Globale

**Test** : Terminer plusieurs modules

Modules terminés | Progression globale attendue
-----------------|----------------------------
0/4 | 0%
1/4 | 25%
2/4 | 50%
3/4 | 75%
4/4 | 100%

- [ ] La progression globale correspond au calcul ci-dessus

---

## 🔍 Vérification Technique (Développeurs)

### Code Source

- [ ] `/src/app/App.tsx` ligne 140 : `<UserDataProvider initialData={initialUserData}>`
- [ ] `/src/app/components/ModuleLinearPage.tsx` importe `useUserData`
- [ ] `handleCompleteStep()` appelle bien `incrementStudyTime()`, `updateModuleProgress()`, `completeModule()`
- [ ] Tous les TODOs dans `/src/context/UserDataContext.tsx` sont marqués pour Supabase

### Fichiers de Documentation

- [ ] `/TRACKING_TEMPS_REEL.md` existe et documente le système
- [ ] `/GUIDE_EXPORT_VERCEL.md` existe avec le guide de déploiement
- [ ] `/CHANGELOG_TRACKING.md` existe avec les modifications
- [ ] `/README.md` a la section "🚀 NOUVEAUTÉ : Tracking en Temps Réel"

---

## 🐛 Résolution de Problèmes

### Le prénom ne s'affiche pas

**Symptôme** : Dashboard affiche "Bienvenue, Candidat" au lieu de "Bienvenue, Marie"

**Solutions** :
1. Vérifier que l'onboarding a bien été complété
2. Vérifier `/src/app/App.tsx` ligne 71-87 : `initialUserData` est bien créé
3. Vérifier ligne 140 : `initialData={initialUserData}` est bien passé
4. Recharger la page (F5)

---

### Les statistiques ne se mettent pas à jour

**Symptôme** : Après avoir complété une étape, le Dashboard n'évolue pas

**Solutions** :
1. Ouvrir la console (F12) → Onglet Console
2. Vérifier qu'il n'y a pas d'erreurs JavaScript
3. Vérifier `/src/app/components/ModuleLinearPage.tsx` → `handleCompleteStep()` est bien appelé
4. Vérifier que `useUserData()` est bien importé

**Code à vérifier** :
```typescript
// Dans ModuleLinearPage.tsx
const {
  modules,
  startModule,
  updateModuleProgress,
  completeModule,
  incrementStudyTime,
  updateStreak
} = useUserData(); // ← Doit être présent
```

---

### Le module suivant ne se débloque pas

**Symptôme** : Après avoir terminé le Module 1, le Module 2 reste verrouillé

**Solutions** :
1. Vérifier que TOUTES les étapes du Module 1 sont complétées (5/5)
2. Vérifier la fonction `completeModule()` dans `/src/context/UserDataContext.tsx` lignes 177-214
3. Regarder dans la console si une erreur s'affiche

**Code attendu** :
```typescript
// Dans completeModule()
// Débloquer le module suivant
if (moduleIndex + 1 < updatedModules.length) {
  if (updatedModules[moduleIndex + 1]?.status === 'locked') {
    updatedModules[moduleIndex + 1] = {
      ...updatedModules[moduleIndex + 1],
      status: 'available' as ModuleStatus
    };
  }
}
```

---

### La progression ne s'enregistre pas

**Symptôme** : Si je recharge la page, toutes mes données disparaissent

**Explication** : C'est **normal** ! L'application utilise actuellement un état local (mémoire).

**Solution pour la persistance** :
1. Suivre le guide `/GUIDE_EXPORT_VERCEL.md`
2. Configurer Supabase
3. Remplacer les TODOs par de vrais appels Supabase

Après intégration Supabase, les données seront sauvegardées en base de données.

---

## 📊 Résultats Attendus

Après avoir suivi cette checklist, vous devriez avoir :

✅ Une application qui affiche le prénom de l'utilisateur  
✅ Un tracking en temps réel de toutes les actions  
✅ Une synchronisation parfaite entre toutes les pages  
✅ Un débloquage automatique des modules  
✅ Des statistiques qui évoluent à chaque action  
✅ Une progression globale calculée correctement  
✅ Un système prêt pour Supabase

---

## 📞 Besoin d'Aide ?

Si après avoir suivi cette checklist, quelque chose ne fonctionne toujours pas :

1. **Consulter la documentation** :
   - [`/TRACKING_TEMPS_REEL.md`](/TRACKING_TEMPS_REEL.md) - Documentation technique complète
   - [`/CHANGELOG_TRACKING.md`](/CHANGELOG_TRACKING.md) - Liste des modifications

2. **Vérifier les logs** :
   - Console navigateur (F12 → Console)
   - Rechercher les erreurs en rouge

3. **Comparer avec les exemples** :
   - Ouvrir `/src/app/components/ModuleLinearPage.tsx`
   - Vérifier que le code correspond aux exemples de la documentation

---

**Date de création** : 28 janvier 2026  
**Version de l'application** : 2.1.0
