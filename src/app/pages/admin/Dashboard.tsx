import { useNavigate } from 'react-router-dom';
import { AdminDashboard } from '../../components/dashboard/AdminDashboard';
import AdminLayout from '../../layouts/AdminLayout';
import { routes, ROUTES } from '../../router/routes';

export default function DashboardPage() {
    const navigate = useNavigate();
    //console.log(`Routes : ${JSON.stringify(routes, null, 2)}`);


    const filteredNavItems = routes
        .filter(item => item.allowedRoles?.includes('admin'))
        .map(item => item.path);

    console.log(`Filtered Routes : ${JSON.stringify(filteredNavItems, null, 2)}`);

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
        <AdminLayout currentPage={ROUTES.AdminDashboard}>
            <AdminDashboard onNavigate={handleNavigate} />
        </AdminLayout>
    );
}