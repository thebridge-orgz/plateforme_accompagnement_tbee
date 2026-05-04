import { useState } from 'react';
import { User, Phone, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { FormInput } from '../FormInput';

export interface PersonalInfoData {
  firstName: string;
  lastName: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  postalCode: string;
  currentLevel: string;
}

interface OnboardingPersonalInfoProps {
  initialFirstName?: string;
  initialLastName?: string;
  initialPhone?: string;
  initialBirthDate?: string;
  initialAaddress?: string;
  initialCity?: string;
  initialpostalCode?: string;
  initialCurrentLevel?: string;
  onComplete: (data: PersonalInfoData) => void;
}

const levelOptions = ['Bac', 'Bac+1', 'Bac+2', 'Bac+3', 'Bac+4', 'Bac+5', 'Autre'];

export function OnboardingPersonalInfo({ initialFirstName = '', initialLastName = '', initialPhone = '', initialBirthDate = '', initialAaddress = '', initialCity = '', initialpostalCode = '', initialCurrentLevel = '', onComplete }: OnboardingPersonalInfoProps) {
  const [formData, setFormData] = useState<PersonalInfoData>({
    firstName: initialFirstName,
    lastName: initialLastName,
    phone: initialPhone,
    birthDate: initialBirthDate,
    address: initialCity,
    city: initialAaddress,
    postalCode: initialpostalCode,
    currentLevel: initialCurrentLevel
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PersonalInfoData, string>>>({});

  const handleChange = (field: keyof PersonalInfoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof PersonalInfoData, string>> = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis';
    else if (formData.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Numéro de téléphone invalide (10 chiffres min.)';
    if (!formData.birthDate) newErrors.birthDate = 'La date de naissance est requise';
    if (!formData.address.trim()) newErrors.address = "L'adresse est requise";
    if (!formData.city.trim()) newErrors.city = 'La ville est requise';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Le code postal est requis';
    else if (!/^\d{5}$/.test(formData.postalCode)) newErrors.postalCode = 'Code postal invalide (5 chiffres)';
    if (!formData.currentLevel) newErrors.currentLevel = "Le niveau d'études est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) onComplete(formData);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <div className="w-full max-w-[700px]">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-medium text-[#6B7280]">
              Étape 1/3 : Informations personnelles
            </span>
            <span className="text-[14px] font-medium text-[#1E1548]">33%</span>
          </div>
          <div className="w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
            <div className="h-full bg-[#FFD600] transition-all duration-300" style={{ width: '33%' }} />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-[32px] font-bold leading-[40px] text-[#1E1548] mb-4">
            Tes informations personnelles
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#6B7280]">
            Ces informations nous permettent de personnaliser ton accompagnement
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Prénom *"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              placeholder="Prénom"
              icon={<User className="w-4 h-4" />}
              error={errors.firstName}
            />
            <FormInput
              label="Nom *"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              placeholder="Nom"
              icon={<User className="w-4 h-4" />}
              error={errors.lastName}
            />
          </div>

          <FormInput
            label="Téléphone *"
            type="tel"
            inputMode="numeric"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, ''))}
            placeholder="0612345678"
            icon={<Phone className="w-4 h-4" />}
            error={errors.phone}
          />

          <FormInput
            label="Date de naissance *"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleChange('birthDate', e.target.value)}
            icon={<Calendar className="w-4 h-4" />}
            error={errors.birthDate}
          />

          <FormInput
            label="Adresse *"
            type="text"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="12 rue des Lilas"
            icon={<MapPin className="w-4 h-4" />}
            error={errors.address}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Ville *"
              type="text"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Paris"
              error={errors.city}
            />
            <FormInput
              label="Code postal *"
              type="text"
              inputMode="numeric"
              value={formData.postalCode}
              onChange={(e) => handleChange('postalCode', e.target.value.replace(/\D/g, '').slice(0, 5))}
              placeholder="75001"
              error={errors.postalCode}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-foreground">
              Niveau d'études *
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <GraduationCap className="w-4 h-4" />
              </div>
              <select
                value={formData.currentLevel}
                onChange={(e) => handleChange('currentLevel', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-input-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all appearance-none ${
                  errors.currentLevel ? 'border-destructive' : 'border-border'
                }`}
              >
                <option value="" disabled>Sélectionner un niveau</option>
                {levelOptions.map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            {errors.currentLevel && (
              <p style={{ fontSize: '14px', lineHeight: '22px' }} className="text-destructive">
                {errors.currentLevel}
              </p>
            )}
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            className="h-12 px-8 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-colors"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
}
