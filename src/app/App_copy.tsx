import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { OnboardingStep1 } from "./components/OnboardingStep1";
import { OnboardingStep2 } from "./components/OnboardingStep2";
import { StudentDashboardModules } from "./components/StudentDashboardModules";
import { StudentJourneyPage } from "./components/StudentJourneyPage";
import { ModuleLinearPage } from "./components/ModuleLinearPage";
import { JobTrackingPage } from "./components/JobTrackingPage";
import { CVUploadPage } from "./components/CVUploadPage";
import { PracticalCasePage } from "./components/PracticalCasePage";
import { StudentProfilePage } from "./components/StudentProfilePage";
import { AdminDashboard } from "./components/AdminDashboard";
import { AdminCVReviewPage } from "./components/AdminCVReviewPage";
import { AdminExerciseReviewPage } from "./components/AdminExerciseReviewPage";
import { AdminOfferSupportPage } from "./components/AdminOfferSupportPage";
import { AdminProfilePage } from "./components/AdminProfilePage";
import { AdminValidationPage } from "./components/AdminValidationPage";
import { UserManagementPage } from "./components/UserManagementPage";
import { StudentTrackingPage } from "./components/StudentTrackingPage";
import { AdminSettingsPage } from "./components/AdminSettingsPage";
import { AdminModulesPage } from "./components/AdminModulesPage";
import { MentionsLegales } from "./components/MentionsLegales";
import { Confidentialite } from "./components/Confidentialite";
import { Engagements } from "./components/Engagements";
import { UserDataProvider } from "@/context/UserDataContext";
import { AdminDataProvider } from "@/context/AdminDataContext";
import { useAuth, AuthProvider } from "@/context/AuthContext";

type Page = 
  | 'landing' 
  | 'login' 
  | 'signup'
  // Onboarding
  | 'onboarding-step1'
  | 'onboarding-step2'
  // Student pages
  | 'student-dashboard'
  | 'student-modules'
  | 'module-week1'
  | 'module-week2'
  | 'module-week3'
  | 'module-week4'
  | 'job-tracking'
  | 'student-cv'
  | 'student-practical'
  | 'student-profile'
  // Admin pages
  | 'admin-dashboard'
  | 'admin-cv-review'
  | 'admin-exercise-review'
  | 'admin-offer-support'
  | 'admin-profile'
  | 'admin-validation'
  | 'admin-users'
  | 'admin-tracking'
  | 'admin-settings'
  | 'admin-modules'
  // Legal pages
  | 'mentions-legales'
  | 'confidentialite'
  | 'engagements'
  | 'logout';

