import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { DashboardSidebar } from '../components/navigation/DashboardSidebar';

type Props = {
  currentPage: string;
  children: ReactNode;
};

export default function StudentLayout({ children }: Props) {
  const auth = useAuth();
    const location = useLocation();

  // Nom affiché dans la sidebar
  const user = (auth as any).user;
  const userName =
    user?.firstName
      ? `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`
      : user?.email || 'Utilisateur';

    const { hash, pathname, search } = location;

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        currentPage={pathname}
        role="student"
        userName={userName}
      />

      {/* Zone contenu (décalée à droite quand sidebar visible en desktop) */}
      <main className="lg:ml-72 min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}