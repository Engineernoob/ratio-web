"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AuthButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "google" | "apple" | "email";
  className?: string;
  disabled?: boolean;
}

export function AuthButton({
  children,
  onClick,
  variant = "email",
  className,
  disabled = false,
}: AuthButtonProps) {
  const isPrimary = variant === "email";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "w-full border border-border px-6 py-3 font-mono text-sm transition-colors",
        disabled
          ? "opacity-50 cursor-not-allowed"
          : isPrimary
          ? "bg-accent text-accent-foreground border-accent hover:bg-accent/90"
          : "bg-background text-foreground hover:bg-secondary",
        className
      )}
    >
      {children}
    </button>
  );
}

