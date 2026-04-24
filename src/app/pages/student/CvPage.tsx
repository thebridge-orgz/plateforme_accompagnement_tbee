import StudentLayout from '../../layouts/studentLayout';
import { CVUploadPage } from '../../components/CVUploadPage';
import { routes } from '../../router/routes';

export default function CvPage() {
  return (
    <StudentLayout currentPage={routes.StudentCv.path}>
      <CVUploadPage />
    </StudentLayout>
  );
}
