import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/studentLayout';
import { StudentJourneyPage } from './studentJourneyPage';
import { routes } from '../../router/routes';

export default function ParcoursPage() {
  const navigate = useNavigate();

  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      'student-dashboard': '/student/dashboard',
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

    navigate(routeMap[page] || '/student/parcours');
  };

  return (
    <StudentLayout currentPage={routes.StudentModules.path}>
      <StudentJourneyPage onNavigate={handleNavigate} />
    </StudentLayout>
  );
}