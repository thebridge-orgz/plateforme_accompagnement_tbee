import { supabase } from '../../config/supabaseClient';
import { Module, ModuleWithProgress, ModuleResource } from '../../types/index';
import { mapModuleFromDB, mapModuleProgressFromDB } from '../../utils/mappers';

class ModuleService {
    async getAllModules(): Promise<Module[]> {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .eq('is_published', true)
            .order('week_number')
            .order('order_index');

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

        // Tri par semaine puis position — détermine la séquence de déblocage
        const sorted = [...modules].sort(
            (a, b) => a.weekNumber - b.weekNumber || a.orderIndex - b.orderIndex
        );

        // Boucle séquentielle : chaque module utilise le statut EFFECTIF du précédent
        // (pas son statut brut en DB) pour décider s'il est accessible.
        // Cela garantit qu'un module intercalé bloque bien les suivants.
        const result: ModuleWithProgress[] = [];

        for (let i = 0; i < sorted.length; i++) {
            const module = sorted[i];
            const progress = progressMap.get(module.id);

            // Le précédent doit être 'completed' (effectif) pour débloquer ce module.
            // Le tout premier module est toujours accessible.
            const prevCompleted = i === 0 || result[i - 1].status === 'completed';

            if (progress) {
                result.push({
                    ...module,
                    // Si le précédent n'est pas encore terminé, on verrouille même si
                    // la DB indique 'in_progress' (module intercalé après coup).
                    status: prevCompleted ? progress.status : 'locked',
                    progress: progress.progress,
                    xp: progress.xp,
                    completedSteps: progress.completedSteps,
                    moduleId: progress.moduleId,
                });
            } else {
                result.push({
                    ...module,
                    status: prevCompleted ? 'available' : 'locked',
                    progress: 0,
                    xp: 0,
                    completedSteps: [],
                    moduleId: module.id,
                });
            }
        }

        return result;
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
        // ignoreDuplicates: ne pas écraser un enregistrement existant (progression déjà en cours)
        const { error } = await supabase
            .from('user_module_progress')
            .upsert({
                user_id: userId,
                module_id: moduleId,
                status: 'available',
                completed_steps: [],
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id,module_id', ignoreDuplicates: true });

        if (error) throw error;
    }

    async startModule(userId: string, moduleId: string): Promise<void> {
        // Upsert : crée la ligne si elle n'existe pas encore
        // (cas d'un module ajouté après que l'étudiant ait déjà débloqué le précédent)
        const { error } = await supabase
            .from('user_module_progress')
            .upsert({
                user_id: userId,
                module_id: moduleId,
                status: 'in_progress',
                progress: 0,
                completed_steps: [],
                started_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
            }, { onConflict: 'user_id,module_id' });

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

    // ── Admin methods ──────────────────────────────────────────────────────────

    async uploadModuleResource(file: File): Promise<string> {
        const ext = file.name.split('.').pop() ?? 'bin';
        const path = `${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;

        const { error } = await supabase.storage
            .from('module-resources')
            .upload(path, file, { upsert: false });

        if (error) throw error;

        const { data } = supabase.storage
            .from('module-resources')
            .getPublicUrl(path);

        return data.publicUrl;
    }

    async getAllModulesAdmin(): Promise<Module[]> {
        const { data, error } = await supabase
            .from('modules')
            .select('*')
            .order('week_number')
            .order('order_index');

        if (error) throw error;
        return data.map(mapModuleFromDB);
    }

    async createModule(input: {
        title: string;
        description: string;
        weekNumber: number;
        orderIndex: number;
        isPublished: boolean;
        resources?: ModuleResource[] | null;
    }): Promise<Module> {
        const { data, error } = await supabase
            .from('modules')
            .insert({
                title: input.title,
                description: input.description,
                week_number: input.weekNumber,
                order_index: input.orderIndex,
                is_published: input.isPublished,
                unlock_condition: 'none',
                resources: input.resources ?? null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            })
            .select()
            .single();

        if (error) throw error;
        return mapModuleFromDB(data);
    }

    async updateModule(moduleId: string, input: Partial<{
        title: string;
        description: string;
        weekNumber: number;
        orderIndex: number;
        isPublished: boolean;
        resources: ModuleResource[] | null;
    }>): Promise<void> {
        const updates: Record<string, unknown> = {
            updated_at: new Date().toISOString(),
        };
        if (input.title !== undefined) updates.title = input.title;
        if (input.description !== undefined) updates.description = input.description;
        if (input.weekNumber !== undefined) updates.week_number = input.weekNumber;
        if (input.orderIndex !== undefined) updates.order_index = input.orderIndex;
        if (input.isPublished !== undefined) updates.is_published = input.isPublished;
        if (input.resources !== undefined) updates.resources = input.resources;

        const { error } = await supabase
            .from('modules')
            .update(updates)
            .eq('id', moduleId);

        if (error) throw error;
    }

    async deleteModule(moduleId: string): Promise<void> {
        const { error } = await supabase
            .from('modules')
            .delete()
            .eq('id', moduleId);

        if (error) throw error;
    }
}

export const moduleService = new ModuleService();