import { useState } from 'react';
import { CheckCircle2, ChevronRight, Download, ExternalLink, FileText, Linkedin, Search, X } from 'lucide-react';

interface AdminValidationPageProps {
  onNavigate: (page: string) => void;
}

interface ValidationItem {
  id: string;
  studentName: string;
  type: 'cv' | 'linkedin';
  status: 'pending' | 'approved' | 'revision';
  submittedDate: string;
  cvUrl?: string;
  linkedinUrl?: string;
  adminComment?: string;
}

const mockValidations: ValidationItem[] = [
  {
    id: '1',
    studentName: 'Jean Dupont',
    type: 'cv',
    status: 'pending',
    submittedDate: '2024-01-15',
    cvUrl: '/uploads/cv-jean-dupont.pdf'
  },
  {
    id: '2',
    studentName: 'Marie Martin',
    type: 'linkedin',
    status: 'pending',
    submittedDate: '2024-01-15',
    linkedinUrl: 'https://linkedin.com/in/marie-martin'
  },
  {
    id: '3',
    studentName: 'Paul Bernard',
    type: 'cv',
    status: 'approved',
    submittedDate: '2024-01-14',
    cvUrl: '/uploads/cv-paul-bernard.pdf',
    adminComment: 'Excellent CV, bien structuré'
  },
  {
    id: '4',
    studentName: 'Sophie Dubois',
    type: 'linkedin',
    status: 'revision',
    submittedDate: '2024-01-13',
    linkedinUrl: 'https://linkedin.com/in/sophie-dubois',
    adminComment: 'Ajouter plus de détails sur les expériences'
  }
];

const statusConfig = {
  pending: { label: 'À valider', color: 'bg-[#FEF3C7] text-[#92400E]', icon: '⏳' },
  approved: { label: 'Validé', color: 'bg-[#D1FAE5] text-[#065F46]', icon: '✅' },
  revision: { label: 'À corriger', color: 'bg-[#FEE2E2] text-[#991B1B]', icon: '⚠️' }
};

