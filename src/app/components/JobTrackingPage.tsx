import { useState, useEffect } from 'react';
import { Building2, Calendar, ChevronLeft, ChevronRight, ExternalLink, Plus, Search, AlertCircle, Pencil, ArrowLeft } from 'lucide-react';
import type { TrackedOffer } from '../../types'
import { useOffers } from '../../hooks/useOffers'
import { Link } from 'react-router-dom';
import { routes } from '../../app/router/routes';

const statusConfig = {
  interested: { label: 'À contacter', color: 'bg-[#E8ECFF] text-[#1E1548]' },
  applied: { label: 'Candidature envoyée', color: 'bg-[#FEF3C7] text-[#92400E]' },
  interview_scheduled: { label: 'Entretien prévu', color: 'bg-[#DBEAFE] text-[#1E40AF]' },
  interview_done: { label: 'Entretien passé', color: 'bg-[#D1FAE5] text-[#065F46]' },
  offer_received: { label: 'Offre reçue', color: 'bg-[#D1FAE5] text-[#065F46]' },
  accepted: { label: 'Accepté', color: 'bg-[#10B981] text-white' },
  rejected: { label: 'Refusé', color: 'bg-[#FEE2E2] text-[#991B1B]' },
  withdrawn: { label: 'Retiré', color: 'bg-[#F3F4F6] text-[#6B7280]' }
} as const;

