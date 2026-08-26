import { CheckCircle2, Clock, Lock, Play } from 'lucide-react';
import { ProgressBar } from '../ui/ProgressBar';

interface ModuleCardProps {
  title: string;
  description: string;
  duration: string;
  videoCount: number;
  progress: number;
  status: 'locked' | 'in-progress' | 'completed';
  onClick?: () => void;
  className?: string;
}

export function ModuleCard({
  title,
  description,
  duration,
  videoCount,
  progress,
  status,
  onClick,
  className = ''
}: ModuleCardProps) {
  const isLocked = status === 'locked';
  const isCompleted = status === 'completed';

  return (
    <div 
      className={`
        bg-card rounded-2xl p-6 border border-border 
        transition-all duration-300
        ${!isLocked ? 'hover:shadow-lg hover:border-primary/30 cursor-pointer' : 'opacity-60 cursor-not-allowed'}
        ${className}
      `}
      onClick={!isLocked ? onClick : undefined}
      role="button"
      tabIndex={!isLocked ? 0 : -1}
      aria-disabled={isLocked}
    >
      {/* Header with Status Icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h4 className="mb-2">{title}</h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="ml-4">
          {isLocked && (
            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          )}
          {status === 'in-progress' && (
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Play className="w-5 h-5 text-primary" />
            </div>
          )}
          {isCompleted && (
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Module Info */}
      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Play className="w-4 h-4" />
          <span>{videoCount} vidéos</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Progress Bar */}
      {!isLocked && (
        <ProgressBar progress={progress} size="sm" />
      )}
    </div>
  );
}
