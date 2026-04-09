// =====================================================
// FICHIER D'INTÉGRATION FRONTEND - TBEE SUPABASE
// =====================================================
// Ce fichier montre comment connecter votre code React
// aux vraies tables Supabase créées par le script SQL
//
// 📍 Localisations des fichiers à mettre à jour :
// - src/context/UserDataContext.tsx
// - src/context/AdminDataContext.tsx  
// - src/app/auth/AuthContext.tsx
// =====================================================

// =====================================================
// 1️⃣ MODÈLE DE MAPPER SUPABASE ↔ TYPES TYPESCRIPT
// =====================================================

/**
 * CONVENTION DE NOMMAGE :
 * - Base de données (SQL) : snake_case
 * - Code TypeScript : camelCase
 * 
 * EXEMPLE :
 * BD: first_name → TS: firstName
 * BD: onboarding_completed → TS: onboardingCompleted
 * BD: total_lessons_completed → TS: totalLessonsCompleted
 */

// Fonction helper pour convertir profil Supabase → TypeScript
export function mapProfileFromDB(rawProfile: any): UserProfile {
    return {
        id: rawProfile.id,
        email: rawProfile.email,
        firstName: rawProfile.first_name || '',
        lastName: rawProfile.last_name || '',
        role: rawProfile.role,
        phone: rawProfile.phone,
        birthDate: rawProfile.birth_date,
        hasRQTH: rawProfile.has_rqth || false,
        currentLevel: rawProfile.current_level,
        targetLevel: rawProfile.target_level,
        fieldOfInterest: rawProfile.field_of_interest,
        city: rawProfile.city,
        postalCode: rawProfile.postal_code,
        mobilityRadius: rawProfile.mobility_radius,
        onboardingCompleted: rawProfile.onboarding_completed,
        onboardingStep: rawProfile.onboarding_step,
        isActive: rawProfile.is_active,
        onboardingData: rawProfile.onboarding_data,
        createdAt: rawProfile.created_at,
        updatedAt: rawProfile.updated_at,
    };
}

// Fonction helper pour convertir statistiques Supabase → TypeScript
export function mapStatisticsFromDB(rawStats: any): UserStatistics {
    return {
        id: rawStats.id,
        userId: rawStats.user_id,
        totalLessonsCompleted: rawStats.total_lessons_completed || 0,
        totalLessonsValidated: rawStats.total_lessons_validated || 0,
        currentWeek: rawStats.current_week || 1,
        currentStreakDays: rawStats.current_streak_days || 0,
        longestStreakDays: rawStats.longest_streak_days || 0,
        lastActivityDate: rawStats.last_activity_date,
        totalTimeSpentMinutes: rawStats.total_time_spent_minutes || 0,
        totalApplications: rawStats.total_applications || 0,
        totalInterviews: rawStats.total_interviews || 0,
        updatedAt: rawStats.updated_at,
    };
}

// Fonction helper pour convertir module Supabase → TypeScript
export function mapModuleFromDB(rawModule: any): Module {
    return {
        id: rawModule.id,
        weekNumber: rawModule.week_number,
        title: rawModule.title,
        description: rawModule.description,
        iconName: rawModule.icon_name,
        colorAccent: rawModule.color_accent,
        orderIndex: rawModule.order_index,
        isPublished: rawModule.is_published,
        unlockCondition: rawModule.unlock_condition,
        unlockDate: rawModule.unlock_date,
        createdAt: rawModule.created_at,
        updatedAt: rawModule.updated_at,
    };
}

// =====================================================
// 2️⃣ CHARGEMENT DES DONNÉES UTILISATEUR
// =====================================================

// À placer dans UserDataContext.tsx

interface UseUserDataOptions {
    userId?: string;
}

export async function loadUserProfile(
    supabase: any,
    userId: string
): Promise<UserProfile | null> {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error loading profile:', error);
            return null;
        }

        return mapProfileFromDB(data);
    } catch (error) {
        console.error('Exception loading profile:', error);
        return null;
    }
}

