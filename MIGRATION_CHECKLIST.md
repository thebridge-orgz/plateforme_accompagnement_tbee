# 🔄 Guide Complet de Intégration Frontend → Supabase

## 🎯 Objectif
Connecter votre code React actuel (qui utilise du localStorage et des états locaux) 
à la vraie base de données Supabase créée par le script SQL.

---

## 📍 Fichiers à modifier (ordre de priorité)

### 1️⃣ **PRIORITÉ 1** : `src/app/auth/AuthContext.tsx`
**Objectif** : Assurer que les profils se créent automatiquement à l'inscription

#### ✅ À vérifier que c'est déjà correct :
```typescript
// C'est BON si vous avez ça :
const { error: profileError } = await supabase
    .from('profiles')
    .insert({
        id: data.user.id,
        email: email,
        first_name: firstName,
        last_name: lastName,
        role: 'student', // ou 'student'
        has_rqth: hasRQTH || false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    });
```

#### ✅ Les rôles correspondront parfaitement :
Votre type `user.ts` utilise déjà les bons rôles :
```typescript
export type UserRole = 'student' | 'admin';
```

Et la BD utilise exactement les mêmes :
```sql
role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin'))
```

**Aucune modification nécessaire** : le mapping est déjà correct !

---

### 2️⃣ **PRIORITÉ 2** : `src/context/UserDataContext.tsx`
**Objectif** : Charger les vraies données depuis Supabase au lieu du localStorage

#### Avant (état local) :
```typescript
const loadData = useCallback(async () => {
    setData({ ...initialDashboardData, ...initialData }); // ❌ Données en dur
}, [initialData]);
```

#### Après (Supabase) :
```typescript
const loadData = useCallback(async () => {
    if (!userId) return;
    
    try {
        setIsLoading(true);
        
        // Charger TOUS les profils utilisateurs
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();
        
        if (profileError) {
            console.error('Erreur chargement profil:', profileError);
            return;
        }
        
        // Charger statistiques
        const { data: stats, error: statsError } = await supabase
            .from('user_statistics')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        // Charger modules
        const { data: modules, error: modulesError } = await supabase
            .from('modules')
            .select('*')
            .eq('is_published', true)
            .order('order_index', { ascending: true });
        
        // Charger offres suivies
        const { data: trackedOffers, error: offersError } = await supabase
            .from('user_tracked_offers')
            .select('*')
            .eq('user_id', userId);
        
        // Charger CV
        const { data: cv, error: cvError } = await supabase
            .from('cv_data')
            .select('*')
            .eq('user_id', userId)
            .single();
        
        setData({
            userProfile: profile ? mapProfileFromDB(profile) : {},
            statistics: stats ? mapStatisticsFromDB(stats) : initialUserStatistics,
            modules: modules ? modules.map(m => mapModuleFromDB(m)) : [],
            trackedOffers: trackedOffers || [],
            cvData: cv || initialCVData,
        });
    } finally {
        setIsLoading(false);
    }
}, [userId]);
```

#### Actions à mettre à jour :

**`updateUserProfile()`** :
```typescript
const updateUserProfile = useCallback(async (updates: Partial<UserProfile>) => {
    if (!userId) return;
    
    try {
        // Convertir camelCase → snake_case pour la BD
        const dbUpdates = {
            first_name: updates.firstName,
            last_name: updates.lastName,
            phone: updates.phone,
            birth_date: updates.birthDate,
            has_rqth: updates.hasRQTH,
            current_level: updates.currentLevel,
            target_level: updates.targetLevel,
            field_of_interest: updates.fieldOfInterest,
            city: updates.city,
            postal_code: updates.postalCode,
            mobility_radius: updates.mobilityRadius,
            onboarding_completed: updates.onboardingCompleted,
            onboarding_step: updates.onboardingStep,
            onboarding_data: updates.onboardingData,
        };
        
        const { error } = await supabase
            .from('profiles')
            .update(dbUpdates)
            .eq('id', userId);
        
        if (error) throw error;
        
        // Rafraîchir les données locales
        setData(prev => ({
            ...prev,
            userProfile: { ...prev.userProfile, ...updates }
        }));
    } catch (error) {
        console.error('Erreur mise à jour profil:', error);
    }
}, [userId]);
```

**`completeModule()`** :
```typescript
const completeModule = useCallback(async (moduleId: string) => {
    if (!userId) return;
    
    try {
        // Récupérer les leçons du module
        const { data: lessons } = await supabase
            .from('lessons')
            .select('id')
            .eq('module_id', moduleId);
        
        if (!lessons) return;
        
        // Marquer toutes les leçons comme complétées
        const updates = lessons.map(lesson => ({
            user_id: userId,
            lesson_id: lesson.id,
            status: 'completed',
            completion_percentage: 100,
            completed_at: new Date().toISOString(),
        }));
        
        for (const update of updates) {
            await supabase
                .from('user_lesson_progress')
                .upsert(update);
        }
        
        // Mettre à jour les statistiques
        await supabase
            .from('user_statistics')
            .update({
                total_lessons_completed: lessons.length,
                current_week: (new Date().toISOString().split('W')[1] || 1) as any,
            })
            .eq('user_id', userId);
        
        // Rafraîchir localement
        setData(prev => ({
            ...prev,
            modules: prev.modules.map(m =>
                m.id === moduleId
                    ? { ...m, status: 'completed', progress: 100 }
                    : m
            ),
        }));
    } catch (error) {
        console.error('Erreur complétion module:', error);
    }
}, [userId]);
```

