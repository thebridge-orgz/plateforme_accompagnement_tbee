import StudentLayout from '../../layouts/StudentLayout';
import { PracticalCasePage } from '../../components/PracticalCasePage';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function PracticalCasePageWrapper() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <StudentLayout currentPage={routes.StudentPractical.path}
      user={user}
      signOut={signOut}
    >
      <PracticalCasePage />
    </StudentLayout>
  );
}
