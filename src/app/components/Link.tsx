import { ReactNode } from "react";

interface LinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function Link({ href, children, className = "" }: LinkProps) {
  return (
    <a
      href={href}
      className={`hover:text-foreground/80 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded ${className}`}
    >
      {children}
    </a>
  );
}