---

### 3️⃣ **PRIORITÉ 3** : `src/context/AdminDataContext.tsx`
**Objectif** : Que les admins voient toutes les données via Supabase RLS

#### Charger les utilisateurs (pour admins) :
```typescript
const loadAllUsers = useCallback(async () => {
    if (!userProfile || userProfile.role !== 'admin') return;
    
    try {
        const { data: users, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('role', 'student')
            .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setAllUsers(users || []);
    } catch (error) {
        console.error('Erreur chargement utilisateurs:', error);
    }
}, [userProfile]);
```

#### Charger les validations en attente :
```typescript
const loadPendingValidations = useCallback(async () => {
    if (!userProfile || userProfile.role !== 'admin') return;
    
    try {
        const { data: validations, error } = await supabase
            .from('user_lesson_progress')
            .select(`
                id,
                user_id,
                lesson_id,
                status,
                validation_status,
                user_submission,
                submitted_at,
                profiles (id, email, first_name, last_name),
                lessons (id, title, module_id)
            `)
            .eq('validation_status', 'pending')
            .order('submitted_at', { ascending: true });
        
        if (error) throw error;
        
        setExerciseSubmissions(validations || []);
    } catch (error) {
        console.error('Erreur chargement validations:', error);
    }
}, [userProfile]);
```

---

### 4️⃣ **PRIORITÉ 4** : `src/types/index.ts`
**Objectif** : Mettre à jour les types pour correspondre à la BD

#### Avant :
```typescript
export type UserRole = 'student' | 'admin'; // ✅ C'est bon

export interface UserProfile {
    id: string;
    email: string;
    firstName: string; // ⚠️ Vérifier ça correspond
    lastName: string;
    role: UserRole;
    // ... autres champs
    createdAt: string;
    updatedAt: string;
}

export interface Module {
    id: string;
    weekNumber: number; // ✅ Correspond à week_number
    title: string;
    // ...
    createdAt: string;
    updatedAt: string;
}
```

### 5️⃣ **PRIORITÉ 5** : `src/types/user.ts`
**Mettez à jour les types mapping** :

```typescript
export type UserRole = 'student' | 'admin'; // ✅ Changé 'student' →  'student'

export interface UserProfile {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    hasRQTH?: boolean;
    createdAt: string;
    updatedAt: string;
    onboardingCompleted?: boolean;
    onboardingData?: OnboardingData;
}

// Type pour mapper les données brutes de Supabase
export interface RawUserProfile {
    id: string;
    email: string;
    first_name: string; // Match BD
    last_name: string;
    role: UserRole;
    has_rqth?: boolean;
    created_at: string;
    updated_at: string;
    onboarding_completed?: boolean;
    onboarding_data?: OnboardingData;
}
```

---

## 🔄 Mappage des champs (camelCase ↔ snake_case)

