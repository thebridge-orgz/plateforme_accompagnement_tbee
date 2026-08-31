import { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Search, Users, Send, CheckCircle2, XCircle, Target, ClipboardList, Loader2, Mail, ExternalLink, Calendar, AlertCircle, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { prospectingService } from '../../services/supabase';
import type { ProspectingEntryWithStudent, ProspectingStatus } from '../../services/supabase';

// ── Config statuts ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ProspectingStatus, {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  priority: 'critical' | 'high' | 'medium' | 'low' | 'success';
  tip: string;
}> = {
  interview: {
    label: 'Entretien',
    color: 'text-[#B45309]',
    bg: 'bg-[#FFF4CC]',
    border: 'border-l-[#F59E0B]',
    icon: <Users className="w-3.5 h-3.5" />,
    priority: 'critical',
    tip: 'Préparation entretien urgente',
  },
  offer: {
    label: 'Offre reçue',
    color: 'text-[#10B981]',
    bg: 'bg-[#F0FDF4]',
    border: 'border-l-[#10B981]',
    icon: <Target className="w-3.5 h-3.5" />,
    priority: 'high',
    tip: 'Aide à la négociation / signature',
  },
  applied: {
    label: 'Candidature envoyée',
    color: 'text-[#1E1548]',
    bg: 'bg-[#E8ECFF]',
    border: 'border-l-[#6366F1]',
    icon: <Send className="w-3.5 h-3.5" />,
    priority: 'medium',
    tip: 'Suivi de candidature',
  },
  to_apply: {
    label: 'À candidater',
    color: 'text-[#6B7280]',
    bg: 'bg-[#F3F4F6]',
    border: 'border-l-[#9CA3AF]',
    icon: <ClipboardList className="w-3.5 h-3.5" />,
    priority: 'medium',
    tip: 'Pousser à candidater',
  },
  rejected: {
    label: 'Refusé',
    color: 'text-[#EF4444]',
    bg: 'bg-[#FEF2F2]',
    border: 'border-l-[#EF4444]',
    icon: <XCircle className="w-3.5 h-3.5" />,
    priority: 'low',
    tip: 'Soutien & rebond nécessaire',
  },
  accepted: {
    label: 'Accepté',
    color: 'text-[#10B981]',
    bg: 'bg-[#DCFCE7]',
    border: 'border-l-[#10B981]',
    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
    priority: 'success',
    tip: 'Contrat décroché',
  },
};

// Ordre d'affichage des filtres (priorité décroissante)
const PRIORITY_ORDER: ProspectingStatus[] = ['interview', 'offer', 'applied', 'to_apply', 'rejected', 'accepted'];

const NEEDS_HELP_KEY = 'needs_help' as const;
type FilterType = ProspectingStatus | 'all' | typeof NEEDS_HELP_KEY;

const PRIORITY_BADGE: Record<string, { label: string; cls: string }> = {
  critical: { label: '🔴 Urgent',        cls: 'bg-red-100 text-red-700' },
  high:     { label: '🟠 Important',     cls: 'bg-orange-100 text-orange-700' },
  medium:   { label: '🔵 À surveiller',  cls: 'bg-blue-100 text-blue-700' },
  low:      { label: '⬛ À soutenir',    cls: 'bg-gray-100 text-gray-600' },
  success:  { label: '🟢 Succès',        cls: 'bg-green-100 text-green-700' },
};

// ── Page ───────────────────────────────────────────────────────────────────────

