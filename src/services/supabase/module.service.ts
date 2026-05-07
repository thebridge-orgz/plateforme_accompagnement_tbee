import { supabase } from '../../config/supabaseClient';
import { Module, ModuleWithProgress, ModuleStatus } from '../../types/index';
import { mapModuleFromDB, mapModuleProgressFromDB } from '../../utils/mappers';

class ModuleService {
    async getAllModules(): Promise<Module[]> {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('is_published', true)
            .order('order_index');
        //console.log('supabase', await supabase.from('user_tracked_offers').select('*'));

        if (error) throw error;
        return (data).map(mapModuleFromDB);
    }

    async getUserModulesWithProgress(userId: string): Promise<ModuleWithProgress[]> {
        const [modules, progresses] = await Promise.all([
            this.getAllModules(),
            this.getUserModuleProgress(userId),
        ]);

        const progressMap = new Map(
            progresses.map(progress => [progress.moduleId, progress])
        );

        return modules.map(module => {
            const progress = progressMap.get(module.id);
            //console.log(`module id : ${module.id}\nweek number : ${module.weekNumber}\n\nprogress : ${JSON.stringify(progress, null, 2)}`);

            if (!progress) {
                return {
                    ...module,
                    status: 'locked',
                    progress: 0,
                    xp: 0,
                    completedSteps: [],
                    moduleId: module.id
                };
            }

            return {
                ...module,
                status: progress.status,
                progress: progress.progress,
                xp: progress.xp,
                completedSteps: progress.completedSteps,
                moduleId: progress.moduleId
            };
        });
    }

    async getUserModuleProgress(userId: string) {
        const { data, error } = await supabase
            .from('user_module_progress')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return (data || []).map(mapModuleProgressFromDB);
    }

    async updateProgress(userId: string, moduleId: string, progress: number): Promise<void> {
        const { error } = await supabase
            .from('user_module_progress')
            .update({
                progress: Math.min(100, Math.max(0, progress)),
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('module_id', moduleId);

        if (error) throw error;
    }

    async updateCompletedSteps(userId: string, moduleId: string, completedSteps: string[]): Promise<void> {
        const { error } = await supabase
            .from('user_module_progress')
            .update({
                completed_steps: completedSteps,
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('module_id', moduleId);;

        if (error) throw error;
    }

    async unlockModule(userId: string, moduleId: string): Promise<void> {
        const { error } = await supabase
            .from('user_module_progress')
            .insert({
                user_id: userId,
                module_id: moduleId,
                status: 'available',
                completed_steps: [],
                created_at: new Date().toISOString()
            });

        if (error) throw error;
    }

    async startModule(userId: string, moduleId: string): Promise<void> {
        const { error } = await supabase
            .from('user_module_progress')
            .update({
                status: 'in_progress',
                progress: 0,
                started_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('module_id', moduleId);

        if (error) throw error;
    }

    async completeModule(userId: string, moduleId: string): Promise<void> {
        const { error } = await supabase
            .from('user_module_progress')
            .update({
                status: 'completed',
                progress: 100,
                xp: 250,
                completed_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .eq('user_id', userId)
            .eq('module_id', moduleId);

        if (error) throw error;
    }
}

export const moduleService = new ModuleService();