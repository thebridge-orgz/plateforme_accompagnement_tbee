import { ArrowLeft, FileText, Download, CheckCircle2, AlertCircle, Star, Send } from 'lucide-react';
import { useState } from 'react';
import { useAdminData } from '@/context/AdminDataContext';

interface AdminCVReviewPageProps {
  onNavigate: (page: string) => void;
}

export function AdminCVReviewPage({ onNavigate }: AdminCVReviewPageProps) {
  const { cvSubmissions, reviewCV } = useAdminData();
  
  const [selectedCVId, setSelectedCVId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'needs_revision'>('pending');
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [reviewFeedback, setReviewFeedback] = useState<string>('');
  const [reviewStatus, setReviewStatus] = useState<'approved' | 'needs_revision'>('approved');

  const filteredCVs = cvSubmissions.filter(cv => {
    if (filter === 'all') return true;
    return cv.status === filter;
  });

  const selectedCV = cvSubmissions.find(cv => cv.id === selectedCVId);

  const handleSubmitReview = () => {
    if (!selectedCVId) return;
    
    if (!reviewFeedback.trim()) {
      alert('Veuillez entrer un feedback avant de valider');
      return;
    }
    
    if (reviewScore === 0) {
      alert('Veuillez attribuer une note avant de valider');
      return;
    }

    reviewCV(selectedCVId, reviewStatus, reviewFeedback, reviewScore);
    alert('CV évalué avec succès !');
    
    setSelectedCVId(null);
    setReviewScore(0);
    setReviewFeedback('');
    setReviewStatus('approved');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 sm:pt-20 sm:pb-8 lg:pt-8 lg:pb-8">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className="flex items-center gap-2 text-[#1E1548] hover:text-[#FFD600] transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[14px] sm:text-[16px] font-medium">Retour au tableau de bord</span>
          </button>
          <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#1E1548] mb-2">
            Validation des CVs
          </h1>
          <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
            {filteredCVs.length} CV{filteredCVs.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all ${
                filter === 'all'
                  ? 'bg-[#1E1548] text-white'
                  : 'bg-[#F8F9FD] text-[#6B7280] hover:bg-[#E8ECFF]'
              }`}
            >
              Tous ({cvSubmissions.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all ${
                filter === 'pending'
                  ? 'bg-[#FFD600] text-[#1E1548]'
                  : 'bg-[#F8F9FD] text-[#6B7280] hover:bg-[#E8ECFF]'
              }`}
            >
              En attente ({cvSubmissions.filter(cv => cv.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all ${
                filter === 'approved'
                  ? 'bg-[#10B981] text-white'
                  : 'bg-[#F8F9FD] text-[#6B7280] hover:bg-[#E8ECFF]'
              }`}
            >
              Validés ({cvSubmissions.filter(cv => cv.status === 'approved').length})
            </button>
            <button
              onClick={() => setFilter('needs_revision')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all ${
                filter === 'needs_revision'
                  ? 'bg-[#EF4444] text-white'
                  : 'bg-[#F8F9FD] text-[#6B7280] hover:bg-[#E8ECFF]'
              }`}
            >
              À réviser ({cvSubmissions.filter(cv => cv.status === 'needs_revision').length})
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            {filteredCVs.length === 0 ? (
              <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-8 text-center">
                <FileText className="w-12 h-12 text-[#6B7280] mx-auto mb-3" />
                <p className="text-[#6B7280]">Aucun CV trouvé</p>
              </div>
            ) : (
              filteredCVs.map((cv) => (
                <button
                  key={cv.id}
                  onClick={() => {
                    setSelectedCVId(cv.id);
                    if (cv.status === 'pending') {
                      setReviewScore(0);
                      setReviewFeedback('');
                    } else {
                      setReviewScore(cv.score || 0);
                      setReviewFeedback(cv.feedback || '');
                    }
                  }}
                  className={`w-full bg-white border-2 rounded-[16px] p-4 text-left transition-all hover:shadow-lg ${
                    selectedCVId === cv.id
                      ? 'border-[#FFD600] shadow-lg'
                      : 'border-[rgba(30,21,72,0.08)] hover:border-[#E8ECFF]'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-[15px] font-bold text-[#1E1548] mb-1">{cv.candidateName}</p>
                      <p className="text-[13px] text-[#6B7280]">{cv.fileName}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-[6px] text-[11px] font-semibold flex-shrink-0 ${
                        cv.status === 'pending'
                          ? 'bg-[#FFF4CC] text-[#1E1548]'
                          : cv.status === 'approved'
                          ? 'bg-[#F0FDF4] text-[#10B981]'
                          : 'bg-[#FEF2F2] text-[#EF4444]'
                      }`}
                    >
                      {cv.status === 'pending' ? 'En attente' : cv.status === 'approved' ? 'Validé' : 'À réviser'}
                    </span>
                  </div>
                  {cv.score && (
                    <div className="flex items-center gap-1 text-[12px]">
                      <Star className="w-3 h-3 text-[#FFD600]" />
                      <span className="font-medium">{cv.score}/100</span>
                    </div>
                  )}
                </button>
              ))
            )}
          </div>

          <div className="lg:col-span-2">
            {!selectedCV ? (
              <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
                <h3 className="text-[20px] font-bold text-[#1E1548] mb-2">Sélectionnez un CV</h3>
                <p className="text-[14px] text-[#6B7280]">Choisissez un CV dans la liste pour le visualiser et le corriger</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[18px] font-bold text-[#1E1548]">Document CV</h3>
                    <button
                      onClick={() => alert('Téléchargement du CV : ' + selectedCV.fileName)}
                      className="flex items-center gap-2 px-4 py-2 bg-[#E8ECFF] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FFD600] transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>
                  <div className="bg-[#F8F9FD] rounded-[12px] p-8 text-center">
                    <FileText className="w-16 h-16 text-[#1E1548] mx-auto mb-3" />
                    <p className="text-[14px] font-medium text-[#1E1548] mb-2">{selectedCV.fileName}</p>
                    <p className="text-[13px] text-[#6B7280]">Cliquez sur Télécharger pour ouvrir le CV</p>
                  </div>
                </div>

                {selectedCV.status === 'pending' && (
                  <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
                    <h3 className="text-[18px] font-bold text-[#1E1548] mb-4">Évaluation du CV</h3>
                    
                    <div className="mb-6">
                      <label className="block text-[14px] font-medium text-[#1E1548] mb-3">
                        Note sur 100
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="5"
                          value={reviewScore}
                          onChange={(e) => setReviewScore(Number(e.target.value))}
                          className="flex-1 h-2 bg-[#E8ECFF] rounded-full outline-none"
                        />
                        <span className="text-[24px] font-bold text-[#1E1548] min-w-[80px] text-right">
                          {reviewScore}/100
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-6 h-6 ${
                              reviewScore >= (i + 1) * 20 ? 'text-[#FFD600] fill-[#FFD600]' : 'text-[#E8ECFF]'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[14px] font-medium text-[#1E1548] mb-3">
                        Décision
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setReviewStatus('approved')}
                          className={`h-12 rounded-[12px] text-[14px] font-semibold transition-all flex items-center justify-center gap-2 ${
                            reviewStatus === 'approved'
                              ? 'bg-[#10B981] text-white'
                              : 'bg-[#F8F9FD] text-[#6B7280] hover:bg-[#F0FDF4]'
                          }`}
                        >
                          <CheckCircle2 className="w-5 h-5" />
                          Valider
                        </button>
                        <button
                          onClick={() => setReviewStatus('needs_revision')}
                          className={`h-12 rounded-[12px] text-[14px] font-semibold transition-all flex items-center justify-center gap-2 ${
                            reviewStatus === 'needs_revision'
                              ? 'bg-[#EF4444] text-white'
                              : 'bg-[#F8F9FD] text-[#6B7280] hover:bg-[#FEF2F2]'
                          }`}
                        >
                          <AlertCircle className="w-5 h-5" />
                          Demander révision
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-[14px] font-medium text-[#1E1548] mb-3">
                        Feedback personnalisé
                      </label>
                      <textarea
                        value={reviewFeedback}
                        onChange={(e) => setReviewFeedback(e.target.value)}
                        rows={6}
                        placeholder="Donnez des conseils personnalisés au candidat..."
                        className="w-full px-4 py-3 bg-[#F8F9FD] border border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#FFD600] resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedCVId(null);
                          setReviewScore(0);
                          setReviewFeedback('');
                        }}
                        className="h-12 px-6 bg-[#F8F9FD] text-[#1E1548] rounded-[12px] text-[14px] font-semibold hover:bg-[#E8ECFF] transition-all"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleSubmitReview}
                        className="h-12 px-6 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] font-semibold hover:bg-[#FDC700] transition-all flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Envoyer
                      </button>
                    </div>
                  </div>
                )}

                {selectedCV.status !== 'pending' && selectedCV.feedback && (
                  <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-[18px] font-bold text-[#1E1548]">Évaluation effectuée</h3>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#FFD600] fill-[#FFD600]" />
                        <span className="text-[20px] font-bold text-[#1E1548]">{selectedCV.score}/100</span>
                      </div>
                    </div>
                    <div className="bg-[#F8F9FD] rounded-[12px] p-4">
                      <p className="text-[14px] text-[#1E1548] leading-relaxed">{selectedCV.feedback}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}