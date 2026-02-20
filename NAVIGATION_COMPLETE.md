# TBEE Platform - Guide complet de navigation

## Vue d'ensemble
Plateforme TBEE (Plateforme inclusive d'accompagnement vers l'alternance) avec deux espaces complets :
- **Espace Étudiant** : Parcours de formation complet avec modules, CV, cas pratiques et profil personnel
- **Espace Administrateur** : Gestion complète avec dashboard, suivi personnalisé, paramètres système et outils de debug

---

## 🎓 ESPACE ÉTUDIANT

### Pages disponibles

#### 1. **Tableau de bord** (`student-dashboard`)
- Vue d'ensemble de la progression (45%)
- Statistiques personnelles (modules terminés, temps d'étude, série en cours)
- Modules en cours avec progression
- Réussites récentes
- Actions rapides (CV, cas pratiques, profil)

#### 2. **Mes modules** (`student-modules`)
- Liste complète des 6 modules de formation
- Organisation par chapitres
- Statuts : En cours, Terminé, Verrouillé
- Vidéos et durée par module

#### 3. **Détail d'un module** (`module-detail-1/2/3`)
- Liste des chapitres et vidéos
- Lecteur vidéo intégré
- Progression par chapitre
- Navigation entre les vidéos

#### 4. **Mon CV** (`student-cv`)
- Upload de CV (PDF uniquement, max 5MB)
- Feedback automatique avec score
- Liste des CV uploadés
- Téléchargement et suppression

#### 5. **Cas pratiques** (`student-practical`)
- 5 cas pratiques disponibles
- Thèmes : Entretien, Lettre motivation, CV, Recherche, Relance
- Système de scoring
- Historique des soumissions

#### 6. **Mon profil** ✨ NOUVEAU
- **Onglet "Informations personnelles"** :
  - Modification du profil complet (nom, prénom, email, téléphone, date de naissance)
  - Adresse complète (rue, ville, code postal)
  - Formation (établissement, programme, niveau d'études)
  - Reconnaissance RQTH avec informations confidentielles
  - Mode édition pour modifier les informations
  - Upload de photo de profil
  
- **Onglet "Confidentialité"** :
  - Modification du mot de passe
  - Téléchargement des données personnelles (RGPD)
  - Suppression du compte

- **Onglet "Notifications"** :
  - Préférences de notifications par email
  - Mises à jour des modules
  - Rapports de progression hebdomadaires
  - Conseils et astuces personnalisés

---

## 👨‍💼 ESPACE ADMINISTRATEUR

### Pages disponibles

#### 1. **Vue d'ensemble** (`admin-dashboard`)
- Statistiques globales (248 utilisateurs, 186 actifs, taux de complétion 67%)
- Tableau des étudiants récents avec progression
- Performance des modules
- Alertes (étudiants inactifs)
- Actions rapides (création compte, export données)

#### 2. **Gestion des utilisateurs** (`admin-users`)
- Liste complète de tous les étudiants (6+ utilisateurs)
- Recherche par nom/email
- Filtres par statut (Actif, À risque, Inactif)
- Informations détaillées :
  - Coordonnées (email, téléphone)
  - Formation et niveau
  - Progression avec barre visuelle
  - Statut RQTH
  - Date d'inscription
- Actions : Modifier, Suivi détaillé
- Création de nouveaux comptes

#### 3. **Suivi personnalisé** (`admin-tracking`)
- Vue détaillée d'un étudiant spécifique (Jean Dupont)
- Fiche complète :
  - Informations de formation
  - Coordonnées
  - Progression globale (45%)
- Statistiques détaillées :
  - Temps d'étude (12h 30min)
  - Modules terminés (3/6)
  - Cas pratiques (2)
  - Dernière activité (2h)
- Progression module par module avec statuts
- Activité récente (vidéos, CV, cas pratiques)
- **Notes d'accompagnement** :
  - Historique des notes
  - Ajout de nouvelles notes
- Actions rapides :
  - Planifier un RDV
  - Envoyer un message
  - Exporter le rapport
  - Contacter l'étudiant

#### 4. **Paramètres** ✨ NOUVEAU
Interface complète de paramétrage avec 5 onglets :

##### **Onglet "Général"**
- Configuration de la plateforme :
  - Nom de la plateforme
  - Email de support
  - Taille max upload (MB)
  - Timeout de session (minutes)
- Mode maintenance (activation/désactivation)
- Notifications système :
  - Alertes de sécurité
  - Rapports hebdomadaires

##### **Onglet "Utilisateurs"**
- Gestion des rôles :
  - **Administrateur** (2 utilisateurs)
    - Permissions : Gestion utilisateurs, modules, paramètres système, debug
  - **Étudiant** (248 utilisateurs)
    - Permissions : Modules, CV, cas pratiques, profil
- Actions rapides :
  - Créer un utilisateur
  - Import en masse (CSV)
  - Exporter la liste
  - Réinitialiser mots de passe

##### **Onglet "Modules"**
- Liste complète des 6 modules avec statuts :
  - **Publiés** (3) : CV, Entretien, Alternance
  - **Brouillons** (2) : Recherche entreprise, Postuler
- Pour chaque module :
  - Nombre d'utilisateurs
  - Taux de complétion
  - Actions : Modifier, Publier
- Création de nouveaux modules

##### **Onglet "Debug"** 🛠️
**Mode débogage** :
- Activation/désactivation du mode debug
- Affichage des logs en temps réel dans la console
- Informations système (version, environnement)

**Clés API** :
- Affichage/masquage de la clé API principale
- Renouvellement de clé
- Avertissement de sécurité

**Logs d'erreurs (24h)** :
- Console de logs en temps réel avec couleurs :
  - 🔴 ERROR (rouge) : Database timeout, Upload failed
  - 🟡 WARN (jaune) : High memory, Slow query
  - 🔵 INFO (bleu) : Backup completed, Maintenance
  - 🟢 SUCCESS (vert) : Systems operational
- Téléchargement des logs

**Monitoring des performances** :
- CPU : 32%
- RAM : 68%
- Disque : 42%
- Réseau : 15 MB/s

##### **Onglet "Système"** 💾
**Base de données** :
- Taille totale : 2.3 GB
- Dernière sauvegarde : Il y a 2 heures
- Actions :
  - Créer une sauvegarde
  - Restaurer une sauvegarde
  - Optimiser la base
  - Statistiques détaillées

**Informations serveur** :
- Version Node.js : v20.10.0
- Version React : 18.2.0
- Système d'exploitation : Ubuntu 22.04 LTS
- Hébergement : AWS EC2 - eu-west-3

**Gestion du cache** :
- Vider le cache des modules
- Vider le cache des médias
- Vider le cache utilisateurs
- Vider tout le cache

**Zone dangereuse** ⚠️ :
- Réinitialiser tous les mots de passe
- Supprimer tous les logs
- Réinitialiser la base de données
- Actions irréversibles avec confirmation

---

## 📱 RESPONSIVE DESIGN

### Breakpoints
- **Mobile** : 390px (design adapté)
- **Tablet** : 768px
- **Desktop** : 1440px

### Fonctionnalités responsive

#### Mobile (< 1024px)
- **Sidebar** : Menu hamburger en overlay
  - Bouton de toggle en haut à gauche (fixed)
  - Overlay sombre au clic
  - Fermeture automatique après navigation
  
- **Tableaux** : Colonnes masquées selon la taille
  - Colonnes essentielles toujours visibles
  - Scroll horizontal si nécessaire
  - Actions simplifiées

- **Grids** :
  - 1 colonne sur mobile
  - 2 colonnes sur tablet
  - 4 colonnes sur desktop

- **Padding réduits** :
  - p-4 sur mobile
  - p-6 sur tablet
  - p-8 sur desktop

- **Textes** :
  - Titres adaptés (h2 plus petits sur mobile)
  - Textes lisibles à toutes tailles

#### Desktop (≥ 1024px)
- Sidebar toujours visible (fixed left)
- Contenu décalé de 288px (lg:ml-72)
- Grids multi-colonnes
- Tous les détails visibles

---

## 🔐 NAVIGATION & CONNEXION

### Connexion simulée
- **Étudiant** : email sans "admin" → Espace étudiant
- **Admin** : email contenant "admin" → Espace admin

### Navigation
- Toutes les pages accessibles via la sidebar
- Scroll automatique en haut de page
- Déconnexion : retour à la landing page

### Pages publiques
- Landing page
- Page de connexion
- Page d'inscription

---

## 🎨 DESIGN SYSTEM

### Couleurs
- **Primary** : #FFD600 (Jaune)
- **Foreground** : #1E1548 (Bleu foncé)
- **Background** : #ffffff (Blanc)
- **Secondary** : #E8ECFF (Bleu clair)
- **Muted** : #F8F9FD (Gris clair)

### Composants
- **Boutons** : 48px height, radius 12px
- **Cards** : radius 16px, padding 24px
- **Inputs** : 48px height, radius 12px
- **Espacement** : Système 8pt (8, 16, 24, 32, 48, 64, 80)

### Police
- **Poppins** (Google Fonts) exclusivement
- Poids : 400, 500, 600, 700

---

## ✅ ACCESSIBILITÉ

- Contraste minimum 4.5:1
- Focus visible sur tous les éléments interactifs
- Zones cliquables minimum 48x48px
- Navigation clavier complète
- Labels ARIA sur les boutons d'actions
- Support RQTH avec UI respectueuse

---

## 🚀 FONCTIONNALITÉS TECHNIQUES

### Mock Data
- Tous les composants utilisent des données de démonstration
- Pas de backend requis pour le prototype
- Données réalistes pour testing UX

### État de l'application
- Gestion centralisée dans App.tsx
- Navigation par changement de page string
- Détection automatique du rôle (student/admin)
- Persistance du rôle pendant la session

### Performance
- Composants React optimisés
- Transitions fluides (300ms)
- Lazy loading non implémenté (pas nécessaire pour prototype)

---

## 📝 NOTES DE DÉVELOPPEMENT

### Prochaines étapes possibles
1. Intégration backend (API REST)
2. Authentification réelle (JWT)
3. Base de données (PostgreSQL/MongoDB)
4. Upload réel de fichiers (AWS S3)
5. Notifications en temps réel (WebSocket)
6. Analytics et tracking
7. Export PDF des rapports
8. Système de messagerie interne
9. Calendrier de RDV
10. Tests automatisés (Jest, Cypress)

### Structure des fichiers
```
/src/app/
  App.tsx (routeur principal)
  /components/
    # Composants réutilisables
    Button.tsx
    FormInput.tsx
    ProgressBar.tsx
    StatCard.tsx
    ModuleCard.tsx
    ...
    
    # Pages étudiants
    StudentDashboard.tsx
    StudentProfilePage.tsx ✨ NOUVEAU
    AllModulesPage.tsx
    ModuleDetailPage.tsx
    CVUploadPage.tsx
    PracticalCasePage.tsx
    
    # Pages admin
    AdminDashboard.tsx
    AdminSettingsPage.tsx ✨ NOUVEAU
    UserManagementPage.tsx
    StudentTrackingPage.tsx
    
    # Navigation
    DashboardSidebar.tsx
    Navbar.tsx
    Footer.tsx
```

---

## 🎯 CONCLUSION

La plateforme TBEE est maintenant complète avec :
- ✅ Espace étudiant entièrement fonctionnel avec profil complet
- ✅ Espace admin avec tous les outils de gestion et debug
- ✅ Design responsive (mobile 390px → desktop 1440px)
- ✅ Design system cohérent et accessible
- ✅ Navigation fluide et intuitive
- ✅ Prêt pour démo et tests utilisateurs

**Version** : 2.0  
**Dernière mise à jour** : Décembre 2024
