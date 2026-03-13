import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { DashboardSidebar } from '../components/navigation/DashboardSidebar';

import { navIdToPath } from '../router/navMap';

type Props = {
    currentPage: string;
    children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleNavigate = (id: string) => {
        if (!id) return;

        /*if (id === 'logout') {
            void doLogout();
            return;
        }*/

        // si clic sur un module du type "module-2"
        if (id.startsWith('module-')) {
            navigate(`/student/modules/${id}`);
            return;
        }

        // mapping central (recommandé)
        const path = navIdToPath[id] || '/student/dashboard';
        navigate(path);
    };

    // Nom affiché dans la sidebar
    const user = (auth as any).user;
    const userName =
        user?.firstName
            ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
            : user?.email || 'Utilisateur';

    return (
        <div className="min-h-screen bg-background">
            <DashboardSidebar
                currentPage=""
                onNavigate={handleNavigate}
                role="admin"
                userName={userName}
            />

            {/* Zone contenu (décalée à droite quand sidebar visible en desktop) */}
            <main className="lg:ml-72 min-h-screen">
                {children}
            </main>
        </div>
    );
}