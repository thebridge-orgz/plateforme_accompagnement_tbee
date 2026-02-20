import { ReactNode } from "react";

interface IconContainerProps {
  children: ReactNode;
  variant?: 'accent' | 'primary';
  size?: 'sm' | 'md';
}

export function IconContainer({ children, variant = 'accent', size = 'md' }: IconContainerProps) {
  const bgClass = variant === 'primary' ? 'bg-primary' : 'bg-accent';
  const sizeClass = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  const iconColorClass = variant === 'primary' ? 'text-primary-foreground' : 'text-foreground';

  return (
    <div className={`${sizeClass} ${bgClass} rounded-xl flex items-center justify-center`}>
      <div className={iconColorClass}>{children}</div>
    </div>
  );
}
