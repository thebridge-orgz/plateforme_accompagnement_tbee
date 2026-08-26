import { useState, useEffect } from 'react';
import { Award, BookOpen, Clock, MessageSquare, Star, Flame, CheckCheck, Target, FileText, Briefcase } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { ProgressBar } from '../ui/ProgressBar';
import { Button } from '../ui/button';
import { useModules } from '../../../hooks/useModules';
import { formatStudyTime } from '../../../utils/initialState';
import { moduleStaticContent } from '../ModuleLinearPage';
import { routes } from '../../router/routes';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../../types/user';
import { notesService, statisticsService } from '../../../services/supabase';
import type { AdminNote } from '../../../services/supabase';
import { formatDateTime } from '../../../utils/date';

interface StudentDashboardProps {
  user: UserProfile;
}


export function StudentDashboard({ user }: StudentDashboardProps) {
  const { loading, modules, totalCount, globalProgress, currentModule, completedCount } = useModules();
  const [adminNotes, setAdminNotes] = useState<AdminNote[]>([]);
  const [streakDays, setStreakDays] = useState(0);
  const [readNoteIds, setReadNoteIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem(`tbee_read_notes_${user?.id}`);
      return new Set(stored ? JSON.parse(stored) : []);
    } catch { return new Set(); }
  });

  const markAsRead = (noteId: string) => {
    setReadNoteIds(prev => {
      const next = new Set(prev).add(noteId);
      localStorage.setItem(`tbee_read_notes_${user?.id}`, JSON.stringify([...next]));
      return next;
    });
  };

  useEffect(() => {
    if (!user?.id) return;
    notesService.getStudentNotes(user.id)
      .then(setAdminNotes)
      .catch(() => {});
    statisticsService.getStreakData(user.id)
      .then(d => setStreakDays(d.streakDays))
      .catch(() => {});
  }, [user?.id]);
  //console.log(`currentModule : ${currentModule}`);

  // Parcours entièrement complété ?
  const allModulesCompleted = totalCount > 0 && completedCount === totalCount;

  // Calcul dynamique du temps d'étude à partir des étapes réellement complétées.
  // Pour les modules statiques : on lit les durées dans moduleStaticContent.
  // Pour les modules admin : on lit module.resources[].duration.
  const parseDurationMin = (dur: string | undefined): number => {
    if (!dur) return 0;
    const m = dur.match(/(\d+)/);
    return m ? parseInt(m[1]) : 0;
  };

  const totalStudyMinutes = modules.reduce((total, module) => {
    if (!module.completedSteps || module.completedSteps.length === 0) return total;

    // Modules créés via l'admin (ressources en DB)
    if (Array.isArray(module.resources) && module.resources.length > 0) {
      return total + (module.resources as any[])
        .filter(r => module.completedSteps.includes(r.id))
        .reduce((s: number, r: any) => s + parseDurationMin(r.duration), 0);
    }

    // Modules statiques codés en dur
    const staticContent = moduleStaticContent[`week${module.weekNumber}`];
    if (staticContent?.steps) {
      return total + staticContent.steps
        .filter((s: any) => module.completedSteps.includes(s.id))
        .reduce((s: number, step: any) => s + parseDurationMin(step.duration), 0);
    }

    return total;
  }, 0);

  const studyTimeFormatted = totalStudyMinutes > 0
    ? formatStudyTime(totalStudyMinutes)
    : completedCount === 0 ? '–' : '0min';

  // Score TBEE : 10 XP par étape + 50 XP bonus par module complété
  const tbeeScore = modules.reduce((sum, m) => {
    const stepsXp = (m.completedSteps?.length ?? 0) * 10;
    const bonusXp = m.status === 'completed' ? 50 : 0;
    return sum + stepsXp + bonusXp;
  }, 0);

  const streakDisplay = streakDays > 0
    ? `${streakDays} jour${streakDays > 1 ? 's' : ''}`
    : '–';


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
            value={studyTimeFormatted}
            icon={<Clock className="w-6 h-6 text-primary" />}
            subtitle={completedCount === 0 ? 'Commence pour débloquer' : 'Temps total de formation'}
          />
          <StatCard
            title="Score TBEE"
            value={tbeeScore > 0 ? `${tbeeScore} XP` : '–'}
            icon={<Star className="w-6 h-6 text-primary" />}
            subtitle={tbeeScore === 0 ? 'Commence pour gagner des XP' : '10 XP/étape · 50 XP/module'}
          />
          <StatCard
            title="Série active"
            value={streakDisplay}
            icon={<Flame className="w-6 h-6 text-primary" />}
            subtitle={streakDays === 0 ? 'Progresse chaque jour' : `${streakDays} jour${streakDays > 1 ? 's' : ''} consécutif${streakDays > 1 ? 's' : ''}`}
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
                      <div className="w-9 h-9 bg-[#E8ECFF] rounded-full flex items-center justify-center shrink-0">
                        <Target className="w-4 h-4 text-[#1E1548]" />
                      </div>
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

            {/* Notes de l'admin */}
            {adminNotes.length > 0 && (() => {
              const unread = adminNotes.filter(n => !readNoteIds.has(n.id));
              const readCount = adminNotes.length - unread.length;
              if (unread.length === 0 && readCount === 0) return null;
              return (
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-primary" />
                    <h4>Messages de ton conseiller</h4>
                    {unread.length > 0 && (
                      <span className="ml-auto text-xs font-semibold bg-primary/10 text-[#1E1548] px-2 py-0.5 rounded-full">
                        {unread.length}
                      </span>
                    )}
                  </div>
                  {unread.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      Tous les messages sont lus · {readCount} archivé{readCount > 1 ? 's' : ''}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {unread.map((note) => (
                        <div key={note.id} className="p-3 bg-primary/5 border border-primary/20 rounded-xl">
                          {note.content.includes('\n\n') ? (() => {
                            const [header, ...rest] = note.content.split('\n\n');
                            return (
                              <>
                                <p className="text-xs font-semibold text-[#1E1548] mb-1">{header}</p>
                                <p className="text-sm whitespace-pre-line">{rest.join('\n\n')}</p>
                              </>
                            );
                          })() : (
                            <p className="text-sm whitespace-pre-line">{note.content}</p>
                          )}
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-muted-foreground">{formatDateTime(note.createdAt)}</p>
                            <button
                              onClick={() => markAsRead(note.id)}
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-[#1E1548] transition-colors"
                            >
                              <CheckCheck className="w-3.5 h-3.5" /> Marquer comme lu
                            </button>
                          </div>
                        </div>
                      ))}
                      {readCount > 0 && (
                        <p className="text-xs text-muted-foreground text-center pt-1">
                          + {readCount} message{readCount > 1 ? 's' : ''} archivé{readCount > 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Actions rapides</h4>
              <div className="space-y-3">
                <Link to={routes.StudentCv.path} className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <FileText className="w-4 h-4 text-[#1E1548]" />
                    Importer mon CV
                  </Button>
                </Link>
                <Link to={routes.StudentJobTracking.path} className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-2"
                  >
                    <Briefcase className="w-4 h-4 text-[#1E1548]" />
                    Suivre mes offres
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