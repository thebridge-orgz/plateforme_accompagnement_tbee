import { StudentDashboard } from '../../components/dashboard/StudentDashboard';
import StudentLayout from '../../layouts/StudentLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function DashboardPage() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <StudentLayout currentPage={routes.StudentDashboard.path}
      user={user}
      signOut={signOut}
    >
      <StudentDashboard user={user} />
    </StudentLayout>
  );
}