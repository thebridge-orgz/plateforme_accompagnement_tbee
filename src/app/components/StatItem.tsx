interface StatItemProps {
  value: string;
  label: string;
}

export function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="text-center">
      <div style={{ fontSize: '48px', lineHeight: '56px', fontWeight: 700 }} className="text-foreground mb-2">
        {value}
      </div>
      <p style={{ fontSize: '16px', lineHeight: '26px' }} className="text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
