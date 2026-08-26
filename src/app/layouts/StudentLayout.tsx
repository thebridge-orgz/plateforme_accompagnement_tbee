import type { ReactNode } from 'react';
import { DashboardSidebar } from '../components/navigation/DashboardSidebar';
import { UserProfile } from '../../types/user';

type StudentLayoutProps = {
  currentPage: string;
  children: ReactNode;
  user: UserProfile;
  signOut: () => Promise<void>;
};

export default function StudentLayout({ children, currentPage, user, signOut }: StudentLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        currentPage={currentPage}
        user={user}
        signOut={signOut}
      />
      <main className="lg:ml-72 min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}