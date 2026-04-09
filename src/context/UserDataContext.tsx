// ============================================
// CONTEXTE GLOBAL DES DONNÉES UTILISATEUR
// ============================================

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { supabase } from '../app/auth/supabaseClient';
import type {
  UserProfile,
  UserStatistics,
  ModuleWithProgress,
  UserTrackedOffer,
  CVData,
  JobOffer,
  ModuleStatus,
} from '../types';
import {
  initialDashboardData,
  calculateGlobalProgress,
  countCompletedModules,
  getCurrentModule,
  isNewUser,
  MAX_TRACKED_OFFERS,
  type DashboardData,
} from '../utils/initialState';
import { useAuth } from '../app/auth/AuthContext';

// -------------------- CONTEXT TYPES --------------------

interface UserDataContextType {
  isLoading: boolean;
  userProfile: Partial<UserProfile> | null;
  statistics: Omit<UserStatistics, 'id' | 'userId'>;
  modules: ModuleWithProgress[];
  trackedOffers: UserTrackedOffer[];
  cvData: Omit<CVData, 'id' | 'userId'>;

  globalProgress: number;
  completedModulesCount: number;
  totalModulesCount: number;
  currentModule: ModuleWithProgress | null;
  isNewUser: boolean;
  canTrackMoreOffers: boolean;

  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  updateModuleProgress: (moduleId: string, progress: number) => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  startModule: (moduleId: string) => Promise<void>;
  addTrackedOffer: (offer: Omit<UserTrackedOffer, 'id' | 'userId' | 'trackedAt' | 'updatedAt'>) => Promise<void>;
  updateTrackedOffer: (offerId: string, updates: Partial<UserTrackedOffer>) => Promise<void>;
  removeTrackedOffer: (offerId: string) => Promise<void>;
  updateCVData: (updates: Partial<CVData>, file?: File) => Promise<void>;
  incrementStudyTime: (minutes: number) => Promise<void>;
  updateStreak: () => Promise<void>;
  refreshData: () => Promise<void>;
}

// -------------------- MAPPERS (snake_case DB → camelCase TS) --------------------

