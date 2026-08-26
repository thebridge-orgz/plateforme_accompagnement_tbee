import { useState, useEffect, useCallback } from 'react';
import {
    profileService,
    moduleService,
    cvService,
    offerService,
    statisticsService
} from '../services/supabase';
import { UserProfile, ModuleWithProgress, TrackedOffer, CVData, UserStatistics } from '../types/index';
import { useAuth } from './useAuth';

interface UserDataState {
    profile: UserProfile | null;
    modules: ModuleWithProgress[];
    offers: TrackedOffer[];
    cvData: CVData | null;
    statistics: UserStatistics | null;
    loading: boolean;
    error: Error | null;
}

interface UseUserDataReturn extends UserDataState {
    // Profile actions
    updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
    completeOnboarding: (onboardingData: any) => Promise<void>;

    // Module actions
    updateModuleProgress: (moduleId: string, progress: number) => Promise<void>;
    completeModule: (moduleId: string) => Promise<void>;
    startModule: (moduleId: string) => Promise<void>;
    saveModuleStepProgress: (moduleId: string, completedSteps: string[]) => Promise<void>;

    // CV actions
    uploadCV: (file: File) => Promise<void>;
    updateCV: (updates: Partial<CVData>) => Promise<void>;

    // Offer actions
    addOffer: (offer: Omit<TrackedOffer, 'id' | 'userId' | 'trackedAt' | 'updatedAt'>) => Promise<void>;
    updateOffer: (offerId: string, updates: Partial<TrackedOffer>) => Promise<void>;
    removeOffer: (offerId: string) => Promise<void>;

    // Statistics actions
    incrementStudyTime: (minutes: number) => Promise<void>;
    updateStreak: () => Promise<void>;

    // Computed values
    globalProgress: number;
    completedModulesCount: number;
    totalModulesCount: number;
    currentModule: ModuleWithProgress | null;  // Changé de 'undefined' à 'null'
    canAddMoreOffers: boolean;

    // Utilities
    refresh: () => Promise<void>;
}

const MAX_TRACKED_OFFERS = 15;

