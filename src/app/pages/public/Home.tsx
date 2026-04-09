import { Users, Video, TrendingUp, Target, Wrench, MessageCircle } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Link } from 'react-router-dom';
import { routes } from '../../router/routes';

function Home() {
  return (
    <div className="w-full">
      <Navbar />
      {/* Hero Section */}
      <section className="w-full bg-white py-6 sm:py-10 md:py-12 lg:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 lg:gap-24 items-center">
            {/* Left Content */}
            <div className="max-w-[600px] mx-auto lg:mx-0">
              <h1 className="mb-4 sm:mb-6 text-[28px] sm:text-[32px] lg:text-[34px] leading-[34px] sm:leading-[38px] lg:leading-[42px]">
                Trouve ton alternance avec un{" "}
                <span className="relative inline-block whitespace-nowrap">
                  accompagnement
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="12"
                    viewBox="0 0 300 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8C80 3 220 3 298 8"
                      stroke="#FFD600"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                sur-mesure
              </h1>

              <p className="text-[#6B7280] mb-6 sm:mb-8 text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px]">
                Une plateforme d'accompagnement dédiée aux étudiants, avec une attention particulière
                pour les personnes RQTH. Formations vidéo, outils personnalisés et ressources adaptées.
              </p>

              {/* Image on Mobile - Hidden on Desktop */}
              <div className="flex justify-center lg:hidden mb-6">
                <div className="w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1765648684644-cdda3340263f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBjYXJlZXJ8ZW58MXx8fHwxNzY5NTIyMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Jeune professionnelle souriante"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:justify-center lg:justify-start">
                <Link to={routes.SignUp.path}>
                  <button
                    className="w-full sm:w-auto px-3 sm:px-4 md:px-5 h-[44px] bg-[#FFD600] text-[#1E1548] rounded-lg font-medium hover:bg-[#FFD600]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] text-[12px] sm:text-[13px] md:text-[14px] flex items-center justify-center whitespace-nowrap"
                    style={{ fontWeight: 600 }}
                  >
                    Commencer gratuitement
                  </button>
                </Link>
                <Link to={`${routes.Home.path}#services`} className="w-full sm:w-auto px-3 sm:px-4 md:px-5 h-[44px] border-2 border-[#E8ECFF] text-[#1E1548] rounded-lg font-medium hover:bg-[#E8ECFF]/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E1548] flex items-center justify-center text-[12px] sm:text-[13px] md:text-[14px] whitespace-nowrap"
                  style={{ fontWeight: 600 }}
                >
                  Découvrir la plateforme
                </Link>
              </div>
            </div>

            {/* Right Image - Hidden on Mobile */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1765648684644-cdda3340263f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBjYXJlZXJ8ZW58MXx8fHwxNzY5NTIyMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Jeune professionnelle souriante"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Cards Section */}
      <section id="services" className="w-full bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1 - Parcours structuré */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Parcours d'apprentissage structuré"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="mb-2 text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548]">
                  Parcours structuré
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                  Des étapes claires pour progresser à ton rythme
                </p>
              </div>
            </div>

            {/* Card 2 - Vidéos quotidiennes */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1627231603574-03e182d67e4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Personne regardant des vidéos de formation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="mb-2 text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548]">
                  Vidéos quotidiennes
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                  Contenus motivants à suivre, mais adaptés et accessibles
                </p>
              </div>
            </div>

            {/* Card 3 - Accompagnement RQTH */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[16/10] w-full overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1553445166-aa556685625c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
                  alt="Accompagnement inclusif et bienveillant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 sm:p-6">
                <h3 className="mb-2 text-[16px] sm:text-[18px] font-semibold leading-[24px] sm:leading-[28px] text-[#1E1548]">
                  Accompagnement RQTH
                </h3>
                <p className="text-[13px] sm:text-[14px] leading-[20px] sm:leading-[22px] text-[#6B7280]">
                  Aménagements et conseils spécifiques et bienveillants
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full bg-[#F9FAFB] py-8 sm:py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
            {/* Stat 1 */}
            <div className="text-center">
              <div className="mb-2 text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#1E1548]">
                6
              </div>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Chapitres d'accompagnement
              </p>
            </div>

            {/* Stat 2 */}
            <div className="text-center">
              <div className="mb-2 text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#1E1548]">
                100%
              </div>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Accessible et inclusive
              </p>
            </div>

            {/* Stat 3 */}
            <div className="text-center">
              <div className="mb-2 text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] font-bold text-[#1E1548]">
                24/7
              </div>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Accès à tes ressources
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="accompagnement" className="w-full bg-white py-8 sm:py-12 md:py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="mb-3 sm:mb-4 text-[24px] sm:text-[28px] lg:text-[32px] leading-[30px] sm:leading-[34px] lg:leading-[40px]">Un accompagnement complet pour réussir</h2>
            <p className="max-w-[600px] mx-auto text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
              Toutes les ressources et le soutien dont tu as besoin pour décrocher ton alternance
            </p>
          </div>

          {/* Features Grid - Alternating colors */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Feature 1 - Bleu */}
            <div className="bg-[#E8ECFF] rounded-2xl p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#155dfc] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-[28px] text-[#1E1548]">
                Parcours personnalisé
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Un accompagnement adapté à ton niveau, ta formation et tes besoins spécifiques
              </p>
            </div>

            {/* Feature 2 - Jaune */}
            <div className="bg-[#FFF9E6] rounded-2xl p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD600] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Video className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1548]" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-[28px] text-[#1E1548]">
                Formations vidéo
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Des vidéos pédagogiques et du repos moti pour avancer pas à pas
              </p>
            </div>

            {/* Feature 3 - Bleu */}
            <div className="bg-[#E8ECFF] rounded-2xl p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#155dfc] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-[28px] text-[#1E1548]">
                Accessibilité RQTH
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Contenus accessibles, transcriptions et conseils pour valoriser tes aménagements
              </p>
            </div>

            {/* Feature 4 - Jaune */}
            <div className="bg-[#FFF9E6] rounded-2xl p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD600] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1548]" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-[28px] text-[#1E1548]">
                Outils pratiques
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                CV, lettres de motivation, préparation aux entretiens et suivi de candidatures
              </p>
            </div>

            {/* Feature 5 - Bleu */}
            <div className="bg-[#E8ECFF] rounded-2xl p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#155dfc] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFFFFF]" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-[28px] text-[#1E1548]">
                Suivi de progression
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Visualise tes avancées et reste motivé(e) tout au long de ton parcours
              </p>
            </div>

            {/* Feature 6 - Jaune */}
            <div className="bg-[#FFF9E6] rounded-2xl p-6 sm:p-8">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD600] rounded-full flex items-center justify-center mb-3 sm:mb-4">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#1E1548]" />
              </div>
              <h3 className="mb-2 sm:mb-3 text-[18px] sm:text-[20px] font-semibold leading-[26px] sm:leading-[28px] text-[#1E1548]">
                Communauté bienveillante
              </h3>
              <p className="text-[14px] sm:text-[16px] leading-[22px] sm:leading-[26px] text-[#6B7280]">
                Échange avec d'autres étudiants et bénéficie du soutien de tes accompagnateurs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="inscription" className="w-full" style={{ backgroundImage: "linear-gradient(167.017deg, rgba(249, 250, 251, 0.2) 0%, rgba(20, 71, 230, 0.2) 50%, rgba(239, 246, 255, 0.04) 100%)" }}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-24 py-8 sm:py-12 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
            {/* Left Content */}
            <div className="flex flex-col gap-6 sm:gap-8 flex-1">
              <div className="flex flex-col gap-3 sm:gap-4">
                <h2 className="text-[#101828] text-[24px] sm:text-[28px] lg:text-[32px] leading-[30px] sm:leading-[34px] lg:leading-[40px] font-bold tracking-tight">
                  Prêt(e) à commencer ton parcours ?
                </h2>
                <p className="text-[#101828] text-[14px] sm:text-[16px] leading-[22px] sm:leading-[25.6px] font-medium">
                  Rejoins la plateforme dès aujourd'hui et bénéficie d'un accompagnement personnalisé pour trouver l'alternance qui te correspond
                </p>
              </div>

              {/* Image on Mobile - Hidden on Desktop */}
              <div className="flex justify-center lg:hidden">
                <div className="w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1650064175560-369b5b45b649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBhbHRlcm5hbmNlJTIwY2FyZWVyfGVufDF8fHx8MTc2OTUyMjMwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Jeune professionnelle souriante"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <Link to={routes.SignUp.path}>
                <button
                  className="px-5 sm:px-6 h-[44px] sm:h-[48px] bg-[#fdc700] text-[#364153] rounded-lg hover:bg-[#fdc700]/90 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#fdc700] w-full lg:w-auto lg:self-start text-[14px] sm:text-[16px] font-semibold"
                >
                  Créer mon compte gratuitement →
                </button>
              </Link>
            </div>

            {/* Right Image - Hidden on Mobile */}
            <div className="hidden lg:flex justify-center lg:justify-end w-full lg:w-auto">
              <div className="w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1650064175560-369b5b45b649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBhbHRlcm5hbmNlJTIwY2FyZWVyfGVufDF8fHx8MTc2OTUyMjMwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Jeune professionnelle souriante"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;