function AppContent() {
  const { user, loading, signOut, isAdmin, isStudent, effectiveRole } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [onboardingData, setOnboardingData] = useState<any>({});

  // Déterminer le prénom depuis le profil Supabase ou les métadonnées
  const currentFirstName = user?.profile?.first_name
    || user?.userMetadata?.first_name
    || '';

  const currentLastName = user?.profile?.last_name
    || user?.userMetadata?.last_name
    || '';

  const currentUserName = (currentFirstName || currentLastName)
    ? `${currentFirstName} ${currentLastName}`.trim()
    : user?.email?.split('@')[0] || 'Utilisateur';

  const currentUserEmail = user?.email || '';

  // Déterminer le rôle de l'utilisateur (profile OU metadata fallback)
  const userRole = effectiveRole;

  // -------------------- DYNAMIC PAGE TITLES --------------------
  // Mettre à jour le titre de la page selon la page actuelle
  useEffect(() => {
    const pageTitles: Record<Page, string> = {
      'landing': 'TBEE - Ta réussite en alternance commence ici',
      'login': 'Connexion - TBEE',
      'signup': 'Inscription - TBEE',
      'onboarding-step1': 'Profil - TBEE',
      'onboarding-step2': 'Projet professionnel - TBEE',
      'student-dashboard': 'Tableau de bord - TBEE',
      'student-modules': 'Tous les modules - TBEE',
      'module-week1': 'Semaine 1 - TBEE',
      'module-week2': 'Semaine 2 - TBEE',
      'module-week3': 'Semaine 3 - TBEE',
      'module-week4': 'Semaine 4 - TBEE',
      'job-tracking': 'Suivi des candidatures - TBEE',
      'student-cv': 'Mon CV - TBEE',
      'student-practical': 'Cas pratique - TBEE',
      'student-profile': 'Mon profil - TBEE',
      'admin-dashboard': 'Dashboard Admin - TBEE',
      'admin-cv-review': 'Validation CV - TBEE',
      'admin-exercise-review': 'Validation exercices - TBEE',
      'admin-offer-support': 'Support offres - TBEE',
      'admin-profile': 'Profil Admin - TBEE',
      'admin-validation': 'Validations en attente - TBEE',
      'admin-users': 'Gestion utilisateurs - TBEE',
      'admin-tracking': 'Suivi candidats - TBEE',
      'admin-settings': 'Paramètres - TBEE',
      'admin-modules': 'Gestion modules - TBEE',
      'mentions-legales': 'Mentions légales - TBEE',
      'confidentialite': 'Politique de confidentialité - TBEE',
      'engagements': 'Nos engagements - TBEE',
      'logout': 'TBEE'
    };

    document.title = pageTitles[currentPage] || 'TBEE - Ta réussite en alternance commence ici';
  }, [currentPage]);

  // -------------------- LOAD SAVED DATA --------------------
  // Charger les données sauvegardées au démarrage
  useEffect(() => {
    const savedOnboardingData = localStorage.getItem('tbee_onboarding_data');
    const savedOnboardingStatus = localStorage.getItem('tbee_onboarding_completed');

    if (savedOnboardingData) {
      setOnboardingData(JSON.parse(savedOnboardingData));
    }
    if (savedOnboardingStatus === 'true') {
      setHasCompletedOnboarding(true);
    }
  }, []);

  // -------------------- AUTO REDIRECT BASED ON AUTH STATE --------------------
  useEffect(() => {
    if (loading) return; // Attendre le chargement

    // Si l'utilisateur est connecté
    if (user) {
      // Si on est sur une page d'auth, rediriger vers le dashboard approprié
      if (['landing', 'login', 'signup'].includes(currentPage)) {
        // Use effective role: profile.role OR userMetadata.role
        const role = user.profile?.role || user.userMetadata?.role;
        
        if (role === 'admin') {
          console.log('✅ Redirection admin-dashboard (role from:', user.profile ? 'profile' : 'metadata', ')');
          setCurrentPage('admin-dashboard');
        } else if (role === 'student') {
          // Si l'onboarding n'est pas terminé, rediriger vers onboarding
          if (!hasCompletedOnboarding) {
            console.log('✅ Redirection onboarding-step1 (role from:', user.profile ? 'profile' : 'metadata', ')');
            setCurrentPage('onboarding-step1');
          } else {
            console.log('✅ Redirection student-dashboard (role from:', user.profile ? 'profile' : 'metadata', ')');
            setCurrentPage('student-dashboard');
          }
        } else {
          // Aucun rôle déterminé (ni profil ni metadata)
          // C'est probablement un nouvel utilisateur, envoyer vers onboarding par défaut
          console.warn('⚠️ Aucun rôle déterminé, redirection onboarding par défaut');
          setCurrentPage('onboarding-step1');
        }
      }
    } else {
      // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
      if (!['landing', 'login', 'signup', 'mentions-legales', 'confidentialite', 'engagements'].includes(currentPage)) {
        console.log('⚠️ Utilisateur non connecté, redirection vers landing');
        setCurrentPage('landing');
      }
    }
  }, [user, loading, currentPage, hasCompletedOnboarding]);

  // -------------------- PREPARE USER DATA FOR CONTEXT --------------------
  // Convertir les données d'onboarding en format compatible avec UserDataProvider
  const initialUserData = onboardingData.step1 ? {
    userProfile: {
      firstName: onboardingData.step1?.firstName || null,
      lastName: onboardingData.step1?.lastName || null,
      phone: onboardingData.step1?.phone || null,
      hasFormation: onboardingData.step1?.hasFormation || false,
      formationChoice: onboardingData.step1?.formationChoice || null,
    },
    skills: onboardingData.step2?.skills || [],
    cvStatus: onboardingData.step2?.cvStatus ?? 0,
    linkedinStatus: onboardingData.step2?.linkedinStatus ?? 0,
    searchStatus: onboardingData.step2?.searchStatus ?? 0,
    weeklyHours: onboardingData.step2?.weeklyHours || 10,
  } : null;

  // Handle navigation
  const handleNavigate = (page: Page) => {
    if (page === 'logout') {
      signOut();
      setCurrentPage('landing');
      setHasCompletedOnboarding(false);
      setOnboardingData({});
      localStorage.removeItem('tbee_onboarding_data');
      localStorage.removeItem('tbee_onboarding_completed');
      localStorage.removeItem('hasCompletedOnboarding');
    } else {
      setCurrentPage(page);
    }
  };

  // Handle onboarding completion
  const handleOnboardingStep1Complete = (data: any) => {
    const updatedData = { ...onboardingData, step1: data };
    setOnboardingData(updatedData);
    // Sauvegarder dans localStorage
    localStorage.setItem('tbee_onboarding_data', JSON.stringify(updatedData));
    setCurrentPage('onboarding-step2');
  };

  const handleOnboardingStep2Complete = (data: any) => {
    const updatedData = { ...onboardingData, step2: data };
    setOnboardingData(updatedData);
    setHasCompletedOnboarding(true);
    // Sauvegarder dans localStorage
    localStorage.setItem('tbee_onboarding_data', JSON.stringify(updatedData));
    localStorage.setItem('tbee_onboarding_completed', 'true');
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setCurrentPage('student-dashboard');
  };

  const isAuthPage = ['landing', 'login', 'signup'].includes(currentPage);
  const isOnboardingPage = currentPage.startsWith('onboarding-');
  const isLegalPage = ['mentions-legales', 'confidentialite', 'engagements'].includes(currentPage);
  const isDashboardPage = !isAuthPage && !isOnboardingPage && !isLegalPage && user !== null;

  // Afficher un loader pendant le chargement de l'authentification
  if (loading && !['landing', 'login', 'signup', 'mentions-legales', 'confidentialite', 'engagements'].includes(currentPage)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[16px] text-[#6B7280]">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <UserDataProvider initialData={initialUserData}>
      <AdminDataProvider>
        <div className="min-h-screen flex bg-background">
          {/* Sidebar for dashboard pages */}
          {isDashboardPage && userRole && (
            <DashboardSidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              role={userRole}
              userName={currentUserName}
            />
          )}

          {/* Main Content */}
          <div className={`flex-1 flex flex-col ${isDashboardPage ? 'lg:ml-72' : ''} w-full`}>
            {/* Navbar - Only show on auth pages */}
            {isAuthPage && (
              <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
            )}

            {/* Main Content */}
            <main className="flex-1 w-full">
              {/* Auth Pages */}
              {currentPage === 'landing' && <LandingPage onNavigate={handleNavigate} />}
              {currentPage === 'login' && (
                <LoginPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'signup' && (
                <SignupPage onNavigate={handleNavigate} />
              )}

              {/* Onboarding Pages */}
              {currentPage === 'onboarding-step1' && (
                <OnboardingStep1 onComplete={handleOnboardingStep1Complete} />
              )}
              {currentPage === 'onboarding-step2' && (
                <OnboardingStep2
                  formationData={onboardingData.step1}
                  onComplete={handleOnboardingStep2Complete}
                  onBack={() => setCurrentPage('onboarding-step1')}
                />
              )}

              {/* Student Pages */}
              {currentPage === 'student-dashboard' && isStudent && (
                <StudentDashboardModules
                  onNavigate={handleNavigate}
                  authFirstName={currentFirstName}
                />
              )}
              {currentPage === 'module-week1' && isStudent && (
                <ModuleLinearPage
                  moduleNumber={1}
                  onNavigate={handleNavigate}
                  onBack={() => setCurrentPage('student-dashboard')}
                />
              )}
              {currentPage === 'module-week2' && isStudent && (
                <ModuleLinearPage
                  moduleNumber={2}
                  onNavigate={handleNavigate}
                  onBack={() => setCurrentPage('student-dashboard')}
                />
              )}
              {currentPage === 'module-week3' && isStudent && (
                <ModuleLinearPage
                  moduleNumber={3}
                  onNavigate={handleNavigate}
                  onBack={() => setCurrentPage('student-dashboard')}
                />
              )}
              {currentPage === 'module-week4' && isStudent && (
                <ModuleLinearPage
                  moduleNumber={4}
                  onNavigate={handleNavigate}
                  onBack={() => setCurrentPage('student-dashboard')}
                />
              )}
              {currentPage === 'job-tracking' && isStudent && (
                <JobTrackingPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'student-cv' && isStudent && (
                <CVUploadPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'student-practical' && isStudent && (
                <PracticalCasePage onNavigate={handleNavigate} />
              )}
              {currentPage === 'student-profile' && isStudent && (
                <StudentProfilePage
                  onNavigate={handleNavigate}
                  userName={currentUserName}
                  authEmail={currentUserEmail}
                  authFirstName={currentFirstName}
                  authLastName={currentLastName}
                />
              )}

              {/* Admin Pages */}
              {currentPage === 'admin-dashboard' && isAdmin && (
                <AdminDashboard
                  onNavigate={handleNavigate}
                  adminName={currentUserName}
                />
              )}
              {currentPage === 'admin-cv-review' && isAdmin && (
                <AdminCVReviewPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'admin-exercise-review' && isAdmin && (
                <AdminExerciseReviewPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'admin-offer-support' && isAdmin && (
                <AdminOfferSupportPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'admin-profile' && isAdmin && (
                <AdminProfilePage
                  onNavigate={handleNavigate}
                  userName={currentUserName}
                  authEmail={currentUserEmail}
                  authFirstName={currentFirstName}
                  authLastName={currentLastName}
                />
              )}
              {currentPage === 'admin-validation' && isAdmin && (
                <AdminValidationPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'admin-users' && isAdmin && (
                <UserManagementPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'admin-tracking' && isAdmin && (
                <StudentTrackingPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'admin-settings' && isAdmin && (
                <AdminSettingsPage onNavigate={handleNavigate} />
              )}
              {currentPage === 'admin-modules' && isAdmin && (
                <AdminModulesPage onNavigate={handleNavigate} />
              )}

              {/* Legal Pages */}
              {currentPage === 'mentions-legales' && <MentionsLegales onNavigate={handleNavigate} />}
              {currentPage === 'confidentialite' && <Confidentialite onNavigate={handleNavigate} />}
              {currentPage === 'engagements' && <Engagements onNavigate={handleNavigate} />}
            </main>

            {/* Footer - Only show on auth and legal pages */}
            {(isAuthPage || isLegalPage) && (
              <Footer onNavigate={handleNavigate} />
            )}
          </div>
        </div>
      </AdminDataProvider>
    </UserDataProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}