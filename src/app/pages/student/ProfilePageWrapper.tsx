import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import StudentLayout from '../../layouts/studentLayout';
import { StudentProfilePage } from '../../components/StudentProfilePage';
import { routes } from '../../router/routes';

export default function ProfilePageWrapper() {
  const navigate = useNavigate();
  const { user } = useAuth();

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

    navigate(routeMap[page] || '/student/profil');
  };

  return (
    <StudentLayout currentPage={routes.StudentProfile.path}>
      <StudentProfilePage
        onNavigate={handleNavigate}
        authEmail={user?.email ?? ''}
        authFirstName={user?.firstName ?? ''}
        authLastName={user?.lastName ?? ''}
      />
    </StudentLayout>
  );
}
