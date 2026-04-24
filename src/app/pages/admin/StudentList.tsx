import { StudentsListPage } from '../../components/StudentsListPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function StudentList() {
    return (
        <AdminLayout currentPage={routes.AdminStudentList.path}>
            <StudentsListPage />
        </AdminLayout>
    );
}