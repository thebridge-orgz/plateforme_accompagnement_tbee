import { useNavigate, useParams } from 'react-router-dom';
import StudentLayout from '../../layouts/studentLayout';
import { ModuleLinearPage } from '../../components/ModuleLinearPage';

export default function ModulePageWrapper() {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();

  const handleNavigate = (page: string) => {
    const routeMap: Record<string, string> = {
      'student-dashboard': '/student/dashboard',
      'student-journey': '/student/modules',
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

  // moduleId from params includes the full string (e.g. "module-week1");
  // strip prefix when passing to ModuleLinearPage
  const cleanId = moduleId ? moduleId.replace(/^module-/, '') : '';

  return (
    <StudentLayout currentPage={moduleId || ''}>
      <ModuleLinearPage moduleId={cleanId} onNavigate={handleNavigate} />
    </StudentLayout>
  );
}
