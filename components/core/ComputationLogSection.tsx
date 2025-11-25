"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LogEntry {
  id: string;
  module: string;
  pattern: string;
  axiomata?: string;
  logStatus: string;
}

interface ComputationLogSectionProps {
  entries: LogEntry[];
  className?: string;
  delay?: number;
}

export function ComputationLogSection({
  entries,
  className,
  delay = 0,
}: ComputationLogSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={cn(
        "relative border border-border bg-card text-card-foreground",
        "noise overflow-x-auto",
        className
      )}
      style={{
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.3)",
      }}
    >
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div className="relative z-10 p-6">
        <div className="mb-4">
          <h3 className="font-serif text-xl uppercase tracking-[0.12em] engraved-text mb-1">
            RATIO COMPUTATIONVM
          </h3>
          <p className="font-serif text-xs uppercase tracking-widest text-muted-foreground">
            SYSTEM LOG • RECENT SYLLOGISMI • ARGVMENTA • DILEMMATA • ERRORVM
            REGISTRA
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr
                className="border-b border-border"
                style={{ borderColor: "rgba(178, 155, 104, 0.2)" }}
              >
                <th className="text-left p-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                  MODVLE
                </th>
                <th className="text-left p-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                  PATTERN DETECTVM
                </th>
                <th className="text-left p-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                  AXIOMATA
                </th>
                <th className="text-left p-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                  LOG STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-b border-border/30"
                  style={{ borderColor: "rgba(178, 155, 104, 0.1)" }}
                >
                  <td className="p-3">{entry.module}</td>
                  <td className="p-3 text-muted-foreground">{entry.pattern}</td>
                  <td className="p-3 text-muted-foreground">
                    {entry.axiomata || "—"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {entry.logStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
