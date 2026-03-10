import { Award, BookOpen, Clock, Target, TrendingUp } from 'lucide-react';
import { StatCard } from './StatCard';
import { ModuleCard } from '../parcours/ModuleCard';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/button';
import { useUserData } from '../../../context/UserDataContext';
import { formatStudyTime } from '../../../utils/initialState';

interface StudentDashboardProps {
  onNavigate: (page: string) => void;
}

export function StudentDashboard({ onNavigate }: StudentDashboardProps) {
  // TODO: fetch from Supabase - using context for now
  const {
    isLoading,
    userProfile,
    statistics,
    modules,
    globalProgress,
    completedModulesCount,
    totalModulesCount,
    currentModule,
    isNewUser,
  } = useUserData();

  // Récupérer le prénom de l'utilisateur ou utiliser un placeholder
  const firstName = userProfile?.firstName || 'Candidat';
  
  // Message d'accueil adapté au statut de l'utilisateur
  const welcomeMessage = isNewUser
    ? `Bienvenue, ${firstName} ! 👋 Commence ton parcours pour trouver ton alternance`
    : `Bienvenue, ${firstName} ! 👋 Continue ton parcours vers l'alternance. Tu es sur la bonne voie !`;
  
  // Formater le temps d'étude
  const studyTimeFormatted = formatStudyTime(statistics.totalTimeSpentMinutes);
  
  // Modules à afficher (limiter à 3 pour l'affichage)
  const displayModules = modules
    .filter(m => m.status === 'in_progress' || m.status === 'available')
    .slice(0, 3);

  // Si aucun module en cours/disponible, afficher les premiers modules
  const modulesToShow = displayModules.length > 0 
    ? displayModules 
    : modules.slice(0, 3);

  if (isLoading) {
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
          <h2 className="mb-2">{welcomeMessage.split('!')[0]}! {welcomeMessage.split('!')[1]?.split('👋')[0]}</h2>
          <p className="text-muted-foreground mb-6">
            {isNewUser 
              ? 'Commence ton parcours pour trouver ton alternance'
              : 'Continue ton parcours vers l\'alternance. Tu es sur la bonne voie !'}
          </p>
         <div className="w-full max-w-none">
         <ProgressBar progress={globalProgress} showLabel size="lg" className="w-full" />
         </div>
          {isNewUser && (
            <p className="text-sm text-muted-foreground mt-3">
              💡 Commence pour débloquer tes statistiques et suivre ta progression
            </p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <StatCard
            title="Modules terminés"
            value={`${completedModulesCount}/${totalModulesCount}`}
            icon={<BookOpen className="w-6 h-6 text-primary" />}
            subtitle={isNewUser ? 'Commence pour débloquer' : undefined}
          />
          <StatCard
            title="Temps d'étude"
            value={studyTimeFormatted}
            icon={<Clock className="w-6 h-6 text-primary" />}
            subtitle={isNewUser ? 'Commence pour débloquer' : undefined}
          />
          <StatCard
            title="Série en cours"
            value={statistics.currentStreakDays === 0 ? '0 jour' : `${statistics.currentStreakDays} jour${statistics.currentStreakDays > 1 ? 's' : ''}`}
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            subtitle={isNewUser ? 'Commence pour débloquer' : undefined}
          />
          <StatCard
            title="Objectif mensuel"
            value={globalProgress === 0 ? '0%' : `${globalProgress}%`}
            icon={<Target className="w-6 h-6 text-primary" />}
            subtitle={isNewUser ? 'Définis ton objectif' : undefined}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Current Modules */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h3>{isNewUser ? 'Commence ton parcours' : 'Mes modules en cours'}</h3>
              <Button 
                variant="ghost" 
                onClick={() => onNavigate('student-journey')}
              >
                Voir tout
              </Button>
            </div>
            
            {modulesToShow.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-semibold text-lg mb-2">Aucun module disponible</h4>
                <p className="text-sm text-muted-foreground">
                  Les modules seront bientôt disponibles
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {modulesToShow.map((module) => (
                  <ModuleCard
                    key={module.id}
                    id={module.id}
                    title={module.title}
                    description={module.description}
                    duration={`Semaine ${module.weekNumber}`}
                    videoCount={0}
                    progress={module.progress}
                    status={module.status}
                    onClick={() => onNavigate(module.id)}
                  />
                ))}
              </div>
            )}
            
            {/* CTA Module en cours */}
            {currentModule && (
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-6 text-[#1E1548]">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm font-medium opacity-90 mb-1">Semaine {currentModule.weekNumber} en cours</p>
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
                <Button
                  onClick={() => onNavigate(currentModule.id)}
                  className="w-full bg-[#1E1548] text-primary hover:bg-[#2D2166]"
                >
                  {isNewUser ? 'Commencer' : 'Continuer'} →
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Achievements - Hide if new user */}
            {!isNewUser && completedModulesCount > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-5 h-5 text-primary" />
                  <h4>Récentes réussites</h4>
                </div>
                <div className="space-y-3">
                  {completedModulesCount >= 1 && (
                    <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                      <span className="text-2xl">🎯</span>
                      <div>
                        <p className="text-sm font-medium">Premier module terminé</p>
                        <p className="text-xs text-muted-foreground">Bravo !</p>
                      </div>
                    </div>
                  )}
                  {statistics.currentStreakDays >= 3 && (
                    <div className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl">
                      <span className="text-2xl">🔥</span>
                      <div>
                        <p className="text-sm font-medium">{statistics.currentStreakDays} jours consécutifs</p>
                        <p className="text-xs text-muted-foreground">Continue comme ça !</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Actions rapides</h4>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('student-cv')}
                >
                  📄 {isNewUser ? 'Importer' : 'Télécharger'} mon CV
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('student-tracking')}
                >
                  💼 Suivre mes offres
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('student-profile')}
                >
                  👤 Modifier mon profil
                </Button>
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