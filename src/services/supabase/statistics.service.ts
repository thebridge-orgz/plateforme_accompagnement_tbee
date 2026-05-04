import { supabase } from '../../config/supabaseClient';
import { UserStatistics } from '../../types/index';

class StatisticsService {
    async getStatistics(userId: string): Promise<UserStatistics[]> {
        const { data, error } = await supabase
            .from('user_statistics')
            .select('*')
            .eq('user_id', userId)
            .maybeSingle();

        //console.log(`data : ${JSON.stringify(data, null, 2)}`);

        if (error) throw error;
        return (data);
    }

    async updateStatistics(userId: string, updates: Partial<UserStatistics>): Promise<void> {
        const dbUpdates = this.toDBFormat(updates);
        const { error } = await supabase
            .from('user_statistics')
            .update({ ...dbUpdates, updated_at: new Date().toISOString() })
            .eq('user_id', userId);

        if (error) throw error;
    }

    async incrementStudyTime(userId: string, minutes: number): Promise<void> {
        const today = new Date().toISOString().split('T')[0];
        const { error } = await supabase.rpc('increment_study_time', {
            p_user_id: userId,
            p_minutes: minutes,
            p_activity_date: today,
        });
        if (error) throw error;
    }

    async updateStreak(userId: string): Promise<void> {
        const { error } = await supabase.rpc('update_user_streak', {
            p_user_id: userId,
        });
        if (error) throw error;
    }

    private mapFromDB(raw: any): UserStatistics {
        return {
            id: raw.id,
            userId: raw.user_id,
            currentWeek: raw.current_week,
            modulesCompleted: raw.modules_completed,
            totalHoursSpent: raw.total_hours_spent,
            offersViewed: raw.offers_viewed,
            offersApplied: raw.offers_applied/*,
            totalLessonsCompleted: raw.total_lessons_completed ?? 0,
            totalLessonsValidated: raw.total_lessons_validated ?? 0,
            currentStreakDays: raw.current_streak_days ?? 0,
            longestStreakDays: raw.longest_streak_days ?? 0,
            lastActivityDate: raw.last_activity_date,
            totalTimeSpentMinutes: raw.total_time_spent_minutes ?? 0,
            totalApplications: raw.total_applications ?? 0,
            totalInterviews: raw.total_interviews ?? 0,*/
        };
    }

    private toDBFormat(updates: Partial<UserStatistics>): Record<string, any> {
        const dbUpdates: Record<string, any> = {};
        if (updates.currentWeek !== undefined) dbUpdates.current_week = updates.currentWeek;
        /*if (updates.totalLessonsCompleted !== undefined) dbUpdates.total_lessons_completed = updates.totalLessonsCompleted;
        if (updates.totalLessonsValidated !== undefined) dbUpdates.total_lessons_validated = updates.totalLessonsValidated;
        if (updates.currentStreakDays !== undefined) dbUpdates.current_streak_days = updates.currentStreakDays;
        if (updates.longestStreakDays !== undefined) dbUpdates.longest_streak_days = updates.longestStreakDays;
        if (updates.lastActivityDate !== undefined) dbUpdates.last_activity_date = updates.lastActivityDate;
        if (updates.totalTimeSpentMinutes !== undefined) dbUpdates.total_time_spent_minutes = updates.totalTimeSpentMinutes;
        if (updates.totalApplications !== undefined) dbUpdates.total_applications = updates.totalApplications;
        if (updates.totalInterviews !== undefined) dbUpdates.total_interviews = updates.totalInterviews;*/
        return dbUpdates;
    }
}

export const statisticsService = new StatisticsService();