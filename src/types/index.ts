// ============================================
// TYPES POUR LA PLATEFORME TBEE
// ============================================
// Ces types correspondent à la structure de la base de données Supabase
// et sont utilisés dans toute l'application pour assurer la cohérence des données

// -------------------- USER --------------------

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  
  // Onboarding Step 1
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  birthDate: string | null; // ISO date string
  hasRQTH: boolean;
  
  // Onboarding Step 2
  currentLevel: string | null; // 'bac', 'bac+2', 'bac+3', etc.
  targetLevel: string | null;
  fieldOfInterest: string | null;
  city: string | null;
  postalCode: string | null;
  mobilityRadius: number | null; // en km
  
  // Status
  onboardingCompleted: boolean;
  onboardingStep: number; // 1 or 2
  isActive: boolean;
  
  // Timestamps
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

// -------------------- MODULES --------------------

export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Module {
  id: string;
  weekNumber: number; // 1 à 4
  title: string;
  description: string;
  iconName?: string; // nom de l'icône lucide-react
  colorAccent?: string; // couleur hex
  
  // Ordre et accès
  orderIndex: number;
  isPublished: boolean;
  unlockCondition?: 'previous_completed' | 'none' | 'date';
  unlockDate?: string; // ISO date string
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

// -------------------- LESSONS --------------------

export type LessonContentType = 'video' | 'article' | 'exercise' | 'quiz' | 'checklist';
export type LessonStatus = 'not_started' | 'in_progress' | 'completed' | 'pending_validation' | 'validated';
export type ValidationStatus = 'none' | 'pending' | 'approved' | 'rejected';

export interface Lesson {
  id: string;
  moduleId: string;
  
  title: string;
  description: string | null;
  content: any; // JSONB - structure flexible
  contentType: LessonContentType;
  
  // Ordre
  orderIndex: number;
  estimatedDuration: number | null; // en minutes
  
  // Validation
  requiresAdminValidation: boolean;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
}

export interface UserLessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  
  // Progression
  status: LessonStatus;
  completionPercentage: number; // 0-100
  
  // Validation admin
  validationStatus: ValidationStatus;
  adminFeedback: string | null;
  validatedBy: string | null; // userId de l'admin
  validatedAt: string | null; // ISO timestamp
  
  // User submission
  userSubmission: any | null; // JSONB
  submittedAt: string | null; // ISO timestamp
  
  // Timestamps
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

// -------------------- JOB OFFERS --------------------

export type ContractType = 'apprentissage' | 'professionnalisation' | 'stage';
export type ApplicationStatus = 
  | 'interested' 
  | 'applied' 
  | 'interview_scheduled' 
  | 'interview_done'
  | 'offer_received' 
  | 'accepted' 
  | 'rejected' 
  | 'withdrawn';

export interface JobOffer {
  id: string;
  
  // Informations entreprise
  companyName: string;
  companyLogoUrl: string | null;
  
  // Détails de l'offre
  title: string;
  description: string;
  contractType: ContractType;
  levelRequired: string | null;
  field: string | null;
  
  // Localisation
  city: string;
  postalCode: string | null;
  address: string | null;
  remotePossible: boolean;
  
  // Détails additionnels
  salaryRange: string | null;
  startDate: string | null; // ISO date
  durationMonths: number | null;
  
  // Accessibilité
  rqthFriendly: boolean;
  accessibilityFeatures: string[] | null; // ['adapted_workspace', 'flexible_hours', etc.]
  
  // URLs
  applicationUrl: string | null;
  externalUrl: string | null;
  
  // Status
  isActive: boolean;
  isFeatured: boolean;
  
  // Source
  source: 'manual' | 'api_france_travail' | 'api_indeed';
  externalId: string | null;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  expiresAt: string | null;
}

export interface UserTrackedOffer {
  id: string;
  userId: string;
  offerId: string;
  
  // Status de candidature
  applicationStatus: ApplicationStatus;
  
  // Notes personnelles
  userNotes: string | null;
  
  // Dates importantes
  applicationDate: string | null; // ISO date
  interviewDate: string | null; // ISO timestamp
  
  // Rappels
  reminderDate: string | null; // ISO timestamp
  
  // Timestamps
  trackedAt: string;
  updatedAt: string;
}

// -------------------- STATISTICS --------------------

export interface UserStatistics {
  id: string;
  userId: string;
  
  // Progression globale
  totalLessonsCompleted: number;
  totalLessonsValidated: number;
  currentWeek: number; // semaine en cours (1-4)
  currentStreakDays: number;
  longestStreakDays: number;
  
  // Activité
  lastActivityDate: string | null; // ISO date
  totalTimeSpentMinutes: number;
  
  // Offres
  totalApplications: number;
  totalInterviews: number;
  
  updatedAt: string;
}

// -------------------- ADMIN MESSAGES --------------------

export type MessageType = 'feedback' | 'encouragement' | 'question' | 'validation';

export interface AdminMessage {
  id: string;
  userId: string;
  adminId: string | null;
  lessonId: string | null;
  
  message: string;
  messageType: MessageType;
  isRead: boolean;
  
  createdAt: string;
}

// -------------------- CV STATUS --------------------

export type CVStatus = 'not_uploaded' | 'uploaded' | 'under_review' | 'approved' | 'needs_revision';

export interface CVData {
  id: string;
  userId: string;
  fileName: string | null;
  fileUrl: string | null;
  status: CVStatus;
  adminFeedback: string | null;
  uploadedAt: string | null;
  updatedAt: string;
}

// -------------------- MODULE WITH PROGRESS --------------------
// Combinaison d'un module et de sa progression pour l'affichage

export interface ModuleWithProgress extends Module {
  status: ModuleStatus;
  progress: number; // 0-100
  xp: number; // Points d'expérience gagnés
  badge?: string; // Emoji ou icône de badge
  completedSteps: string[]; // IDs des étapes complétées (ex: ['step1', 'step2'])
}
