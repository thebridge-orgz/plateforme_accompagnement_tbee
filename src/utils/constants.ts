// ============================================
// CONSTANTES GLOBALES DE L'APPLICATION
// ============================================

// -------------------- MODULES --------------------
export const MODULES = {
    TOTAL_COUNT: 4,
    XP_PER_MODULE: 250,
    XP_PER_LESSON: 50,
    MIN_PROGRESS_FOR_UNLOCK: 100, // Pourcentage requis pour débloquer le module suivant
} as const;

// -------------------- OFFERS --------------------
export const MAX_TRACKED_OFFERS = 15;
export const OFFER_STATUS = {
    SAVED: 'saved',
    APPLIED: 'applied',
    INTERVIEW: 'interview',
    OFFER_RECEIVED: 'offer_received',
    REJECTED: 'rejected',
    ACCEPTED: 'accepted',
} as const;

export const OFFER_STATUS_LABELS: Record<string, string> = {
    [OFFER_STATUS.SAVED]: 'Sauvegardée',
    [OFFER_STATUS.APPLIED]: 'Candidature envoyée',
    [OFFER_STATUS.INTERVIEW]: 'Entretien programmé',
    [OFFER_STATUS.OFFER_RECEIVED]: 'Offre reçue',
    [OFFER_STATUS.REJECTED]: 'Refusé',
    [OFFER_STATUS.ACCEPTED]: 'Accepté',
};

// -------------------- CV STATUS --------------------
export const CV_STATUS = {
    NOT_UPLOADED: 'not_uploaded',
    UPLOADED: 'uploaded',
    PENDING: 'pending',
    UNDER_REVIEW: 'under_review',
    APPROVED: 'approved',
    NEEDS_REVISION: 'needs_revision',
} as const;

export const CV_STATUS_LABELS: Record<string, string> = {
    [CV_STATUS.NOT_UPLOADED]: 'Non téléchargé',
    [CV_STATUS.UPLOADED]: 'Téléchargé',
    [CV_STATUS.PENDING]: 'En attente de validation',
    [CV_STATUS.UNDER_REVIEW]: 'En cours de relecture',
    [CV_STATUS.APPROVED]: 'Validé',
    [CV_STATUS.NEEDS_REVISION]: 'À modifier',
};

// -------------------- MODULE STATUS --------------------
export const MODULE_STATUS = {
    LOCKED: 'locked',
    AVAILABLE: 'available',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
} as const;

export const MODULE_STATUS_LABELS: Record<string, string> = {
    [MODULE_STATUS.LOCKED]: 'Verrouillé',
    [MODULE_STATUS.AVAILABLE]: 'Disponible',
    [MODULE_STATUS.IN_PROGRESS]: 'En cours',
    [MODULE_STATUS.COMPLETED]: 'Terminé',
};

// -------------------- USER ROLES --------------------
export const USER_ROLES = {
    STUDENT: 'student',
    ADMIN: 'admin',
} as const;

export const USER_ROLE_LABELS: Record<string, string> = {
    [USER_ROLES.STUDENT]: 'Étudiant',
    [USER_ROLES.ADMIN]: 'Administrateur',
};

// -------------------- ONBOARDING --------------------
export const ONBOARDING = {
    STEPS: {
        PERSONAL_INFO: 1,
        EDUCATIONAL_INFO: 2,
    },
    CV_STATUS: {
        NONE: 0,
        DRAFT: 1,
        READY: 2,
    },
    LINKEDIN_STATUS: {
        NONE: 0,
        BASIC: 1,
        OPTIMIZED: 2,
    },
    SEARCH_STATUS: {
        NOT_STARTED: 0,
        SOME_LEADS: 1,
        ACTIVE: 2,
    },
} as const;

// -------------------- STUDY TIME --------------------
export const STUDY_TIME = {
    MINUTES_PER_LESSON: 15,
    DEFAULT_SESSION_MINUTES: 30,
} as const;

// -------------------- STORAGE KEYS --------------------
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'tbee_auth_token',
    USER_PREFERENCES: 'tbee_user_preferences',
    ONBOARDING_CACHE: 'tbee_onboarding_cache',
} as const;