| TypeScript | Base de Données | Type |
|---|---|---|
| `id` | `id` | UUID |
| `email` | `email` | TEXT |
| `firstName` | `first_name` | TEXT |
| `lastName` | `last_name` | TEXT |
| `phone` | `phone` | TEXT |
| `birthDate` | `birth_date` | DATE |
| `hasRQTH` | `has_rqth` | BOOLEAN |
| `currentLevel` | `current_level` | TEXT |
| `targetLevel` | `target_level` | TEXT |
| `fieldOfInterest` | `field_of_interest` | TEXT |
| `city` | `city` | TEXT |
| `postalCode` | `postal_code` | TEXT |
| `mobilityRadius` | `mobility_radius` | INTEGER |
| `onboardingCompleted` | `onboarding_completed` | BOOLEAN |
| `onboardingStep` | `onboarding_step` | INTEGER |
| `onboardingData` | `onboarding_data` | JSONB |
| `isActive` | `is_active` | BOOLEAN |
| `createdAt` | `created_at` | TIMESTAMPTZ |
| `updatedAt` | `updated_at` | TIMESTAMPTZ |
| `weekNumber` | `week_number` | INTEGER |
| `iconName` | `icon_name` | TEXT |
| `colorAccent` | `color_accent` | TEXT |
| `orderIndex` | `order_index` | INTEGER |
| `isPublished` | `is_published` | BOOLEAN |
| `unlockCondition` | `unlock_condition` | TEXT |
| `unlockDate` | `unlock_date` | TIMESTAMPTZ |
| `moduleId` | `module_id` | UUID |
| `lessonId` | `lesson_id` | UUID |
| `completionPercentage` | `completion_percentage` | INTEGER |
| `validationStatus` | `validation_status` | TEXT |
| `adminFeedback` | `admin_feedback` | TEXT |
| `validatedBy` | `validated_by` | UUID |
| `validatedAt` | `validated_at` | TIMESTAMPTZ |
| `userSubmission` | `user_submission` | JSONB |
| `submittedAt` | `submitted_at` | TIMESTAMPTZ |
| `startedAt` | `started_at` | TIMESTAMPTZ |
| `completedAt` | `completed_at` | TIMESTAMPTZ |
| `companyName` | `company_name` | TEXT |
| `companyLogoUrl` | `company_logo_url` | TEXT |
| `contractType` | `contract_type` | TEXT |
| `levelRequired` | `level_required` | TEXT |
| `postalCode` | `postal_code` | TEXT |
| `remotePossible` | `remote_possible` | BOOLEAN |
| `salaryRange` | `salary_range` | TEXT |
| `startDate` | `start_date` | DATE |
| `durationMonths` | `duration_months` | INTEGER |
| `rqthFriendly` | `rqth_friendly` | BOOLEAN |
| `accessibilityFeatures` | `accessibility_features` | TEXT[] |
| `applicationUrl` | `application_url` | TEXT |
| `externalUrl` | `external_url` | TEXT |
| `isActive` | `is_active` | BOOLEAN |
| `isFeatured` | `is_featured` | BOOLEAN |
| `externalId` | `external_id` | TEXT |
| `expiresAt` | `expires_at` | TIMESTAMPTZ |
| `offerId` | `offer_id` | UUID |
| `applicationStatus` | `application_status` | TEXT |
| `userNotes` | `user_notes` | TEXT |
| `applicationDate` | `application_date` | DATE |
| `interviewDate` | `interview_date` | TIMESTAMPTZ |
| `reminderDate` | `reminder_date` | TIMESTAMPTZ |
| `trackedAt` | `tracked_at` | TIMESTAMPTZ |
| `fileName` | `file_name` | TEXT |
| `fileUrl` | `file_url` | TEXT |
| `uploadedAt` | `uploaded_at` | TIMESTAMPTZ |
| `totalLessonsCompleted` | `total_lessons_completed` | INTEGER |
| `totalLessonsValidated` | `total_lessons_validated` | INTEGER |
| `currentWeek` | `current_week` | INTEGER |
| `currentStreakDays` | `current_streak_days` | INTEGER |
| `longestStreakDays` | `longest_streak_days` | INTEGER |
| `lastActivityDate` | `last_activity_date` | DATE |
| `totalTimeSpentMinutes` | `total_time_spent_minutes` | INTEGER |
| `totalApplications` | `total_applications` | INTEGER |
| `totalInterviews` | `total_interviews` | INTEGER |
| `adminId` | `admin_id` | UUID |
| `messageType` | `message_type` | TEXT |
| `isRead` | `is_read` | BOOLEAN |

---

## 🧪 Checklist de migration

- [ ] Script SQL exécuté ✅
- [ ] Rôles changés de 'student' → 'student'
- [ ] `src/types/user.ts` mis à jour
- [ ] `src/app/auth/AuthContext.tsx` vérifié
- [ ] `src/context/UserDataContext.tsx` connecté à Supabase
- [ ] `src/context/AdminDataContext.tsx` connecté à Supabase
- [ ] Mappers camelCase ↔ snake_case en place
- [ ] Tests d'inscription fonctionnant
- [ ] Profil auto-créé en BD ✅
- [ ] Données affichées depuis Supabase (pas localStorage)
- [ ] Admin voit tous les utilisateurs
- [ ] Validations visibles pour admins
- [ ] RLS en place (politiques respectées)

---

## 🆘 Erreurs courantes

### Erreur : "role 'student' does not exist"
**Cause** : Vous utilisez `'student'` au lieu de `'student'`
**Solution** : Recherchez/remplacez `'student'` → `'student'`

### Erreur : "Column 'first_name' does not exist"
**Cause** : Vous utilisez camelCase au lieu de snake_case
**Solution** : Utilisez `first_name`, `last_name`, etc en BD

### Erreur : "new row violates row-level security"
**Cause** : L'utilisateur n'a pas la permission d'accéder à cette donnée
**Solution** : Vérifiez les politiques RLS

### Erreur : "TypeError: Cannot read property 'map' of null"
**Cause** : Les données n'ont pas chargé depuis Supabase
**Solution** : Vérifiez les logs, ajoutez du console.log()

---

## 💡 Astuces pour debug

```typescript
// Debug 1 : Vérifier les données reçues
const { data, error } = await supabase.from('profiles').select('*').single();
console.log('Profil reçu:', data);
console.log('Erreur:', error);

// Debug 2 : Vérifier les permissions RLS
// Allez dans Supabase → Table → RLS policies

// Debug 3 : Vérifier les logs DB
// Supabase → Logs → Postgres Logs

// Debug 4 : Tester l'utilisateur connecté
const { data: { user } } = await supabase.auth.getUser();
console.log('Utilisateur connecté:', user?.id, user?.email);
```

---

🎉 **Une fois terminé, votre plateforme TBEE sera complètement connectée à Supabase !**
