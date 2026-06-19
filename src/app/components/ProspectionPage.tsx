import { useState, useEffect } from 'react';
import { ArrowLeft, Plus, X, Pencil, Trash2, ExternalLink, Briefcase, Trophy, Target, TrendingUp, Loader2, ClipboardList, Send, Users, CheckCircle2, XCircle, Search, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAuth } from '../../hooks/useAuth';
import { prospectingService } from '../../services/supabase';
import type { ProspectingEntry, ProspectingStatus, CreateProspectingEntry } from '../../services/supabase';

// ── Status config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ProspectingStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  to_apply:  { label: 'À candidater',        color: 'text-[#6B7280]', bg: 'bg-[#F3F4F6]',  icon: <ClipboardList className="w-3.5 h-3.5" /> },
  applied:   { label: 'Candidature envoyée', color: 'text-[#1E1548]', bg: 'bg-[#E8ECFF]',  icon: <Send className="w-3.5 h-3.5" /> },
  interview: { label: 'Entretien',           color: 'text-[#B45309]', bg: 'bg-[#FFF4CC]',  icon: <Users className="w-3.5 h-3.5" /> },
  offer:     { label: 'Offre reçue',         color: 'text-[#10B981]', bg: 'bg-[#F0FDF4]',  icon: <Target className="w-3.5 h-3.5" /> },
  rejected:  { label: 'Refusé',             color: 'text-[#EF4444]', bg: 'bg-[#FEF2F2]',  icon: <XCircle className="w-3.5 h-3.5" /> },
  accepted:  { label: 'Accepté',            color: 'text-[#10B981]', bg: 'bg-[#DCFCE7]',  icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
};

const STATUS_ORDER: ProspectingStatus[] = ['to_apply', 'applied', 'interview', 'offer', 'rejected', 'accepted'];

const EMPTY_FORM: CreateProspectingEntry = {
  companyName: '', positionTitle: '', status: 'to_apply',
  offerUrl: '', appliedAt: '', notes: '',
};

// ── EntryModal ────────────────────────────────────────────────────────────────

interface EntryModalProps {
  initial: CreateProspectingEntry;
  title: string;
  onSave: (data: CreateProspectingEntry) => Promise<void>;
  onClose: () => void;
}

