import { OnboardingData } from "./onboarding";

export type UserRole = 'student' | 'admin';

export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    hasRQTH?: boolean;
    createdAt: string;
    updatedAt: string;
    onboardingCompleted?: boolean; // Indique si l'onboarding est fini
    onboardingData?: OnboardingData; // Données de l'onboarding
}

// Type pour les données brutes de Supabase (snake_case)
export interface RawUserProfile {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role: UserRole;
    has_rqth?: boolean;
    created_at: string;
    updated_at: string;
}

export interface AuthState {
    user: UserProfile | null;
    loading: boolean;
}