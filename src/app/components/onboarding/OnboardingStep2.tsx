import { useState } from 'react';
import { CheckCircle2, FileText, Linkedin, Search, Target, TrendingUp, ArrowLeft } from 'lucide-react';

interface OnboardingStep2Props {
  formationData: any;
  onComplete: (data: any) => void;
  onBack?: () => void;
}

const skillsOptions = [
  'Communication',
  'Travail en équipe',
  'Organisation',
  'Adaptabilité',
  'Résolution de problèmes',
  'Gestion du temps',
  'Leadership',
  'Créativité'
];

const situationOptions = [
  { id: 'cv_none', label: 'Je n\'ai pas encore de CV', value: 0 },
  { id: 'cv_draft', label: 'J\'ai un brouillon de CV', value: 1 },
  { id: 'cv_ready', label: 'Mon CV est prêt', value: 2 }
];

const linkedinOptions = [
  { id: 'ln_none', label: 'Pas de profil LinkedIn', value: 0 },
  { id: 'ln_basic', label: 'Profil basique', value: 1 },
  { id: 'ln_complete', label: 'Profil complet et optimisé', value: 2 }
];

const searchOptions = [
  { id: 'search_none', label: 'Je n\'ai pas commencé', value: 0 },
  { id: 'search_started', label: 'J\'ai quelques pistes', value: 1 },
  { id: 'search_active', label: 'Recherche active en cours', value: 2 }
];

