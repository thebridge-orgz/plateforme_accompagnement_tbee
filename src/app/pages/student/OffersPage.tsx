import { useNavigate } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { JobTrackingPage } from '../../components/JobTrackingPage';

export default function OffersPage() {
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

    navigate(routeMap[page] || '/student/offres');
  };

  return (
    <StudentLayout currentPage="job-tracking">
      <JobTrackingPage onNavigate={handleNavigate} />
    </StudentLayout>
  );
}
