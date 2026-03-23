import { createContext, useContext, useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { supabase, UserProfile, UserRole } from '../app/services/supabase';

// =============================================
// Types
// =============================================

interface UserMetadata {
  role?: UserRole;
  first_name?: string;
  last_name?: string;
}

export interface AuthUser {
  id: string;
  email: string;
  profile: UserProfile | null;
  userMetadata: UserMetadata | null;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string, role?: UserRole) => Promise<any>;
  signIn: (email: string, password: string, expectedRole?: UserRole) => Promise<any>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refetchProfile: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isstudent: boolean;
  effectiveRole: UserRole | null;
}

// =============================================
// Helpers
// =============================================

/** Run a promise with a timeout — rejects if it takes too long */
function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout: ${label} (${ms}ms)`)), ms)
    ),
  ]);
}

// =============================================
// Context
// =============================================

const AuthContext = createContext<AuthContextType | null>(null);

// =============================================
// Provider — UNE SEULE INSTANCE pour toute l'app
// =============================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Generation counter: newest fetch always wins, stale fetches are discarded.
  const fetchGenRef = useRef(0);
  // Track last user ID to avoid redundant setUser calls (prevents redirect loops)
  const lastUserIdRef = useRef<string | null>(null);

  useEffect(() => {
    let mounted = true;

    // ---- Profile fetch (simple, no blocking, no delays) ----
    const fetchUserProfile = async (
      userId: string,
      userEmail: string,
      metadata?: UserMetadata
    ) => {
      const gen = ++fetchGenRef.current;

      // Build a user from metadata immediately (we'll enhance with DB profile if possible)
      const fallbackUser: AuthUser = {
        id: userId,
        email: userEmail,
        profile: null,
        userMetadata: metadata || null,
      };

      try {
        console.log('🔍 Récupération du profil pour:', userId.slice(0, 8) + '...');

        // Timeout: don't let profile fetch block forever (RLS/lock issues)
        const { data: profile, error } = await withTimeout(
          supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle(),
          5000,
          'profile fetch'
        );

        // Stale check
        if (!mounted || gen !== fetchGenRef.current) {
          console.log('⏭️ Résultat obsolète, ignoré');
          return;
        }

        if (error) {
          console.warn('⚠️ Erreur profil (fallback metadata):', error.message);
          lastUserIdRef.current = userId;
          setUser(fallbackUser);
        } else if (profile) {
          console.log('✅ Profil DB récupéré, rôle:', (profile as any).role);
          lastUserIdRef.current = userId;
          setUser({
            id: userId,
            email: userEmail,
            profile: profile as UserProfile,
            userMetadata: metadata || null,
          });
        } else {
          console.warn('⚠️ Profil non trouvé en DB, fallback metadata');
          lastUserIdRef.current = userId;
          setUser(fallbackUser);
        }
      } catch (err: any) {
        console.error('❌ Exception fetchUserProfile:', err?.message || err);
        if (mounted && gen === fetchGenRef.current) {
          lastUserIdRef.current = userId;
          setUser(fallbackUser);
        }
      } finally {
        if (mounted && gen === fetchGenRef.current) {
          setLoading(false);
        }
      }
    };

    // =============================================
    // SINGLE AUTH LISTENER — replaces initAuth + onAuthStateChange
    // Uses INITIAL_SESSION to avoid calling getSession() separately
    // This eliminates the NavigatorLock contention that caused timeouts
    // =============================================
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('🔐 Auth event:', event, session?.user?.email || '(no user)');

        if (event === 'INITIAL_SESSION') {
          // First event fired when listener is set up — replaces getSession()
          if (session?.user) {
            console.log('🔐 Session existante détectée:', session.user.email);
            await fetchUserProfile(
              session.user.id,
              session.user.email || '',
              session.user.user_metadata as UserMetadata | undefined
            );
          } else {
            console.log('👤 Aucune session existante');
            setUser(null);
            setLoading(false);
          }
        } else if (event === 'SIGNED_IN' && session?.user) {
          // New sign-in — only fetch if user ID actually changed
          if (lastUserIdRef.current !== session.user.id) {
            await fetchUserProfile(
              session.user.id,
              session.user.email || '',
              session.user.user_metadata as UserMetadata | undefined
            );
          } else {
            // Same user, just ensure loading is false
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          fetchGenRef.current++; // Invalidate any pending fetch
          lastUserIdRef.current = null;
          setUser(null);
          setLoading(false);
        } else if (event === 'USER_UPDATED' && session?.user) {
          // Force re-fetch when user metadata is updated
          lastUserIdRef.current = null;
          await fetchUserProfile(
            session.user.id,
            session.user.email || '',
            session.user.user_metadata as UserMetadata | undefined
          );
        }
        // TOKEN_REFRESHED: no action needed
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // =============================================
  // Auth actions
  // =============================================

  const signUp = useCallback(async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole = 'student'
  ) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName, last_name: lastName, role },
      },
    });
    if (error) throw error;
    return data;
  }, []);

  const signIn = useCallback(async (
    email: string,
    password: string,
    expectedRole?: UserRole
  ) => {
    // Reset tracking so the new session gets a fresh profile fetch
    fetchGenRef.current++;
    lastUserIdRef.current = null;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    // =============================================
    // Role verification — WITH TIMEOUT (max 4s)
    // Si la DB ne répond pas (RLS, lock), on utilise les metadata
    // Ne doit JAMAIS bloquer le login indéfiniment
    // =============================================
    if (expectedRole && data.user) {
      const metaRole = data.user.user_metadata?.role;

      try {
        const { data: profile } = await withTimeout(
          supabase
            .from('profiles')
            .select('role')
            .eq('id', data.user.id)
            .maybeSingle(),
          4000,
          'role verification'
        );

        const dbRole = profile?.role;
        const knownRole = dbRole || metaRole;

        if (knownRole && knownRole !== expectedRole) {
          await supabase.auth.signOut();
          throw new Error(
            `Accès refusé : cette page est réservée aux ${
              expectedRole === 'admin' ? 'administrateurs' : 'candidats'
            }`
          );
        }
      } catch (err: any) {
        // If it's our own "Accès refusé" error, re-throw it
        if (err?.message?.includes('Accès refusé')) throw err;
        // Otherwise (timeout, lock, network error), fall back to metadata only
        console.warn('⚠️ Vérification rôle DB timeout/erreur, fallback metadata:', err?.message);
        if (metaRole && metaRole !== expectedRole) {
          await supabase.auth.signOut();
          throw new Error(
            `Accès refusé : cette page est réservée aux ${
              expectedRole === 'admin' ? 'administrateurs' : 'candidats'
            }`
          );
        }
        // If no metadata role either, let them through (will be verified by profile fetch)
      }
    }

    return data;
  }, []);

  const signOut = useCallback(async () => {
    // IMMEDIATELY clear state so the UI updates right away
    fetchGenRef.current++;
    lastUserIdRef.current = null;
    setUser(null);
    setLoading(false);

    // Then attempt the actual signOut (non-blocking for UI)
    try {
      await supabase.auth.signOut();
    } catch (err: any) {
      console.warn('⚠️ Erreur signOut Supabase (état déjà nettoyé):', err?.message);
    }
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  }, []);

  const refetchProfile = useCallback(async () => {
    if (!user) return;
    const gen = ++fetchGenRef.current;

    try {
      const { data: profile } = await withTimeout(
        supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle(),
        5000,
        'refetch profile'
      );

      if (gen === fetchGenRef.current && profile) {
        setUser(prev =>
          prev ? { ...prev, profile: profile as UserProfile } : null
        );
      }
    } catch (err: any) {
      console.warn('⚠️ refetchProfile échoué:', err?.message);
    }
  }, [user]);

  // =============================================
  // Derived state
  // =============================================

  const effectiveRole: UserRole | null =
    user?.profile?.role || user?.userMetadata?.role || null;

  const value: AuthContextType = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    refetchProfile,
    isAuthenticated: !!user,
    isAdmin: effectiveRole === 'admin',
    isstudent: effectiveRole === 'student',
    effectiveRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// =============================================
// Hook — tous les composants partagent le MÊME état
// =============================================

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error(
      'useAuth() doit être utilisé dans un composant enfant de <AuthProvider>. ' +
      'Vérifiez que App.tsx contient <AuthProvider>.'
    );
  }
  return ctx;
}
