import type { ReactNode } from 'react';
import { DashboardSidebar } from '../components/navigation/DashboardSidebar';
import { UserProfile } from '../../types/user';

interface AdminLayoutProps {
    currentPage: string;
    children: ReactNode;
    user: UserProfile;
    signOut: () => Promise<void>;
}

export default function AdminLayout({ children, currentPage, user, signOut }: AdminLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <DashboardSidebar
                currentPage={currentPage}
                user={user}
                signOut={signOut}
            />
            <main className="lg:ml-72 min-h-screen">
                {children}
            </main>
        </div>
    );
}