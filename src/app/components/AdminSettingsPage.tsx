import { useState } from 'react';
import {
  Settings,
  Database,
  Shield,
  Users,
  Bell,
  AlertTriangle,
  Server,
  ArrowLeft,
  Save,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import { Button } from './Button';
import { FormInput } from './FormInput';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'system'>('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'TBEE',
    supportEmail: 'support@tbee.fr',
    maxUploadSize: '10',
    sessionTimeout: '30',
  });
  const [generalSaved, setGeneralSaved] = useState(false);

  const [notifAlerts, setNotifAlerts] = useState(true);
  const [notifReports, setNotifReports] = useState(true);
  const [notifSaved, setNotifSaved] = useState(false);

  const userCounts = { admins: '—', students: '—' };

  const serverInfo = {
    framework: 'React 18.3.1 + Vite 6.3.5',
    language: 'TypeScript 5.6',
    database: 'Supabase (PostgreSQL)',
    backend: 'Supabase Edge Functions (Deno)',
    hosting: 'OVH',
    supabaseSDK: '@supabase/supabase-js 2.95.3',
  };

  const handleSaveGeneral = () => {
    setGeneralSaved(true);
    setTimeout(() => setGeneralSaved(false), 2000);
  };

  const handleSaveNotifs = () => {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 2000);
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
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Paramètres
              </h1>
              <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                Configuration et gestion de la plateforme TBEE
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 space-y-6 lg:space-y-8">
        {/* Tabs */}
        <div className="border-b border-[rgba(30,21,72,0.08)] overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {([
              { id: 'general', label: 'Général', Icon: Settings },
              { id: 'users',   label: 'Utilisateurs', Icon: Users },
              { id: 'system',  label: 'Système', Icon: Database },
            ] as const).map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap flex items-center gap-2 ${
                  activeTab === id
                    ? 'border-[#FFD600] text-[#1E1548]'
                    : 'border-transparent text-[#6B7280] hover:text-[#1E1548]'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Général ── */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Configuration générale */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-[18px] font-bold text-[#1E1548]">Configuration générale</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Nom de la plateforme"
                  type="text"
                  value={generalSettings.platformName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, platformName: e.target.value })}
                />
                <FormInput
                  label="Email de support"
                  type="email"
                  value={generalSettings.supportEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, supportEmail: e.target.value })}
                />
                <FormInput
                  label="Taille max upload (MB)"
                  type="number"
                  value={generalSettings.maxUploadSize}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, maxUploadSize: e.target.value })}
                />
                <FormInput
                  label="Timeout session (min)"
                  type="number"
                  value={generalSettings.sessionTimeout}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, sessionTimeout: e.target.value })}
                />
              </div>
              <div className="mt-6 flex items-center justify-end gap-3">
                {generalSaved && (
                  <span className="flex items-center gap-1 text-[13px] text-[#10B981] font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Enregistré
                  </span>
                )}
                <button
                  onClick={handleSaveGeneral}
                  className="flex items-center gap-2 px-5 h-10 bg-[#1E1548] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#2D2166] transition-all"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </div>

            {/* Mode maintenance */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-[18px] font-bold text-[#1E1548]">Mode maintenance</h4>
                <span className="ml-2 px-2 py-0.5 bg-[#FFF4CC] border border-[#FFD600] rounded-full text-[11px] font-semibold text-[#1E1548] flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Bientôt disponible
                </span>
              </div>
              <p className="text-[13px] text-[#6B7280] mb-5 leading-[20px]">
                Nécessite un connecteur backend (table DB + middleware router). Le toggle est visible mais inactif pour l'instant.
              </p>
              <div className="flex items-start justify-between gap-4 opacity-50 pointer-events-none">
                <div className="flex-1">
                  <p className="font-medium text-[14px] text-[#1E1548] mb-1">Activer le mode maintenance</p>
                  <p className="text-[13px] text-[#6B7280]">
                    Les utilisateurs verront une page de maintenance. Seuls les admins pourront accéder à la plateforme.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-not-allowed">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    disabled
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#E5E7EB] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1E1548]" />
                </label>
              </div>
            </div>

            {/* Notifications système admin */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
              <div className="flex items-center gap-2 mb-2">
                <Bell className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-[18px] font-bold text-[#1E1548]">Notifications système</h4>
              </div>
              <p className="text-[13px] text-[#6B7280] mb-5 leading-[20px]">
                Préférences de notification pour l'administrateur. Les envois automatiques (cron hebdomadaire, monitoring Auth) sont en cours de connexion.
              </p>
              <div className="space-y-4">
                <Toggle
                  label="Alertes de sécurité"
                  description="Recevoir des notifications pour les tentatives de connexion suspectes"
                  checked={notifAlerts}
                  onChange={setNotifAlerts}
                />
                <div className="h-px bg-[rgba(30,21,72,0.06)]" />
                <Toggle
                  label="Rapports hebdomadaires"
                  description="Recevoir un rapport d'activité chaque lundi (requiert le cron Supabase)"
                  checked={notifReports}
                  onChange={setNotifReports}
                />
              </div>
              <div className="mt-5 flex items-center justify-end gap-3">
                {notifSaved && (
                  <span className="flex items-center gap-1 text-[13px] text-[#10B981] font-medium">
                    <CheckCircle2 className="w-4 h-4" /> Préférences enregistrées
                  </span>
                )}
                <button
                  onClick={handleSaveNotifs}
                  className="flex items-center gap-2 px-5 h-10 bg-[#1E1548] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#2D2166] transition-all"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Utilisateurs ── */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-[18px] font-bold text-[#1E1548]">Gestion des rôles</h4>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-[#F8F9FD] rounded-[12px]">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-[#1E1548]">Administrateur</h5>
                    <span className="px-3 py-1 bg-[#E8ECFF] rounded-full text-[13px] font-medium text-[#1E1548]">{userCounts.admins} utilisateurs</span>
                  </div>
                  <p className="text-[13px] text-[#6B7280] mb-4">
                    Accès complet à toutes les fonctionnalités de la plateforme
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Gestion utilisateurs', 'Gestion modules', 'Validation CVs', 'Paramètres système'].map(p => (
                      <span key={p} className="px-2 py-1 bg-white border border-[rgba(30,21,72,0.08)] rounded text-[12px] text-[#1E1548]">{p}</span>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-[#F8F9FD] rounded-[12px]">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-semibold text-[#1E1548]">Étudiant</h5>
                    <span className="px-3 py-1 bg-[#E8ECFF] rounded-full text-[13px] font-medium text-[#1E1548]">{userCounts.students} utilisateurs</span>
                  </div>
                  <p className="text-[13px] text-[#6B7280] mb-4">
                    Accès aux modules de formation et outils d'accompagnement
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Modules', 'Mon CV', 'Cas pratiques', 'Mon profil', 'Pokédex offres'].map(p => (
                      <span key={p} className="px-2 py-1 bg-white border border-[rgba(30,21,72,0.08)] rounded text-[12px] text-[#1E1548]">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Système ── */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Server className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-[18px] font-bold text-[#1E1548]">Stack technique</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Framework frontend', value: serverInfo.framework },
                  { label: 'Langage', value: serverInfo.language },
                  { label: 'Base de données', value: serverInfo.database },
                  { label: 'Backend / Edge Functions', value: serverInfo.backend },
                  { label: 'Hébergement', value: serverInfo.hosting },
                  { label: 'Client Supabase', value: serverInfo.supabaseSDK },
                ].map(({ label, value }) => (
                  <div key={label} className="p-4 bg-[#F8F9FD] rounded-[12px]">
                    <p className="text-[12px] text-[#6B7280] mb-1">{label}</p>
                    <p className="font-semibold text-[14px] text-[#1E1548]">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#FFF4CC] border border-[#FFD600] rounded-[16px] p-5 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#1E1548] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-[14px] text-[#1E1548] mb-1">Métriques runtime</p>
                <p className="text-[13px] text-[#6B7280] leading-[20px]">
                  Uptime, temps de réponse et connexions actives seront disponibles après le déploiement production via Netlify Analytics ou une Edge Function dédiée.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="font-medium text-[14px] text-[#1E1548] mb-1">{label}</p>
        <p className="text-[13px] text-[#6B7280]">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-[#E5E7EB] rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FFD600]" />
      </label>
    </div>
  );
}