export function OnboardingStep2({ formationData, onComplete, onBack }: OnboardingStep2Props) {
  const [step, setStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [cvStatus, setCvStatus] = useState<number | null>(null);
  const [linkedinStatus, setLinkedinStatus] = useState<number | null>(null);
  const [searchStatus, setSearchStatus] = useState<number | null>(null);
  const [weeklyHours, setWeeklyHours] = useState<number>(10);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleContinueToStep2 = () => {
    if (selectedSkills.length >= 3) {
      setStep(2);
    }
  };

  const handleComplete = () => {
    if (cvStatus !== null && linkedinStatus !== null && searchStatus !== null) {
      // Calculate action plan duration based on status
      const totalScore = cvStatus + linkedinStatus + searchStatus;
      let planWeeks = 20; // Default
      
      if (totalScore <= 2) planWeeks = 35; // Débutant complet
      else if (totalScore <= 4) planWeeks = 24; // Intermédiaire
      else planWeeks = 16; // Avancé

      onComplete({
        skills: selectedSkills,
        cvStatus,
        linkedinStatus,
        searchStatus,
        weeklyHours,
        planWeeks
      });
    }
  };

  const isStep2Valid = cvStatus !== null && linkedinStatus !== null && searchStatus !== null;

  // Step 1: Compétences transférables
  if (step === 1) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-8">
        <div className="w-full max-w-[800px]">
          {/* Progress indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-medium text-[#6B7280]">
                Étape 3/3 : Évaluation initiale
              </span>
              <span className="text-[14px] font-medium text-[#1E1548]">50%</span>
            </div>
            <div className="w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD600] w-1/2 transition-all duration-300" />
            </div>
          </div>

          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-[#FFD600]" />
            </div>
            <h2 className="text-[32px] font-bold leading-[40px] text-[#1E1548] mb-4">
              Quelles sont tes compétences transférables ?
            </h2>
            <p className="text-[16px] font-normal leading-[24px] text-[#6B7280]">
              Sélectionne au moins 3 compétences qui te caractérisent (quel que soit ton parcours)
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {skillsOptions.map((skill) => (
              <button
                key={skill}
                onClick={() => toggleSkill(skill)}
                className={`
                  h-12 rounded-[12px] text-[14px] font-medium transition-all
                  ${selectedSkills.includes(skill)
                    ? 'bg-[#FFD600] text-[#1E1548] shadow-sm'
                    : 'bg-white border border-[rgba(30,21,72,0.1)] text-[#1E1548] hover:border-[#FFD600]'
                  }
                `}
              >
                {skill}
              </button>
            ))}
          </div>

          <div className="text-center">
            <p className="text-[14px] font-normal text-[#6B7280] mb-4">
              {selectedSkills.length}/3 compétences minimum sélectionnées
            </p>
            <button
              onClick={handleContinueToStep2}
              disabled={selectedSkills.length < 3}
              className={`
                h-12 px-8 rounded-[12px] text-[16px] font-semibold transition-all
                ${selectedSkills.length >= 3
                  ? 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'
                  : 'bg-[#E8ECFF] text-[#6B7280] cursor-not-allowed'
                }
              `}
            >
              Continuer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Situation actuelle
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-8">
      <div className="w-full max-w-[900px]">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[14px] font-medium text-[#6B7280]">
              Étape 3/3 : Évaluation initiale
            </span>
            <span className="text-[14px] font-medium text-[#1E1548]">100%</span>
          </div>
          <div className="w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
            <div className="h-full bg-[#FFD600] w-full transition-all duration-300" />
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="w-8 h-8 text-[#FFD600]" />
          </div>
          <h2 className="text-[32px] font-bold leading-[40px] text-[#1E1548] mb-4">
            Où en es-tu dans ta recherche ?
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#6B7280]">
            Ces informations nous aideront à créer ton plan d'action personnalisé
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {/* CV Status */}
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-[#FFD600]" />
              </div>
              <h4 className="text-[18px] font-semibold text-[#1E1548]">
                Ton CV
              </h4>
            </div>
            <div className="space-y-2">
              {situationOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setCvStatus(option.value)}
                  className={`
                    w-full text-left p-4 rounded-[12px] transition-all flex items-center justify-between
                    ${cvStatus === option.value
                      ? 'bg-[#FFD600] text-[#1E1548]'
                      : 'bg-[#F8F9FD] text-[#1E1548] hover:bg-[#E8ECFF]'
                    }
                  `}
                >
                  <span className="text-[14px] font-medium">{option.label}</span>
                  {cvStatus === option.value && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* LinkedIn Status */}
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                <Linkedin className="w-5 h-5 text-[#FFD600]" />
              </div>
              <h4 className="text-[18px] font-semibold text-[#1E1548]">
                Ton profil LinkedIn
              </h4>
            </div>
            <div className="space-y-2">
              {linkedinOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setLinkedinStatus(option.value)}
                  className={`
                    w-full text-left p-4 rounded-[12px] transition-all flex items-center justify-between
                    ${linkedinStatus === option.value
                      ? 'bg-[#FFD600] text-[#1E1548]'
                      : 'bg-[#F8F9FD] text-[#1E1548] hover:bg-[#E8ECFF]'
                    }
                  `}
                >
                  <span className="text-[14px] font-medium">{option.label}</span>
                  {linkedinStatus === option.value && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Search Status */}
          <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-[#FFD600]" />
              </div>
              <h4 className="text-[18px] font-semibold text-[#1E1548]">
                Ta recherche d'alternance
              </h4>
            </div>
            <div className="space-y-2">
              {searchOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSearchStatus(option.value)}
                  className={`
                    w-full text-left p-4 rounded-[12px] transition-all flex items-center justify-between
                    ${searchStatus === option.value
                      ? 'bg-[#FFD600] text-[#1E1548]'
                      : 'bg-[#F8F9FD] text-[#1E1548] hover:bg-[#E8ECFF]'
                    }
                  `}
                >
                  <span className="text-[14px] font-medium">{option.label}</span>
                  {searchStatus === option.value && (
                    <CheckCircle2 className="w-5 h-5" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setStep(1)}
            className="h-12 px-6 bg-white border border-[rgba(30,21,72,0.1)] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#F8F9FD] transition-colors"
          >
            Retour
          </button>
          <button
            onClick={handleComplete}
            disabled={!isStep2Valid}
            className={`
              flex-1 h-12 px-8 rounded-[12px] text-[16px] font-semibold transition-all
              ${isStep2Valid
                ? 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'
                : 'bg-[#E8ECFF] text-[#6B7280] cursor-not-allowed'
              }
            `}
          >
            Créer mon plan d'action
          </button>
        </div>
      </div>
    </div>
  );
}