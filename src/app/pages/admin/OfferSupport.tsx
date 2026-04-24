import { AdminOfferSupportPage } from '../../components/AdminOfferSupportPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function OfferSupport() {
    return (
        <AdminLayout currentPage={routes.AdminOfferSupport.path}>
            <AdminOfferSupportPage />
        </AdminLayout>
    );
}