function mapProfile(raw: any): Partial<UserProfile> {
  return {
    id: raw.id,
    email: raw.email,
    role: raw.role,
    firstName: raw.first_name,
    lastName: raw.last_name,
    phone: raw.phone,
    birthDate: raw.birth_date,
    hasRQTH: raw.has_rqth ?? false,
    currentLevel: raw.current_level,
    targetLevel: raw.target_level,
    fieldOfInterest: raw.field_of_interest,
    city: raw.city,
    postalCode: raw.postal_code,
    mobilityRadius: raw.mobility_radius,
    onboardingCompleted: raw.onboarding_completed ?? false,
    onboardingStep: raw.onboarding_step ?? 1,
    isActive: raw.is_active ?? true,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}

function mapStatistics(raw: any): Omit<UserStatistics, 'id' | 'userId'> {
  return {
    totalLessonsCompleted: raw.total_lessons_completed ?? 0,
    totalLessonsValidated: raw.total_lessons_validated ?? 0,
    currentWeek: raw.current_week ?? 1,
    currentStreakDays: raw.current_streak_days ?? 0,
    longestStreakDays: raw.longest_streak_days ?? 0,
    lastActivityDate: raw.last_activity_date ?? null,
    totalTimeSpentMinutes: raw.total_time_spent_minutes ?? 0,
    totalApplications: raw.total_applications ?? 0,
    totalInterviews: raw.total_interviews ?? 0,
    updatedAt: raw.updated_at,
  };
}

function mapCVData(raw: any): Omit<CVData, 'id' | 'userId'> {
  return {
    fileName: raw.file_name,
    fileUrl: raw.file_url,
    status: raw.status ?? 'not_uploaded',
    adminFeedback: raw.admin_feedback,
    uploadedAt: raw.uploaded_at,
    updatedAt: raw.updated_at,
  };
}

function mapTrackedOffer(raw: any): UserTrackedOffer {
  return {
    id: raw.id,
    userId: raw.user_id,
    offerId: raw.offer_id,
    applicationStatus: raw.application_status,
    userNotes: raw.user_notes,
    applicationDate: raw.application_date,
    interviewDate: raw.interview_date,
    reminderDate: raw.reminder_date,
    trackedAt: raw.tracked_at,
    updatedAt: raw.updated_at,
  };
}

function mapModuleWithProgress(rawModule: any, rawProgress: any): ModuleWithProgress {
  return {
    id: rawModule.id,
    weekNumber: rawModule.week_number,
    title: rawModule.title,
    description: rawModule.description,
    iconName: rawModule.icon_name,
    colorAccent: rawModule.color_accent,
    orderIndex: rawModule.order_index,
    isPublished: rawModule.is_published,
    unlockCondition: rawModule.unlock_condition,
    unlockDate: rawModule.unlock_date,
    createdAt: rawModule.created_at,
    updatedAt: rawModule.updated_at,
    status: rawProgress?.status ?? 'locked',
    progress: rawProgress?.progress ?? 0,
    xp: rawProgress?.xp ?? 0,
  };
}

// -------------------- CONTEXT --------------------

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// -------------------- PROVIDER --------------------

interface UserDataProviderProps {
  children: React.ReactNode;
  initialData?: Partial<DashboardData>;
}

export function UserDataProvider({ children, initialData }: UserDataProviderProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData>(
    initialData ? { ...initialDashboardData, ...initialData } : initialDashboardData
  );

  // -------------------- LOAD DATA --------------------

  const loadData = useCallback(async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const userId = user.id;

    try {
      // Fetch profile, statistics, CV, tracked offers en parallèle
      const [
        { data: profileRaw },
        { data: statsRaw },
        { data: cvRaw },
        { data: offersRaw },
        { data: modulesRaw },
      ] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('user_statistics').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('cv_data').select('*').eq('user_id', userId).maybeSingle(),
        supabase.from('user_tracked_offers').select('*').eq('user_id', userId),
        supabase.from('modules').select('*').eq('is_published', true).order('order_index'),
      ]);

      // Fetch progression modules de l'utilisateur
      const { data: moduleProgressRaw } = await supabase
        .from('user_module_progress')
        .select('*')
        .eq('user_id', userId);

      // Construire la map des progressions
      const progressMap: Record<string, any> = {};
      (moduleProgressRaw || []).forEach((p: any) => {
        progressMap[p.module_id] = p;
      });

      // Construire les modules avec progression
      let modules: ModuleWithProgress[];
      if (modulesRaw && modulesRaw.length > 0) {
        modules = modulesRaw.map((m: any) => mapModuleWithProgress(m, progressMap[m.id]));
        // Si aucune progression, le premier module est "available"
        const hasAnyProgress = Object.keys(progressMap).length > 0;
        if (!hasAnyProgress && modules.length > 0) {
          modules[0] = { ...modules[0], status: 'available' };
        }
      } else {
        // Fallback sur les données initiales si la table modules est vide
        modules = initialDashboardData.modules;
      }

      setData({
        userProfile: profileRaw ? mapProfile(profileRaw) : (initialData?.userProfile ?? initialDashboardData.userProfile),
        statistics: statsRaw ? mapStatistics(statsRaw) : (initialData?.statistics ?? initialDashboardData.statistics),
        cvData: cvRaw ? mapCVData(cvRaw) : (initialData?.cvData ?? initialDashboardData.cvData),
        trackedOffers: offersRaw ? offersRaw.map(mapTrackedOffer) : [],
        modules,
      });
    } catch (error) {
      console.error('Erreur chargement données utilisateur:', error);
      // Fallback sur les données initiales
      if (initialData) {
        setData({ ...initialDashboardData, ...initialData });
      }
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, initialData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // -------------------- COMPUTED VALUES --------------------

  const globalProgress = calculateGlobalProgress(data.modules);
  const completedModulesCount = countCompletedModules(data.modules);
  const totalModulesCount = data.modules.length;
  const currentModule = getCurrentModule(data.modules);
  const isUserNew = isNewUser(data.statistics);
  const canTrackMoreOffers = data.trackedOffers.length < MAX_TRACKED_OFFERS;

  // -------------------- ACTIONS - USER PROFILE --------------------

  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!user?.id) return;

    // Convertir camelCase → snake_case pour Supabase
    const dbUpdates: Record<string, any> = {};
    if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
    if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
    if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
    if (updates.birthDate !== undefined) dbUpdates.birth_date = updates.birthDate;
    if (updates.hasRQTH !== undefined) dbUpdates.has_rqth = updates.hasRQTH;
    if (updates.currentLevel !== undefined) dbUpdates.current_level = updates.currentLevel;
    if (updates.targetLevel !== undefined) dbUpdates.target_level = updates.targetLevel;
    if (updates.fieldOfInterest !== undefined) dbUpdates.field_of_interest = updates.fieldOfInterest;
    if (updates.city !== undefined) dbUpdates.city = updates.city;
    if (updates.postalCode !== undefined) dbUpdates.postal_code = updates.postalCode;
    if (updates.mobilityRadius !== undefined) dbUpdates.mobility_radius = updates.mobilityRadius;
    if (updates.onboardingCompleted !== undefined) dbUpdates.onboarding_completed = updates.onboardingCompleted;
    if (updates.onboardingStep !== undefined) dbUpdates.onboarding_step = updates.onboardingStep;
    dbUpdates.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from('profiles')
      .update(dbUpdates)
      .eq('id', user.id);

    if (error) throw error;

    setData(prev => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...updates },
    }));
  }, [user?.id]);

  // -------------------- ACTIONS - MODULES --------------------

  const updateModuleProgress = useCallback(async (moduleId: string, progress: number) => {
    if (!user?.id) return;

    const clampedProgress = Math.min(100, Math.max(0, progress));

    const { error } = await supabase
      .from('user_module_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        progress: clampedProgress,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,module_id' });

    if (error) console.error('Erreur updateModuleProgress:', error);

    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m =>
        m.id === moduleId ? { ...m, progress: clampedProgress } : m
      ),
    }));
  }, [user?.id]);

  const startModule = useCallback(async (moduleId: string) => {
    if (!user?.id) return;

    const { error } = await supabase
      .from('user_module_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        status: 'in_progress',
        progress: 0,
        xp: 0,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,module_id' });

    if (error) console.error('Erreur startModule:', error);

    // Mettre à jour last_activity_date dans user_statistics
    await supabase
      .from('user_statistics')
      .update({ last_activity_date: new Date().toISOString().split('T')[0], updated_at: new Date().toISOString() })
      .eq('user_id', user.id);

    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m =>
        m.id === moduleId && m.status === 'available'
          ? { ...m, status: 'in_progress' as ModuleStatus }
          : m
      ),
      statistics: {
        ...prev.statistics,
        lastActivityDate: new Date().toISOString().split('T')[0],
      },
    }));
  }, [user?.id]);

  const completeModule = useCallback(async (moduleId: string) => {
    if (!user?.id) return;

    const moduleIndex = data.modules.findIndex(m => m.id === moduleId);
    const nextModule = data.modules[moduleIndex + 1];

    // Marquer le module comme complété
    await supabase
      .from('user_module_progress')
      .upsert({
        user_id: user.id,
        module_id: moduleId,
        status: 'completed',
        progress: 100,
        xp: 250,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id,module_id' });

    // Débloquer le module suivant
    if (nextModule && nextModule.status === 'locked') {
      await supabase
        .from('user_module_progress')
        .upsert({
          user_id: user.id,
          module_id: nextModule.id,
          status: 'available',
          progress: 0,
          xp: 0,
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id,module_id' });
    }

    // Mettre à jour les statistiques
    await supabase
      .from('user_statistics')
      .update({
        current_week: Math.min(4, (data.statistics.currentWeek || 1) + 1),
        last_activity_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    setData(prev => {
      const updatedModules = [...prev.modules];
      if (updatedModules[moduleIndex]) {
        updatedModules[moduleIndex] = {
          ...updatedModules[moduleIndex],
          status: 'completed' as ModuleStatus,
          progress: 100,
          xp: 250,
        };
      }
      if (moduleIndex + 1 < updatedModules.length) {
        if (updatedModules[moduleIndex + 1]?.status === 'locked') {
          updatedModules[moduleIndex + 1] = {
            ...updatedModules[moduleIndex + 1],
            status: 'available' as ModuleStatus,
          };
        }
      }
      return {
        ...prev,
        modules: updatedModules,
        statistics: {
          ...prev.statistics,
          currentWeek: Math.min(4, prev.statistics.currentWeek + 1),
          lastActivityDate: new Date().toISOString().split('T')[0],
        },
      };
    });
  }, [user?.id, data.modules, data.statistics.currentWeek]);

  // -------------------- ACTIONS - TRACKED OFFERS --------------------

  const addTrackedOffer = useCallback(async (
    offer: Omit<UserTrackedOffer, 'id' | 'userId' | 'trackedAt' | 'updatedAt'>
  ) => {
    if (!user?.id) return;
    if (data.trackedOffers.length >= MAX_TRACKED_OFFERS) {
      throw new Error(`Maximum de ${MAX_TRACKED_OFFERS} offres atteint`);
    }

    const now = new Date().toISOString();
    const { data: inserted, error } = await supabase
      .from('user_tracked_offers')
      .insert({
        user_id: user.id,
        offer_id: offer.offerId,
        application_status: offer.applicationStatus,
        user_notes: offer.userNotes,
        application_date: offer.applicationDate,
        interview_date: offer.interviewDate,
        reminder_date: offer.reminderDate,
        tracked_at: now,
        updated_at: now,
      })
      .select()
      .single();

    if (error) throw error;

    setData(prev => ({
      ...prev,
      trackedOffers: [mapTrackedOffer(inserted), ...prev.trackedOffers],
    }));
  }, [user?.id, data.trackedOffers.length]);

  const updateTrackedOffer = useCallback(async (
    offerId: string,
    updates: Partial<UserTrackedOffer>
  ) => {
    if (!user?.id) return;

    const dbUpdates: Record<string, any> = { updated_at: new Date().toISOString() };
    if (updates.applicationStatus !== undefined) dbUpdates.application_status = updates.applicationStatus;
    if (updates.userNotes !== undefined) dbUpdates.user_notes = updates.userNotes;
    if (updates.applicationDate !== undefined) dbUpdates.application_date = updates.applicationDate;
    if (updates.interviewDate !== undefined) dbUpdates.interview_date = updates.interviewDate;
    if (updates.reminderDate !== undefined) dbUpdates.reminder_date = updates.reminderDate;

    const { error } = await supabase
      .from('user_tracked_offers')
      .update(dbUpdates)
      .eq('id', offerId)
      .eq('user_id', user.id);

    if (error) throw error;

    setData(prev => {
      const prevOffer = prev.trackedOffers.find(o => o.id === offerId);
      const wasApplied = prevOffer?.applicationStatus === 'applied';
      const wasInterview = prevOffer?.applicationStatus === 'interview_scheduled';
      const nowApplied = updates.applicationStatus === 'applied' && !wasApplied;
      const nowInterview = updates.applicationStatus === 'interview_scheduled' && !wasInterview;

      return {
        ...prev,
        trackedOffers: prev.trackedOffers.map(o =>
          o.id === offerId
            ? { ...o, ...updates, updatedAt: new Date().toISOString() }
            : o
        ),
        statistics: nowApplied
          ? { ...prev.statistics, totalApplications: prev.statistics.totalApplications + 1 }
          : nowInterview
          ? { ...prev.statistics, totalInterviews: prev.statistics.totalInterviews + 1 }
          : prev.statistics,
      };
    });
  }, [user?.id]);

  const removeTrackedOffer = useCallback(async (offerId: string) => {
    if (!user?.id) return;

    const { error } = await supabase
      .from('user_tracked_offers')
      .delete()
      .eq('id', offerId)
      .eq('user_id', user.id);

    if (error) throw error;

    setData(prev => ({
      ...prev,
      trackedOffers: prev.trackedOffers.filter(o => o.id !== offerId),
    }));
  }, [user?.id]);

  // -------------------- ACTIONS - CV --------------------

  const updateCVData = useCallback(async (updates: Partial<CVData>, file?: File) => {
    if (!user?.id) return;

    let fileUrl = updates.fileUrl;
    let fileName = updates.fileName;

    // Upload du fichier vers Supabase Storage si fourni
    if (file) {
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('cv-uploads')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('cv-uploads')
        .getPublicUrl(filePath);

      fileUrl = urlData.publicUrl;
      fileName = file.name;
    }

    const now = new Date().toISOString();
    const dbUpdates: Record<string, any> = { updated_at: now };
    if (fileName !== undefined) dbUpdates.file_name = fileName;
    if (fileUrl !== undefined) dbUpdates.file_url = fileUrl;
    if (updates.status !== undefined) dbUpdates.status = updates.status;
    if (updates.adminFeedback !== undefined) dbUpdates.admin_feedback = updates.adminFeedback;
    if (updates.uploadedAt !== undefined) dbUpdates.uploaded_at = updates.uploadedAt;

    // Upsert car la ligne cv_data peut ne pas exister encore
    const { error } = await supabase
      .from('cv_data')
      .upsert({ user_id: user.id, ...dbUpdates }, { onConflict: 'user_id' });

    if (error) throw error;

    setData(prev => ({
      ...prev,
      cvData: {
        ...prev.cvData,
        ...updates,
        fileName: fileName ?? prev.cvData.fileName,
        fileUrl: fileUrl ?? prev.cvData.fileUrl,
        updatedAt: now,
      },
    }));
  }, [user?.id]);

  // -------------------- ACTIONS - STATISTICS --------------------

  const incrementStudyTime = useCallback(async (minutes: number) => {
    if (!user?.id) return;

    const newTotal = (data.statistics.totalTimeSpentMinutes || 0) + minutes;
    const today = new Date().toISOString().split('T')[0];

    await supabase
      .from('user_statistics')
      .update({
        total_time_spent_minutes: newTotal,
        last_activity_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    setData(prev => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        totalTimeSpentMinutes: newTotal,
        lastActivityDate: today,
      },
    }));
  }, [user?.id, data.statistics.totalTimeSpentMinutes]);

  const updateStreak = useCallback(async () => {
    if (!user?.id) return;

    const today = new Date().toISOString().split('T')[0];
    const lastActivity = data.statistics.lastActivityDate;
    if (lastActivity === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const newStreak = lastActivity === yesterdayStr
      ? (data.statistics.currentStreakDays || 0) + 1
      : 1;
    const newLongest = Math.max(data.statistics.longestStreakDays || 0, newStreak);

    await supabase
      .from('user_statistics')
      .update({
        current_streak_days: newStreak,
        longest_streak_days: newLongest,
        last_activity_date: today,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    setData(prev => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        currentStreakDays: newStreak,
        longestStreakDays: newLongest,
        lastActivityDate: today,
      },
    }));
  }, [user?.id, data.statistics]);

  // -------------------- REFRESH --------------------

  const refreshData = useCallback(async () => {
    await loadData();
  }, [loadData]);

  // -------------------- CONTEXT VALUE --------------------

  const value: UserDataContextType = {
    isLoading,
    userProfile: data.userProfile,
    statistics: data.statistics,
    modules: data.modules,
    trackedOffers: data.trackedOffers,
    cvData: data.cvData,

    globalProgress,
    completedModulesCount,
    totalModulesCount,
    currentModule,
    isNewUser: isUserNew,
    canTrackMoreOffers,

    updateUserProfile,
    updateModuleProgress,
    completeModule,
    startModule,
    addTrackedOffer,
    updateTrackedOffer,
    removeTrackedOffer,
    updateCVData,
    incrementStudyTime,
    updateStreak,
    refreshData,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

// -------------------- HOOK --------------------

export function useUserData() {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}
