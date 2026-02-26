import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { supabase } from './supabaseClient';
import { UserProfile, UserRole } from '../types/user';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signIn: (email: string, password: string, role: UserRole) => Promise<void>;
    signUp: (email: string, password: string, firstName: string, lastName: string, hasRQTH?: boolean) => Promise<void>;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
    saveOnboarding: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const mounted = useRef(true);
    const initialLoadDone = useRef(false);
    const authInitialized = useRef(false);

    // Charger le profil utilisateur depuis Supabase
    const loadUserProfile = async (userId: string): Promise<UserProfile | null> => {
        try {
            console.log('Loading profile for user:', userId);

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (error) {
                if (error.code === 'PGRST116') {
                    console.log('Profile not found yet for user:', userId);
                    return null;
                }
                console.error('Error loading user profile:', error);
                return null;
            }

            if (data) {
                console.log('Profile loaded:', data);
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
                } as UserProfile;
            }
            return null;
        } catch (error) {
            console.error('Error in loadUserProfile:', error);
            return null;
        }
    };

    // Mettre à jour l'utilisateur avec la session
    const updateUserFromSession = async (sessionUser: SupabaseUser | undefined) => {
        if (!sessionUser) {
            if (mounted.current) {
                setUser(null);
                console.log('User set to null (no session)');
            }
            return;
        }

        const profile = await loadUserProfile(sessionUser.id);
        if (mounted.current) {
            setUser(profile);
            console.log('User set from session:', profile?.email);
        }
    };

    // Synchronisation entre onglets avec BroadcastChannel
    useEffect(() => {
        const channel = new BroadcastChannel('auth_channel');

        channel.onmessage = (event) => {
            console.log('Broadcast message received:', event.data);

            if (event.data.type === 'SIGNED_OUT') {
                console.log('Sign out detected in another tab');
                if (mounted.current) {
                    setUser(null);
                    setLoading(false); // Important : remettre loading à false
                }
            } else if (event.data.type === 'SIGNED_IN') {
                console.log('Sign in detected in another tab, refreshing session');
                refreshUser();
            }
        };

        return () => {
            channel.close();
        };
    }, []);

    // Initialisation au montage
    useEffect(() => {
        mounted.current = true;

        const initializeAuth = async () => {
            try {
                console.log('Initializing auth...');

                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) {
                    console.error('Error getting session:', sessionError);
                }

                console.log('Initial session:', session?.user?.email);

                await updateUserFromSession(session?.user);

            } catch (error) {
                console.error('Error in initializeAuth:', error);
            } finally {
                if (mounted.current) {
                    setLoading(false);
                    initialLoadDone.current = true;
                    authInitialized.current = true;
                    console.log('Auth initialization complete');
                }
            }
        };

        initializeAuth();

        return () => {
            mounted.current = false;
        };
    }, []);

    // Écouter les changements d'authentification
    useEffect(() => {
        if (!authInitialized.current) return;

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('Auth state changed:', event, session?.user?.email);

                if (!mounted.current) return;

                // Mettre à jour l'utilisateur
                await updateUserFromSession(session?.user);

                // Notifier les autres onglets
                const channel = new BroadcastChannel('auth_channel');
                if (event === 'SIGNED_OUT') {
                    channel.postMessage({ type: 'SIGNED_OUT' });
                } else if (event === 'SIGNED_IN') {
                    channel.postMessage({ type: 'SIGNED_IN' });
                }
                channel.close();

                // IMPORTANT: Ne pas remettre loading à false ici pour les événements SIGNED_OUT
                // car cela pourrait créer une boucle infinie
                if (mounted.current && event !== 'SIGNED_OUT') {
                    setLoading(false);
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    // Rafraîchir manuellement l'utilisateur
    const refreshUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            await updateUserFromSession(session.user);
        }
    };

    // Connexion
    const signIn = async (email: string, password: string, role: UserRole) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.user) {
                // Charger le profil immédiatement
                const profile = await loadUserProfile(data.user.id);

                // Vérifier le rôle
                if (profile && profile.role !== role) {
                    await supabase.auth.signOut();
                    throw new Error(`Ce compte n'est pas un compte ${role === 'student' ? 'étudiant' : 'administrateur'}`);
                }

                // Mettre à jour l'état local immédiatement
                if (mounted.current) {
                    setUser(profile);
                    console.log('User set from signIn:', profile?.email);
                }
            }
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Inscription
    const signUp = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        hasRQTH?: boolean
    ) => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName,
                        last_name: lastName,
                    },
                    emailRedirectTo: `${window.location.origin}/connexion`
                }
            });

            if (error) throw error;

            if (data.user) {
                console.log('User created:', data.user.id);

                await new Promise(resolve => setTimeout(resolve, 1000));

                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: data.user.id,
                        email: email,
                        first_name: firstName,
                        last_name: lastName,
                        role: 'student',
                        has_rqth: hasRQTH || false,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    });

                if (profileError) {
                    console.error('Profile creation error:', profileError);
                    throw profileError;
                }

                console.log('Profile created successfully');
            }
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Déconnexion
    const signOut = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            // Mettre à jour l'état local immédiatement
            if (mounted.current) {
                setUser(null);
                setLoading(false); // Important : remettre loading à false immédiatement
            }
        } catch (error) {
            console.error('Error signing out:', error);
            setLoading(false);
            throw error;
        }
    };

    const saveOnboarding = async (onboardingData: any) => {
        if (!user) throw new Error('No user logged in');

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    onboarding_completed: true,
                    onboarding_data: onboardingData,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', user.id);

            if (error) throw error;

            // Mettre à jour l'état local
            if (mounted.current) {
                setUser({
                    ...user,
                    onboardingCompleted: true,
                    onboardingData: onboardingData,
                });
            }
        } catch (error) {
            console.error('Error saving onboarding:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refreshUser, saveOnboarding }}>
            {children}
        </AuthContext.Provider>
    );
};