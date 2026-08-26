import { AdminProfilePage } from '../../components/AdminProfilePage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function Profile() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminProfile.path}
            user={user}
            signOut={signOut}
        >
            <AdminProfilePage />
        </AdminLayout>
    );
}