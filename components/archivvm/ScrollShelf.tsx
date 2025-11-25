"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrollCard, Scroll } from "./ScrollCard";
import { GoldenButton } from "./GoldenButton";

interface ScrollShelfProps {
  scrolls: Scroll[];
  visibleCount?: number;
  totalCount?: number;
  onOpenScroll?: (scroll: Scroll) => void;
  onAddAllToMemoria?: () => void;
  className?: string;
}

export function ScrollShelf({
  scrolls,
  visibleCount,
  totalCount,
  onOpenScroll,
  onAddAllToMemoria,
  className,
}: ScrollShelfProps) {
  const displayCount = visibleCount || scrolls.length;
  const total = totalCount || scrolls.length;

  return (
    <div className={cn("mb-8", className)}>
      {/* Section title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-mono text-xs uppercase tracking-wider text-[rgba(215,196,158,0.8)]">
          LECTIO SCROLL SHELF ‣ {displayCount} VISIBLE OF {total}
        </h2>
      </div>

      {/* Scroll grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {scrolls.slice(0, displayCount).map((scroll, index) => (
          <ScrollCard
            key={scroll.id}
            scroll={scroll}
            onOpenScroll={onOpenScroll}
            delay={index * 0.05}
          />
        ))}
      </div>

      {/* Add all button */}
      {onAddAllToMemoria && (
        <div className="flex justify-center">
          <GoldenButton onClick={onAddAllToMemoria}>
            ADD ALL LESSONS TO MEMORIA
          </GoldenButton>
        </div>
      )}
    </div>
  );
}
