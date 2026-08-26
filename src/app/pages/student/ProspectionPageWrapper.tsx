import { ProspectionPage } from '../../components/ProspectionPage';
import StudentLayout from '../../layouts/StudentLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function ProspectionPageWrapper() {
  const { user, signOut } = useAuth();
  if (!user) return null;
  return (
    <StudentLayout currentPage={routes.StudentProspection.path} user={user} signOut={signOut}>
      <ProspectionPage />
    </StudentLayout>
  );
}
