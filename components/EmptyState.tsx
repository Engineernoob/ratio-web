"use client";

import { ReactNode } from "react";
import { FogPanel } from "./FogPanel";
import { OrangeAction } from "./OrangeAction";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <FogPanel className={cn("card-padding text-center", className)}>
      {icon && <div className="mb-6 flex justify-center">{icon}</div>}
      <div className="font-serif text-xl mb-3 engraved engrave">{title}</div>
      <p className="font-mono text-sm text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      {action && (
        <OrangeAction onClick={action.onClick}>{action.label}</OrangeAction>
      )}
    </FogPanel>
  );
}

