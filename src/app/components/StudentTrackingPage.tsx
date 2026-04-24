import { useState } from 'react';
import { ArrowLeft, TrendingUp, Clock, Award, MessageSquare, Calendar, FileText } from 'lucide-react';
import { Button } from './Button';
import { ProgressBar } from './ui/ProgressBar';
import { StatCard } from './StatCard';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

// Mock data for selected student
const studentData = {
  id: '1',
  name: 'Étudiant',
  email: 'etudiant@example.fr',
  phone: '06 00 00 00 00',
  joinedDate: '01/01/2025',
  rqth: false,
  formation: 'Formation',
  niveau: 'Niveau',
  overallProgress: 0,
  stats: {
    studyTime: '0h 0min',
    completedModules: 0,
    totalModules: 6,
    practicalCases: 0
  },
  moduleProgress: [
    { name: 'Comprendre l\'alternance', progress: 0, status: 'not-started', lastActivity: 'Jamais' },
    { name: 'Rédiger son CV', progress: 0, status: 'locked', lastActivity: 'Jamais' },
    { name: 'Préparer son entretien', progress: 0, status: 'locked', lastActivity: 'Jamais' },
    { name: 'Rechercher son entreprise', progress: 0, status: 'locked', lastActivity: 'Jamais' },
    { name: 'Postuler efficacement', progress: 0, status: 'locked', lastActivity: 'Jamais' },
    { name: 'Réussir son intégration', progress: 0, status: 'locked', lastActivity: 'Jamais' }
  ],
  recentActivity: [],
  notes: []
};

export function StudentTrackingPage() {
  const [newNote, setNewNote] = useState('');
  const student = studentData;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in-progress':
        return 'text-primary';
      case 'not-started':
        return 'text-muted-foreground';
      case 'locked':
        return 'text-gray-400';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'not-started':
        return 'Non démarré';
      case 'locked':
        return 'Verrouillé';
      default:
        return status;
    }
  };

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
            <h2>Suivi de {student.name}</h2>
            <p className="text-muted-foreground">
              Suivi personnalisé et accompagnement
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Contacter
          </Button>
        </div>

        {/* student Info Card */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Formation</p>
              <p className="font-medium">{student.formation}</p>
              <p className="text-sm text-muted-foreground">{student.niveau}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Contact</p>
              <p className="text-sm">{student.email}</p>
              <p className="text-sm">{student.phone}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Inscription</p>
              <p className="font-medium">{student.joinedDate}</p>
              {student.rqth && (
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-background rounded-full">
                  RQTH
                </span>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Progression globale</p>
              <ProgressBar progress={student.overallProgress} showLabel size="md" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Temps d'étude"
            value={student.stats.studyTime}
            icon={<Clock className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Modules terminés"
            value={`${student.stats.completedModules}/${student.stats.totalModules}`}
            icon={<Award className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Cas pratiques"
            value={student.stats.practicalCases}
            icon={<FileText className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Dernière activité"
            value="2h"
            icon={<TrendingUp className="w-6 h-6 text-primary" />}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Progress */}
          <div className="lg:col-span-2 space-y-6">
            <h3>Progression des modules</h3>
            <div className="space-y-3">
              {student.moduleProgress.map((module, index) => (
                <div
                  key={index}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="mb-1">{module.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Dernière activité : {module.lastActivity}
                      </p>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(module.status)}`}>
                      {getStatusLabel(module.status)}
                    </span>
                  </div>
                  <ProgressBar progress={module.progress} size="sm" />
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Activité récente
              </h4>
              <div className="space-y-4">
                {student.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{activity.action}</p>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Notes */}
          <div className="space-y-6">
            {/* Add Note */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Ajouter une note</h4>
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Écrivez une note sur l'accompagnement de cet étudiant..."
                className="w-full h-32 p-4 bg-input-background border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                variant="primary"
                className="w-full mt-3"
                onClick={() => {
                  if (newNote.trim()) {
                    // Add note logic here
                    setNewNote('');
                  }
                }}
              >
                Enregistrer la note
              </Button>
            </div>

            {/* Notes History */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Notes d'accompagnement</h4>
              <div className="space-y-4">
                {student.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-secondary/50 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-primary">{note.author}</p>
                      <span className="text-xs text-muted-foreground">{note.date}</span>
                    </div>
                    <p className="text-sm">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Actions rapides</h4>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Planifier un RDV
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Envoyer un message
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Exporter le rapport
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}