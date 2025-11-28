"use client";

import { motion } from "framer-motion";
import { Main } from "@/components/Main";
import { DialecticaPanel } from "@/components/laboratorium/DialecticaPanel";
import { LogicaProblemPanel } from "@/components/laboratorium/LogicaProblemPanel";
import { MicroLessonPanel } from "@/components/laboratorium/MicroLessonPanel";
import { TrainingLedger } from "@/components/laboratorium/TrainingLedger";
import { ScholarumContinuum } from "@/components/laboratorium/ScholarumContinuum";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function LaboratorivmPage() {
  const pathname = usePathname();

  return (
    <Main>
      {/* Navigation Bar */}
      <div className="w-full border-b border-[rgba(255,255,255,0.08)] pb-3 mb-8">
        <div className="flex items-center justify-between font-mono text-xs text-[rgba(232,230,225,0.6)]">
          <div className="flex items-center gap-2">
            <Link
              href="/oikos"
              className="hover:text-[rgba(232,230,225,0.9)] transition-colors"
            >
              RATIO @ OIKOS
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/oikos"
              className={cn(
                "transition-colors",
                pathname === "/oikos" && "text-[#b29b68]"
              )}
            >
              OIKOS
            </Link>
            <Link
              href="/bibliotheca"
              className={cn(
                "transition-colors",
                pathname === "/bibliotheca" && "text-[#b29b68]"
              )}
            >
              BIBLIOTHECA
            </Link>
            <Link
              href="/laboratorivm"
              className={cn(
                "transition-colors",
                pathname === "/laboratorivm" && "text-[#b29b68]"
              )}
            >
              LABORATORIVM
            </Link>
            <Link
              href="/memoria"
              className={cn(
                "transition-colors",
                pathname === "/memoria" && "text-[#b29b68]"
              )}
            >
              MEMORIA
            </Link>
            <Link
              href="/archivvm"
              className={cn(
                "transition-colors",
                pathname === "/archivvm" && "text-[#b29b68]"
              )}
            >
              ARCHIVVM
            </Link>
            <Link
              href="/scholarivm"
              className={cn(
                "transition-colors",
                pathname === "/scholarivm" && "text-[#b29b68]"
              )}
            >
              SCHOLARIUM
            </Link>
            <Link
              href="/ars-rationis"
              className={cn(
                "transition-colors",
                pathname === "/ars-rationis" && "text-[#b29b68]"
              )}
            >
              ARS RATIONIS
            </Link>
          </div>
        </div>
      </div>

      <div className="px-8 py-12 max-w-[1600px] mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center space-y-4"
        >
          <h1 className="font-serif text-5xl uppercase tracking-[0.14em] engraved-text">
            LABORATORIVM
          </h1>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            OFFICINA RATIONIS
          </p>
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            DIALECTIC DRILLS • LOGIC PROBLEMATA • INTERACTIVE MODVLI
          </p>
        </motion.div>

        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Column 1: Dialectica + Logica */}
          <div className="space-y-6">
            <DialecticaPanel delay={0.1} />
            <LogicaProblemPanel delay={0.15} />
          </div>

          {/* Column 2: Micro-Lesson */}
          <div className="space-y-6">
            <MicroLessonPanel delay={0.2} />
          </div>

          {/* Column 3: Training Ledger */}
          <div className="space-y-6">
            <TrainingLedger delay={0.25} />
          </div>
        </div>

        {/* Scholarum Continuum Footer */}
        <ScholarumContinuum delay={0.3} />
      </div>
    </Main>
  );
}
