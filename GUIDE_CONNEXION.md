# 🔐 Guide de Connexion - Plateforme TBEE

## 📋 Système de Connexion avec Onglets

La plateforme TBEE dispose de **deux espaces distincts** avec des interfaces et permissions différentes :

---

## 👨‍🎓 **ESPACE CANDIDAT**

### Accès
1. Aller sur la page de connexion
2. Sélectionner l'onglet **"Candidat"**
3. Entrer vos identifiants candidat
4. Cliquer sur "Se connecter"

### Que se passe-t-il après la connexion ?

#### Si c'est votre **première connexion** :
- ✅ Vous serez redirigé vers l'**onboarding en 2 étapes**
  - **Étape 1** : Choix de la formation
  - **Étape 2** : Évaluation initiale des compétences
- ✅ Une fois complété, accès au dashboard candidat

#### Si vous avez **déjà complété l'onboarding** :
- ✅ Accès direct au **Dashboard Candidat**

### Interface Candidat - Pages disponibles :
- 📊 **Tableau de bord** : Vue d'ensemble, progression, stats XP
- 🎓 **Mon parcours** : Visualisation gamifiée des 6 semaines
- 🔍 **Suivi des offres** : Maximum 15 offres avec support admin
- 📄 **Mon CV** : Upload et validation par admin
- 💼 **Cas pratiques** : Exercices à compléter
- 👤 **Mon profil** : Informations personnelles

### Fonctionnalités Candidat :
- ✅ Progression linéaire par module (semaine par semaine)
- ✅ Validation humaine non-bloquante (CV/LinkedIn)
- ✅ Support admin sur demande pour les offres
- ✅ Système de points XP et gamification
- ✅ Cas pratiques avec feedback personnalisé

---

## 👨‍💼 **ESPACE ADMINISTRATEUR**

### Accès
1. Aller sur la page de connexion
2. Sélectionner l'onglet **"Admin"**
3. Entrer vos identifiants admin
4. Cliquer sur "Se connecter"

### Que se passe-t-il après la connexion ?
- ✅ Accès **direct au Dashboard Administrateur**
- ✅ Pas d'onboarding (réservé aux candidats uniquement)

### Interface Admin - Pages disponibles :
- 📊 **Vue d'ensemble** : Dashboard avec statistiques globales
- ✅ **Validation CVs** : Noter, analyser, valider les CVs des étudiants
- ✏️ **Correction exercices** : Corriger les cas pratiques avec feedback
- 💬 **Support offres** : Aider les étudiants sur leur recherche d'alternance
- 👥 **Suivi étudiants** : Tableau de bord de tous les candidats
- ⚙️ **Mon profil** : Informations personnelles et statistiques admin
- 🔧 **Paramètres** : Configuration de la plateforme

### Fonctionnalités Admin :
- ✅ **Validation de CVs** : Système de notation 0-100 avec feedback personnalisé
- ✅ **Correction d'exercices** : Notation + feedback constructif pour chaque cas pratique
- ✅ **Support au suivi des offres** : Répondre aux demandes d'aide des candidats
- ✅ **Suivi personnalisé** : Vue complète sur la progression de chaque étudiant
- ✅ **Alertes automatiques** : Étudiants inactifs, tâches urgentes
- ✅ **Statistiques en temps réel** : Taux de complétion, engagement, performance

---

## 🎨 **Différences Visuelles**

### Espace Candidat
- **Couleur dominante** : Jaune #FFD600 (couleur primaire TBEE)
- **Ambiance** : Gamifiée, encourageante, parcours visuel
- **Navigation** : 
  - Tableau de bord
  - Mon parcours
  - Suivi des offres
  - Mon CV
  - Cas pratiques
  - Mon profil

### Espace Admin
- **Couleur dominante** : Bleu foncé #1E1548 + Jaune #FFD600
- **Ambiance** : Professionnelle, tableaux de bord, gestion
- **Navigation** :
  - Vue d'ensemble
  - Validation CVs
  - Correction exercices
  - Support offres
  - Suivi étudiants
  - Mon profil
  - Paramètres

---

## 🔑 **Test de Connexion** (Mode Développement)

### Pour tester l'espace **Candidat** :
```
Email : n'importe quel email (ex: jean.dupont@exemple.fr)
Mot de passe : n'importe lequel
Onglet : CANDIDAT
```

### Pour tester l'espace **Admin** :
```
Email : n'importe quel email (ex: admin@tbee.fr)
Mot de passe : n'importe lequel
Onglet : ADMIN
```

> **Note** : En production, un vrai système d'authentification vérifiera les identifiants et les permissions.

---

## 🚀 **Workflow Complet**

### Candidat
```
Landing → Connexion (Onglet Candidat) → Onboarding (1ère fois) → Dashboard Candidat → Modules
```

### Admin
```
Landing → Connexion (Onglet Admin) → Dashboard Admin → Validation/Correction/Support
```

---

## 🔒 **Sécurité et Permissions**

### Candidat :
- ✅ Accès uniquement à ses propres données
- ✅ Vue de son propre parcours
- ✅ Soumission de CV et exercices
- ✅ Demande d'aide sur les offres
- ❌ Pas d'accès aux données des autres candidats
- ❌ Pas d'accès aux outils admin

### Admin :
- ✅ Accès à tous les candidats de la plateforme
- ✅ Validation et notation des CVs
- ✅ Correction et notation des exercices
- ✅ Support personnalisé aux candidats
- ✅ Statistiques globales de la plateforme
- ✅ Gestion des utilisateurs (si permissions)
- ❌ Pas d'accès à l'espace candidat
- ❌ Pas de parcours modules (réservé candidats)

---

## 📱 **Responsive**

- ✅ **Mobile** : 390px - Interface optimisée tactile
- ✅ **Tablet** : 768px - Grilles adaptatives
- ✅ **Desktop** : 1440px - Interface complète

Les deux espaces (candidat et admin) sont **100% responsive** et s'adaptent à tous les écrans.

---

## 🎯 **Points Clés**

1. **Système d'onglets** sur connexion/inscription pour différencier candidat et admin
2. **Interfaces complètement séparées** avec navigation et fonctionnalités propres
3. **Permissions distinctes** selon le rôle
4. **Design cohérent** avec la DA TBEE stricte (Poppins, couleurs, espacements 8pt)
5. **Parcours utilisateur optimisé** selon le profil

---

**Plateforme TBEE** - Accompagnement vers l'alternance avec focus RQTH 🚀
