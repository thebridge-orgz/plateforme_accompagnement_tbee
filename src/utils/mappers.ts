import { UserProfile, Module, ModuleWithProgress, ModuleStatus } from '../types/index';

export function mapProfileFromDB(raw: any): UserProfile {
    return {
        id: raw.id,
        email: raw.email,
        role: raw.role,
        firstName: raw.first_name,
        lastName: raw.last_name,
        phone: raw.phone,
        birthDate: raw.birth_date,
        hasRQTH: raw.has_rqth ?? false,
        address: raw.address,
        currentLevel: raw.current_level,
        targetLevel: raw.target_level,
        fieldOfInterest: raw.field_of_interest,
        city: raw.city,
        postalCode: raw.postal_code,
        mobilityRadius: raw.mobility_radius,
        onboardingCompleted: raw.onboarding_completed ?? false,
        onboardingStep: raw.onboarding_step ?? 1,
        onboardingData: raw.onboarding_data,
        isActive: raw.is_active ?? true,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
    };
}

export function mapModuleFromDB(raw: any): Module {
    return {
        id: raw.id,
        weekNumber: raw.week_number,
        title: raw.title,
        description: raw.description,
        iconName: raw.icon_name,
        colorAccent: raw.color_accent,
        orderIndex: raw.order_index,
        isPublished: raw.is_published,
        unlockCondition: raw.unlock_condition,
        unlockDate: raw.unlock_date,
        objectives: raw.objectives,
        keyConcepts: raw.key_concepts,
        resources: raw.resources,
        estimatedHours: raw.estimated_hours,
        difficultyLevel: raw.difficulty_level,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
    };
}

export function mapModuleProgressFromDB(raw: any): ModuleWithProgress {
    return {
        ...mapModuleFromDB(raw.modules || raw),
        status: raw.status as ModuleStatus,
        progress: raw.progress ?? 0,
        xp: raw.xp ?? 0,
        completedSteps: raw.completed_steps ?? [],
        startedAt: raw.started_at,
        completedAt: raw.completed_at,
        moduleId: raw.module_id
    };
}