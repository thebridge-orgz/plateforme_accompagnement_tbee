import { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, Clock, CheckCircle2, Trophy, Star, X, Play } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ui/ProgressBar';
import { routes } from '../router/routes';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { practicalCasesService } from '../../services/supabase';

type PracticalCase = {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  points: number;
  videoUrl: string;
  module: string;
  moduleLabel: string;
};

const practicalCases: PracticalCase[] = [
  {
    id: '1',
    title: 'Fiche de positionnement',
    description: 'Faites le point sur vos compétences, identifiez votre métier cible et formalisez votre plan d\'action dans une fiche de positionnement personnelle.',
    difficulty: 'Débutant',
    duration: '20 min',
    points: 50,
    module: 'S0',
    moduleLabel: 'SAS — Positionnement',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '2',
    title: 'Pitch vidéo 3 minutes',
    description: 'Entraînez-vous à vous présenter en 3 minutes chrono : parcours, compétences, projet professionnel et ce que vous apportez à l\'entreprise.',
    difficulty: 'Intermédiaire',
    duration: '20 min',
    points: 75,
    module: 'S2',
    moduleLabel: 'BOOST — Mon pitch',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '3',
    title: 'Profil LinkedIn complet',
    description: 'Construisez un profil LinkedIn attractif : photo professionnelle, bannière, résumé percutant et expériences valorisées pour capter l\'attention des recruteurs.',
    difficulty: 'Débutant',
    duration: '25 min',
    points: 50,
    module: 'S2',
    moduleLabel: 'BOOST — LinkedIn',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '4',
    title: 'Répondre à une offre d\'alternance',
    description: 'Analysez une annonce, adaptez votre CV et rédigez un mail de candidature personnalisé qui se démarque des centaines de candidatures reçues.',
    difficulty: 'Intermédiaire',
    duration: '30 min',
    points: 75,
    module: 'S3',
    moduleLabel: 'CANDIDATURES',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '5',
    title: 'Simulation d\'entretien téléphonique',
    description: 'Préparez-vous aux questions classiques d\'un premier contact recruteur : motivations, disponibilité, prétentions et présentation rapide de votre profil.',
    difficulty: 'Intermédiaire',
    duration: '20 min',
    points: 75,
    module: 'S4',
    moduleLabel: 'ENTRETIENS — Préparation',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '6',
    title: 'Questions techniques en entretien',
    description: 'Préparez les questions métier spécifiques à votre domaine, apprenez à présenter vos projets avec la méthode STAR et à répondre sereinement quand vous ne savez pas.',
    difficulty: 'Avancé',
    duration: '40 min',
    points: 100,
    module: 'S4',
    moduleLabel: 'ENTRETIENS — Technique',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '7',
    title: 'Négociation salariale',
    description: 'Comprenez la grille de rémunération en alternance, préparez vos arguments et gérez les objections pour défendre votre valeur avec confiance.',
    difficulty: 'Avancé',
    duration: '25 min',
    points: 100,
    module: 'S5',
    moduleLabel: 'EMBAUCHE — Contrat',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '8',
    title: 'Plan d\'intégration 30 jours',
    description: 'Construisez votre plan d\'action pour réussir vos 30 premiers jours : comprendre la culture d\'entreprise, poser les bonnes questions et demander du feedback.',
    difficulty: 'Avancé',
    duration: '30 min',
    points: 100,
    module: 'S5',
    moduleLabel: 'EMBAUCHE — Intégration',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  }
];

