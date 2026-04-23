import { Routes, Route, useLocation } from 'react-router-dom';
import { routes } from './app/router/routes';
import { ScrollToAnchor } from './app/components/ScrollToAnchor';
import { useEffect } from 'react';
import { AuthProvider } from './app/auth/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
import { AdminDataProvider } from './context/AdminDataContext';
import { ProtectedRoute } from './app/auth/ProtectedRoute';

// Pages publiques
import Home from './app/pages/public/Home';
import Commitments from './app/pages/public/Commitments';
import PrivacyPolicy from './app/pages/public/PrivacyPolicy';
import LegalNotice from './app/pages/public/LegalNotice';
import SignUp from './app/pages/public/SignUp';
import SignIn from './app/pages/public/SignIn';
import NotFound from './app/pages/NotFound';

// Pages protégées étudiant
import DashboardPage from './app/pages/student/Dashboard';
import Onboarding from './app/pages/student/Onboarding';
import ParcoursPage from './app/pages/student/Parcours';
import ModuleDetail from './app/pages/student/ModulePageWrapper';
import CvPage from './app/pages/student/CvPage';
import OffersPage from './app/pages/student/OffersPage';
import PracticalCasePageWrapper from './app/pages/student/PracticalCasePageWrapper';
import ProfilePageWrapper from './app/pages/student/ProfilePageWrapper';
import ModulePageWrapper from './app/pages/student/ModulePageWrapper';

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
    // Récupérer toutes les routes de l'objet routes
    const allRoutes = Object.values(routes);

    // Trouver la route correspondant au chemin actuel
    const currentRoute = allRoutes.find((route) => {
      if (route.path === '*') return false;
      // Gestion des routes paramétrées (ex: /student/modules/:moduleId)
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
      // Vérifier si c'est la route 404
      const notFoundRoute = routes.NotFound;
      if (notFoundRoute && location.pathname !== routes.NotFound.path) {
        document.title = `${notFoundRoute.label} | TBEE`;
      }
    }
  }, [location]);

  return (
    <AuthProvider>
      <ScrollToAnchor />

      <Routes>
        {/* Routes publiques */}
        <Route path={routes.Home.path} element={<Home />} />
        <Route path={routes.Commitments.path} element={<Commitments />} />
        <Route path={routes.PrivacyPolicy.path} element={<PrivacyPolicy />} />
        <Route path={routes.LegalNotice.path} element={<LegalNotice />} />
        <Route path={routes.SignUp.path} element={<SignUp />} />
        <Route path={routes.SignIn.path} element={<SignIn />} />

        {/* Route onboarding */}
        <Route
          path={routes.Onboarding.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={false}>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Route dashboard étudiant */}
        <Route
          path={routes.StudentDashboard.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <DashboardPage />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />

        {/* routes secondaires étudiant */}
        <Route
          path={routes.StudentModules.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <ParcoursPage />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.StudentModulesDetails.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <ModuleDetail />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.StudentCv.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <CvPage />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.StudentJobTracking.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <OffersPage />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.StudentPractical.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <PracticalCasePageWrapper />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/modules/:moduleId"
          element={
            <ProtectedRoute allowedRoles={["student"]} requireOnboarding={true}>
              <UserDataProvider>
                <ModulePageWrapper />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path={routes.StudentProfile.path}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <ProfilePageWrapper />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />

        {/* Route dashboard admin */}
        <Route
          path={routes.AdminDashboard.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminDashboard />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminCvReview.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminCvReview />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminExerciceReview.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminExerciceReview />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminModules.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminModules />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminOfferSupport.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminOfferSupport />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminStudentList.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminStudentList />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminStudentTracking.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminStudentTracking />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminProfile.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdminProfile />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        <Route
          path={routes.AdminSettings.path}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDataProvider>
                <AdmimSettings />
              </AdminDataProvider>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path={routes.NotFound.path} element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;