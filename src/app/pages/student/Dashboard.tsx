import { StudentDashboard } from '../../components/dashboard/studentDashboard';
import StudentLayout from '../../layouts/studentLayout';
import { routes } from '../../router/routes';

export default function DashboardPage() {
  return (
    <StudentLayout currentPage={routes.StudentDashboard.path}>
      <StudentDashboard />
    </StudentLayout>
  );
}