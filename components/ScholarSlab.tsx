import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BrutalistCard } from "./BrutalistCard";

interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
}

interface ScholarSlabProps {
  name: string;
  level?: number;
  achievements?: Achievement[];
  stats?: Record<string, number>;
  className?: string;
  children?: ReactNode;
}

export function ScholarSlab({
  name,
  level = 1,
  achievements = [],
  stats = {},
  className,
  children,
}: ScholarSlabProps) {
  return (
    <BrutalistCard className={cn("p-6", className)} borderWidth="1.5">
      <div className="border-b border-border pb-4 mb-4">
        <h2 className="font-serif text-2xl font-bold engraved mb-2">{name}</h2>
        <div className="text-sm text-muted-foreground font-mono">
          LEVEL {level}
        </div>
      </div>

      {Object.keys(stats).length > 0 && (
        <div className="mb-6">
          <h3 className="font-serif text-lg mb-3">STATISTICS</h3>
          <div className="space-y-2">
            {Object.entries(stats).map(([key, value]) => (
              <div key={key} className="flex justify-between border-b border-border pb-1">
                <span className="font-mono text-sm text-muted-foreground">{key}</span>
                <span className="font-mono text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {achievements.length > 0 && (
        <div className="mb-6">
          <h3 className="font-serif text-lg mb-3">ACHIEVEMENTS</h3>
          <div className="space-y-2">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={cn(
                  "border border-border p-3",
                  achievement.unlocked ? "bg-secondary" : "opacity-50"
                )}
              >
                <div className="font-mono text-sm font-semibold mb-1">
                  {achievement.title}
                </div>
                <div className="font-mono text-xs text-muted-foreground">
                  {achievement.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {children}
    </BrutalistCard>
  );
}

