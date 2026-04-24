import { useState } from 'react';
import { ArrowLeft, CheckCircle2, FileText, Download, Eye, Upload } from 'lucide-react';
import { Button } from './Button';
import { FileUploader } from './FileUploader';
import { useUserData } from '../../context/UserDataContext';

interface CVUploadPageProps {
  onNavigate: (page: string) => void;
}

const cvTips = [
  {
    title: 'Mise en page',
    description: 'Utilisez une structure claire avec des sections bien définies',
    icon: '📐'
  },
  {
    title: 'Contenu ciblé',
    description: 'Adaptez votre CV à chaque offre d\'alternance',
    icon: '🎯'
  },
  {
    title: 'Expériences',
    description: 'Privilégiez les verbes d\'action et les résultats mesurables',
    icon: '📊'
  },
  {
    title: 'Relecture',
    description: 'Vérifiez l\'orthographe et la grammaire',
    icon: '✓'
  }
];

export function CVUploadPage({ onNavigate }: CVUploadPageProps) {
  // TODO: fetch from Supabase - using context for now
  const { cvData, updateCVData } = useUserData();

  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Upload vers Supabase Storage via le contexte (gère l'upload + mise à jour cv_data)
      await updateCVData(
        {
          status: 'uploaded',
          uploadedAt: new Date().toISOString(),
        },
        file
      );
    } catch (error: any) {
      const message = error?.message || error?.error_description || JSON.stringify(error);
      alert(`Erreur upload CV: ${message}`);
      console.error('CV upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileDelete = async () => {
    if (confirm('Supprimer votre CV ?')) {
      try {
        await updateCVData({
          fileName: null,
          fileUrl: null,
          status: 'not_uploaded',
          uploadedAt: null,
        });
      } catch (error) {
        alert('Erreur lors de la suppression');
        console.error(error);
      }
    }
  };

  const hasCV = cvData.status !== 'not_uploaded' && cvData.fileName;
  const hasFeedback = cvData.status === 'approved' || cvData.status === 'needs_revision';

  return (
    <div className="min-h-screen bg-[#F8F9FD] pb-16">
      {/* Header */}
      <div className="bg-white border-b border-[rgba(30,21,72,0.08)] sticky top-0 z-30">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-start gap-3 sm:gap-6">
            <button
              onClick={() => onNavigate('student-dashboard')}
              className="w-10 h-10 rounded-full hover:bg-[#F8F9FD] flex items-center justify-center transition-colors flex-shrink-0"
              aria-label="Retour"
            >
              <ArrowLeft className="w-5 h-5 text-[#1E1548]" />
            </button>
            
            <div className="flex-1 min-w-0">
              <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-bold leading-tight text-[#1E1548] mb-1 sm:mb-2">
                Mon CV
              </h1>
              <p className="text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-[#6B7280]">
                {hasCV 
                  ? 'Gérez votre CV et recevez des conseils personnalisés'
                  : 'Téléchargez votre CV et recevez des conseils personnalisés'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-6 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8 space-y-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload & Files */}
          <div className="lg:col-span-2 space-y-8">
            {/* Empty State - No CV */}
            {!hasCV && (
              <div className="bg-card border border-border rounded-2xl p-12 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Aucun CV téléchargé</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Commence par télécharger ton CV pour recevoir une analyse personnalisée de l'équipe Admission
                </p>
                <FileUploader
                  title="Télécharger mon CV"
                  description="Glissez-déposez votre CV ou cliquez pour parcourir"
                  acceptedFormats=".pdf, .doc, .docx"
                  maxSizeMB={5}
                  onFileUpload={handleFileUpload}
                  existingFiles={[]}
                  onFileDelete={handleFileDelete}
                />
              </div>
            )}

            {/* CV Uploaded */}
            {hasCV && (
              <>
                {/* CV File Card */}
                <div className="bg-card border border-border rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="mb-2">CV actuel</h3>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{cvData.fileName}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Téléchargé le {cvData.uploadedAt ? new Date(cvData.uploadedAt).toLocaleDateString('fr-FR') : 'N/A'}
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cvData.status === 'approved' 
                        ? 'bg-green-100 text-green-800'
                        : cvData.status === 'under_review'
                        ? 'bg-blue-100 text-blue-800'
                        : cvData.status === 'needs_revision'
                        ? 'bg-orange-100 text-orange-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {cvData.status === 'approved' && '✓ Validé'}
                      {cvData.status === 'under_review' && '⏳ En cours d\'analyse'}
                      {cvData.status === 'needs_revision' && '⚠ À améliorer'}
                      {cvData.status === 'uploaded' && '📄 Téléchargé'}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {cvData.fileUrl && (
                      <Button
                        variant="secondary"
                        className="flex-1"
                        onClick={() => window.open(cvData.fileUrl!, '_blank')}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Visualiser
                      </Button>
                    )}
                    <Button
                      variant="secondary"
                      className="flex-1"
                      onClick={handleFileDelete}
                    >
                      Supprimer
                    </Button>
                  </div>
                  
                  {cvData.status === 'uploaded' && (
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      💡 L'équipe Admission analysera ton CV sous 48h
                    </p>
                  )}
                </div>

                {/* CV Feedback - Only if reviewed */}
                {hasFeedback && cvData.adminFeedback && (
                  <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3>Retour de l'équipe Admission</h3>
                      {cvData.status === 'approved' && (
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        </div>
                      )}
                    </div>

                    <div className="bg-secondary/50 rounded-xl p-4">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {cvData.adminFeedback}
                      </p>
                    </div>

                    {cvData.status === 'needs_revision' && (
                      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                        <p className="text-sm text-orange-800 mb-3">
                          📝 Améliore ton CV selon ces recommandations et télécharge une nouvelle version
                        </p>
                        <FileUploader
                          title="Télécharger une nouvelle version"
                          description="Glissez-déposez votre CV mis à jour"
                          acceptedFormats=".pdf, .doc, .docx"
                          maxSizeMB={5}
                          onFileUpload={handleFileUpload}
                          existingFiles={[]}
                          onFileDelete={handleFileDelete}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* No feedback yet */}
                {!hasFeedback && cvData.status === 'under_review' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Eye className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">Analyse en cours...</h4>
                    <p className="text-sm text-muted-foreground">
                      L'équipe Admission analyse actuellement ton CV. Tu recevras un retour détaillé sous 48h.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CV Tips */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-4">Conseils pour un bon CV</h4>
              <div className="space-y-4">
                {cvTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <div>
                      <p className="font-medium text-sm mb-1">{tip.title}</p>
                      <p className="text-xs text-muted-foreground">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Templates */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="mb-1">Modèles de CV</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Téléchargez nos modèles professionnels pour créer votre CV
              </p>

              {/* Grille de modèles — à remplir avec de vrais fichiers */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Moderne', tag: 'Populaire', color: 'bg-blue-50 border-blue-200' },
                  { label: 'Classique', tag: null, color: 'bg-gray-50 border-gray-200' },
                  { label: 'Créatif', tag: 'Nouveau', color: 'bg-purple-50 border-purple-200' },
                  { label: 'Tech', tag: null, color: 'bg-green-50 border-green-200' },
                ].map((template) => (
                  <div
                    key={template.label}
                    className={`relative border-2 border-dashed ${template.color} rounded-xl p-4 flex flex-col items-center justify-center gap-2 min-h-[100px] cursor-not-allowed opacity-70`}
                  >
                    {template.tag && (
                      <span className="absolute top-1.5 right-1.5 text-[10px] font-bold bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">
                        {template.tag}
                      </span>
                    )}
                    <Download className="w-6 h-6 text-muted-foreground" />
                    <p className="text-xs font-medium text-center text-muted-foreground">{template.label}</p>
                    <p className="text-[10px] text-muted-foreground">Bientôt disponible</p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Les modèles seront disponibles prochainement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}