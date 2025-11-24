import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-md border border-border bg-card text-card-foreground dither grain relative p-8",
        className
      )}
    >
      {children}
    </div>
  );
}

