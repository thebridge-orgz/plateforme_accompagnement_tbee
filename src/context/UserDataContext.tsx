// ============================================
// CONTEXTE GLOBAL DES DONNÉES UTILISATEUR
// ============================================
// Ce contexte gère l'état global de l'application pour l'utilisateur connecté
// Il sera connecté à Supabase après export du code

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { 
  UserProfile, 
  UserStatistics, 
  ModuleWithProgress,
  UserTrackedOffer,
  CVData,
  JobOffer,
  ModuleStatus
} from '@./types';
import { 
  initialDashboardData,
  calculateGlobalProgress,
  countCompletedModules,
  getCurrentModule,
  isNewUser,
  MAX_TRACKED_OFFERS,
  type DashboardData
} from '@/utils/initialState';

// -------------------- CONTEXT TYPES --------------------

interface UserDataContextType {
  // État
  isLoading: boolean;
  userProfile: Partial<UserProfile> | null;
  statistics: Omit<UserStatistics, 'id' | 'userId'>;
  modules: ModuleWithProgress[];
  trackedOffers: UserTrackedOffer[];
  cvData: Omit<CVData, 'id' | 'userId'>;
  
  // Computed values
  globalProgress: number;
  completedModulesCount: number;
  totalModulesCount: number;
  currentModule: ModuleWithProgress | null;
  isNewUser: boolean;
  canTrackMoreOffers: boolean;
  
  // Actions - User Profile
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  
  // Actions - Modules & Progress
  updateModuleProgress: (moduleId: string, progress: number) => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  startModule: (moduleId: string) => Promise<void>;
  
  // Actions - Tracked Offers
  addTrackedOffer: (offer: Omit<UserTrackedOffer, 'id' | 'userId' | 'trackedAt' | 'updatedAt'>) => Promise<void>;
  updateTrackedOffer: (offerId: string, updates: Partial<UserTrackedOffer>) => Promise<void>;
  removeTrackedOffer: (offerId: string) => Promise<void>;
  
  // Actions - CV
  updateCVData: (updates: Partial<CVData>) => Promise<void>;
  
  // Actions - Statistics (automatically updated by other actions)
  incrementStudyTime: (minutes: number) => Promise<void>;
  updateStreak: () => Promise<void>;
  
  // Refresh data
  refreshData: () => Promise<void>;
}

// -------------------- CONTEXT --------------------

const UserDataContext = createContext<UserDataContextType | undefined>(undefined);

// -------------------- PROVIDER --------------------

interface UserDataProviderProps {
  children: React.ReactNode;
  initialData?: Partial<DashboardData>;
}

