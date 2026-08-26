import { useState } from 'react';
import {
  Settings,
  Database,
  Shield,
  Users,
  Bell,
  AlertTriangle,
  Download,
  Upload,
  Server,
  Activity,
  ArrowLeft
} from 'lucide-react';
import { Button } from './Button';
import { FormInput } from './FormInput';
import { StatCard } from './StatCard';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

export function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'users' | 'system'>('general');
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const [generalSettings, setGeneralSettings] = useState({
    platformName: 'TBEE',
    supportEmail: 'support@tbee.fr',
    maxUploadSize: '10',
    sessionTimeout: '30'
  });

  // Données mockées pour les compteurs
  const userCounts = {
    admins: '-',
    students: '-'
  };

  // Données mockées pour les métriques
  const systemMetrics = {
    uptime: 'N/A',
    responseTime: 'N/A',
    activeConnections: '-'
  };

  // Données mockées pour le serveur
  const serverInfo = {
    nodeVersion: 'À configurer',
    reactVersion: '18.2.0',
    platform: 'À configurer',
    region: 'À configurer',
    deploymentId: 'À configurer'
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
                Paramètres
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Configuration et gestion de la plateforme TBEE
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 space-y-6 lg:space-y-8">
        {/* System Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StatCard
            title="Uptime"
            value={systemMetrics.uptime}
            icon={<Activity className="w-6 h-6 text-green-600" />}
          />
          <StatCard
            title="Temps de réponse"
            value={systemMetrics.responseTime}
            icon={<Server className="w-6 h-6 text-primary" />}
          />
          <StatCard
            title="Connexions actives"
            value={systemMetrics.activeConnections}
            icon={<Users className="w-6 h-6 text-primary" />}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === 'general'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Général
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === 'users'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Utilisateurs
            </button>
            <button
              onClick={() => setActiveTab('system')}
              className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === 'system'
                ? 'border-primary text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
            >
              <Database className="w-4 h-4 inline mr-2" />
              Système
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className="space-y-6">
            {/* Platform Settings */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Settings className="w-5 h-5 text-primary" />
                <h4>Configuration générale</h4>
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
              <div className="mt-6 flex justify-end">
                <Button>Enregistrer les modifications</Button>
              </div>
            </div>

            {/* Maintenance Mode */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <AlertTriangle className="w-5 h-5 text-primary" />
                <h4>Mode maintenance</h4>
              </div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-medium mb-1">Activer le mode maintenance</p>
                  <p className="text-sm text-muted-foreground">
                    Les utilisateurs verront une page de maintenance. Seuls les admins pourront accéder à la plateforme.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-primary" />
                <h4>Notifications système</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium mb-1">Alertes de sécurité</p>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications pour les tentatives de connexion suspectes
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <div className="h-px bg-border"></div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium mb-1">Rapports hebdomadaires</p>
                    <p className="text-sm text-muted-foreground">
                      Recevoir un rapport d'activité chaque lundi
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-muted peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Roles */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Shield className="w-5 h-5 text-primary" />
                <h4>Gestion des rôles</h4>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">Administrateur</h5>
                    <span className="px-3 py-1 bg-primary/20 rounded-full text-sm">{userCounts.admins} utilisateurs</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Accès complet à toutes les fonctionnalités de la plateforme
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-background rounded text-xs">Gestion utilisateurs</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">Gestion modules</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">Paramètres système</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">Debug</span>
                  </div>
                </div>

                <div className="p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">Étudiant</h5>
                    <span className="px-3 py-1 bg-primary/20 rounded-full text-sm">{userCounts.students} utilisateurs</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Accès aux modules de formation et outils d'apprentissage
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-background rounded text-xs">Modules</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">CV</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">Cas pratiques</span>
                    <span className="px-2 py-1 bg-background rounded text-xs">Profil</span>
                  </div>
                </div>
              </div>
            </div>

            {/* User Management Quick Actions */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h4>Actions rapides</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start flex items-center gap-2" onClick={() => onNavigate('admin-users')}>
                  <Users className="w-4 h-4" />
                  Créer un utilisateur
                </Button>
                <Button variant="outline" className="justify-start flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Importer en masse (CSV)
                </Button>
                <Button variant="outline" className="justify-start flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Exporter la liste
                </Button>
                <Button variant="outline" className="justify-start flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Réinitialiser mots de passe
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'system' && (
          <div className="space-y-6">
            {/* Server Information */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Server className="w-5 h-5 text-primary" />
                <h4>Informations serveur</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Version Node.js</p>
                  <p className="font-medium">{serverInfo.nodeVersion}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Version React</p>
                  <p className="font-medium">{serverInfo.reactVersion}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Système d'exploitation</p>
                  <p className="font-medium">{serverInfo.platform}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">Hébergement</p>
                  <p className="font-medium">{serverInfo.region}</p>
                </div>
                <div className="p-4 bg-secondary/50 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">ID déploiement</p>
                  <p className="font-medium">{serverInfo.deploymentId}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}