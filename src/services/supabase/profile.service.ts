import { supabase } from '../../config/supabaseClient';
import { UserProfile } from '../../types/index';
import { mapProfileFromDB } from '../../utils/mappers';

class ProfileService {
    async getProfile(userId: string): Promise<UserProfile | null> {
        console.log('getProfile called for userId:', userId);

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('getProfile error details:', {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                    hint: error.hint
                });

                // Si l'erreur est "PGRST116" (0 rows), retourner null au lieu de lancer une erreur
                if (error.code === 'PGRST116') {
                    console.log('No profile found for user:', userId);
                    return null;
                }

                throw error;
            }

            console.log('getProfile success:', data);
            return data;
        } catch (error) {
            console.error('getProfile exception:', error);
            return null;
        }
    }

    async updateProfile(userId: string, updates: Partial<UserProfile>): Promise<void> {
        const dbUpdates = this.toDBFormat(updates);
        const { error } = await supabase
            .from('profiles')
            .update({ ...dbUpdates, updated_at: new Date().toISOString() })
            .eq('id', userId);

        if (error) throw error;
    }

    async completeOnboarding(userId: string, onboardingData: any): Promise<void> {
        const { error } = await supabase
            .from('profiles')
            .update({
                onboarding_completed: true,
                onboarding_data: onboardingData,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);

        if (error) throw error;
    }

    async getNotificationPreferences(userId: string) {
        const { data, error } = await supabase
            .from('profiles')
            .select('notification_email, notification_module_updates, notification_progress_reports, notification_tips')
            .eq('id', userId)
            .single();
        if (error) throw error;
        return {
            emailNotifications: data?.notification_email ?? true,
            moduleUpdates: data?.notification_module_updates ?? true,
            progressReports: data?.notification_progress_reports ?? true,
            tips: data?.notification_tips ?? false,
        };
    }

    async saveNotificationPreferences(userId: string, prefs: {
        emailNotifications: boolean;
        moduleUpdates: boolean;
        progressReports: boolean;
        tips: boolean;
    }): Promise<void> {
        const { error } = await supabase
            .from('profiles')
            .update({
                notification_email: prefs.emailNotifications,
                notification_module_updates: prefs.moduleUpdates,
                notification_progress_reports: prefs.progressReports,
                notification_tips: prefs.tips,
                updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        if (error) throw error;
    }

    async getAllStudents(): Promise<UserProfile[]> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'student')
            .order('created_at', { ascending: false });

        if (error) throw error;
        return (data || []).map(mapProfileFromDB);
    }

    private toDBFormat(updates: Partial<UserProfile>): Record<string, any> {
        const dbUpdates: Record<string, any> = {};
        if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
        if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.birthDate !== undefined) dbUpdates.birth_date = updates.birthDate;
        if (updates.hasRQTH !== undefined) dbUpdates.has_rqth = updates.hasRQTH;
        if (updates.address !== undefined) dbUpdates.address = updates.address;
        if (updates.currentLevel !== undefined) dbUpdates.current_level = updates.currentLevel;
        if (updates.targetLevel !== undefined) dbUpdates.target_level = updates.targetLevel;
        if (updates.fieldOfInterest !== undefined) dbUpdates.field_of_interest = updates.fieldOfInterest;
        if (updates.city !== undefined) dbUpdates.city = updates.city;
        if (updates.postalCode !== undefined) dbUpdates.postal_code = updates.postalCode;
        if (updates.mobilityRadius !== undefined) dbUpdates.mobility_radius = updates.mobilityRadius;
        return dbUpdates;
    }
}

export const profileService = new ProfileService();