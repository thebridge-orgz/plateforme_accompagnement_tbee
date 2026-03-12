import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { StudentProfilePage } from '../../components/StudentProfilePage';

export default function ProfilePageWrapper() {
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

    navigate(routeMap[page] || '/student/profil');
  };

  return (
    <StudentLayout currentPage="student-profile">
      <StudentProfilePage onNavigate={handleNavigate} />
    </StudentLayout>
  );
}
