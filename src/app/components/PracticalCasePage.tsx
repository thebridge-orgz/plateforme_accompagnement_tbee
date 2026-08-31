import { useState, useEffect } from 'react';
import { ArrowLeft, Briefcase, Clock, CheckCircle2, Trophy, X, ListChecks, Target, ChevronRight } from 'lucide-react';
import { ProgressBar } from './ui/ProgressBar';
import { routes } from '../router/routes';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { practicalCasesService } from '../../services/supabase';

type Step = { id: string; instruction: string; tip?: string };

type PracticalCase = {
  id: string;
  title: string;
  context: string;
  objective: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration: string;
  points: number;
  moduleLabel: string;
  steps: Step[];
  resource?: { label: string; href: string };
};

const practicalCases: PracticalCase[] = [
  {
    id: '1',
    title: 'Fiche de positionnement',
    context: 'Avant de chercher une alternance, il faut savoir qui tu es, ce que tu veux et ce que tu as à offrir. Cette clarté te permettra de cibler les bons employeurs et de convaincre rapidement.',
    objective: 'une fiche de positionnement personnelle prête à partager avec un recruteur ou un conseiller',
    difficulty: 'Débutant',
    duration: '20 min',
    points: 50,
    moduleLabel: 'SAS — Positionnement',
    steps: [
      { id: '1-1', instruction: 'Liste tes 5 compétences clés : au moins 2 techniques et 2 humaines (softskills).' },
      { id: '1-2', instruction: 'Identifie ton métier cible et le ou les secteurs qui t\'intéressent.' },
      { id: '1-3', instruction: 'Définis 3 types d\'entreprises cibles : taille, culture, domaine d\'activité.' },
      { id: '1-4', instruction: 'Note ta zone géographique de recherche et tes contraintes de mobilité.', tip: 'Sois réaliste : un périmètre trop large complique la recherche.' },
      { id: '1-5', instruction: 'Rédige ton objectif professionnel en 2 phrases claires et concrètes.' },
    ],
  },
  {
    id: '2',
    title: 'Pitch vidéo 3 minutes',
    context: '"Présentez-vous" est souvent la première question d\'un recruteur. C\'est ton moment pour marquer les esprits et donner envie d\'en savoir plus.',
    objective: 'un pitch structuré et chronométré, prêt pour un entretien ou un appel recruteur',
    difficulty: 'Intermédiaire',
    duration: '20 min',
    points: 75,
    moduleLabel: 'BOOST — Mon pitch',
    steps: [
      { id: '2-1', instruction: 'Rédige une phrase d\'accroche percutante pour ouvrir ton pitch.' },
      { id: '2-2', instruction: 'Résume ton parcours en 3 points clés (max 30 secondes).', tip: 'Garde uniquement ce qui est pertinent pour le poste visé.' },
      { id: '2-3', instruction: 'Explique ton projet professionnel et pourquoi cette alternance maintenant.' },
      { id: '2-4', instruction: 'Formule ta valeur ajoutée : ce que tu apportes concrètement à l\'entreprise.' },
      { id: '2-5', instruction: 'Prépare une phrase de conclusion avec un appel à l\'action (ex : "Je serais ravi d\'en discuter avec vous").' },
      { id: '2-6', instruction: 'Entraîne-toi à voix haute et chronomètre-toi. Objectif : 3 minutes pile.', tip: 'Enregistre-toi pour repérer les hésitations et tics de langage.' },
    ],
  },
  {
    id: '3',
    title: 'Profil LinkedIn complet',
    context: '87 % des recruteurs vérifient LinkedIn avant un entretien. Un profil incomplet ou générique peut te coûter une opportunité avant même d\'avoir parlé.',
    objective: 'un profil LinkedIn 100 % complété et optimisé pour attirer les recruteurs',
    difficulty: 'Débutant',
    duration: '25 min',
    points: 50,
    moduleLabel: 'BOOST — LinkedIn',
    steps: [
      { id: '3-1', instruction: 'Ajoute une photo professionnelle (fond neutre, tenue soignée) et une bannière personnalisée.' },
      { id: '3-2', instruction: 'Rédige un titre accrocheur : poste visé + domaine + "en recherche d\'alternance".', tip: 'Ex : "Chargé de marketing digital | Alternance 2024 | En recherche active"' },
      { id: '3-3', instruction: 'Complète la section "À propos" avec ton pitch en 3 à 5 phrases.' },
      { id: '3-4', instruction: 'Détaille chaque expérience avec tes missions et résultats concrets (chiffres si possible).' },
      { id: '3-5', instruction: 'Ajoute tes formations, compétences clés et certifications.' },
      { id: '3-6', instruction: 'Connecte-toi avec au moins 10 professionnels de ton secteur cible.', tip: 'Commence par tes anciens professeurs, tuteurs de stage et contacts professionnels.' },
    ],
  },
  {
    id: '4',
    title: 'Répondre à une offre d\'alternance',
    context: 'Les recruteurs reçoivent des centaines de candidatures. Ta réponse doit être personnalisée, précise et professionnelle pour sortir du lot dès les premières lignes.',
    objective: 'un mail de candidature personnalisé prêt à envoyer pour une offre réelle',
    difficulty: 'Intermédiaire',
    duration: '30 min',
    points: 75,
    moduleLabel: 'CANDIDATURES',
    steps: [
      { id: '4-1', instruction: 'Analyse l\'offre : identifie les 3 compétences clés recherchées.' },
      { id: '4-2', instruction: 'Adapte le titre de ton CV à l\'intitulé exact du poste si nécessaire.' },
      { id: '4-3', instruction: 'Rédige un objet de mail précis et professionnel incluant le titre du poste.', tip: 'Ex : "Candidature alternance – Chargé(e) de communication – Réf. 2024-COM-01"' },
      { id: '4-4', instruction: 'Rédige le corps du mail en 3 paragraphes : accroche / valeur ajoutée / appel à l\'action.' },
      { id: '4-5', instruction: 'Vérifie la personnalisation : nom de l\'entreprise et du contact sont corrects et bien orthographiés.' },
      { id: '4-6', instruction: 'Relis pour les fautes, joins ton CV en PDF et envoie.', tip: 'Nomme ton fichier : Prenom_Nom_CV.pdf' },
    ],
  },
  {
    id: '5',
    title: 'Simulation d\'entretien téléphonique',
    context: 'Le premier contact recruteur dure souvent 10 à 15 minutes. Il est décisif pour la suite du processus et il peut arriver à n\'importe quel moment de la journée.',
    objective: 'une fiche de préparation complète pour répondre sereinement à un appel recruteur inattendu',
    difficulty: 'Intermédiaire',
    duration: '20 min',
    points: 75,
    moduleLabel: 'ENTRETIENS — Préparation',
    steps: [
      { id: '5-1', instruction: 'Prépare ta présentation en 1 minute : parcours + projet + disponibilité.' },
      { id: '5-2', instruction: 'Prépare ta réponse à "Pourquoi cette entreprise ?" pour 3 entreprises cibles de ta liste.', tip: 'Montre que tu as fait des recherches sur elles.' },
      { id: '5-3', instruction: 'Note ta fourchette de prétentions salariales avec 2 arguments à l\'appui.' },
      { id: '5-4', instruction: 'Prépare 2 questions pertinentes à poser au recruteur en fin d\'appel.' },
      { id: '5-5', instruction: 'Entraîne-toi avec un proche ou enregistre-toi pour t\'écouter.', tip: 'L\'objectif est de sonner naturel, pas récité.' },
    ],
  },
  {
    id: '6',
    title: 'Questions techniques en entretien',
    context: 'Les questions métier arrivent toujours en entretien. Les candidats qui les ont préparées répondent avec assurance. Les autres improvisent et ça se voit.',
    objective: 'un fichier de préparation avec 5 réponses STAR solides et prêtes à l\'oral',
    difficulty: 'Avancé',
    duration: '40 min',
    points: 100,
    moduleLabel: 'ENTRETIENS — Technique',
    steps: [
      { id: '6-1', instruction: 'Liste 5 questions techniques probables dans ton domaine cible.' },
      { id: '6-2', instruction: 'Pour chaque question, rédige une réponse avec la méthode STAR : Situation / Tâche / Action / Résultat.', tip: 'Le "Résultat" doit être concret, chiffré si possible.' },
      { id: '6-3', instruction: 'Prépare une réponse à "Parlez-moi d\'un projet dont vous êtes fier".' },
      { id: '6-4', instruction: 'Prépare une réponse à "Quels sont vos points d\'amélioration ?" (honnêteté + effort de correction).' },
      { id: '6-5', instruction: 'Entraîne-toi à répondre à l\'oral sans lire tes notes.', tip: 'Mémorise la structure STAR, pas les mots exacts.' },
    ],
  },
  {
    id: '7',
    title: 'Négociation salariale',
    context: 'La rémunération en alternance est encadrée par la loi, mais des avantages restent négociables. Connaître ses droits, c\'est la base d\'une discussion sereine.',
    objective: 'maîtriser la grille légale et arriver préparé à la discussion salariale',
    difficulty: 'Avancé',
    duration: '25 min',
    points: 100,
    moduleLabel: 'EMBAUCHE — Contrat',
    steps: [
      { id: '7-1', instruction: 'Consulte la grille officielle de rémunération alternance selon ton âge et ton année de formation.', tip: 'Disponible sur le site du service-public.fr' },
      { id: '7-2', instruction: 'Identifie les avantages potentiellement négociables : transport, tickets repas, prime de performance.' },
      { id: '7-3', instruction: 'Prépare 2 arguments concrets basés sur tes compétences ou expériences pour justifier une meilleure offre.' },
      { id: '7-4', instruction: 'Prépare ta réponse si on te propose en dessous de la grille légale (ferme mais respectueux).' },
      { id: '7-5', instruction: 'Simule la conversation de négociation avec un proche.', tip: 'L\'objectif est de rester calme et factuel, pas agressif.' },
    ],
  },
  {
    id: '8',
    title: 'Plan d\'intégration 30 jours',
    context: 'Les 30 premiers jours définissent ta réputation dans l\'entreprise. Un alternant qui arrive avec un plan montre de la maturité et de la proactivité.',
    objective: 'un plan d\'action structuré pour réussir ton intégration et faire bonne impression',
    difficulty: 'Avancé',
    duration: '30 min',
    points: 100,
    moduleLabel: 'EMBAUCHE — Intégration',
    steps: [
      { id: '8-1', instruction: 'Liste 5 questions à poser lors de ton premier jour : missions prioritaires, outils, culture d\'équipe.' },
      { id: '8-2', instruction: 'Identifie les personnes clés à rencontrer dans les 2 premières semaines.' },
      { id: '8-3', instruction: 'Fixe un objectif concret et mesurable pour la fin de ta première semaine.', tip: 'Ex : "Avoir compris le processus X et rencontré les 5 membres de l\'équipe"' },
      { id: '8-4', instruction: 'Planifie un point de feedback avec ton tuteur à J+15.' },
      { id: '8-5', instruction: 'Note 3 comportements professionnels que tu t\'engages à adopter dès le premier jour.', tip: 'Ex : ponctualité, prise de notes, proactivité sur les questions.' },
    ],
  },
];

