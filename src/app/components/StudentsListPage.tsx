import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronLeft, 
  ChevronRight,
  User,
  GraduationCap,
  Clock,
  Award,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  Shield,
  Eye
} from 'lucide-react';
import { Button } from './Button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

interface StudentsListPageProps {
  onNavigate: (page: string) => void;
}

interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinedDate: string;
  rqth: boolean;
  formation: string;
  niveau: string;
  overallProgress: number;
  stats: {
    studyTime: string;
    completedModules: number;
    totalModules: number;
    practicalCases: number;
  };
  lastActivity: string;
}

// Mock data for all students
const allStudents: Student[] = [
  {
    id: '1',
    name: 'Sophie Martind',
    email: 'sophie.martin@example.fr',
    phone: '06 12 34 56 78',
    joinedDate: '15/01/2025',
    rqth: false,
    formation: 'Bachelor Marketing Digital',
    niveau: 'Bac+3',
    overallProgress: 75,
    stats: {
      studyTime: '12h 30min',
      completedModules: 4,
      totalModules: 6,
      practicalCases: 3
    },
    lastActivity: 'Il y a 2 heures'
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.fr',
    phone: '06 23 45 67 89',
    joinedDate: '10/01/2025',
    rqth: true,
    formation: 'Master Data Science',
    niveau: 'Bac+5',
    overallProgress: 45,
    stats: {
      studyTime: '8h 15min',
      completedModules: 2,
      totalModules: 6,
      practicalCases: 1
    },
    lastActivity: 'Il y a 1 jour'
  },
  {
    id: '3',
    name: 'Emma Petit',
    email: 'emma.petit@example.fr',
    phone: '06 34 56 78 90',
    joinedDate: '05/01/2025',
    rqth: false,
    formation: 'Bachelor Commerce International',
    niveau: 'Bac+3',
    overallProgress: 90,
    stats: {
      studyTime: '15h 45min',
      completedModules: 5,
      totalModules: 6,
      practicalCases: 4
    },
    lastActivity: 'Il y a 30 minutes'
  },
  {
    id: '4',
    name: 'Lucas Dubois',
    email: 'lucas.dubois@example.fr',
    phone: '06 45 67 89 01',
    joinedDate: '20/01/2025',
    rqth: false,
    formation: 'Master RH',
    niveau: 'Bac+5',
    overallProgress: 20,
    stats: {
      studyTime: '3h 20min',
      completedModules: 1,
      totalModules: 6,
      practicalCases: 0
    },
    lastActivity: 'Il y a 3 jours'
  },
  {
    id: '5',
    name: 'Camille Rousseau',
    email: 'camille.rousseau@example.fr',
    phone: '06 56 78 90 12',
    joinedDate: '12/01/2025',
    rqth: false,
    formation: 'Bachelor Design Graphique',
    niveau: 'Bac+3',
    overallProgress: 60,
    stats: {
      studyTime: '10h 00min',
      completedModules: 3,
      totalModules: 6,
      practicalCases: 2
    },
    lastActivity: 'Il y a 5 heures'
  },
  {
    id: '6',
    name: 'Hugo Lefevre',
    email: 'hugo.lefevre@example.fr',
    phone: '06 67 89 01 23',
    joinedDate: '08/01/2025',
    rqth: true,
    formation: 'Master Cybersécurité',
    niveau: 'Bac+5',
    overallProgress: 85,
    stats: {
      studyTime: '14h 20min',
      completedModules: 5,
      totalModules: 6,
      practicalCases: 3
    },
    lastActivity: 'Il y a 1 heure'
  },
  {
    id: '7',
    name: 'Julie Moreau',
    email: 'julie.moreau@example.fr',
    phone: '06 78 90 12 34',
    joinedDate: '18/01/2025',
    rqth: false,
    formation: 'Bachelor Communication',
    niveau: 'Bac+3',
    overallProgress: 30,
    stats: {
      studyTime: '5h 45min',
      completedModules: 2,
      totalModules: 6,
      practicalCases: 1
    },
    lastActivity: 'Il y a 2 jours'
  },
  {
    id: '8',
    name: 'Nicolas Girard',
    email: 'nicolas.girard@example.fr',
    phone: '06 89 01 23 45',
    joinedDate: '25/01/2025',
    rqth: false,
    formation: 'Master Finance',
    niveau: 'Bac+5',
    overallProgress: 15,
    stats: {
      studyTime: '2h 30min',
      completedModules: 1,
      totalModules: 6,
      practicalCases: 0
    },
    lastActivity: 'Il y a 5 jours'
  }
];

