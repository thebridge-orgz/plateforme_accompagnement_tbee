import { useState } from 'react';
import { ArrowLeft, Briefcase, Clock, CheckCircle2, Trophy, Star, X, Play } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ui/ProgressBar';
import { routes } from '../router/routes';
import { Link } from 'react-router-dom';

// Mock data
const practicalCases = [
  {
    id: '1',
    title: 'Simulation d\'entretien téléphonique',
    description: 'Préparez-vous à un entretien téléphonique avec un recruteur',
    difficulty: 'Débutant',
    duration: '15 min',
    points: 50,
    status: 'available' as const,
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '2',
    title: 'Répondre à une offre d\'alternance',
    description: 'Rédigez une réponse personnalisée à une offre d\'emploi',
    difficulty: 'Intermédiaire',
    duration: '30 min',
    points: 75,
    status: 'available' as const,
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '3',
    title: 'Présentation de son parcours en 3 minutes',
    description: 'Préparez un pitch efficace pour vous présenter',
    difficulty: 'Intermédiaire',
    duration: '20 min',
    points: 75,
    status: 'available' as const,
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '4',
    title: 'Négociation de salaire',
    description: 'Apprenez à négocier votre rémunération en alternance',
    difficulty: 'Avancé',
    duration: '25 min',
    points: 100,
    status: 'available' as const,
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: '5',
    title: 'Questions techniques en entretien',
    description: 'Répondez à des questions techniques liées à votre domaine',
    difficulty: 'Avancé',
    duration: '40 min',
    points: 100,
    status: 'available' as const,
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  }
];

const userStats = {
  totalPoints: 0, // Changé de 85 à 0
  casesCompleted: 0, // Changé de 1 à 0
  totalCases: 5,
  averageScore: 0 // Changé de 85 à 0
};