export function AdminProspectionPage() {
  const [entries, setEntries] = useState<ProspectingEntryWithStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<FilterType>('interview');
  const [search, setSearch] = useState('');

  useEffect(() => {
    prospectingService.getAllEntriesAdmin()
      .then(setEntries)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const c: Record<string, number> = {
      all: entries.length,
      needs_help: entries.filter(e => e.needsHelp).length,
    };
    PRIORITY_ORDER.forEach(s => { c[s] = entries.filter(e => e.status === s).length; });
    return c;
  }, [entries]);

  const filtered = useMemo(() => {
    let list: ProspectingEntryWithStudent[];
    if (filterStatus === 'all') list = entries;
    else if (filterStatus === 'needs_help') list = entries.filter(e => e.needsHelp);
    else list = entries.filter(e => e.status === filterStatus);

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.studentName.toLowerCase().includes(q) ||
        e.companyName.toLowerCase().includes(q) ||
        e.positionTitle.toLowerCase().includes(q)
      );
    }
    return list;
  }, [entries, filterStatus, search]);

  // Regroup filtered by student when viewing "all"
  const studentsWithInterview = entries.filter(e => e.status === 'interview').map(e => e.userId);
  const studentsWithOffer     = entries.filter(e => e.status === 'offer').map(e => e.userId);

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.AdminDashboard.path}>
              <button className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0">
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1">
                Pokédex candidatures
              </h1>
              <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                Suivi de toutes les candidatures — priorisez les étudiants à aider
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-5">

        {/* Alerte priorité */}
        {!loading && (counts.interview > 0 || counts.offer > 0) && (
          <div className="flex items-start gap-3 p-4 bg-[#FFF4CC] border-2 border-[#FFD600] rounded-[14px]">
            <AlertCircle className="w-5 h-5 text-[#B45309] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-[14px] font-bold text-[#1E1548] mb-0.5">
                Action prioritaire requise
              </p>
              <p className="text-[13px] text-[#6B7280]">
                {counts.interview > 0 && `${counts.interview} candidature(s) en entretien — préparez ces étudiants dès maintenant.`}
                {counts.interview > 0 && counts.offer > 0 && ' '}
                {counts.offer > 0 && `${counts.offer} offre(s) reçue(s) — aidez-les à finaliser.`}
              </p>
            </div>
          </div>
        )}

        {/* Stats rapides */}
        {!loading && (
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PRIORITY_ORDER.map(s => {
              const cfg = STATUS_CONFIG[s];
              const count = counts[s] ?? 0;
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`flex flex-col items-center p-3 rounded-[12px] border-2 transition-all text-center ${
                    filterStatus === s
                      ? `${cfg.bg} border-[#FFD600]`
                      : 'bg-white border-[rgba(30,21,72,0.08)] hover:border-[#FFD600]/50'
                  }`}
                >
                  <span className={`text-[22px] font-bold ${count === 0 ? 'text-[#D1D5DB]' : cfg.color.replace('text-', 'text-')}`}>
                    {count}
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7280] leading-tight mt-0.5">{cfg.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Barre de recherche + filtres */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              placeholder="Chercher un étudiant, une entreprise, un poste…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-4 bg-white border-2 border-[rgba(30,21,72,0.10)] rounded-[10px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] transition-colors"
            />
          </div>
        </div>

        {/* Onglets filtres */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`h-8 px-3 rounded-[8px] text-[13px] font-semibold border-2 transition-all ${
              filterStatus === 'all'
                ? 'border-[#FFD600] bg-[#FFF4CC] text-[#1E1548]'
                : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#FFD600]/50'
            }`}
          >
            Tous ({counts.all})
          </button>
          <button
            onClick={() => setFilterStatus('needs_help')}
            className={`h-8 px-3 rounded-[8px] text-[13px] font-semibold border-2 transition-all flex items-center gap-1.5 ${
              filterStatus === 'needs_help'
                ? 'border-[#EF4444] bg-[#FEF2F2] text-[#EF4444]'
                : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#EF4444]/50'
            }`}
          >
            🆘 Aide demandée
            <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
              filterStatus === 'needs_help' ? 'bg-white/60' : 'bg-[#FEF2F2] text-[#EF4444]'
            }`}>{counts.needs_help}</span>
          </button>
          {PRIORITY_ORDER.map(s => {
            const cfg = STATUS_CONFIG[s];
            const count = counts[s] ?? 0;
            return (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`h-8 px-3 rounded-[8px] text-[13px] font-semibold border-2 transition-all flex items-center gap-1.5 ${
                  filterStatus === s
                    ? `border-[#FFD600] ${cfg.bg} ${cfg.color}`
                    : 'border-[rgba(30,21,72,0.08)] bg-white text-[#6B7280] hover:border-[#FFD600]/50'
                }`}
              >
                {cfg.icon}
                {cfg.label}
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                  filterStatus === s ? 'bg-white/60' : 'bg-[#F3F4F6]'
                }`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Indicateur de priorité du filtre actif */}
        {filterStatus !== 'all' && filterStatus !== 'needs_help' && (
          <div className="flex items-center gap-2">
            <span className={`text-[12px] font-semibold px-2.5 py-1 rounded-full ${PRIORITY_BADGE[STATUS_CONFIG[filterStatus].priority].cls}`}>
              {PRIORITY_BADGE[STATUS_CONFIG[filterStatus].priority].label}
            </span>
            <span className="text-[13px] text-[#6B7280]">{STATUS_CONFIG[filterStatus].tip}</span>
          </div>
        )}
        {filterStatus === 'needs_help' && (
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold px-2.5 py-1 rounded-full bg-red-100 text-red-700">🆘 Action requise</span>
            <span className="text-[13px] text-[#6B7280]">Étudiants ayant explicitement demandé de l'aide</span>
          </div>
        )}

        {/* Liste */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-[#FFD600] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
            <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#1E1548]" />
            </div>
            <h3 className="text-[18px] font-bold text-[#1E1548] mb-2">Aucune candidature</h3>
            <p className="text-[14px] text-[#6B7280]">
              {search ? 'Aucun résultat pour cette recherche.' : 'Aucune candidature dans cette catégorie.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
            {filtered.map(entry => {
              const cfg = STATUS_CONFIG[entry.status];
              const badge = PRIORITY_BADGE[cfg.priority];
              const initials = entry.companyName.slice(0, 2).toUpperCase();
              const studentInitials = entry.studentName !== '—'
                ? entry.studentName.split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase()
                : '?';
              const isUrgent = cfg.priority === 'critical' || cfg.priority === 'high';

              return (
                <div
                  key={entry.id}
                  className={`bg-white border border-[rgba(30,21,72,0.08)] border-l-4 ${cfg.border} rounded-[16px] p-5 hover:shadow-[0_4px_16px_rgba(30,21,72,0.08)] transition-shadow`}
                >
                  {/* Étudiant */}
                  <div className="flex items-center gap-2.5 mb-3 pb-3 border-b border-[rgba(30,21,72,0.06)]">
                    <div className="w-8 h-8 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[11px] font-bold text-[#1E1548]">{studentInitials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold text-[#1E1548] truncate">{entry.studentName}</p>
                      <p className="text-[11px] text-[#9CA3AF] truncate">{entry.studentEmail}</p>
                    </div>
                    {isUrgent && (
                      <span className={`flex-shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${badge.cls}`}>
                        {cfg.priority === 'critical' ? 'Urgent' : 'Important'}
                      </span>
                    )}
                  </div>

                  {/* Candidature */}
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-[#1E1548] rounded-[10px] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[12px]">{initials}</span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-bold text-[#1E1548] truncate">{entry.companyName}</p>
                      <p className="text-[12px] text-[#6B7280] truncate">{entry.positionTitle}</p>
                    </div>
                  </div>

                  {/* Statut */}
                  <span className={`inline-flex items-center gap-1.5 text-[12px] px-2.5 py-1 rounded-full font-semibold ${cfg.bg} ${cfg.color}`}>
                    {cfg.icon} {cfg.label}
                  </span>

                  {/* Meta */}
                  {(entry.appliedAt || entry.offerUrl) && (
                    <div className="flex items-center gap-3 mt-2.5 text-[11px] text-[#9CA3AF]">
                      {entry.appliedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.appliedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                        </span>
                      )}
                      {entry.offerUrl && (
                        <a href={entry.offerUrl} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 hover:text-[#1E1548] transition-colors">
                          <ExternalLink className="w-3 h-3" /> Voir l'offre
                        </a>
                      )}
                    </div>
                  )}

                  {entry.notes && (
                    <p className="mt-2.5 text-[11px] text-[#6B7280] line-clamp-2 leading-[16px] bg-[#F8F9FD] rounded-[8px] px-2.5 py-2">
                      {entry.notes}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 mt-3">
                    {entry.studentEmail !== '—' && (
                      <a href={`mailto:${entry.studentEmail}?subject=${encodeURIComponent(`Suivi candidature - ${entry.companyName} (${entry.positionTitle})`)}`}
                        className="flex-1 h-8 bg-[#E8ECFF] text-[#1E1548] rounded-[8px] text-[12px] font-semibold hover:bg-[#D5DDFF] transition-colors flex items-center justify-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Contacter
                      </a>
                    )}
                    <Link to={`${routes.AdminStudentList.path}/${entry.userId}`} className="flex-1">
                      <button className="w-full h-8 bg-white border-2 border-[rgba(30,21,72,0.10)] text-[#1E1548] rounded-[8px] text-[12px] font-semibold hover:border-[#1E1548] transition-colors flex items-center justify-center gap-1.5">
                        <Users className="w-3.5 h-3.5" /> Profil
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Légende priorités */}
        {!loading && entries.length > 0 && (
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[14px] p-4">
            <p className="text-[12px] font-bold text-[#1E1548] mb-2 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FFD600]" /> Guide de priorités
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {PRIORITY_ORDER.map(s => {
                const cfg = STATUS_CONFIG[s];
                const badge = PRIORITY_BADGE[cfg.priority];
                return (
                  <div key={s} className="flex items-center gap-2 text-[12px]">
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${badge.cls}`}>
                      {badge.label}
                    </span>
                    <span className="text-[#6B7280]">{cfg.label} — {cfg.tip}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
