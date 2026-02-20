# 🧪 Guide de test - Plateforme TBEE

## Comment tester la plateforme

### 🚀 Démarrage rapide

1. **Accéder à la plateforme**
   - La plateforme s'ouvre sur la landing page
   - Navigation : Landing → Login/Signup → Dashboard

2. **Se connecter**
   - Cliquez sur "Se connecter" ou "S'inscrire"

---

## 👨‍🎓 Tester l'espace ÉTUDIANT

### Connexion étudiant
**Email** : `etudiant@exemple.fr` (ou n'importe quel email SANS "admin")  
**Mot de passe** : N'importe lequel (mock)

### Parcours de test étudiant

#### 1. Tableau de bord
- ✅ Vérifier l'affichage de la progression (45%)
- ✅ Consulter les 4 stats (modules, temps, série, objectif)
- ✅ Voir les 3 modules en cours
- ✅ Consulter les réussites récentes
- ✅ Cliquer sur "Actions rapides"

#### 2. Mes modules
- ✅ Cliquer sur "Mes modules" dans la sidebar
- ✅ Voir la liste des 6 modules
- ✅ Cliquer sur un module pour voir le détail

#### 3. Détail d'un module
- ✅ Voir les chapitres et vidéos
- ✅ Cliquer sur une vidéo
- ✅ Vérifier le lecteur vidéo (YouTube embed)
- ✅ Naviguer entre les vidéos

#### 4. Mon CV
- ✅ Cliquer sur "Mon CV" dans la sidebar
- ✅ Drag & drop un fichier PDF
- ✅ Voir le feedback automatique avec score
- ✅ Consulter la liste des CV uploadés

#### 5. Cas pratiques
- ✅ Cliquer sur "Cas pratiques" dans la sidebar
- ✅ Voir les 5 cas disponibles
- ✅ Sélectionner un cas
- ✅ Remplir la réponse
- ✅ Soumettre et voir le score

#### 6. Mon profil ⭐ NOUVEAU
- ✅ Cliquer sur "Mon profil" dans la sidebar
- ✅ **Onglet Informations personnelles** :
  - Voir les infos pré-remplies
  - Cliquer sur "Modifier le profil"
  - Éditer le prénom, nom, email, téléphone
  - Modifier l'adresse
  - Changer la formation
  - Cocher/décocher RQTH
  - Cliquer sur "Enregistrer"
- ✅ **Onglet Confidentialité** :
  - Voir les champs mot de passe
  - Bouton "Télécharger mes données"
  - Section "Zone dangereuse"
- ✅ **Onglet Notifications** :
  - Activer/désactiver les 4 types de notifications
  - Voir les toggles animés
  - Enregistrer les préférences

#### 7. Tests responsive
- ✅ Ouvrir sur mobile (390px)
- ✅ Cliquer sur le menu hamburger (haut gauche)
- ✅ Naviguer dans le menu
- ✅ Vérifier que le menu se ferme après navigation
- ✅ Tester sur tablet (768px)
- ✅ Tester sur desktop (1440px)

---

## 👨‍💼 Tester l'espace ADMIN

### Connexion admin
**Email** : `admin@tbee.fr` (ou n'importe quel email AVEC "admin")  
**Mot de passe** : N'importe lequel (mock)

### Parcours de test admin

#### 1. Vue d'ensemble
- ✅ Voir les 4 stats (248 users, 186 actifs, 67% complétion, 54% progression)
- ✅ Consulter le tableau des étudiants récents
- ✅ Vérifier les barres de progression
- ✅ Voir la performance des modules
- ✅ Consulter les alertes

#### 2. Gestion des utilisateurs
- ✅ Cliquer sur "Gestion des utilisateurs" dans la sidebar
- ✅ Voir la liste des 6 utilisateurs
- ✅ Utiliser la recherche
- ✅ Filtrer par statut (Actif, À risque, Inactif)
- ✅ Voir les détails de chaque utilisateur
- ✅ Cliquer sur "Modifier" ou "Suivi"

#### 3. Suivi personnalisé
- ✅ Cliquer sur "Suivi personnalisé" dans la sidebar
- ✅ Voir le profil complet de Jean Dupont
- ✅ Consulter les 4 stats (temps, modules, cas pratiques, activité)
- ✅ Voir la progression des 6 modules
- ✅ Consulter l'activité récente
- ✅ Lire les notes d'accompagnement
- ✅ Ajouter une nouvelle note
- ✅ Tester les actions rapides (RDV, message, export)

#### 4. Paramètres ⭐ NOUVEAU
- ✅ Cliquer sur "Paramètres" dans la sidebar
- ✅ Voir le header avec statut système (3 cards)

##### Onglet Général
- ✅ Voir la configuration plateforme (4 champs)
- ✅ Activer/désactiver le mode maintenance
- ✅ Voir les toggles de notifications

##### Onglet Utilisateurs
- ✅ Voir les 2 rôles (Admin et Étudiant)
- ✅ Consulter les permissions de chaque rôle
- ✅ Voir les actions rapides (4 boutons)

##### Onglet Modules
- ✅ Voir la liste des 6 modules
- ✅ Consulter les statuts (Publié/Brouillon)
- ✅ Voir les stats (utilisateurs, complétion)
- ✅ Boutons Modifier/Publier

##### Onglet Debug 🛠️
- ✅ **Mode débogage** :
  - Activer le toggle
  - Voir la console de logs apparaître
  - Vérifier les couleurs (vert, bleu, jaune)
- ✅ **Clés API** :
  - Cliquer sur l'icône œil pour afficher/masquer
  - Voir la clé "sk_live_51KPxY2..."
  - Lire l'avertissement de sécurité
- ✅ **Logs d'erreurs** :
  - Voir la console style terminal
  - Vérifier les 7 lignes de logs
  - Observer les couleurs (rouge, jaune, bleu, vert)
  - Bouton "Télécharger"
- ✅ **Monitoring** :
  - Voir CPU 32%, RAM 68%, Disque 42%, Réseau 15 MB/s

##### Onglet Système 💾
- ✅ **Base de données** :
  - Voir taille 2.3 GB
  - Dernière sauvegarde : 2h
  - 4 boutons d'actions
- ✅ **Informations serveur** :
  - Voir Node.js v20.10.0
  - React 18.2.0
  - Ubuntu 22.04 LTS
  - AWS EC2
- ✅ **Gestion du cache** :
  - Voir les 4 boutons de vidage
- ✅ **Zone dangereuse** :
  - Card rouge avec 3 actions
  - Vérifier le style d'avertissement

#### 5. Tests responsive
- ✅ Ouvrir sur mobile (390px)
- ✅ Utiliser le menu hamburger
- ✅ Vérifier les tableaux responsive
- ✅ Tester les tabs avec scroll horizontal
- ✅ Tester sur tablet et desktop

---

## 📱 Tests RESPONSIVE spécifiques

### Sur mobile (390px)
1. **Sidebar**
   - ✅ Bouton hamburger visible en haut à gauche
   - ✅ Clic ouvre la sidebar en overlay
   - ✅ Overlay sombre cliquable
   - ✅ Fermeture automatique après navigation

2. **Tableaux**
   - ✅ Colonnes cachées sur petits écrans
   - ✅ Scroll horizontal si nécessaire
   - ✅ Actions visibles et utilisables

3. **Grids**
   - ✅ Passage en 1 colonne
   - ✅ Cards empilées verticalement
   - ✅ Lisibilité préservée

4. **Formulaires**
   - ✅ Inputs full-width
   - ✅ Boutons full-width
   - ✅ Padding réduits

### Sur tablet (768px)
- ✅ Grids en 2 colonnes
- ✅ Sidebar toujours en hamburger
- ✅ Tableaux avec plus de colonnes visibles

### Sur desktop (1440px)
- ✅ Sidebar toujours visible (fixed)
- ✅ Contenu décalé de 288px
- ✅ Grids en 4 colonnes
- ✅ Toutes les colonnes de tableaux visibles
- ✅ Espacements complets

---

## ♿ Tests ACCESSIBILITÉ

### Navigation clavier
1. ✅ Tab pour naviguer entre les éléments
2. ✅ Enter/Space pour activer les boutons
3. ✅ Focus visible sur tous les éléments interactifs
4. ✅ Ring de focus (2px jaune) bien visible

### Contraste
- ✅ Texte noir (#1E1548) sur fond blanc : 4.5:1 ✓
- ✅ Texte sur jaune (#FFD600) : 4.5:1 ✓
- ✅ Texte gris (#6B7280) sur blanc : 4.5:1 ✓

### Zones cliquables
- ✅ Tous les boutons minimum 48x48px
- ✅ Touch targets confortables
- ✅ Espacement suffisant entre éléments

### Screen readers
- ✅ Labels ARIA sur boutons d'actions
- ✅ Alt text sur images (si présentes)
- ✅ Structure sémantique (h1, h2, h3, h4)

---

## 🔄 Tests de NAVIGATION

### Flow étudiant complet
1. Landing → Login (email sans "admin")
2. Dashboard → Voir stats et progression
3. Modules → Sélectionner un module
4. Module détail → Regarder une vidéo
5. CV → Upload un PDF
6. Cas pratiques → Faire un exercice
7. Profil → Modifier ses informations
8. Déconnexion → Retour landing

### Flow admin complet
1. Landing → Login (email avec "admin")
2. Dashboard → Consulter stats globales
3. Utilisateurs → Rechercher et filtrer
4. Suivi → Voir détail d'un étudiant
5. Paramètres → Activer mode debug
6. Paramètres → Consulter les logs
7. Paramètres → Voir infos système
8. Déconnexion → Retour landing

---

## 🐛 Checklist de non-régression

### À vérifier après chaque changement
- [ ] Pas d'erreurs dans la console
- [ ] Toutes les pages se chargent
- [ ] Navigation fluide sans freeze
- [ ] Responsive fonctionne sur toutes tailles
- [ ] Sidebar mobile ouvre/ferme correctement
- [ ] Tabs changent bien
- [ ] Toggles fonctionnent
- [ ] Formulaires peuvent être remplis
- [ ] Boutons réagissent au clic
- [ ] Hover states visibles
- [ ] Focus visible
- [ ] Scroll fluide
- [ ] Pas de texte coupé
- [ ] Images/icons chargent bien

---

## 📊 Métriques de performance

### Temps de chargement attendus
- Landing page : < 1s
- Dashboard : < 1s
- Navigation entre pages : < 300ms
- Ouverture sidebar mobile : 300ms (transition)

### Taille des bundles (estimée)
- Chunks JS : ~500KB (gzipped)
- CSS : ~50KB (gzipped)
- Fonts : ~100KB (Poppins)

---

## ✅ Critères de validation finale

### Fonctionnalité
- [x] Toutes les pages accessibles
- [x] Toutes les fonctionnalités opérationnelles
- [x] Navigation fluide
- [x] Mock data cohérente

### Design
- [x] Design system respecté
- [x] Couleurs cohérentes
- [x] Espacement harmonieux
- [x] Police Poppins partout

### Responsive
- [x] Mobile 390px OK
- [x] Tablet 768px OK
- [x] Desktop 1440px OK
- [x] Sidebar mobile OK

### Accessibilité
- [x] Contraste 4.5:1 minimum
- [x] Focus visible
- [x] Navigation clavier
- [x] Labels ARIA

### Performance
- [x] Pas de lag
- [x] Transitions fluides
- [x] Pas de freeze

---

## 🎯 Scénarios de test prioritaires

### 1. Nouveau étudiant
- Se connecte pour la première fois
- Explore le dashboard
- Commence un module
- Upload son CV
- Complète son profil

### 2. Admin qui suit un étudiant
- Se connecte
- Cherche un étudiant
- Consulte sa progression
- Ajoute une note
- Active le mode debug

### 3. Étudiant qui progresse
- Se connecte
- Continue un module en cours
- Complète une vidéo
- Fait un cas pratique
- Vérifie sa progression

---

**Bon test ! 🚀**
