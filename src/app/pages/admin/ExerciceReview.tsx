import { AdminExerciseReviewPage } from '../../components/AdminExerciseReviewPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function ExerciceReview() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminExerciceReview.path}
            user={user}
            signOut={signOut}
        >
            <AdminExerciseReviewPage />
        </AdminLayout>
    );
}