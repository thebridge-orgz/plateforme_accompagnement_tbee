import { StudentsListPage } from '../../components/StudentsListPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function StudentList() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminStudentList.path}
            user={user}
            signOut={signOut}
        >
            <StudentsListPage />
        </AdminLayout>
    );
}