import { AdminExerciseReviewPage } from '../../components/AdminExerciseReviewPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function ExerciceReview() {
    return (
        <AdminLayout currentPage={routes.AdminExerciceReview.path}>
            <AdminExerciseReviewPage />
        </AdminLayout>
    );
}