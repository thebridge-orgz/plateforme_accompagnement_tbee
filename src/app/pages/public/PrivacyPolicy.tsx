import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, AlertCircle } from "lucide-react";
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';
import { Footer } from "../../components/Footer";

function PrivacyPolicy() {
    return (
        <div className="w-full bg-white">
            {/* Header */}
            <div className="w-full border-b border-[#E5E7EB]">
                <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 py-4 sm:py-6">
                    <Link to={routes.Home.path}>
                        <button
                            className="flex items-center gap-2 text-[#1E1548] hover:text-[#1E1548]/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-2 sm:px-3 py-2"
                            style={{ fontSize: '13px', fontWeight: 500 }}
                        >
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                            Retour à l'accueil
                        </button>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 py-8 sm:py-12 md:py-16">
                <div className="max-w-[800px]">
                    <div className="mb-6 sm:mb-8">
                        <h1 className="mb-3 sm:mb-4 text-[28px] sm:text-[36px] lg:text-[48px] leading-[34px] sm:leading-[42px] lg:leading-[56px]">Politique de confidentialité</h1>
                        <p className="text-[#6B7280] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px]">
                            Chez TBEE, nous prenons la protection de vos données personnelles très au sérieux. Cette politique vous explique comment nous collectons, utilisons et protégeons vos informations.
                        </p>
                    </div>

                    {/* Introduction */}
                    <section className="mb-8 sm:mb-12 p-4 sm:p-6 bg-[#E8ECFF] rounded-xl sm:rounded-2xl">
                        <div className="flex items-start gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#155dfc] rounded-full flex items-center justify-center flex-shrink-0">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="mb-2 text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548]">
                                    Votre confiance est notre priorité
                                </h3>
                                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                                    Nous nous engageons à respecter le RGPD et à garantir la sécurité et la confidentialité de vos données personnelles.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 1. Responsable du traitement */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            1. Responsable du traitement des données
                        </h2>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                            Le responsable du traitement des données est :
                        </p>
                        <div className="mt-3 p-3 sm:p-4 bg-[#F9FAFB] rounded-xl">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">TBEE SAS</strong><br />
                                Email : contact@the-bridge-ecole.fr<br />
                                Téléphone : [Numéro à compléter]
                            </p>
                        </div>
                    </section>

                    {/* 2. Données collectées */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 flex items-center gap-2 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            <Database className="w-5 h-5 sm:w-6 sm:h-6 text-[#155dfc]" />
                            2. Données que nous collectons
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548]">
                                    Données d'inscription
                                </h3>
                                <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Nom et prénom
                                    </li>
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Adresse email
                                    </li>
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Numéro de téléphone (optionnel)
                                    </li>
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Date de naissance
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-2 text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548]">
                                    Données de parcours
                                </h3>
                                <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Niveau d'études et formation recherchée
                                    </li>
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Progression dans les modules de formation
                                    </li>
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Documents téléchargés (CV, lettres de motivation)
                                    </li>
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Candidatures suivies
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="mb-2 text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548]">
                                    Données RQTH (optionnel et volontaire)
                                </h3>
                                <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Statut RQTH (uniquement si vous choisissez de le partager)
                                    </li>
                                    <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Aménagements souhaités pour l'accompagnement
                                    </li>
                                </ul>
                            </div>

                            <div className="p-3 sm:p-4 bg-[#FFF9E6] rounded-xl border border-[#FFD600]">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#1E1548] flex-shrink-0 mt-0.5" />
                                    <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#1E1548]">
                                        <strong>Important :</strong> Le partage de votre statut RQTH est entièrement volontaire. Ces informations ne sont jamais partagées avec des tiers sans votre consentement explicite.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 3. Utilisation des données */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 flex items-center gap-2 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-[#155dfc]" />
                            3. Comment nous utilisons vos données
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Nous utilisons vos données personnelles pour :
                            </p>
                            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Créer et gérer votre compte utilisateur
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Personnaliser votre parcours d'accompagnement
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Suivre votre progression dans les modules
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Vous fournir un accompagnement adapté à vos besoins (RQTH ou non)
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Vous envoyer des notifications importantes (validation de documents, rappels, etc.)
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Améliorer nos services et contenus pédagogiques
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Respecter nos obligations légales
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 4. Base légale */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            4. Base légale du traitement
                        </h2>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                            Le traitement de vos données repose sur :
                        </p>
                        <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
                            <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">Votre consentement</strong> pour les données RQTH et les communications marketing
                            </li>
                            <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">L'exécution du contrat</strong> pour la fourniture de nos services d'accompagnement
                            </li>
                            <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">Notre intérêt légitime</strong> pour l'amélioration de nos services
                            </li>
                        </ul>
                    </section>

                    {/* 5. Partage des données */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            5. Partage de vos données
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données uniquement dans les cas suivants :
                            </p>
                            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    <strong className="text-[#1E1548]">Avec votre consentement explicite</strong> (par exemple, pour partager votre CV avec un employeur)
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    <strong className="text-[#1E1548]">Avec nos prestataires de services</strong> (hébergement, outils d'analyse) qui sont contractuellement tenus de protéger vos données
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    <strong className="text-[#1E1548]">Pour respecter la loi</strong> ou répondre à une demande légale
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 6. Sécurité */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 flex items-center gap-2 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-[#155dfc]" />
                            6. Sécurité de vos données
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles pour protéger vos données :
                            </p>
                            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Chiffrement des données en transit (HTTPS/SSL)
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Stockage sécurisé sur des serveurs protégés
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Accès limité aux données (principe du moindre privilège)
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Surveillance et mise à jour régulière de nos systèmes
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    Authentification forte pour l'accès à votre compte
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* 7. Durée de conservation */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            7. Durée de conservation
                        </h2>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                            Nous conservons vos données personnelles :
                        </p>
                        <ul className="list-disc pl-5 sm:pl-6 space-y-2 mt-3">
                            <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">Données de compte :</strong> Pendant toute la durée de votre utilisation de nos services + 3 ans après votre dernière activité
                            </li>
                            <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">Documents (CV, lettres) :</strong> Jusqu'à leur suppression par vos soins ou 1 an après votre dernière activité
                            </li>
                            <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                <strong className="text-[#1E1548]">Données RQTH :</strong> Supprimées immédiatement à votre demande
                            </li>
                        </ul>
                    </section>

                    {/* 8. Vos droits */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 flex items-center gap-2 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            <UserCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#155dfc]" />
                            8. Vos droits
                        </h2>
                        <div className="space-y-4">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Conformément au RGPD, vous disposez des droits suivants :
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-[#F9FAFB] rounded-xl">
                                    <h4 className="text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548] mb-2">
                                        Droit d'accès
                                    </h4>
                                    <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Obtenir une copie de vos données personnelles
                                    </p>
                                </div>

                                <div className="p-4 bg-[#F9FAFB] rounded-xl">
                                    <h4 className="text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548] mb-2">
                                        Droit de rectification
                                    </h4>
                                    <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Corriger des données inexactes ou incomplètes
                                    </p>
                                </div>

                                <div className="p-4 bg-[#F9FAFB] rounded-xl">
                                    <h4 className="text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548] mb-2">
                                        Droit à l'effacement
                                    </h4>
                                    <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Demander la suppression de vos données
                                    </p>
                                </div>

                                <div className="p-4 bg-[#F9FAFB] rounded-xl">
                                    <h4 className="text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548] mb-2">
                                        Droit à la portabilité
                                    </h4>
                                    <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Récupérer vos données dans un format lisible
                                    </p>
                                </div>

                                <div className="p-4 bg-[#F9FAFB] rounded-xl">
                                    <h4 className="text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548] mb-2">
                                        Droit d'opposition
                                    </h4>
                                    <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Vous opposer au traitement de vos données
                                    </p>
                                </div>

                                <div className="p-4 bg-[#F9FAFB] rounded-xl">
                                    <h4 className="text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548] mb-2">
                                        Droit de limitation
                                    </h4>
                                    <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                        Limiter le traitement de vos données
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-[#E8ECFF] rounded-xl mt-6">
                                <h4 className="text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548] mb-2">
                                    Comment exercer vos droits ?
                                </h4>
                                <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280] mb-3">
                                    Pour exercer l'un de ces droits, contactez-nous à :
                                </p>
                                <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#1E1548]">
                                    <strong>Email :</strong> contact@the-bridge-ecole.fr<br />
                                    <strong>Délai de réponse :</strong> 1 mois maximum
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* 9. Cookies */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            9. Cookies et technologies similaires
                        </h2>
                        <div className="space-y-3">
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Nous utilisons des cookies pour améliorer votre expérience :
                            </p>
                            <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    <strong className="text-[#1E1548]">Cookies essentiels :</strong> Nécessaires au fonctionnement du site (authentification, sécurité)
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    <strong className="text-[#1E1548]">Cookies analytiques :</strong> Pour comprendre comment vous utilisez la plateforme
                                </li>
                                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                    <strong className="text-[#1E1548]">Cookies de préférence :</strong> Pour mémoriser vos choix et préférences
                                </li>
                            </ul>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                                Vous pouvez gérer vos préférences de cookies dans les paramètres de votre navigateur.
                            </p>
                        </div>
                    </section>

                    {/* 10. Modifications */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            10. Modifications de cette politique
                        </h2>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                            Nous pouvons modifier cette politique de confidentialité pour refléter les changements dans nos pratiques ou pour des raisons légales. Nous vous informerons de tout changement significatif par email ou via une notification sur la plateforme.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="mb-8 sm:mb-12">
                        <h2 className="mb-3 sm:mb-4 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                            11. Nous contacter
                        </h2>
                        <div className="p-6 bg-[#FFF9E6] rounded-xl">
                            <p className="text-[16px] sm:text-[18px] leading-[22px] sm:leading-[26px] text-[#6B7280] mb-3">
                                Pour toute question concernant cette politique de confidentialité ou le traitement de vos données :
                            </p>
                            <p className="text-[16px] sm:text-[18px] leading-[22px] sm:leading-[26px] text-[#1E1548]">
                                <strong>Email :</strong> contact@the-bridge-ecole.fr<br />
                                <strong>Adresse :</strong> [Adresse à compléter]
                            </p>
                            <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280] mt-3">
                                Vous avez également le droit de déposer une plainte auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.
                            </p>
                        </div>
                    </section>

                    {/* Date de mise à jour */}
                    <section>
                        <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#9CA3AF]">
                            Dernière mise à jour : Janvier 2026
                        </p>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;