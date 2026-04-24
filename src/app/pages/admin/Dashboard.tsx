import { AdminDashboard } from '../../components/dashboard/AdminDashboard';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function DashboardPage() {
    return (
        <AdminLayout currentPage={routes.AdminDashboard.path}>
            <AdminDashboard />
        </AdminLayout>
    );
}