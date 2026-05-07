import { useState, useEffect, useCallback } from 'react';
import { moduleService } from '../services/supabase/module.service';
import { ModuleWithProgress } from '../types/index';
import { useAuth } from './useAuth';

export function useModules() {
    const { user } = useAuth();
    const [modules, setModules] = useState<ModuleWithProgress[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const loadModules = useCallback(async () => {
        if (!user?.id) return;

        setLoading(true);
        try {
            const data = await moduleService.getUserModulesWithProgress(user.id);
            setModules(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [user?.id]);

    useEffect(() => {
        loadModules();
    }, [loadModules]);

    const updateProgress = useCallback(async (moduleId: string, progress: number) => {
        if (!user?.id) return;
        await moduleService.updateProgress(user.id, moduleId, progress);
        setModules(prev => prev.map(module =>
            module.id === moduleId ? { ...module, progress } : module
        ));
    }, [user?.id]);

    const updateCompletedSteps = useCallback(async (moduleId: string, completedSteps: string[]) => {
        if (!user?.id) return;
        await moduleService.updateCompletedSteps(user.id, moduleId, completedSteps);
        setModules(prev => prev.map(module =>
            module.id === moduleId ? { ...module, completedSteps } : module
        ));
    }, [user?.id]);

    const unlockModule = useCallback(async (moduleId: string) => {
        if (!user?.id) return;
        await moduleService.unlockModule(user.id, moduleId);
    }, [user?.id]);

    const startModule = useCallback(async (moduleId: string) => {
        if (!user?.id) return;
        await moduleService.startModule(user.id, moduleId);
        setModules(prev => prev.map(module =>
            module.id === moduleId && module.status === 'available'
                ? { ...module, status: 'in_progress' }
                : module
        ));
    }, [user?.id]);

    const completeModule = useCallback(async (moduleId: string) => {
        if (!user?.id) return;
        await moduleService.completeModule(user.id, moduleId);
        setModules(prev => prev.map(module =>
            module.id === moduleId
                ? { ...module, status: 'completed', progress: 100, xp: 250 }
                : module
        ));
    }, [user?.id]);

    const globalProgress = modules.length > 0
        ? Math.round(modules.reduce((sum, module) => sum + module.progress, 0) / modules.length)
        : 0;

    const completedCount = modules.filter(module => module.status === 'completed').length;
    const currentModule = modules.find(module => module.status === 'available' || module.status === 'in_progress');

    const firstModule = modules.filter(module => module.orderIndex === 1)[0]
    const nextModule = modules.filter(module => module.orderIndex === currentModule?.orderIndex + 1)[0]

    return {
        modules,
        loading,
        error,
        globalProgress,
        completedCount,
        totalCount: modules.length,
        currentModule,
        nextModule,
        firstModule,
        updateProgress,
        updateCompletedSteps,
        unlockModule,
        startModule,
        completeModule,
        refresh: loadModules,
    };
}