import { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, Send, CheckCircle2, AlertTriangle, MessageSquare, ExternalLink, User, Loader2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAuth } from '../../hooks/useAuth';
import { prospectingService, notesService } from '../../services/supabase';
import type { ProspectingEntryWithStudent } from '../../services/supabase';

const STATUS_LABEL: Record<string, string> = {
  to_apply:  'À candidater',
  applied:   'Candidature envoyée',
  interview: 'Entretien',
  offer:     'Offre reçue',
  rejected:  'Refusé',
  accepted:  'Accepté',
};

export function AdminOfferSupportPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ProspectingEntryWithStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [resolving, setResolving] = useState<string | null>(null);

  useEffect(() => {
    prospectingService.getNeedingHelp()
      .then(data => { setEntries(data); setLoadError(null); })
      .catch(err => setLoadError(err?.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, []);

  const selectedEntry = entries.find(e => e.id === selectedId);

  const handleResolve = async (entryId: string) => {
    setResolving(entryId);
    try {
      await prospectingService.toggleNeedsHelp(entryId, false);
      setEntries(prev => prev.filter(e => e.id !== entryId));
    } catch {
      alert('Erreur lors de la mise à jour.');
    } finally {
      setResolving(null);
    }
  };

  const handleSendResponse = async () => {
    if (!selectedEntry || !user?.id || !responseMessage.trim()) return;
    setSending(true);
    try {
      const noteContent = `Candidature chez ${selectedEntry.companyName} — ${selectedEntry.positionTitle}\n\n${responseMessage.trim()}`;
      await notesService.addNote(selectedEntry.userId, user.id, noteContent);
      await prospectingService.toggleNeedsHelp(selectedEntry.id, false);
      setEntries(prev => prev.filter(e => e.id !== selectedEntry.id));
      setSelectedId(null);
      setResponseMessage('');
    } catch {
      alert('Erreur lors de l\'envoi.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.AdminDashboard.path}>
              <button className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0">
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1">
                Support candidatures
              </h1>
              <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                Étudiants ayant demandé de l'aide sur une candidature
              </p>
            </div>
            {entries.length > 0 && (
              <div className="flex-shrink-0 h-9 px-4 bg-[#FEF2F2] border border-[#EF4444]/30 text-[#EF4444] rounded-[8px] text-[13px] font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                {entries.length} en attente
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#FFD600] animate-spin" />
          </div>
        ) : loadError ? (
          <div className="bg-white border border-[#EF4444]/30 rounded-[16px] p-6 text-center">
            <p className="text-[14px] font-semibold text-[#EF4444] mb-1">Erreur de chargement</p>
            <p className="text-[13px] text-[#6B7280]">{loadError}</p>
          </div>
        ) : entries.length === 0 ? (
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
            <div className="w-16 h-16 bg-[#F0FDF4] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#10B981]" />
            </div>
            <h3 className="text-[18px] font-bold text-[#1E1548] mb-2">Tout est traité</h3>
            <p className="text-[14px] text-[#6B7280]">Aucune demande d'aide en attente.</p>
          </div>
        ) : (
          entries.map(entry => (
            <div key={entry.id}
              className="bg-white border-2 border-[#FFD600]/40 rounded-[16px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(255,214,0,0.08)]">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4CC] text-[#B45309] text-[12px] font-semibold">
                      <AlertTriangle className="w-3.5 h-3.5" /> Demande d'aide
                    </span>
                    <span className="text-[12px] text-[#6B7280] px-2.5 py-1 bg-[#F3F4F6] rounded-full">
                      {STATUS_LABEL[entry.status] ?? entry.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#1E1548] rounded-[8px] flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-[15px] font-bold text-[#1E1548]">{entry.studentName}</p>
                      <p className="text-[12px] text-[#6B7280]">{entry.studentEmail}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-[#F8F9FD] rounded-[10px]">
                    <div className="w-8 h-8 bg-[#E8ECFF] rounded-[8px] flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-[#1E1548]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#1E1548] truncate">{entry.positionTitle}</p>
                      <p className="text-[12px] text-[#6B7280]">{entry.companyName}</p>
                    </div>
                    {entry.offerUrl && (
                      <a href={entry.offerUrl} target="_blank" rel="noopener noreferrer"
                        className="ml-auto flex-shrink-0 text-[#6B7280] hover:text-[#1E1548] transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  {entry.notes && (
                    <div className="p-3 bg-[#E8ECFF] border border-[#1E1548]/10 rounded-[10px]">
                      <p className="text-[12px] font-semibold text-[#6B7280] mb-1">Note de l'étudiant</p>
                      <p className="text-[13px] text-[#1E1548] leading-[20px]">{entry.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex sm:flex-col gap-2 flex-shrink-0">
                  <button
                    onClick={() => { setSelectedId(entry.id); setResponseMessage(''); }}
                    className="flex-1 sm:flex-none h-9 px-4 bg-[#1E1548] text-white rounded-[8px] text-[13px] font-semibold hover:bg-[#2D2166] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" /> Répondre
                  </button>
                  <button
                    onClick={() => handleResolve(entry.id)}
                    disabled={resolving === entry.id}
                    className="flex-1 sm:flex-none h-9 px-4 bg-[#F0FDF4] border border-[#10B981]/30 text-[#10B981] rounded-[8px] text-[13px] font-semibold hover:bg-[#DCFCE7] transition-colors flex items-center justify-center gap-1.5 disabled:opacity-60"
                  >
                    {resolving === entry.id
                      ? <Loader2 className="w-4 h-4 animate-spin" />
                      : <><CheckCircle2 className="w-4 h-4" /> Résolu</>}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Response modal */}
      {selectedId && selectedEntry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(30,21,72,0.08)]">
              <h2 className="text-[18px] font-bold text-[#1E1548]">
                Répondre à {selectedEntry.studentName}
              </h2>
              <button onClick={() => setSelectedId(null)}
                className="w-8 h-8 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center">
                <X className="w-5 h-5 text-[#1E1548]" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="p-3 bg-[#F8F9FD] rounded-[10px]">
                <p className="text-[13px] font-semibold text-[#1E1548]">{selectedEntry.positionTitle}</p>
                <p className="text-[12px] text-[#6B7280]">{selectedEntry.companyName}</p>
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1E1548] mb-1.5">
                  Votre message (visible dans le dashboard de l'étudiant)
                </label>
                <textarea
                  value={responseMessage}
                  onChange={e => setResponseMessage(e.target.value)}
                  rows={5}
                  placeholder="Rédige un conseil personnalisé…"
                  className="w-full px-4 py-3 border-2 border-[rgba(30,21,72,0.10)] rounded-[10px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] resize-y"
                />
              </div>

              <div className="bg-[#FFF4CC] rounded-[10px] p-3">
                <p className="text-[12px] font-semibold text-[#B45309] mb-2">Suggestions rapides</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Adapte ta lettre de motivation',
                    'Relance après 2 semaines',
                    'Postule même sans toutes les compétences',
                    'Mets en avant ta motivation',
                  ].map(s => (
                    <button key={s}
                      onClick={() => setResponseMessage(prev => prev + (prev ? ' ' : '') + s + '. ')}
                      className="px-2.5 py-1 bg-white border border-[#B45309]/30 text-[#B45309] rounded-[6px] text-[12px] font-medium hover:bg-[#FFF4CC] transition-colors">
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 px-6 py-4 border-t border-[rgba(30,21,72,0.08)]">
              <button onClick={() => setSelectedId(null)}
                className="flex-1 h-10 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[14px] font-semibold hover:bg-[#F8F9FD]">
                Annuler
              </button>
              <button onClick={handleSendResponse} disabled={!responseMessage.trim() || sending}
                className="flex-1 h-10 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] flex items-center justify-center gap-2 disabled:opacity-60">
                {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer</>}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
