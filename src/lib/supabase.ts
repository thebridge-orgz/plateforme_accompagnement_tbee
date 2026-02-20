import { createClient } from '@supabase/supabase-js';

// ⚠️ POUR TESTER DANS FIGMA MAKE : Remplacez ces lignes par vos vraies clés
// ⚠️ AVANT DÉPLOIEMENT : Annulez cette modification et utilisez les variables d'environnement !
// 
// Option 1 : Mode production avec variables d'environnement (RECOMMANDÉ pour Vercel)
const supabaseUrl = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined;
const supabaseAnonKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined;

// Option 2 : Mode test Figma Make (TEMPORAIRE - pour tester uniquement)
// Décommentez les 2 lignes ci-dessous et remplacez par vos vraies clés Supabase :
// const supabaseUrl = "https://votre-projet.supabase.co";
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
// 
// 🔑 Trouvez vos clés sur : https://supabase.com/dashboard → Settings → API

// Créer un client mock pour le mode démo (Figma Make)
const createMockClient = () => ({
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    signUp: async () => ({ data: null, error: null }),
    signInWithPassword: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    updateUser: async () => ({ data: { user: null }, error: null }),
    onAuthStateChange: (callback: any) => {
      // Retourner un objet avec la structure attendue par Supabase
      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: async () => ({ data: null, error: null }),
        maybeSingle: async () => ({ data: null, error: null }),
      }),
      data: [],
      error: null,
    }),
    insert: () => ({ data: null, error: null }),
    update: () => ({ data: null, error: null }),
    delete: () => ({ data: null, error: null }),
  }),
});

// En développement Figma Make, les variables d'environnement ne sont pas disponibles
// Le client Supabase ne sera fonctionnel qu'en local (avec .env.local) ou en production (Vercel)
export const supabase = (!supabaseUrl || !supabaseAnonKey)
  ? createMockClient()
  : createClient(supabaseUrl, supabaseAnonKey);

// Types pour la base de données
export type UserRole = 'student' | 'admin';
export type ModuleStatus = 'Brouillon' | 'Publié';
export type ValidationStatus = 'pending' | 'validated' | 'rejected';

// Type pour le profil utilisateur
export interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}