import { ArrowLeft, Lock, CheckCircle, Trophy, Star, Zap, Target, Award } from 'lucide-react';
import { useUserData } from '../../../context/UserDataContext';

interface StudentJourneyPageProps {
  onNavigate: (page: string) => void;
  userData?: any;
}

export function StudentJourneyPage({ onNavigate }: StudentJourneyPageProps) {
  // TODO: fetch from Supabase - using context for now
  const {
    isLoading,
    modules,
    statistics,
    completedModulesCount,
    totalModulesCount,
    isNewUser,
  } = useUserData();

  // Calculer XP total (chaque module complété donne 250 XP)
  const totalXP = modules.reduce((sum, m) => sum + (m.xp || 0), 0);

  // Trouver le prochain module non complété
  const nextModule = modules.find(m => m.status === 'in_progress' || m.status === 'available');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-[#10B981] border-[#10B981]';
      case 'in_progress':
      case 'available':
        return 'bg-[#FFD600] border-[#FFD600]';
      case 'locked':
        return 'bg-[#E5E7EB] border-[#E5E7EB]';
      default:
        return 'bg-[#E5E7EB] border-[#E5E7EB]';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-white" />;
      case 'in_progress':
      case 'available':
        return <Zap className="w-6 h-6 text-[#1E1548]" />;
      case 'locked':
        return <Lock className="w-6 h-6 text-[#9CA3AF]" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FFD600] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Retour"
            >
              <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
            </button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Mon Parcours
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                {isNewUser 
                  ? 'Commence ton parcours vers l\'alternance étape par étape'
                  : 'Progresse étape par étape vers ton alternance de rêve'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 sm:pt-20 sm:pb-8 lg:pt-8 lg:pb-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-12">
          {/* Total XP */}
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#FFF4CC] flex items-center justify-center">
                <Star className="w-5 h-5 text-[#FFD600]" />
              </div>
              <span className="text-[14px] font-medium text-[#6B7280]">XP Total</span>
            </div>
            <p className="text-[32px] font-bold text-[#1E1548]">{totalXP}</p>
            <p className="text-[14px] text-[#6B7280] mt-1">
              {isNewUser ? 'Commence pour gagner des XP' : 'Points d\'expérience'}
            </p>
          </div>

          {/* Completion */}
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#E8ECFF] flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[#1E1548]" />
              </div>
              <span className="text-[14px] font-medium text-[#6B7280]">Progression</span>
            </div>
            <p className="text-[32px] font-bold text-[#1E1548]">
              {totalModulesCount > 0 ? Math.round((completedModulesCount / totalModulesCount) * 100) : 0}%
            </p>
            <p className="text-[14px] text-[#6B7280] mt-1">{completedModulesCount} / {totalModulesCount} modules complétés</p>
          </div>

          {/* Next Milestone */}
          <div className="bg-gradient-to-br from-[#1E1548] to-[#2D2166] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center">
                <Target className="w-5 h-5 text-[#1E1548]" />
              </div>
              <span className="text-[14px] font-medium text-white">Prochain objectif</span>
            </div>
            <p className="text-[24px] font-bold text-white">
              {nextModule ? `Semaine ${nextModule.weekNumber}` : 'Parcours terminé !'}
            </p>
            <p className="text-[14px] text-[#E8ECFF] mt-1">
              {nextModule 
                ? `${100 - nextModule.progress}% restants` 
                : 'Félicitations ! 🎉'}
            </p>
          </div>
        </div>

        {/* Journey Path - Visual Map */}
        <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[24px] p-8 sm:p-12 shadow-[0_4px_16px_rgba(30,21,72,0.06)] relative overflow-hidden">
          {/* Background Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 256 256" fill="none">
              <circle cx="200" cy="56" r="80" fill="#C7D2FE" />
              <circle cx="200" cy="56" r="40" fill="#F8F9FD" />
            </svg>
          </div>

          <h2 className="text-[24px] font-bold text-[#1E1548] mb-8">
            Carte du parcours
          </h2>

          {/* Journey Path Container */}
          <div className="relative">
            {modules.map((module, index) => (
              <div key={module.id} className="relative">
                {/* Connection Line */}
                {index < modules.length - 1 && (
                  <div 
                    className="absolute left-[31px] top-[80px] w-[2px] h-[120px] bg-gradient-to-b from-[#E5E7EB] to-transparent"
                    style={{
                      background: module.status === 'completed' 
                        ? 'linear-gradient(to bottom, #10B981, #E5E7EB)'
                        : 'linear-gradient(to bottom, #E5E7EB, #E5E7EB)'
                    }}
                  />
                )}

                {/* Module Card */}
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8 relative z-10">
                  {/* Status Indicator Circle */}
                  <div className="relative flex-shrink-0">
                    <div 
                      className={`w-16 h-16 rounded-full ${getStatusColor(module.status)} flex items-center justify-center shadow-lg border-4 border-white transition-all hover:scale-110 cursor-pointer`}
                      style={{
                        boxShadow: module.status === 'in_progress' || module.status === 'available'
                          ? '0 0 0 4px rgba(255, 214, 0, 0.2), 0 4px 12px rgba(30, 21, 72, 0.15)'
                          : '0 4px 12px rgba(30, 21, 72, 0.15)'
                      }}
                    >
                      {getStatusIcon(module.status)}
                    </div>
                    
                    {/* Week Number Badge */}
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#1E1548] text-white text-[12px] font-bold flex items-center justify-center border-2 border-white">
                      {module.weekNumber}
                    </div>
                  </div>

                  {/* Module Content Card */}
                  <div 
                    className={`flex-1 w-full bg-white border-2 rounded-[16px] p-4 sm:p-6 transition-all cursor-pointer ${
                      module.status === 'in_progress' || module.status === 'available'
                        ? 'border-[#FFD600] shadow-[0_4px_16px_rgba(255,214,0,0.15)]'
                        : module.status === 'completed'
                        ? 'border-[#10B981] shadow-[0_2px_8px_rgba(16,185,129,0.1)]'
                        : 'border-[#E5E7EB] opacity-60'
                    } hover:shadow-[0_6px_20px_rgba(30,21,72,0.1)]`}
                    onClick={() => {
                      if (module.status !== 'locked') {
                        onNavigate(module.id);
                      }
                    }}
                  >
                    <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-3">
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                          <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548]">
                            {module.title}
                          </h3>
                          {module.badge && (
                            <span className="text-[20px] sm:text-[24px]">{module.badge}</span>
                          )}
                        </div>
                        <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px] sm:leading-[22px]">
                          {module.description}
                        </p>
                      </div>

                      {/* XP Badge */}
                      {module.xp > 0 && (
                        <div className="flex items-center gap-2 bg-[#FFF4CC] px-3 py-1.5 rounded-[8px] sm:ml-4 self-start">
                          <Star className="w-4 h-4 text-[#FFD600]" />
                          <span className="text-[13px] sm:text-[14px] font-bold text-[#1E1548]">+{module.xp} XP</span>
                        </div>
                      )}
                    </div>

                    {/* Progress Bar (for current, in_progress, available and completed) */}
                    {module.status !== 'locked' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[12px]">
                          <span className="font-medium text-[#6B7280]">Progression</span>
                          <span className="font-bold text-[#1E1548]">{module.progress}%</span>
                        </div>
                        <div className="h-2 bg-[#F3F4F6] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              module.status === 'completed' ? 'bg-[#10B981]' : 'bg-[#FFD600]'
                            }`}
                            style={{ width: `${module.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Locked State */}
                    {module.status === 'locked' && (
                      <div className="flex items-center gap-2 text-[14px] text-[#9CA3AF] mt-3">
                        <Lock className="w-4 h-4" />
                        <span>Termine le module précédent pour débloquer</span>
                      </div>
                    )}

                    {/* Call to Action */}
                    {(module.status === 'in_progress' || module.status === 'available') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(module.id);
                        }}
                        className="w-full mt-4 h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-all hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#FFD600] focus:ring-offset-2 shadow-sm flex items-center justify-center gap-2"
                      >
                        {module.progress === 0 ? 'Commencer le module' : 'Continuer le module'} →
                      </button>
                    )}

                    {module.status === 'completed' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate(module.id);
                        }}
                        className="w-full mt-4 h-12 bg-white border-2 border-[#10B981] text-[#10B981] rounded-[12px] text-[16px] font-semibold hover:bg-[#F0FDF4] transition-all focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2 flex items-center justify-center gap-2"
                      >
                        Revoir le module
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Finish Line */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD600] to-[#FFA500] flex items-center justify-center shadow-lg border-4 border-white flex-shrink-0">
              <Award className="w-8 h-8 text-[#1E1548]" />
            </div>
            <div className="flex-1 w-full bg-gradient-to-r from-[#FFF4CC] to-transparent border-2 border-[#FFD600] rounded-[16px] p-4 sm:p-6">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-2">
                🎉 Objectif final : Trouver ton alternance !
              </h3>
              <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px] sm:leading-normal">
                Continue ton parcours pour débloquer tous les outils et ressources qui t'aideront à décrocher ton contrat.
              </p>
            </div>
          </div>
        </div>

        {/* Tips & Motivation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Daily Tip */}
          <div className="bg-[#E8ECFF] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E1548] flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#FFD600]" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-[#1E1548] mb-2">
                  💡 Astuce du jour
                </h3>
                <p className="text-[14px] text-[#6B7280] leading-[22px]">
                  Consacre 20 minutes par jour à ton parcours. La régularité est la clé du succès dans ta recherche d'alternance !
                </p>
              </div>
            </div>
          </div>

          {/* Motivation */}
          <div className="bg-gradient-to-br from-[#1E1548] to-[#2D2166] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-[#1E1548]" />
              </div>
              <div>
                <h3 className="text-[18px] font-bold text-white mb-2">
                  {isNewUser ? '🚀 Lance-toi !' : '🚀 Continue comme ça !'}
                </h3>
                <p className="text-[14px] text-[#E8ECFF] leading-[22px]">
                  {isNewUser 
                    ? `Tu es prêt à commencer ! ${totalModulesCount} modules t'attendent pour t'aider à décrocher ton alternance.`
                    : `Tu es sur la bonne voie ! ${completedModulesCount} module${completedModulesCount > 1 ? 's' : ''} complété${completedModulesCount > 1 ? 's' : ''}, encore ${totalModulesCount - completedModulesCount} à découvrir.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}