export function PracticalCasePage() {
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [videoModal, setVideoModal] = useState<{ title: string; videoUrl: string } | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'text-[#10B981] bg-[#F0FDF4]';
      case 'Intermédiaire':
        return 'text-[#FFD600] bg-[#FFF4CC]';
      case 'Avancé':
        return 'text-[#EF4444] bg-[#FEF2F2]';
      default:
        return 'text-[#6B7280] bg-[#F3F4F6]';
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

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8 space-y-6 sm:space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Points totaux</p>
              <Trophy className="w-5 h-5 text-[#FFD600]" />
            </div>
            <p className="text-[28px] sm:text-[32px] font-bold text-[#1E1548]">{userStats.totalPoints}</p>
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Cas terminés</p>
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            </div>
            <p className="text-[28px] sm:text-[32px] font-bold text-[#1E1548]">{userStats.casesCompleted}/{userStats.totalCases}</p>
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Score moyen</p>
              <Star className="w-5 h-5 text-[#FFD600]" />
            </div>
            <p className="text-[28px] sm:text-[32px] font-bold text-[#1E1548]">{userStats.averageScore}%</p>
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">Progression</p>
              <Briefcase className="w-5 h-5 text-[#1E1548]" />
            </div>
            <ProgressBar progress={20} size="sm" />
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">Tous les cas pratiques</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {practicalCases.map((practicalCase) => (
              <div
                key={practicalCase.id}
                className={`
                  bg-white border-2 rounded-[16px] p-4 sm:p-6
                  transition-all duration-300
                  ${practicalCase.status !== 'locked'
                    ? 'border-[rgba(30,21,72,0.08)] hover:shadow-[0_6px_20px_rgba(30,21,72,0.1)] hover:border-[#FFD600] cursor-pointer'
                    : 'border-[rgba(30,21,72,0.08)] opacity-60 cursor-not-allowed'
                  }
                `}
                onClick={() => practicalCase.status !== 'locked' && setSelectedCase(practicalCase.id)}
              >
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548]">
                        {practicalCase.title}
                      </h3>
                      <span className={`
                        text-[12px] px-3 py-1 rounded-full font-medium w-fit
                        ${getDifficultyColor(practicalCase.difficulty)}
                      `}>
                        {practicalCase.difficulty}
                      </span>
                    </div>
                    <p className="text-[13px] sm:text-[14px] text-[#6B7280] mb-3 sm:mb-4 leading-[20px] sm:leading-[22px]">
                      {practicalCase.description}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center flex-wrap gap-3 sm:gap-4 text-[13px] sm:text-[14px] text-[#6B7280]">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        <span>{practicalCase.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Trophy className="w-4 h-4 text-[#FFD600]" />
                        <span>{practicalCase.points} points</span>
                      </div>
                    </div>

                    {/* Progress for in-progress cases */}
                    {practicalCase.status === 'in-progress' && (
                      <div className="mt-4">
                        <ProgressBar progress={practicalCase.progress || 0} size="sm" showLabel />
                      </div>
                    )}

                    {/* Score for completed cases */}
                    {practicalCase.status === 'completed' && practicalCase.score && (
                      <div className="mt-4 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                        <span className="text-[13px] sm:text-[14px] font-semibold text-[#1E1548]">
                          Score : {practicalCase.score}/100
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0 w-full sm:w-auto">
                    {practicalCase.status === 'locked' ? (
                      <div className="w-full sm:w-auto h-12 px-6 bg-[#F3F4F6] rounded-[12px] text-[14px] sm:text-[16px] text-[#9CA3AF] font-semibold flex items-center justify-center">
                        Verrouillé
                      </div>
                    ) : practicalCase.status === 'completed' ? (
                      <Button
                        variant="secondary"
                        onClick={() => setVideoModal({ title: practicalCase.title, videoUrl: practicalCase.videoUrl })}
                      >
                        Revoir
                      </Button>
                    ) : practicalCase.status === 'in-progress' ? (
                      <Button
                        variant="primary"
                        onClick={() => setVideoModal({ title: practicalCase.title, videoUrl: practicalCase.videoUrl })}
                      >
                        Continuer
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setVideoModal({ title: practicalCase.title, videoUrl: practicalCase.videoUrl });
                        }}
                      >
                        Commencer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gradient-to-br from-[#E8ECFF] to-[#F8F9FD] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6 sm:p-8">
          <div className="max-w-3xl">
            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548] mb-2">
              Comment ça fonctionne ?
            </h2>
            <p className="text-[14px] sm:text-[16px] text-[#6B7280] mb-6 leading-[22px] sm:leading-[24px]">
              Les cas pratiques vous permettent de mettre en application les connaissances acquises
              dans les modules de formation. Complétez-les pour gagner des points et progresser dans
              votre parcours vers l'alternance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start gap-3">
                <span className="text-[24px] sm:text-[28px] flex-shrink-0">1️⃣</span>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1548] mb-1">
                    Choisissez un cas
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">
                    Sélectionnez un cas adapté à votre niveau
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[24px] sm:text-[28px] flex-shrink-0">2️⃣</span>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1548] mb-1">
                    Réalisez l'exercice
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">
                    Suivez les instructions et répondez aux questions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[24px] sm:text-[28px] flex-shrink-0">3️⃣</span>
                <div>
                  <p className="text-[15px] sm:text-[16px] font-semibold text-[#1E1548] mb-1">
                    Obtenez votre feedback
                  </p>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">
                    Recevez des conseils personnalisés
                  </p>
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
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(30,21,72,0.08)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FFF4CC] rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-[#1E1548]" fill="#1E1548" />
                </div>
                <div>
                  <p className="text-[12px] text-[#6B7280]">Cas pratique</p>
                  <h3 className="text-[16px] font-semibold text-[#1E1548] leading-tight">
                    {videoModal.title}
                  </h3>
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

            {/* Video */}
            <div className="aspect-video">
              <iframe
                src={videoModal.videoUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={videoModal.title}
              />
            </div>

            {/* Modal Footer */}
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