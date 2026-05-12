import { useLocation } from 'react-router-dom';
import StudentLayout from '../../layouts/StudentLayout';
import { ModuleLinearPage } from '../../components/ModuleLinearPage';
import { routes } from '../../../app/router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function ModulePageWrapper() {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const location = useLocation();

  const { hash, pathname, search } = location;
  const moduleId = pathname.split('/')[3];
  console.log('moduleId', moduleId)


  return (
    <StudentLayout currentPage={routes.StudentModulesDetails.path.replace(":id", moduleId) || ''}
      user={user}
      signOut={signOut}>
      <ModuleLinearPage moduleId={moduleId} />
    </StudentLayout>
  );
}