export function useUserData(): UseUserDataReturn {
    const { user } = useAuth();
    const [state, setState] = useState<UserDataState>({
        profile: null,
        modules: [],
        offers: [],
        cvData: null,
        statistics: null,
        loading: true,
        error: null,
    });

    // Chargement de toutes les données utilisateur
    const loadAllData = useCallback(async () => {
        if (!user?.id) {
            setState(prev => ({ ...prev, loading: false, profile: null }));
            return;
        }

        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const [profile, modules, offers, cvData, statistics] = await Promise.all([
                profileService.getProfile(user.id),
                moduleService.getUserModulesWithProgress(user.id),
                offerService.getUserTrackedOffers(user.id),
                cvService.getCVData(user.id),
                statisticsService.getStatistics(user.id),
            ]);

            setState({
                profile,
                modules,
                offers,
                cvData,
                statistics,
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Error loading user data:', error);
            setState(prev => ({
                ...prev,
                loading: false,
                error: error as Error,
            }));
        }
    }, [user?.id]);

    // Chargement initial
    useEffect(() => {
        loadAllData();
    }, [loadAllData]);

    // Actions Profile
    const updateProfile = useCallback(async (updates: Partial<UserProfile>) => {
        if (!user?.id) throw new Error('No user logged in');

        await profileService.updateProfile(user.id, updates);
        setState(prev => ({
            ...prev,
            profile: prev.profile ? { ...prev.profile, ...updates } : null,
        }));
    }, [user?.id]);

    const completeOnboarding = useCallback(async (onboardingData: any) => {
        if (!user?.id) throw new Error('No user logged in');

        await profileService.completeOnboarding(user.id, onboardingData);
        setState(prev => ({
            ...prev,
            profile: prev.profile ? {
                ...prev.profile,
                onboardingCompleted: true,
                onboardingData
            } : null,
        }));
    }, [user?.id]);

    // Actions Modules
    const updateModuleProgress = useCallback(async (moduleId: string, progress: number) => {
        if (!user?.id) throw new Error('No user logged in');

        await moduleService.updateProgress(user.id, moduleId, progress);
        setState(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
                m.id === moduleId ? { ...m, progress } : m
            ),
        }));
    }, [user?.id]);

    const startModule = useCallback(async (moduleId: string) => {
        if (!user?.id) throw new Error('No user logged in');

        await moduleService.startModule(user.id, moduleId);
        setState(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
                m.id === moduleId && m.status === 'available'
                    ? { ...m, status: 'in_progress' }
                    : m
            ),
        }));
    }, [user?.id]);

    const completeModule = useCallback(async (moduleId: string) => {
        if (!user?.id) throw new Error('No user logged in');

        await moduleService.completeModule(user.id, moduleId);

        // Mettre à jour le module complété
        setState(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
                m.id === moduleId
                    ? { ...m, status: 'completed', progress: 100 }
                    : m
            ),
        }));

        // Incrémenter la semaine si nécessaire
        const currentWeek = state.statistics?.currentWeek || 1;
        if (currentWeek < 4) {
            await statisticsService.updateStatistics(user.id, {
                currentWeek: currentWeek + 1,
            });
            setState(prev => ({
                ...prev,
                statistics: prev.statistics
                    ? { ...prev.statistics, currentWeek: currentWeek + 1 }
                    : null,
            }));
        }
    }, [user?.id, state.statistics?.currentWeek]);

    const saveModuleStepProgress = useCallback(async (moduleId: string, completedSteps: string[]) => {
        if (!user?.id) throw new Error('No user logged in');

        await moduleService.updateCompletedSteps(user.id, moduleId, completedSteps);
        setState(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
                m.id === moduleId ? { ...m, completedSteps } : m
            ),
        }));
    }, [user?.id]);

    // Actions CV
    const uploadCV = useCallback(async (file: File) => {
        if (!user?.id) throw new Error('No user logged in');

        await cvService.saveCVData(user.id, { status: 'uploaded' }, file);
        const updatedCV = await cvService.getCVData(user.id);
        setState(prev => ({ ...prev, cvData: updatedCV }));
    }, [user?.id]);

    const updateCV = useCallback(async (updates: Partial<CVData>) => {
        if (!user?.id) throw new Error('No user logged in');

        await cvService.saveCVData(user.id, updates);
        setState(prev => ({
            ...prev,
            cvData: prev.cvData ? { ...prev.cvData, ...updates } : null,
        }));
    }, [user?.id]);

    // Actions Offres
    const addOffer = useCallback(async (offer: Omit<TrackedOffer, 'id' | 'userId' | 'trackedAt' | 'updatedAt'>) => {
        if (!user?.id) throw new Error('No user logged in');
        if (state.offers.length >= MAX_TRACKED_OFFERS) {
            throw new Error(`Maximum de ${MAX_TRACKED_OFFERS} offres atteint`);
        }

        const newOffer = await offerService.addTrackedOffer(user.id, offer);
        setState(prev => ({
            ...prev,
            offers: [newOffer, ...prev.offers],
        }));
    }, [user?.id, state.offers.length]);

    const updateOffer = useCallback(async (offerId: string, updates: Partial<TrackedOffer>) => {
        if (!user?.id) throw new Error('No user logged in');

        await offerService.updateTrackedOffer(offerId, updates);

        // Mettre à jour les statistiques si le statut change
        const oldOffer = state.offers.find(o => o.id === offerId);
        const wasApplied = oldOffer?.applicationStatus === 'applied';
        const nowApplied = updates.applicationStatus === 'applied' && !wasApplied;
        const wasInterview = oldOffer?.applicationStatus === 'interview';
        const nowInterview = updates.applicationStatus === 'interview' && !wasInterview;

        setState(prev => ({
            ...prev,
            offers: prev.offers.map(o =>
                o.id === offerId ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o
            ),
            statistics: prev.statistics ? {
                ...prev.statistics,
                totalApplications: nowApplied
                    ? (prev.statistics.totalApplications || 0) + 1
                    : wasApplied && updates.applicationStatus !== 'applied'
                        ? Math.max(0, (prev.statistics.totalApplications || 0) - 1)
                        : prev.statistics.totalApplications,
                totalInterviews: nowInterview
                    ? (prev.statistics.totalInterviews || 0) + 1
                    : wasInterview && updates.applicationStatus !== 'interview'
                        ? Math.max(0, (prev.statistics.totalInterviews || 0) - 1)
                        : prev.statistics.totalInterviews,
            } : null,
        }));
    }, [user?.id, state.offers, state.statistics]);

    const removeOffer = useCallback(async (offerId: string) => {
        if (!user?.id) throw new Error('No user logged in');

        await offerService.removeTrackedOffer(offerId);
        setState(prev => ({
            ...prev,
            offers: prev.offers.filter(o => o.id !== offerId),
        }));
    }, [user?.id]);

    // Actions Statistiques
    const incrementStudyTime = useCallback(async (minutes: number) => {
        if (!user?.id) throw new Error('No user logged in');

        await statisticsService.incrementStudyTime(user.id, minutes);
        setState(prev => ({
            ...prev,
            statistics: prev.statistics ? {
                ...prev.statistics,
                totalTimeSpentMinutes: (prev.statistics.totalTimeSpentMinutes || 0) + minutes,
                lastActivityDate: new Date().toISOString().split('T')[0],
            } : null,
        }));
    }, [user?.id]);

    const updateStreak = useCallback(async () => {
        if (!user?.id) throw new Error('No user logged in');

        await statisticsService.updateStreak(user.id);
        const updatedStats = await statisticsService.getStatistics(user.id);
        setState(prev => ({
            ...prev,
            statistics: updatedStats,
        }));
    }, [user?.id]);

    // Valeurs calculées - CORRECTION ICI
    const globalProgress = state.modules.length > 0
        ? Math.round(state.modules.reduce((sum, m) => sum + m.progress, 0) / state.modules.length)
        : 0;

    const completedModulesCount = state.modules.filter(m => m.status === 'completed').length;
    const totalModulesCount = state.modules.length;

    // Correction: Convertir 'undefined' en 'null'
    const currentModule: ModuleWithProgress | null = state.modules.find(m => m.status === 'in_progress')
        || state.modules.find(m => m.status === 'available')
        || null;  // ← Transformation explicite de undefined en null

    const canAddMoreOffers = state.offers.length < MAX_TRACKED_OFFERS;

    return {
        ...state,
        updateProfile,
        completeOnboarding,
        updateModuleProgress,
        completeModule,
        startModule,
        saveModuleStepProgress,
        uploadCV,
        updateCV,
        addOffer,
        updateOffer,
        removeOffer,
        incrementStudyTime,
        updateStreak,
        globalProgress,
        completedModulesCount,
        totalModulesCount,
        currentModule,
        canAddMoreOffers,
        refresh: loadAllData,
    };
}