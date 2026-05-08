import React, { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { authService } from '../services/supabase/auth.service';
import { UserProfile, UserRole } from '../types/user';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string, expectedRole?: UserRole) => Promise<void>;
    signUp: (email: string, password: string, firstName: string, lastName: string, role?: UserRole) => Promise<void>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updatePassword: (newPassword: string) => Promise<void>;
    verifyOtp: (tokenHash: string, type?: 'recovery' | 'signup' | 'email') => Promise<any>;
    hasValidSession: () => Promise<boolean>;
    saveOnboarding: (user_id: string, data: any) => Promise<void>;
    updateProfil: (user_id: string, data: any) => Promise<void>;
    uploadProfilePicture: (user_id: string, file: File) => Promise<string>;
    deleteProfilePicture: (user_id: string) => Promise<void>;
    deleteAccount: () => Promise<void>;
    refreshUser: () => Promise<void>;
    isAuthenticated: boolean;
    isAdmin: boolean;
    isStudent: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const mounted = useRef(true);
    const authInitialized = useRef(false);

    // Utiliser le service pour charger le profil
    const loadUserProfile = async (userId: string): Promise<UserProfile | null> => {
        return authService.getProfile(userId);
    };

    const updateUserFromSession = async (sessionUser: any) => {
        if (!sessionUser) {
            if (mounted.current) {
                setUser(null);
            }
            return;
        }

        const profile = await loadUserProfile(sessionUser.id);
        if (mounted.current) {
            setUser(profile);
        }
    };

    // BroadcastChannel pour synchronisation multi-onglets
    useEffect(() => {
        const channel = new BroadcastChannel('auth_channel');

        channel.onmessage = (event) => {
            if (event.data.type === 'SIGNED_OUT') {
                if (mounted.current) {
                    setUser(null);
                    setLoading(false);
                }
            } else if (event.data.type === 'SIGNED_IN') {
                refreshUser();
            }
        };

        return () => channel.close();
    }, []);

    // Initialisation
    useEffect(() => {
        mounted.current = true;

        const initializeAuth = async () => {
            try {
                const session = await authService.getCurrentSession();
                await updateUserFromSession(session?.user);
            } catch (error) {
                console.error('Error initializing auth:', error);
            } finally {
                if (mounted.current) {
                    setLoading(false);
                    authInitialized.current = true;
                }
            }
        };

        initializeAuth();

        return () => {
            mounted.current = false;
        };
    }, []);

    // Écouter les changements d'auth (via le service)
    useEffect(() => {
        if (!authInitialized.current) return;

        const { data: { subscription } } = authService.onAuthStateChange(
            async (event, session) => {
                if (!mounted.current) return;

                if (event === 'SIGNED_OUT') {
                    setUser(null);
                    setLoading(false);

                    const channel = new BroadcastChannel('auth_channel');
                    channel.postMessage({ type: 'SIGNED_OUT' });
                    channel.close();
                    return;
                }

                await updateUserFromSession(session?.user);

                if (event === 'SIGNED_IN') {
                    const channel = new BroadcastChannel('auth_channel');
                    channel.postMessage({ type: 'SIGNED_IN' });
                    channel.close();
                }

                if (mounted.current) {
                    setLoading(false);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const refreshUser = async () => {
        const session = await authService.getCurrentSession();
        if (session?.user) {
            await updateUserFromSession(session.user);
        }
    };

    // ⬇️ Utilisation du service pour les actions
    const signIn = async (email: string, password: string, expectedRole?: UserRole) => {
        setLoading(true);
        try {
            const data = await authService.signIn({ email, password, expectedRole });

            if (data.user) {
                const profile = await loadUserProfile(data.user.id);
                if (mounted.current) setUser(profile);
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string, firstName: string, lastName: string, role?: UserRole) => {
        setLoading(true);
        try {
            await authService.signUp({ email, password, firstName, lastName, role });
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        try {
            // Mettre à jour l'UI immédiatement
            setUser(null);
            setLoading(false);

            // Notifier les autres onglets
            const channel = new BroadcastChannel('auth_channel');
            channel.postMessage({ type: 'SIGNED_OUT' });
            channel.close();

            // Déconnexion Supabase
            await authService.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const resetPassword = async (email: string) => {
        await authService.resetPassword(email);
    };

    const updatePassword = async (newPassword: string): Promise<void> => {
        await authService.updatePassword(newPassword);
    };

    const verifyOtp = async (tokenHash: string, type: 'recovery' | 'signup' | 'email' = 'recovery') => {
        return await authService.verifyOtp(tokenHash, type);
    };

    const hasValidSession = async (): Promise<boolean> => {
        return await authService.hasValidSession();
    };

    const updateProfil = async (user_id: string, data: any) => {
        await authService.updateProfil(user_id, data);
    };

    const deleteAccount = async () => {
        await authService.deleteAccount();
    };

    // ✅ Nouvelle méthode pour uploader la photo de profil
    const uploadProfilePicture = async (user_id: string, file: File): Promise<string> => {
        const publicUrl = await authService.uploadProfilePicture(user_id, file);

        // Mettre à jour l'utilisateur localement
        if (mounted.current && user) {
            setUser({ ...user, profilePictureUrl: publicUrl });
        }

        return publicUrl;
    };

    const deleteProfilePicture = async (user_id: string) => {
        if (!user?.profilePictureUrl) return;

        try {
            await authService.deleteProfilePicture(user_id, user.profilePictureUrl);

            // Mettre à jour l'état local
            if (mounted.current) {
                setUser({ ...user, profilePictureUrl: '' });
            }
        } catch (error) {
            console.error('Error deleting profile picture:', error);
            throw error;
        }
    };

    const saveOnboarding = async (user_id: string, data: any) => {
        await authService.saveOnboarding(user_id, data);
    };

    const value: AuthContextType = {
        user,
        loading,
        signIn,
        signUp,
        signOut,
        deleteAccount,
        resetPassword,
        updatePassword,
        verifyOtp,
        hasValidSession,
        refreshUser,
        saveOnboarding,
        updateProfil,
        uploadProfilePicture,
        deleteProfilePicture,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        isStudent: user?.role === 'student',
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};