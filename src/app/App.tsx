import { Routes, Route, useLocation } from 'react-router-dom';
import { routes, ROUTES } from './routes';
import { ScrollToAnchor } from './components/ScrollToAnchor';
import { useEffect } from 'react';
import { AuthProvider } from '../app/auth/AuthContext';
import { ProtectedRoute } from './auth/ProtectedRoute';

// Importer les composants directement pour les routes protégées
import Home from './pages/public/Home';
import Commitments from './pages/public/Commitments';
import PrivacyPolicy from './pages/public/PrivacyPolicy';
import LegalNotice from './pages/public/LegalNotice';
import SignUp from './pages/public/SignUp';
import SignIn from './pages/public/SignIn';
import NotFound from './pages/NotFound';
import StudentDashboard from './pages/student/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Onboarding from './pages/student/Onboarding';

function App() {
  const location = useLocation();

  useEffect(() => {
    // Trouver la route correspondant au chemin actuel
    const currentRoute = routes.find(route => {
      if (route.path === '*') {
        return false;
      }
      return route.path === location.pathname;
    });

    if (currentRoute) {
      document.title = `${currentRoute.label} | TBEE`;
    } else {
      const notFoundRoute = routes.find(route => route.path === '*');
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

        {/* Routes protégées */}
        <Route
          path={ROUTES.StudentDashboard}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={true}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.AdminDashboard}
          element={
            <ProtectedRoute allowedRoles={['admin']} requireOnboarding={false}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.Onboarding}
          element={
            <ProtectedRoute allowedRoles={['student']} requireOnboarding={false}>
              <Onboarding />
            </ProtectedRoute>
          }
        />

        {/* Route 404 - doit être en dernier */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;