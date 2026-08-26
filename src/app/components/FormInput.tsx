import { InputHTMLAttributes, ReactNode } from "react";

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
}

export function FormInput({ label, error, icon, rightIcon, id, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-foreground">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        <input
          id={id}
          {...props}
          className={`w-full py-3 bg-input-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
            icon ? 'pl-10' : 'pl-4'
          } ${rightIcon ? 'pr-10' : 'pr-4'} ${error ? 'border-destructive' : 'border-border'} ${props.className || ''}`}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p style={{ fontSize: '14px', lineHeight: '22px' }} className="text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
