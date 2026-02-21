import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import { Home as HomeIcon, ArrowLeft } from "lucide-react";

function NotFound() {
    return (
        <div className="w-full">
            <section className="w-full bg-white py-16 sm:py-20 md:py-24 lg:py-32">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
                    <div className="flex flex-col items-center text-center">

                        {/* 404 Number */}
                        <h1 className="text-[120px] sm:text-[150px] md:text-[180px] font-bold text-[#1E1548] leading-none mb-4">
                            404
                        </h1>

                        {/* Title */}
                        <h2 className="text-[28px] sm:text-[32px] md:text-[36px] font-semibold text-[#1E1548] mb-4">
                            Page non trouvée
                        </h2>

                        {/* Description */}
                        <p className="max-w-[600px] text-[16px] sm:text-[18px] text-[#6B7280] mb-8 sm:mb-10">
                            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                            Pas d'inquiétude, vous pouvez retourner à l'accueil et poursuivre votre parcours !
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to={ROUTES.Home}>
                                <button
                                    className="px-6 sm:px-8 h-[48px] bg-[#FFD600] text-[#1E1548] rounded-lg font-semibold hover:bg-[#FFD600]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] flex items-center justify-center gap-2 text-[14px] sm:text-[16px] w-full sm:w-auto"
                                >
                                    <HomeIcon className="w-5 h-5" />
                                    Retour à l'accueil
                                </button>
                            </Link>

                            <button
                                onClick={() => window.history.back()}
                                className="px-6 sm:px-8 h-[48px] border-2 border-[#E8ECFF] text-[#1E1548] rounded-lg font-semibold hover:bg-[#E8ECFF]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1548] flex items-center justify-center gap-2 text-[14px] sm:text-[16px] w-full sm:w-auto"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Page précédente
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default NotFound;