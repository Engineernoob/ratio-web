import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BrutalistCardProps {
  children: ReactNode;
  className?: string;
  borderWidth?: "1" | "1.5";
}

export function BrutalistCard({ 
  children, 
  className,
  borderWidth = "1"
}: BrutalistCardProps) {
  const borderClass = borderWidth === "1.5" ? "border-[1.5px]" : "border-[1px]";
  
  return (
    <div
      className={cn(
        "border border-border bg-card text-card-foreground dither grain relative",
        borderClass,
        className
      )}
    >
      {children}
    </div>
  );
}

