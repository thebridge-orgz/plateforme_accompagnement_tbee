import { ArrowLeft } from "lucide-react";
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';
import { Footer } from "../components/Footer";

function LegalNotice() {
    return (
        <div className="w-full bg-white">
            {/* Header */}
            <div className="w-full border-b border-[#E5E7EB]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 py-4 sm:py-6">
                    <Link to={ROUTES.Home}>
                        <button
                            className="flex items-center gap-2 text-[#1E1548] hover:text-[#1E1548]/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-2 sm:px-3 py-2"
                            style={{ fontSize: '13px', fontWeight: 500 }}>
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            Retour à l'accueil
                        </button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 py-8 sm:py-12 md:py-16">
                <div className="max-w-[800px]">
                    <h1 className="mb-6 sm:mb-8 text-[28px] sm:text-[36px] lg:text-[48px] leading-[34px] sm:leading-[42px] lg:leading-[56px]">Mentions légales</h1>

                    {/* Éditeur du site */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            1. Éditeur du site
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Le site TBEE est édité par :
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">TBEE SAS</strong><br />
                                Société par Actions Simplifiée au capital de 10 000 €<br />
                                Siège social : [Adresse à compléter]<br />
                                RCS : [Numéro RCS à compléter]<br />
                                SIRET : [Numéro SIRET à compléter]<br />
                                N° TVA intracommunautaire : [Numéro TVA à compléter]
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">Directeur de la publication :</strong> [Nom du directeur]<br />
                                <strong className="text-[#1E1548]">Contact :</strong> contact@the-bridge-ecole.fr
                            </p>
                        </div>
                    </section>

                    {/* Hébergement */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            2. Hébergement
                        </h2>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                            Le site TBEE est hébergé par :
                        </p>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                            <strong className="text-[#1E1548]">Vercel Inc.</strong><br />
                            340 S Lemon Ave #4133<br />
                            Walnut, CA 91789<br />
                            États-Unis
                        </p>
                    </section>

                    {/* Propriété intellectuelle */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            3. Propriété intellectuelle
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                L'ensemble du contenu de ce site (textes, images, vidéos, logo, charte graphique, etc.) est la propriété exclusive de TBEE ou de ses partenaires.
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Toute reproduction, représentation, modification, publication, transmission ou dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit est interdite sans autorisation écrite préalable de TBEE.
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                La marque TBEE et son logo sont des marques déposées. Toute utilisation non autorisée de ces marques constitue une contrefaçon susceptible d'engager la responsabilité civile et pénale de son auteur.
                            </p>
                        </div>
                    </section>

                    {/* Données personnelles */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            4. Protection des données personnelles
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Pour exercer ces droits, vous pouvez nous contacter à l'adresse : contact@tbee.fr
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Pour plus d'informations sur la gestion de vos données personnelles, consultez notre{" "}
                                <Link to={ROUTES.PrivacyPolicy} className="text-[#155dfc] hover:underline"
                                    style={{ fontWeight: 500 }}
                                >
                                    Politique de confidentialité
                                </Link>.
                            </p>
                        </div>
                    </section>

                    {/* Cookies */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            5. Cookies
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Le site TBEE utilise des cookies pour améliorer l'expérience utilisateur et réaliser des statistiques de visite.
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Vous pouvez à tout moment désactiver ces cookies via les paramètres de votre navigateur. Notez que certaines fonctionnalités du site peuvent être impactées.
                            </p>
                        </div>
                    </section>

                    {/* Responsabilité */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            6. Limitation de responsabilité
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                TBEE s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, TBEE ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition.
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                TBEE ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.
                            </p>
                        </div>
                    </section>

                    {/* Droit applicable */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            7. Droit applicable et juridiction
                        </h2>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                            Les présentes mentions légales sont régies par le droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
                        </p>
                    </section>

                    {/* Date de mise à jour */}
                    <section>
                        <p className="text-[12px] sm:text-[14px] leading-[18px] sm:leading-[22px] text-[#9CA3AF]">
                            Dernière mise à jour : Janvier 2026
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LegalNotice;