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
import { useAdminData, studentProfile } from '../../context/AdminDataContext';
import { formatDateTime } from '../../utils/date';
import { calculateGlobalProgress } from '../../utils/initialState';

export function StudentsListPage() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [rqthFilter, setRqthFilter] = useState<'all' | 'rqth' | 'non-rqth'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const {
    students,
    getstudentStats,
    modules,
    studentModulesProgress
  } = useAdminData();

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRqth = rqthFilter === 'all' ||
      (rqthFilter === 'rqth' && student.hasRQTH) ||
      (rqthFilter === 'non-rqth' && !student.hasRQTH);

    return matchesSearch && matchesRqth;
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

  const StudentCard = ({ student }: { student: studentProfile }) => (
    <Link to={`${routes.AdminStudentTracking.path.replace(":id", student.id)}`}>
      <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group gap-15">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold group-hover:text-primary transition-colors">
                {student.firstName} {student.lastName}
              </h4>
            </div>
          </div>
          {student.hasRQTH && (
            <span className="px-3 py-1 bg-accent rounded-full text-xs font-medium flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" />
              RQTH
            </span>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progression</span>
            <span className="font-medium">
              {calculateGlobalProgress(studentModulesProgress.filter(progress => progress.user_id === student.id))}%
            </span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${getProgressColor(calculateGlobalProgress(studentModulesProgress.filter(progress => progress.user_id === student.id)))}`}
              style={{ width: `${calculateGlobalProgress(studentModulesProgress.filter(progress => progress.user_id === student.id))}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>student.stats.studyTime</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-muted-foreground" />
            <span>{getstudentStats(student.id)
              ? Object.values(getstudentStats(student.id).moduleProgress).filter(module => module.completed === true).length
              : 0}/{modules.length}</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Dernière activité: {formatDateTime(student.lastActiveAt)}</span>
          <Eye className="w-4 h-4 group-hover:text-primary transition-colors" />
        </div>
      </div>
    </Link>
  );

  const StudentListItem = ({ student }: { student: studentProfile }) => (
    <Link to={`${routes.AdminStudentTracking.path.replace(":id", student.id)}`}>
      <div className="bg-card border border-border rounded-2xl p-4 hover:shadow-lg transition-all cursor-pointer group">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-start gap-4 flex-1 min-w-[200px]">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold hover:text-primary transition-colors">
                {student.firstName} {student.lastName}
              </h4>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
            {student.hasRQTH && (
              <span className="px-3 py-1 bg-accent rounded-full text-xs font-medium flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                RQTH
              </span>
            )}
          </div>

          <div className="flex-1 min-w-[150px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm text-muted-foreground">Progression:</span>
              <span className="text-sm font-medium">{calculateGlobalProgress(studentModulesProgress.filter(progress => progress.user_id === student.id))}%</span>
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${getProgressColor(calculateGlobalProgress(studentModulesProgress.filter(progress => progress.user_id === student.id)))}`}
                style={{ width: `${calculateGlobalProgress(studentModulesProgress.filter(progress => progress.user_id === student.id))}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>student.stats.studyTime</span>
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
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:bg-secondary'
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
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