export function PracticalCasePage() {
  const { user } = useAuth();
  const [activeCase, setActiveCase] = useState<PracticalCase | null>(null);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [checkedSteps, setCheckedSteps] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    practicalCasesService.getViewedCaseIds(user.id)
      .then(setCompletedIds)
      .catch(() => {});
  }, [user?.id]);

  const openCase = (pc: PracticalCase) => {
    setActiveCase(pc);
    setCheckedSteps(new Set());
  };

  const toggleStep = (stepId: string) => {
    setCheckedSteps(prev => {
      const next = new Set(prev);
      next.has(stepId) ? next.delete(stepId) : next.add(stepId);
      return next;
    });
  };

  const allStepsDone = activeCase !== null && checkedSteps.size === activeCase.steps.length;

  const handleValidate = async () => {
    if (!user?.id || !activeCase || isSaving) return;
    setIsSaving(true);
    try {
      await practicalCasesService.markAsViewed(user.id, activeCase.id);
      setCompletedIds(prev => prev.includes(activeCase.id) ? prev : [...prev, activeCase.id]);
      setActiveCase(null);
    } catch {
      // silently ignore
    } finally {
      setIsSaving(false);
    }
  };

  const totalPoints = practicalCases
    .filter(pc => completedIds.includes(pc.id))
    .reduce((sum, pc) => sum + pc.points, 0);
  const progressPct = Math.round((completedIds.length / practicalCases.length) * 100);

  const getDifficultyStyle = (d: string) => {
    if (d === 'Débutant') return 'text-[#10B981] bg-[#F0FDF4]';
    if (d === 'Intermédiaire') return 'text-[#D97706] bg-[#FFF4CC]';
    return 'text-[#EF4444] bg-[#FEF2F2]';
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.StudentDashboard.path}>
              <button className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0">
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1">
                Cas pratiques
              </h1>
              <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                Mettez en pratique vos connaissances étape par étape
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 space-y-6 sm:space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-medium text-[#6B7280]">Points gagnés</p>
              <Trophy className="w-5 h-5 text-[#FFD600]" />
            </div>
            <p className="text-[32px] font-bold text-[#1E1548]">{totalPoints}</p>
            <p className="text-[12px] text-[#6B7280] mt-0.5">sur {practicalCases.reduce((s, p) => s + p.points, 0)} pts possibles</p>
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[13px] font-medium text-[#6B7280]">Cas terminés</p>
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            </div>
            <p className="text-[32px] font-bold text-[#1E1548]">{completedIds.length}<span className="text-[20px] text-[#6B7280]">/{practicalCases.length}</span></p>
          </div>
          <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[13px] font-medium text-[#6B7280]">Progression</p>
              <Briefcase className="w-5 h-5 text-[#1E1548]" />
            </div>
            <ProgressBar progress={progressPct} size="sm" />
            <p className="text-[12px] text-[#6B7280] mt-2">{progressPct}% complété</p>
          </div>
        </div>

        {/* Cases list */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">Tous les cas pratiques</h2>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {practicalCases.map((pc) => {
              const isDone = completedIds.includes(pc.id);
              return (
                <div
                  key={pc.id}
                  onClick={() => openCase(pc)}
                  className="bg-white border-2 border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 transition-all duration-300 hover:shadow-[0_6px_20px_rgba(30,21,72,0.1)] hover:border-[#FFD600] cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                        <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548]">{pc.title}</h3>
                        <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold bg-[#E8ECFF] text-[#1E1548]">
                          {pc.moduleLabel}
                        </span>
                        <span className={`text-[12px] px-3 py-1 rounded-full font-medium ${getDifficultyStyle(pc.difficulty)}`}>
                          {pc.difficulty}
                        </span>
                        {isDone && (
                          <span className="text-[12px] px-3 py-1 rounded-full font-medium text-[#10B981] bg-[#F0FDF4] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Terminé
                          </span>
                        )}
                      </div>
                      <p className="text-[13px] sm:text-[14px] text-[#6B7280] mb-3 leading-[20px]">
                        {pc.context}
                      </p>
                      <div className="flex items-center flex-wrap gap-3 sm:gap-5 text-[13px] text-[#6B7280]">
                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{pc.duration}</span>
                        <span className="flex items-center gap-1.5"><ListChecks className="w-4 h-4" />{pc.steps.length} étapes</span>
                        <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-[#FFD600]" />{pc.points} points</span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); openCase(pc); }}
                      className={`flex-shrink-0 flex items-center gap-2 px-5 h-10 rounded-[10px] text-[14px] font-semibold transition-all ${
                        isDone
                          ? 'bg-[#F0FDF4] text-[#10B981] border-2 border-[#10B981]'
                          : 'bg-[#1E1548] text-white hover:bg-[#2D2166]'
                      }`}
                    >
                      {isDone ? 'Revoir' : 'Commencer'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-[#E8ECFF] to-[#F8F9FD] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-6 sm:p-8">
          <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548] mb-2">Comment ça fonctionne ?</h2>
          <p className="text-[14px] text-[#6B7280] mb-6 leading-[22px]">
            Chaque cas pratique te guide pas à pas pour produire un résultat concret. Tu coches chaque étape au fur et à mesure, puis tu valides quand tu as tout terminé.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { Icon: Briefcase, title: 'Choisissez un cas', desc: 'Sélectionnez un exercice adapté à votre avancement dans le parcours' },
              { Icon: ListChecks, title: 'Suivez les étapes', desc: 'Cochez chaque étape au fur et à mesure que vous la réalisez' },
              { Icon: Trophy, title: 'Validez et gagnez', desc: 'Une fois toutes les étapes cochées, validez pour gagner vos points' },
            ].map(({ Icon, title, desc }, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1E1548] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#1E1548] mb-1">{title}</p>
                  <p className="text-[13px] text-[#6B7280] leading-[20px]">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal checklist */}
      {activeCase && (
        <div
          className="fixed inset-0 lg:left-72 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveCase(null)}
        >
          <div
            className="bg-white rounded-[20px] w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[rgba(30,21,72,0.08)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#FFF4CC] rounded-full flex items-center justify-center">
                  <ListChecks className="w-5 h-5 text-[#1E1548]" />
                </div>
                <div>
                  <p className="text-[11px] text-[#6B7280]">{activeCase.moduleLabel}</p>
                  <h3 className="text-[16px] font-bold text-[#1E1548] leading-tight">{activeCase.title}</h3>
                </div>
              </div>
              <button
                onClick={() => setActiveCase(null)}
                className="w-9 h-9 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-[#1E1548]" />
              </button>
            </div>

            {/* Modal body */}
            <div className="overflow-y-auto flex-1 px-5 sm:px-6 py-5 space-y-5">
              {/* Context */}
              <div className="bg-[#F8F9FD] rounded-[12px] p-4">
                <p className="text-[13px] text-[#6B7280] leading-[20px]">{activeCase.context}</p>
              </div>

              {/* Objective */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#E8ECFF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-[#1E1548]" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-[#6B7280] uppercase tracking-wide mb-0.5">Objectif</p>
                  <p className="text-[14px] font-medium text-[#1E1548] leading-[20px]">À la fin de cet exercice, tu auras : {activeCase.objective}.</p>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-semibold text-[#1E1548]">Étapes ({checkedSteps.size}/{activeCase.steps.length})</p>
                  {allStepsDone && <span className="text-[12px] text-[#10B981] font-semibold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Tout terminé !</span>}
                </div>
                <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FFD600] rounded-full transition-all duration-300"
                    style={{ width: `${(checkedSteps.size / activeCase.steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Steps checklist */}
              <div className="space-y-3">
                {activeCase.steps.map((step, idx) => {
                  const checked = checkedSteps.has(step.id);
                  return (
                    <label
                      key={step.id}
                      className={`flex items-start gap-3 p-4 rounded-[12px] border-2 cursor-pointer transition-all ${
                        checked
                          ? 'border-[#10B981] bg-[#F0FDF4]'
                          : 'border-[rgba(30,21,72,0.08)] bg-white hover:border-[#FFD600]'
                      }`}
                    >
                      <div className="flex-shrink-0 mt-0.5">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          checked ? 'border-[#10B981] bg-[#10B981]' : 'border-[#D1D5DB]'
                        }`}>
                          {checked && <CheckCircle2 className="w-4 h-4 text-white" />}
                          {!checked && <span className="text-[11px] font-bold text-[#9CA3AF]">{idx + 1}</span>}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className={`text-[14px] leading-[20px] ${checked ? 'text-[#059669] line-through' : 'text-[#1E1548]'}`}>
                          {step.instruction}
                        </p>
                        {step.tip && !checked && (
                          <div className="mt-2 flex items-start gap-1.5 bg-[#FFF4CC] rounded-[8px] px-3 py-2">
                            <span className="flex-shrink-0 text-[13px]">💡</span>
                            <p className="text-[12px] text-[#92700A] font-medium leading-[18px]">{step.tip}</p>
                          </div>
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={checked}
                        onChange={() => toggleStep(step.id)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Modal footer */}
            <div className="px-5 sm:px-6 py-4 border-t border-[rgba(30,21,72,0.08)] flex items-center justify-between gap-3 flex-shrink-0">
              <div className="flex items-center gap-1.5 text-[13px] text-[#6B7280]">
                <Trophy className="w-4 h-4 text-[#FFD600]" />
                <span>{activeCase.points} points</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveCase(null)}
                  className="h-10 px-4 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-[10px] text-[14px] font-semibold hover:bg-[#F8F9FD] transition-all"
                >
                  Fermer
                </button>
                <button
                  onClick={handleValidate}
                  disabled={!allStepsDone || isSaving || completedIds.includes(activeCase.id)}
                  className="h-10 px-5 bg-[#10B981] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#059669] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {completedIds.includes(activeCase.id) ? 'Déjà validé' : isSaving ? 'Validation…' : 'Valider le cas'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
