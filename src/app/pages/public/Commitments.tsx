import { ArrowLeft, Heart, Users, Accessibility, Shield, Target, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';
import { Footer } from "../../components/Footer";

function Commitments() {
  return (
    <div className="w-full bg-white">
      {/* Header */}
      <div className="w-full border-b border-[#E5E7EB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 py-4 sm:py-6">
          <Link to={ROUTES.Home}>
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
          <div className="mb-8 sm:mb-12">
            <h1 className="mb-3 sm:mb-4 text-[28px] sm:text-[36px] lg:text-[48px] leading-[34px] sm:leading-[42px] lg:leading-[56px]">Nos engagements à tous</h1>
            <p className="text-[#6B7280] text-[16px] sm:text-[18px] leading-[24px] sm:leading-[28px]">
              Chez TBEE, nous sommes engagés à créer une plateforme inclusive, accessible et bienveillante pour accompagner tous les étudiants vers l'alternance, avec une attention particulière pour les personnes en situation de handicap (RQTH).
            </p>
          </div>

          {/* Hero Section */}
          <section className="mb-8 sm:mb-12 p-6 sm:p-8 bg-gradient-to-br from-[#E8ECFF] to-[#FFF9E6] rounded-xl sm:rounded-2xl">
            <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#FFD600] rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#1E1548]" />
              </div>
              <div>
                <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                  Notre mission
                </h2>
                <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280] mt-2">
                  Rendre l'accès à l'alternance équitable et accessible pour tous, en proposant un accompagnement sur-mesure qui respecte les besoins et le rythme de chacun.
                </p>
              </div>
            </div>
          </section>

          {/* 1. Accessibilité universelle */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#155dfc] rounded-full flex items-center justify-center flex-shrink-0">
                <Accessibility className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                1. Accessibilité universelle
              </h2>
            </div>
            <div className="space-y-4 pl-0 sm:pl-16">
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Nous nous engageons à rendre notre plateforme accessible à tous, quels que soient vos besoins :
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 sm:p-4 bg-[#F9FAFB] rounded-xl border-l-4 border-[#FFD600]">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-2">
                    Accessibilité technique
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1">
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Conformité WCAG 2.1 niveau AA
                    </li>
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Compatible avec les lecteurs d'écran
                    </li>
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Navigation au clavier complète
                    </li>
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Contrastes de couleurs optimisés
                    </li>
                  </ul>
                </div>

                <div className="p-3 sm:p-4 bg-[#F9FAFB] rounded-xl border-l-4 border-[#155dfc]">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-2">
                    Contenus adaptés
                  </h4>
                  <ul className="list-disc pl-4 sm:pl-5 space-y-1">
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Sous-titres sur toutes les vidéos
                    </li>
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Transcriptions textuelles disponibles
                    </li>
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Taille de police ajustable
                    </li>
                    <li className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                      Contenus en langage clair et simple
                    </li>
                  </ul>
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-[#E8ECFF] rounded-xl">
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#1E1548]">
                  <strong>Notre engagement :</strong> Amélioration continue de l'accessibilité basée sur vos retours et les dernières recommandations.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Accompagnement RQTH */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD600] rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1548]" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                2. Accompagnement spécifique RQTH
              </h2>
            </div>
            <div className="space-y-4 pl-0 sm:pl-16">
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Pour les personnes en situation de handicap, nous proposons un accompagnement adapté et bienveillant :
              </p>

              <div className="space-y-3">
                <div className="p-3 sm:p-4 bg-[#FFF9E6] rounded-xl">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-2">
                    ✓ Conseils personnalisés
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                    Des modules dédiés pour valoriser votre RQTH auprès des employeurs et négocier les aménagements nécessaires.
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-[#FFF9E6] rounded-xl">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-2">
                    ✓ Ressources adaptées
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                    Guides pratiques sur vos droits, les dispositifs d'aide (AGEFIPH, FIPHFP), et les partenaires locaux.
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-[#FFF9E6] rounded-xl">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-2">
                    ✓ Confidentialité respectée
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                    Le partage de votre statut RQTH est entièrement volontaire et sous votre contrôle. Aucune information n'est partagée sans votre accord explicite.
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-[#FFF9E6] rounded-xl">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-2">
                    ✓ Support humain
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                    Possibilité de demander un accompagnement administratif pour vos démarches spécifiques.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 3. Bienveillance et non-discrimination */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#155dfc] rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                3. Bienveillance et non-discrimination
              </h2>
            </div>
            <div className="space-y-4 pl-0 sm:pl-16">
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Nous créons un environnement où chacun se sent respecté et soutenu :
              </p>

              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Zéro tolérance</strong> pour toute forme de discrimination (handicap, origine, genre, orientation, etc.)
                </li>
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Langage inclusif</strong> dans tous nos contenus et communications
                </li>
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Modération active</strong> pour garantir un espace sûr et bienveillant
                </li>
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Formation continue</strong> de notre équipe sur les enjeux de diversité et d'inclusion
                </li>
              </ul>
            </div>
          </section>

          {/* 4. Transparence */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD600] rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1548]" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                4. Transparence et écoute
              </h2>
            </div>
            <div className="space-y-4 pl-0 sm:pl-16">
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Nous croyons en une relation transparente et à l'écoute avec nos utilisateurs :
              </p>

              <div className="grid grid-cols-1 gap-3">
                <div className="p-3 sm:p-4 bg-[#F9FAFB] rounded-xl">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-1">
                    Communication claire
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                    Informations transparentes sur nos services, nos partenaires et nos pratiques
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-[#F9FAFB] rounded-xl">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-1">
                    Feedback continu
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                    Vos retours sont essentiels pour améliorer la plateforme. Nous écoutons et agissons.
                  </p>
                </div>

                <div className="p-3 sm:p-4 bg-[#F9FAFB] rounded-xl">
                  <h4 className="text-[15px] sm:text-[16px] font-semibold leading-[22px] sm:leading-[24px] text-[#1E1548] mb-1">
                    Support réactif
                  </h4>
                  <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                    Une équipe disponible pour répondre à vos questions et résoudre vos problèmes rapidement
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Qualité et efficacité */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#155dfc] rounded-full flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                5. Qualité et amélioration continue
              </h2>
            </div>
            <div className="space-y-4 pl-0 sm:pl-16">
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Nous nous engageons à vous fournir un accompagnement de qualité :
              </p>

              <ul className="list-disc pl-5 sm:pl-6 space-y-2">
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Contenus expertisés</strong> créés avec des professionnels du recrutement et de l'orientation
                </li>
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Mises à jour régulières</strong> pour refléter les évolutions du marché de l'alternance
                </li>
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Tests utilisateurs</strong> pour garantir une expérience fluide et intuitive
                </li>
                <li className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                  <strong className="text-[#1E1548]">Mesure d'impact</strong> pour évaluer l'efficacité de notre accompagnement
                </li>
              </ul>
            </div>
          </section>

          {/* 6. Protection des données */}
          <section className="mb-8 sm:mb-12">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD600] rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1548]" />
              </div>
              <h2 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
                6. Protection de vos données
              </h2>
            </div>
            <div className="space-y-4 pl-0 sm:pl-16">
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                La protection de votre vie privée est une priorité absolue :
              </p>

              <div className="p-4 sm:p-6 bg-[#E8ECFF] rounded-xl">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#155dfc] mt-1">✓</span>
                    <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#1E1548]">
                      Conformité stricte au RGPD et à toutes les réglementations en vigueur
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#155dfc] mt-1">✓</span>
                    <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#1E1548]">
                      Sécurité maximale pour le stockage de vos documents (CV, lettres, etc.)
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#155dfc] mt-1">✓</span>
                    <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#1E1548]">
                      Aucune vente ou partage de vos données à des tiers
                    </p>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#155dfc] mt-1">✓</span>
                    <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#1E1548]">
                      Contrôle total sur vos informations personnelles
                    </p>
                  </li>
                </ul>
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280] mt-4">
                  Pour en savoir plus, consultez notre {" "}
                  <Link to={ROUTES.PrivacyPolicy} className="text-[#155dfc] hover:underline" style={{ fontWeight: 500 }}>
                    Politique de confidentialité
                  </Link>.
                </p>
              </div>
            </div>
          </section>

          {/* Nos indicateurs */}
          <section className="mb-8 sm:mb-12">
            <h2 className="mb-4 sm:mb-6 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548]">
              Nos indicateurs d'engagement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="p-4 sm:p-6 bg-gradient-to-br from-[#E8ECFF] to-white rounded-xl sm:rounded-2xl text-center border border-[#E8ECFF]">
                <div className="mb-2 text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#155dfc]">
                  100%
                </div>
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                  Des vidéos sous-titrées
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-[#FFF9E6] to-white rounded-xl sm:rounded-2xl text-center border border-[#FFD600]">
                <div className="mb-2 text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#1E1548]">
                  AA
                </div>
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                  Niveau WCAG 2.1
                </p>
              </div>

              <div className="p-4 sm:p-6 bg-gradient-to-br from-[#E8ECFF] to-white rounded-xl sm:rounded-2xl text-center border border-[#E8ECFF]">
                <div className="mb-2 text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#155dfc]">
                  24h
                </div>
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                  Temps de réponse max
                </p>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section className="mb-8 sm:mb-12">
            <div className="p-6 sm:p-8 bg-gradient-to-br from-[#1E1548] to-[#155dfc] rounded-xl sm:rounded-2xl text-center">
              <h3 className="mb-2 sm:mb-3 text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-white">
                Vous avez des suggestions ?
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-white mb-4 sm:mb-6 opacity-90">
                Nous sommes constamment à l'écoute de vos retours pour améliorer nos services et notre accessibilité.
              </p>
              <a
                href="mailto:contact@the-bridge-ecole.fr"
                className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-[#FFD600] text-[#1E1548] rounded-lg hover:bg-[#FFD600]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white text-[14px] sm:text-[16px] font-semibold"
              >
                Nous contacter
              </a>
            </div>
          </section>

          {/* Date de mise à jour */}
          <section>
            <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#9CA3AF]">
              Dernière mise à jour : Janvier 2026
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Commitments;