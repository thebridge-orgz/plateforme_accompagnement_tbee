import { supabase } from '../../config/supabaseClient';

type NotificationType = 'module_completed' | 'new_module' | 'weekly_report' | 'cv_reviewed';

async function callEdgeFunction(type: NotificationType, userId: string, data?: Record<string, any>) {
    const { error } = await supabase.functions.invoke('send-notification', {
        body: { type, userId, data },
    });
    if (error) console.error('Notification error:', error);
}

export const notificationService = {
    onModuleCompleted(userId: string, moduleTitle: string) {
        return callEdgeFunction('module_completed', userId, { moduleTitle });
    },
    onNewModulePublished(userId: string, moduleTitle: string, moduleDesc: string) {
        return callEdgeFunction('new_module', userId, { moduleTitle, moduleDesc });
    },
    onWeeklyReport(userId: string, completedCount: number, totalCount: number, globalProgress: number) {
        return callEdgeFunction('weekly_report', userId, { completedCount, totalCount, globalProgress });
    },
    onCvReviewed(userId: string, status: string, feedback: string) {
        return callEdgeFunction('cv_reviewed', userId, { status, feedback });
    },
};