export function AdminValidationPage({ onNavigate }: AdminValidationPageProps) {
  const [validations, setValidations] = useState<ValidationItem[]>(mockValidations);
  const [selectedItem, setSelectedItem] = useState<ValidationItem | null>(null);
  const [comment, setComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cv' | 'linkedin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'revision'>('all');

  // Filter validations
  const filteredValidations = validations.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const pendingCount = validations.filter(v => v.status === 'pending').length;

  const handleValidate = (itemId: string, newStatus: 'approved' | 'revision') => {
    setValidations(validations.map(item => 
      item.id === itemId 
        ? { ...item, status: newStatus, adminComment: comment }
        : item
    ));
    setComment('');
    setSelectedItem(null);
    // In real app: send notification to student
  };

  const handleOpenDetail = (item: ValidationItem) => {
    setSelectedItem(item);
    setComment(item.adminComment || '');
  };

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="max-w-[1152px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className="flex items-center gap-2 text-[14px] font-medium text-[#6B7280] hover:text-[#1E1548] transition-colors mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour au dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[32px] font-bold leading-[40px] text-[#1E1548] mb-2">
                Validation CV / LinkedIn
              </h2>
              <p className="text-[16px] font-normal leading-[24px] text-[#101828]">
                Révise et valide les profils étudiants
              </p>
            </div>
            {pendingCount > 0 && (
              <div className="flex items-center gap-3 bg-[#FEF3C7] px-6 py-3 rounded-[12px]">
                <span className="text-2xl">⏳</span>
                <div>
                  <p className="text-[14px] font-semibold text-[#92400E]">
                    {pendingCount} {pendingCount === 1 ? 'soumission en attente' : 'soumissions en attente'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
            >
              <option value="all">Tous les types</option>
              <option value="cv">CV uniquement</option>
              <option value="linkedin">LinkedIn uniquement</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">À valider</option>
              <option value="approved">Validé</option>
              <option value="revision">À corriger</option>
            </select>
          </div>
        </div>

        {/* Validation List */}
        <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] overflow-hidden">
          {filteredValidations.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-[14px] text-[#6B7280]">Aucune soumission trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#F8F9FD] border-b border-[rgba(30,21,72,0.1)]">
                  <tr>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                      Étudiant
                    </th>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(30,21,72,0.1)]">
                  {filteredValidations.map((item) => (
                    <tr 
                      key={item.id} 
                      className={`hover:bg-[#F8F9FD]/50 transition-colors ${item.status === 'pending' ? 'bg-[#FEF3C7]/10' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <p className="text-[14px] font-semibold text-[#1E1548]">
                          {item.studentName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {item.type === 'cv' ? (
                            <>
                              <FileText className="w-4 h-4 text-[#FFD600]" />
                              <span className="text-[14px] text-[#1E1548]">CV</span>
                            </>
                          ) : (
                            <>
                              <Linkedin className="w-4 h-4 text-[#0077B5]" />
                              <span className="text-[14px] text-[#1E1548]">LinkedIn</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium ${statusConfig[item.status].color}`}>
                          <span>{statusConfig[item.status].icon}</span>
                          {statusConfig[item.status].label}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-[14px] text-[#6B7280]">
                          {new Date(item.submittedDate).toLocaleDateString('fr-FR')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="h-10 px-4 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] font-semibold hover:bg-[#FDC700] transition-colors"
                        >
                          Réviser
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-[16px] p-8 max-w-[700px] w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-[24px] font-bold text-[#1E1548] mb-1">
                    Révision {selectedItem.type === 'cv' ? 'CV' : 'LinkedIn'}
                  </h3>
                  <p className="text-[14px] text-[#6B7280]">
                    {selectedItem.studentName} • {new Date(selectedItem.submittedDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F8F9FD] transition-colors"
                >
                  <X className="w-5 h-5 text-[#6B7280]" />
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6 mb-6">
                {/* CV Section */}
                {selectedItem.type === 'cv' && selectedItem.cvUrl && (
                  <div className="bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
                    <h4 className="text-[16px] font-semibold text-[#1E1548] mb-4">
                      Document CV
                    </h4>
                    <div className="flex items-center justify-between p-4 bg-white rounded-[12px]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#E8ECFF] rounded-full flex items-center justify-center">
                          <FileText className="w-6 h-6 text-[#FFD600]" />
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-[#1E1548]">
                            CV de {selectedItem.studentName}
                          </p>
                          <p className="text-[12px] text-[#6B7280]">PDF</p>
                        </div>
                      </div>
                      <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8ECFF] transition-colors">
                        <Download className="w-5 h-5 text-[#FFD600]" />
                      </button>
                    </div>
                  </div>
                )}

                {/* LinkedIn Section */}
                {selectedItem.type === 'linkedin' && selectedItem.linkedinUrl && (
                  <div className="bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
                    <h4 className="text-[16px] font-semibold text-[#1E1548] mb-4">
                      Profil LinkedIn
                    </h4>
                    <a
                      href={selectedItem.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 bg-white rounded-[12px] hover:bg-[#E8ECFF] transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#E8ECFF] rounded-full flex items-center justify-center">
                          <Linkedin className="w-6 h-6 text-[#0077B5]" />
                        </div>
                        <div>
                          <p className="text-[14px] font-medium text-[#1E1548] group-hover:text-[#FFD600]">
                            Voir le profil LinkedIn
                          </p>
                          <p className="text-[12px] text-[#6B7280]">
                            {selectedItem.linkedinUrl}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-[#6B7280] group-hover:text-[#FFD600]" />
                    </a>
                  </div>
                )}

                {/* Comment Section */}
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">
                    Commentaire pour l'étudiant
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ajoute tes remarques et suggestions..."
                    className="w-full h-32 p-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>

                {/* Previous Comment */}
                {selectedItem.adminComment && (
                  <div className="bg-[#E8ECFF] border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4">
                    <p className="text-[12px] font-semibold text-[#1E1548] mb-1">
                      Commentaire précédent :
                    </p>
                    <p className="text-[14px] text-[#1E1548]">
                      {selectedItem.adminComment}
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleValidate(selectedItem.id, 'revision')}
                  className="flex-1 h-12 bg-white border-2 border-[#EF4444] text-[#EF4444] rounded-[12px] text-[16px] font-semibold hover:bg-[#FEE2E2] transition-colors"
                >
                  Demander corrections
                </button>
                <button
                  onClick={() => handleValidate(selectedItem.id, 'approved')}
                  className="flex-1 h-12 bg-[#10B981] text-white rounded-[12px] text-[16px] font-semibold hover:bg-[#059669] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  Valider
                </button>
              </div>

              <p className="text-[12px] text-[#6B7280] text-center mt-4">
                💡 L'étudiant recevra une notification par email et dans l'app
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
