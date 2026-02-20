import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'large';
  fullWidth?: boolean;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'default',
  fullWidth = false,
  className = "",
  ...props 
}: ButtonProps) {
  const baseClasses = "rounded-xl font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105",
    secondary: "bg-background border border-border text-foreground hover:bg-muted",
    ghost: "hover:bg-muted text-foreground",
  };

  const sizeClasses = {
    default: "px-5 py-2.5 min-h-[48px]",
    large: "px-6 py-3 min-h-[48px]",
  };

  const widthClass = fullWidth ? "w-full" : "w-full sm:w-auto";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