export function PracticalCasePage() {
  const { user } = useAuth();
  const [videoModal, setVideoModal] = useState<PracticalCase | null>(null);
  const [viewedCaseIds, setViewedCaseIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.id) return;
    practicalCasesService.getViewedCaseIds(user.id)
      .then(setViewedCaseIds)
      .catch(() => {});
  }, [user?.id]);

  const openVideo = (pc: PracticalCase) => {
    setVideoModal(pc);
    if (user?.id && !viewedCaseIds.includes(pc.id)) {
      practicalCasesService.markAsViewed(user.id, pc.id)
        .then(() => setViewedCaseIds(prev => [...prev, pc.id]))
        .catch(() => {});
    }
  };

  const casesViewed = viewedCaseIds.length;
  const totalPoints = practicalCases
    .filter(pc => viewedCaseIds.includes(pc.id))
    .reduce((sum, pc) => sum + pc.points, 0);
  const maxPoints = practicalCases.reduce((sum, pc) => sum + pc.points, 0);
  const scorePercent = casesViewed > 0
    ? Math.round((totalPoints / maxPoints) * 100)
    : null;
  const progressPct = practicalCases.length > 0
    ? Math.round((casesViewed / practicalCases.length) * 100)
    : 0;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':   return 'text-[#10B981] bg-[#F0FDF4]';
      case 'Intermédiaire': return 'text-[#FFD600] bg-[#FFF4CC]';
      case 'Avancé':    return 'text-[#EF4444] bg-[#FEF2F2]';
      default:           return 'text-[#6B7280] bg-[#F3F4F6]';
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.StudentDashboard.path}>
              <button
                className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Cas pratiques
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Mettez en pratique vos connaissances et gagnez des points
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 space-y-6 sm:space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Points totaux</p>
              <Trophy className="w-5 h-5 text-[#FFD600]" />
            </div>
            <p className="text-[28px] sm:text-[32px] font-bold text-[#1E1548]">{totalPoints}</p>
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Cas vus</p>
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            </div>
            <p className="text-[28px] sm:text-[32px] font-bold text-[#1E1548]">{casesViewed}/{practicalCases.length}</p>
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Score moyen</p>
              <Star className="w-5 h-5 text-[#FFD600]" />
            </div>
            <p className="text-[28px] sm:text-[32px] font-bold text-[#1E1548]">
              {scorePercent !== null ? `${scorePercent}%` : '—'}
            </p>
            {scorePercent !== null && (
              <p className="text-[11px] text-[#6B7280] mt-0.5">{totalPoints} / {maxPoints} pts</p>
            )}
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Progression</p>
              <Briefcase className="w-5 h-5 text-[#1E1548]" />
            </div>
            <ProgressBar progress={progressPct} size="sm" />
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">Tous les cas pratiques</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {practicalCases.map((pc) => {
              const isViewed = viewedCaseIds.includes(pc.id);
              return (
                <div
                  key={pc.id}
                  className="bg-white border-2 border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(30,21,72,0.1)] hover:border-[#FFD600] cursor-pointer"
                  onClick={() => openVideo(pc)}
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548]">{pc.title}</h3>
                        <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold w-fit bg-[#E8ECFF] text-[#1E1548]">
                          {pc.moduleLabel}
                        </span>
                        <span className={`text-[12px] px-3 py-1 rounded-full font-medium w-fit ${getDifficultyColor(pc.difficulty)}`}>
                          {pc.difficulty}
                        </span>
                        {isViewed && (
                          <span className="text-[12px] px-3 py-1 rounded-full font-medium w-fit text-[#10B981] bg-[#F0FDF4] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Vu
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] sm:text-[14px] text-[#6B7280] mb-3 sm:mb-4 leading-[20px] sm:leading-[22px]">
                        {pc.description}
                      </p>
                      <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-[13px] sm:text-[14px] text-[#6B7280]">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{pc.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Trophy className="w-4 h-4 text-[#FFD600]" />
                          <span>{pc.points} points</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 w-full sm:w-auto">
                      <Button
                        variant="primary"
                        onClick={(e) => { e.stopPropagation(); openVideo(pc); }}
                      >
                        {isViewed ? 'Revoir' : 'Commencer'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-br from-[#E8ECFF] to-[#F8F9FD] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6 sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548] mb-2">Comment ça fonctionne ?</h2>
            <p className="text-[14px] sm:text-[16px] text-[#6B7280] mb-6 leading-[22px] sm:leading-[24px]">
              Les cas pratiques vous permettent de mettre en application les connaissances acquises
              dans les modules de formation. Regardez les vidéos pour progresser dans votre parcours.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <span className="text-[24px] sm:text-[28px] flex-shrink-0">1️⃣</span>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1548] mb-1">Choisissez un cas</p>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">Sélectionnez un cas adapté à votre niveau</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[24px] sm:text-[28px] flex-shrink-0">2️⃣</span>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1548] mb-1">Regardez la vidéo</p>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">Suivez les conseils et les démonstrations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[24px] sm:text-[28px] flex-shrink-0">3️⃣</span>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1548] mb-1">Appliquez en situation</p>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">Mettez en pratique lors de vos entretiens réels</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setVideoModal(null)}
        >
          <div
            className="bg-white rounded-[20px] overflow-hidden w-full max-w-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(30,21,72,0.08)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFF4CC] rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-[#1E1548]" fill="#1E1548" />
                </div>
                <div>
                  <p className="text-[12px] text-[#6B7280]">Cas pratique</p>
                  <h3 className="text-[16px] font-semibold text-[#1E1548] leading-tight">{videoModal.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setVideoModal(null)}
                className="w-9 h-9 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-[#1E1548]" />
              </button>
            </div>
            <div className="aspect-video">
              <iframe
                src={videoModal.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={videoModal.title}
              />
            </div>
            <div className="px-5 py-4 flex justify-end">
              <button
                onClick={() => setVideoModal(null)}
                className="h-10 px-5 bg-[#1E1548] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#2D2166] transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
