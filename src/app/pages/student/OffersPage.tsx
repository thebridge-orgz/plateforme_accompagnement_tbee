import StudentLayout from '../../layouts/studentLayout';
import { JobTrackingPage } from '../../components/JobTrackingPage';
import { routes } from '../../router/routes';

export default function OffersPage() {
  return (
    <StudentLayout currentPage={routes.StudentJobTracking.path}>
      <JobTrackingPage />
    </StudentLayout>
  );
}
