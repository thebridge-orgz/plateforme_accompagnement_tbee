export interface OnboardingData {
    // Étape 1: Choix de formation
    hasFormation: boolean;
    formationChoice?: string; // ID de la formation choisie
    questionnaireResults?: {
        answers: string[];
        suggestedFormation: string;
    };

    // Étape 2: Compétences et situation
    skills: string[]; // Compétences sélectionnées
    cvStatus: number; // 0: pas de CV, 1: brouillon, 2: prêt
    linkedinStatus: number; // 0: pas de profil, 1: basique, 2: optimisé
    searchStatus: number; // 0: pas commencé, 1: quelques pistes, 2: active
    weeklyHours: number; // Heures disponibles par semaine

    // Calculé côté serveur
    planWeeks?: number; // Durée estimée du plan d'action
    completedAt?: string; // Date de complétion de l'onboarding
}