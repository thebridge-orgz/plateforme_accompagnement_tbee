import { AdminDashboard } from '../../components/dashboard/AdminDashboard';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function DashboardPage() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout
            currentPage={routes.AdminDashboard.path}
            user={user}
            signOut={signOut}
        >
            <AdminDashboard user={user} />
        </AdminLayout>
    );
}