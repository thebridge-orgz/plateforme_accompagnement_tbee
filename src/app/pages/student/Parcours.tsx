import StudentLayout from '../../layouts/studentLayout';
import { StudentJourneyPage } from '../../components/StudentJourneyPage';
import { routes } from '../../router/routes';

export default function ParcoursPage() {
  return (
    <StudentLayout currentPage={routes.StudentModules.path}>
      <StudentJourneyPage />
    </StudentLayout>
  );
}