import StudentLayout from '../../layouts/studentLayout';
import { StudentProfilePage } from '../../components/StudentProfilePage';
import { routes } from '../../router/routes';

export default function ProfilePageWrapper() {
  return (
    <StudentLayout currentPage={routes.StudentProfile.path}>
      <StudentProfilePage />
    </StudentLayout>
  );
}
