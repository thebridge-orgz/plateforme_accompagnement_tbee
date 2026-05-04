import { AdminOfferSupportPage } from '../../components/AdminOfferSupportPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function OfferSupport() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminOfferSupport.path}
            user={user}
            signOut={signOut}
        >
            <AdminOfferSupportPage />
        </AdminLayout>
    );
}