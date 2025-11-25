"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GoldenButton } from "./GoldenButton";

interface ArchivistNotesProps {
  stats?: {
    totalScrolls?: number;
    totalMicroLessons?: number;
    totalConcepts?: number;
    lastEdited?: string;
  };
  ledgerState?: {
    strong: number;
    medium: number;
    fragile: number;
  };
  onExport?: () => void;
  className?: string;
}

export function ArchivistNotes({
  stats = {},
  ledgerState,
  onExport,
  className,
}: ArchivistNotesProps) {
  const {
    totalScrolls = 432,
    totalMicroLessons = 189,
    totalConcepts = 1274,
    lastEdited = "HODIE ‣ HORA IX",
  } = stats;

  const state = ledgerState || { strong: 68, medium: 22, fragile: 10 };

  return (
    <div
      className={cn(
        "sticky top-8 h-fit",
        "bg-[rgba(0,0,0,0.4)]",
        "border border-[rgba(215,196,158,0.3)]",
        "p-6",
        "backdrop-blur-sm",
        className
      )}
      style={{
        boxShadow:
          "inset 0 2px 4px rgba(0,0,0,0.4), inset 0 -2px 4px rgba(255,255,255,0.03), 0 0 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* Dither overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      <div className="relative z-10">
        {/* Title */}
        <h2 className="font-serif text-xl uppercase tracking-widest text-center mb-4">
          ARCHIVIST'S NOTES
        </h2>

        {/* Divider */}
        <div className="h-px bg-[rgba(215,196,158,0.3)] mb-6" />

        {/* Stats list */}
        <div className="space-y-4 mb-6">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-xs text-muted-foreground">
                TOTAL SCROLLS
              </span>
            </div>
            <div className="font-mono text-sm text-[rgba(215,196,158,0.9)]">
              {totalScrolls} TABVLÆ INSCRIBED
            </div>
            <div className="h-px bg-[rgba(215,196,158,0.2)] mt-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-xs text-muted-foreground">
                TOTAL MICRO-LESSONS
              </span>
            </div>
            <div className="font-mono text-sm text-[rgba(215,196,158,0.9)]">
              {totalMicroLessons} MINUTA DOCTRINA
            </div>
            <div className="h-px bg-[rgba(215,196,158,0.2)] mt-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-xs text-muted-foreground">
                TOTAL STORED CONCEPTS
              </span>
            </div>
            <div className="font-mono text-sm text-[rgba(215,196,158,0.9)]">
              {totalConcepts} DISTINCT IDEA-NODES
            </div>
            <div className="h-px bg-[rgba(215,196,158,0.2)] mt-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-xs text-muted-foreground">
                LAST EDITED
              </span>
            </div>
            <div className="font-mono text-sm text-[rgba(215,196,158,0.9)]">
              {lastEdited}
            </div>
          </div>
        </div>

        {/* Ledger State */}
        {ledgerState && (
          <div className="mb-6">
            <div className="font-mono text-xs text-muted-foreground mb-2">
              LEDGER STATE
            </div>
            <div className="flex gap-1 mb-2">
              <div
                className="h-2 flex-1 bg-[rgba(215,196,158,0.6)]"
                style={{ width: `${state.strong}%` }}
              />
              <div
                className="h-2 flex-1 bg-[rgba(215,196,158,0.4)]"
                style={{ width: `${state.medium}%` }}
              />
              <div
                className="h-2 flex-1 bg-[rgba(215,196,158,0.2)]"
                style={{ width: `${state.fragile}%` }}
              />
            </div>
            <div className="font-mono text-[10px] text-[rgba(215,196,158,0.7)]">
              {state.strong}% STRONG ‣ {state.medium}% MEDIVM ‣ {state.fragile}%
              FRAGILE
            </div>
          </div>
        )}

        {/* Export button */}
        {onExport && (
          <div className="mt-6">
            <GoldenButton onClick={onExport} className="w-full">
              EXPORT EVERYTHING
            </GoldenButton>
          </div>
        )}
      </div>
    </div>
  );
}