// Extract unique formations for filter
const formations = ['Tous', ...new Set(allStudents.map(s => s.formation))];

export function StudentsListPage({ onNavigate }: StudentsListPageProps) {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormation, setSelectedFormation] = useState('Tous');
  const [rqthFilter, setRqthFilter] = useState<'all' | 'rqth' | 'non-rqth'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter students
  const filteredStudents = allStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.formation.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFormation = selectedFormation === 'Tous' || student.formation === selectedFormation;
    
    const matchesRqth = rqthFilter === 'all' || 
                        (rqthFilter === 'rqth' && student.rqth) ||
                        (rqthFilter === 'non-rqth' && !student.rqth);
    
    return matchesSearch && matchesFormation && matchesRqth;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 75) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress >= 25) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const StudentCard = ({ student }: { student: Student }) => (
    <Link to={`${routes.AdminStudentTracking.path.replace(":id",student.id)}`}>
      <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group gap-15">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">
                {student.name}
              </h4>
              <p className="text-sm text-muted-foreground">{student.formation}</p>
            </div>
          </div>
          {student.rqth && (
            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
              RQTH
            </span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-medium">{student.overallProgress}%</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all ${getProgressColor(student.overallProgress)}`}
              style={{ width: `${student.overallProgress}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>{student.stats.studyTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>{student.stats.completedModules}/{student.stats.totalModules}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Dernière activité: {student.lastActivity}</span>
          <Eye className="w-4 h-4 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );

  const StudentListItem = ({ student }: { student: Student }) => (
    <Link to={`${routes.AdminStudentTracking.path.replace(":id",student.id)}`}>
      <div className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer group">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-[200px]">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold hover:text-primary transition-colors">
                {student.name}
              </h4>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
            {student.rqth && (
              <span className="px-3 py-1 bg-accent rounded-full text-xs font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                RQTH
              </span>
            )}
          </div>

          <div className="flex-1 min-w-[150px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">Progression:</span>
              <span className="text-sm font-medium">{student.overallProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${getProgressColor(student.overallProgress)}`}
                style={{ width: `${student.overallProgress}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{student.stats.studyTime}</span>
            </div>
            <Eye className="w-4 h-4 group-hover:text-primary transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Gestion des étudiants</h1>
          <p className="text-muted-foreground">
            Suivez et gérez l'ensemble de vos étudiants
          </p>
        </div>

        {/* Filters Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handleFilterChange();
                }}
                className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Formation Filter */}
            <select
              value={selectedFormation}
              onChange={(e) => {
                setSelectedFormation(e.target.value);
                handleFilterChange();
              }}
              className="px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {formations.map(formation => (
                <option key={formation} value={formation}>{formation}</option>
              ))}
            </select>

            {/* RQTH Filter */}
            <select
              value={rqthFilter}
              onChange={(e) => {
                setRqthFilter(e.target.value as any);
                handleFilterChange();
              }}
              className="px-4 py-2 bg-card border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="all">Tous les étudiants</option>
              <option value="rqth">RQTH uniquement</option>
              <option value="non-rqth">Non RQTH</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2 p-1 bg-card border border-border rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-primary text-white' 
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-muted-foreground">
            {filteredStudents.length} étudiant(s) trouvé(s)
          </div>
        </div>

        {/* Students List/Grid */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedStudents.map(student => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {paginatedStudents.map(student => (
              <StudentListItem key={student.id} student={student} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun étudiant trouvé</h3>
            <p className="text-muted-foreground">
              Aucun étudiant ne correspond à vos critères de recherche
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} sur {totalPages}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-border hover:bg-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}