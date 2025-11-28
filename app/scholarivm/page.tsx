"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Main } from "@/components/Main";
import {
  PanelContainer,
  SectionHeaderEngraved,
  GridDivider,
  LedgerBox,
  LogicTable,
  DebateHornBox,
} from "@/components/core";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Button component for the Scholarium design
function ScholariumButton({
  children,
  onClick,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "secondary";
}) {
  return (
    <motion.button
      whileHover={{ filter: "brightness(1.05)" }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "px-4 py-2 border font-mono text-xs uppercase tracking-wider",
        "transition-all duration-200",
        variant === "default"
          ? "border-[#b29b68] text-[#b29b68] bg-transparent hover:bg-[rgba(178,155,104,0.05)]"
          : "border-[rgba(255,255,255,0.2)] text-[rgba(255,255,255,0.7)] bg-transparent hover:bg-[rgba(255,255,255,0.02)]",
        className
      )}
    >
      {children}
    </motion.button>
  );
}

export default function ScholarivmPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("SYSTEM LOG");

  // Sample data
  const logicTableRows = [
    {
      module: "LOGIC BASICS • MORTALITAS",
      pattern: "SYLLOGISMVS / BARBARA AAA",
      axiomata: "AX-01: ∀X(H[X]→M(X])",
      status: "OK • VALIDITAS CONFIRMATA",
      statusType: "ok" as const,
    },
    {
      module: "TRADITIO VS DIGITVM",
      pattern: "INDVCTION / HASTY GENERAL.",
      axiomata: "AX-07: PROPORTIO EXEMP.",
      status: "WARN • SAMPLE SIZE PARVA",
      statusType: "warn" as const,
    },
    {
      module: "CENTRAL ARCHIVVM",
      pattern: "DILEMMA / BINARY CHOICE",
      axiomata: "AX-12: VIA MEDIA",
      status: "NOTE • FALSE DILEMMA RISK",
      statusType: "note" as const,
    },
    {
      module: "AUTOMATA AUCTORITAS",
      pattern: "ARGUMENTVM EX AUCTOR.",
      axiomata: "AX-15: RATIO ANTE NOMEN",
      status: "OK • NULLUS ERROR CRITICUS",
      statusType: "ok" as const,
    },
  ];

  return (
    <Main className="scroll-fade-top scroll-fade-bottom">
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

      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center relative"
        >
          {/* Circular sigil background */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              opacity: 0.15,
            }}
          >
            <div
              className="w-64 h-64 rounded-full border border-[rgba(178,155,104,0.2)]"
              style={{
                background:
                  "radial-gradient(circle, rgba(178,155,104,0.1) 0%, transparent 70%)",
              }}
            />
          </div>

          <div className="relative z-10">
            <h1
              className="font-serif text-6xl md:text-7xl font-normal tracking-[0.12em] uppercase mb-4"
              style={{
                color: "#b29b68",
                textShadow:
                  "0px 1px 0 rgba(255, 255, 255, 0.05), 0px -1px 0 rgba(0, 0, 0, 0.9)",
              }}
            >
              SCHOLARIUM
            </h1>
            <h2
              className="font-serif text-2xl font-normal tracking-widest uppercase mb-4"
              style={{
                color: "#b29b68",
                textShadow:
                  "0px 1px 0 rgba(255, 255, 255, 0.05), 0px -1px 0 rgba(0, 0, 0, 0.9)",
              }}
            >
              ATRIVM DISCIPLINARIVM
            </h2>
            <p className="font-mono text-sm text-[rgba(255,255,255,0.6)] tracking-wider max-w-3xl mx-auto">
              STRUCTURED LEARNING PATHS, MICRO-COURSES, AND MASTERY MODULES IN A
              SILENT COMPUTATIONAL TEMPLE.
            </p>
          </div>
        </motion.div>

        {/* Breadcrumb/Section Indicator */}
        <GridDivider className="mb-8" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 font-mono text-xs text-[rgba(255,255,255,0.5)] tracking-wider text-center"
        >
          TRIA TVRRES • SYLLOGISMI • ARGVMENTA • DILEMMATA
        </motion.div>

        {/* Main Layout: Three Columns + Logic Ledger */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* COLUMN 1 – SYLLOGISM MODULES */}
          <PanelContainer className="p-6 lg:col-span-1" delay={0.3}>
            <SectionHeaderEngraved
              title="SYLLOGISMI"
              subtitle="DEDUCTIVE MODULES"
              delay={0.4}
            />

            <div className="space-y-6">
              {/* Logic Basics Module */}
              <div className="border-b border-[rgba(255,255,255,0.05)] pb-6">
                <div className="font-serif text-sm uppercase tracking-[0.08em] mb-2 text-[rgba(255,255,255,0.8)]">
                  DISCIPLINA FUNDAMENTALIS - LOGIC BASICS
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] mb-3 space-y-1">
                  <div>Major / Minor / Conclusio</div>
                  <div>STAGE: 3 / 5</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <ScholariumButton>ENTER MODULE</ScholariumButton>
                  <ScholariumButton variant="secondary">
                    TEST VALIDITY
                  </ScholariumButton>
                  <ScholariumButton variant="secondary">
                    GENERATE EXAMPLE
                  </ScholariumButton>
                </div>
              </div>

              {/* Rationality Patterns Module */}
              <div className="border-b border-[rgba(255,255,255,0.05)] pb-6">
                <div className="font-serif text-sm uppercase tracking-[0.08em] mb-2 text-[rgba(255,255,255,0.8)]">
                  DISCIPLINA FUNDAMENTALIS - RATIONALITY PATTERNS
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] mb-3 space-y-1">
                  <div>Canonical Formae • Barbara, Celarent</div>
                  <div>STAGE: 2 / 7</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <ScholariumButton>ENTER MODULE</ScholariumButton>
                  <ScholariumButton variant="secondary">
                    TEST VALIDITY
                  </ScholariumButton>
                  <ScholariumButton variant="secondary">
                    GENERATE EXAMPLE
                  </ScholariumButton>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="pt-4">
                <div className="font-mono text-xs text-[rgba(255,255,255,0.5)] mb-3">
                  FORMA: BARBARA • MOOD: AAA
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-xs text-[#b29b68]">
                    VALIDYM
                  </span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 rounded-full border border-[#b29b68] flex items-center justify-center text-[8px] text-[#b29b68]">
                      I
                    </div>
                    <div className="w-4 h-4 rounded-full border border-[#b29b68] flex items-center justify-center text-[8px] text-[#b29b68]">
                      II
                    </div>
                  </div>
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.4)]">
                  TOWER I • SYLLOGISTIC TRAINING LINE • AUTOGRADING DEDUCTIVE
                  CIRCUITS.
                </div>
              </div>
            </div>
          </PanelContainer>

          {/* COLUMN 2 – ARGUMENTA MODULE */}
          <PanelContainer className="p-6 lg:col-span-1" delay={0.4}>
            <SectionHeaderEngraved
              title="ARGUMENTA"
              subtitle="DISSECTIO ET ANALYSIS"
              delay={0.5}
            />

            <div className="space-y-6">
              {/* Micro-Course */}
              <div className="border-b border-[rgba(255,255,255,0.05)] pb-6">
                <div className="font-serif text-sm uppercase tracking-[0.08em] mb-2 text-[rgba(255,255,255,0.8)]">
                  MICRO-COURSIS - ARGUMENT PATTERNS
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] mb-3 space-y-1">
                  <div>Claims → Premissa → Fallacia</div>
                  <div>STAGE: 4 / 9</div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <ScholariumButton>ENTER MODULE</ScholariumButton>
                  <ScholariumButton variant="secondary">
                    ANALYZE ARGUMENT
                  </ScholariumButton>
                  <ScholariumButton variant="secondary">
                    HIGHLIGHT FALLACIES
                  </ScholariumButton>
                </div>
              </div>

              {/* Exemplum Argumenti */}
              <div className="border-b border-[rgba(255,255,255,0.05)] pb-6">
                <div className="font-serif text-sm uppercase tracking-[0.08em] mb-3 text-[rgba(255,255,255,0.8)]">
                  EXERCITIA - EXEMPLVM ARGUMENTI
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] leading-relaxed mb-4 italic">
                  "Since technology often fails, we ought not to trust any
                  digital record more than any tradition passed orally."
                </div>
              </div>

              {/* Decompositio */}
              <div className="border-b border-[rgba(255,255,255,0.05)] pb-6">
                <div className="font-serif text-sm uppercase tracking-[0.08em] mb-3 text-[rgba(255,255,255,0.8)]">
                  DECOMPOSITIO
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] space-y-2">
                  <div>P1: Technology often fails</div>
                  <div>
                    P2: Oral traditions are more reliable than digital records
                  </div>
                  <div>
                    C: We should not trust digital records more than oral
                    traditions
                  </div>
                </div>
              </div>

              {/* Fallacia Detecta */}
              <div>
                <div className="font-serif text-sm uppercase tracking-[0.08em] mb-3 text-[rgba(255,255,255,0.8)]">
                  FALLACIA DETECTA
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] space-y-2 mb-4">
                  <div className="text-[#b29b68]">HASTY GENERALIZATION</div>
                  <div className="text-[rgba(255,255,255,0.5)] text-[10px]">
                    Generalizing from insufficient evidence
                  </div>
                  <div className="text-[#b29b68] mt-2">FALSA DILEMMA</div>
                  <div className="text-[rgba(255,255,255,0.5)] text-[10px]">
                    Presenting only two options when more exist
                  </div>
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.5)] mb-4">
                  STRENGTH: MODERATA
                </div>
                <ScholariumButton>REVISIONE OPVS</ScholariumButton>
              </div>

              <div className="pt-4 font-mono text-xs text-[rgba(255,255,255,0.4)]">
                TOWER II • ARGUMENT ENGRAVING LAB • TEXT IN, LEDGER OF FALLACIA
                OUT.
              </div>
            </div>
          </PanelContainer>

          {/* COLUMN 3 – DILEMMATA ARENA */}
          <PanelContainer className="p-6 lg:col-span-1" delay={0.5}>
            <SectionHeaderEngraved
              title="DILEMMATA"
              subtitle="DIALECTIC ARENA"
              delay={0.6}
            />

            <div className="space-y-6">
              {/* Scenario */}
              <div className="border-b border-[rgba(255,255,255,0.05)] pb-6">
                <div className="font-serif text-sm uppercase tracking-[0.08em] mb-3 text-[rgba(255,255,255,0.8)]">
                  SCENARIVM - DILEMMA PRAESENS
                </div>
                <div className="font-mono text-xs text-[rgba(255,255,255,0.6)] leading-relaxed">
                  Should we preserve ancient texts in digital archives or
                  maintain only physical copies?
                </div>
              </div>

              {/* Horn I */}
              <DebateHornBox title="HORNVS I" delay={0.7}>
                <ul className="space-y-2 list-disc list-inside">
                  <li>
                    Digital archives ensure preservation against physical decay
                  </li>
                  <li>Accessibility increases with digital formats</li>
                  <li>
                    Searchability and indexing improve research capabilities
                  </li>
                </ul>
              </DebateHornBox>

              {/* Horn II */}
              <DebateHornBox title="HORNVS II" delay={0.8}>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Physical copies maintain historical authenticity</li>
                  <li>
                    Digital formats are vulnerable to technological obsolescence
                  </li>
                  <li>
                    Material artifacts carry cultural significance beyond
                    content
                  </li>
                </ul>
              </DebateHornBox>

              {/* Buttons */}
              <div className="flex gap-2 flex-wrap">
                <ScholariumButton>RESOLVE VIA MIDDLE PATH</ScholariumButton>
                <ScholariumButton variant="secondary">
                  OPEN DEBATE SESSION
                </ScholariumButton>
              </div>

              {/* Status */}
              <div className="border border-[#b29b68] p-3">
                <div className="font-mono text-xs text-[#b29b68] uppercase tracking-wider">
                  STATUS: IN DEBATE
                </div>
              </div>

              <div className="pt-4 font-mono text-xs text-[rgba(255,255,255,0.4)]">
                TOWER III • TWO OPPOSITE HORNS • YOU ENGINEER A THIRD WAY.
              </div>
            </div>
          </PanelContainer>

          {/* Logic Ledger (Right Side Panel) */}
          <div className="lg:col-span-1">
            <LedgerBox title="LOGIC LEDGER" delay={0.6}>
              <div className="space-y-4">
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    SYLLOGISMI COMPLETI
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">
                    128 DEDUCTIVE CHAINS
                  </div>
                </div>
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    FORMAE
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">
                    BARBARA, CELARENT, DARII, FERIO
                  </div>
                </div>
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    ARGUMENTA ARCHIVATA
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">
                    64 TEXTUS ANALYSATI
                  </div>
                </div>
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    FALLACIA
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">
                    41 DETECTA • 23 NULLAE
                  </div>
                </div>
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    DILEMMATA RESOLUTA
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">
                    19 ARENÆ CONCLUSÆ
                  </div>
                </div>
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    MIDDLE-PATH SOLUTIONS
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">12</div>
                </div>
                <GridDivider className="my-4" />
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    SESSION STATUS
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">
                    TUTORIUM ACTIVUM • SCHOLARIUM
                  </div>
                </div>
                <div>
                  <div className="text-[rgba(255,255,255,0.4)] mb-1">
                    LAST STEP
                  </div>
                  <div className="text-[rgba(255,255,255,0.8)]">
                    ARGUMENT PATTERN ANALYSIS
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <ScholariumButton className="flex-1 text-[10px] py-1.5">
                    <span className="mr-1">→</span> REVIEW IN MEMORIA
                  </ScholariumButton>
                  <ScholariumButton
                    variant="secondary"
                    className="flex-1 text-[10px] py-1.5"
                  >
                    RESET COURSE
                  </ScholariumButton>
                </div>
              </div>
            </LedgerBox>
          </div>
        </div>

        {/* RATIO COMPUTATIONVM (Bottom Panel) */}
        <PanelContainer className="p-6" delay={0.7}>
          <SectionHeaderEngraved title="RATIO COMPUTATIONVM" delay={0.8} />

          {/* Tabs */}
          <div className="flex gap-4 mb-6 font-mono text-xs text-[rgba(255,255,255,0.5)] uppercase tracking-wider">
            {[
              "SYSTEM LOG",
              "RECENT SYLLOGISMI",
              "ARGVMENTA",
              "DILEMMATA",
              "STATUS",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "pb-2 border-b transition-colors",
                  activeTab === tab
                    ? "border-[#b29b68] text-[#b29b68]"
                    : "border-transparent hover:text-[rgba(255,255,255,0.7)]"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Table */}
          <LogicTable rows={logicTableRows} delay={0.9} />
        </PanelContainer>
      </div>
    </Main>
  );
}
