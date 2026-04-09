/**
 * CONTEXTE ADMIN - Données partagées entre tous les comptes admin
 * Connecté à Supabase avec Realtime pour la synchronisation en temps réel.
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { supabase } from '../app/auth/supabaseClient';

// ============================================
// TYPES & INTERFACES
// ============================================

export interface studentProfile {
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

export interface studentStatistics {
  studentId: string;
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
  studentId: string;
  studentName: string;
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
  studentId: string;
  studentName: string;
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
  studentId: string;
  studentName: string;
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
  studentId: string;
  studentName: string;
  message: string;
  timestamp: string;
  urgent: boolean;
  metadata?: Record<string, any>;
}

interface AdminDataContextType {
  students: studentProfile[];
  studentStats: Map<string, studentStatistics>;
  cvSubmissions: CVSubmission[];
  exerciseSubmissions: ExerciseSubmission[];
  offerTrackings: OfferTracking[];
  recentActivities: AdminActivity[];
  isLoading: boolean;
  globalStats: {
    totalstudents: number;
    activestudents: number;
    pendingCVs: number;
    pendingExercises: number;
    offersNeedingHelp: number;
    averageProgress: number;
    completionRate: number;
  };
  loadAllData: () => Promise<void>;
  reviewCV: (cvId: string, status: CVSubmission['status'], feedback: string, score?: number) => Promise<void>;
  gradeExercise: (exerciseId: string, score: number, feedback: string) => Promise<void>;
  updateOfferTracking: (offerId: string, updates: Partial<OfferTracking>) => Promise<void>;
  getstudentById: (studentId: string) => studentProfile | undefined;
  getstudentStats: (studentId: string) => studentStatistics | undefined;
}

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

// ============================================
// MAPPERS
// ============================================

function mapStudent(raw: any): studentProfile {
  return {
    id: raw.id,
    firstName: raw.first_name ?? '',
    lastName: raw.last_name ?? '',
    email: raw.email ?? '',
    phone: raw.phone ?? '',
    birthDate: raw.birth_date ?? '',
    city: raw.city ?? '',
    postalCode: raw.postal_code ?? '',
    currentLevel: raw.current_level ?? '',
    targetLevel: raw.target_level ?? '',
    fieldOfInterest: raw.field_of_interest ?? '',
    mobilityRadius: raw.mobility_radius ?? null,
    hasRQTH: raw.has_rqth ?? false,
    profilePictureUrl: raw.profile_picture_url,
    createdAt: raw.created_at ?? '',
    lastActiveAt: raw.updated_at ?? raw.created_at ?? '',
  };
}

function mapCVSubmission(raw: any, studentName: string): CVSubmission {
  return {
    id: raw.id,
    studentId: raw.user_id,
    studentName,
    fileUrl: raw.file_url ?? '',
    fileName: raw.file_name ?? '',
    submittedAt: raw.uploaded_at ?? raw.updated_at ?? '',
    status: raw.status === 'uploaded' ? 'pending' : raw.status,
    reviewedBy: raw.reviewed_by,
    reviewedAt: raw.reviewed_at,
    feedback: raw.admin_feedback,
    score: raw.score,
  };
}

function mapOfferTracking(raw: any, studentName: string): OfferTracking {
  return {
    id: raw.id,
    studentId: raw.user_id,
    studentName,
    company: raw.company_name ?? raw.offer_id ?? '',
    position: raw.position ?? '',
    status: raw.application_status ?? 'saved',
    applicationDate: raw.application_date,
    interviewDate: raw.interview_date,
    needsHelp: raw.needs_help ?? false,
    helpRequest: raw.help_request,
    notes: raw.user_notes,
    lastUpdated: raw.updated_at ?? '',
  };
}

// ============================================
// PROVIDER
// ============================================

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [students, setstudents] = useState<studentProfile[]>([]);
  const [studentStats, setstudentStats] = useState<Map<string, studentStatistics>>(new Map());
  const [cvSubmissions, setCVSubmissions] = useState<CVSubmission[]>([]);
  const [exerciseSubmissions, setExerciseSubmissions] = useState<ExerciseSubmission[]>([]);
  const [offerTrackings, setOfferTrackings] = useState<OfferTracking[]>([]);
  const [recentActivities, setRecentActivities] = useState<AdminActivity[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ============================================
  // CHARGEMENT DES DONNÉES
  // ============================================

  const loadAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 1. Charger tous les étudiants
      const { data: studentsData, error: studentsError } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'student')
        .order('created_at', { ascending: false });

      if (studentsError) throw studentsError;

      const mappedStudents = (studentsData || []).map(mapStudent);
      setstudents(mappedStudents);

      // Construire un index nom par userId
      const nameMap: Record<string, string> = {};
      mappedStudents.forEach(s => {
        nameMap[s.id] = `${s.firstName} ${s.lastName}`.trim() || s.email;
      });

      // 2. Charger les statistiques des étudiants
      const { data: statsData } = await supabase
        .from('user_statistics')
        .select('*');

      const statsMap = new Map<string, studentStatistics>();
      (statsData || []).forEach((stat: any) => {
        statsMap.set(stat.user_id, {
          studentId: stat.user_id,
          totalLessonsCompleted: stat.total_lessons_completed ?? 0,
          totalTimeSpentMinutes: stat.total_time_spent_minutes ?? 0,
          currentStreakDays: stat.current_streak_days ?? 0,
          longestStreakDays: stat.longest_streak_days ?? 0,
          moduleProgress: {},
        });
      });

      // 3. Charger les progressions modules pour enrichir statsMap
      const { data: moduleProgressData } = await supabase
        .from('user_module_progress')
        .select('*');

      (moduleProgressData || []).forEach((mp: any) => {
        const existing = statsMap.get(mp.user_id);
        if (existing) {
          existing.moduleProgress[mp.module_id] = {
            completed: mp.status === 'completed',
            progress: mp.progress ?? 0,
            lastAccessedAt: mp.updated_at ?? '',
          };
        }
      });

      setstudentStats(statsMap);

      // 4. Charger les CVs soumis
      const { data: cvsData } = await supabase
        .from('cv_data')
        .select('*')
        .neq('status', 'not_uploaded')
        .order('uploaded_at', { ascending: false });

      setCVSubmissions(
        (cvsData || []).map((cv: any) =>
          mapCVSubmission(cv, nameMap[cv.user_id] || 'Étudiant inconnu')
        )
      );

      // 5. Charger les exercices soumis (user_lesson_progress avec submission)
      const { data: exercisesData } = await supabase
        .from('user_lesson_progress')
        .select('*, lessons(title, content_type, module_id, modules(title))')
        .not('user_submission', 'is', null)
        .order('submitted_at', { ascending: false });

      setExerciseSubmissions(
        (exercisesData || []).map((ex: any) => ({
          id: ex.id,
          studentId: ex.user_id,
          studentName: nameMap[ex.user_id] || 'Étudiant inconnu',
          moduleId: ex.lessons?.module_id ?? '',
          moduleName: ex.lessons?.modules?.title ?? '',
          exerciseType: ex.lessons?.content_type ?? 'quiz',
          content: JSON.stringify(ex.user_submission),
          submittedAt: ex.submitted_at ?? '',
          status: ex.validation_status === 'pending' ? 'pending' : 'graded',
          gradedBy: ex.validated_by,
          gradedAt: ex.validated_at,
          score: ex.score,
          feedback: ex.admin_feedback,
          maxScore: 100,
        }))
      );

      // 6. Charger le suivi des offres
      const { data: offersData } = await supabase
        .from('user_tracked_offers')
        .select('*')
        .order('updated_at', { ascending: false });

      setOfferTrackings(
        (offersData || []).map((o: any) =>
          mapOfferTracking(o, nameMap[o.user_id] || 'Étudiant inconnu')
        )
      );

      // 7. Activités récentes (basées sur les données chargées)
      const activities: AdminActivity[] = [];

      // Dernières soumissions de CV
      (cvsData || []).slice(0, 5).forEach((cv: any) => {
        activities.push({
          id: `cv-${cv.id}`,
          type: 'cv_submitted',
          studentId: cv.user_id,
          studentName: nameMap[cv.user_id] || 'Étudiant',
          message: `A soumis son CV : ${cv.file_name}`,
          timestamp: cv.uploaded_at ?? cv.updated_at ?? '',
          urgent: cv.status === 'uploaded',
        });
      });

      // Dernières progressions modules
      (moduleProgressData || [])
        .filter((mp: any) => mp.status === 'completed')
        .slice(0, 5)
        .forEach((mp: any) => {
          activities.push({
            id: `module-${mp.id}`,
            type: 'module_completed',
            studentId: mp.user_id,
            studentName: nameMap[mp.user_id] || 'Étudiant',
            message: `A complété un module`,
            timestamp: mp.completed_at ?? mp.updated_at ?? '',
            urgent: false,
          });
        });

      // Trier par date décroissante
      activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setRecentActivities(activities.slice(0, 20));

    } catch (error) {
      console.error('Erreur chargement données admin:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Charger les données au montage
  useEffect(() => {
    loadAllData();

    // Abonnement Realtime pour synchronisation en temps réel
    const channel = supabase
      .channel('admin_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles' }, () => {
        loadAllData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'cv_data' }, () => {
        loadAllData();
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'user_module_progress' }, () => {
        loadAllData();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadAllData]);

  // ============================================
  // ACTIONS
  // ============================================

  const reviewCV = useCallback(async (
    cvId: string,
    status: CVSubmission['status'],
    feedback: string,
    score?: number
  ) => {
    const { error } = await supabase
      .from('cv_data')
      .update({
        status,
        admin_feedback: feedback,
        score,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', cvId);

    if (error) throw error;

    setCVSubmissions(prev =>
      prev.map(cv =>
        cv.id === cvId
          ? { ...cv, status, feedback, score, reviewedAt: new Date().toISOString() }
          : cv
      )
    );
  }, []);

  const gradeExercise = useCallback(async (
    exerciseId: string,
    score: number,
    feedback: string
  ) => {
    const { error } = await supabase
      .from('user_lesson_progress')
      .update({
        validation_status: 'approved',
        admin_feedback: feedback,
        score,
        validated_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', exerciseId);

    if (error) throw error;

    setExerciseSubmissions(prev =>
      prev.map(ex =>
        ex.id === exerciseId
          ? { ...ex, status: 'graded', score, feedback, gradedAt: new Date().toISOString() }
          : ex
      )
    );
  }, []);

  const updateOfferTracking = useCallback(async (
    offerId: string,
    updates: Partial<OfferTracking>
  ) => {
    const dbUpdates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (updates.status !== undefined) dbUpdates.application_status = updates.status;
    if (updates.notes !== undefined) dbUpdates.user_notes = updates.notes;
    if (updates.needsHelp !== undefined) dbUpdates.needs_help = updates.needsHelp;
    if (updates.helpRequest !== undefined) dbUpdates.help_request = updates.helpRequest;

    const { error } = await supabase
      .from('user_tracked_offers')
      .update(dbUpdates)
      .eq('id', offerId);

    if (error) throw error;

    setOfferTrackings(prev =>
      prev.map(offer =>
        offer.id === offerId
          ? { ...offer, ...updates, lastUpdated: new Date().toISOString() }
          : offer
      )
    );
  }, []);

  const getstudentById = useCallback((studentId: string) => {
    return students.find(s => s.id === studentId);
  }, [students]);

  const getstudentStats = useCallback((studentId: string) => {
    return studentStats.get(studentId);
  }, [studentStats]);

  // ============================================
  // STATISTIQUES GLOBALES
  // ============================================

  const globalStats = {
    totalstudents: students.length,
    activestudents: students.filter(s => {
      const lastActive = new Date(s.lastActiveAt);
      return (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24) < 7;
    }).length,
    pendingCVs: cvSubmissions.filter(cv => cv.status === 'pending').length,
    pendingExercises: exerciseSubmissions.filter(ex => ex.status === 'pending').length,
    offersNeedingHelp: offerTrackings.filter(o => o.needsHelp).length,
    averageProgress: (() => {
      const values = Array.from(studentStats.values());
      if (!values.length) return 0;
      const total = values.reduce((acc, stat) => {
        const progresses = Object.values(stat.moduleProgress);
        if (!progresses.length) return acc;
        return acc + progresses.reduce((s, m) => s + m.progress, 0) / progresses.length;
      }, 0);
      return total / values.length;
    })(),
    completionRate: (() => {
      const values = Array.from(studentStats.values());
      if (!values.length) return 0;
      const total = values.reduce((acc, stat) => {
        const progresses = Object.values(stat.moduleProgress);
        if (!progresses.length) return acc;
        const completed = progresses.filter(m => m.completed).length;
        return acc + (completed / progresses.length) * 100;
      }, 0);
      return total / values.length;
    })(),
  };

  const value: AdminDataContextType = {
    students,
    studentStats,
    cvSubmissions,
    exerciseSubmissions,
    offerTrackings,
    recentActivities,
    isLoading,
    globalStats,
    loadAllData,
    reviewCV,
    gradeExercise,
    updateOfferTracking,
    getstudentById,
    getstudentStats,
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
