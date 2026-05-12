import StudentLayout from '../../layouts/StudentLayout';
import { StudentProfilePage } from '../../components/StudentProfilePage';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function ProfilePageWrapper() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <StudentLayout currentPage={routes.StudentProfile.path}
      user={user}
      signOut={signOut}
    >
      <StudentProfilePage />
    </StudentLayout>
  );
}
