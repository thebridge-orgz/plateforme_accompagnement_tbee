import { useNavigate } from 'react-router-dom';
import { StudentDashboard } from '../../components/dashboard/studentDashboard';
import StudentLayout from '../../layouts/studentLayout';

export default function DashboardPage() {
  const navigate = useNavigate();

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
    <StudentLayout currentPage="student-dashboard">
      <StudentDashboard onNavigate={handleNavigate} />
    </StudentLayout>
  );
}