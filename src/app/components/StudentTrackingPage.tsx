import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Clock, Award, MessageSquare, FileText, Trash2 } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ui/ProgressBar';
import { StatCard } from './StatCard';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAdminData } from '../../hooks/useAdminData';
import { moduleService, notesService, practicalCasesService } from '../../services/supabase';
import type { AdminNote } from '../../services/supabase';
import { ModuleWithProgress } from '../../types/index';
import { formatDateTime } from '../../utils/date';
import { formatStudyTime } from '../../utils/initialState';
import { useAuth } from '../../hooks/useAuth';

export function StudentTrackingPage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [modulesWithProgress, setModulesWithProgress] = useState<ModuleWithProgress[]>([]);
  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [practicalCasesCount, setPracticalCasesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const { getStudentById, loading: adminLoading, cvSubmissions } = useAdminData();
  const student = id ? getStudentById(id) : undefined;
  const studentCV = cvSubmissions.find(cv => cv.studentId === id);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    Promise.all([
      moduleService.getUserModulesWithProgress(id),
      notesService.getStudentNotes(id).catch(() => [] as AdminNote[]),
      practicalCasesService.getViewedCount(id).catch(() => 0),
    ])
      .then(([mods, fetchedNotes, casesCount]) => {
        setModulesWithProgress(mods);
        setNotes(fetchedNotes);
        setPracticalCasesCount(casesCount);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  // ── Temps d'étude : calculé depuis les étapes complétées + durées des ressources ──
  const parseDurationMin = (dur: string | undefined): number => {
    if (!dur) return 0;
    const m = dur.match(/(\d+)/);
    return m ? parseInt(m[1]) : 0;
  };

  const totalStudyMinutes = modulesWithProgress.reduce((total, mod) => {
    if (!mod.completedSteps?.length) return total;
    if (Array.isArray(mod.resources) && mod.resources.length > 0) {
      return total + mod.resources
        .filter(r => mod.completedSteps.includes(r.id))
        .reduce((s, r) => s + parseDurationMin(r.duration), 0);
    }
    return total;
  }, 0);
  const studyTimeLabel = totalStudyMinutes > 0 ? formatStudyTime(totalStudyMinutes) : '0h 0min';

  // ── Progression globale ──
  const globalProgress = modulesWithProgress.length === 0
    ? 0
    : Math.round(modulesWithProgress.reduce((sum, m) => sum + m.progress, 0) / modulesWithProgress.length);

  const completedModules = modulesWithProgress.filter(m => m.status === 'completed').length;

  // ── Dernière connexion : date la plus récente dans user_module_progress ──
  const lastActivityDate = modulesWithProgress
    .map(m => m.updatedAt || m.completedAt || m.startedAt)
    .filter(Boolean)
    .sort()
    .at(-1);
  const lastActivityLabel = lastActivityDate ? formatDateTime(lastActivityDate) : 'Jamais';

  // ── Statut CV ──
  const cvStatusLabel: Record<string, string> = {
    pending: 'En attente de correction',
    approved: 'Validé',
    rejected: 'À retravailler',
  };
  const cvStatusColor: Record<string, string> = {
    pending: 'text-yellow-600 bg-yellow-50',
    approved: 'text-green-600 bg-green-50',
    rejected: 'text-red-600 bg-red-50',
  };

  // ── Modules ──
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'in_progress': return 'text-primary';
      case 'available': return 'text-muted-foreground';
      case 'locked': return 'text-gray-400';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'in_progress': return 'En cours';
      case 'available': return 'Non démarré';
      case 'locked': return 'Verrouillé';
      default: return status;
    }
  };

  const getModuleLastActivity = (mod: ModuleWithProgress): string => {
    const date = mod.updatedAt || mod.completedAt || mod.startedAt;
    return date ? formatDateTime(date) : 'Jamais';
  };

  const recentActivity = [...modulesWithProgress]
    .filter(m => m.startedAt || m.completedAt || m.updatedAt)
    .sort((a, b) => {
      const da = new Date(a.updatedAt || a.completedAt || a.startedAt || 0).getTime();
      const db = new Date(b.updatedAt || b.completedAt || b.startedAt || 0).getTime();
      return db - da;
    })
    .slice(0, 5);

  // ── Notes ──
  const handleAddNote = async () => {
    if (!newNote.trim() || !id || !user?.id) return;
    setSavingNote(true);
    try {
      const created = await notesService.addNote(id, user.id, newNote.trim());
      setNotes(prev => [created, ...prev]);
      setNewNote('');
    } catch (err) {
      console.error('Erreur ajout note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    try {
      await notesService.deleteNote(noteId);
      setNotes(prev => prev.filter(n => n.id !== noteId));
    } catch (err) {
      console.error('Erreur suppression note:', err);
    }
  };

  if (!student && !loading && !adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Étudiant introuvable.</p>
      </div>
    );
  }

  const fullName = student
    ? `${student.firstName ?? ''} ${student.lastName ?? ''}`.trim() || student.email
    : '…';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Link to={routes.AdminStudentList.path}>
            <button
              className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors self-start"
              aria-label="Retour"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <div className="flex-1">
            <h2>Suivi de {fullName}</h2>
            <p className="text-muted-foreground">Suivi personnalisé et accompagnement</p>
          </div>
          <Button variant="secondary" className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Contacter
          </Button>
        </div>

        {/* Student Info Card — gradient premium */}
        <div className="bg-gradient-to-br from-[#1E1548] to-[#352680] rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-white/60 mb-1">Formation</p>
              <p className="font-medium text-white">{student?.fieldOfInterest ?? '—'}</p>
              <p className="text-sm text-white/60">{student?.currentLevel ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Contact</p>
              <p className="text-sm text-white">{student?.email ?? '—'}</p>
              <p className="text-sm text-white/60">{student?.phone ?? '—'}</p>
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Inscription</p>
              <p className="font-medium text-white">{student ? formatDateTime(student.createdAt) : '—'}</p>
              {student?.hasRQTH && (
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-white/20 text-white rounded-full">
                  RQTH
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-white/60 mb-1">Progression globale</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${globalProgress}%` }}
                  />
                </div>
                <span className="text-white font-semibold text-sm">{globalProgress}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Temps d'étude"
            value={studyTimeLabel}
            icon={<Clock className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Modules terminés"
            value={`${completedModules}/${modulesWithProgress.length}`}
            icon={<Award className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Cas pratiques"
            value={practicalCasesCount}
            icon={<FileText className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Dernière activité"
            value={lastActivityLabel}
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
            valueClassName="text-3xl lg:text-xl"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Progress + Recent Activity */}
          <div className="lg:col-span-2 space-y-6">
            <h3>Progression des modules</h3>
            {loading ? (
              <p className="text-muted-foreground text-sm">Chargement…</p>
            ) : (
              <div className="space-y-3">
                {modulesWithProgress.map((mod) => (
                  <div key={mod.id} className="bg-card border border-border rounded-2xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="mb-1">{mod.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          Dernière activité : {getModuleLastActivity(mod)}
                        </p>
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(mod.status)}`}>
                        {getStatusLabel(mod.status)}
                      </span>
                    </div>
                    <ProgressBar progress={mod.progress} size="sm" />
                  </div>
                ))}
                {modulesWithProgress.length === 0 && (
                  <p className="text-muted-foreground text-sm">Aucun module disponible.</p>
                )}
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Activité récente
              </h4>
              {recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune activité récente.</p>
              ) : (
                <div className="space-y-4">
                  {recentActivity.map((mod) => (
                    <div
                      key={mod.id}
                      className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                    >
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{mod.title}</p>
                          <span className="text-xs text-muted-foreground">
                            {getModuleLastActivity(mod)}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getStatusLabel(mod.status)} — {mod.progress}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Add Note */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Ajouter une note</h4>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Écrivez une note visible par l'étudiant…"
                className="w-full h-32 p-4 bg-input-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                variant="primary"
                className="w-full mt-3"
                onClick={handleAddNote}
                disabled={savingNote || !newNote.trim()}
              >
                {savingNote ? 'Enregistrement…' : 'Enregistrer la note'}
              </Button>
            </div>

            {/* Notes History */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Notes d'accompagnement</h4>
              {notes.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune note pour le moment.</p>
              ) : (
                <div className="space-y-3">
                  {notes.map((note) => (
                    <div key={note.id} className="p-4 bg-secondary/50 rounded-xl">
                      <div className="flex items-start justify-between mb-2 gap-2">
                        <span className="text-xs text-muted-foreground">
                          {formatDateTime(note.createdAt)}
                        </span>
                        <button
                          onClick={() => handleDeleteNote(note.id)}
                          className="text-muted-foreground hover:text-red-500 transition-colors flex-shrink-0"
                          aria-label="Supprimer la note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-sm">{note.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Statut CV */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Statut du CV</h4>
              {!studentCV ? (
                <p className="text-sm text-muted-foreground">Aucun CV soumis.</p>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Fichier</span>
                    <span className="text-sm font-medium truncate max-w-[150px]">{studentCV.fileName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Statut</span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${cvStatusColor[studentCV.status] ?? 'text-muted-foreground bg-secondary'}`}>
                      {cvStatusLabel[studentCV.status] ?? studentCV.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Soumis le</span>
                    <span className="text-sm">{formatDateTime(studentCV.submittedAt)}</span>
                  </div>
                  {studentCV.feedback && (
                    <div className="pt-2 border-t border-border">
                      <p className="text-xs text-muted-foreground mb-1">Feedback</p>
                      <p className="text-sm">{studentCV.feedback}</p>
                    </div>
                  )}
                  <Link to={routes.AdminCvReview.path}>
                    <Button variant="secondary" className="w-full mt-1 text-sm">
                      Réviser le CV →
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
