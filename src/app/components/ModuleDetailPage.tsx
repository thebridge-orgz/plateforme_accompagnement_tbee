import { useState } from 'react';
import { Play, CheckCircle2, Clock, Download, FileText, ChevronRight, Lock } from 'lucide-react';

interface ModuleDetailPageProps {
  moduleId: string;
  onNavigate: (page: string) => void;
}

// Mock data
const moduleData: Record<string, any> = {
  '1': {
    title: 'Rédiger son CV',
    description: 'Apprenez à créer un CV professionnel et attractif qui mettra en valeur vos compétences et expériences pour décrocher votre alternance.',
    duration: '2h 30min',
    progress: 75,
    instructor: 'Marie Dupont',
    videoCount: 8,
    videos: [
      { id: 'v1', title: 'Introduction au CV professionnel', duration: '8:45', isCompleted: true },
      { id: 'v2', title: 'Structure et mise en page', duration: '12:30', isCompleted: true },
      { id: 'v3', title: 'Rédiger ses expériences', duration: '15:20', isCompleted: true },
      { id: 'v4', title: 'Mettre en avant ses compétences', duration: '10:15', isCompleted: true },
      { id: 'v5', title: 'Section formation et diplômes', duration: '9:40', isCompleted: true },
      { id: 'v6', title: 'Centres d\'intérêt et références', duration: '11:25', isCompleted: true },
      { id: 'v7', title: 'Adapter son CV à l\'offre', duration: '14:50', isCompleted: false },
      { id: 'v8', title: 'Les erreurs à éviter', duration: '13:15', isCompleted: false }
    ],
    resources: [
      { id: 'r1', title: 'Modèle de CV - Version 1.pdf', type: 'pdf' },
      { id: 'r2', title: 'Modèle de CV - Version 2.pdf', type: 'pdf' },
      { id: 'r3', title: 'Checklist CV.pdf', type: 'pdf' }
    ]
  },
  '2': {
    title: 'Préparer son entretien',
    description: 'Maîtrisez les techniques d\'entretien d\'embauche pour maximiser vos chances de réussite.',
    duration: '3h 15min',
    progress: 30,
    instructor: 'Jean Martin',
    videoCount: 10,
    videos: [
      { id: 'v1', title: 'Les bases de l\'entretien', duration: '10:00', isCompleted: true },
      { id: 'v2', title: 'Préparer son pitch', duration: '12:45', isCompleted: true },
      { id: 'v3', title: 'Questions fréquentes', duration: '18:30', isCompleted: true },
      { id: 'v4', title: 'Gérer son stress', duration: '11:20', isCompleted: false },
      { id: 'v5', title: 'Le langage corporel', duration: '14:15', isCompleted: false },
      { id: 'v6', title: 'Poser les bonnes questions', duration: '9:40', isCompleted: false },
      { id: 'v7', title: 'Négocier son contrat', duration: '16:25', isCompleted: false },
      { id: 'v8', title: 'Entretien vidéo', duration: '13:50', isCompleted: false },
      { id: 'v9', title: 'Cas pratiques', duration: '20:10', isCompleted: false },
      { id: 'v10', title: 'Après l\'entretien', duration: '8:30', isCompleted: false }
    ],
    resources: [
      { id: 'r1', title: 'Guide entretien.pdf', type: 'pdf' },
      { id: 'r2', title: 'Questions types.pdf', type: 'pdf' }
    ]
  },
  '3': {
    title: 'Comprendre l\'alternance',
    description: 'Découvrez les spécificités du contrat en alternance et ses avantages.',
    duration: '1h 45min',
    progress: 0,
    instructor: 'Sophie Durand',
    videoCount: 6,
    videos: [
      { id: 'v1', title: 'Qu\'est-ce que l\'alternance ?', duration: '12:00', isCompleted: false },
      { id: 'v2', title: 'Contrat d\'apprentissage vs professionnalisation', duration: '15:30', isCompleted: false },
      { id: 'v3', title: 'Droits et devoirs', duration: '18:20', isCompleted: false },
      { id: 'v4', title: 'Rémunération', duration: '10:45', isCompleted: false },
      { id: 'v5', title: 'Trouver son rythme', duration: '14:15', isCompleted: false },
      { id: 'v6', title: 'Les aides financières', duration: '11:10', isCompleted: false }
    ],
    resources: [
      { id: 'r1', title: 'Guide alternance.pdf', type: 'pdf' }
    ]
  }
};