function EntryModal({ initial, title, onSave, onClose }: EntryModalProps) {
  const [form, setForm] = useState<CreateProspectingEntry>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (field: keyof CreateProspectingEntry, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    if (!form.companyName.trim() || !form.positionTitle.trim()) {
      setError('L\'entreprise et le poste sont obligatoires.');
      return;
    }
    setSaving(true);
    setError(null);
    try {
      await onSave(form);
      onClose();
    } catch {
      setError('Erreur lors de la sauvegarde.');
    } finally {
      setSaving(false);
    }
  };

  const S = {
    input: 'w-full h-11 px-4 border-2 border-[rgba(30,21,72,0.10)] rounded-[10px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] transition-colors bg-white',
    label: 'block text-[13px] font-semibold text-[#1E1548] mb-1.5',
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[16px] shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(30,21,72,0.08)]">
          <h2 className="text-[18px] font-bold text-[#1E1548]">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center">
            <X className="w-5 h-5 text-[#1E1548]" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-1">
              <label className={S.label}>Entreprise <span className="text-red-500">*</span></label>
              <input className={S.input} placeholder="Ex : Apple, LVMH…" value={form.companyName}
                onChange={e => set('companyName', e.target.value)} />
            </div>
            <div className="col-span-2 sm:col-span-1">
              <label className={S.label}>Poste visé <span className="text-red-500">*</span></label>
              <input className={S.input} placeholder="Ex : Développeur Web" value={form.positionTitle}
                onChange={e => set('positionTitle', e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={S.label}>Statut</label>
              <select className={S.input + ' cursor-pointer'} value={form.status}
                onChange={e => set('status', e.target.value as ProspectingStatus)}>
                {STATUS_ORDER.map(s => (
                  <option key={s} value={s}>{STATUS_CONFIG[s].label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={S.label}>Date de candidature</label>
              <input type="date" className={S.input} value={form.appliedAt ?? ''}
                onChange={e => set('appliedAt', e.target.value)} />
            </div>
          </div>

          <div>
            <label className={S.label}>Lien de l'offre</label>
            <input className={S.input} placeholder="https://…" value={form.offerUrl ?? ''}
              onChange={e => set('offerUrl', e.target.value)} />
          </div>

          <div>
            <label className={S.label}>Notes</label>
            <textarea
              className="w-full px-4 py-3 border-2 border-[rgba(30,21,72,0.10)] rounded-[10px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] transition-colors resize-y bg-white"
              rows={3} placeholder="Contact RH, impressions, points à préparer…"
              value={form.notes ?? ''} onChange={e => set('notes', e.target.value)}
            />
          </div>

          {error && (
            <p className="text-[13px] text-red-500 bg-red-50 px-4 py-2.5 rounded-[8px]">{error}</p>
          )}
        </div>

        <div className="flex gap-3 justify-end px-6 py-4 border-t border-[rgba(30,21,72,0.08)]">
          <button onClick={onClose}
            className="h-10 px-5 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[14px] font-semibold hover:bg-[#F8F9FD] transition-colors">
            Annuler
          </button>
          <button onClick={handleSave} disabled={saving}
            className="h-10 px-5 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center gap-2 disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /> Enregistrer</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── ProspectionPage ───────────────────────────────────────────────────────────

export function ProspectionPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState<ProspectingEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<ProspectingStatus | 'all'>('all');
  const [modal, setModal] = useState<'create' | { entry: ProspectingEntry } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    prospectingService.getEntries(user.id)
      .then(setEntries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user?.id]);

  const handleCreate = async (data: CreateProspectingEntry) => {
    if (!user?.id) return;
    const created = await prospectingService.createEntry(user.id, data);
    setEntries(prev => [created, ...prev]);
  };

  const handleUpdate = async (entryId: string, data: CreateProspectingEntry) => {
    const updated = await prospectingService.updateEntry(entryId, data);
    setEntries(prev => prev.map(e => e.id === entryId ? updated : e));
  };

  const handleToggleHelp = async (entry: ProspectingEntry) => {
    try {
      const updated = await prospectingService.toggleNeedsHelp(entry.id, !entry.needsHelp);
      setEntries(prev => prev.map(e => e.id === entry.id ? updated : e));
    } catch {
      alert('Erreur lors de la mise à jour.');
    }
  };

  const handleDelete = async (entryId: string) => {
    setDeleting(true);
    try {
      await prospectingService.deleteEntry(entryId);
      setEntries(prev => prev.filter(e => e.id !== entryId));
      setConfirmDeleteId(null);
    } catch {
      alert('Erreur lors de la suppression.');
    } finally {
      setDeleting(false);
    }
  };

  const filtered = filterStatus === 'all' ? entries : entries.filter(e => e.status === filterStatus);

  const stats = {
    total:     entries.length,
    applied:   entries.filter(e => ['applied', 'interview', 'offer', 'accepted'].includes(e.status)).length,
    interview: entries.filter(e => ['interview', 'offer', 'accepted'].includes(e.status)).length,
    offer:     entries.filter(e => ['offer', 'accepted'].includes(e.status)).length,
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.StudentDashboard.path}>
              <button className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0">
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1">
                Mon Pokédex
              </h1>
              <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                Traque tes candidatures et capture ton alternance
              </p>
            </div>
            <button
              onClick={() => setModal('create')}
              className="flex-shrink-0 h-10 px-4 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Ajouter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 space-y-6">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Entreprises',    value: stats.total,     icon: <Briefcase className="w-5 h-5 text-[#1E1548]" />,  bg: 'bg-[#E8ECFF]' },
            { label: 'Candidatures',   value: stats.applied,   icon: <Target className="w-5 h-5 text-[#B45309]" />,     bg: 'bg-[#FFF4CC]' },
            { label: 'Entretiens',     value: stats.interview, icon: <TrendingUp className="w-5 h-5 text-[#10B981]" />, bg: 'bg-[#F0FDF4]' },
            { label: 'Offres reçues',  value: stats.offer,     icon: <Trophy className="w-5 h-5 text-[#FFD600]" />,     bg: 'bg-[#FFFDF0]' },
          ].map(({ label, value, icon, bg }) => (
            <div key={label} className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[14px] p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] sm:text-[13px] font-medium text-[#6B7280]">{label}</p>
                <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center`}>{icon}</div>
              </div>
              <p className="text-[26px] sm:text-[30px] font-bold text-[#1E1548]">{value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`h-8 px-3 rounded-[8px] text-[13px] font-semibold border-2 transition-all ${
              filterStatus === 'all'
                ? 'border-[#FFD600] bg-[#FFF4CC] text-[#1E1548]'
                : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#FFD600]/50'
            }`}
          >
            Tous ({entries.length})
          </button>
          {STATUS_ORDER.map(s => {
            const count = entries.filter(e => e.status === s).length;
            if (count === 0 && filterStatus !== s) return null;
            const cfg = STATUS_CONFIG[s];
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`h-8 px-3 rounded-[8px] text-[13px] font-semibold border-2 transition-all ${
                  filterStatus === s
                    ? `border-[#FFD600] ${cfg.bg} ${cfg.color}`
                    : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#FFD600]/50'
                }`}
              >
                <span className="flex items-center gap-1.5">{cfg.icon} {cfg.label} ({count})</span>
              </button>
            );
          })}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-10 h-10 text-[#FFD600] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
            <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#1E1548]" />
            </div>
            <h3 className="text-[18px] font-bold text-[#1E1548] mb-2">
              {entries.length === 0 ? 'Ton Pokédex est vide' : 'Aucune entrée pour ce filtre'}
            </h3>
            <p className="text-[14px] text-[#6B7280] mb-6">
              {entries.length === 0
                ? 'Commence à traquer tes candidatures pour capturer ton alternance !'
                : 'Essaie un autre filtre.'}
            </p>
            {entries.length === 0 && (
              <button
                onClick={() => setModal('create')}
                className="h-10 px-5 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center gap-2 mx-auto"
              >
                <Plus className="w-4 h-4" /> Ajouter ma première candidature
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(entry => {
              const cfg = STATUS_CONFIG[entry.status];
              const initials = entry.companyName.slice(0, 2).toUpperCase();
              return (
                <div key={entry.id} className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-5 hover:shadow-[0_4px_16px_rgba(30,21,72,0.08)] transition-shadow">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 bg-[#1E1548] rounded-[10px] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-[13px]">{initials}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[15px] font-bold text-[#1E1548] truncate">{entry.companyName}</p>
                        <p className="text-[13px] text-[#6B7280] truncate">{entry.positionTitle}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 flex-shrink-0">
                      <button
                        onClick={() => setModal({ entry })}
                        className="w-7 h-7 rounded-full hover:bg-[#E8ECFF] flex items-center justify-center text-[#6B7280] hover:text-[#1E1548] transition-colors"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(entry.id)}
                        className="w-7 h-7 rounded-full hover:bg-red-50 flex items-center justify-center text-[#6B7280] hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-full font-semibold ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon} {cfg.label}
                  </span>

                  {(entry.appliedAt || entry.offerUrl) && (
                    <div className="flex items-center gap-3 mt-3 text-[12px] text-[#6B7280]">
                      {entry.appliedAt && (
                        <span>📅 {new Date(entry.appliedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}</span>
                      )}
                      {entry.offerUrl && (
                        <a href={entry.offerUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-[#1E1548] transition-colors"
                          onClick={e => e.stopPropagation()}>
                          <ExternalLink className="w-3 h-3" /> Offre
                        </a>
                      )}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="mt-3 text-[12px] text-[#6B7280] line-clamp-2 leading-[18px]">{entry.notes}</p>
                  )}

                  <button
                    onClick={e => { e.stopPropagation(); handleToggleHelp(entry); }}
                    className={`mt-3 w-full h-8 rounded-[8px] text-[12px] font-semibold border-2 transition-all flex items-center justify-center gap-1.5 ${
                      entry.needsHelp
                        ? 'border-[#EF4444] bg-[#FEF2F2] text-[#EF4444] hover:bg-[#FEE2E2]'
                        : 'border-[rgba(30,21,72,0.10)] bg-white text-[#6B7280] hover:border-[#1E1548] hover:text-[#1E1548]'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    {entry.needsHelp ? 'Aide demandée — Annuler' : 'Demander de l\'aide'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      {modal === 'create' && (
        <EntryModal
          title="Nouvelle candidature"
          initial={EMPTY_FORM}
          onSave={handleCreate}
          onClose={() => setModal(null)}
        />
      )}
      {modal !== null && modal !== 'create' && (
        <EntryModal
          title="Modifier la candidature"
          initial={{
            companyName: modal.entry.companyName,
            positionTitle: modal.entry.positionTitle,
            status: modal.entry.status,
            offerUrl: modal.entry.offerUrl ?? '',
            appliedAt: modal.entry.appliedAt ?? '',
            notes: modal.entry.notes ?? '',
          }}
          onSave={data => handleUpdate(modal.entry.id, data)}
          onClose={() => setModal(null)}
        />
      )}

      {/* Confirm delete */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[16px] p-6 max-w-sm w-full shadow-xl text-center">
            <div className="text-4xl mb-3">🗑️</div>
            <h3 className="text-[17px] font-bold text-[#1E1548] mb-2">Supprimer cette entrée ?</h3>
            <p className="text-[13px] text-[#6B7280] mb-5">Cette action est irréversible.</p>
            <div className="flex gap-3">
              <button onClick={() => setConfirmDeleteId(null)}
                className="flex-1 h-10 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[14px] font-semibold hover:bg-[#F8F9FD]">
                Annuler
              </button>
              <button onClick={() => handleDelete(confirmDeleteId)} disabled={deleting}
                className="flex-1 h-10 bg-red-500 text-white rounded-[10px] text-[14px] font-semibold hover:bg-red-600 flex items-center justify-center gap-2 disabled:opacity-60">
                {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
