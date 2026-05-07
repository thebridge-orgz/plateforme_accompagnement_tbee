// ============================================
// TYPES UNIFIÉS POUR LA PLATEFORME TBEE
// ============================================

export type UserRole = 'student' | 'admin';
export type ModuleStatus = 'locked' | 'available' | 'in_progress' | 'completed';
export type CVStatus = 'not_uploaded' | 'uploaded' | 'pending' | 'approved' | 'needs_revision';
export type ApplicationStatus = 'saved' | 'applied' | 'interview' | 'offer_received' | 'rejected' | 'accepted';
export type LessonContentType = 'video' | 'article' | 'exercise' | 'quiz' | 'checklist';
export type ValidationStatus = 'none' | 'pending' | 'approved' | 'rejected';

// User Profile
export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  birthDate: string | null;
  hasRQTH: boolean;
  address: string | null;
  currentLevel: string | null;
  targetLevel: string | null;
  fieldOfInterest: string | null;
  city: string | null;
  postalCode: string | null;
  mobilityRadius: number | null;
  onboardingCompleted: boolean;
  onboardingStep: number;
  onboardingData: any | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Module
export interface Module {
  id: string;
  weekNumber: number;
  title: string;
  description: string | null;
  iconName: string | null;
  colorAccent: string | null;
  orderIndex: number;
  isPublished: boolean;
  unlockCondition: string;
  unlockDate: string | null;
  objectives: string[] | null;
  keyConcepts: string[] | null;
  resources: Record<string, any> | null;
  estimatedHours: number | null;
  difficultyLevel: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ModuleWithProgress extends Module {
  status: ModuleStatus;
  progress: number;
  xp: number;
  completedSteps: string[];
  startedAt?: string | null;
  completedAt?: string | null;
  moduleId: string;
}

// Statistics
export interface UserStatistics {
  /*totalLessonsCompleted: number;
  totalLessonsValidated: number;
  currentStreakDays: number;
  longestStreakDays: number;
  totalTimeSpentMinutes: number;
  totalApplications: number;
  totalInterviews: number;
  lastActivityDate: string | null;*/
  currentWeek: number;
  userId: string;
  id: string;
  totalHoursSpent: number;
  offersViewed: number;
  offersApplied: number;
  modulesCompleted: number;
}

// CV
export interface CVData {
  fileName: string | null;
  fileUrl: string | null;
  status: CVStatus;
  adminFeedback: string | null;
  score?: number | null;
  uploadedAt: string | null;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  updatedAt: string;
}

// Offer Tracking
export interface TrackedOffer {
  id: string;
  userId: string;
  offerId: string | null;
  companyName: string | null;
  positionTitle: string | null;
  offerUrl: string | null;
  applicationStatus: ApplicationStatus;
  userNotes: string | null;
  applicationDate: string | null;
  interviewDate: string | null;
  reminderDate: string | null;
  needsHelp: boolean;
  helpRequest: string | null;
  trackedAt: string;
  updatedAt: string;
}

// Onboarding
export interface OnboardingData {
  hasFormation: boolean;
  formationChoice?: string;
  skills: string[];
  cvStatus: number;
  linkedinStatus: number;
  searchStatus: number;
  weeklyHours: number;
  planWeeks?: number;
  completedAt?: string;
}