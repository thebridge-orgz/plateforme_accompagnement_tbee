import { ArrowLeft, Briefcase, Send, CheckCircle2, Clock, AlertTriangle, MessageSquare, ExternalLink, User } from 'lucide-react';
import { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

export function AdminOfferSupportPage() {
  const { offerTrackings, updateOfferTracking } = useAdminData();

  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'needsHelp' | 'resolved'>('needsHelp');
  const [responseMessage, setResponseMessage] = useState<string>('');

  const filteredSupports = filter === 'all'
    ? offerTrackings
    : filter === 'needsHelp'
      ? offerTrackings.filter(o => o.needsHelp)
      : offerTrackings.filter(o => !o.needsHelp);

  const needsHelpCount = offerTrackings.filter(o => o.needsHelp).length;

  const selectedSupportData = offerTrackings.find(o => o.id === selectedSupport);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4CC] text-[#1E1548] text-[12px] font-semibold">
            <AlertTriangle className="w-3.5 h-3.5" />
            En attente
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8ECFF] text-[#1E1548] text-[12px] font-semibold">
            <Clock className="w-3.5 h-3.5" />
            En cours
          </span>
        );
      case 'resolved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#10B981] text-[12px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Résolu
          </span>
        );
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="px-2 py-0.5 bg-[#FEF2F2] text-[#EF4444] text-[10px] font-bold rounded">
            URGENT
          </span>
        );
      case 'medium':
        return (
          <span className="px-2 py-0.5 bg-[#FFF4CC] text-[#1E1548] text-[10px] font-bold rounded">
            MOYEN
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 bg-[#F0FDF4] text-[#10B981] text-[10px] font-bold rounded">
            FAIBLE
          </span>
        );
      default:
        return null;
    }
  };

  const handleSendResponse = (supportId: string) => {
    console.log(`Response sent to support ${supportId}`);
    alert('Réponse envoyée à l\'étudiant !');
    setSelectedSupport(null);
    setResponseMessage('');
    updateOfferTracking(supportId, { needsHelp: false });
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
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
                Aide au suivi des offres
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Accompagnez les étudiants dans leur recherche d'alternance
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 sm:pt-20 sm:pb-8 lg:pt-8 lg:pb-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all ${filter === 'all'
                ? 'bg-[#1E1548] text-white'
                : 'bg-white border border-[rgba(30,21,72,0.08)] text-[#1E1548] hover:bg-[#F8F9FD]'
                }`}
            >
              Toutes ({offerTrackings.length})
            </button>
            <button
              onClick={() => setFilter('needsHelp')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all flex items-center gap-2 ${filter === 'needsHelp'
                ? 'bg-[#FFD600] text-[#1E1548]'
                : 'bg-white border border-[rgba(30,21,72,0.08)] text-[#1E1548] hover:bg-[#F8F9FD]'
                }`}
            >
              En attente
              {needsHelpCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center">
                  {needsHelpCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all ${filter === 'resolved'
                ? 'bg-[#10B981] text-white'
                : 'bg-white border border-[rgba(30,21,72,0.08)] text-[#1E1548] hover:bg-[#F8F9FD]'
                }`}
            >
              Résolues
            </button>
          </div>
        </div>

        {/* Support Requests List */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {filteredSupports.length === 0 ? (
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
              <Briefcase className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
              <p className="text-[16px] text-[#6B7280]">Aucune demande d'aide trouvée</p>
            </div>
          ) : (
            filteredSupports.map((support) => (
              <div
                key={support.id}
                className={`bg-white border-2 rounded-[16px] p-4 sm:p-6 transition-all ${support.needsHelp
                  ? 'border-[#FFD600] shadow-[0_2px_8px_rgba(255,214,0,0.1)]'
                  : 'border-[rgba(30,21,72,0.08)] shadow-[0_2px_8px_rgba(30,21,72,0.04)]'
                  } hover:shadow-[0_6px_20px_rgba(30,21,72,0.1)]`}
              >
                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-2">
                      {support.studentName}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      {support.needsHelp ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4CC] text-[#1E1548] text-[12px] font-semibold">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          Demande d'aide
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#10B981] text-[12px] font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Résolu
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#F8F9FD] rounded-[12px] p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-[10px] bg-[#E8ECFF] flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-[#1E1548]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[15px] sm:text-[16px] font-semibold text-[#1E1548] mb-1">
                          {support.position}
                        </h4>
                        <p className="text-[13px] text-[#6B7280]">
                          {support.company}
                        </p>
                      </div>
                    </div>
                  </div>

                  {support.helpRequest && (
                    <div className="bg-white border-2 border-[#E8ECFF] rounded-[12px] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-[#6B7280]" />
                        <p className="text-[12px] font-semibold text-[#6B7280]">
                          Demande d'aide
                        </p>
                      </div>
                      <p className="text-[13px] sm:text-[14px] text-[#1E1548] leading-[22px]">
                        {support.helpRequest}
                      </p>
                    </div>
                  )}

                  {support.notes && (
                    <div className="bg-[#E8ECFF] border-2 border-[#1E1548] rounded-[12px] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-[#1E1548]" />
                        <p className="text-[12px] font-semibold text-[#1E1548]">
                          Notes
                        </p>
                      </div>
                      <p className="text-[13px] sm:text-[14px] text-[#1E1548] leading-[22px]">
                        {support.notes}
                      </p>
                    </div>
                  )}

                  {support.needsHelp && (
                    <button
                      onClick={() => setSelectedSupport(support.id)}
                      className="w-full h-10 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-all flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Répondre
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Response Modal */}
        {selectedSupport && selectedSupportData && selectedSupportData.needsHelp && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[16px] max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-[rgba(30,21,72,0.08)] p-4 sm:p-6 rounded-t-[16px]">
                <div className="flex items-center justify-between">
                  <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">
                    Répondre à {selectedSupportData.studentName}
                  </h2>
                  <button
                    onClick={() => setSelectedSupport(null)}
                    className="w-8 h-8 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* Context */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#1E1548] mb-2">
                    Offre concernée
                  </label>
                  <div className="bg-[#F8F9FD] rounded-[12px] p-4">
                    <p className="text-[15px] font-semibold text-[#1E1548] mb-1">
                      {selectedSupportData.position}
                    </p>
                    <p className="text-[13px] text-[#6B7280]">
                      {selectedSupportData.company}
                    </p>
                  </div>
                </div>

                {/* student Message */}
                {selectedSupportData.helpRequest && (
                  <div>
                    <label className="block text-[14px] font-semibold text-[#1E1548] mb-2">
                      Demande de l'étudiant
                    </label>
                    <div className="bg-[#E8ECFF] rounded-[12px] p-4 border border-[#1E1548]">
                      <p className="text-[14px] text-[#1E1548] leading-[22px]">
                        {selectedSupportData.helpRequest}
                      </p>
                    </div>
                  </div>
                )}

                {/* Response Input */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#1E1548] mb-2">
                    Votre réponse
                  </label>
                  <textarea
                    value={responseMessage}
                    onChange={(e) => setResponseMessage(e.target.value)}
                    placeholder="Rédige une réponse personnalisée et encourageante..."
                    className="w-full h-40 px-4 py-3 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] resize-none"
                  />
                </div>

                {/* Quick Responses */}
                <div className="bg-[#FFF4CC] rounded-[12px] p-4">
                  <p className="text-[13px] font-semibold text-[#1E1548] mb-2">
                    💡 Réponses rapides
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Adapte ta lettre de motivation',
                      'Mets en avant tes compétences',
                      'Relance après 2 semaines',
                      'Postule même sans toutes les compétences',
                      'Montre ta motivation'
                    ].map((quickResponse) => (
                      <button
                        key={quickResponse}
                        onClick={() => setResponseMessage(prev => prev + (prev ? ' ' : '') + quickResponse + '. ')}
                        className="px-3 py-1.5 bg-white border border-[#1E1548] text-[#1E1548] rounded-[8px] text-[12px] font-medium hover:bg-[#1E1548] hover:text-white transition-all"
                      >
                        + {quickResponse}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setSelectedSupport(null)}
                    className="flex-1 h-12 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[12px] text-[16px] font-semibold hover:bg-[#F8F9FD] transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => handleSendResponse(selectedSupport)}
                    disabled={!responseMessage}
                    className="flex-1 h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Envoyer la réponse
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}