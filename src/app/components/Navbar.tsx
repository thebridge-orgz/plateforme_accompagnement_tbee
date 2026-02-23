import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes';
import { useAuth } from '../auth/AuthContext';
import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';

export function Navbar() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Effet pour réagir à la déconnexion
  useEffect(() => {
    console.log('Navbar - useEffect - user:', user?.email, 'loading:', loading, 'isSigningOut:', isSigningOut);

    if (!user && !loading && isSigningOut) {
      console.log('User signed out, redirecting to home');
      navigate(ROUTES.Home);
      setIsSigningOut(false);
    }
  }, [user, loading, navigate, isSigningOut]);

  // Log pour debug
  useEffect(() => {
    console.log('Navbar - user:', user?.email);
    console.log('Navbar - loading:', loading);
  }, [user, loading]);

  // Fermer le menu quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      console.log('Starting sign out...');
      setIsMenuOpen(false);
      setIsSigningOut(true);

      await signOut();

      console.log('Sign out completed');
      // La redirection se fera via l'effet useEffect
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  const handleDashboardNavigation = () => {
    if (user?.role === 'admin') {
      navigate(ROUTES.AdminDashboard);
    } else {
      navigate(ROUTES.StudentDashboard);
    }
    setIsMenuOpen(false);
  };

  // Afficher un loader seulement pendant le chargement initial ou la déconnexion
  if (loading && !user) {
    return (
      <nav className="w-full bg-white sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[50px]">
          <div className="flex items-center justify-between h-[56px] sm:h-[64px] gap-2 sm:gap-4">
            <Link to={ROUTES.Home}>
              <button
                className="flex items-center gap-[6px] sm:gap-[8px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1548] rounded-[12px] shrink-0 h-[28px] sm:h-[32px]"
                aria-label="Retour à l'accueil"
              >
                <div className="size-[28px] sm:size-[32px] bg-[#1e1548] rounded-[8px] sm:rounded-[12px] flex items-center justify-center group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold leading-[20px] sm:leading-[24px] text-center" style={{ fontSize: '14px', fontFamily: 'Poppins' }}>T</span>
                </div>
                <span className="font-semibold text-[#1e1548] leading-[20px] sm:leading-[24px] text-center" style={{ fontSize: '14px', fontFamily: 'Poppins' }}>TBEE</span>
              </button>
            </Link>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 border-2 border-[#FFD600] border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[50px]">
        <div className="flex items-center justify-between h-[56px] sm:h-[64px] gap-2 sm:gap-4">
          <Link to={ROUTES.Home}>
            <button
              className="flex items-center gap-[6px] sm:gap-[8px] group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1548] rounded-[12px] shrink-0 h-[28px] sm:h-[32px]"
              aria-label="Retour à l'accueil"
            >
              <div className="size-[28px] sm:size-[32px] bg-[#1e1548] rounded-[8px] sm:rounded-[12px] flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold leading-[20px] sm:leading-[24px] text-center" style={{ fontSize: '14px', fontFamily: 'Poppins' }}>T</span>
              </div>
              <span className="font-semibold text-[#1e1548] leading-[20px] sm:leading-[24px] text-center" style={{ fontSize: '14px', fontFamily: 'Poppins' }}>TBEE</span>
            </button>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!user ? (
              <>
                <Link to={ROUTES.SignIn}>
                  <button
                    className="px-3 sm:px-4 md:px-5 h-[36px] sm:h-[40px] md:h-[44px] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1548] font-bold border-2 border-[#E8ECFF] hover:bg-[#E8ECFF]/50 text-[12px] sm:text-[13px] md:text-[14px]"
                    style={{ color: '#364153' }}
                  >
                    <span className="hidden sm:inline">Se connecter</span>
                    <span className="sm:hidden">Connexion</span>
                  </button>
                </Link>
                <Link to={ROUTES.SignUp}>
                  <button
                    className="px-3 sm:px-4 md:px-5 h-[36px] sm:h-[40px] md:h-[44px] bg-[#FDC700] rounded-lg hover:bg-[#FDC700]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FDC700] font-bold text-[12px] sm:text-[13px] md:text-[14px]"
                    style={{ color: '#364153' }}
                  >
                    S'inscrire →
                  </button>
                </Link>
              </>
            ) : (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 px-3 sm:px-4 md:px-5 h-[36px] sm:h-[40px] md:h-[44px] bg-[#E8ECFF] rounded-lg hover:bg-[#E8ECFF]/70 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1548] border-2 border-[#E8ECFF] group"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 bg-[#1E1548] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-semibold">
                    {user.firstName?.[0]}{user.lastName?.[0]}
                  </div>
                  <span className="hidden sm:inline text-[#1E1548] font-medium text-[13px] md:text-[14px]">
                    {user.firstName} {user.lastName}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1E1548] transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-[#E5E7EB] overflow-hidden z-50 animate-fadeIn">
                    <div className="px-4 py-3 bg-[#F9FAFB] border-b border-[#E5E7EB]">
                      <p className="text-[#1E1548] font-semibold text-sm">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-[#6B7280] text-xs mt-1 truncate">
                        {user.email}
                      </p>
                      <div className="mt-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                          ? 'bg-[#1E1548] text-white'
                          : 'bg-[#FFD600] text-[#1E1548]'
                          }`}>
                          {user.role === 'admin' ? 'Administrateur' : 'Candidat'}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={handleDashboardNavigation}
                        className="w-full px-4 py-3 text-left hover:bg-[#F9FAFB] transition-colors flex items-center gap-3 group"
                      >
                        <User className="w-5 h-5 text-[#6B7280] group-hover:text-[#1E1548]" />
                        <div>
                          <p className="text-[#1E1548] font-medium text-sm">Mon tableau de bord</p>
                          <p className="text-[#6B7280] text-xs">Accéder à mon espace</p>
                        </div>
                      </button>

                      <button
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-left hover:bg-[#F9FAFB] transition-colors flex items-center gap-3 group border-t border-[#E5E7EB]"
                      >
                        <LogOut className="w-5 h-5 text-[#6B7280] group-hover:text-red-500" />
                        <div>
                          <p className="text-[#1E1548] font-medium text-sm group-hover:text-red-500">Déconnexion</p>
                          <p className="text-[#6B7280] text-xs">Se déconnecter de TBEE</p>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}