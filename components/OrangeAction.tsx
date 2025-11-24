"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface OrangeActionProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  active?: boolean;
  as?: "button" | "div";
}

export function OrangeAction({ 
  children, 
  onClick, 
  className,
  active = false,
  as = "button"
}: OrangeActionProps) {
  const Component = as;
  
  return (
    <Component
      onClick={onClick}
      className={cn(
        "border border-border px-4 py-2 font-mono text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground border-accent"
          : "bg-background text-foreground hover:bg-accent/10",
        className
      )}
    >
      {children}
    </Component>
  );
}

