import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  Building2,
  Save,
  Camera,
  Settings,
  Shield,
  Bell,
  Lock,
  Download,
  AlertTriangle,
  Eye,
  EyeOff,
  Edit2,
  X,
  Trash
} from 'lucide-react';
import { Button } from './Button';
import { FormInput } from './FormInput';
import { useUserData } from '../../hooks/useUserData';
import { useAuth } from '../../hooks/useAuth'
import { supabase } from '../../config/supabaseClient';
import { routes } from '../router/routes';
import { Link, useNavigate } from 'react-router-dom';

interface StudentProfilePageProps {
  userName?: string;
  authEmail?: string;
  authFirstName?: string;
  authLastName?: string;
}

export function StudentProfilePage({ userName, authEmail, authFirstName, authLastName }: StudentProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'notifications'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { statistics, modules } = useUserData();
  const { user, updateProfil, refreshUser, uploadProfilePicture, deleteProfilePicture, updatePassword, deleteAccount, signOut } = useAuth();

  // État local pour le mot de passe
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [isDeletingPhoto, setIsDeletingPhoto] = useState(false);
  const [showDeletePhotoModal, setShowDeletePhotoModal] = useState(false);

  // TODO: Remplacer par les données Supabase + données d'onboarding
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    city: '',
    postalCode: '',
    school: '',
    program: '',
    level: '',
    targetLevel: '',
    mobilityRadius: '',
    rqth: false,
    rqthDetails: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    moduleUpdates: true,
    progressReports: true,
    tips: false
  });

  if (!user?.id) {
    alert('Erreur: utilisateur non connecté');
    return;
  }

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        school: '',
        program: '',
        level: user.currentLevel || '',
        targetLevel: '',
        mobilityRadius: '',
        rqth: user.hasRQTH || false,
        rqthDetails: ''
      });
    }
  }, [user]);

  // ============================================
  // GESTION DE L'UPLOAD DE PHOTO
  // ============================================
  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image ne doit pas dépasser 5MB');
      return;
    }

    // Preview locale immédiate
    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result as string);
    reader.readAsDataURL(file);

    try {
      if (!user?.id) {
        alert('Utilisateur non connecté');
        return;
      }

      // Upload de la photo via le service
      const publicUrl = await uploadProfilePicture(user.id, file);

      // Mettre à jour l'affichage
      setProfileImage(publicUrl);

      // Rafraîchir les données utilisateur
      await refreshUser();

      alert('✅ Photo de profil mise à jour avec succès !');
    } catch (error) {
      console.error('Erreur upload photo:', error);
      alert('Erreur lors de l\'upload de la photo');
      // Revenir à l'ancienne photo en cas d'erreur
      setProfileImage(user?.profilePictureUrl || null);
    }
  };

  const handleDeletePhoto = async () => {
    if (!user?.id) {
      alert('Utilisateur non connecté');
      return;
    }

    setIsDeletingPhoto(true);
    try {
      await deleteProfilePicture(user.id);

      // Mettre à jour l'affichage local
      setProfileImage(null);

      // Rafraîchir les données utilisateur
      await refreshUser();

      alert('✅ Photo de profil supprimée avec succès !');
      setShowDeletePhotoModal(false);
    } catch (error) {
      console.error('Erreur suppression photo:', error);
      alert('Erreur lors de la suppression de la photo');
    } finally {
      setIsDeletingPhoto(false);
    }
  };

  // Chargez la photo depuis le profil au montage
  useEffect(() => {
    if (user?.profilePictureUrl) {
      setProfileImage(user.profilePictureUrl);
    }
  }, [user?.profilePictureUrl]);

  // ============================================
  // GESTION DE LA SAUVEGARDE DU PROFIL
  // ============================================
  const handleSave = async () => {
    try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        hasRQTH: formData.rqth,
        address: formData.address,
        currentLevel: formData.level,
        targetLevel: formData.targetLevel,
        fieldOfInterest: formData.program,
        city: formData.city,
        postalCode: formData.postalCode,
        mobilityRadius: formData.mobilityRadius ?? null,
      }

      await updateProfil(user.id, data);
      await refreshUser(); // Rafraîchir les données après modification
      setIsEditing(false);
      alert('✅ Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur sauvegarde profil:', error);
      alert('Erreur lors de la sauvegarde du profil');
    }
  };

  const handleInputChange = (field: string, value: string | boolean | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
    // TODO: Sauvegarder dans Supabase
    // await supabase.from('user_settings').update({ [field]: value }).eq('user_id', userId);
  };

  // ============================================
  // GESTION DU MOT DE PASSE - VERSION CORRIGÉE
  // ============================================
  const handlePasswordChange = async () => {
    setPasswordError('');
    setPasswordSuccess(false);

    // Validation des champs
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Tous les champs sont requis');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Les mots de passe ne correspondent pas');
      return;
    }

    if (passwordData.newPassword === passwordData.currentPassword) {
      setPasswordError('Le nouveau mot de passe doit être différent de l\'ancien');
      return;
    }

    setIsChangingPassword(true);

    try {
      // Récupérer l'email de l'utilisateur courant
      const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();

      if (userError || !authUser?.email) {
        setPasswordError('Erreur : utilisateur non connecté');
        setIsChangingPassword(false);
        return;
      }

      // Vérifier l'ancien mot de passe en tentant une reconnexion
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: authUser.email,
        password: passwordData.currentPassword,
      });

      if (signInError) {
        setPasswordError('Mot de passe actuel incorrect');
        setIsChangingPassword(false);
        return;
      }

      // Utiliser la méthode updatePassword du hook useAuth
      await updatePassword(passwordData.newPassword);

      setPasswordSuccess(true);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      // Réinitialiser les champs après 3 secondes
      setTimeout(() => {
        setPasswordSuccess(false);
      }, 3000);

    } catch (error: any) {
      console.error('Erreur changement mot de passe:', error);
      setPasswordError(error.message || 'Erreur lors du changement de mot de passe');
    } finally {
      setIsChangingPassword(false);
    }
  };

  // ============================================
  // TÉLÉCHARGEMENT DES DONNÉES (RGPD)
  // ============================================
  const handleDownloadData = () => {
    // TODO: Récupérer toutes les données depuis Supabase
    // const { data: userData } = await supabase.from('user_profiles').select('*').eq('id', userId).single();
    // const { data: statsData } = await supabase.from('user_statistics').select('*').eq('user_id', userId).single();
    // const { data: modulesData } = await supabase.from('user_module_progress').select('*').eq('user_id', userId);
    // const { data: offersData } = await supabase.from('user_tracked_offers').select('*').eq('user_id', userId);

    const exportData = {
      profile: formData,
      statistics: statistics,
      modules: modules,
      notificationSettings: notificationSettings,
      exportDate: new Date().toISOString(),
      exportedBy: 'TBEE Platform'
    };

    // Créer un fichier JSON
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tbee-donnees-${user.firstName}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('✅ Vos données ont été téléchargées avec succès !');
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Supprime l'utilisateur dans auth.users (cascade sur toutes les tables liées)
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;

      await supabase.auth.signOut();

      alert('Votre compte a été supprimé.');
      onNavigate('landing');
    } catch (error) {
      console.error('Erreur suppression compte:', error);
      alert('Erreur lors de la suppression du compte. Réessaie.');
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <button
              //onClick={() => onNavigate('student-dashboard')}
              className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Retour"
            >
              <User className="w-5 h-5 text-[#1E1548]" />
            </button>

            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Mon profil
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Gérez vos informations personnelles et vos préférences
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8 space-y-6 lg:space-y-8">
        {/* Profile Card with Avatar */}
        <div className="bg-gradient-to-br from-primary/10 to-secondary rounded-2xl p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              {/* Avatar Display */}
              {profileImage ? (
                <>
                  <img
                    src={profileImage}
                    alt="Photo de profil"
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-white shadow-lg" />
                  <button
                    onClick={() => setShowDeletePhotoModal(true)}
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    aria-label="Supprimer la photo de profil"
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-[#1E1548] flex items-center justify-center text-white border-4 border-white shadow-lg">
                    <span className="text-3xl lg:text-4xl font-bold">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>

                  <button
                    onClick={handlePhotoClick}
                    className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-[#FFD600] text-[#1E1548] flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                    aria-label="Changer la photo de profil"
                  >
                    <Camera className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-[#1E1548]">{user.firstName} {user.lastName}</h3>
              <p className="text-[#6B7280] mb-2">{user.email}</p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="px-3 py-1 bg-[#FFD600]/20 rounded-full text-sm font-medium text-[#1E1548]">
                  {user.currentLevel || 'Niveau non défini'}
                </span>
                <span className="px-3 py-1 bg-[#10B981]/20 rounded-full text-sm font-medium text-[#059669]">
                  Étudiant actif
                </span>
                {user.hasRQTH && (
                  <span className="px-3 py-1 bg-[#8B5CF6]/20 rounded-full text-sm font-medium text-[#7C3AED] flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    RQTH
                  </span>
                )}
              </div>
            </div>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="h-10 px-4 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-all flex items-center justify-center gap-2 flex-shrink-0 w-full sm:w-auto"
              >
                <Edit2 className="w-4 h-4" />
                Modifier
              </button>
            ) : (
              <div className="flex gap-2 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => setIsEditing(false)}
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
        </div>

        {/* Tabs */}
        <div className="border-b border-[#E5E7EB] overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === 'profile'
                ? 'border-[#FFD600] text-[#1E1548]'
                : 'border-transparent text-[#6B7280] hover:text-[#1E1548]'
                }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Informations personnelles
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === 'privacy'
                ? 'border-[#FFD600] text-[#1E1548]'
                : 'border-transparent text-[#6B7280] hover:text-[#1E1548]'
                }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Confidentialité
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-4 py-3 font-medium transition-all border-b-2 whitespace-nowrap ${activeTab === 'notifications'
                ? 'border-[#FFD600] text-[#1E1548]'
                : 'border-transparent text-[#6B7280] hover:text-[#1E1548]'
                }`}
            >
              <Bell className="w-4 h-4 inline mr-2" />
              Notifications
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' && (
          <div className="space-y-6 lg:space-y-8">
            {/* Personal Information */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <User className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-lg font-semibold text-[#1E1548]">Informations personnelles</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Prénom"
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                  icon={<User className="w-4 h-4" />}
                />
                <FormInput
                  label="Nom"
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                  icon={<User className="w-4 h-4" />}
                />
                <FormInput
                  label="Email"
                  type="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  icon={<Mail className="w-4 h-4" />}
                />
                <FormInput
                  label="Téléphone"
                  type="tel"
                  inputMode="numeric"
                  value={formData.phone}
                  placeholder="0612345678"
                  onChange={(e) => handleInputChange('phone', e.target.value.replace(/\D/g, ''))}
                  disabled={!isEditing}
                  icon={<Phone className="w-4 h-4" />}
                />
                <FormInput
                  label="Date de naissance"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  disabled={!isEditing}
                  icon={<Calendar className="w-4 h-4" />}
                />
              </div>
            </div>

            {/* Address */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <MapPin className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-lg font-semibold text-[#1E1548]">Adresse</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <FormInput
                    label="Adresse"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    disabled={!isEditing}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                </div>
                <FormInput
                  label="Ville"
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  disabled={!isEditing}
                />
                <FormInput
                  label="Code postal"
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Education */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-lg font-semibold text-[#1E1548]">Formation</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Établissement"
                  type="text"
                  value={formData.school}
                  onChange={(e) => handleInputChange('school', e.target.value)}
                  disabled={!isEditing}
                  icon={<Building2 className="w-4 h-4" />}
                />
                <FormInput
                  label="Niveau d'études"
                  type="text"
                  value={formData.level}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  disabled={!isEditing}
                  icon={<GraduationCap className="w-4 h-4" />}
                />
                <div className="md:col-span-2">
                  <FormInput
                    label="Programme"
                    type="text"
                    value={formData.program}
                    onChange={(e) => handleInputChange('program', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* RQTH Information */}
            <div className="bg-gradient-to-br from-[#8B5CF6]/10 to-[#FFD600]/10 rounded-2xl p-6 border border-[#E5E7EB]">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-[#7C3AED]" />
                <h4 className="text-lg font-semibold text-[#1E1548]">Reconnaissance RQTH</h4>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="rqth"
                    checked={formData.rqth}
                    onChange={(e) => handleInputChange('rqth', e.target.checked)}
                    disabled={!isEditing}
                    className="w-5 h-5 rounded border-[#E5E7EB] text-[#7C3AED] focus:ring-2 focus:ring-[#8B5CF6] disabled:opacity-50"
                  />
                  <label htmlFor="rqth" className="font-medium text-[#1E1548]">
                    Je bénéficie d'une reconnaissance RQTH
                  </label>
                </div>
                {formData.rqth && (
                  <div>
                    <label className="block mb-2 text-sm font-medium text-[#1E1548]">
                      Détails (optionnel)
                    </label>
                    <textarea
                      value={formData.rqthDetails}
                      onChange={(e) => handleInputChange('rqthDetails', e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full px-4 py-3 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD600] disabled:opacity-50 resize-none"
                      placeholder="Informations complémentaires..."
                    />
                  </div>
                )}
                <p className="text-sm text-[#6B7280]">
                  Ces informations sont confidentielles et utilisées uniquement pour personnaliser votre accompagnement.
                </p>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="flex justify-end gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Annuler
                </Button>
                <Button
                  onClick={handleSave}
                  className="gap-2"
                >
                  <Save className="w-4 h-4" />
                  Enregistrer les modifications
                </Button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-6">
            {/* Password Change */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Lock className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-lg font-semibold text-[#1E1548]">Modifier le mot de passe</h4>
              </div>
              <div className="space-y-4 max-w-lg">
                <FormInput
                  label="Mot de passe actuel"
                  type={showPasswords.current ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                    >
                      {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                <FormInput
                  label="Nouveau mot de passe"
                  type={showPasswords.new ? 'text' : 'password'}
                  placeholder="•••••••• (minimum 8 caractères)"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                    >
                      {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                <FormInput
                  label="Confirmer le nouveau mot de passe"
                  type={showPasswords.confirm ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                <Button
                  className="w-full sm:w-auto"
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? 'Changement en cours...' : 'Mettre à jour le mot de passe'}
                </Button>
                {passwordError && (
                  <p className="text-sm text-red-500 mt-2">
                    {passwordError}
                  </p>
                )}
                {passwordSuccess && (
                  <p className="text-sm text-green-500 mt-2">
                    ✅ Mot de passe mis à jour avec succès ! Vous allez être déconnecté.
                  </p>
                )}
              </div>
            </div>

            {/* Data Export */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Download className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-lg font-semibold text-[#1E1548]">Mes données</h4>
              </div>
              <p className="text-[#6B7280] mb-6">
                Vous pouvez télécharger une copie de toutes vos données personnelles.
              </p>
              <Button
                variant="secondary"
                onClick={handleDownloadData}
              >
                <Download className="w-4 h-4 mr-2" />
                Télécharger mes données
              </Button>
            </div>

            {/* Delete Account */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200">
              <h4 className="text-lg font-semibold mb-2 text-red-900">⚠️ Zone dangereuse</h4>
              <p className="text-sm text-red-900 mb-6">
                La suppression de votre compte est définitive et irréversible. Toutes vos données seront supprimées.
              </p>
              <Button
                variant="secondary"
                className="border-red-300 text-red-700 hover:bg-red-100"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash className="w-4 h-4 mr-2" />
                Supprimer mon compte
              </Button>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Email Notifications */}
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <Bell className="w-5 h-5 text-[#FFD600]" />
                <h4 className="text-lg font-semibold text-[#1E1548]">Préférences de notification</h4>
              </div>
              <div className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-[#1E1548] mb-1">Notifications par email</p>
                    <p className="text-sm text-[#6B7280]">
                      Recevez des emails pour les mises à jour importantes
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#FFD600] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                  </label>
                </div>

                <div className="h-px bg-[#E5E7EB]"></div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-[#1E1548] mb-1">Mises à jour des modules</p>
                    <p className="text-sm text-[#6B7280]">
                      Soyez notifié quand de nouveaux modules sont disponibles
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.moduleUpdates}
                      onChange={(e) => handleNotificationChange('moduleUpdates', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#FFD600] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                  </label>
                </div>

                <div className="h-px bg-[#E5E7EB]"></div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-[#1E1548] mb-1">Rapports de progression</p>
                    <p className="text-sm text-[#6B7280]">
                      Recevez un récapitulatif hebdomadaire de votre progression
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.progressReports}
                      onChange={(e) => handleNotificationChange('progressReports', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#FFD600] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                  </label>
                </div>

                <div className="h-px bg-[#E5E7EB]"></div>

                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-[#1E1548] mb-1">Conseils et astuces</p>
                    <p className="text-sm text-[#6B7280]">
                      Conseils personnalisés pour améliorer votre parcours
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.tips}
                      onChange={(e) => handleNotificationChange('tips', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#E5E7EB] peer-focus:ring-2 peer-focus:ring-[#FFD600] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#10B981]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Notification Settings */}
            <div className="flex justify-end">
              <Button>
                Enregistrer les préférences
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Photo Modal */}
      {showDeletePhotoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-[22px] font-bold text-[#1E1548] text-center mb-3">
              Supprimer la photo ?
            </h3>
            <p className="text-[14px] text-[#6B7280] text-center leading-[22px] mb-8">
              Cette action est irréversible. Votre photo de profil sera définitivement supprimée.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeletePhotoModal(false)}
                disabled={isDeletingPhoto}
                className="flex-1 h-12 bg-white border border-[rgba(30,21,72,0.15)] text-[#1E1548] rounded-[12px] text-[15px] font-semibold hover:bg-[#F8F9FD] transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDeletePhoto}
                disabled={isDeletingPhoto}
                className="flex-1 h-12 bg-red-500 text-white rounded-[12px] text-[15px] font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeletingPhoto ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Suppression...
                  </>
                ) : 'Supprimer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl">
            {/* Icon */}
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>

            {/* Title */}
            <h3 className="text-[22px] font-bold text-[#1E1548] text-center mb-3">
              Supprimer mon compte
            </h3>
            <p className="text-[14px] text-[#6B7280] text-center leading-[22px] mb-2">
              Cette action est <span className="font-semibold text-red-600">irréversible</span>. Toutes tes données seront définitivement supprimées :
            </p>
            <ul className="text-[13px] text-[#6B7280] space-y-1 mb-8 bg-[#F8F9FD] rounded-[12px] p-4">
              <li>• Progression des modules</li>
              <li>• Suivi des offres</li>
              <li>• CV et documents</li>
              <li>• Informations de profil</li>
            </ul>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 h-12 bg-white border border-[rgba(30,21,72,0.15)] text-[#1E1548] rounded-[12px] text-[15px] font-semibold hover:bg-[#F8F9FD] transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={isDeleting}
                className="flex-1 h-12 bg-red-500 text-white rounded-[12px] text-[15px] font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Suppression...
                  </>
                ) : 'Supprimer définitivement'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}