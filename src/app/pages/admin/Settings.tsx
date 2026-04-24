import { AdminSettingsPage } from '../../components/AdminSettingsPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function Settings() {
    return (
        <AdminLayout currentPage={routes.AdminSettings.path}>
            <AdminSettingsPage />
        </AdminLayout>
    );
}