export function ModuleDetailPage({ moduleId, onNavigate }: ModuleDetailPageProps) {
  const module = moduleData[moduleId] || moduleData['1'];
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const currentVideo = module.videos[currentVideoIndex];

  const completedVideos = module.videos.filter((v: any) => v.isCompleted).length;
  const totalVideos = module.videos.length;
  const progressPercent = Math.round((completedVideos / totalVideos) * 100);

  return (
    <div className="min-h-screen bg-[#ffffff]">
      <div className="max-w-[1152px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => onNavigate('student-modules')}
            className="flex items-center gap-2 text-[14px] font-medium text-[#6B7280] hover:text-[#1E1548] transition-colors mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour aux modules
          </button>
          <h2 className="text-[24px] font-bold leading-[40px] text-[#1E1548] mb-2">
            {module.title}
          </h2>
          <p className="text-[16px] font-normal leading-[24px] text-[#101828]">
            {module.description}
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[14px] font-normal leading-[20px] text-[#6B7280] mb-1">
                Progression du module
              </p>
              <p className="text-[16px] font-medium leading-[24px] text-[#1E1548]">
                {completedVideos} sur {totalVideos} vidéos terminées
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#6B7280]" />
              <span className="text-[14px] font-normal text-[#6B7280]">{module.duration}</span>
            </div>
          </div>
          <div className="relative w-full h-3 bg-[#E8ECFF] rounded-full overflow-hidden">
            <div 
              className="absolute left-0 top-0 h-full bg-[#FFD600] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[14px] font-medium text-[#1E1548]">Progression</span>
            <span className="text-[14px] font-medium text-[#1E1548]">{progressPercent}%</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player + Resources (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="bg-[#1E1548] rounded-[16px] overflow-hidden aspect-video flex items-center justify-center relative">
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(135deg, rgba(255, 214, 0, 0.1) 0%, rgba(232, 236, 255, 0.1) 100%)'
              }} />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[rgba(255,214,0,0.2)] flex items-center justify-center backdrop-blur-sm">
                  <Play className="w-10 h-10 text-[#FFD600]" fill="#FFD600" />
                </div>
                <h4 className="text-[20px] font-semibold leading-[28px] text-white mb-2">
                  {currentVideo.title}
                </h4>
                <p className="text-[14px] font-normal text-white/80">{currentVideo.duration}</p>
              </div>
            </div>

            {/* Video Info Card */}
            <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-[20px] font-semibold leading-[28px] text-[#1E1548] mb-2">
                    {currentVideo.title}
                  </h3>
                  <p className="text-[14px] font-normal leading-[20px] text-[#6B7280]">
                    Formateur : {module.instructor}
                  </p>
                </div>
                {currentVideo.isCompleted && (
                  <div className="flex items-center gap-2 text-[#10B981] bg-[#D1FAE5] px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-[14px] font-medium">Terminé</span>
                  </div>
                )}
              </div>
              
              <div className="flex gap-3">
                <button className="flex-1 h-12 bg-[#FFD600] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#FDC700] transition-colors flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  {currentVideo.isCompleted ? 'Revoir la vidéo' : 'Commencer'}
                </button>
                {!currentVideo.isCompleted && (
                  <button 
                    className="h-12 bg-white border border-[rgba(30,21,72,0.1)] text-[#1E1548] rounded-[12px] text-[16px] font-semibold hover:bg-[#F8F9FD] transition-colors px-6"
                    onClick={() => {
                      if (currentVideoIndex < module.videos.length - 1) {
                        setCurrentVideoIndex(currentVideoIndex + 1);
                      }
                    }}
                  >
                    Marquer terminé
                  </button>
                )}
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6">
              <h4 className="text-[20px] font-semibold leading-[28px] text-[#1E1548] mb-4">
                Ressources téléchargeables
              </h4>
              <div className="space-y-3">
                {module.resources.map((resource: any) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4 bg-[#E8ECFF] rounded-[12px] hover:bg-[#E8ECFF]/80 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[rgba(255,214,0,0.1)] flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[#FFD600]" />
                      </div>
                      <span className="text-[14px] font-medium text-[#1E1548]">{resource.title}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full hover:bg-white flex items-center justify-center transition-colors">
                      <Download className="w-5 h-5 text-[#FFD600]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Video List (1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[rgba(30,21,72,0.1)] rounded-[16px] p-6 sticky top-8">
              <h4 className="text-[20px] font-semibold leading-[28px] text-[#1E1548] mb-4">
                Contenu du module ({totalVideos})
              </h4>
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {module.videos.map((video: any, index: number) => (
                  <button
                    key={video.id}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`w-full text-left p-4 rounded-[12px] transition-all ${
                      index === currentVideoIndex
                        ? 'bg-[#FFD600] shadow-sm'
                        : video.isCompleted
                        ? 'bg-[#E8ECFF] hover:bg-[#E8ECFF]/80'
                        : 'bg-[#F8F9FD] hover:bg-[#F8F9FD]/80'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {video.isCompleted ? (
                          <CheckCircle2 className={`w-5 h-5 ${
                            index === currentVideoIndex ? 'text-[#1E1548]' : 'text-[#10B981]'
                          }`} />
                        ) : (
                          <div className={`w-5 h-5 rounded-full border-2 ${
                            index === currentVideoIndex 
                              ? 'border-[#1E1548]' 
                              : 'border-[#6B7280]'
                          }`} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-[14px] font-medium leading-[20px] mb-1 ${
                          index === currentVideoIndex ? 'text-[#1E1548]' : 'text-[#1E1548]'
                        }`}>
                          {video.title}
                        </p>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-3.5 h-3.5 ${
                            index === currentVideoIndex ? 'text-[#1E1548]' : 'text-[#6B7280]'
                          }`} />
                          <span className={`text-[12px] font-normal ${
                            index === currentVideoIndex ? 'text-[#1E1548]' : 'text-[#6B7280]'
                          }`}>
                            {video.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}