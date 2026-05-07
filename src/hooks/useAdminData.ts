import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../config/supabaseClient';
import {
    profileService,
    cvService,
    offerService,
    moduleService
} from '../services/supabase';

import { UserProfile, CVData, TrackedOffer, Module, CVStatus } from '../types/index';
import { useAuth } from './useAuth';

// Types spécifiques à l'admin
export interface StudentWithStats extends UserProfile {
    statistics?: {
        totalLessonsCompleted: number;
        totalTimeSpentMinutes: number;
        currentStreakDays: number;
        moduleProgress: Record<string, { completed: boolean; progress: number }>;
    };
    lastActiveAt?: string;
}

export interface CVSubmission {
    id: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    fileUrl: string;
    fileName: string;
    submittedAt: string;
    status: CVStatus;
    reviewedBy?: string;
    reviewedAt?: string;
    feedback?: string;
    score?: number;
}

export interface AdminActivity {
    id: string;
    type: 'cv_submitted' | 'module_completed' | 'offer_help' | 'student_registered';
    studentId: string;
    studentName: string;
    message: string;
    timestamp: string;
    urgent: boolean;
    metadata?: Record<string, any>;
}

// Type pour les offres trackées avec infos étudiant
export interface TrackedOfferWithStudent extends TrackedOffer {
    studentName: string;
    studentEmail: string;
}

interface AdminDataState {
    students: StudentWithStats[];
    cvSubmissions: CVSubmission[];
    offerTrackings: TrackedOfferWithStudent[];
    modules: Module[];
    recentActivities: AdminActivity[];
    loading: boolean;
    error: Error | null;
}

interface GlobalStats {
    totalStudents: number;
    activeStudents: number;
    pendingCVs: number;
    offersNeedingHelp: number;
    averageProgress: number;
    completionRate: number;
}

interface UseAdminDataReturn extends AdminDataState {
    globalStats: GlobalStats;
    reviewCV: (cvId: string, status: CVStatus, feedback: string, score?: number) => Promise<void>;
    updateOfferHelp: (offerId: string, needsHelp: boolean, helpRequest?: string | null) => Promise<void>;
    getStudentById: (studentId: string) => StudentWithStats | undefined;
    getStudentStats: (studentId: string) => StudentWithStats['statistics'] | undefined;
    refresh: () => Promise<void>;
}

