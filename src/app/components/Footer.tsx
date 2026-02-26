import { Link } from 'react-router-dom';
import { ROUTES } from '../router/routes';

export function Footer() {
  return (
    <footer className="w-full bg-[#101828] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 py-8 sm:py-12 md:py-16">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 md:gap-16 lg:gap-20 mb-10 sm:mb-14 md:mb-16">
          {/* Column 1 - Brand & Description */}
          <div className="flex flex-col gap-4 sm:gap-6 max-w-full md:max-w-[333px]">
            <div className="flex items-center gap-[8px]">
              <div className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] bg-white rounded-[10px] sm:rounded-[12px] flex items-center justify-center">
                <span className="text-[#1e1548] font-bold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px]">T</span>
              </div>
              <span className="font-semibold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px]">TBEE</span>
            </div>
            <p className="text-white/80 text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px]">
              Plateforme inclusive d'accompagnement vers l'alternance, dédiée aux étudiants avec une attention particulière pour les personnes RQTH.
            </p>
          </div>

          {/* Column 2 - Navigation */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-white text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] font-medium">
              Navigation
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li>
                <Link to={`${ROUTES.Home}#services`} className="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px]">
                  Nos services
                </Link>
              </li>
              <li>
                <Link to={`${ROUTES.Home}#accompagnement`} className="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px]">
                  Accompagnement
                </Link>
              </li>
              <li>
                <Link to={`${ROUTES.Home}#inscription`} className="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px]">
                  Inscription
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - Accessibilité */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h4 className="text-white text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] font-medium">
              Accessibilité
            </h4>
            <ul className="flex flex-col gap-2 sm:gap-3">
              <li>
                <Link to={ROUTES.Commitments} className="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded text-left text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px]">
                  Nos engagements
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PrivacyPolicy} className="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded text-left text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px]">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to={ROUTES.LegalNotice} className="text-white/80 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded text-left text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px]">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-white/20 mb-4 sm:mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-white/60 text-[12px] sm:text-[14px] leading-[18px] sm:leading-[22px]">
            © 2026 The Bridge Ecole. | Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}