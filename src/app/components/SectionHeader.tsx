interface SectionHeaderProps {
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionHeader({ title, description, centered = true }: SectionHeaderProps) {
  const alignment = centered ? 'text-center' : 'text-left';
  const maxWidth = centered ? 'mx-auto' : '';

  return (
    <div className={`${alignment} mb-12 md:mb-16`}>
      <h2 className={`mb-4 ${centered ? 'mx-auto' : ''}`}>{title}</h2>
      {description && (
        <p 
          style={{ fontSize: '16px', lineHeight: '26px' }} 
          className={`text-muted-foreground max-w-[600px] ${maxWidth}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
