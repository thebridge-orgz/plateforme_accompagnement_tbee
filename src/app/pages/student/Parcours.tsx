import StudentLayout from '../../layouts/studentLayout';
import { StudentJourneyPage } from '../../components/StudentJourneyPage';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function ParcoursPage() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <StudentLayout currentPage={routes.StudentModules.path}
      user={user}
      signOut={signOut}
    >
      <StudentJourneyPage />
    </StudentLayout>
  );
}