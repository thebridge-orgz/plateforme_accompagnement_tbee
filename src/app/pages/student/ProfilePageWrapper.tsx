import StudentLayout from '../../layouts/studentLayout';
import { StudentProfilePage } from '../../components/studentProfilePage';
import { routes } from '../../router/routes';

export default function ProfilePageWrapper() {
  return (
    <StudentLayout currentPage={routes.StudentProfile.path}>
      <StudentProfilePage />
    </StudentLayout>
  );
}
