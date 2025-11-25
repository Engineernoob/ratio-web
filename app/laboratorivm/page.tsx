"use client";

import { motion } from "framer-motion";
import { Main } from "@/components/Main";
import { DialecticaPanel } from "@/components/laboratorium/DialecticaPanel";
import { LogicaProblemPanel } from "@/components/laboratorium/LogicaProblemPanel";
import { MicroLessonPanel } from "@/components/laboratorium/MicroLessonPanel";
import { TrainingLedger } from "@/components/laboratorium/TrainingLedger";
import { ScholarumContinuum } from "@/components/laboratorium/ScholarumContinuum";

export default function LaboratorivmPage() {
  return (
    <Main>
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
