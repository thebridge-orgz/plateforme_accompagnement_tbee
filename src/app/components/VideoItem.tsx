import { CheckCircle2, Play } from 'lucide-react';

interface VideoItemProps {
  title: string;
  duration: string;
  isCompleted: boolean;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function VideoItem({
  title,
  duration,
  isCompleted,
  isActive = false,
  onClick,
  className = ''
}: VideoItemProps) {
  return (
    <div
      className={`
        flex items-center gap-4 p-4 rounded-xl
        transition-all duration-200 cursor-pointer
        ${isActive ? 'bg-primary/10 border-2 border-primary' : 'bg-card border border-border hover:border-primary/30'}
        ${className}
      `}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Icon */}
      <div className={`
        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
        ${isCompleted ? 'bg-primary' : 'bg-secondary'}
      `}>
        {isCompleted ? (
          <CheckCircle2 className="w-5 h-5 text-foreground" />
        ) : (
          <Play className="w-5 h-5 text-foreground" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h5 className="truncate mb-1">{title}</h5>
        <p className="text-sm text-muted-foreground">{duration}</p>
      </div>

      {/* Status Badge */}
      {isCompleted && (
        <span className="text-xs font-medium text-primary px-3 py-1 bg-primary/10 rounded-full">
          Terminé
        </span>
      )}
    </div>
  );
}
