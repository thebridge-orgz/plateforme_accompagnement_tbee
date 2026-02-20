import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: 'default' | 'muted' | 'gradient';
  padding?: 'default' | 'large';
  id?: string;
}

export function Section({ 
  children, 
  className = "", 
  background = 'default',
  padding = 'default',
  id 
}: SectionProps) {
  const backgroundClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-br from-secondary/30 via-background to-background',
  };

  const paddingClasses = {
    default: 'py-12 md:py-16',
    large: 'py-16 md:py-20',
  };

  return (
    <section 
      id={id}
      className={`w-full ${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-[24px]">
        {children}
      </div>
    </section>
  );
}
