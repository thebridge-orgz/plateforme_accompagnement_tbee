# Plateforme TBEE - Guide de Navigation

## 🎯 Vue d'ensemble

La plateforme TBEE est maintenant complète avec deux espaces distincts : un **espace étudiant** pour l'accompagnement vers l'alternance et un **espace administrateur** pour le suivi et la gestion.

## 🔐 Connexion

### Pour tester l'espace étudiant :
- Se connecter avec n'importe quel email (ex: `etudiant@exemple.fr`)
- Mot de passe : n'importe quel mot de passe

### Pour tester l'espace administrateur :
- Se connecter avec un email contenant "admin" (ex: `admin@tbee.fr`)
- Mot de passe : n'importe quel mot de passe

## 👨‍🎓 Espace Étudiant

### Dashboard Principal (`student-dashboard`)
- Vue d'ensemble de la progression
- Stats personnelles (modules terminés, temps d'étude, série en cours)
- Modules en cours avec progression
- Réussites récentes
- Actions rapides

### Tous les Modules (`student-modules`)
- Liste complète des 6 modules organisés par chapitres :
  1. **Comprendre l'alternance** (Bases de l'alternance) ✅ Terminé
  2. **Rédiger son CV** (Candidature) 🔄 En cours
  3. **Préparer son entretien** (Candidature) 🔄 En cours
  4. **Rechercher son entreprise** (Recherche d'entreprise) 📖 Disponible
  5. **Postuler efficacement** (Recherche d'entreprise) 🔒 Verrouillé
  6. **Réussir son intégration** (Intégration) 🔒 Verrouillé
- Progression globale avec statistiques

### Détail d'un Module (`module-detail-1`)
- Lecteur vidéo (prototype)
- Liste des vidéos du module (8 vidéos pour le module CV)
- Marquage des vidéos comme terminées
- Ressources téléchargeables (modèles, checklists)
- Progression du module

### Upload de CV (`student-cv`)
- Zone de téléchargement par drag & drop
- Liste des CV téléchargés
- Analyse automatique du CV avec :
  - Note sur 10
  - Points forts identifiés
  - Points à améliorer
- Conseils pour un bon CV
- Accès aux modèles professionnels

### Cas Pratiques (`student-practical`)
- 5 cas pratiques avec niveaux de difficulté :
  1. **Simulation d'entretien téléphonique** (Débutant) ✅ Terminé - Score: 85%
  2. **Répondre à une offre d'alternance** (Intermédiaire) 🔄 En cours
  3. **Présentation de son parcours en 3 minutes** (Intermédiaire) 📖 Disponible
  4. **Négociation de salaire** (Avancé) 🔒 Verrouillé
  5. **Questions techniques en entretien** (Avancé) 🔒 Verrouillé
- Système de points (50-100 points par cas)
- Suivi du score moyen
- Instructions détaillées pour chaque cas

## 👨‍💼 Espace Administrateur

### Dashboard Admin (`admin-dashboard`)
- Statistiques globales :
  - 248 utilisateurs totaux (+12% vs mois dernier)
  - 186 utilisateurs actifs
  - 67% taux de complétion
  - 54% progression moyenne
- Tableau des étudiants récents avec :
  - Nom et email
  - Progression en %
  - Dernière activité
  - Statut (Actif / À risque)
- Performance des modules
- Alertes pour les étudiants inactifs

### Gestion des Utilisateurs (`admin-users`)
- Liste complète des 6+ étudiants
- Filtres par :
  - Recherche par nom/email
  - Statut (Actif / À risque / Inactif)
- Informations affichées :
  - Coordonnées (email, téléphone)
  - Formation et niveau d'études
  - Mention RQTH si applicable
  - Progression en %
  - Date d'inscription
- Actions :
  - Modifier le profil
  - Voir le suivi détaillé
  - Créer un nouveau compte

### Suivi Personnalisé (`admin-tracking`)
- Profil complet de l'étudiant :
  - Informations personnelles
  - Formation et contact
  - Progression globale
- Statistiques détaillées :
  - Temps d'étude (12h 30min)
  - Modules terminés (3/6)
  - Cas pratiques réalisés (2)
  - Dernière activité
- Progression détaillée par module avec :
  - Statut (Terminé / En cours / Non démarré / Verrouillé)
  - Dernière activité sur chaque module
- Historique d'activité récente (5+ actions)
- Notes d'accompagnement :
  - Ajout de nouvelles notes
  - Historique des notes avec auteur et date
- Actions rapides :
  - Planifier un RDV
  - Envoyer un message
  - Exporter le rapport

## 🎨 Design System

Tous les composants respectent strictement les règles TBEE :

### Couleurs
- **Jaune primaire** : #FFD600
- **Bleu foncé** : #1E1548
- **Bleu clair** : #E8ECFF

### Typographie
- **Police exclusive** : Poppins
- Tailles : H1 (48px), H2 (32px), H3 (24px), H4 (20px), Body (16px), Small (14px)

### Composants
- **Boutons** : 48px de hauteur
- **Cards** : 16px de border-radius
- **Espacement** : Système 8pt (8px, 16px, 24px, 32px, 40px, 48px)

### Accessibilité
- Navigation au clavier
- Labels ARIA
- Contrastes respectés
- Focus visible

## 🧩 Composants Réutilisables

### Nouveaux composants créés
1. **ProgressBar** : Barre de progression avec label optionnel
2. **ModuleCard** : Card pour afficher un module avec progression
3. **VideoItem** : Item de vidéo avec statut (complété/non complété)
4. **FileUploader** : Zone d'upload de fichiers avec drag & drop
5. **DashboardSidebar** : Navigation latérale pour les dashboards
6. **StatCard** : Card statistique avec icône et tendance

## 📊 Données de Test

Toutes les pages utilisent des données mockées réalistes :
- 6 étudiants avec profils variés
- 6 modules avec progression différente
- 5 cas pratiques avec scores
- Historique d'activité détaillé
- Notes d'accompagnement

## 🚀 Navigation Rapide

### Pour tester le parcours étudiant complet :
1. Landing page → Cliquer "S'inscrire"
2. Remplir le formulaire → Créer le compte
3. Explorer le dashboard étudiant
4. Cliquer sur "Rédiger son CV" pour voir le détail d'un module
5. Accéder à "Mon CV" pour tester l'upload
6. Visiter "Cas pratiques" pour voir les exercices

### Pour tester l'interface admin :
1. Landing page → Cliquer "Se connecter"
2. Email : `admin@tbee.fr`
3. Explorer le dashboard admin
4. Cliquer sur "Voir tous les utilisateurs"
5. Cliquer sur "Voir détails" pour un étudiant
6. Tester l'ajout de notes d'accompagnement

## 📱 Responsive

- **Desktop** : 1440px (optimisé)
- **Mobile** : 390px (sidebar en overlay)
- Sidebar pliable sur mobile avec menu burger

## ✨ Fonctionnalités Clés

- ✅ Système de progression avec pourcentages
- ✅ Upload de fichiers (CV) avec feedback
- ✅ Cas pratiques avec système de points
- ✅ Notes d'accompagnement pour les admins
- ✅ Statistiques en temps réel
- ✅ Historique d'activité détaillé
- ✅ Système de déverrouillage progressif des modules
- ✅ Support RQTH avec confidentialité
- ✅ Navigation fluide entre toutes les pages

## 🔄 Améliorations Possibles

Le prototype est complet et fonctionnel. Voici quelques suggestions pour aller plus loin :

1. **Vidéos réelles** : Intégrer un vrai player vidéo (YouTube, Vimeo)
2. **Base de données** : Connecter à Supabase pour la persistance
3. **Notifications** : Système d'alertes pour les étudiants et admins
4. **Messagerie** : Chat en temps réel entre étudiants et accompagnateurs
5. **Calendrier** : Planification de RDV avec intégration Google Calendar
6. **Exports** : Génération de rapports PDF
7. **Gamification** : Badges, niveaux, classements
8. **Forum** : Espace communautaire entre étudiants

---

**Projet créé pour TBEE - Plateforme inclusive d'accompagnement vers l'alternance** 🎓✨
