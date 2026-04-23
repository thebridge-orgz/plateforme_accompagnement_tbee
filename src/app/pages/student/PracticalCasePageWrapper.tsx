import StudentLayout from '../../layouts/studentLayout';
import { PracticalCasePage } from '../../components/PracticalCasePage';
import { routes } from '../../router/routes';

export default function PracticalCasePageWrapper() {
  return (
    <StudentLayout currentPage={routes.StudentPractical.path}>
      <PracticalCasePage />
    </StudentLayout>
  );
}
