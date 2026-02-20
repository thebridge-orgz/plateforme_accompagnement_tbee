import { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, id, ...props }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-foreground">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className={`w-full px-4 py-3 bg-input-background border rounded-xl focus:outline-none focus:ring-2 focus:ring-ring transition-all ${
          error ? 'border-destructive' : 'border-border'
        } ${props.className || ''}`}
      />
      {error && (
        <p style={{ fontSize: '14px', lineHeight: '22px' }} className="text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
