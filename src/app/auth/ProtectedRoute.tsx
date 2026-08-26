import { Navigate } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAuth } from '../../hooks/useAuth';
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
        console.log('No user found, redirecting to sign in');
        return <Navigate to={routes.SignIn.path} replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        console.log('Role not allowed, redirecting to home');
        return <Navigate to={routes.Home.path} replace />;
    }

    if (requireOnboarding && user.role === 'student' && !user.onboardingCompleted) {
        return <Navigate to={routes.Onboarding.path} replace />;
    }

    return <>{children}</>;
};