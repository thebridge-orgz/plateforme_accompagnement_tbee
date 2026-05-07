import { Award, BookOpen, Clock, Target, TrendingUp } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/button';
import { useModules } from '../../../hooks/useModules';
import { useStatistics } from '../../../hooks/userStatistics';
import { formatStudyTime } from '../../../utils/initialState';
import { routes } from '../../router/routes';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../../types/user';

interface StudentDashboardProps {
  user: UserProfile;
}


export function StudentDashboard({ user }: StudentDashboardProps) {
  const { loading, modules, totalCount, globalProgress, currentModule, completedCount } = useModules();
  //console.log(`currentModule : ${currentModule}`);

  const { statistics } = useStatistics();

  // Parcours entièrement complété ?
  const allModulesCompleted = totalModulesCount > 0 && completedModulesCount === totalModulesCount;

  // Formater le temps d'étude
  //const studyTimeFormatted = formatStudyTime(statistics.totalTimeSpentMinutes);

  // Modules à afficher (limiter à 3 pour l'affichage)
  const displayModules = modules
    .filter(module => module.status === 'in_progress' || module.status === 'available')
    .slice(0, 3);

  // Si aucun module en cours/disponible, afficher les premiers modules
  const modulesToShow = displayModules.length > 0
    ? displayModules
    : modules.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-6 lg:p-8">
          <h2 className="mb-2">
            {allModulesCompleted
              ? `Bravo, ${user.firstName} ! 🎉`
              : `Bienvenue, ${user.firstName} ! 👋`}
          </h2>
          <p className="text-muted-foreground mb-6">
            {allModulesCompleted
              ? 'Tu as terminé ton parcours ! Tu es maintenant prêt(e) à décrocher ton alternance. 🚀'
              : completedCount === 0
                ? 'Commence ton parcours pour trouver ton alternance'
                : 'Continue ton parcours vers l\'alternance. Tu es sur la bonne voie !'}
          </p>
          <div className="w-full max-w-none">
            <ProgressBar progress={globalProgress} showLabel size="lg" className="w-full" />
          </div>
          {completedCount === 0 && (
            <p className="text-sm text-muted-foreground mt-3">
              💡 Commence pour débloquer tes statistiques et suivre ta progression
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            title="Modules terminés"
            value={`${completedCount}/${totalCount}`}
            icon={<BookOpen className="w-6 h-6 text-primary" />}
            subtitle={'Commence pour débloquer'}
          />
          <StatCard
            title="Temps d'étude"
            value={'studyTimeFormatted'}/*studyTimeFormatted*/
            icon={<Clock className="w-6 h-6 text-primary" />}
            subtitle={'Commence pour débloquer'}
          />
          <StatCard
            title="Série en cours"
            value={'streak'}/*statistics.currentStreakDays === 0 ? '0 jour' : `${statistics.currentStreakDays} jour${statistics.currentStreakDays > 1 ? 's' : ''}` */
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            subtitle={'Commence pour débloquer'}
          />
          <StatCard
            title="Objectif mensuel"
            value={globalProgress === 0 ? '0%' : `${globalProgress}%`}
            icon={<Target className="w-6 h-6 text-primary" />}
            subtitle={'Définis ton objectif'}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Current Modules */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3>
                {allModulesCompleted
                  ? 'Parcours terminé 🏆'
                  : completedCount === 0
                    ? 'Commence ton parcours'
                    : 'Mes modules en cours'}
              </h3>
              {!allModulesCompleted && (
                <Link to={routes.StudentModules.path}>
                  <Button
                    variant="ghost"
                  >
                    Voir tout
                  </Button>
                </Link>
              )}
            </div>

            {/* Bloc félicitation - parcours terminé */}
            {allModulesCompleted && (
              <div className="bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl p-6 text-white">
                <div className="text-center mb-4">
                  <span className="text-5xl">🎉</span>
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  Tu as tout terminé !
                </h3>
                <p className="text-sm text-white/90 text-center mb-6 leading-relaxed">
                  Félicitations ! Tu as complété les {totalCount} modules de ton parcours TBEE. Tu es maintenant armé(e) pour décrocher ton alternance.
                </p>
                <Link to={routes.StudentModules.path} className="block w-full">
                  <Button
                    className="w-full bg-white text-[#059669] hover:bg-white/90 font-semibold"
                  >
                    Revoir mes modules →
                  </Button>
                </Link>
              </div>
            )}

            {/* CTA Module en cours */}
            {!allModulesCompleted && currentModule && (
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-[#1E1548]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium opacity-90 mb-1">
                      {currentModule.progress === 0 && currentModule.status === 'available'
                        ? 'Commence ton parcours'
                        : 'Continue ton parcours'}
                    </p>
                    <h3 className="text-xl font-bold mb-2">{currentModule.title}</h3>
                    <p className="text-sm opacity-90">{currentModule.description}</p>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="font-medium">Progression</span>
                    <span className="font-bold">{currentModule.progress}%</span>
                  </div>
                  <div className="h-2 bg-[#1E1548]/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#1E1548] rounded-full transition-all"
                      style={{ width: `${currentModule.progress}%` }}
                    />
                  </div>
                </div>
                <Link to={routes.StudentModulesDetails.path.replace(":id", currentModule.id)} className="block w-full">
                  <Button
                    className="w-full bg-[#1E1548] text-primary hover:bg-[#2D2166]"
                  >
                    {currentModule.progress === 0 && currentModule.status === 'available'
                      ? 'Commencer'
                      : 'Continuer'} →
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements - Hide if new user */}
            {completedCount > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <h4>Récentes réussites</h4>
                </div>
                <div className="space-y-3">
                  {completedCount >= 1 && (
                    <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <p className="text-sm font-medium">Premier module terminé</p>
                        <p className="text-xs text-muted-foreground">Bravo !</p>
                      </div>
                    </div>
                  )}
                  {/*statistics.currentStreakDays >= 3 && (
                    <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <p className="text-sm font-medium">statistics.currentStreakDays jours consécutifs</p>
                        <p className="text-xs text-muted-foreground">Continue comme ça !</p>
                      </div>
                    </div>
                  )*/}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Actions rapides</h4>
              <div className="space-y-3">
                <Link to={routes.StudentCv.path} className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    📄 {'Importer'} mon CV
                  </Button>
                </Link>
                <Link to={routes.StudentJobTracking.path} className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                  >
                    💼 Suivre mes offres
                  </Button>
                </Link>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-6">
              <h4 className="mb-2">Besoin d'aide ?</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Notre équipe est là pour t'accompagner dans ton parcours
              </p>
              <Button variant="outline" className="w-full">
                Contacter le support
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}