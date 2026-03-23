import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/studentLayout';
import { CVUploadPage } from '../../components/CVUploadPage';

export default function CvPage() {
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

    navigate(routeMap[page] || '/student/cv');
  };

  return (
    <StudentLayout currentPage="student-cv">
      <CVUploadPage onNavigate={handleNavigate} />
    </StudentLayout>
  );
}
