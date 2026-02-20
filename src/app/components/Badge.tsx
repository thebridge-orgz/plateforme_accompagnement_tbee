import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  icon?: ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
}

export function Badge({ children, icon, variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-accent/50 text-foreground',
    primary: 'bg-primary/20 text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
  };

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${variantClasses[variant]}`}>
      {icon && <div className="w-4 h-4">{icon}</div>}
      <span style={{ fontSize: '14px', lineHeight: '20px', fontWeight: 500 }}>
        {children}
      </span>
    </div>
  );
}