export async function loadUserStatistics(
    supabase: any,
    userId: string
): Promise<UserStatistics | null> {
    try {
        const { data, error } = await supabase
            .from('user_statistics')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error loading statistics:', error);
            return null;
        }

        return mapStatisticsFromDB(data);
    } catch (error) {
        console.error('Exception loading statistics:', error);
        return null;
    }
}

export async function loadUserModules(
    supabase: any,
    userId: string
): Promise<ModuleWithProgress[]> {
    try {
        // Récupérer tous les modules publiés
        const { data: modules, error: modulesError } = await supabase
            .from('modules')
            .select('*')
            .eq('is_published', true)
            .order('order_index', { ascending: true });

        if (modulesError) {
            console.error('Error loading modules:', modulesError);
            return [];
        }

        // Pour chaque module, calculer la progression
        const modulesWithProgress = await Promise.all(
            modules.map(async (module) => {
                // Récupérer les leçons de ce module
                const { data: lessons, error: lessonsError } = await supabase
                    .from('lessons')
                    .select('id')
                    .eq('module_id', module.id);

                if (lessonsError) {
                    console.error('Error loading lessons:', lessonsError);
                    return {
                        ...mapModuleFromDB(module),
                        status: 'available',
                        progress: 0,
                        xp: 0,
                    };
                }

                if (!lessons || lessons.length === 0) {
                    return {
                        ...mapModuleFromDB(module),
                        status: 'available',
                        progress: 0,
                        xp: 0,
                    };
                }

                // Récupérer la progression utilisateur pour les leçons
                const { data: userProgress, error: progressError } = await supabase
                    .from('user_lesson_progress')
                    .select('completion_percentage, status')
                    .eq('user_id', userId)
                    .in('lesson_id', lessons.map(l => l.id));

                if (progressError) {
                    console.error('Error loading progress:', progressError);
                    return {
                        ...mapModuleFromDB(module),
                        status: 'available',
                        progress: 0,
                        xp: 0,
                    };
                }

                // Calculer le progrès global du module
                const totalProgress = userProgress.reduce(
                    (sum, p) => sum + (p.completion_percentage || 0),
                    0
                );
                const progress = Math.round(totalProgress / lessons.length);

                // Déterminer le statut du module
                let status: ModuleStatus = 'available';
                if (progress === 100) {
                    status = 'completed';
                } else if (progress > 0) {
                    status = 'in_progress';
                }

                return {
                    ...mapModuleFromDB(module),
                    status,
                    progress,
                    xp: progress >= 100 ? 100 : 0,
                };
            })
        );

        return modulesWithProgress;
    } catch (error) {
        console.error('Exception loading modules:', error);
        return [];
    }
}

export async function loadTrackedOffers(
    supabase: any,
    userId: string
): Promise<UserTrackedOffer[]> {
    try {
        const { data, error } = await supabase
            .from('user_tracked_offers')
            .select(`
                id,
                offer_id,
                application_status,
                user_notes,
                application_date,
                interview_date,
                reminder_date,
                tracked_at,
                updated_at,
                job_offers (
                    id,
                    company_name,
                    title,
                    contract_type,
                    city,
                    is_active
                )
            `)
            .eq('user_id', userId)
            .order('updated_at', { ascending: false });

        if (error) {
            console.error('Error loading tracked offers:', error);
            return [];
        }

        return (data || []).map((item) => ({
            id: item.id,
            userId,
            offerId: item.offer_id,
            applicationStatus: item.application_status,
            userNotes: item.user_notes,
            applicationDate: item.application_date,
            interviewDate: item.interview_date,
            reminderDate: item.reminder_date,
            trackedAt: item.tracked_at,
            updatedAt: item.updated_at,
        }));
    } catch (error) {
        console.error('Exception loading tracked offers:', error);
        return [];
    }
}

