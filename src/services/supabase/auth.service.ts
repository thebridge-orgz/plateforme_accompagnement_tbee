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
                data: { first_name: firstName.trim().replace(firstName.charAt(0), firstName.charAt(0).toUpperCase()), last_name: lastName.trim().toUpperCase(), role },
                emailRedirectTo: `${window.location.origin}/sign-in`,
            },
        });
        if (error) throw error;
        return data;
    }

    async resendConfirmation(email: string) {
        const { error } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/sign-in`,
            },
        });
        if (error) throw error;
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
            profilePictureUrl: data.profile_picture_url, // ✅ Ajouter ce mapping
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

    async updateProfil(id: string, data: Partial<UserProfile>) {
        const updateData: any = {};

        if (data.firstName !== undefined) updateData.first_name = data.firstName;
        if (data.lastName !== undefined) updateData.last_name = data.lastName;
        if (data.phone !== undefined) updateData.phone = data.phone;
        if (data.birthDate !== undefined) updateData.birth_date = data.birthDate;
        if (data.hasRQTH !== undefined) updateData.has_rqth = data.hasRQTH;
        if (data.currentLevel !== undefined) updateData.current_level = data.currentLevel;
        if (data.city !== undefined) updateData.city = data.city;
        if (data.postalCode !== undefined) updateData.postal_code = data.postalCode;
        if (data.address !== undefined) updateData.address = data.address;
        if (data.profilePictureUrl !== undefined) updateData.profile_picture_url = data.profilePictureUrl; // ✅ Ajouter la photo

        const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', id);

        if (error) throw error;
    }

    /**
     * Upload de la photo de profil
     */
    async uploadProfilePicture(userId: string, file: File): Promise<string> {
        // Vérifier le type de fichier
        if (!file.type.startsWith('image/')) {
            throw new Error('Veuillez sélectionner une image valide');
        }

        // Vérifier la taille (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('L\'image ne doit pas dépasser 5MB');
        }

        // Générer un nom de fichier unique
        const fileExt = file.name.split('.').pop();
        const fileName = `${userId}/avatar_${Date.now()}.${fileExt}`;

        // Upload vers Supabase Storage
        const { error: uploadError } = await supabase.storage
            .from('profile-pictures')
            .upload(fileName, file, { upsert: true });

        if (uploadError) throw uploadError;

        // Récupérer l'URL publique
        const { data: urlData } = supabase.storage
            .from('profile-pictures')
            .getPublicUrl(fileName);

        // Mettre à jour le profil avec l'URL
        await this.updateProfil(userId, { profilePictureUrl: urlData.publicUrl });

        return urlData.publicUrl;
    }

    /**
    * Supprimer la photo de profil
    */
    async deleteProfilePicture(userId: string, imageUrl: string | null) {
        if (!imageUrl) return;

        // Extraire le chemin du fichier depuis l'URL
        const urlParts = imageUrl.split('/');
        const filePath = urlParts.slice(urlParts.indexOf('profile-pictures') + 1).join('/');

        if (filePath) {
            // Supprimer le fichier du storage
            const { error: deleteError } = await supabase.storage
                .from('profile-pictures')
                .remove([filePath]);

            if (deleteError) {
                console.warn('Erreur lors de la suppression de la photo:', deleteError);
                throw deleteError;
            }
        }

        // Supprimer l'URL du profil
        await this.updateProfil(userId, { profilePictureUrl: '' });
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
     * Réinitialisation du mot de passe - envoi de l'email
     */
    async resetPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
    }

    /**
     * Vérifier si une session existe et est valide
     */
    async hasValidSession(): Promise<boolean> {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) {
            console.error('Erreur getSession:', error);
            return false;
        }

        return !!session;
    }

    /**
     * Vérifier le token OTP pour la récupération de mot de passe
     */
    async verifyOtp(tokenHash: string, type: 'recovery' | 'signup' | 'email' = 'recovery') {
        const { data, error } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: type
        });

        if (error) throw error;
        return data;
    }

    /**
     * Mettre à jour le mot de passe (utilisé après réinitialisation)
     * Supabase gère automatiquement le token depuis l'URL
    */
    async updatePassword(newPassword: string): Promise<void> {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;

        // Déconnecter après la réinitialisation
        await supabase.auth.signOut();
    }

    async saveOnboarding(id: string, data: Partial<UserProfile>) {
        const updateData: any = {
            phone: data.phone,
            birth_date: data.birthDate,
            onboarding_completed: data.onboardingCompleted,
            onboarding_step: data.onboardingStep,
            current_level: data.currentLevel,
            postal_code: data.postalCode,
            address: data.address,
            city: data.city
        };

        const { error } = await supabase
            .from('profiles')
            .update(updateData)
            .eq('id', id);

        if (error) throw error;
    }

    async deleteAccount() {
        const { error } = await supabase.rpc('delete_user');
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