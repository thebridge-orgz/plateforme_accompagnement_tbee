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
        name: 'AdminDashboard',
        path: '/admin/dashboard',
        label: 'Dashboard Admin',
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