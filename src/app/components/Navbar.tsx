import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export function Navbar() {
  return (
    <nav className="w-full bg-white sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[50px]">
        <div className="flex items-center justify-between h-[56px] sm:h-[64px] gap-2 sm:gap-4">
          {/* Logo */}
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

          {/* CTA Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
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
          </div>
        </div>
      </div>
    </nav>
  );
}