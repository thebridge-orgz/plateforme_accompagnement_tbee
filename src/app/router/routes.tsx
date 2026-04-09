export interface RouteConfig {
    name: string;
    path: string;
    label: string;
    isProtected?: boolean; // Optionnel, pour information
    allowedRoles?: ('student' | 'admin')[]; // Optionnel, pour information
}

export const routes = {
    Home: {
        path: '/',
        label: 'Accueil'
    },
    Commitments: {
        path: '/commitments',
        label: 'Nos engagements'
    },
    PrivacyPolicy: {
        path: '/privacy-policy',
        label: 'Politique de confidentialité'
    },
    LegalNotice: {
        path: '/legal-notice',
        label: 'Mentions légales'
    },
    SignUp: {
        path: '/sign-up',
        label: 'S\'inscrire'
    },
    SignIn: {
        path: '/sign-in',
        label: 'Se connecter'
    },
    Onboarding: {
        path: '/onboarding',
        label: 'Onboarding',
        isProtected: true,
        allowedRoles: ['student']
    },
    StudentDashboard: {
        path: '/student/dashboard',
        label: 'Dashboard Etudiant',
        isProtected: true,
        allowedRoles: ['student']
    },
    StudentModules: {
        path: '/student/modules',
        label: 'Mon parcours',
        isProtected: true,
        allowedRoles: ['student']
    },
    StudentJobTracking: {
        path: '/student/offres',
        label: 'Suivi des offres',
        isProtected: true,
        allowedRoles: ['student']
    },
    StudentCv: {
        path: '/student/cv',
        label: 'Mon CV',
        isProtected: true,
        allowedRoles: ['student']
    },
    StudentPractical: {
        path: '/student/cas-pratiques',
        label: 'Cas pratiques',
        isProtected: true,
        allowedRoles: ['student']
    },
    StudentProfile: {
        path: '/student/profil',
        label: 'Mon profil',
        isProtected: true,
        allowedRoles: ['student']
    },
    AdminDashboard: {
        path: '/admin/dashboard',
        label: 'Dashboard Admin',
        isProtected: true,
        allowedRoles: ['admin']
    },
    AdminCvReview: {
        path: '/admin/validation-cv',
        label: 'Validation CVs',
        isProtected: true,
        allowedRoles: ['admin']
    },
    AdminExerciceReview: {
        path: '/admin/exercices',
        label: 'Correction exercices',
        isProtected: true,
        allowedRoles: ['admin']
    },
    AdminModules: {
        path: '/admin/modules',
        label: 'Gestion modules',
        isProtected: true,
        allowedRoles: ['admin']
    },
    AdminOfferSupport: {
        path: '/admin/support-offres',
        label: 'Support offres',
        isProtected: true,
        allowedRoles: ['admin']
    },
    AdminTracking: {
        path: '/admin/etudiants',
        label: 'Suivi étudiants',
        isProtected: true,
        allowedRoles: ['admin']
    },
    AdminProfile: {
        path: '/admin/profil',
        label: 'Mon profil',
        isProtected: true,
        allowedRoles: ['admin']
    },
    AdminSettings: {
        path: '/admin/parametres',
        label: 'Paramètres',
        isProtected: true,
        allowedRoles: ['admin']
    },
    NotFound: {
        path: '*',
        label: 'Page non trouvée'
    }
};