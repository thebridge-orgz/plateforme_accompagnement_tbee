import { useNavigate } from 'react-router-dom';
import { StudentsListPage } from '../../components/StudentsListPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function StudentList() {
    const navigate = useNavigate();
    //console.log(`Routes : ${JSON.stringify(routes, null, 2)}`);

    const handleNavigate = (page: string) => {
        const routeMap: Record<string, string> = {
            'student-journey': '/student/parcours',
            'student-modules': '/student/parcours',
            'student-cv': '/student/cv',
            'student-tracking': '/student/offres',
            'student-profile': '/student/profil',
        };

        if (page.startsWith('module-')) {
            navigate(`/student/modules/${page}`);
            return;
        }

        navigate(routeMap[page] || '/student/dashboard');
    };

    return (
        <AdminLayout currentPage={routes.AdminStudentList.path}>
            <StudentsListPage onNavigate={handleNavigate} />
        </AdminLayout>
    );
}