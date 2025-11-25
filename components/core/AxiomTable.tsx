"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AxiomEntry {
  id: string;
  axiom: string;
  description: string;
  fallacy?: string;
  chain?: string;
}

interface AxiomTableProps {
  entries: AxiomEntry[];
  className?: string;
  delay?: number;
}

export function AxiomTable({ entries, className, delay = 0 }: AxiomTableProps) {
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
          <h3 className="font-serif text-xl uppercase tracking-widest engraved-text mb-1">
            TABVLA AXIOMATVM ET FALLACIARVM
          </h3>
          <p className="font-serif text-xs uppercase tracking-widest text-muted-foreground">
            AXIOMATA • FALLACIE • CATENA INFERENTIARVM • STATUS RATIONIS
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                  AXIOMA
                </th>
                <th className="text-left p-3 font-serif text-xs uppercase trackin g-[0.1em] text-muted-foreground">
                  DESCRIPTIO
                </th>
                <th className="text-left p-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                  FALLACIA CONIYNCTA
                </th>
                <th className="text-left p-3 font-serif text-xs uppercase tracking-widest text-muted-foreground">
                  CATENA INFERENTIARVM
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-border/50">
                  <td className="p-3 font-mono text-xs font-semibold">
                    {entry.axiom}
                  </td>
                  <td className="p-3 font-mono text-xs leading-relaxed">
                    {entry.description}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {entry.fallacy || "—"}
                  </td>
                  <td className="p-3 font-mono text-xs text-muted-foreground">
                    {entry.chain || "—"}
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
