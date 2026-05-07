import StudentLayout from '../../layouts/studentLayout';
import { CVUploadPage } from '../../components/CVUploadPage';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function CvPage() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  return (
    <StudentLayout currentPage={routes.StudentCv.path}
      user={user}
      signOut={signOut}
    >
      <CVUploadPage />
    </StudentLayout>
  );
}
