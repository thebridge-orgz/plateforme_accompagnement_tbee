import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  variant?: 'accent' | 'primary';
}

export function FeatureCard({ icon, title, description, variant = 'accent' }: FeatureCardProps) {
  const bgClass = variant === 'primary' ? 'bg-primary/10 border-primary/20' : 'bg-accent/30 border-accent';

  return (
    <div className={`${bgClass} border rounded-2xl p-6 hover:shadow-lg transition-shadow`}>
      <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="mb-3">{title}</h3>
      <p style={{ fontSize: '16px', lineHeight: '26px' }} className="text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
