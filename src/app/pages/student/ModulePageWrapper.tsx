import { useLocation } from 'react-router-dom';
import StudentLayout from '../../layouts/studentLayout';
import { ModuleLinearPage } from '../../components/ModuleLinearPage';
import { routes } from '../../../app/router/routes';

export default function ModulePageWrapper() {
  const location = useLocation();

  const { hash, pathname, search } = location;
  const match = pathname.match(/module-(\w+)/);
  const moduleId = match ? match[1] : '';


  return (
    <StudentLayout currentPage={routes.StudentModulesDetails.path.replace(":id", moduleId) || ''}>
      <ModuleLinearPage moduleId={moduleId} />
    </StudentLayout>
  );
}
