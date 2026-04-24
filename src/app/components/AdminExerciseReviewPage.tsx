import { ArrowLeft, FileText, CheckCircle2, XCircle, Clock, Star, Send, Eye } from 'lucide-react';
import { useState } from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import { Link } from 'react-router-dom';
import { routes } from '../router/routes';

interface AdminExerciseReviewPageProps {
  onNavigate: (page: string) => void;
}

export function AdminExerciseReviewPage({ onNavigate }: AdminExerciseReviewPageProps) {
  const { exerciseSubmissions, gradeExercise } = useAdminData();

  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('pending');
  const [reviewScore, setReviewScore] = useState<number>(0);
  const [reviewFeedback, setReviewFeedback] = useState<string>('');
  const [adminNotes, setAdminNotes] = useState<string>('');

  const filteredExercises = filter === 'all'
    ? exerciseSubmissions
    : exerciseSubmissions.filter(ex => ex.status === filter);

  const pendingCount = exerciseSubmissions.filter(ex => ex.status === 'pending').length;

  const selectedExerciseData = exerciseSubmissions.find(ex => ex.id === selectedExercise);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Débutant':
        return 'bg-[#F0FDF4] text-[#10B981]';
      case 'Intermédiaire':
        return 'bg-[#FFF4CC] text-[#1E1548]';
      case 'Avancé':
        return 'bg-[#FEF2F2] text-[#EF4444]';
      default:
        return 'bg-[#F3F4F6] text-[#6B7280]';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4CC] text-[#1E1548] text-[12px] font-semibold">
            <Clock className="w-3.5 h-3.5" />
            À corriger
          </span>
        );
      case 'graded':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] text-[#10B981] text-[12px] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Corrigé
          </span>
        );
      default:
        return null;
    }
  };

  const handleGrade = (exerciseId: string) => {
    if (!reviewFeedback || reviewScore === 0) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    gradeExercise(exerciseId, reviewScore, reviewFeedback);
    alert(`Exercice corrigé ! Feedback envoyé à l'étudiant.`);
    setSelectedExercise(null);
    setReviewScore(0);
    setReviewFeedback('');
    setAdminNotes('');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <Link to={routes.AdminDashboard.path}>
              <button
                className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Retour"
              >
                <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
              </button>
            </Link>
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Correction des exercices
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                Évaluez les cas pratiques et donnez un feedback personnalisé
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8">
        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all ${filter === 'all'
                ? 'bg-[#1E1548] text-white'
                : 'bg-white border border-[rgba(30,21,72,0.08)] text-[#1E1548] hover:bg-[#F8F9FD]'
                }`}
            >
              Tous ({exerciseSubmissions.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all flex items-center gap-2 ${filter === 'pending'
                ? 'bg-[#FFD600] text-[#1E1548]'
                : 'bg-white border border-[rgba(30,21,72,0.08)] text-[#1E1548] hover:bg-[#F8F9FD]'
                }`}
            >
              À corriger
              {pendingCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-[11px] font-bold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setFilter('graded')}
              className={`px-4 py-2 rounded-[10px] text-[14px] font-semibold transition-all ${filter === 'graded'
                ? 'bg-[#10B981] text-white'
                : 'bg-white border border-[rgba(30,21,72,0.08)] text-[#1E1548] hover:bg-[#F8F9FD]'
                }`}
            >
              Corrigés
            </button>
          </div>
        </div>

        {/* Exercise List */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6">
          {filteredExercises.length === 0 ? (
            <div className="bg-white border border-[rgba(30,21,72,0.08)] rounded-[16px] p-12 text-center">
              <FileText className="w-16 h-16 text-[#6B7280] mx-auto mb-4" />
              <p className="text-[16px] text-[#6B7280]">Aucun exercice trouvé</p>
            </div>
          ) : (
            filteredExercises.map((exercise) => (
              <div
                key={exercise.id}
                className={`bg-white border-2 rounded-[16px] p-4 sm:p-6 transition-all ${exercise.status === 'pending'
                  ? 'border-[#FFD600] shadow-[0_2px_8px_rgba(255,214,0,0.1)]'
                  : 'border-[rgba(30,21,72,0.08)] shadow-[0_2px_8px_rgba(30,21,72,0.04)]'
                  } hover:shadow-[0_6px_20px_rgba(30,21,72,0.1)]`}
              >
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                  {/* Left: student & Exercise Info */}
                  <div className="flex-1 min-w-0">
                    {/* student */}
                    <div className="mb-4">
                      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#1E1548] mb-1">
                        {exercise.studentName}
                      </h3>
                    </div>

                    {/* Exercise Details */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                      <h4 className="text-[16px] sm:text-[18px] font-semibold text-[#1E1548]">
                        {exercise.moduleName}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 bg-[#E8ECFF] text-[#1E1548] text-[11px] font-semibold rounded">
                          Module {exercise.moduleId}
                        </span>
                        <span className={`px-2.5 py-1 text-[11px] font-semibold rounded bg-[#FFF4CC] text-[#1E1548]`}>
                          {exercise.exerciseType === 'practical_case' ? 'Cas pratique' : exercise.exerciseType === 'quiz' ? 'Quiz' : 'Simulation'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-[13px] text-[#6B7280] mb-4">
                      <span>📅 {new Date(exercise.submittedAt).toLocaleString('fr-FR')}</span>
                      {getStatusBadge(exercise.status)}
                    </div>

                    {/* student Answer Preview */}
                    {exercise.content && (
                      <div className="bg-[#F8F9FD] rounded-[12px] p-4 mb-4">
                        <p className="text-[12px] font-semibold text-[#1E1548] mb-2">
                          📝 Réponse de l'étudiant
                        </p>
                        <p className="text-[13px] sm:text-[14px] text-[#1E1548] leading-[22px] line-clamp-3">
                          {exercise.content}
                        </p>
                      </div>
                    )}

                    {/* Score & Feedback (if graded) */}
                    {exercise.status === 'graded' && (
                      <div className="space-y-3">
                        {exercise.score !== undefined && (
                          <div className="flex items-center gap-3 p-3 bg-[#FFF4CC] rounded-[12px]">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.round(exercise.score! / 20)
                                    ? 'text-[#FFD600] fill-[#FFD600]'
                                    : 'text-[#E5E7EB]'
                                    }`}
                                />
                              ))}
                            </div>
                            <span className="text-[18px] font-bold text-[#1E1548]">
                              {exercise.score}/{exercise.maxScore}
                            </span>
                          </div>
                        )}

                        {exercise.feedback && (
                          <div className="p-3 bg-[#E8ECFF] rounded-[12px]">
                            <p className="text-[12px] font-semibold text-[#1E1548] mb-1">
                              💬 Feedback envoyé
                            </p>
                            <p className="text-[13px] text-[#1E1548] leading-[20px]">
                              {exercise.feedback}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col gap-2 sm:gap-3 lg:w-48">
                    <button
                      onClick={() => setSelectedExercise(exercise.id)}
                      className="h-10 bg-[#E8ECFF] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#D4DCFF] transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Voir détails
                    </button>
                    {exercise.status === 'pending' && (
                      <button
                        onClick={() => {
                          setSelectedExercise(exercise.id);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="h-10 bg-[#FFD600] text-[#1E1548] rounded-[10px] text-[14px] font-semibold hover:bg-[#FDC700] transition-all flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Corriger
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Grading Modal */}
        {selectedExercise && selectedExerciseData && selectedExerciseData.status === 'pending' && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-[16px] max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-[rgba(30,21,72,0.08)] p-4 sm:p-6 rounded-t-[16px]">
                <div className="flex items-center justify-between">
                  <h2 className="text-[20px] sm:text-[24px] font-bold text-[#1E1548]">
                    Correction de l'exercice
                  </h2>
                  <button
                    onClick={() => setSelectedExercise(null)}
                    className="w-8 h-8 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors"
                  >
                    <XCircle className="w-5 h-5 text-[#6B7280]" />
                  </button>
                </div>
                <p className="text-[14px] text-[#6B7280] mt-1">
                  {selectedExerciseData.studentName} - {selectedExerciseData.moduleName}
                </p>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {/* student Answer */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#1E1548] mb-2">
                    Réponse de l'étudiant
                  </label>
                  <div className="bg-[#F8F9FD] rounded-[12px] p-4 border border-[rgba(30,21,72,0.08)]">
                    <p className="text-[14px] text-[#1E1548] leading-[22px] whitespace-pre-wrap">
                      {selectedExerciseData.content}
                    </p>
                  </div>
                </div>

                {/* Score Input */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#1E1548] mb-3">
                    Note (0-{selectedExerciseData.maxScore})
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max={selectedExerciseData.maxScore}
                      step="5"
                      value={reviewScore}
                      onChange={(e) => setReviewScore(Number(e.target.value))}
                      className="flex-1 h-2 bg-[#E5E7EB] rounded-full appearance-none cursor-pointer accent-[#FFD600]"
                    />
                    <div className="w-16 h-12 bg-[#FFD600] rounded-[10px] flex items-center justify-center">
                      <span className="text-[20px] font-bold text-[#1E1548]">{reviewScore}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${i < Math.round((reviewScore / selectedExerciseData.maxScore) * 5)
                          ? 'text-[#FFD600] fill-[#FFD600]'
                          : 'text-[#E5E7EB]'
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#1E1548] mb-2">
                    Feedback pour l'étudiant
                  </label>
                  <textarea
                    value={reviewFeedback}
                    onChange={(e) => setReviewFeedback(e.target.value)}
                    placeholder="Rédige un feedback constructif et encourageant..."
                    className="w-full h-32 px-4 py-3 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#FFD600] resize-none"
                  />
                </div>

                {/* Admin Notes */}
                <div>
                  <label className="block text-[14px] font-semibold text-[#1E1548] mb-2">
                    Notes internes
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Notes privées..."
                    className="w-full h-20 px-4 py-3 border-2 border-[rgba(30,21,72,0.08)] rounded-[12px] text-[14px] text-[#1E1548] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#E8ECFF] resize-none bg-[#F8F9FD]"
                  />
                </div>

                {/* Quick Feedback */}
                <div className="bg-[#E8ECFF] rounded-[12px] p-4">
                  <p className="text-[13px] font-semibold text-[#1E1548] mb-2">
                    💡 Feedback rapides
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Très bonne structure',
                      'Ajouter des exemples concrets',
                      'Plus de détails nécessaires',
                      'Bon travail, continue !',
                      'Améliorer la formulation'
                    ].map((feedback) => (
                      <button
                        key={feedback}
                        onClick={() => setReviewFeedback(prev => prev + (prev ? ' ' : '') + feedback + '. ')}
                        className="px-3 py-1.5 bg-white border border-[#1E1548] text-[#1E1548] rounded-[8px] text-[12px] font-medium hover:bg-[#1E1548] hover:text-white transition-all"
                      >
                        + {feedback}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={() => handleGrade(selectedExercise)}
                  disabled={!reviewFeedback || reviewScore === 0}
                  className="w-full h-12 bg-[#10B981] text-white rounded-[12px] text-[16px] font-semibold hover:bg-[#059669] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer la correction
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}