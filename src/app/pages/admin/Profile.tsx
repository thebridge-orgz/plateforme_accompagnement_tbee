import { AdminProfilePage } from '../../components/AdminProfilePage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function Profile() {
    return (
        <AdminLayout currentPage={routes.AdminProfile.path}>
            <AdminProfilePage />
        </AdminLayout>
    );
}