export async function loadCVData(
    supabase: any,
    userId: string
): Promise<CVData | null> {
    try {
        const { data, error } = await supabase
            .from('cv_data')
            .select('*')
            .eq('user_id', userId)
            .single();

        if (error && error.code !== 'PGRST116') {
            console.error('Error loading CV data:', error);
            return null;
        }

        if (!data) {
            return {
                id: '',
                userId,
                fileName: null,
                fileUrl: null,
                status: 'not_uploaded',
                adminFeedback: null,
                uploadedAt: null,
                updatedAt: new Date().toISOString(),
            };
        }

        return {
            id: data.id,
            userId,
            fileName: data.file_name,
            fileUrl: data.file_url,
            status: data.status,
            adminFeedback: data.admin_feedback,
            uploadedAt: data.uploaded_at,
            updatedAt: data.updated_at,
        };
    } catch (error) {
        console.error('Exception loading CV data:', error);
        return null;
    }
}

// =====================================================
// 3️⃣ MISES À JOUR DES DONNÉES UTILISATEUR
// =====================================================

export async function updateUserProfile(
    supabase: any,
    userId: string,
    updates: Partial<UserProfile>
): Promise<boolean> {
    try {
        const dbUpdates: any = {};

        // Convertir camelCase → snake_case
        if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
        if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
        if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
        if (updates.birthDate !== undefined) dbUpdates.birth_date = updates.birthDate;
        if (updates.hasRQTH !== undefined) dbUpdates.has_rqth = updates.hasRQTH;
        if (updates.currentLevel !== undefined) dbUpdates.current_level = updates.currentLevel;
        if (updates.targetLevel !== undefined) dbUpdates.target_level = updates.targetLevel;
        if (updates.fieldOfInterest !== undefined) dbUpdates.field_of_interest = updates.fieldOfInterest;
        if (updates.city !== undefined) dbUpdates.city = updates.city;
        if (updates.postalCode !== undefined) dbUpdates.postal_code = updates.postalCode;
        if (updates.mobilityRadius !== undefined) dbUpdates.mobility_radius = updates.mobilityRadius;
        if (updates.onboardingCompleted !== undefined) dbUpdates.onboarding_completed = updates.onboardingCompleted;
        if (updates.onboardingStep !== undefined) dbUpdates.onboarding_step = updates.onboardingStep;
        if (updates.onboardingData !== undefined) dbUpdates.onboarding_data = updates.onboardingData;

        const { error } = await supabase
            .from('profiles')
            .update(dbUpdates)
            .eq('id', userId);

        if (error) {
            console.error('Error updating profile:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Exception updating profile:', error);
        return false;
    }
}

export async function updateModuleProgress(
    supabase: any,
    userId: string,
    lessonId: string,
    completion: number,
    status: 'not_started' | 'in_progress' | 'completed' | 'pending_validation' | 'validated'
): Promise<boolean> {
    try {
        // Vérifier si la progression existe
        const { data: existing, error: checkError } = await supabase
            .from('user_lesson_progress')
            .select('id')
            .eq('user_id', userId)
            .eq('lesson_id', lessonId)
            .single();

        if (checkError && checkError.code !== 'PGRST116') {
            console.error('Error checking progress:', checkError);
            return false;
        }

        if (existing) {
            // Mettre à jour
            const { error } = await supabase
                .from('user_lesson_progress')
                .update({
                    completion_percentage: completion,
                    status,
                    started_at: status === 'in_progress' && !existing.started_at ? new Date().toISOString() : undefined,
                    completed_at: status === 'completed' ? new Date().toISOString() : undefined,
                })
                .eq('user_id', userId)
                .eq('lesson_id', lessonId);

            if (error) {
                console.error('Error updating progress:', error);
                return false;
            }
        } else {
            // Créer
            const { error } = await supabase
                .from('user_lesson_progress')
                .insert({
                    user_id: userId,
                    lesson_id: lessonId,
                    completion_percentage: completion,
                    status,
                    started_at: status === 'in_progress' ? new Date().toISOString() : null,
                    completed_at: status === 'completed' ? new Date().toISOString() : null,
                });

            if (error) {
                console.error('Error creating progress:', error);
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error('Exception updating progress:', error);
        return false;
    }
}

export async function trackJobOffer(
    supabase: any,
    userId: string,
    offerId: string
): Promise<boolean> {
    try {
        const { error } = await supabase
            .from('user_tracked_offers')
            .insert({
                user_id: userId,
                offer_id: offerId,
                application_status: 'interested',
            });

        if (error) {
            console.error('Error tracking offer:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Exception tracking offer:', error);
        return false;
    }
}

export async function updateTrackedOffer(
    supabase: any,
    userId: string,
    offerId: string,
    updates: any
): Promise<boolean> {
    try {
        const dbUpdates: any = {};

        if (updates.applicationStatus !== undefined) dbUpdates.application_status = updates.applicationStatus;
        if (updates.userNotes !== undefined) dbUpdates.user_notes = updates.userNotes;
        if (updates.applicationDate !== undefined) dbUpdates.application_date = updates.applicationDate;
        if (updates.interviewDate !== undefined) dbUpdates.interview_date = updates.interviewDate;
        if (updates.reminderDate !== undefined) dbUpdates.reminder_date = updates.reminderDate;

        const { error } = await supabase
            .from('user_tracked_offers')
            .update(dbUpdates)
            .eq('user_id', userId)
            .eq('offer_id', offerId);

        if (error) {
            console.error('Error updating tracked offer:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Exception updating tracked offer:', error);
        return false;
    }
}

// =====================================================
// 4️⃣ CHARGEMENT POUR LES ADMINS
// =====================================================

export async function loadAllUsersForAdmin(supabase: any): Promise<UserProfile[]> {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'student')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error loading users:', error);
            return [];
        }

        return (data || []).map(mapProfileFromDB);
    } catch (error) {
        console.error('Exception loading users:', error);
        return [];
    }
}

export async function loadAllUserValidationsForAdmin(supabase: any): Promise<any[]> {
    try {
        const { data, error } = await supabase
            .from('user_lesson_progress')
            .select(`
                id,
                user_id,
                lesson_id,
                status,
                validation_status,
                user_submission,
                submitted_at,
                admin_feedback,
                profiles (email, first_name, last_name),
                lessons (title, module_id)
            `)
            .eq('validation_status', 'pending')
            .order('submitted_at', { ascending: true });

        if (error) {
            console.error('Error loading validations:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Exception loading validations:', error);
        return [];
    }
}

// =====================================================
// 5️⃣ EXEMPLE D'UTILISATION EN CONTEXTE REACT
// =====================================================

/*
// Dans UserDataContext.tsx :

const loadAllData = async () => {
    if (!userId) return;
    
    try {
        setIsLoading(true);
        
        const [profile, stats, modules, offers, cvData] = await Promise.all([
            loadUserProfile(supabase, userId),
            loadUserStatistics(supabase, userId),
            loadUserModules(supabase, userId),
            loadTrackedOffers(supabase, userId),
            loadCVData(supabase, userId),
        ]);
        
        setData({
            userProfile: profile || {},
            statistics: stats || initialUserStatistics,
            modules: modules || [],
            trackedOffers: offers || [],
            cvData: cvData || initialCVData,
        });
    } finally {
        setIsLoading(false);
    }
};

const handleProfileUpdate = async (updates: Partial<UserProfile>) => {
    const success = await updateUserProfile(supabase, userId, updates);
    if (success) {
        const updated = await loadUserProfile(supabase, userId);
        setData(d => ({ ...d, userProfile: updated }));
    }
};
*/

// =====================================================
// ✅ FIN DU FICHIER D'INTÉGRATION
// =====================================================
