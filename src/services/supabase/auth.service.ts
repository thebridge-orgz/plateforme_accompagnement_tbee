import { supabase } from '../../config/supabaseClient';
import { UserRole } from '../../types/index';
import { UserProfile } from '../../types/user';

export interface SignUpData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: UserRole;
}

export interface SignInData {
    email: string;
    password: string;
    expectedRole?: UserRole;
}

class AuthService {
    /**
     * Inscription d'un nouvel utilisateur
     */
    async signUp({ email, password, firstName, lastName, role = 'student' }: SignUpData) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { first_name: firstName.trim().replace(firstName.charAt(0),firstName.charAt(0).toUpperCase()), last_name: lastName.trim().toUpperCase(), role },
            },
        });
        if (error) throw error;
        return data;
    }

    /**
     * Connexion avec vérification de rôle
     */
    async signIn({ email, password, expectedRole }: SignInData) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) throw error;

        // Vérification du rôle si nécessaire
        if (expectedRole && data.user) {
            const profile = await this.getProfile(data.user.id);
            const metaRole = data.user.user_metadata?.role as UserRole | undefined;
            const knownRole = profile?.role || metaRole;

            if (knownRole && knownRole !== expectedRole) {
                await supabase.auth.signOut();
                throw new Error(
                    `Accès refusé : réservé aux ${expectedRole === 'admin' ? 'administrateurs' : 'étudiants'}`
                );
            }
        }

        return data;
    }

    /**
     * Récupérer le profil depuis la base de données
     */
    async getProfile(userId: string): Promise<UserProfile | null> {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

        if (error) {
            console.warn('Error fetching profile:', error.message);
            return null;
        }

        if (!data) return null;

        // Mapper les champs snake_case → camelCase
        return {
            id: data.id,
            email: data.email,
            firstName: data.first_name,
            lastName: data.last_name,
            role: data.role,
            hasRQTH: data.has_rqth,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            onboardingCompleted: data.onboarding_completed,
            onboardingData: data.onboarding_data,
            phone: data.phone,
            birthDate: data.birth_date,
            address: data.address,
            currentLevel: data.current_level,
            targetLevel: data.target_level,
            fieldOfInterest: data.field_of_interest,
            city: data.city,
            postalCode: data.postal_code,
            mobilityRadius: data.mobility_radius,
            isActive: data.is_active,
            onboardingStep: data.onboarding_step
        } as UserProfile;
    }

    /**
     * Déconnexion
     */
    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    }

    /**
     * Récupérer la session courante
     */
    async getCurrentSession() {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        return session;
    }

    /**
     * Réinitialisation du mot de passe
     */
    async resetPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
    }

    async saveOnboarding(id: string, data: UserProfile) {
        const { error } = await supabase.from('profiles').update({
            phone: data.phone,
            birth_date: data.birthDate,
            onboarding_completed: data.onboardingCompleted,
            onboarding_step: data.onboardingStep,
            current_level: data.currentLevel,
            postal_code: data.postalCode,
            address: data.address,
            city: data.city
        }).eq('id', id);
        
        if (error) throw error;
    }

    /**
     * Écouter les changements d'état d'authentification
     */
    onAuthStateChange(callback: (event: string, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback);
    }
}

export const authService = new AuthService();