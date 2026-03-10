import { Routes, Route, useLocation } from 'react-router-dom';
import { routes, ROUTES } from './app/router/routes';
import { ScrollToAnchor } from './app/components/ScrollToAnchor';
import { useEffect } from 'react';
import { AuthProvider } from './app/auth/AuthContext';
import { UserDataProvider } from './context/UserDataContext';
import { ProtectedRoute } from './app/auth/ProtectedRoute';

// Pages publiques
import Home from './app/pages/public/Home';
import Commitments from './app/pages/public/Commitments';
import PrivacyPolicy from './app/pages/public/PrivacyPolicy';
import LegalNotice from './app/pages/public/LegalNotice';
import SignUp from './app/pages/public/SignUp';
import SignIn from './app/pages/public/SignIn';
import NotFound from './app/pages/NotFound';

// Pages protégées
import StudentDashboard from './app/pages/student/Dashboard';
import AdminDashboard from './app/pages/admin/Dashboard';
import Onboarding from './app/pages/student/Onboarding';

function App() {
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find((route) => {
      if (route.path === '*') return false;
      return route.path === location.pathname;
    });

    if (currentRoute) {
      document.title = `${currentRoute.label} | TBEE`;
    } else {
      const notFoundRoute = routes.find((route) => route.path === '*');
      if (notFoundRoute) {
        document.title = `${notFoundRoute.label} | TBEE`;
      }
    }
  }, [location]);

  return (
    <AuthProvider>
      <ScrollToAnchor />

      <Routes>
        {/* Routes publiques */}
        <Route path={ROUTES.Home} element={<Home />} />
        <Route path={ROUTES.Commitments} element={<Commitments />} />
        <Route path={ROUTES.PrivacyPolicy} element={<PrivacyPolicy />} />
        <Route path={ROUTES.LegalNotice} element={<LegalNotice />} />
        <Route path={ROUTES.SignUp} element={<SignUp />} />
        <Route path={ROUTES.SignIn} element={<SignIn />} />

        {/* Route onboarding */}
        <Route
          path={ROUTES.Onboarding}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={false}>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Route dashboard étudiant */}
        <Route
          path={ROUTES.StudentDashboard}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <UserDataProvider>
                <StudentDashboard />
              </UserDataProvider>
            </ProtectedRoute>
          }
        />

        {/* Route dashboard admin */}
        <Route
          path={ROUTES.AdminDashboard}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;