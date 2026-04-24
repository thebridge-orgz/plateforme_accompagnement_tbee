import { StudentTrackingPage } from '../../components/StudentTrackingPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function Tracking() {
    return (
        <AdminLayout currentPage={routes.AdminStudentTracking.path}>
            <StudentTrackingPage />
        </AdminLayout>
    );
}