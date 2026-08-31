import { Award, BookOpen, TrendingUp, Users, AlertTriangle, Clock, FileText, Briefcase, CheckCircle2, Target, Settings, BarChart2, MapPin } from 'lucide-react';
import { StatCard } from '../../components/StatCard';
import { routes } from '../../router/routes';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../../types/user';
import { useAdminData } from '../../../hooks/useAdminData';
import { formatDateTime } from '../../../utils/date';

interface AdminDashboardProps {
    user: UserProfile;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
    const { globalStats, recentActivities, loading } = useAdminData();

    const inactiveStudents = globalStats.totalStudents - globalStats.activeStudents;

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'cv_submitted':    return <FileText className="w-5 h-5 text-[#FFD600]" />;
            case 'module_completed': return <CheckCircle2 className="w-5 h-5 text-[#10B981]" />;
            case 'offer_help':      return <Briefcase className="w-5 h-5 text-[#EF4444]" />;
            default:                return <Target className="w-5 h-5 text-[#6B7280]" />;
        }
    };

    const formatRelativeTime = (timestamp: string) => {
        const diff = Date.now() - new Date(timestamp).getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        if (minutes < 60) return `${minutes} min`;
        if (hours < 24) return `${hours}h`;
        return `${days}j`;
    };

    return (
        <div className="min-h-screen bg-[#F8F9FD] pb-16">
            {/* Header */}
            <div className="bg-white border-b border-[rgba(30,21,72,0.08)]">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8">
                    <h1 className="text-[28px] sm:text-[32px] lg:text-[36px] font-bold leading-tight text-[#1E1548] mb-2">
                        {user?.firstName ? `Bonjour, ${user.firstName} 👋` : 'Tableau de bord administrateur'}
                    </h1>
                    <p className="text-[14px] sm:text-[16px] text-[#6B7280]">
                        Suivi et gestion de la plateforme TBEE
                    </p>
                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    <StatCard
                        title="Étudiants totaux"
                        value={loading ? '…' : globalStats.totalStudents}
                        icon={<Users className="w-6 h-6 text-primary" />}
                    />
                    <StatCard
                        title="Étudiants actifs"
                        value={loading ? '…' : globalStats.activeStudents}
                        icon={<TrendingUp className="w-6 h-6 text-primary" />}
                    />
                    <StatCard
                        title="Taux de complétion"
                        value={loading ? '…' : `${Math.round(globalStats.completionRate)}%`}
                        icon={<Award className="w-6 h-6 text-primary" />}
                    />
                    <StatCard
                        title="Validations en attente"
                        value={loading ? '…' : globalStats.pendingCVs}
                        icon={<BookOpen className="w-6 h-6 text-primary" />}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Urgent Tasks */}
                        <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
                            <div className="flex items-center gap-3 mb-4 sm:mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#FEF2F2] flex items-center justify-center">
                                    <AlertTriangle className="w-5 h-5 text-[#EF4444]" />
                                </div>
                                <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">Tâches urgentes</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                {[
                                    { label: 'CVs en attente de validation', count: globalStats.pendingCVs, path: routes.AdminCvReview.path },
                                    { label: 'Demandes d\'aide candidatures', count: globalStats.offersNeedingHelp, path: routes.AdminProspection.path },
                                    { label: 'Étudiants inactifs (+7j)', count: inactiveStudents, path: routes.AdminStudentList.path },
                                ].map((task, i) => (
                                    <Link key={i} to={task.path} className="block w-full">
                                        <button className="w-full bg-[#F8F9FD] hover:bg-[#E8ECFF] border-2 border-[rgba(30,21,72,0.08)] hover:border-[#FFD600] rounded-[12px] p-4 text-left transition-all">
                                            <div className="flex items-start justify-between mb-2">
                                                <p className="text-[14px] sm:text-[15px] font-semibold text-[#1E1548] leading-tight pr-2">
                                                    {task.label}
                                                </p>
                                                <span className="w-8 h-8 rounded-full bg-[#EF4444] text-white text-[14px] font-bold flex items-center justify-center flex-shrink-0">
                                                    {loading ? '…' : task.count}
                                                </span>
                                            </div>
                                            <p className="text-[12px] text-[#6B7280]">Cliquer pour traiter →</p>
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activities */}
                        <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
                            <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548] mb-4 sm:mb-6">
                                Activités récentes
                            </h2>

                            {recentActivities.length === 0 ? (
                                <p className="text-[14px] text-[#6B7280] text-center py-4">
                                    {loading ? 'Chargement…' : 'Aucune activité récente.'}
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {recentActivities.map((activity) => (
                                        <div
                                            key={activity.id}
                                            className={`flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-[12px] transition-all ${
                                                activity.urgent
                                                    ? 'bg-[#FFF4CC] border-2 border-[#FFD600]'
                                                    : 'bg-[#F8F9FD] border border-[rgba(30,21,72,0.08)]'
                                            }`}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                                                {getActivityIcon(activity.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[14px] sm:text-[15px] font-semibold text-[#1E1548] mb-1">
                                                    {activity.studentName}
                                                </p>
                                                <p className="text-[13px] sm:text-[14px] text-[#6B7280]">
                                                    {activity.message}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2 flex-shrink-0">
                                                <span className="text-[12px] text-[#6B7280]">
                                                    {formatRelativeTime(activity.timestamp)}
                                                </span>
                                                {activity.urgent && (
                                                    <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <Link to={routes.AdminStudentList.path}>
                                <button className="w-full mt-4 h-12 bg-white border-2 border-[#1E1548] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#1E1548] hover:text-white transition-all">
                                    Voir toutes les activités
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6 shadow-[0_2px_8px_rgba(30,21,72,0.04)]">
                            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-4">Actions rapides</h3>
                            <div className="space-y-3">
                                <Link to={routes.AdminCvReview.path} className="block w-full">
                                    <button className="w-full h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#FDC700] transition-all flex items-center justify-between px-4">
                                        <span className="flex items-center gap-2">
                                            <FileText className="w-4 h-4" />
                                            Valider les CVs
                                        </span>
                                        <span className="w-6 h-6 rounded-full bg-[#1E1548] text-white text-[12px] font-bold flex items-center justify-center">
                                            {globalStats.pendingCVs}
                                        </span>
                                    </button>
                                </Link>

                                <Link to={routes.AdminProspection.path} className="block w-full">
                                    <button className="w-full h-12 bg-[#FFF4CC] border-2 border-[#FFD600] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#FFE566] transition-all flex items-center justify-center gap-2 px-4 whitespace-nowrap">
                                        <MapPin className="w-4 h-4 flex-shrink-0" />
                                        Pokédex candidatures
                                    </button>
                                </Link>

<Link to={routes.AdminSettings.path} className="block w-full">
                                    <button className="w-full h-12 bg-white border-2 border-[#E8ECFF] text-[#1E1548] rounded-[12px] text-[14px] sm:text-[16px] font-semibold hover:bg-[#E8ECFF] transition-all flex items-center justify-center gap-2 px-4">
                                        <Settings className="w-4 h-4" />
                                        Paramètres
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Performance globale */}
                        <div className="bg-gradient-to-br from-[#E8ECFF] to-[#F8F9FD] border border-[rgba(30,21,72,0.08)] rounded-[16px] p-4 sm:p-6">
                            <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-4 flex items-center gap-2">
                                <BarChart2 className="w-5 h-5 text-[#1E1548]" />
                                Performance globale
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">Progression moyenne</span>
                                        <span className="text-[13px] sm:text-[14px] font-bold text-[#1E1548]">
                                            {Math.round(globalStats.averageProgress)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#FFD600] rounded-full transition-all"
                                            style={{ width: `${Math.round(globalStats.averageProgress)}%` }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[13px] sm:text-[14px] font-medium text-[#1E1548]">Taux de complétion</span>
                                        <span className="text-[13px] sm:text-[14px] font-bold text-[#1E1548]">
                                            {Math.round(globalStats.completionRate)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-white rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#10B981] rounded-full transition-all"
                                            style={{ width: `${Math.round(globalStats.completionRate)}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-[rgba(30,21,72,0.08)]">
                                    <p className="text-[13px] text-[#6B7280] leading-[20px]">
                                        {globalStats.totalStudents > 0
                                            ? `${globalStats.activeStudents} étudiant(s) actif(s) sur ${globalStats.totalStudents} inscrits.`
                                            : 'Aucun étudiant inscrit pour le moment.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Alert box étudiants inactifs */}
                        <div className="bg-gradient-to-br from-[#FEF2F2] to-[#FEE2E2] border-2 border-[#EF4444] rounded-[16px] p-4 sm:p-6">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-[#EF4444] flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-[16px] sm:text-[18px] font-bold text-[#1E1548] mb-1">
                                        Étudiants inactifs
                                    </h3>
                                    <p className="text-[13px] sm:text-[14px] text-[#6B7280] leading-[20px]">
                                        {inactiveStudents} étudiant(s) n'ont pas été actifs depuis plus de 7 jours
                                    </p>
                                </div>
                            </div>
                            <Link to={routes.AdminStudentList.path}>
                                <button className="w-full h-10 bg-white border-2 border-[#EF4444] text-[#EF4444] rounded-[10px] text-[14px] font-semibold hover:bg-[#EF4444] hover:text-white transition-all">
                                    Voir les détails
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
