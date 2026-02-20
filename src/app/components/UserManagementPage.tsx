import { useState } from 'react';
import { ArrowLeft, Search, Filter, UserPlus, Edit, Trash2, Mail, Phone } from 'lucide-react';
import { Button } from './Button';
import { FormInput } from './FormInput';
import { ProgressBar } from './ProgressBar';

interface UserManagementPageProps {
  onNavigate: (page: string) => void;
}

// Mock data
const allUsers = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@example.fr',
    phone: '06 12 34 56 78',
    progress: 45,
    joinedDate: '15/11/2024',
    rqth: true,
    status: 'active',
    formation: 'BTS Commerce',
    niveau: 'Bac+2'
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@example.fr',
    phone: '06 98 76 54 32',
    progress: 78,
    joinedDate: '10/11/2024',
    rqth: false,
    status: 'active',
    formation: 'Licence Informatique',
    niveau: 'Bac+3'
  },
  {
    id: '3',
    name: 'Thomas Bernard',
    email: 'thomas.bernard@example.fr',
    phone: '07 11 22 33 44',
    progress: 23,
    joinedDate: '20/10/2024',
    rqth: true,
    status: 'at-risk',
    formation: 'DUT GEA',
    niveau: 'Bac+2'
  },
  {
    id: '4',
    name: 'Sophie Petit',
    email: 'sophie.petit@example.fr',
    phone: '06 55 66 77 88',
    progress: 92,
    joinedDate: '05/11/2024',
    rqth: false,
    status: 'active',
    formation: 'Master Marketing',
    niveau: 'Bac+5'
  },
  {
    id: '5',
    name: 'Lucas Dubois',
    email: 'lucas.dubois@example.fr',
    phone: '07 99 88 77 66',
    progress: 15,
    joinedDate: '01/12/2024',
    rqth: false,
    status: 'inactive',
    formation: 'BTS SIO',
    niveau: 'Bac+2'
  },
  {
    id: '6',
    name: 'Emma Moreau',
    email: 'emma.moreau@example.fr',
    phone: '06 44 55 66 77',
    progress: 67,
    joinedDate: '25/10/2024',
    rqth: true,
    status: 'active',
    formation: 'Licence RH',
    niveau: 'Bac+3'
  }
];

export function UserManagementPage({ onNavigate }: UserManagementPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'at-risk' | 'inactive'>('all');

  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'at-risk':
        return 'bg-red-100 text-red-700';
      case 'inactive':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'Actif';
      case 'at-risk':
        return 'À risque';
      case 'inactive':
        return 'Inactif';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <button
            onClick={() => onNavigate('admin-dashboard')}
            className="w-10 h-10 rounded-full hover:bg-secondary flex items-center justify-center transition-colors self-start"
            aria-label="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2>Gestion des utilisateurs</h2>
            <p className="text-muted-foreground">
              Gérez les comptes étudiants et suivez leur progression
            </p>
          </div>
          <Button variant="primary" onClick={() => {}} className="w-full sm:w-auto">
            <UserPlus className="w-5 h-5 mr-2" />
            Créer un compte
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un étudiant..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-12 pl-12 pr-4 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="flex-1 h-12 px-4 bg-input-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="at-risk">À risque</option>
                <option value="inactive">Inactifs</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-muted-foreground">
              {filteredUsers.length} étudiant{filteredUsers.length > 1 ? 's' : ''} trouvé{filteredUsers.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* User Info */}
                <div className="lg:col-span-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-primary">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h4 className="mb-1">{user.name}</h4>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                      {user.rqth && (
                        <span className="inline-block mt-2 text-xs px-2 py-1 bg-secondary rounded-full">
                          RQTH
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Formation */}
                <div className="lg:col-span-3">
                  <p className="text-xs text-muted-foreground mb-1">Formation</p>
                  <p className="font-medium">{user.formation}</p>
                  <p className="text-sm text-muted-foreground">{user.niveau}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Inscrit le {user.joinedDate}
                  </p>
                </div>

                {/* Progress */}
                <div className="lg:col-span-3">
                  <p className="text-xs text-muted-foreground mb-2">Progression</p>
                  <ProgressBar progress={user.progress} showLabel size="sm" />
                  <span className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                    {getStatusLabel(user.status)}
                  </span>
                </div>

                {/* Actions */}
                <div className="lg:col-span-2 flex lg:flex-col gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => onNavigate('admin-tracking')}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    Suivi
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}