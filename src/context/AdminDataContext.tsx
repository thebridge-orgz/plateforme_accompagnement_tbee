/**
 * CONTEXTE ADMIN - Données partagées entre tous les comptes admin
 * 
 * Ce contexte centralise toutes les données des candidats pour permettre
 * aux administrateurs de suivre, corriger, et accompagner chaque candidat.
 * 
 * TODO SUPABASE:
 * - Remplacer localStorage par des appels Supabase en temps réel
 * - Utiliser les Realtime Subscriptions pour la synchronisation
 * - Implémenter les RLS (Row Level Security) policies
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface CandidateProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  city: string;
  postalCode: string;
  currentLevel: string;
  targetLevel: string;
  fieldOfInterest: string;
  mobilityRadius: number | null;
  hasRQTH: boolean;
  rqthDetails?: string;
  profilePictureUrl?: string;
  createdAt: string;
  lastActiveAt: string;
}

export interface CandidateStatistics {
  candidateId: string;
  totalLessonsCompleted: number;
  totalTimeSpentMinutes: number;
  currentStreakDays: number;
  longestStreakDays: number;
  moduleProgress: {
    [moduleId: string]: {
      completed: boolean;
      progress: number;
      lastAccessedAt: string;
    };
  };
}

export interface CVSubmission {
  id: string;
  candidateId: string;
  candidateName: string;
  fileUrl: string;
  fileName: string;
  submittedAt: string;
  status: 'pending' | 'in_review' | 'approved' | 'needs_revision';
  reviewedBy?: string;
  reviewedAt?: string;
  feedback?: string;
  score?: number;
}

export interface ExerciseSubmission {
  id: string;
  candidateId: string;
  candidateName: string;
  moduleId: string;
  moduleName: string;
  exerciseType: 'practical_case' | 'quiz' | 'simulation';
  content: string;
  submittedAt: string;
  status: 'pending' | 'graded';
  gradedBy?: string;
  gradedAt?: string;
  score?: number;
  feedback?: string;
  maxScore: number;
}

export interface OfferTracking {
  id: string;
  candidateId: string;
  candidateName: string;
  company: string;
  position: string;
  status: 'saved' | 'applied' | 'interview' | 'offer_received' | 'rejected' | 'accepted';
  applicationDate?: string;
  interviewDate?: string;
  needsHelp: boolean;
  helpRequest?: string;
  notes?: string;
  lastUpdated: string;
}

export interface AdminActivity {
  id: string;
  type: 'cv_submitted' | 'exercise_completed' | 'offer_help' | 'progress' | 'login' | 'module_completed';
  candidateId: string;
  candidateName: string;
  message: string;
  timestamp: string;
  urgent: boolean;
  metadata?: Record<string, any>;
}

interface AdminDataContextType {
  // Candidats
  candidates: CandidateProfile[];
  candidateStats: Map<string, CandidateStatistics>;
  
  // CVs
  cvSubmissions: CVSubmission[];
  
  // Exercices
  exerciseSubmissions: ExerciseSubmission[];
  
  // Suivi des offres
  offerTrackings: OfferTracking[];
  
  // Activités récentes
  recentActivities: AdminActivity[];
  
  // Statistiques globales
  globalStats: {
    totalCandidates: number;
    activeCandidates: number;
    pendingCVs: number;
    pendingExercises: number;
    offersNeedingHelp: number;
    averageProgress: number;
    completionRate: number;
  };
  
  // Actions
  loadAllData: () => void;
  reviewCV: (cvId: string, status: CVSubmission['status'], feedback: string, score?: number) => void;
  gradeExercise: (exerciseId: string, score: number, feedback: string) => void;
  updateOfferTracking: (offerId: string, updates: Partial<OfferTracking>) => void;
  getCandidateById: (candidateId: string) => CandidateProfile | undefined;
  getCandidateStats: (candidateId: string) => CandidateStatistics | undefined;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// ============================================
// PROVIDER
// ============================================

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
  const [candidateStats, setCandidateStats] = useState<Map<string, CandidateStatistics>>(new Map());
  const [cvSubmissions, setCVSubmissions] = useState<CVSubmission[]>([]);
  const [exerciseSubmissions, setExerciseSubmissions] = useState<ExerciseSubmission[]>([]);
  const [offerTrackings, setOfferTrackings] = useState<OfferTracking[]>([]);
  const [recentActivities, setRecentActivities] = useState<AdminActivity[]>([]);

  // ============================================
  // CHARGEMENT DES DONNÉES
  // ============================================
  const loadAllData = () => {
    // TODO SUPABASE: Remplacer par des requêtes Supabase
    
    // 1. Charger tous les candidats
    // const { data: candidatesData } = await supabase
    //   .from('user_profiles')
    //   .select('*')
    //   .order('created_at', { ascending: false });
    
    const storedCandidates = localStorage.getItem('tbee_all_candidates');
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    } else {
      // Initialisation vide - les candidats seront ajoutés lors des inscriptions
      setCandidates([]);
      localStorage.setItem('tbee_all_candidates', JSON.stringify([]));
    }

    // 2. Charger les statistiques des candidats
    // const { data: statsData } = await supabase
    //   .from('user_statistics')
    //   .select('*');
    
    // Initialisation vide - les statistiques seront créées lors des progressions
    setCandidateStats(new Map<string, CandidateStatistics>());

    // 3. Charger les CVs soumis
    // Initialisation vide - les CVs seront ajoutés lors des soumissions
    setCVSubmissions([]);

    // 4. Charger les exercices soumis
    // Initialisation vide - les exercices seront ajoutés lors des soumissions
    setExerciseSubmissions([]);

    // 5. Charger le suivi des offres
    // Initialisation vide - les offres seront ajoutées lors du suivi
    setOfferTrackings([]);

    // 6. Charger les activités récentes
    // Initialisation vide - les activités seront ajoutées lors des actions
    setRecentActivities([]);
  };

  // Charger les données au montage
  useEffect(() => {
    loadAllData();
    
    // TODO SUPABASE: S'abonner aux changements en temps réel
    // const subscription = supabase
    //   .channel('admin_realtime')
    //   .on('postgres_changes', { event: '*', schema: 'public', table: 'user_profiles' }, (payload) => {
    //     loadAllData();
    //   })
    //   .subscribe();
    // return () => { subscription.unsubscribe(); };
  }, []);

  // ============================================
  // ACTIONS
  // ============================================

  const reviewCV = (cvId: string, status: CVSubmission['status'], feedback: string, score?: number) => {
    // TODO SUPABASE:
    // await supabase.from('cv_submissions').update({
    //   status,
    //   feedback,
    //   score,
    //   reviewed_by: adminId,
    //   reviewed_at: new Date().toISOString()
    // }).eq('id', cvId);

    setCVSubmissions(prev => prev.map(cv => 
      cv.id === cvId 
        ? { ...cv, status, feedback, score, reviewedAt: new Date().toISOString() }
        : cv
    ));
  };

  const gradeExercise = (exerciseId: string, score: number, feedback: string) => {
    // TODO SUPABASE:
    // await supabase.from('exercise_submissions').update({
    //   status: 'graded',
    //   score,
    //   feedback,
    //   graded_by: adminId,
    //   graded_at: new Date().toISOString()
    // }).eq('id', exerciseId);

    setExerciseSubmissions(prev => prev.map(ex => 
      ex.id === exerciseId 
        ? { ...ex, status: 'graded', score, feedback, gradedAt: new Date().toISOString() }
        : ex
    ));
  };

  const updateOfferTracking = (offerId: string, updates: Partial<OfferTracking>) => {
    // TODO SUPABASE:
    // await supabase.from('offer_trackings').update({
    //   ...updates,
    //   last_updated: new Date().toISOString()
    // }).eq('id', offerId);

    setOfferTrackings(prev => prev.map(offer => 
      offer.id === offerId 
        ? { ...offer, ...updates, lastUpdated: new Date().toISOString() }
        : offer
    ));
  };

  const getCandidateById = (candidateId: string) => {
    return candidates.find(c => c.id === candidateId);
  };

  const getCandidateStats = (candidateId: string) => {
    return candidateStats.get(candidateId);
  };

  // ============================================
  // STATISTIQUES GLOBALES
  // ============================================
  const globalStats = {
    totalCandidates: candidates.length,
    activeCandidates: candidates.filter(c => {
      const lastActive = new Date(c.lastActiveAt);
      const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceActive < 7;
    }).length,
    pendingCVs: cvSubmissions.filter(cv => cv.status === 'pending').length,
    pendingExercises: exerciseSubmissions.filter(ex => ex.status === 'pending').length,
    offersNeedingHelp: offerTrackings.filter(o => o.needsHelp).length,
    averageProgress: Array.from(candidateStats.values()).reduce((acc, stat) => {
      const moduleProgresses = Object.values(stat.moduleProgress);
      const avgProgress = moduleProgresses.reduce((sum, mod) => sum + mod.progress, 0) / moduleProgresses.length;
      return acc + avgProgress;
    }, 0) / candidateStats.size || 0,
    completionRate: Array.from(candidateStats.values()).reduce((acc, stat) => {
      const completed = Object.values(stat.moduleProgress).filter(m => m.completed).length;
      const total = Object.values(stat.moduleProgress).length;
      return acc + (total > 0 ? (completed / total) * 100 : 0);
    }, 0) / candidateStats.size || 0
  };

  const value: AdminDataContextType = {
    candidates,
    candidateStats,
    cvSubmissions,
    exerciseSubmissions,
    offerTrackings,
    recentActivities,
    globalStats,
    loadAllData,
    reviewCV,
    gradeExercise,
    updateOfferTracking,
    getCandidateById,
    getCandidateStats
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

// ============================================
// HOOK
// ============================================
export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within AdminDataProvider');
  }
  return context;
}