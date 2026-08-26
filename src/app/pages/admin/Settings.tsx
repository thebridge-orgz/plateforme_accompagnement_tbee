import { AdminSettingsPage } from '../../components/AdminSettingsPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function Settings() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminSettings.path}
            user={user}
            signOut={signOut}
        >
            <AdminSettingsPage />
        </AdminLayout>
    );
}