import { useState, useEffect } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, FileText, Lock, Play, Trophy, Upload, Video, X, FileImage, Link2, ClipboardList, CheckSquare } from 'lucide-react';
import { routes } from '../../app/router/routes';
import { Link } from 'react-router-dom';
import { useModules } from '../../hooks/useModules';

interface ModuleLinearPageProps {
  moduleId: string;
}

// Structure statique des contenus de modules (sera remplacé par Supabase)
export const moduleStaticContent: Record<string, any> = {
  'week1': {
    weekNumber: 1,
    title: 'Identifier mon projet',
    description: 'Clarifier tes objectifs et découvrir les formations The Bridge',
    estimatedHours: '4h',
    steps: [
      {
        id: 'step1',
        type: 'video',
        title: 'Bienvenue dans ton parcours',
        description: 'Introduction au programme et à la plateforme',
        duration: '8min',
        content: { videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', pdfUrl: null }
      },
      {
        id: 'step2',
        type: 'video',
        title: 'Les formations The Bridge',
        description: 'Découvre tous les domaines proposés',
        duration: '15min',
        content: { videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', pdfUrl: '/pdf/formations.pdf' }
      },
      {
        id: 'step3',
        type: 'exercise',
        title: 'Test de positionnement',
        description: 'Évalue tes compétences et objectifs',
        duration: '20min',
        content: { questions: ['Question 1...', 'Question 2...'] }
      },
      {
        id: 'step4',
        type: 'upload',
        title: 'Questionnaire projet',
        description: 'Partage ton projet professionnel',
        duration: '15min',
        content: { acceptedFormats: ['.pdf', '.doc', '.docx'] }
      },
      {
        id: 'step5',
        type: 'video',
        title: 'Plan d\'action personnalisé',
        description: 'Validation de ton parcours',
        duration: '10min',
        content: { videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw' }
      }
    ]
  },
  'week2': {
    weekNumber: 2,
    title: 'Construire mon CV',
    description: 'CV, LinkedIn et stratégies de recherche',
    estimatedHours: '6h',
    steps: [
      {
        id: 'step1',
        type: 'video',
        title: 'Les fondamentaux du CV',
        description: 'Structure, mise en page et contenu',
        duration: '12min',
        content: { videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw', pdfUrl: '/pdf/cv-guide.pdf' }
      },
      {
        id: 'step2',
        type: 'upload',
        title: 'Upload ton CV',
        description: 'Envoie ton CV pour validation',
        duration: '5min',
        reviewStatus: 'pending',
        content: { acceptedFormats: ['.pdf'] }
      },
      {
        id: 'step3',
        type: 'video',
        title: 'Optimiser son LinkedIn',
        description: 'Bonnes pratiques et visibilité',
        duration: '15min',
        content: { videoUrl: '#', pdfUrl: '/pdf/linkedin-guide.pdf' }
      },
      {
        id: 'step4',
        type: 'text',
        title: 'Lien LinkedIn',
        description: 'Renseigne l\'URL de ton profil',
        duration: '2min',
        reviewStatus: null,
        content: { placeholder: 'https://linkedin.com/in/...' }
      },
      {
        id: 'step5',
        type: 'video',
        title: 'Le marché caché',
        description: 'Stratégies de recherche efficaces',
        duration: '18min',
        content: { videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw' }
      },
      {
        id: 'step6',
        type: 'exercise',
        title: 'Identifier 5 offres pertinentes',
        description: 'Alimentation de ta base de candidatures',
        duration: '30min',
        content: {}
      },
      {
        id: 'step7',
        type: 'video',
        title: 'Lettres de motivation efficaces',
        description: 'Personnalisation et impact',
        duration: '12min',
        content: { videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw' }
      },
      {
        id: 'step8',
        type: 'exercise',
        title: 'Rédiger ta première lettre',
        description: 'Exercice pratique',
        duration: '25min',
        content: {}
      }
    ]
  },
  'week3': {
    weekNumber: 3,
    title: 'Rechercher mon entreprise',
    description: 'Apprends à chercher et cibler les bonnes entreprises',
    estimatedHours: '5h',
    steps: [
      {
        id: 'step1',
        type: 'video',
        title: 'Comprendre le marché de l\'alternance',
        description: 'Vue d\'ensemble des opportunités',
        duration: '15min',
        content: { videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw' }
      },
      {
        id: 'step2',
        type: 'video',
        title: 'Identifier les entreprises cibles',
        description: 'Méthodologie de recherche',
        duration: '12min',
        content: { videoUrl: '#' }
      },
      {
        id: 'step3',
        type: 'exercise',
        title: 'Créer ta liste d\'entreprises',
        description: 'Exercice pratique de ciblage',
        duration: '30min',
        content: {}
      },
      {
        id: 'step4',
        type: 'video',
        title: 'Utiliser les réseaux sociaux',
        description: 'LinkedIn, Twitter et autres plateformes',
        duration: '18min',
        content: { videoUrl: '#' }
      },
      {
        id: 'step5',
        type: 'text',
        title: 'Préparer ton approche',
        description: 'Template de message de prise de contact',
        duration: '20min',
        content: {}
      }
    ]
  },
  'week4': {
    weekNumber: 4,
    title: 'Réussir mon entretien',
    description: 'Maîtrise les techniques d\'entretien et décroche ton contrat',
    estimatedHours: '4h',
    steps: [
      {
        id: 'step1',
        type: 'video',
        title: 'Les fondamentaux de l\'entretien',
        description: 'Comprendre les attentes des recruteurs',
        duration: '15min',
        content: { videoUrl: '#' }
      },
      {
        id: 'step2',
        type: 'video',
        title: 'Construire son pitch',
        description: 'Structure et contenu',
        duration: '12min',
        content: { videoUrl: '#' }
      },
      {
        id: 'step3',
        type: 'exercise',
        title: 'Rédiger ton pitch',
        description: 'Exercice de préparation',
        duration: '20min',
        content: {}
      }
    ]
  }
};

export function ModuleLinearPage({ moduleId }: ModuleLinearPageProps) {
  const { modules, totalCount, nextModule, startModule, updateProgress, updateCompletedSteps, completeModule, unlockModule } = useModules();

  // Trouver le module dans le contexte UserData
  const userModule = modules.find(module => module.id === moduleId);
  //console.log('userModule', userModule);

  const staticModule = moduleStaticContent[`week${userModule?.weekNumber}`];

  // Priorité aux ressources admin sur le contenu statique codé en dur.
  // Cela rend les modules créés via l'interface admin pleinement fonctionnels.
  const adminResources = Array.isArray(userModule?.resources) && (userModule?.resources?.length ?? 0) > 0
    ? userModule!.resources!
    : null;

  const effectiveContent = adminResources
    ? {
        steps: adminResources.map(r => ({
          id: r.id,
          type: r.type,
          title: r.title,
          description: r.description || '',
          duration: r.duration || '–',
          content: r,
        })),
      }
    : staticModule;

  // Initialiser avec les steps déjà complétés (persistés en DB)
  const [completedStepsLocal, setCompletedStepsLocal] = useState<string[]>(
    () => userModule?.completedSteps ?? []
  );
  const [activeStepId, setActiveStepId] = useState<string | null>(null);
  // Garde pour savoir si on a déjà initialisé depuis la DB (évite d'écraser au re-render)
  const [initialized, setInitialized] = useState(false);
  // Popup félicitation fin de parcours
  const [showCelebration, setShowCelebration] = useState(false);

  // Ce module est-il le dernier du parcours ?
  const moduleIndex = modules.findIndex(m => m.id === moduleId);
  const isLastModule = totalCount > 0 && moduleIndex === totalCount - 1;

  // -------------------- INITIALIZATION --------------------

  useEffect(() => {
    if (userModule && effectiveContent) {
      // Démarrer le module s'il est disponible mais pas encore commencé
      if (userModule.status === 'available') {
        startModule(userModule.id);
      }

      // Charger les steps persistés en DB (une seule fois au montage)
      if (!initialized) {
        const persisted = userModule.completedSteps ?? [];
        setCompletedStepsLocal(persisted);
        setInitialized(true);

        // Reprendre à la première étape non complétée, ou la première
        const firstIncomplete = effectiveContent.steps.find(
          (s: any) => !persisted.includes(s.id)
        );
        setActiveStepId(firstIncomplete?.id ?? effectiveContent.steps[0]?.id ?? null);
      }
    }
  }, [userModule, effectiveContent, startModule, initialized]);

  // -------------------- HANDLERS --------------------

  const handleCompleteStep = async (stepId: string) => {
    if (!userModule || !effectiveContent) return;

    const step = effectiveContent.steps.find((step: any) => step.id === stepId);
    if (!step) return;

    if (!completedStepsLocal.includes(stepId)) {
      const newCompleted = [...completedStepsLocal, stepId];
      setCompletedStepsLocal(newCompleted);

      try {
        updateCompletedSteps(userModule.id, newCompleted);

        const totalSteps = effectiveContent.steps.length;
        const completedCount = newCompleted.length;
        const newProgress = Math.round((completedCount / totalSteps) * 100);

        updateProgress(userModule.id, newProgress);

        if (completedCount === totalSteps) {
          completeModule(userModule.id);
          if (!isLastModule && nextModule) unlockModule(nextModule.id);
          if (isLastModule) {
            setTimeout(() => setShowCelebration(true), 600);
          }
        }

        const currentIndex = effectiveContent.steps.findIndex((s: any) => s.id === stepId);
        if (currentIndex < effectiveContent.steps.length - 1) {
          setActiveStepId(effectiveContent.steps[currentIndex + 1].id);
        }
      } catch (error: any) {
        alert(`Erreur sauvegarde progression: ${error?.message || JSON.stringify(error)}`);
      }
    }
  };

  // -------------------- RENDER HELPERS --------------------

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'exercise': return <FileText className="w-5 h-5" />;
      case 'upload': return <Upload className="w-5 h-5" />;
      case 'text': return <FileText className="w-5 h-5" />;
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'image': return <FileImage className="w-5 h-5" />;
      case 'link': return <Link2 className="w-5 h-5" />;
      case 'form': return <ClipboardList className="w-5 h-5" />;
      case 'quiz': return <CheckSquare className="w-5 h-5" />;
      default: return <Play className="w-5 h-5" />;
    }
  };

  const getStepStatus = (stepId: string, index: number) => {
    if (completedStepsLocal.includes(stepId)) return 'completed';
    if (index === 0 || completedStepsLocal.includes(effectiveContent!.steps[index - 1]?.id)) {
      return 'available';
    }
    return 'locked';
  };

  // -------------------- GUARDS --------------------

  if (!userModule || userModule.status === 'locked' || !effectiveContent) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[16px] text-[#6B7280]">Ce module n'est pas encore disponible</p>
          <Link to={routes.StudentDashboard.path}>
            <button
              className="mt-4 text-[#FFD600] hover:underline"
            >
              Retour au dashboard
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // -------------------- COMPUTED VALUES --------------------

  const activeStep = effectiveContent.steps.find((s: any) => s.id === activeStepId);

  // -------------------- RENDER --------------------

  return (
    <>
      <div className="min-h-screen bg-[#F8F9FD] pb-16">
        {/* Header */}
        <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="flex items-start gap-3 sm:gap-6">
              <Link to={routes.StudentModules.path}>
                <button
                  className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
                  aria-label="Retour"
                >
                  <ChevronLeft className="w-5 h-5 text-[#1E1548]" />
                </button>
              </Link>

              <div className="flex-1 min-w-0">
                <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                  {userModule.title}
                </h1>
                <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                  {userModule.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1152px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8">
          {/* Progress Bar */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between text-[13px] font-medium text-[#6B7280] mb-2">
              <span>Progression du module</span>
              <span className="font-bold text-[#1E1548]">{userModule.progress}%</span>
            </div>
            <div className="relative w-full h-3 bg-[#E8ECFF] rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-[#FFD600] rounded-full transition-all duration-300"
                style={{ width: `${userModule.progress}%` }}
              />
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Steps List (Sidebar) */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6 lg:sticky lg:top-8">
                <h4 className="text-[16px] sm:text-[18px] font-semibold text-[#1E1548] mb-4">
                  Étapes du module
                </h4>
                <div className="space-y-2">
                  {effectiveContent.steps.map((step: any, index: number) => {
                    const status = getStepStatus(step.id, index);
                    const isLocked = status === 'locked';
                    const isCompleted = status === 'completed';
                    const isActive = step.id === activeStepId;
                    const isAvailable = status === 'available';

                    return (
                      <button
                        key={step.id}
                        onClick={() => !isLocked && setActiveStepId(step.id)}
                        disabled={isLocked}
                        className={`
                        w-full text-left p-3 sm:p-4 rounded-[12px] transition-all
                        ${isActive
                            ? 'bg-[#FFD600] shadow-sm'
                            : isCompleted
                              ? 'bg-[#D1FAE5] hover:bg-[#D1FAE5]/80'
                              : isAvailable
                                ? 'bg-[#E8ECFF] hover:bg-[#E8ECFF]/80'
                                : 'bg-[#F8F9FD] opacity-60 cursor-not-allowed'
                          }
                      `}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 mt-0.5">
                            {isCompleted ? (
                              <CheckCircle2 className={`w-5 h-5 ${isActive ? 'text-[#1E1548]' : 'text-[#10B981]'}`} />
                            ) : isLocked ? (
                              <Lock className="w-5 h-5 text-[#6B7280]" />
                            ) : (
                              <div className={`w-5 h-5 rounded-full border-2 ${isActive ? 'border-[#1E1548]' : 'border-[#6B7280]'
                                }`} />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-[13px] sm:text-[14px] font-medium leading-[18px] sm:leading-[20px] mb-1 ${isActive ? 'text-[#1E1548]' : isLocked ? 'text-[#6B7280]' : 'text-[#1E1548]'
                              }`}>
                              {step.title}
                            </p>
                            <div className="flex items-center gap-2">
                              <div className={isActive ? 'text-[#1E1548]' : 'text-[#6B7280]'}>
                                {getStepIcon(step.type)}
                              </div>
                              <span className={`text-[11px] sm:text-[12px] font-normal ${isActive ? 'text-[#1E1548]' : 'text-[#6B7280]'
                                }`}>
                                {step.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              {activeStep && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Step Header */}
                  <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#E8ECFF] rounded-full flex items-center justify-center">
                            {getStepIcon(activeStep.type)}
                          </div>
                          <span className="text-[12px] sm:text-[14px] font-medium text-[#6B7280]">
                            {activeStep.type === 'video'    && 'Vidéo'}
                            {activeStep.type === 'exercise' && 'Exercice'}
                            {activeStep.type === 'upload'   && 'Upload'}
                            {activeStep.type === 'text'     && 'Saisie'}
                            {activeStep.type === 'pdf'      && 'Document PDF'}
                            {activeStep.type === 'image'    && 'Image'}
                            {activeStep.type === 'link'     && 'Lien externe'}
                            {activeStep.type === 'form'     && 'Formulaire'}
                            {activeStep.type === 'quiz'     && 'Quiz QCM'}
                          </span>
                        </div>
                        <h3 className="text-[20px] sm:text-[24px] font-semibold leading-[28px] sm:leading-[32px] text-[#1E1548] mb-2">
                          {activeStep.title}
                        </h3>
                        <p className="text-[13px] sm:text-[14px] font-normal leading-[18px] sm:leading-[20px] text-[#6B7280] mb-4">
                          {activeStep.description}
                        </p>
                        <div className="flex items-center gap-2 text-[12px] sm:text-[14px] text-[#6B7280]">
                          <Clock className="w-4 h-4" />
                          <span>{activeStep.duration}</span>
                        </div>
                      </div>
                      {completedStepsLocal.includes(activeStep.id) && (
                        <div className="flex items-center gap-2 text-[#10B981] bg-[#D1FAE5] px-3 py-1.5 rounded-full">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-[12px] sm:text-[14px] font-medium">Terminé</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step Content */}
                  {activeStep.type === 'video' && (
                    <div className="space-y-4 sm:space-y-6">
                      {/* Video Player — accepte videoUrl (statique) ou url (admin) */}
                      {(activeStep.content?.videoUrl || activeStep.content?.url) &&
                       (activeStep.content?.videoUrl || activeStep.content?.url) !== '#' ? (
                        <div className="rounded-[16px] overflow-hidden aspect-video">
                          <iframe
                            src={activeStep.content?.videoUrl || activeStep.content?.url}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            title={activeStep.title}
                          />
                        </div>
                      ) : (
                        <div className="bg-[#1E1548] rounded-[16px] overflow-hidden aspect-video flex items-center justify-center relative">
                          <div className="absolute inset-0" style={{
                            background: 'linear-gradient(135deg, rgba(255, 214, 0, 0.1) 0%, rgba(232, 236, 255, 0.1) 100%)'
                          }} />
                          <div className="relative z-10 text-center px-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[rgba(255,214,0,0.2)] rounded-full flex items-center justify-center backdrop-blur-sm mb-4 mx-auto">
                              <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFD600]" fill="#FFD600" />
                            </div>
                            <p className="text-white/60 text-sm">Vidéo à venir</p>
                          </div>
                        </div>
                      )}

                      {/* PDF Resources */}
                      {activeStep.content.pdfUrl && (
                        <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6">
                          <h4 className="text-[16px] sm:text-[18px] font-semibold text-[#1E1548] mb-4">
                            Ressources
                          </h4>
                          <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-[#E8ECFF] rounded-[12px] hover:bg-[#E8ECFF]/80 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(255,214,0,0.1)] rounded-full flex items-center justify-center">
                                  <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
                                </div>
                                <span className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                                  Guide PDF
                                </span>
                              </div>
                              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280]" />
                            </button>

                            {/* Templates CV Section (Module 2, Step 1 only) */}
                            {`week${userModule.weekNumber}` === 'week2' && activeStep.id === 'step1' && (
                              <>
                                <div className="pt-2">
                                  <p className="text-[13px] sm:text-[14px] font-semibold text-[#1E1548] mb-3">
                                    Templates CV prêts à utiliser
                                  </p>
                                </div>
                                <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-[#E8ECFF] rounded-[12px] hover:bg-[#E8ECFF]/80 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(255,214,0,0.1)] rounded-full flex items-center justify-center">
                                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
                                    </div>
                                    <div className="text-left">
                                      <p className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                                        Template CV - Moderne
                                      </p>
                                      <p className="text-[11px] sm:text-[12px] text-[#6B7280]">
                                        Design épuré et professionnel
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280]" />
                                </button>
                                <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-[#E8ECFF] rounded-[12px] hover:bg-[#E8ECFF]/80 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(255,214,0,0.1)] rounded-full flex items-center justify-center">
                                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
                                    </div>
                                    <div className="text-left">
                                      <p className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                                        Template CV - Créatif
                                      </p>
                                      <p className="text-[11px] sm:text-[12px] text-[#6B7280]">
                                        Pour les profils UX/Design
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280]" />
                                </button>
                                <button className="w-full flex items-center justify-between p-3 sm:p-4 bg-[#E8ECFF] rounded-[12px] hover:bg-[#E8ECFF]/80 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[rgba(255,214,0,0.1)] rounded-full flex items-center justify-center">
                                      <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD600]" />
                                    </div>
                                    <div className="text-left">
                                      <p className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                                        Template CV - Tech
                                      </p>
                                      <p className="text-[11px] sm:text-[12px] text-[#6B7280]">
                                        Optimisé pour profils techniques
                                      </p>
                                    </div>
                                  </div>
                                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#6B7280]" />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6">
                        <button
                          onClick={() => handleCompleteStep(activeStep.id)}
                          disabled={completedStepsLocal.includes(activeStep.id)}
                          className={`
                          w-full h-10 sm:h-12 rounded-[12px] text-[14px] sm:text-[16px] font-semibold transition-colors
                          ${completedStepsLocal.includes(activeStep.id)
                              ? 'bg-[#D1FAE5] text-[#10B981] cursor-not-allowed'
                              : 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'
                            }
                        `}
                        >
                          {completedStepsLocal.includes(activeStep.id) ? '✓ Terminé' : 'Marquer comme terminé'}
                        </button>
                      </div>
                    </div>
                  )}

                  {activeStep.type === 'upload' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6">
                      <h4 className="text-[16px] sm:text-[18px] font-semibold text-[#1E1548] mb-4">
                        Upload de fichier
                      </h4>

                      {/* Upload Review Status */}
                      {activeStep.reviewStatus && (
                        <div className={`
                        p-3 sm:p-4 rounded-[12px] mb-4
                        ${activeStep.reviewStatus === 'pending' ? 'bg-[#FEF3C7] border border-[#F59E0B]' : ''}
                        ${activeStep.reviewStatus === 'approved' ? 'bg-[#D1FAE5] border border-[#10B981]' : ''}
                        ${activeStep.reviewStatus === 'revision' ? 'bg-[#FEE2E2] border border-[#EF4444]' : ''}
                      `}>
                          <p className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                            {activeStep.reviewStatus === 'pending' && '⏳ En cours de révision par l\'équipe Admission'}
                            {activeStep.reviewStatus === 'approved' && '✅ Validé par l\'équipe Admission'}
                            {activeStep.reviewStatus === 'revision' && '⚠️ Corrections demandées'}
                          </p>
                        </div>
                      )}

                      {/* Upload Area */}
                      <div className="border-2 border-dashed border-[#E8ECFF] rounded-[16px] p-6 sm:p-8 text-center mb-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-[#E8ECFF] rounded-full flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-[#FFD600]" />
                        </div>
                        <p className="text-[14px] sm:text-[16px] font-medium text-[#1E1548] mb-2">
                          Glisse ton fichier ici ou clique pour parcourir
                        </p>
                        <p className="text-[12px] sm:text-[14px] text-[#6B7280] mb-4">
                          Formats acceptés: {activeStep.content.acceptedFormats.join(', ')}
                        </p>
                        <button
                          onClick={() => handleCompleteStep(activeStep.id)}
                          className="h-10 sm:h-12 px-4 sm:px-6 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#FDC700] transition-colors"
                        >
                          Choisir un fichier
                        </button>
                      </div>

                      <p className="text-[11px] sm:text-[12px] text-[#6B7280] text-center">
                        💡 Tu pourras continuer aux étapes suivantes même pendant la révision
                      </p>
                    </div>
                  )}

                  {activeStep.type === 'exercise' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6">
                      <h4 className="text-[16px] sm:text-[18px] font-semibold text-[#1E1548] mb-4">
                        Exercice pratique
                      </h4>
                      <textarea
                        className="w-full h-40 sm:h-48 p-3 sm:p-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[13px] sm:text-[14px] text-[#1E1548] resize-none focus:outline-none focus:ring-2 focus:ring-[#FFD600]"
                        placeholder="Écris ta réponse ici..."
                      />
                      <div className="flex gap-3 mt-4">
                        <button className="flex-1 h-10 sm:h-12 bg-white border border-[rgba(30,21,72,0.1)] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#F8F9FD] transition-colors">
                          Sauvegarder brouillon
                        </button>
                        <button
                          onClick={() => handleCompleteStep(activeStep.id)}
                          className="flex-1 h-10 sm:h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#FDC700] transition-colors"
                        >
                          Soumettre
                        </button>
                      </div>
                    </div>
                  )}

                  {activeStep.type === 'text' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6">
                      <h4 className="text-[16px] sm:text-[18px] font-semibold text-[#1E1548] mb-4">
                        Renseigner une information
                      </h4>
                      {activeStep.reviewStatus && (
                        <div className={`p-3 sm:p-4 rounded-[12px] mb-4 ${activeStep.reviewStatus === 'pending' ? 'bg-[#FEF3C7] border border-[#F59E0B]' : 'bg-[#D1FAE5] border border-[#10B981]'}`}>
                          <p className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">
                            {activeStep.reviewStatus === 'pending' ? '⏳ En cours de révision' : '✅ Validé'}
                          </p>
                        </div>
                      )}
                      <input type="url" className="w-full h-10 sm:h-12 px-3 sm:px-4 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[12px] text-[13px] sm:text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]" placeholder={activeStep.content.placeholder} />
                      <button onClick={() => handleCompleteStep(activeStep.id)} className="w-full h-10 sm:h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#FDC700] transition-colors mt-4">
                        Enregistrer
                      </button>
                    </div>
                  )}

                  {/* ── Rendu des ressources admin ────────────────────────────── */}

                  {activeStep.type === 'pdf' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6 space-y-4">
                      {activeStep.content?.url ? (
                        <a href={activeStep.content.url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-3 p-4 bg-[#E8ECFF] rounded-[12px] hover:bg-[#E8ECFF]/80 transition-colors">
                          <FileText className="w-6 h-6 text-[#FFD600] flex-shrink-0" />
                          <span className="text-[14px] font-medium text-[#1E1548]">Ouvrir le document PDF</span>
                          <ChevronRight className="w-4 h-4 text-[#6B7280] ml-auto" />
                        </a>
                      ) : (
                        <p className="text-[14px] text-[#6B7280]">Document non disponible.</p>
                      )}
                      <button onClick={() => handleCompleteStep(activeStep.id)} disabled={completedStepsLocal.includes(activeStep.id)}
                        className={`w-full h-11 rounded-[12px] text-[14px] font-semibold transition-colors ${completedStepsLocal.includes(activeStep.id) ? 'bg-[#D1FAE5] text-[#10B981] cursor-not-allowed' : 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'}`}>
                        {completedStepsLocal.includes(activeStep.id) ? '✓ Terminé' : 'Marquer comme terminé'}
                      </button>
                    </div>
                  )}

                  {activeStep.type === 'image' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6 space-y-4">
                      {activeStep.content?.url && (
                        <img src={activeStep.content.url} alt={activeStep.title} className="w-full rounded-[12px] object-contain max-h-[500px]" />
                      )}
                      <button onClick={() => handleCompleteStep(activeStep.id)} disabled={completedStepsLocal.includes(activeStep.id)}
                        className={`w-full h-11 rounded-[12px] text-[14px] font-semibold transition-colors ${completedStepsLocal.includes(activeStep.id) ? 'bg-[#D1FAE5] text-[#10B981] cursor-not-allowed' : 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'}`}>
                        {completedStepsLocal.includes(activeStep.id) ? '✓ Terminé' : 'Marquer comme terminé'}
                      </button>
                    </div>
                  )}

                  {activeStep.type === 'link' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6 space-y-4">
                      {activeStep.content?.url ? (
                        <a href={activeStep.content.url} target="_blank" rel="noreferrer"
                          className="flex items-center gap-3 p-4 bg-[#E8ECFF] rounded-[12px] hover:bg-[#E8ECFF]/80 transition-colors">
                          <Link2 className="w-6 h-6 text-[#FFD600] flex-shrink-0" />
                          <span className="text-[14px] font-medium text-[#1E1548] truncate">{activeStep.content.url}</span>
                          <ChevronRight className="w-4 h-4 text-[#6B7280] ml-auto flex-shrink-0" />
                        </a>
                      ) : (
                        <p className="text-[14px] text-[#6B7280]">Lien non disponible.</p>
                      )}
                      <button onClick={() => handleCompleteStep(activeStep.id)} disabled={completedStepsLocal.includes(activeStep.id)}
                        className={`w-full h-11 rounded-[12px] text-[14px] font-semibold transition-colors ${completedStepsLocal.includes(activeStep.id) ? 'bg-[#D1FAE5] text-[#10B981] cursor-not-allowed' : 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'}`}>
                        {completedStepsLocal.includes(activeStep.id) ? '✓ Terminé' : 'Marquer comme terminé'}
                      </button>
                    </div>
                  )}

                  {activeStep.type === 'form' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6 space-y-4">
                      {(activeStep.content?.formFields ?? []).map((field: any) => (
                        <div key={field.id}>
                          <label className="block text-[13px] font-semibold text-[#1E1548] mb-1.5">
                            {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                          </label>
                          {field.type === 'text' && <input type="text" className="w-full h-10 px-3 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[10px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600]" />}
                          {field.type === 'textarea' && <textarea rows={3} className="w-full px-3 py-2 bg-[#F8F9FD] border border-[rgba(30,21,72,0.1)] rounded-[10px] text-[14px] text-[#1E1548] focus:outline-none focus:ring-2 focus:ring-[#FFD600] resize-y" />}
                          {(field.type === 'radio' || field.type === 'checkbox') && (
                            <div className="space-y-1.5">
                              {(field.options ?? []).map((opt: string, i: number) => (
                                <label key={i} className="flex items-center gap-2 cursor-pointer text-[14px] text-[#1E1548]">
                                  <input type={field.type} name={field.id} className="accent-[#FFD600]" />
                                  {opt}
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <button onClick={() => handleCompleteStep(activeStep.id)} disabled={completedStepsLocal.includes(activeStep.id)}
                        className={`w-full h-11 rounded-[12px] text-[14px] font-semibold transition-colors ${completedStepsLocal.includes(activeStep.id) ? 'bg-[#D1FAE5] text-[#10B981] cursor-not-allowed' : 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'}`}>
                        {completedStepsLocal.includes(activeStep.id) ? '✓ Terminé' : 'Soumettre le formulaire'}
                      </button>
                    </div>
                  )}

                  {activeStep.type === 'quiz' && (
                    <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-4 sm:p-6 space-y-6">
                      {(activeStep.content?.quizQuestions ?? []).map((q: any, qi: number) => (
                        <div key={q.id} className="space-y-2">
                          <p className="text-[14px] font-semibold text-[#1E1548]">{qi + 1}. {q.question}</p>
                          <div className="space-y-1.5">
                            {(q.options ?? []).map((opt: any) => (
                              <label key={opt.id} className="flex items-center gap-2 cursor-pointer p-2.5 rounded-[8px] hover:bg-[#F8F9FD] text-[14px] text-[#1E1548]">
                                <input type="checkbox" className="accent-[#FFD600] w-4 h-4" />
                                {opt.text}
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button onClick={() => handleCompleteStep(activeStep.id)} disabled={completedStepsLocal.includes(activeStep.id)}
                        className={`w-full h-11 rounded-[12px] text-[14px] font-semibold transition-colors ${completedStepsLocal.includes(activeStep.id) ? 'bg-[#D1FAE5] text-[#10B981] cursor-not-allowed' : 'bg-[#FFD600] text-[#1E1548] hover:bg-[#FDC700]'}`}>
                        {completedStepsLocal.includes(activeStep.id) ? '✓ Terminé' : 'Valider le quiz'}
                      </button>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Popup félicitation - fin du parcours complet */}
      {showCelebration && (
        <>
          <style>{`
          @keyframes popIn {
            0%   { transform: scale(0.3) translateY(40px); opacity: 0; }
            60%  { transform: scale(1.08) translateY(-8px); opacity: 1; }
            80%  { transform: scale(0.97) translateY(2px); }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          .animate-pop-in { animation: popIn 0.55s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
          @keyframes floatStar {
            0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(-60px) rotate(20deg); opacity: 0; }
          }
          .star-float-1 { animation: floatStar 1.4s ease-out 0.2s forwards; }
          .star-float-2 { animation: floatStar 1.6s ease-out 0.5s forwards; }
          .star-float-3 { animation: floatStar 1.3s ease-out 0.8s forwards; }
        `}</style>

          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="animate-pop-in relative bg-white rounded-[24px] p-8 max-w-md w-full text-center shadow-2xl">
              <button
                onClick={() => setShowCelebration(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center hover:bg-[#E5E7EB] transition-colors"
              >
                <X className="w-4 h-4 text-[#6B7280]" />
              </button>

              <div className="relative flex justify-center mb-6">
                <span className="star-float-1 absolute -left-4 top-0 text-2xl">⭐</span>
                <span className="star-float-2 absolute left-2 -top-2 text-xl">✨</span>
                <span className="star-float-3 absolute -right-4 top-0 text-2xl">⭐</span>
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FFD600] to-[#FFA500] flex items-center justify-center shadow-lg animate-bounce">
                  <Trophy className="w-12 h-12 text-[#1E1548]" />
                </div>
              </div>

              <h2 className="text-[28px] font-bold text-[#1E1548] mb-3">
                🎉 Félicitations !
              </h2>
              <p className="text-[16px] text-[#6B7280] leading-[26px] mb-2">
                Tu as terminé l'intégralité de ton parcours TBEE !
              </p>
              <p className="text-[15px] font-semibold text-[#10B981] mb-6">
                Tu es maintenant prêt(e) à décrocher ton alternance. 🚀
              </p>

              <div className="flex justify-center gap-4 mb-6">
                {[['🎯', 'Projet'], ['📄', 'CV'], ['🔍', 'Recherche'], ['💼', 'Entretien']].map(([emoji, label]) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <span className="text-3xl">{emoji}</span>
                    <span className="text-[11px] text-[#6B7280]">{label}</span>
                  </div>
                ))}
              </div>

              <Link to={routes.StudentModules.path}>
                <button
                  className="w-full h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-all hover:scale-[1.02]"
                >
                  Voir mon parcours complet 🏆
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}