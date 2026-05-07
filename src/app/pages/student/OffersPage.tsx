import StudentLayout from '../../layouts/studentLayout';
import { JobTrackingPage } from '../../components/JobTrackingPage';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function OffersPage() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <StudentLayout currentPage={routes.StudentJobTracking.path}
      user={user}
      signOut={signOut}
    >
      <JobTrackingPage />
    </StudentLayout>
  );
}