export function UserDataProvider({ children, initialData }: UserDataProviderProps) {
  // État local (sera remplacé par les données Supabase après export)
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DashboardData>(
    initialData ? { ...initialDashboardData, ...initialData } : initialDashboardData
  );

  // -------------------- INITIALIZATION --------------------

  useEffect(() => {
    // TODO: fetch from Supabase
    // Simuler le chargement des données
    const loadData = async () => {
      setIsLoading(true);
      
      try {
        // TODO: Remplacer par un vrai appel Supabase
        // const { data: userData, error } = await supabase
        //   .from('users_profiles')
        //   .select('*, user_statistics(*), ...')
        //   .eq('id', userId)
        //   .single();
        
        // Pour l'instant, utiliser les données initiales
        await new Promise(resolve => setTimeout(resolve, 500)); // Simuler latence réseau
        
        // Si initialData fourni, l'utiliser
        if (initialData) {
          setData({ ...initialDashboardData, ...initialData });
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [initialData]);

  // -------------------- COMPUTED VALUES --------------------

  const globalProgress = calculateGlobalProgress(data.modules);
  const completedModulesCount = countCompletedModules(data.modules);
  const totalModulesCount = data.modules.length;
  const currentModule = getCurrentModule(data.modules);
  const isUserNew = isNewUser(data.statistics);
  const canTrackMoreOffers = data.trackedOffers.length < MAX_TRACKED_OFFERS;

  // -------------------- ACTIONS - USER PROFILE --------------------

  const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    // TODO: update Supabase
    // await supabase
    //   .from('users_profiles')
    //   .update(updates)
    //   .eq('id', userId);
    
    setData(prev => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...updates }
    }));
  }, []);

  // -------------------- ACTIONS - MODULES --------------------

  const updateModuleProgress = useCallback(async (moduleId: string, progress: number) => {
    // TODO: update Supabase user_lesson_progress
    
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId 
          ? { ...m, progress: Math.min(100, Math.max(0, progress)) }
          : m
      )
    }));
  }, []);

  const startModule = useCallback(async (moduleId: string) => {
    // TODO: update Supabase
    
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId && m.status === 'available'
          ? { ...m, status: 'in_progress' as ModuleStatus }
          : m
      ),
      statistics: {
        ...prev.statistics,
        lastActivityDate: new Date().toISOString().split('T')[0]
      }
    }));
  }, []);

  const completeModule = useCallback(async (moduleId: string) => {
    // TODO: update Supabase + unlock next module
    
    const moduleIndex = data.modules.findIndex(m => m.id === moduleId);
    
    setData(prev => {
      const updatedModules = [...prev.modules];
      
      // Marquer le module comme complété
      if (updatedModules[moduleIndex]) {
        updatedModules[moduleIndex] = {
          ...updatedModules[moduleIndex],
          status: 'completed' as ModuleStatus,
          progress: 100,
          xp: 250 // XP fixe par module
        };
      }
      
      // Débloquer le module suivant
      if (moduleIndex + 1 < updatedModules.length) {
        if (updatedModules[moduleIndex + 1]?.status === 'locked') {
          updatedModules[moduleIndex + 1] = {
            ...updatedModules[moduleIndex + 1],
            status: 'available' as ModuleStatus
          };
        }
      }
      
      return {
        ...prev,
        modules: updatedModules,
        statistics: {
          ...prev.statistics,
          currentWeek: Math.min(4, prev.statistics.currentWeek + 1),
          lastActivityDate: new Date().toISOString().split('T')[0]
        }
      };
    });
  }, [data.modules]);

  // -------------------- ACTIONS - TRACKED OFFERS --------------------

  const addTrackedOffer = useCallback(async (
    offer: Omit<UserTrackedOffer, 'id' | 'userId' | 'trackedAt' | 'updatedAt'>
  ) => {
    if (data.trackedOffers.length >= MAX_TRACKED_OFFERS) {
      throw new Error(`Maximum de ${MAX_TRACKED_OFFERS} offres atteint`);
    }
    
    // TODO: insert into Supabase user_tracked_offers
    
    const newOffer: UserTrackedOffer = {
      ...offer,
      id: `offer-${Date.now()}`,
      userId: data.userProfile.id || 'temp-user-id',
      trackedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setData(prev => ({
      ...prev,
      trackedOffers: [newOffer, ...prev.trackedOffers]
    }));
  }, [data.trackedOffers.length, data.userProfile.id]);

  const updateTrackedOffer = useCallback(async (
    offerId: string, 
    updates: Partial<UserTrackedOffer>
  ) => {
    // TODO: update Supabase user_tracked_offers
    
    setData(prev => ({
      ...prev,
      trackedOffers: prev.trackedOffers.map(o =>
        o.id === offerId
          ? { ...o, ...updates, updatedAt: new Date().toISOString() }
          : o
      ),
      statistics: updates.applicationStatus === 'applied' && prev.trackedOffers.find(o => o.id === offerId)?.applicationStatus !== 'applied'
        ? { ...prev.statistics, totalApplications: prev.statistics.totalApplications + 1 }
        : updates.applicationStatus === 'interview_scheduled' && prev.trackedOffers.find(o => o.id === offerId)?.applicationStatus !== 'interview_scheduled'
        ? { ...prev.statistics, totalInterviews: prev.statistics.totalInterviews + 1 }
        : prev.statistics
    }));
  }, []);

  const removeTrackedOffer = useCallback(async (offerId: string) => {
    // TODO: delete from Supabase user_tracked_offers
    
    setData(prev => ({
      ...prev,
      trackedOffers: prev.trackedOffers.filter(o => o.id !== offerId)
    }));
  }, []);

  // -------------------- ACTIONS - CV --------------------

  const updateCVData = useCallback(async (updates: Partial<CVData>) => {
    // TODO: update Supabase + upload file to Storage
    
    setData(prev => ({
      ...prev,
      cvData: { ...prev.cvData, ...updates, updatedAt: new Date().toISOString() }
    }));
  }, []);

  // -------------------- ACTIONS - STATISTICS --------------------

  const incrementStudyTime = useCallback(async (minutes: number) => {
    // TODO: update Supabase user_statistics
    
    setData(prev => ({
      ...prev,
      statistics: {
        ...prev.statistics,
        totalTimeSpentMinutes: prev.statistics.totalTimeSpentMinutes + minutes,
        lastActivityDate: new Date().toISOString().split('T')[0]
      }
    }));
  }, []);

  const updateStreak = useCallback(async () => {
    // TODO: update Supabase user_statistics with streak calculation
    
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = data.statistics.lastActivityDate;
    
    if (lastActivity !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      setData(prev => {
        const newStreak = lastActivity === yesterdayStr 
          ? prev.statistics.currentStreakDays + 1 
          : 1;
        
        return {
          ...prev,
          statistics: {
            ...prev.statistics,
            currentStreakDays: newStreak,
            longestStreakDays: Math.max(prev.statistics.longestStreakDays, newStreak),
            lastActivityDate: today
          }
        };
      });
    }
  }, [data.statistics.lastActivityDate]);

  // -------------------- REFRESH --------------------

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // TODO: re-fetch from Supabase
      await new Promise(resolve => setTimeout(resolve, 300));
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // -------------------- CONTEXT VALUE --------------------

  const value: UserDataContextType = {
    // État
    isLoading,
    userProfile: data.userProfile,
    statistics: data.statistics,
    modules: data.modules,
    trackedOffers: data.trackedOffers,
    cvData: data.cvData,
    
    // Computed
    globalProgress,
    completedModulesCount,
    totalModulesCount,
    currentModule,
    isNewUser: isUserNew,
    canTrackMoreOffers,
    
    // Actions
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
