import { Navigate } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAuth } from './AuthContext';
import { UserRole } from '../../types/user';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: UserRole[];
    requireOnboarding?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    allowedRoles,
    requireOnboarding = true,
}) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-[#1E1548]">Chargement...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        // Rediriger vers la page de connexion
        return <Navigate to={routes.SignIn.path} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Rediriger vers la page d'accueil si le rôle n'est pas autorisé
        return <Navigate to={routes.Home.path} replace />;
    }

    // Vérifier l'onboarding pour les étudiants
    if (requireOnboarding && user.role === 'student' && !user.onboardingCompleted) {
        return <Navigate to={routes.Onboarding.path} replace />;
    }

    return <>{children}</>;
};