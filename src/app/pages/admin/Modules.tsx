import { AdminModulesPage } from '../../components/AdminModulesPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function Modules() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminModules.path}
            user={user}
            signOut={signOut}
        >
            <AdminModulesPage />
        </AdminLayout>
    );
}