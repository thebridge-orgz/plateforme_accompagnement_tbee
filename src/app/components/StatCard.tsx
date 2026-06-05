import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  className?: string;
  valueClassName?: string;
}

export function StatCard({
  title,
  value,
  icon,
  trend,
  subtitle,
  className = '',
  valueClassName = 'text-3xl'
}: StatCardProps) {
  return (
    <div className={`bg-card border border-border rounded-2xl p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <h3 className={`font-bold ${valueClassName}`}>{value}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-2 italic">{subtitle}</p>
          )}
        </div>
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-medium ${
              trend.isPositive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </span>
          <span className="text-sm text-muted-foreground">vs mois dernier</span>
        </div>
      )}
    </div>
  );
}