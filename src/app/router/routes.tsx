export interface RouteConfig {
    name: string;
    path: string;
    label: string;
    isProtected?: boolean; // Optionnel, pour information
    allowedRoles?: ('student' | 'admin')[]; // Optionnel, pour information
}

export const routes: RouteConfig[] = [
    {
        name: 'Home',
        path: '/',
        label: 'Accueil'
    },
    {
        name: 'Commitments',
        path: '/commitments',
        label: 'Nos engagements'
    },
    {
        name: 'PrivacyPolicy',
        path: '/privacy-policy',
        label: 'Politique de confidentialité'
    },
    {
        name: 'LegalNotice',
        path: '/legal-notice',
        label: 'Mentions légales'
    },
    {
        name: 'SignUp',
        path: '/sign-up',
        label: 'S\'inscrire'
    },
    {
        name: 'SignIn',
        path: '/sign-in',
        label: 'Se connecter'
    },
    {
        name: 'studentDashboard',
        path: '/student/dashboard',
        label: 'Dashboard Etudiant',
        isProtected: true,
        allowedRoles: ['student']
    },
    {
        name: 'Onboarding',
        path: '/onboarding',
        label: 'Onboarding',
        isProtected: true,
        allowedRoles: ['student']
    },
    {
        name: 'StudentModules',
        path: '/student/modules',
        label: 'Mon parcours',
        isProtected: true,
        allowedRoles: ['student']
    },
    {
        name: 'StudentJobTracking',
        path: '/student/offres',
        label: 'Suivi des offres',
        isProtected: true,
        allowedRoles: ['student']
    },
    {
        name: 'StudentCv',
        path: '/student/cv',
        label: 'Mon CV',
        isProtected: true,
        allowedRoles: ['student']
    },
    {
        name: 'StudentPractical',
        path: '/student/cas-pratiques',
        label: 'Cas pratiques',
        isProtected: true,
        allowedRoles: ['student']
    },
    {
        name: 'StudentProfile',
        path: '/student/profil',
        label: 'Mon profil',
        isProtected: true,
        allowedRoles: ['student']
    },
    {
        name: 'AdminDashboard',
        path: '/admin/dashboard',
        label: 'Dashboard Admin',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'AdminCvReview',
        path: '/admin/validation-cv',
        label: 'Validation CVs',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'AdminExerciceReview',
        path: '/admin/exercices',
        label: 'Correction exercices',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'AdminModules',
        path: '/admin/modules',
        label: 'Gestion modules',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'AdminOfferSupport',
        path: '/admin/support-offres',
        label: 'Support offres',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'AdminTracking',
        path: '/admin/etudiants',
        label: 'Suivi étudiants',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'AdminProfile',
        path: '/admin/profil',
        label: 'Mon profil',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'AdmimSettings',
        path: '/admin/parametres',
        label: 'Paramètres',
        isProtected: true,
        allowedRoles: ['admin']
    },
    {
        name: 'NotFound',
        path: '*',
        label: 'Page non trouvée'
    }
];

export const ROUTES = routes.reduce((acc, route) => {
    acc[route.name] = route.path;
    return acc;
}, {} as Record<string, string>);