import { StudentTrackingPage } from '../../components/StudentTrackingPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function Tracking() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminStudentTracking.path}
            user={user}
            signOut={signOut}
        >
            <StudentTrackingPage />
        </AdminLayout>
    );
}