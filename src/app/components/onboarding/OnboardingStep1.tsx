import { useState } from 'react';
import { ChevronRight, Search, Target, ArrowLeft, Palette, TrendingUp, Globe, Briefcase, Cpu, Megaphone } from 'lucide-react';

interface OnboardingStep1Props {
  onComplete: (data: { hasFormation: boolean; formationChoice?: string; questionnaireResults?: any }) => void;
}

const formations = [
  { id: 'ux-ui', name: 'UX/UI Design', Icon: Palette },
  { id: 'traffic', name: 'Traffic Management', Icon: TrendingUp },
  { id: 'seo', name: 'SEO', Icon: Globe },
  { id: 'business-dev', name: 'Business Dev', Icon: Briefcase },
  { id: 'ia-nocode', name: 'IA & No code', Icon: Cpu },
  { id: 'marketing', name: 'Marketing digital', Icon: Megaphone },
];

const questionnaireQuestions = [
  {
    id: 'q1',
    question: 'Qu\'est-ce qui t\'intéresse le plus ?',
    options: [
      { value: 'create', label: 'Créer des applications/sites web', formations: ['web', 'ux'] },
      { value: 'analyze', label: 'Analyser des données', formations: ['data'] },
      { value: 'secure', label: 'Sécuriser des systèmes', formations: ['cybersec'] },
      { value: 'manage', label: 'Gérer des projets tech', formations: ['product', 'devops'] }
    ]
  },
  {
    id: 'q2',
    question: 'Tu préfères travailler sur :',
    options: [
      { value: 'visual', label: 'L\'aspect visuel', formations: ['web', 'ux'] },
      { value: 'logic', label: 'La logique et les algorithmes', formations: ['web', 'data', 'devops'] },
      { value: 'security', label: 'La protection et sécurité', formations: ['cybersec'] },
      { value: 'strategy', label: 'La stratégie produit', formations: ['product'] }
    ]
  }
];