export function useAdminData(): UseAdminDataReturn {
    const { user, isAdmin } = useAuth();
    const [state, setState] = useState<AdminDataState>({
        students: [],
        cvSubmissions: [],
        offerTrackings: [],
        modules: [],
        recentActivities: [],
        loading: true,
        error: null,
    });

    // Helper pour obtenir le nom complet
    const getFullName = (student: UserProfile) => {
        return `${student.firstName || ''} ${student.lastName || ''}`.trim() || student.email;
    };

    // Helper pour convertir une offre brute en TrackedOfferWithStudent
    const mapToTrackedOfferWithStudent = (rawOffer: any, nameMap: Map<string, string>): TrackedOfferWithStudent => {
        return {
            id: rawOffer.id,
            userId: rawOffer.user_id,
            offerId: rawOffer.offer_id,
            companyName: rawOffer.company_name,
            positionTitle: rawOffer.position_title,
            offerUrl: rawOffer.offer_url,
            applicationStatus: rawOffer.application_status,
            userNotes: rawOffer.user_notes,
            applicationDate: rawOffer.application_date,
            interviewDate: rawOffer.interview_date,
            reminderDate: rawOffer.reminder_date,
            needsHelp: rawOffer.needs_help ?? false,
            helpRequest: rawOffer.help_request ?? null,
            trackedAt: rawOffer.tracked_at,
            updatedAt: rawOffer.updated_at,
            studentName: nameMap.get(rawOffer.user_id) || 'Étudiant inconnu',
            studentEmail: rawOffer.profiles?.email || '',
        };
    };

    // Chargement des données admin
    const loadAdminData = useCallback(async () => {
        if (!user?.id || !isAdmin) {
            setState(prev => ({ ...prev, loading: false }));
            return;
        }

        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // Charger tous les étudiants
            const students = await profileService.getAllStudents();

            // Créer un map des noms pour les activités
            const nameMap = new Map<string, string>();
            students.forEach(s => nameMap.set(s.id, getFullName(s)));

            // Charger les CVs
            const rawCVs = await cvService.getAllCVSubmissions();
            const cvSubmissions: CVSubmission[] = rawCVs.map((cv: any) => ({
                id: cv.id,
                studentId: cv.user_id,
                studentName: nameMap.get(cv.user_id) || 'Étudiant inconnu',
                studentEmail: cv.profiles?.email || '',
                fileUrl: cv.file_url,
                fileName: cv.file_name,
                submittedAt: cv.uploaded_at || cv.updated_at,
                status: cv.status === 'uploaded' ? 'pending' : cv.status,
                reviewedBy: cv.reviewed_by,
                reviewedAt: cv.reviewed_at,
                feedback: cv.admin_feedback,
                score: cv.score,
            }));

            // Charger les offres trackées avec le bon typage
            const rawOffers = await offerService.getAllTrackedOffers();
            const offerTrackings: TrackedOfferWithStudent[] = rawOffers.map((offer: any) =>
                mapToTrackedOfferWithStudent(offer, nameMap)
            );

            // Charger les modules
            const modules = await moduleService.getAllModules();

            // Charger les progressions pour calculer les stats
            const studentsWithStats = await Promise.all(
                students.map(async (student) => {
                    const progress = await moduleService.getUserModuleProgress(student.id);
                    const progressMap: Record<string, { completed: boolean; progress: number }> = {};
                    progress.forEach(p => {
                        progressMap[p.id] = {
                            completed: p.status === 'completed',
                            progress: p.progress,
                        };
                    });

                    return {
                        ...student,
                        statistics: {
                            totalLessonsCompleted: 0,
                            totalTimeSpentMinutes: 0,
                            currentStreakDays: 0,
                            moduleProgress: progressMap,
                        },
                        lastActiveAt: student.updatedAt,
                    };
                })
            );

            // Générer les activités récentes
            const activities: AdminActivity[] = [];

            // Activités CV
            cvSubmissions.slice(0, 10).forEach(cv => {
                activities.push({
                    id: `cv-${cv.id}`,
                    type: 'cv_submitted',
                    studentId: cv.studentId,
                    studentName: cv.studentName,
                    message: `A soumis son CV${cv.fileName ? ` : ${cv.fileName}` : ''}`,
                    timestamp: cv.submittedAt,
                    urgent: cv.status === 'pending',
                });
            });

            // Trier par date
            activities.sort((a, b) =>
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );

            setState({
                students: studentsWithStats,
                cvSubmissions,
                offerTrackings,
                modules,
                recentActivities: activities.slice(0, 20),
                loading: false,
                error: null,
            });
        } catch (error) {
            console.error('Error loading admin data:', error);
            setState(prev => ({
                ...prev,
                loading: false,
                error: error as Error,
            }));
        }
    }, [user?.id, isAdmin]);

    // Chargement initial et abonnement Realtime
    useEffect(() => {
        loadAdminData();

        // Configuration des listeners Realtime
        const channels = [
            'profiles',
            'cv_data',
            'user_tracked_offers',
            'user_module_progress'
        ].map(table =>
            supabase
                .channel(`admin_${table}`)
                .on('postgres_changes', { event: '*', schema: 'public', table }, () => {
                    loadAdminData();
                })
                .subscribe()
        );

        return () => {
            channels.forEach(channel => supabase.removeChannel(channel));
        };
    }, [loadAdminData]);

    // Actions Admin
    const reviewCV = useCallback(async (
        cvId: string,
        status: CVStatus,
        feedback: string,
        score?: number
    ) => {
        await cvService.reviewCV(cvId, status, feedback, score);

        setState(prev => ({
            ...prev,
            cvSubmissions: prev.cvSubmissions.map(cv =>
                cv.id === cvId
                    ? { ...cv, status, feedback, score, reviewedAt: new Date().toISOString() }
                    : cv
            ),
        }));
    }, []);

    const updateOfferHelp = useCallback(async (
        offerId: string,
        needsHelp: boolean,
        helpRequest?: string | null
    ) => {
        // Correction : s'assurer que helpRequest est soit string soit null (pas undefined)
        const finalHelpRequest = helpRequest === undefined ? null : helpRequest;

        await offerService.updateTrackedOffer(offerId, { needsHelp, helpRequest: finalHelpRequest });

        setState(prev => ({
            ...prev,
            offerTrackings: prev.offerTrackings.map(offer =>
                offer.id === offerId
                    ? {
                        ...offer,
                        needsHelp,
                        helpRequest: finalHelpRequest,
                        updatedAt: new Date().toISOString()
                    }
                    : offer
            ),
        }));
    }, []);

    const getStudentById = useCallback((studentId: string) => {
        return state.students.find(s => s.id === studentId);
    }, [state.students]);

    const getStudentStats = useCallback((studentId: string) => {
        const student = state.students.find(s => s.id === studentId);
        return student?.statistics;
    }, [state.students]);

    // Statistiques globales
    const globalStats: GlobalStats = {
        totalStudents: state.students.length,
        activeStudents: state.students.filter(s => {
            if (!s.lastActiveAt) return false;
            const lastActive = new Date(s.lastActiveAt);
            const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
            return daysSinceActive < 7;
        }).length,
        pendingCVs: state.cvSubmissions.filter(cv => cv.status === 'pending').length,
        offersNeedingHelp: state.offerTrackings.filter(o => o.needsHelp).length,
        averageProgress: (() => {
            if (state.students.length === 0) return 0;
            const total = state.students.reduce((sum, student) => {
                const progresses = Object.values(student.statistics?.moduleProgress || {});
                if (progresses.length === 0) return sum;
                const avgProgress = progresses.reduce((s, m) => s + m.progress, 0) / progresses.length;
                return sum + avgProgress;
            }, 0);
            return Math.round(total / state.students.length);
        })(),
        completionRate: (() => {
            if (state.students.length === 0) return 0;
            const total = state.students.reduce((sum, student) => {
                const progresses = Object.values(student.statistics?.moduleProgress || {});
                if (progresses.length === 0) return sum;
                const completed = progresses.filter(m => m.completed).length;
                return sum + (completed / progresses.length) * 100;
            }, 0);
            return Math.round(total / state.students.length);
        })(),
    };

    return {
        ...state,
        globalStats,
        reviewCV,
        updateOfferHelp,
        getStudentById,
        getStudentStats,
        refresh: loadAdminData,
    };
}