export function JobTrackingPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const { offers, canAddMore, addOffer, removeOffer, updateOffer, MAX_TRACKED_OFFERS } = useOffers();

  // New offer form state
  const [newOffer, setNewOffer] = useState({
    offerId: '',
    applicationStatus: 'interested' as const,
    userNotes: '',
    applicationDate: null as string | null,
    interviewDate: null as string | null,
    reminderDate: null as string | null,
    companyName: '',
    positionTitle: '',
    offerUrl: ''
  });

  // Filter offers
  const filteredOffers = offers.filter(offer => {
    const matchesSearch =
      searchQuery === '' ||
      offer.userNotes?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || offer.applicationStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredOffers.length / itemsPerPage);
  const paginatedOffers = filteredOffers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const [formError, setFormError] = useState<string | null>(null);

  // Edit modal state
  const [editingOffer, setEditingOffer] = useState<TrackedOffer | null>(null);
  const [editForm, setEditForm] = useState({
    companyName: '',
    positionTitle: '',
    offerUrl: '',
    userNotes: '',
    applicationStatus: 'interested' as TrackedOffer['applicationStatus'],
  });
  const [editError, setEditError] = useState<string | null>(null);

  const isValidUrl = (url: string) => {
    try { new URL(url); return true; } catch { return false; }
  };

  const handleAddOffer = async () => {
    setFormError(null);

    if (!canAddMore) {
      setFormError(`Tu as atteint la limite de ${MAX_TRACKED_OFFERS} offres.`);
      return;
    }

    // TODO: Valider que companyName, positionTitle et offerUrl sont remplis
    // TODO: Créer l'offre dans job_offers d'abord, puis la tracker
    if (newOffer.companyName && newOffer.positionTitle && newOffer.offerUrl) {
      try {
        addOffer({
          applicationStatus: newOffer.applicationStatus,
          userNotes: newOffer.userNotes,
          applicationDate: newOffer.applicationDate,
          interviewDate: newOffer.interviewDate,
          reminderDate: newOffer.reminderDate,
          id: '',
          userId: '',
          companyName: newOffer.companyName,
          positionTitle: newOffer.positionTitle,
          offerUrl: newOffer.offerUrl,
          trackedAt: '',
          updatedAt: ''
        });

        // Reset form
        setNewOffer({
          offerId: '',
          applicationStatus: 'interested',
          userNotes: '',
          applicationDate: null,
          interviewDate: null,
          reminderDate: null,
          companyName: '',
          positionTitle: '',
          offerUrl: ''
        });
        setShowAddModal(false);
      } catch (error) {
        alert('Erreur lors de l\'ajout de l\'offre');
        console.error(error);
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  };

  const handleDeleteOffer = async (offerId: string) => {
    if (confirm('Supprimer cette offre ?')) {
      try {
        removeOffer(offerId);
      } catch (error) {
        alert('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  const handleUpdateStatus = async (offerId: string, newStatus: TrackedOffer['applicationStatus']) => {
    try {
      const updates: Partial<TrackedOffer> = {
        applicationStatus: newStatus
      };

      // Si passage à "applied", mettre la date de candidature
      if (newStatus === 'applied' && !offers.find(offer => offer.id === offerId)?.applicationDate) {
        updates.applicationDate = new Date().toISOString().split('T')[0];
      }

      updateOffer(offerId, updates);
    } catch (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    }
  };

  const handleOpenEdit = (offer: TrackedOffer) => {
    setEditingOffer(offer);
    setEditForm({
      companyName: offer.companyName || '',
      positionTitle: offer.positionTitle || '',
      offerUrl: offer.offerUrl || '',
      userNotes: offer.userNotes || '',
      applicationStatus: offer.applicationStatus,
    });
    setEditError(null);
  };

  const handleSaveEdit = async () => {
    if (!editingOffer) return;
    setEditError(null);

    if (!editForm.companyName.trim()) { setEditError('Le nom de l\'entreprise est obligatoire.'); return; }
    if (!editForm.positionTitle.trim()) { setEditError('L\'intitulé du poste est obligatoire.'); return; }
    if (!editForm.offerUrl.trim()) { setEditError('L\'URL de l\'offre est obligatoire.'); return; }
    if (!isValidUrl(editForm.offerUrl)) { setEditError('L\'URL saisie n\'est pas valide (ex: https://...).'); return; }

    try {
      updateOffer(editingOffer.id, {
        companyName: editForm.companyName.trim(),
        positionTitle: editForm.positionTitle.trim(),
        offerUrl: editForm.offerUrl.trim(),
        userNotes: editForm.userNotes.trim() || null,
        applicationStatus: editForm.applicationStatus,
      } as Partial<TrackedOffer>);
      setEditingOffer(null);
    } catch (error) {
      setEditError('Erreur lors de la modification. Réessaie.');
      console.error(error);
    }
  };

  const handleRequestSupport = (offerId: string) => {
    // TODO: Créer une notification/message pour l'admin
    alert('✅ Demande de support envoyée à l\'équipe Admission ! Ils reviendront vers toi rapidement.');
  };

  const remainingSlots = MAX_TRACKED_OFFERS - offers.length;

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">

      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.StudentDashboard.path}>
              <button
                className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>

            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Suivi des offres
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Garde une trace de tes {MAX_TRACKED_OFFERS} offres les plus pertinentes
              </p>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              disabled={!canAddMore}
              className={`
                flex-shrink-0 h-10 sm:h-12 px-4 sm:px-6 rounded-[12px] text-[14px] sm:text-[16px] font-semibold transition-all
                flex items-center gap-2
                ${canAddMore
                  ? 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'
                  : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                }
              `}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Ajouter une offre</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8">

        {!canAddMore && (
          <div className="bg-[#FEE2E2] border border-[#EF4444] rounded-[16px] p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="text-xl sm:text-2xl">⚠️</div>
              <div className="flex-1">
                <h4 className="text-base sm:text-[18px] font-semibold text-[#EF4444] mb-2">
                  Limite atteinte
                </h4>
                <p className="text-sm sm:text-[14px] font-normal leading-[20px] text-[#1E1548]/80 mb-2">
                  Tu as atteint la limite de {MAX_TRACKED_OFFERS} offres. Supprime une offre existante pour en ajouter une nouvelle.
                </p>
              </div>
            </div>
          </div>
        )}


        <div className="bg-[#E8ECFF] border border-[#1E1548]/10 rounded-[16px] p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="text-xl sm:text-2xl">💡</div>
            <div className="flex-1">
              <h4 className="text-base sm:text-[18px] font-semibold text-[#1E1548] mb-2">
                Pourquoi seulement {MAX_TRACKED_OFFERS} offres ?
              </h4>
              <p className="text-sm sm:text-[14px] font-normal leading-[20px] text-[#1E1548]/80 mb-2">
                Concentrer tes efforts sur un nombre restreint d'offres vraiment pertinentes maximise tes chances de succès.
                L'équipe Admission pourra aussi mieux t'accompagner sur ces candidatures ciblées.
              </p>
              <div className="flex items-center gap-2 text-sm sm:text-[14px] font-medium text-[#1E1548]">
                <span>Places restantes : {remainingSlots}/{MAX_TRACKED_OFFERS}</span>
              </div>
            </div>
          </div>
        </div>

        {offers.length > 0 && (
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Rechercher par entreprise ou poste..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                />
              </div>


              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
              >
                <option value="all">Tous les statuts</option>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}


        <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] overflow-hidden mb-6">
          {paginatedOffers.length === 0 && offers.length === 0 ? (
            // Empty state - no offers at all
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-[#FFD600]" />
              </div>
              <h4 className="text-[18px] font-semibold text-[#1E1548] mb-2">
                Aucune offre pour le moment
              </h4>
              <p className="text-[14px] text-[#6B7280] mb-4">
                Commence à suivre tes candidatures pour mieux organiser ta recherche
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="h-12 px-6 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-colors"
              >
                Ajouter ma première offre
              </button>
            </div>
          ) : paginatedOffers.length === 0 ? (
            // Empty state - no results from filter
            <div className="p-12 text-center">
              <p className="text-[14px] text-[#6B7280]">
                Aucune offre ne correspond à tes critères de recherche
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#F8F9FD] border-b border-[rgba(30,21,72,0.1)]">
                    <tr>
                      <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                        Offre
                      </th>
                      <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                        Statut
                      </th>
                      <th className="px-6 py-4 text-left text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                        Date d'ajout
                      </th>
                      <th className="px-6 py-4 text-right text-[12px] font-semibold text-[#6B7280] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[rgba(30,21,72,0.1)]">
                    {paginatedOffers.map((offer) => (
                      <tr key={offer.id} className="hover:bg-[#F8F9FD]/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-[14px] font-semibold text-[#1E1548] mb-0.5">
                              {offer.companyName || 'Entreprise inconnue'}
                            </p>
                            <p className="text-[13px] text-[#6B7280]">
                              {offer.positionTitle || '—'}
                            </p>
                            {offer.offerUrl && (
                              <a
                                href={offer.offerUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[12px] text-[#1E1548] underline mt-1 hover:opacity-70"
                              >
                                <ExternalLink className="w-3 h-3" />
                                Voir l'offre
                              </a>
                            )}
                            {offer.userNotes && (
                              <p className="text-[12px] text-[#6B7280] mt-1 italic">
                                {offer.userNotes}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={offer.applicationStatus}
                            onChange={(e) => handleUpdateStatus(offer.id, e.target.value as TrackedOffer['applicationStatus'])}
                            className={`px-3 py-1.5 rounded-full text-[12px] font-medium border-0 focus:outline-none focus:ring-2 focus:ring-[#FFD600] `}//${statusConfig[offer.applicationStatus].color}
                          >
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <option key={key} value={key}>{config.label}</option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-[14px] text-[#6B7280]">
                            <Calendar className="w-4 h-4" />
                            {new Date(offer.trackedAt).toLocaleDateString('fr-FR')}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEdit(offer)}
                              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8ECFF] transition-colors"
                              title="Modifier"
                            >
                              <Pencil className="w-4 h-4 text-[#1E1548]" />
                            </button>
                            <button
                              onClick={() => handleDeleteOffer(offer.id)}
                              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#FEE2E2] transition-colors text-[#EF4444]"
                              title="Supprimer"
                            >
                              ✕
                            </button>
                            <button
                              onClick={() => handleRequestSupport(offer.id)}
                              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8ECFF] transition-colors"
                              title="Demander du support"
                            >
                              <AlertCircle className="w-4 h-4 text-[#6B7280]" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-[rgba(30,21,72,0.1)]">
                  <p className="text-[14px] text-[#6B7280]">
                    Page {currentPage} sur {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8ECFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#1E1548]" />
                    </button>
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8ECFF] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-5 h-5 text-[#1E1548]" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {editingOffer && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-[16px] p-8 max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-[24px] font-bold text-[#1E1548] mb-6">
                Modifier l'offre
              </h3>

              {editError && (
                <div className="bg-[#FEE2E2] border border-[#EF4444] rounded-[12px] px-4 py-3 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
                  <p className="text-[13px] text-[#EF4444]">{editError}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">URL de l'offre *</label>
                  <input
                    type="url"
                    value={editForm.offerUrl}
                    onChange={(e) => setEditForm({ ...editForm, offerUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">Entreprise *</label>
                  <input
                    type="text"
                    value={editForm.companyName}
                    onChange={(e) => setEditForm({ ...editForm, companyName: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">Intitulé du poste *</label>
                  <input
                    type="text"
                    value={editForm.positionTitle}
                    onChange={(e) => setEditForm({ ...editForm, positionTitle: e.target.value })}
                    placeholder="Ex: Développeur Full Stack"
                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">Statut</label>
                  <select
                    value={editForm.applicationStatus}
                    onChange={(e) => setEditForm({ ...editForm, applicationStatus: e.target.value as TrackedOffer['applicationStatus'] })}
                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  >
                    {Object.entries(statusConfig).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">Notes (optionnel)</label>
                  <textarea
                    value={editForm.userNotes}
                    onChange={(e) => setEditForm({ ...editForm, userNotes: e.target.value })}
                    placeholder="Ajoute des détails utiles..."
                    className="w-full h-24 p-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setEditingOffer(null)}
                  className="flex-1 h-12 bg-white border border-[rgba(30,21,72,0.1)] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#F8F9FD] transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="flex-1 h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-colors"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-[16px] p-8 max-w-[600px] w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-[24px] font-bold text-[#1E1548] mb-6">
                Ajouter une offre
              </h3>

              {formError && (
                <div className="bg-[#FEE2E2] border border-[#EF4444] rounded-[12px] px-4 py-3 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0" />
                  <p className="text-[13px] text-[#EF4444]">{formError}</p>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">
                    URL de l'offre *
                  </label>
                  <input
                    type="url"
                    value={newOffer.offerUrl}
                    onChange={(e) => setNewOffer({ ...newOffer, offerUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">
                    Entreprise *
                  </label>
                  <input
                    type="text"
                    value={newOffer.companyName}
                    onChange={(e) => setNewOffer({ ...newOffer, companyName: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">
                    Intitulé du poste *
                  </label>
                  <input
                    type="text"
                    value={newOffer.positionTitle}
                    onChange={(e) => setNewOffer({ ...newOffer, positionTitle: e.target.value })}
                    placeholder="Ex: Développeur Full Stack"
                    className="w-full h-12 px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-[#1E1548] mb-2">
                    Notes (optionnel)
                  </label>
                  <textarea
                    value={newOffer.userNotes}
                    onChange={(e) => setNewOffer({ ...newOffer, userNotes: e.target.value })}
                    placeholder="Ajoute des détails utiles..."
                    className="w-full h-24 p-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[14px] text-[#1E1548] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 h-12 bg-white border border-[rgba(30,21,72,0.1)] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#F8F9FD] transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleAddOffer}
                  className="flex-1 h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}