export function OnboardingStep1({ onComplete }: OnboardingStep1Props) {
  const [choice, setChoice] = useState<'know' | 'dontknow' | null>(null);
  const [selectedFormation, setSelectedFormation] = useState<string>('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const handleKnowChoice = () => {
    setChoice('know');
  };

  const handleDontKnowChoice = () => {
    setChoice('dontknow');
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const handleFormationSelect = (formationId: string) => {
    setSelectedFormation(formationId);
  };

  const handleFormationSubmit = () => {
    if (selectedFormation) {
      onComplete({
        hasFormation: true,
        formationChoice: selectedFormation
      });
    }
  };

  const handleQuestionAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questionnaireQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate suggested formation based on answers
      const formationScores: Record<string, number> = {};
      
      questionnaireQuestions.forEach((q, index) => {
        const selectedOption = q.options.find(opt => opt.value === newAnswers[index]);
        selectedOption?.formations.forEach(f => {
          formationScores[f] = (formationScores[f] || 0) + 1;
        });
      });

      const suggestedFormation = Object.keys(formationScores).sort(
        (a, b) => formationScores[b] - formationScores[a]
      )[0];

      onComplete({
        hasFormation: false,
        questionnaireResults: {
          answers: newAnswers,
          suggestedFormation
        }
      });
    }
  };

  // Initial choice screen
  if (choice === null) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-8">
        <div className="w-full max-w-[800px]">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-medium text-[#6B7280]">Étape 2/3 : Ton orientation</span>
              <span className="text-[14px] font-medium text-[#1E1548]">66%</span>
            </div>
            <div className="w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD600] transition-all duration-300" style={{ width: '66%' }} />
            </div>
          </div>
          <div className="text-center mb-12">
            <h1 className="text-[48px] font-bold leading-[56px] text-[#1E1548] mb-4">
              Bienvenue sur TBEE ! 👋
            </h1>
            <p className="text-[16px] font-normal leading-[24px] text-[#6B7280]">
              Commençons par définir ton parcours d'alternance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Choice 1: Je sais */}
            <button
              onClick={handleKnowChoice}
              className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-8 text-left hover:border-[#FFD600] hover:shadow-lg transition-all group"
            >
              <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FFD600] transition-colors">
                <Target className="w-8 h-8 text-[#1E1548]" />
              </div>
              <h3 className="text-[24px] font-semibold leading-[32px] text-[#1E1548] mb-3">
                J'ai déjà une formation en tête
              </h3>
              <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-4">
                Je connais le domaine que je veux poursuivre et je suis prêt(e) à commencer
              </p>
              <div className="flex items-center gap-2 text-[#1E1548] font-medium">
                <span>Choisir ma formation</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>

            {/* Choice 2: Je ne sais pas */}
            <button
              onClick={handleDontKnowChoice}
              className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-8 text-left hover:border-[#FFD600] hover:shadow-lg transition-all group"
            >
              <div className="w-16 h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#FFD600] transition-colors">
                <Search className="w-8 h-8 text-[#1E1548]" />
              </div>
              <h3 className="text-[24px] font-semibold leading-[32px] text-[#1E1548] mb-3">
                Je ne sais pas encore
              </h3>
              <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-4">
                J'ai besoin d'aide pour trouver la formation qui me correspond le mieux
              </p>
              <div className="flex items-center gap-2 text-[#1E1548] font-medium">
                <span>Faire le questionnaire</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Formation selection screen
  if (choice === 'know') {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-8">
        <div className="w-full max-w-[900px]">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-medium text-[#6B7280]">Étape 2/3 : Ton orientation</span>
              <span className="text-[14px] font-medium text-[#1E1548]">66%</span>
            </div>
            <div className="w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD600] transition-all duration-300" style={{ width: '66%' }} />
            </div>
          </div>
          {/* Bouton retour */}
          <button
            onClick={() => setChoice(null)}
            className="mb-8 flex items-center gap-2 text-[#6B7280] hover:text-[#1E1548] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[14px] font-medium">Retour</span>
          </button>

          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold leading-[40px] text-[#1E1548] mb-4">
              Quelle formation t'intéresse ?
            </h2>
            <p className="text-[16px] font-normal leading-[24px] text-[#6B7280]">
              Sélectionne le domaine dans lequel tu souhaites te former
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {formations.map((formation) => (
              <button
                key={formation.id}
                onClick={() => handleFormationSelect(formation.id)}
                className={`
                  bg-white border rounded-[16px] p-6 text-center transition-all
                  ${selectedFormation === formation.id
                    ? 'border-[#FFD600] bg-[#FFD600]/10 shadow-lg'
                    : 'border-[rgba(30,21,72,0.1)] hover:border-[#FFD600]/50'
                  }
                `}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${
                  selectedFormation === formation.id ? 'bg-[#FFD600]' : 'bg-[#E8ECFF]'
                }`}>
                  <formation.Icon className={`w-7 h-7 ${
                    selectedFormation === formation.id ? 'text-[#1E1548]' : 'text-[#1E1548]'
                  }`} />
                </div>
                <h4 className="text-[16px] font-semibold leading-[24px] text-[#1E1548]">
                  {formation.name}
                </h4>
              </button>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleFormationSubmit}
              disabled={!selectedFormation}
              className={`
                h-12 px-8 rounded-[12px] text-[16px] font-semibold transition-all
                ${selectedFormation
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

  // Questionnaire screen
  if (choice === 'dontknow') {
    const currentQ = questionnaireQuestions[currentQuestion];
    const progress = ((currentQuestion) / questionnaireQuestions.length) * 100;

    const handleBack = () => {
      if (currentQuestion > 0) {
        // Retour à la question précédente
        setCurrentQuestion(currentQuestion - 1);
        setAnswers(answers.slice(0, -1));
      } else {
        // Retour au choix initial
        setChoice(null);
        setCurrentQuestion(0);
        setAnswers([]);
      }
    };

    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-8">
        <div className="w-full max-w-[700px]">
          {/* Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-medium text-[#6B7280]">Étape 2/3 : Ton orientation</span>
              <span className="text-[14px] font-medium text-[#1E1548]">66%</span>
            </div>
            <div className="w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
              <div className="h-full bg-[#FFD600] transition-all duration-300" style={{ width: '66%' }} />
            </div>
          </div>
          {/* Bouton retour */}
          <button
            onClick={handleBack}
            className="mb-8 flex items-center gap-2 text-[#6B7280] hover:text-[#1E1548] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[14px] font-medium">
              {currentQuestion > 0 ? 'Question précédente' : 'Retour'}
            </span>
          </button>

          {/* Progress 
          <div className="mb-12">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-medium text-[#6B7280]">
                Question {currentQuestion + 1} sur {questionnaireQuestions.length}
              </span>
              <span className="text-[14px] font-medium text-[#1E1548]">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full h-2 bg-[#E8ECFF] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#FFD600] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>*/}

          <div className="text-center mb-8">
            <h2 className="text-[32px] font-bold leading-[40px] text-[#1E1548] mb-4">
              {currentQ.question}
            </h2>
            <p className="text-[16px] font-normal leading-[24px] text-[#6B7280]">
              Choisis l'option qui te correspond le mieux
            </p>
          </div>

          <div className="space-y-4">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleQuestionAnswer(option.value)}
                className="w-full bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6 text-left hover:border-[#FFD600] hover:shadow-lg transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-medium text-[#1E1548]">
                    {option.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#6B7280] group-hover:text-[#FFD600] transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}