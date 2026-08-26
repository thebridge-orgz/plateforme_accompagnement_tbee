import { ArrowLeft, User, Mail, Building, Shield, Edit2, Save, X, Phone, CheckCircle2, Lock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';
import { useAuth } from '../../hooks/useAuth'
import { formatDateTime } from '../../utils/date'

interface AdminProfilePageProps {
  userName?: string;
  authEmail?: string;
  authFirstName?: string;
  authLastName?: string;
}

export function AdminProfilePage() {
  const { user, updateProfil, refreshUser, uploadProfilePicture, deleteProfilePicture, updatePassword, deleteAccount, signOut, isAdmin } = useAuth();

  const [isEditing, setIsEditing] = useState(false);

  if (!user?.id) {
    alert('Erreur: utilisateur non connecté');
    return;
  }

  const [adminData, setAdminData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: isAdmin ? 'Administrateur' : 'Rôle inconnu',
    establishment: 'TBEE Formation',
    phone: user.phone,
    joinedDate: formatDateTime(user.createdAt),
    permissions: ['Validation CVs', 'Gestion utilisateurs', 'Support offres', 'Gestion modules']
  });

  const [editData, setEditData] = useState({ ...adminData });

  const handleSave = async () => {
    try {
      const data = {
        firstName: editData.firstName,
        lastName: editData.lastName,
        phone: editData.phone
      }

      await updateProfil(user.id, data);
      await refreshUser();
      setIsEditing(false);
      alert('✅ Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
      alert('Erreur lors de la sauvegarde du profil');
    }
  };

  const handleCancel = () => {
    setEditData({ ...adminData });
    setIsEditing(false);
  };

  const stats = {
    cvsValidated: 0,
    exercisesGraded: 0,
    studentsHelped: 0,
    avgResponseTime: '0h 0min'
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
                Mon profil administrateur
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Gérez vos informations personnelles et vos permissions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Card */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">
                  Informations personnelles
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="h-10 px-4 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-all flex items-center justify-center gap-2 flex-shrink-0"
                  >
                    <Edit2 className="w-4 h-4" />
                    Modifier
                  </button>
                ) : (
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={handleCancel}
                      className="h-10 px-4 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[14px] font-semibold hover:bg-[#F8F9FD] transition-all flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Annuler
                    </button>
                    <button
                      onClick={handleSave}
                      className="h-10 px-4 bg-[#10B981] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#059669] transition-all flex items-center justify-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Enregistrer
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  {isEditing ? (
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-1">
                        <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={editData.firstName}
                          onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                          className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600]"
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={editData.lastName}
                          onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                          className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600]"
                        />
                      </div>
                    </div>
                  ) : (
                    <>
                      <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                        Nom complet
                      </label>
                      <div className="flex items-center gap-3 h-12 px-4 bg-[#F8F9FD] rounded-[12px]">
                      <User className="w-5 h-5 text-[#6B7280]" />
                      <span className="text-[14px] text-[#1E1548] font-medium">
                          {adminData.firstName} {adminData.lastName}
                        </span>
                      </div>
                    </>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                    Adresse email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600]"
                    />
                  ) : (
                    <div className="flex items-center gap-3 h-12 px-4 bg-[#F8F9FD] rounded-[12px]">
                      <Mail className="w-5 h-5 text-[#6B7280]" />
                      <span className="text-[14px] text-[#1E1548] font-medium">
                        {adminData.email}
                      </span>
                    </div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                    Rôle administratif
                  </label>
                  {isEditing ? (
                    <select
                      value={editData.role}
                      onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                      className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600]"
                    >
                      <option>Administrateur Principal</option>
                      <option>Administrateur</option>
                      <option>Modérateur</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-3 h-12 px-4 bg-[#F8F9FD] rounded-[12px]">
                      <Shield className="w-5 h-5 text-[#6B7280]" />
                      <span className="text-[14px] text-[#1E1548] font-medium">
                        {adminData.role}
                      </span>
                    </div>
                  )}
                </div>

                {/* Establishment */}
                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                    Établissement
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.establishment}
                      onChange={(e) => setEditData({ ...editData, establishment: e.target.value })}
                      className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600]"
                    />
                  ) : (
                    <div className="flex items-center gap-3 h-12 px-4 bg-[#F8F9FD] rounded-[12px]">
                      <Building className="w-5 h-5 text-[#6B7280]" />
                      <span className="text-[14px] text-[#1E1548] font-medium">
                        {adminData.establishment}
                      </span>
                    </div>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-2">
                    Téléphone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                      className="w-full h-12 px-4 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] focus:outline-none focus:border-[#FFD600]"
                    />
                  ) : (
                    <div className="flex items-center gap-3 h-12 px-4 bg-[#F8F9FD] rounded-[12px]">
                      <Phone className="w-5 h-5 text-[#6B7280]" />
                      <span className="text-[14px] text-[#1E1548] font-medium">
                        {adminData.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Permissions */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
              <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548] mb-4">
                Permissions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {adminData.permissions.map((permission) => (
                  <div
                    key={permission}
                    className="flex items-center gap-3 p-3 bg-[#E8ECFF] rounded-[12px]"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#FFD600] flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#1E1548]" />
                    </div>
                    <span className="text-[14px] font-semibold text-[#1E1548]">
                      {permission}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            {/* Account Info */}
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
              <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-4">
                Informations du compte
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2 border-b border-[rgba(30,21,72,0.08)]">
                  <span className="text-[13px] text-[#6B7280]">Date d'inscription</span>
                  <span className="text-[14px] font-semibold text-[#1E1548]">
                    {adminData.joinedDate}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-[rgba(30,21,72,0.08)]">
                  <span className="text-[13px] text-[#6B7280]">Statut</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#10B981] text-[12px] font-semibold">
                    ● Actif
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[13px] text-[#6B7280]">Type de compte</span>
                  <span className="text-[14px] font-semibold text-[#1E1548]">{adminData.role}</span>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-[#FFF4CC] border-2 border-[#FFD600] rounded-[16px] p-4 sm:p-6">
              <h3 className="text-[18px] font-bold text-[#1E1548] mb-2 flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#1E1548]" />
                Sécurité
              </h3>
              <p className="text-[13px] text-[#1E1548] mb-4 leading-[20px]">
                Modifiez votre mot de passe régulièrement pour assurer la sécurité de votre compte.
              </p>
              <button className="w-full h-10 bg-white border-2 border-[#1E1548] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#1E1548] hover:text-white transition-all">
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}