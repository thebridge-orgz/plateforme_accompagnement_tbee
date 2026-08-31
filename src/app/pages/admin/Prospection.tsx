import { AdminProspectionPage } from '../../components/AdminProspectionPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function Prospection() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminProspection.path} user={user} signOut={signOut}>
            <AdminProspectionPage />
        </AdminLayout>
    );
}
