import { useState } from 'react';
import { Upload, FileText, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  status: 'success' | 'error';
}

interface FileUploaderProps {
  title?: string;
  description?: string;
  acceptedFormats?: string;
  maxSizeMB?: number;
  onFileUpload?: (file: File) => void;
  existingFiles?: UploadedFile[];
  onFileDelete?: (fileId: string) => void;
  className?: string;
}

export function FileUploader({
  title = "Télécharger un fichier",
  description = "Glissez-déposez votre fichier ou cliquez pour parcourir",
  acceptedFormats = ".pdf, .doc, .docx",
  maxSizeMB = 5,
  onFileUpload,
  existingFiles = [],
  onFileDelete,
  className = ''
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && onFileUpload) {
      onFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && onFileUpload) {
      onFileUpload(files[0]);
    }
  };

  return (
    <div className={className}>
      {/* Upload Zone */}
      <div
        className={`
          relative border-2 border-dashed rounded-2xl p-8
          transition-all duration-200 text-center
          ${isDragging 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50 bg-card'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileSelect}
          accept={acceptedFormats}
        />
        
        <div className="pointer-events-none">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <Upload className="w-8 h-8 text-primary" />
          </div>
          
          <h4 className="mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <span>Formats acceptés : {acceptedFormats}</span>
            <span>•</span>
            <span>Taille max : {maxSizeMB} MB</span>
          </div>
        </div>
      </div>

      {/* Existing Files */}
      {existingFiles.length > 0 && (
        <div className="mt-6 space-y-3">
          <h5 className="text-sm font-medium text-foreground">Fichiers téléchargés</h5>
          {existingFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl"
            >
              {/* File Icon */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${file.status === 'success' ? 'bg-primary/10' : 'bg-destructive/10'}
              `}>
                {file.status === 'success' ? (
                  <FileText className="w-5 h-5 text-primary" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-destructive" />
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)} • {new Date(file.uploadedAt).toLocaleDateString('fr-FR')}
                </p>
              </div>

              {/* Status & Actions */}
              <div className="flex items-center gap-2">
                {file.status === 'success' && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
                <button
                  onClick={() => onFileDelete?.(file.id)}
                  className="w-8 h-8 rounded-full hover:bg-secondary flex items-center justify-center transition-colors"
                  aria-label="Supprimer le fichier"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
