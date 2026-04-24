import { CheckCircle2, Lock, Play, Trophy, Target, TrendingUp, Clock } from 'lucide-react';
import { useUserData } from '@/context/UserDataContext';
import { formatStudyTime } from '@/utils/initialState';

interface studentDashboardModulesProps {
  onNavigate: (page: string) => void;
  authFirstName?: string;
  userData?: any;
}

export function studentDashboardModules({ onNavigate, authFirstName }: studentDashboardModulesProps) {
  // TODO: fetch from Supabase - using context for now
  const {
    isLoading,
    userProfile,
    statistics,
    modules,
    globalProgress,
    completedModulesCount,
    totalModulesCount,
    isNewUser,
  } = useUserData();

  // Récupérer le prénom : auth (Supabase) > onboarding context > placeholder
  const firstName = authFirstName || userProfile?.firstName || 'Candidat';
  
  // Formater le temps d'étude
  const studyTimeFormatted = formatStudyTime(statistics.totalTimeSpentMinutes);
  
  // Trouver le module actuel : en cours ou disponible
  const currentModule = modules.find(m => m.status === 'in_progress') || modules.find(m => m.status === 'available');
  const nextModule = modules.find(m => m.status === 'available');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8">
        {/* Welcome Section */}
        <div 
          className="rounded-[16px] p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8"
          style={{
            background: 'linear-gradient(169.732deg, rgba(255, 214, 0, 0.1) 0%, rgb(232, 236, 255) 100%)'
          }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-[24px] font-bold leading-tight sm:leading-[40px] text-[#1E1548] mb-2">
            Bienvenue, {firstName} ! 👋
          </h2>
          <p className="text-sm sm:text-base lg:text-[16px] font-normal leading-[24px] text-[#101828] mb-4 sm:mb-6">
            {isNewUser 
              ? 'Commence ton parcours pour trouver ton alternance'
              : 'Continue ton parcours vers l\'alternance. Tu es sur la bonne voie !'}
          </p>
          
          {/* Overall Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm lg:text-[14px] font-normal text-[#101828]">Progression globale</span>
              <span className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#1E1548]">{globalProgress}%</span>
            </div>
            <div className="relative w-full h-3 bg-white/60 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-[#FFD600] rounded-full transition-all duration-300"
                style={{ width: `${globalProgress}%` }}
              />
            </div>
          </div>
          {isNewUser && (
            <p className="text-sm text-[#6B7280] mt-3">
              💡 Commence pour débloquer tes statistiques et suivre ta progression
            </p>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
              </div>
              <div>
                <p className="text-[10px] sm:text-[12px] font-normal text-[#6B7280]">Modules</p>
                <p className="text-base sm:text-lg lg:text-[20px] font-bold text-[#1E1548]">
                  {completedModulesCount}/{totalModulesCount}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
              </div>
              <div>
                <p className="text-[10px] sm:text-[12px] font-normal text-[#6B7280]">Temps d'étude</p>
                <p className="text-base sm:text-lg lg:text-[20px] font-bold text-[#1E1548]">{studyTimeFormatted}</p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
              </div>
              <div>
                <p className="text-[10px] sm:text-[12px] font-normal text-[#6B7280]">Série</p>
                <p className="text-base sm:text-lg lg:text-[20px] font-bold text-[#1E1548]">
                  {statistics.currentStreakDays === 0 ? '0 jour' : `${statistics.currentStreakDays} jour${statistics.currentStreakDays > 1 ? 's' : ''}`}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
              </div>
              <div>
                <p className="text-[10px] sm:text-[12px] font-normal text-[#6B7280]">Objectif</p>
                <p className="text-base sm:text-lg lg:text-[20px] font-bold text-[#1E1548]">{globalProgress}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Module Highlight */}
        {currentModule && (
          <div className="bg-[#FFD600] rounded-[16px] p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs sm:text-sm lg:text-[14px] font-semibold text-[#1E1548] bg-white px-3 py-1 rounded-full">
                    Semaine {currentModule.weekNumber}
                  </span>
                  <span className="text-xs sm:text-sm lg:text-[14px] font-medium text-[#1E1548]">
                    {currentModule.status === 'in_progress' ? 'En cours' : 'À commencer'}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl lg:text-[24px] font-bold leading-tight lg:leading-[32px] text-[#1E1548] mb-2">
                  {currentModule.title}
                </h3>
                <p className="text-xs sm:text-sm lg:text-[14px] font-normal leading-[20px] text-[#1E1548]/80">
                  {currentModule.description}
                </p>
              </div>
              <button
                onClick={() => onNavigate(currentModule.id)}
                className="h-10 sm:h-12 px-4 sm:px-6 bg-[#1E1548] text-white rounded-[12px] text-sm sm:text-base lg:text-[16px] font-semibold hover:bg-[#1E1548]/90 transition-colors flex items-center justify-center gap-2 w-full lg:w-auto"
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                {currentModule.progress > 0 ? 'Continuer' : 'Commencer'}
              </button>
            </div>
            <div className="relative w-full h-2 bg-[#1E1548]/20 rounded-full overflow-hidden">
              <div 
                className="absolute left-0 top-0 h-full bg-[#1E1548] rounded-full"
                style={{ width: `${currentModule.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Module Path (Duolingo style) */}
        <div className="mb-8">
          <h3 className="text-[24px] font-semibold leading-[32px] text-[#1E1548] mb-6">
            {isNewUser ? 'Ton parcours' : 'Ton parcours'}
          </h3>
          
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-5 top-20 bottom-20 w-1 bg-[#E8ECFF]" />
            
            <div className="space-y-6">
              {modules.map((module, index) => {
                const isLocked = module.status === 'locked';
                const isCompleted = module.status === 'completed';
                const isCurrent = module.status === 'in_progress';
                const isAvailable = module.status === 'available';

                return (
                  <div key={module.id} className="relative">
                    {/* Module Card */}
                    <div
                      className={`
                        bg-white border rounded-[16px] p-6 transition-all
                        ${isLocked 
                          ? 'border-[rgba(30,21,72,0.1)] opacity-60' 
                          : 'border-[rgba(30,21,72,0.1)] hover:border-[#FFD600] hover:shadow-lg cursor-pointer'
                        }
                        ${isCurrent ? 'ring-2 ring-[#FFD600]' : ''}
                      `}
                      onClick={() => !isLocked && onNavigate(module.id)}
                    >
                      <div className="flex items-start gap-6">
                        {/* Icon/Status */}
                        <div className="flex-shrink-0">
                          {isCompleted && (
                            <div className="w-16 h-16 bg-[#10B981] rounded-full flex items-center justify-center">
                              <CheckCircle2 className="w-8 h-8 text-white" />
                            </div>
                          )}
                          {isCurrent && (
                            <div className="w-16 h-16 bg-[#FFD600] rounded-full flex items-center justify-center animate-pulse">
                              <Play className="w-8 h-8 text-[#1E1548]" />
                            </div>
                          )}
                          {isAvailable && (
                            <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center">
                              <span className="text-[24px] font-bold text-[#1E1548]">
                                {module.weekNumber}
                              </span>
                            </div>
                          )}
                          {isLocked && (
                            <div className="w-16 h-16 bg-[#F8F9FD] rounded-full flex items-center justify-center">
                              <Lock className="w-8 h-8 text-[#6B7280]" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`
                              text-[14px] font-semibold px-3 py-1 rounded-full
                              ${isCompleted ? 'bg-[#D1FAE5] text-[#10B981]' : ''}
                              ${isCurrent ? 'bg-[#FFD600] text-[#1E1548]' : ''}
                              ${isAvailable ? 'bg-[#E8ECFF] text-[#1E1548]' : ''}
                              ${isLocked ? 'bg-[#F8F9FD] text-[#6B7280]' : ''}
                            `}>
                              Semaine {module.weekNumber}
                            </span>
                            {isCurrent && (
                              <span className="text-[14px] font-medium text-[#FFD600]">
                                • En cours
                              </span>
                            )}
                          </div>
                          <h4 className="text-[20px] font-semibold leading-[28px] text-[#1E1548] mb-2">
                            {module.title}
                          </h4>
                          <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-4">
                            {module.description}
                          </p>
                          
                          {/* Progress bar for in-progress modules */}
                          {!isLocked && module.progress >= 0 && (
                            <div className="mt-4">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[12px] text-[#6B7280]">Progression</span>
                                <span className="text-[12px] font-medium text-[#1E1548]">
                                  {module.progress}%
                                </span>
                              </div>
                              <div className="relative w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
                                <div 
                                  className={`absolute left-0 top-0 h-full rounded-full transition-all ${
                                    isCompleted ? 'bg-[#10B981]' : 'bg-[#FFD600]'
                                  }`}
                                  style={{ width: `${module.progress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Locked State */}
                          {isLocked && (
                            <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF]">
                              <Lock className="w-4 h-4" />
                              <span>Termine le module précédent pour débloquer</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div 
          className="rounded-[16px] p-6"
          style={{
            background: 'linear-gradient(169.732deg, rgba(255, 214, 0, 0.1) 0%, rgb(232, 236, 255) 100%)'
          }}
        >
          <h4 className="text-[20px] font-semibold leading-[28px] text-[#1E1548] mb-2">
            Besoin d'accompagnement ? 🤝
          </h4>
          <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-4">
            Notre équipe est disponible pour t'aider à chaque étape de ton parcours
          </p>
          <button className="h-10 sm:h-12 px-4 sm:px-6 bg-[#1E1548] text-white rounded-[12px] text-sm sm:text-base lg:text-[16px] font-semibold hover:bg-[#1E1548]/90 transition-colors flex items-center justify-center">
            Contacter mon conseiller
          </button>
        </div>
      </div>
    </div>
  );
}