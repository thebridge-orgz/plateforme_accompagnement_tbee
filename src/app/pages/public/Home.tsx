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

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left */}
            <div className="max-w-[560px] mx-auto lg:mx-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-5 bg-[#E8ECFF] text-[#1E1548] rounded-full text-[12px] font-semibold">
                <div className="w-1.5 h-1.5 bg-[#155dfc] rounded-full" />
                Plateforme inclusive · Attention particulière RQTH
              </div>

              <h1 className="mb-4 text-[30px] sm:text-[36px] lg:text-[40px] font-extrabold leading-[1.18] text-[#1E1548]">
                Trouve ton alternance avec un{" "}
                <span className="relative inline-block whitespace-nowrap">
                  accompagnement
                  <svg
                    className="absolute -bottom-1 left-0 w-full"
                    height="10"
                    viewBox="0 0 300 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path d="M2 7C80 2 220 2 298 7" stroke="#FFD600" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </span>{" "}
                sur-mesure
              </h1>

              <p className="text-[#6B7280] mb-8 text-[15px] sm:text-[16px] leading-[1.7]">
                Une plateforme d'accompagnement dédiée aux étudiants, avec une attention particulière
                pour les personnes RQTH. Formations vidéo, outils personnalisés et ressources adaptées.
              </p>

              {/* Mobile image */}
              <div className="flex justify-center lg:hidden mb-8">
                <div className="w-full max-w-[480px] rounded-[20px] overflow-hidden aspect-[4/3] shadow-[0_16px_48px_rgba(30,21,72,0.1)]">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1765648684644-cdda3340263f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWwlMjBjYXJlZXJ8ZW58MXx8fHwxNzY5NTIyMTg2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Jeune professionnelle souriante"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:justify-center lg:justify-start">
                <Link to={routes.SignUp.path} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto h-12 px-6 bg-[#FFD600] text-[#1E1548] rounded-[10px] font-bold text-[15px] hover:bg-[#ECC700] hover:shadow-[0_4px_12px_rgba(255,214,0,0.35)] transition-all flex items-center justify-center whitespace-nowrap">
                    Commencer gratuitement
                  </button>
                </Link>
                <Link
                  to={`${routes.Home.path}#services`}
                  className="w-full sm:w-auto h-12 px-6 border-2 border-[#E8ECFF] text-[#1E1548] rounded-[10px] font-semibold text-[15px] hover:bg-[#E8ECFF] transition-colors flex items-center justify-center whitespace-nowrap"
                >
                  Découvrir la plateforme
                </Link>
              </div>
            </div>

            {/* Right image — desktop */}
            <div className="hidden lg:block relative">
              {/* Yellow accent behind */}
              <div className="absolute -bottom-3 -right-3 w-3/5 h-2/5 bg-[#FFD600] rounded-xl z-0" />
              <div className="relative z-[1] rounded-[20px] overflow-hidden aspect-[4/3] shadow-[0_20px_60px_rgba(30,21,72,0.12),0_4px_16px_rgba(30,21,72,0.06)]">
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

      {/* ── 3 Cards ──────────────────────────────────────────── */}
      <section id="services" className="w-full bg-[#F9FAFB] py-12 sm:py-16">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {[
              {
                img: 'https://images.unsplash.com/photo-1614492898637-435e0f87cef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                alt: "Parcours d'apprentissage structuré",
                title: 'Parcours structuré',
                desc: "Des étapes claires pour progresser à ton rythme",
              },
              {
                img: 'https://images.unsplash.com/photo-1627231603574-03e182d67e4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                alt: "Personne regardant des vidéos de formation",
                title: 'Vidéos quotidiennes',
                desc: "Contenus motivants à suivre, mais adaptés et accessibles",
              },
              {
                img: 'https://images.unsplash.com/photo-1553445166-aa556685625c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600',
                alt: "Accompagnement inclusif et bienveillant",
                title: 'Accompagnement RQTH',
                desc: "Aménagements et conseils spécifiques et bienveillants",
              },
            ].map(({ img, alt, title, desc }) => (
              <div key={title} className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden hover:shadow-[0_12px_32px_rgba(30,21,72,0.10)] hover:-translate-y-0.5 transition-all duration-200">
                <div className="aspect-[16/10] w-full overflow-hidden">
                  <ImageWithFallback
                    src={img}
                    alt={alt}
                    className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <div className="w-8 h-[3px] bg-[#FFD600] rounded-full mb-3" />
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#1E1548] mb-1.5">{title}</h3>
                  <p className="text-[13px] sm:text-[14px] leading-[1.6] text-[#6B7280]">{desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────── */}
      <section className="w-full bg-white border-t border-b border-[#E5E7EB] py-12 sm:py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3">

            {[
              { val: <>6</>,                               lbl: "Chapitres d'accompagnement" },
              { val: <>100<span className="text-[#FFD600]">%</span></>,  lbl: 'Accessible et inclusive'   },
              { val: <>24<span className="text-[#FFD600]">/7</span></>,  lbl: 'Accès à tes ressources'    },
            ].map(({ val, lbl }, i) => (
              <div key={lbl} className={`text-center py-4 sm:py-0 ${i > 0 ? 'sm:border-l border-[#E5E7EB] mt-6 sm:mt-0 border-t sm:border-t-0 pt-6 sm:pt-0' : ''}`}>
                <div className="text-[48px] sm:text-[56px] font-extrabold text-[#1E1548] leading-none mb-2 tracking-tight">{val}</div>
                <p className="text-[14px] text-[#6B7280] font-medium">{lbl}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section id="accompagnement" className="w-full bg-white py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-[24px] sm:text-[30px] lg:text-[34px] font-extrabold text-[#1E1548] mb-3 leading-tight">
              Un accompagnement complet pour réussir
            </h2>
            <p className="max-w-[520px] mx-auto text-[15px] sm:text-[16px] leading-[1.65] text-[#6B7280]">
              Toutes les ressources et le soutien dont tu as besoin pour décrocher ton alternance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {[
              { bg: 'bg-[#E8ECFF]', iconBg: 'bg-[#155dfc]', Icon: Target,        iconColor: 'text-white',      title: 'Parcours personnalisé',    desc: "Un accompagnement adapté à ton niveau, ta formation et tes besoins spécifiques" },
              { bg: 'bg-[#FFF9E6]', iconBg: 'bg-[#FFD600]', Icon: Video,         iconColor: 'text-[#1E1548]',  title: 'Formations vidéo',         desc: "Des vidéos pédagogiques et du contenu motivant pour avancer pas à pas" },
              { bg: 'bg-[#E8ECFF]', iconBg: 'bg-[#155dfc]', Icon: Users,         iconColor: 'text-white',      title: 'Accessibilité RQTH',       desc: "Contenus accessibles, transcriptions et conseils pour valoriser tes aménagements" },
              { bg: 'bg-[#FFF9E6]', iconBg: 'bg-[#FFD600]', Icon: Wrench,        iconColor: 'text-[#1E1548]',  title: 'Outils pratiques',         desc: "CV, lettres de motivation, préparation aux entretiens et suivi de candidatures" },
              { bg: 'bg-[#E8ECFF]', iconBg: 'bg-[#155dfc]', Icon: TrendingUp,    iconColor: 'text-white',      title: 'Suivi de progression',     desc: "Visualise tes avancées et reste motivé(e) tout au long de ton parcours" },
              { bg: 'bg-[#FFF9E6]', iconBg: 'bg-[#FFD600]', Icon: MessageCircle, iconColor: 'text-[#1E1548]',  title: 'Communauté bienveillante', desc: "Échange avec d'autres étudiants et bénéficie du soutien de tes accompagnateurs" },
            ].map(({ bg, iconBg, Icon, iconColor, title, desc }) => (
              <div key={title} className={`${bg} rounded-2xl p-6 sm:p-7 flex gap-5 items-start`}>
                <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[17px] font-bold text-[#1E1548] mb-1.5">{title}</h3>
                  <p className="text-[13px] sm:text-[14px] leading-[1.65] text-[#6B7280]">{desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="inscription" className="w-full bg-gradient-to-br from-[#EEF1FF] via-[#F3F1FF] to-[#EBF3FF] border-t border-[#DDE3FF] py-14 sm:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between">

            {/* Left */}
            <div className="flex-1">
              <h2 className="text-[#101828] text-[26px] sm:text-[30px] lg:text-[34px] font-extrabold leading-[1.2] mb-4">
                Prêt(e) à commencer ton parcours ?
              </h2>
              <p className="text-[#374151] text-[15px] sm:text-[16px] leading-[1.7] mb-8 max-w-[480px]">
                Rejoins la plateforme dès aujourd'hui et bénéficie d'un accompagnement personnalisé pour trouver l'alternance qui te correspond.
              </p>

              {/* Mobile image */}
              <div className="flex justify-center lg:hidden mb-8">
                <div className="w-full max-w-[480px] rounded-[20px] overflow-hidden aspect-[4/3] shadow-[0_16px_48px_rgba(30,21,72,0.12)]">
                  <img
                    src="https://images.unsplash.com/photo-1650064175560-369b5b45b649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBhbHRlcm5hbmNlJTIwY2FyZWVyfGVufDF8fHx8MTc2OTUyMjMwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Étudiant professionnel"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex sm:justify-center lg:justify-start">
                <Link to={routes.SignUp.path} className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto h-[52px] px-7 bg-[#1E1548] text-white rounded-[10px] font-bold text-[15px] sm:text-[16px] hover:bg-[#2D2166] hover:shadow-[0_6px_20px_rgba(30,21,72,0.25)] transition-all">
                    Créer mon compte gratuitement →
                  </button>
                </Link>
              </div>
            </div>

            {/* Right image — desktop */}
            <div className="hidden lg:flex justify-end w-full lg:w-auto">
              <div className="w-full max-w-[480px] rounded-[20px] overflow-hidden aspect-[4/3] shadow-[0_16px_48px_rgba(30,21,72,0.12)]">
                <img
                  src="https://images.unsplash.com/photo-1650064175560-369b5b45b649?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHN0dWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBhbHRlcm5hbmNlJTIwY2FyZWVyfGVufDF8fHx8MTc2OTUyMjMwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Étudiant professionnel"
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
