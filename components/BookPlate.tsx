import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrutalistCard } from "./BrutalistCard";
import { PlateHeader } from "./PlateHeader";

interface BookPlateProps {
  title: string;
  author: string;
  year?: number;
  description?: string;
  themes?: string[];
  className?: string;
  children?: ReactNode;
}

export function BookPlate({
  title,
  author,
  year,
  description,
  themes,
  className,
  children,
}: BookPlateProps) {
  return (
    <BrutalistCard className={cn("p-6 mb-6", className)} borderWidth="1.5">
      <PlateHeader title={title} subtitle={author} />
      
      {year && (
        <div className="text-xs text-muted-foreground font-mono mb-4">
          {year}
        </div>
      )}
      
      {description && (
        <p className="font-mono text-sm mb-4 leading-relaxed">{description}</p>
      )}
      
      {themes && themes.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {themes.map((theme, idx) => (
            <span
              key={idx}
              className="border border-border px-2 py-1 text-xs font-mono"
            >
              {theme}
            </span>
          ))}
        </div>
      )}
      
      {children}
    </BrutalistCard>
  );
}

