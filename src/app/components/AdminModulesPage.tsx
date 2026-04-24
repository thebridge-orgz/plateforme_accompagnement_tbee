import { ArrowLeft, FileText, Plus, X, Calendar, BookOpen, Target } from 'lucide-react';
import { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAdminData } from '../../context/AdminDataContext';

interface Module {
  id: string;
  name: string;
  status: 'Publié' | 'Brouillon';
  users: number;
  completion: number;
  description: string;
  thematic: string;
  week: string;
  order: number;
}

export function AdminModulesPage() {
  const [modulesStatic, setModules] = useState<Module[]>([
    {
      id: '1',
      name: 'Rédiger son CV',
      status: 'Publié',
      users: 245,
      completion: 85,
      description: 'Apprenez à créer un CV professionnel et attractif',
      thematic: 'CV et candidature',
      week: 'Semaine 1',
      order: 1
    },
    {
      id: '2',
      name: 'Préparer son entretien',
      status: 'Publié',
      users: 218,
      completion: 72,
      description: 'Maîtrisez les techniques d\'entretien d\'embauche',
      thematic: 'Entretien',
      week: 'Semaine 2',
      order: 1
    },
    {
      id: '3',
      name: 'Comprendre l\'alternance',
      status: 'Publié',
      users: 198,
      completion: 68,
      description: 'Découvrez le fonctionnement de l\'alternance',
      thematic: 'Alternance',
      week: 'Semaine 1',
      order: 2
    },
    {
      id: '4',
      name: 'Rechercher son entreprise',
      status: 'Brouillon',
      users: 0,
      completion: 0,
      description: 'Stratégies pour trouver votre entreprise d\'alternance',
      thematic: 'Recherche d\'emploi',
      week: 'Semaine 3',
      order: 1
    },
    {
      id: '5',
      name: 'Postuler efficacement',
      status: 'Brouillon',
      users: 0,
      completion: 0,
      description: 'Optimisez vos candidatures et démarquez-vous',
      thematic: 'CV et candidature',
      week: 'Semaine 3',
      order: 2
    }
  ]);

  const {
    modules
  } = useAdminData();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newModule, setNewModule] = useState({
    name: '',
    description: '',
    thematic: '',
    week: '',
    order: 1,
    status: 'Brouillon' as 'Publié' | 'Brouillon'
  });

  // Thématiques disponibles pour le parcours TBEE
  const thematics = [
    'CV et candidature',
    'Entretien',
    'Alternance',
    'Recherche d\'emploi',
    'Posture professionnelle',
    'Compétences transversales',
    'Droits et devoirs',
    'Réseau professionnel'
  ];

  // Semaines du parcours
  const weeks = [
    'Semaine 1',
    'Semaine 2',
    'Semaine 3',
    'Semaine 4',
    'Semaine 5'
  ];

  const handleCreateModule = () => {
    if (!newModule.name || !newModule.description || !newModule.thematic || !newModule.week) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const module: Module = {
      id: Date.now().toString(),
      name: newModule.name,
      status: newModule.status,
      users: 0,
      completion: 0,
      description: newModule.description,
      thematic: newModule.thematic,
      week: newModule.week,
      order: newModule.order
    };

    setModules([...modulesStatic, module]);
    setShowCreateModal(false);
    setNewModule({
      name: '',
      description: '',
      thematic: '',
      week: '',
      order: 1,
      status: 'Brouillon'
    });
  };

  const handlePublishModule = (moduleId: string) => {
    setModules(modulesStatic.map(m =>
      m.id === moduleId ? { ...m, status: 'Publié' as const } : m
    ));
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.AdminDashboard.path}>
              <button
                className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Gestion des modulesStatic
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Créez et gérez les modulesStatic de formation TBEE
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8">
        {/* Action Button */}
        <div className="mb-6">
          <Button className="flex items-center gap-2" onClick={() => setShowCreateModal(true)}>
            <Plus className="w-5 h-5" />
            Créer un nouveau module
          </Button>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)] hover:shadow-[0_4px_12px_rgba(30,21,72,0.08)] transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-[#FFD600] flex-shrink-0" />
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548]">
                      {module.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold flex-shrink-0 ${module.is_published
                      ? 'bg-[#F0FDF4] text-[#10B981]'
                      : 'bg-[#FFF4CC] text-[#B45309]'
                      }`}>
                      {module.is_published}
                    </span>
                  </div>
                  <p className="text-[14px] text-[#6B7280] mb-3">
                    {module.description}
                  </p>

                  {/* Module Organization Info */}
                  <div className="flex flex-wrap gap-4 mb-4 pb-3 border-b border-[rgba(30,21,72,0.06)]">
                    <div className="flex items-center gap-2 text-[13px]">
                      <BookOpen className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-[#1E1548] font-medium">module.thematic</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                      <Calendar className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-[#1E1548] font-medium">{module.week_number}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px]">
                      <Target className="w-4 h-4 text-[#6B7280]" />
                      <span className="text-[#1E1548] font-medium">Position {module.order_index}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 text-[14px] text-[#6B7280]">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1E1548]">module.users</span>
                      <span>utilisateurs inscrits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1E1548]">module.completion%</span>
                      <span>taux de complétion</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    Modifier
                  </Button>
                  {module.status === 'Brouillon' && (
                    <Button size="sm" className="flex items-center gap-2" onClick={() => handlePublishModule(module.id)}>
                      Publier
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for when no modulesStatic exist */}
        {modulesStatic.length === 0 && (
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
            <FileText className="w-16 h-16 text-[#E8ECFF] mx-auto mb-4" />
            <h3 className="text-[20px] font-bold text-[#1E1548] mb-2">
              Aucun module pour le moment
            </h3>
            <p className="text-[14px] text-[#6B7280] mb-6">
              Commencez par créer votre premier module de formation
            </p>
            <Button className="flex items-center gap-2 mx-auto" onClick={() => setShowCreateModal(true)}>
              <Plus className="w-5 h-5" />
              Créer un module
            </Button>
          </div>
        )}
      </div>

      {/* Create Module Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-4 py-8">
            <div className="bg-white rounded-[16px] shadow-[0_8px_24px_rgba(30,21,72,0.12)] max-w-[600px] w-full">
              {/* Modal Header */}
              <div className="bg-white border-b border-[rgba(30,21,72,0.08)] px-4 sm:px-6 py-4 rounded-t-[16px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#FFD600] flex items-center justify-center flex-shrink-0">
                      <Plus className="w-5 h-5 text-[#1E1548]" />
                    </div>
                    <h2 className="text-[18px] sm:text-[24px] font-bold text-[#1E1548]">
                      Créer un nouveau module
                    </h2>
                  </div>
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="w-8 h-8 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="Fermer"
                  >
                    <X className="w-5 h-5 text-[#1E1548]" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* Informations générales */}
                <div className="space-y-4">
                  <h3 className="text-[16px] font-semibold text-[#1E1548] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#FFD600]" />
                    Informations générales
                  </h3>

                  <div>
                    <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                      Nom du module <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Rédiger son CV"
                      value={newModule.name}
                      onChange={(e) => setNewModule({ ...newModule, name: e.target.value })}
                      className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Décrivez les objectifs et le contenu du module..."
                      value={newModule.description}
                      onChange={(e) => setNewModule({ ...newModule, description: e.target.value })}
                      className="w-full min-h-[100px] px-4 py-3 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] transition-colors resize-y"
                      rows={4}
                    />
                  </div>
                </div>

                {/* Organisation dans le parcours */}
                <div className="space-y-4 pt-4 border-t border-[rgba(30,21,72,0.08)]">
                  <h3 className="text-[16px] font-semibold text-[#1E1548] flex items-center gap-2">
                    <Target className="w-4 h-4 text-[#FFD600]" />
                    Organisation dans le parcours
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                        Thématique <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none z-10" />
                        <select
                          value={newModule.thematic}
                          onChange={(e) => setNewModule({ ...newModule, thematic: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600] transition-colors appearance-none bg-white cursor-pointer relative z-0"
                        >
                          <option value="">Sélectionner...</option>
                          {thematics.map(thematic => (
                            <option key={thematic} value={thematic}>{thematic}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                        Semaine <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none z-10" />
                        <select
                          value={newModule.week}
                          onChange={(e) => setNewModule({ ...newModule, week: e.target.value })}
                          className="w-full h-12 pl-11 pr-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600] transition-colors appearance-none bg-white cursor-pointer relative z-0"
                        >
                          <option value="">Sélectionner...</option>
                          {weeks.map(week => (
                            <option key={week} value={week}>{week}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                        Ordre dans la semaine
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={newModule.order}
                        onChange={(e) => setNewModule({ ...newModule, order: parseInt(e.target.value) || 1 })}
                        className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600] transition-colors"
                      />
                      <p className="text-[12px] text-[#6B7280] mt-1">Position du module dans la semaine</p>
                    </div>

                    <div>
                      <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                        Statut de publication
                      </label>
                      <select
                        value={newModule.status}
                        onChange={(e) => setNewModule({ ...newModule, status: e.target.value as 'Publié' | 'Brouillon' })}
                        className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600] transition-colors appearance-none bg-white cursor-pointer"
                      >
                        <option value="Brouillon">Brouillon</option>
                        <option value="Publié">Publié</option>
                      </select>
                      <p className="text-[12px] text-[#6B7280] mt-1">Les brouillons ne sont pas visibles aux étudiants</p>
                    </div>
                  </div>
                </div>

                {/* Info Box */}
                <div className="bg-[#E8ECFF] border-2 border-[#1E1548]/10 rounded-[12px] p-4">
                  <p className="text-[13px] text-[#1E1548] leading-relaxed">
                    💡 <strong>Astuce :</strong> Organisez vos modulesStatic de manière cohérente en respectant la progression pédagogique du parcours TBEE. Chaque module doit s'inscrire dans une thématique claire et une semaine précise.
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-white border-t border-[rgba(30,21,72,0.08)] px-4 sm:px-6 py-4 rounded-b-[16px]">
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="h-12 px-6 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[14px] font-semibold hover:bg-[#F8F9FD] transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleCreateModule}
                    className="h-12 px-6 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-all flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Créer le module
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}