import { AdminCVReviewPage } from '../../components/AdminCVReviewPage';
import AdminLayout from '../../layouts/AdminLayout';
import { routes } from '../../router/routes';

export default function CvReview() {
    return (
        <AdminLayout currentPage={routes.AdminCvReview.path}>
            <AdminCVReviewPage />
        </AdminLayout>
    );
}