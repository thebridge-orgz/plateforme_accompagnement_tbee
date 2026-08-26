import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from './app/router/routes';
import { ScrollToAnchor } from './app/components/ScrollToAnchor';
import { useEffect } from 'react';
import { AuthProvider } from './hooks/useAuth';
import { ProtectedRoute } from './app/auth/ProtectedRoute';

// Pages publiques
import Home from './app/pages/public/Home';
import Commitments from './app/pages/public/Commitments';
import PrivacyPolicy from './app/pages/public/PrivacyPolicy';
import LegalNotice from './app/pages/public/LegalNotice';
import SignUp from './app/pages/public/SignUp';
import SignIn from './app/pages/public/SignIn';
import ForgotPassword from './app/pages/public/ForgotPassword';
import ResetPassword from './app/pages/public/ResetPassword';
import NotFound from './app/pages/NotFound';

// Pages protégées étudiant
import DashboardPage from './app/pages/student/Dashboard';
import Onboarding from './app/pages/student/Onboarding';
import ParcoursPage from './app/pages/student/Parcours';
import ModuleDetail from './app/pages/student/ModulePageWrapper';
import CvPage from './app/pages/student/CvPage';

import PracticalCasePageWrapper from './app/pages/student/PracticalCasePageWrapper';
import ProfilePageWrapper from './app/pages/student/ProfilePageWrapper';
import ModulePageWrapper from './app/pages/student/ModulePageWrapper';
import ProspectionPageWrapper from './app/pages/student/ProspectionPageWrapper';

// Pages protégées admin
import AdminDashboard from './app/pages/admin/Dashboard';
import AdminCvReview from './app/pages/admin/CvReview';
import AdminExerciceReview from './app/pages/admin/ExerciceReview';
import AdminModules from './app/pages/admin/Modules';
import AdminOfferSupport from './app/pages/admin/OfferSupport';
import AdminStudentTracking from './app/pages/admin/Tracking';
import AdminStudentList from './app/pages/admin/StudentList';
import AdminProfile from './app/pages/admin/Profile';
import AdmimSettings from './app/pages/admin/Settings';

function App() {
  const location = useLocation();

  useEffect(() => {
    const allRoutes = Object.values(routes);
    const currentRoute = allRoutes.find((route) => {
      if (route.path === '*') return false;
      if (route.path.includes(':')) {
        const pattern = route.path.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(location.pathname);
      }
      return route.path === location.pathname;
    });

    if (currentRoute) {
      document.title = `${currentRoute.label} | TBEE`;
    } else {
      const notFoundRoute = routes.NotFound;
      if (notFoundRoute && location.pathname !== routes.NotFound.path) {
        document.title = `${notFoundRoute.label} | TBEE`;
      }
    }
  }, [location]);

  return (
    <AuthProvider>  {/* Plus besoin de UserDataProvider et AdminDataProvider ici */}
      <ScrollToAnchor />

      <Routes>
        {/* Routes publiques */}
        <Route path={routes.Home.path} element={<Home />} />
        <Route path={routes.Commitments.path} element={<Commitments />} />
        <Route path={routes.PrivacyPolicy.path} element={<PrivacyPolicy />} />
        <Route path={routes.LegalNotice.path} element={<LegalNotice />} />
        <Route path={routes.SignUp.path} element={<SignUp />} />
        <Route path={routes.SignIn.path} element={<SignIn />} />
        <Route path={routes.ForgotPassword.path} element={<ForgotPassword />} />
        <Route path={routes.ResetPassword.path} element={<ResetPassword />} />

        {/* Routes étudiant */}
        <Route path={routes.Onboarding.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={false}>
            <Onboarding />
          </ProtectedRoute>
        } />

        <Route path={routes.StudentDashboard.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
            <DashboardPage />
          </ProtectedRoute>
        } />

        <Route path={routes.StudentModules.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
            <ParcoursPage />
          </ProtectedRoute>
        } />

        <Route path={routes.StudentModulesDetails.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
            <ModuleDetail />
          </ProtectedRoute>
        } />

        <Route path={routes.StudentCv.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
            <CvPage />
          </ProtectedRoute>
        } />

        {/* StudentJobTracking supprimé — remplacé par Mon Pokédex */}

        <Route path={routes.StudentPractical.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
            <PracticalCasePageWrapper />
          </ProtectedRoute>
        } />

        <Route path={routes.StudentProspection.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
            <ProspectionPageWrapper />
          </ProtectedRoute>
        } />

        <Route path="/student/modules/:moduleId" element={
          <ProtectedRoute allowedRoles={["student"]} requireOnboarding={true}>
            <ModulePageWrapper />
          </ProtectedRoute>
        } />

        <Route path={routes.StudentProfile.path} element={
          <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
            <ProfilePageWrapper />
          </ProtectedRoute>
        } />

        {/* Routes admin */}
        <Route path={routes.AdminDashboard.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminDashboard />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminCvReview.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminCvReview />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminExerciceReview.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminExerciceReview />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminModules.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminModules />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminOfferSupport.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminOfferSupport />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminStudentList.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminStudentList />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminStudentTracking.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminStudentTracking />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminProfile.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdminProfile />
          </ProtectedRoute>
        } />

        <Route path={routes.AdminSettings.path} element={
          <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
            <AdmimSettings />
          </ProtectedRoute>
        } />

        {/* 404 */}
        <Route path={routes.NotFound.path} element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;