// -------------------- API ENDPOINTS --------------------
export const API_ENDPOINTS = {
    SUPABASE_TABLES: {
        PROFILES: 'profiles',
        MODULES: 'modules',
        LESSONS: 'lessons',
        CV_DATA: 'cv_data',
        USER_STATISTICS: 'user_statistics',
        USER_MODULE_PROGRESS: 'user_module_progress',
        USER_LESSON_PROGRESS: 'user_lesson_progress',
        USER_TRACKED_OFFERS: 'user_tracked_offers',
        ADMIN_MESSAGES: 'admin_messages',
    },
    STORAGE_BUCKETS: {
        CV_UPLOADS: 'cv-uploads',
        LESSON_ATTACHMENTS: 'lesson-attachments',
    },
} as const;

// -------------------- REALTIME CHANNELS --------------------
export const REALTIME_CHANNELS = {
    ADMIN_DATA: 'admin_realtime',
    USER_DATA: 'user_realtime',
    MODULES: 'modules_realtime',
} as const;

// -------------------- ERROR MESSAGES --------------------
export const ERROR_MESSAGES = {
    // Auth
    UNAUTHORIZED: 'Vous devez être connecté pour accéder à cette page',
    FORBIDDEN: 'Vous n\'avez pas les droits nécessaires',
    INVALID_CREDENTIALS: 'Email ou mot de passe incorrect',
    EMAIL_ALREADY_EXISTS: 'Un compte existe déjà avec cet email',
    WEAK_PASSWORD: 'Le mot de passe doit contenir au moins 6 caractères',

    // Data
    LOAD_FAILED: 'Impossible de charger les données',
    SAVE_FAILED: 'Impossible d\'enregistrer les modifications',
    DELETE_FAILED: 'Impossible de supprimer l\'élément',

    // Upload
    FILE_TOO_LARGE: 'Le fichier est trop volumineux (max 5 Mo)',
    INVALID_FILE_TYPE: 'Type de fichier non supporté',
    UPLOAD_FAILED: 'Échec du téléchargement',

    // Offers
    MAX_OFFERS_REACHED: `Vous ne pouvez pas suivre plus de ${MAX_TRACKED_OFFERS} offres`,

    // General
    NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre réseau',
    UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite',
} as const;

// -------------------- SUCCESS MESSAGES --------------------
export const SUCCESS_MESSAGES = {
    // Auth
    SIGNUP_SUCCESS: 'Inscription réussie ! Vérifiez votre email pour confirmer votre compte',
    SIGNIN_SUCCESS: 'Connexion réussie',
    SIGNOUT_SUCCESS: 'Déconnexion réussie',
    PASSWORD_RESET_SENT: 'Email de réinitialisation envoyé',

    // Data
    PROFILE_UPDATED: 'Profil mis à jour avec succès',
    ONBOARDING_COMPLETED: 'Bienvenue sur la plateforme !',

    // Upload
    CV_UPLOADED: 'CV téléchargé avec succès',
    CV_UPDATED: 'CV mis à jour',

    // Offers
    OFFER_ADDED: 'Offre ajoutée au suivi',
    OFFER_UPDATED: 'Offre mise à jour',
    OFFER_REMOVED: 'Offre retirée du suivi',

    // Modules
    MODULE_STARTED: 'Module commencé, bonne chance !',
    MODULE_COMPLETED: 'Félicitations ! Module terminé',
    PROGRESS_SAVED: 'Progression sauvegardée',
} as const;

// -------------------- CONFIGURATION --------------------
export const CONFIG = {
    // Upload limits (in bytes)
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5 MB
    ALLOWED_FILE_TYPES: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],

    // Timeouts (in milliseconds)
    API_TIMEOUT: 10000,
    AUTH_TIMEOUT: 5000,

    // Pagination
    ITEMS_PER_PAGE: 20,
    ADMIN_ITEMS_PER_PAGE: 50,

    // Cache duration (in milliseconds)
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
} as const;

// -------------------- FORMATS --------------------
export const DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
    API: 'yyyy-MM-dd',
    API_WITH_TIME: "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
} as const;

// -------------------- ROUTES (à importer depuis votre fichier routes existant) --------------------
// Note: Importez vos routes existantes plutôt que de les redéfinir
// export { routes } from '../app/router/routes';