// ============================================
// ÉTAT INITIAL POUR NOUVEL UTILISATEUR
// ============================================
// Cet état représente un utilisateur qui vient de s'inscrire
// et n'a encore rien complété sur la plateforme

import type {
  UserProfile,
  UserStatistics,
  ModuleWithProgress,
  CVData,
  UserTrackedOffer
} from '../types';

// -------------------- USER PROFILE --------------------

export const initialUserProfile: Partial<UserProfile> = {
  role: 'student',

  // Onboarding Step 1 - vide jusqu'à complétion
  firstName: null,
  lastName: null,
  phone: null,
  birthDate: null,
  hasRQTH: false,

  // Onboarding Step 2 - vide jusqu'à complétion
  currentLevel: null,
  targetLevel: null,
  fieldOfInterest: null,
  city: null,
  postalCode: null,
  mobilityRadius: null,

  // Status - nouvel utilisateur
  onboardingCompleted: false,
  onboardingStep: 1,
  isActive: true,
};

// -------------------- USER STATISTICS --------------------

export const initialUserStatistics: Omit<UserStatistics, 'id' | 'userId'> = {
  // Progression globale - tout à zéro
  totalLessonsCompleted: 0,
  totalLessonsValidated: 0,
  currentWeek: 1, // Démarre à la semaine 1
  currentStreakDays: 0,
  longestStreakDays: 0,

  // Activité - aucune pour le moment
  lastActivityDate: null,
  totalTimeSpentMinutes: 0,

  // Offres - aucune candidature
  totalApplications: 0,
  totalInterviews: 0,

  updatedAt: new Date().toISOString(),
};

// -------------------- MODULES --------------------
// Structure des 4 modules du parcours TBEE
// Module 1 disponible par défaut, les autres verrouillés

export const initialModules: ModuleWithProgress[] = [
  {
    id: 'module-week1',
    weekNumber: 1,
    title: 'Identifier mon projet',
    description: 'Définis ton projet professionnel et tes objectifs d\'alternance',
    iconName: 'Target',
    colorAccent: '#FFD600',
    orderIndex: 1,
    isPublished: true,
    unlockCondition: 'none',
    status: 'available', // ✅ Disponible dès le début
    progress: 0,
    xp: 0,
    completedSteps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'module-week2',
    weekNumber: 2,
    title: 'Construire mon CV',
    description: 'Crée un CV professionnel et attractif adapté à l\'alternance',
    iconName: 'FileText',
    colorAccent: '#1E1548',
    orderIndex: 2,
    isPublished: true,
    unlockCondition: 'previous_completed',
    status: 'locked', // 🔒 Verrouillé jusqu'à complétion du module 1
    progress: 0,
    xp: 0,
    completedSteps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'module-week3',
    weekNumber: 3,
    title: 'Rechercher mon entreprise',
    description: 'Apprends à chercher et cibler les bonnes entreprises',
    iconName: 'Search',
    colorAccent: '#E8ECFF',
    orderIndex: 3,
    isPublished: true,
    unlockCondition: 'previous_completed',
    status: 'locked', // 🔒 Verrouillé jusqu'à complétion du module 2
    progress: 0,
    xp: 0,
    completedSteps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'module-week4',
    weekNumber: 4,
    title: 'Réussir mon entretien',
    description: 'Maîtrise les techniques d\'entretien et décroche ton contrat',
    iconName: 'Briefcase',
    colorAccent: '#10B981',
    orderIndex: 4,
    isPublished: true,
    unlockCondition: 'previous_completed',
    status: 'locked', // 🔒 Verrouillé jusqu'à complétion du module 3
    progress: 0,
    xp: 0,
    completedSteps: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// -------------------- CV --------------------

export const initialCVData: Omit<CVData, 'id' | 'userId'> = {
  fileName: null,
  fileUrl: null,
  status: 'not_uploaded',
  adminFeedback: null,
  uploadedAt: null,
  updatedAt: new Date().toISOString(),
};

// -------------------- TRACKED OFFERS --------------------

export const initialTrackedOffers: UserTrackedOffer[] = [];

// Maximum d'offres que l'utilisateur peut suivre
export const MAX_TRACKED_OFFERS = 15;

// -------------------- DASHBOARD DATA --------------------
// État complet du dashboard pour un nouvel utilisateur

export interface DashboardData {
  userProfile: Partial<UserProfile>;
  statistics: Omit<UserStatistics, 'id' | 'userId'>;
  modules: ModuleWithProgress[];
  trackedOffers: UserTrackedOffer[];
  cvData: Omit<CVData, 'id' | 'userId'>;
}

export const initialDashboardData: DashboardData = {
  userProfile: initialUserProfile,
  statistics: initialUserStatistics,
  modules: initialModules,
  trackedOffers: initialTrackedOffers,
  cvData: initialCVData,
};

// -------------------- HELPER FUNCTIONS --------------------

/**
 * Calcule la progression globale de l'utilisateur
 * @param modules - Liste des modules avec progression
 * @returns Pourcentage de progression globale (0-100)
 */
export function calculateGlobalProgress(modules: ModuleWithProgress[]): number {
  if (modules.length === 0) return 0;

  const totalProgress = modules.reduce((sum, module) => sum + module.progress, 0);
  return Math.round(totalProgress / modules.length);
}

/**
 * Compte le nombre de modules terminés
 * @param modules - Liste des modules avec progression
 * @returns Nombre de modules terminés
 */
export function countCompletedModules(modules: ModuleWithProgress[]): number {
  return modules.filter(m => m.status === 'completed').length;
}

/**
 * Formate le temps d'étude en heures et minutes
 * @param totalMinutes - Nombre total de minutes
 * @returns String formaté (ex: "2h 30min" ou "45min")
 */
export function formatStudyTime(totalMinutes: number): string {
  if (totalMinutes === 0) return '0min';

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) {
    return `${minutes}min`;
  }

  if (minutes === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${minutes}min`;
}

/**
 * Obtient le module actuellement en cours ou le prochain disponible
 * @param modules - Liste des modules avec progression
 * @returns Module en cours ou null si aucun
 */
export function getCurrentModule(modules: ModuleWithProgress[]): ModuleWithProgress | null {
  // D'abord chercher un module en cours
  const inProgress = modules.find(m => m.status === 'in_progress');
  if (inProgress) return inProgress;

  // Sinon retourner le premier module disponible
  const available = modules.find(m => m.status === 'available');
  if (available) return available;

  return null;
}

/**
 * Vérifie si l'utilisateur est nouveau (aucune progression)
 * @param statistics - Statistiques de l'utilisateur
 * @returns true si l'utilisateur est nouveau
 */
export function isNewUser(statistics: UserStatistics | Omit<UserStatistics, 'id' | 'userId'>): boolean {
  return statistics.totalLessonsCompleted === 0 &&
    statistics.totalTimeSpentMinutes === 0;
}
