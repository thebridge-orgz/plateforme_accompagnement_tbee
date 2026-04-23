import { AdminModulesPage } from '../../components/AdminModulesPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function Modules() {
    return (
        <AdminLayout currentPage={routes.AdminModules.path}>
            <AdminModulesPage />
        </AdminLayout>
    );
}