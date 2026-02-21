import Home from './pages/Home';
import Commitments from './pages/Commitments';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LegalNotice from './pages/LegalNotice'
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound'

export interface RouteConfig {
    name: string;
    path: string;
    component: React.ComponentType;
    label: string;
}

export const routes: RouteConfig[] = [
    {
        name: 'Home',
        path: '/',
        component: Home,
        label: 'Accueil'
    },
    {
        name: 'Commitments',
        path: '/commitments',
        component: Commitments,
        label: 'Nos engagements'
    },
    {
        name: 'PrivacyPolicy',
        path: '/privacy-policy',
        component: PrivacyPolicy,
        label: 'Politique de confidentialité'
    },
    {
        name: 'LegalNotice',
        path: '/legal-notice',
        component: LegalNotice,
        label: 'Mentions légales'
    },
    {
        name: 'SignUp',
        path: '/sign-up',
        component: SignUp,
        label: 'S\'inscrire'
    },
    {
        name: 'SignIn',
        path: '/sign-in',
        component: SignIn,
        label: 'Se connecter'
    },
    {
        name: 'NotFound',
        path: '*',
        component: NotFound,
        label: 'Page non trouvée'
    }
];

export const ROUTES = routes.reduce((acc, route) => {
    acc[route.name] = route.path;
    return acc;
}, {} as Record<string, string>);