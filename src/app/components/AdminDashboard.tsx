import { Users, BookOpen, TrendingUp, Award, Clock, AlertTriangle, CheckCircle2, FileText, Briefcase, Target } from 'lucide-react';
import { useAdminData } from '../../hooks/useAdminData';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
  adminName?: string;
}

export function AdminDashboard({ onNavigate, adminName }: AdminDashboardProps) {
  // ============================================
  // DONNÉES RÉELLES DEPUIS LE CONTEXTE
  // ============================================
  const {
    students,
    globalStats,
    recentActivities,
    cvSubmissions,
    //exerciseSubmissions,
    offerTrackings
  } = useAdminData();

  // Calculer les tâches urgentes à partir des vraies données
  const urgentTasks = [
    {
      id: '1',
      label: 'CVs en attente de validation',
      count: globalStats.pendingCVs,
      action: 'admin-cv-review'
    },
    {
      id: '2',
      label: 'Exercices à corriger',
      count: '',//globalStats.pendingExercises,
      action: 'admin-exercise-review'
    },
    {
      id: '3',
      label: 'Demandes d\'aide sur offres',
      count: globalStats.offersNeedingHelp,
      action: 'admin-offer-support'
    },
    {
      id: '4',
      label: 'Étudiants inactifs (+7j)',
      count: '',//globalStats.totalstudents - globalStats.activestudents,
      action: 'admin-tracking'
    }
  ];

  // Calculer les statistiques admin depuis les vraies données
  const adminStats = {
    totalstudents: '',//globalStats.totalstudents,
    activestudents: '',//globalStats.activestudents,
    pendingReviews: '',//globalStats.pendingCVs + globalStats.pendingExercises,
    completionRate: Math.round(globalStats.completionRate),
    averageProgress: Math.round(globalStats.averageProgress),
    cvToReview: globalStats.pendingCVs,
    exercisesToGrade: '',//globalStats.pendingExercises,
    offerSupport: globalStats.offersNeedingHelp
  };

  const inactivestudents = ''//globalStats.totalstudents - globalStats.activestudents;

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'cv_submitted':
        return <FileText className="w-5 h-5 text-[#FFD600]" />;
      case 'exercise_completed':
        return <CheckCircle2 className="w-5 h-5 text-[#10B981]" />;
      case 'offer_help':
        return <Briefcase className="w-5 h-5 text-[#EF4444]" />;
      case 'progress':
        return <Target className="w-5 h-5 text-[#1E1548]" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-[#6B7280]" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8">
          <div>
            <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#1E1548] mb-2">
              {adminName ? `Bonjour, ${adminName} 👋` : 'Tableau de bord administrateur'}
            </h1>
            <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
              Suivi et gestion de la plateforme TBEE
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          {/* Total students */}
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#E8ECFF] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#1E1548]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">
                  Étudiants totaux
                </p>
              </div>
            </div>
            <p className="text-[32px] sm:text-[36px] font-bold text-[#1E1548]">
              {adminStats.totalstudents}
            </p>
          </div>

          {/* Active students */}
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#FFF4CC] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#FFD600]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">
                  Étudiants actifs
                </p>
              </div>
            </div>
            <p className="text-[32px] sm:text-[36px] font-bold text-[#1E1548]">
              {adminStats.activestudents}
            </p>
          </div>

          {/* Completion Rate */}
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#F0FDF4] flex items-center justify-center">
                <Award className="w-6 h-6 text-[#10B981]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-[14px] font-medium text-[#6B7280]">
                  Taux de complétion
                </p>
              </div>
            </div>
            <p className="text-[32px] sm:text-[36px] font-bold text-[#1E1548]">
              {adminStats.completionRate}%
            </p>
          </div>

          {/* Pending Reviews */}
          <div className="bg-gradient-to-br from-[#1E1548] to-[#2D2166] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-[12px] bg-[#FFD600] flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-[#1E1548]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] sm:text-[14px] font-medium text-white">
                  Validations en attente
                </p>
              </div>
            </div>
            <p className="text-[32px] sm:text-[36px] font-bold text-white">
              {adminStats.pendingReviews}
            </p>
            {/*adminStats.pendingReviews > 0 && (
              <p className="text-[13px] text-[#FFD600] mt-1">Action requise</p>
            )*/}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Tasks & Activities */}
          <div className="lg:col-span-2 space-y-6">
            {/* Urgent Tasks */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                </div>
                <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">
                  Tâches urgentes
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {urgentTasks.map((task) => (
                  <button
                    key={task.id}
                    onClick={() => onNavigate(task.action)}
                    className="bg-[#F8F9FD] hover:bg-[#E8ECFF] border-2 border-[rgba(30,21,72,0.08)] hover:border-[#FFD600] rounded-[12px] p-4 text-left transition-all group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-[14px] sm:text-[15px] font-semibold text-[#1E1548] leading-tight pr-2">
                        {task.label}
                      </p>
                      <span className="w-8 h-8 rounded-full bg-[#EF4444] text-white text-[14px] font-bold flex items-center justify-center flex-shrink-0">
                        {task.count}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#6B7280]">
                      Cliquer pour traiter →
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548] mb-4 sm:mb-6">
                Activités récentes
              </h2>

              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-[12px] transition-all ${activity.urgent
                      ? 'bg-[#FFF4CC] border-2 border-[#FFD600]'
                      : 'bg-[#F8F9FD] border border-[rgba(30,21,72,0.08)]'
                      }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] sm:text-[15px] font-semibold text-[#1E1548] mb-1">
                        {activity.studentName}
                      </p>
                      <p className="text-[13px] sm:text-[14px] text-[#6B7280]">
                        {activity.message}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-[12px] text-[#6B7280]">
                        {(() => {
                          const now = new Date();
                          const activityTime = new Date(activity.timestamp);
                          const diff = now.getTime() - activityTime.getTime();
                          const minutes = Math.floor(diff / 60000);
                          const hours = Math.floor(diff / 3600000);
                          if (minutes < 60) return `${minutes} min`;
                          return `${hours}h`;
                        })()}
                      </span>
                      {activity.urgent && (
                        <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onNavigate('admin-tracking')}
                className="w-full mt-4 h-12 bg-white border-2 border-[#1E1548] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#1E1548] hover:text-white transition-all"
              >
                Voir toutes les activités
              </button>
            </div>
          </div>

          {/* Right Column - Quick Actions & Stats */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-4">
                Actions rapides
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => onNavigate('admin-cv-review')}
                  className="w-full h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#FDC700] transition-all flex items-center justify-between px-4"
                >
                  <span>📄 Valider les CVs</span>
                  <span className="w-6 h-6 rounded-full bg-[#1E1548] text-white text-[12px] font-bold flex items-center justify-center">
                    {adminStats.cvToReview}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('admin-exercise-review')}
                  className="w-full h-12 bg-white border-2 border-[#E8ECFF] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#E8ECFF] transition-all flex items-center justify-between px-4"
                >
                  <span>✏️ Corriger exercices</span>
                  <span className="w-6 h-6 rounded-full bg-[#FFD600] text-[#1E1548] text-[12px] font-bold flex items-center justify-center">
                    {adminStats.exercisesToGrade}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('admin-offer-support')}
                  className="w-full h-12 bg-white border-2 border-[#E8ECFF] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#E8ECFF] transition-all flex items-center justify-between px-4"
                >
                  <span>💼 Suivi des offres</span>
                  <span className="w-6 h-6 rounded-full bg-[#1E1548] text-white text-[12px] font-bold flex items-center justify-center">
                    {adminStats.offerSupport}
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('admin-tracking')}
                  className="w-full h-12 bg-white border-2 border-[#E8ECFF] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#E8ECFF] transition-all flex items-center justify-center px-4"
                >
                  👥 Tous les étudiants
                </button>

                <button
                  onClick={() => onNavigate('admin-settings')}
                  className="w-full h-12 bg-white border-2 border-[#E8ECFF] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#E8ECFF] transition-all flex items-center justify-center px-4"
                >
                  ⚙️ Paramètres
                </button>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-gradient-to-br from-[#E8ECFF] to-[#F8F9FD] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-4">
                📊 Performance globale
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                      Progression moyenne
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-bold text-[#1E1548]">
                      {adminStats.averageProgress}%
                    </span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#FFD600] rounded-full transition-all"
                      style={{ width: `${adminStats.averageProgress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                      Taux de complétion
                    </span>
                    <span className="text-[13px] sm:text-[14px] font-bold text-[#1E1548]">
                      {adminStats.completionRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#10B981] rounded-full transition-all"
                      style={{ width: `${adminStats.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-[rgba(30,21,72,0.08)]">
                  <p className="text-[13px] text-[#6B7280] leading-[20px]">
                    La plateforme performe bien ce mois-ci avec une augmentation de l'engagement étudiant.
                  </p>
                </div>
              </div>
            </div>

            {/* Alert Box */}
            <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] border-2 border-[#EF4444] rounded-[16px] p-4 sm:p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#EF4444] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-[16px] sm:text-[18px] font-bold text-[#1E1548] mb-1">
                    ⚠️ Étudiants inactifs
                  </h3>
                  <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">
                    {inactivestudents} étudiants n'ont pas été actifs depuis plus de 7 jours
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('admin-tracking')}
                className="w-full h-10 bg-white border-2 border-[#EF4444] text-[#EF4444] rounded-[10px] text-[14px] font-semibold hover:bg-[#EF4444] hover:text-white transition-all"
              >
                Voir les détails
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}