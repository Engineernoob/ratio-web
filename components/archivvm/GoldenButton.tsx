"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GoldenButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  variant?: "default" | "active";
}

export function GoldenButton({
  children,
  onClick,
  className,
  disabled = false,
  variant = "default",
}: GoldenButtonProps) {
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-4 py-2 rounded-full",
        "font-mono text-xs uppercase tracking-wider",
        "border border-[rgba(215,196,158,0.4)]",
        "transition-all duration-200",
        variant === "active"
          ? "bg-[rgba(215,196,158,0.2)] text-[rgba(215,196,158,1)]"
          : "bg-transparent text-[rgba(215,196,158,0.8)] hover:bg-[rgba(215,196,158,0.1)]",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      style={{
        boxShadow: "0 0 12px rgba(215,196,158,0.2)",
      }}
    >
      {children}
    </motion.button>
  );
}
