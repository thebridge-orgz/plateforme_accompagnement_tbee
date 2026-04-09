import { ArrowLeft, Award, Clock } from 'lucide-react';
import { ModuleCard } from './ModuleCard';
import { ProgressBar } from './ui/ProgressBar';

interface AllModulesPageProps {
  onNavigate: (page: string) => void;
}

// Mock data
const allModules = [
  {
    id: '1',
    title: 'Rédiger son CV',
    description: 'Apprenez à créer un CV professionnel et attractif',
    duration: '2h 30min',
    videoCount: 8,
    progress: 75,
    status: 'in-progress' as const,
    chapter: 'Candidature'
  },
  {
    id: '2',
    title: 'Préparer son entretien',
    description: 'Maîtrisez les techniques d\'entretien d\'embauche',
    duration: '3h 15min',
    videoCount: 10,
    progress: 30,
    status: 'in-progress' as const,
    chapter: 'Candidature'
  },
  {
    id: '3',
    title: 'Comprendre l\'alternance',
    description: 'Découvrez les spécificités du contrat en alternance',
    duration: '1h 45min',
    videoCount: 6,
    progress: 0,
    status: 'locked' as const,
    chapter: 'Bases de l\'alternance'
  },
  {
    id: '4',
    title: 'Rechercher son entreprise',
    description: 'Stratégies pour trouver l\'entreprise idéale',
    duration: '2h 00min',
    videoCount: 7,
    progress: 0,
    status: 'locked' as const,
    chapter: 'Recherche d\'entreprise'
  },
  {
    id: '5',
    title: 'Postuler efficacement',
    description: 'Optimisez vos candidatures pour maximiser vos chances',
    duration: '2h 20min',
    videoCount: 9,
    progress: 0,
    status: 'locked' as const,
    chapter: 'Recherche d\'entreprise'
  },
  {
    id: '6',
    title: 'Réussir son intégration',
    description: 'Les clés pour une intégration réussie en entreprise',
    duration: '1h 50min',
    videoCount: 6,
    progress: 0,
    status: 'locked' as const,
    chapter: 'Intégration'
  }
];

export function AllModulesPage({ onNavigate }: AllModulesPageProps) {
  // Group modules by chapter
  const modulesByChapter = allModules.reduce((acc, module) => {
    if (!acc[module.chapter]) {
      acc[module.chapter] = [];
    }
    acc[module.chapter].push(module);
    return acc;
  }, {} as Record<string, typeof allModules>);

  const completedModules = 3;
  const totalModules = 6;
  const studyTime = '12h 30min';
  const currentStreak = 5;
  const monthlyGoal = 80;

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="max-w-[1152px] mx-auto px-8 py-8">
        {/* Header avec statistiques principales */}
        <div 
          className="rounded-[16px] p-8 mb-8"
          style={{
            background: 'linear-gradient(169.732deg, rgba(255, 214, 0, 0.1) 0%, rgb(232, 236, 255) 100%)'
          }}
        >
          <h2 className="text-[24px] font-bold leading-[40px] text-[#1E1548] mb-2">
            Mes modules
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#101828] mb-6">
            Parcours complet vers l'alternance
          </p>
        </div>

        {/* Grille des statistiques 2x2 */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Modules terminés */}
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-1">
                  Modules terminés
                </p>
                <p className="text-[24px] font-bold leading-[40px] text-[#1E1548]">
                  {completedModules}/{totalModules}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E8ECFF] flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 7V21" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 18C3 18 4 16 8 16C12 16 13 18 17 18C21 18 22 16 22 16V3C22 3 21 5 17 5C13 5 12 3 8 3C4 3 3 5 3 5V18Z" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Temps d'étude */}
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-1">
                  Temps d'étude
                </p>
                <p className="text-[24px] font-bold leading-[40px] text-[#1E1548]">
                  {studyTime}
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E8ECFF] flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 6V12L16 14" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Série en cours */}
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-1">
                  Série en cours
                </p>
                <p className="text-[24px] font-bold leading-[40px] text-[#1E1548]">
                  {currentStreak} jours
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E8ECFF] flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 12L18 8V11H3V13H18V16L22 12Z" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 7H22V13" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Objectif mensuel */}
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-1">
                  Objectif mensuel
                </p>
                <p className="text-[24px] font-bold leading-[40px] text-[#1E1548]">
                  {monthlyGoal}%
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-[#E8ECFF] flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 12L12 8L8 12" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 16V8" stroke="#FFD600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* En-tête des modules */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[24px] font-semibold leading-[32px] text-[#1E1548]">
            Mes modules en cours
          </h3>
          <button 
            className="text-[16px] font-medium leading-[24px] text-[#1E1548] hover:text-[#FFD600] transition-colors"
            onClick={() => onNavigate('student-dashboard')}
          >
            Voir tout
          </button>
        </div>

        {/* Modules par chapitre */}
        <div className="space-y-8">
          {Object.entries(modulesByChapter).map(([chapter, modules]) => (
            <div key={chapter}>
              <h4 className="text-[20px] font-semibold leading-[28px] text-[#1E1548] mb-4">
                {chapter}
              </h4>
              <div className="space-y-4">
                {modules.map((module) => (
                  <ModuleCard
                    key={module.id}
                    {...module}
                    onClick={() => onNavigate(`module-detail-${module.id}`)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Section d'aide */}
        <div 
          className="rounded-[16px] p-6 mt-8"
          style={{
            background: 'linear-gradient(169.732deg, rgba(255, 214, 0, 0.1) 0%, rgb(232, 236, 255) 100%)'
          }}
        >
          <h4 className="text-[20px] font-semibold leading-[28px] text-[#1E1548] mb-2">
            Besoin d'aide ?
          </h4>
          <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-4">
            Notre équipe est là pour t'accompagner dans ton parcours
          </p>
          <button className="bg-white h-12 px-6 rounded-[12px] text-[18px] font-semibold leading-[20px] text-[#1E1548] hover:bg-[#F8F9FD] transition-colors">
            Contacter le support
          </button>
        </div>
      </div>
    </div>
  );
}