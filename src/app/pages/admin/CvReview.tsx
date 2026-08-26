import { AdminCVReviewPage } from '../../components/AdminCVReviewPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';
import { useAuth } from '../../../hooks/useAuth';

export default function CvReview() {
    const { user, signOut } = useAuth();

    if (!user) return null;

    return (
        <AdminLayout currentPage={routes.AdminCvReview.path}
            user={user}
            signOut={signOut}
        >
            <AdminCVReviewPage />
        </AdminLayout>
    );
}