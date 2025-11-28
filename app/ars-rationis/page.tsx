"use client";

import { Main } from "@/components/Main";
import {
  LogicPillar,
  DebatePanel,
  LedgerPanel,
  AxiomTable,
  ComputationLogSection,
} from "@/components/core";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ArsRationisPage() {
  const pathname = usePathname();
  const [majorProposition, setMajorProposition] = useState(
    "Omnes homines mortales sunt."
  );
  const [minorProposition, setMinorProposition] =
    useState("Socrates homo est.");
  const [conclusion, setConclusion] = useState("Ergo, Socrates mortalis est.");
  const [argumentText, setArgumentText] = useState(
    "Since technology often fails, we should trust oral tradition more than digital records."
  );

  // Sample data
  const syllogisms = [
    {
      id: "1",
      title: "BARBARA + MORTALITAS VALIDVM",
      details: "3 PROPOSITIONES • 1 CONCLUSIO • ARCHIVVM ID #042",
      status: "valid" as const,
    },
    {
      id: "2",
      title: "CELARENT + ACCESSYS ARCHIVI INCONSISTENT PREMISSE",
      details: "3 PROPOSITIONES • 1 CONCLUSIO • ARCHIVVM ID #043",
      status: "flagged" as const,
      tag: "REVISIONE OPVS",
    },
  ];

  const argumentEntries = [
    { title: "TRADITIO VS DIGITAL RECORD", strength: "MODERATA" },
    { title: "AVTOMATA ET AUCTORITAS", strength: "ROBUSTVA" },
  ];

  const dilemmaEntries = [
    { title: "CENTRUM VS DISPERSIO", status: "IN DEBATE" },
  ];

  const axiomEntries = [
    {
      id: "1",
      axiom: "AX-01 VNIVERSAL MORTALITY",
      description: "BARBARA AAA NODI: I-II • TRUTH PRESERVED",
      fallacy: "HASTY GENERALIZATION",
      chain: "AX-01: VH(X)→M(X))",
    },
    {
      id: "2",
      axiom: "AX-07 PROPORTIO EXEMPLUM",
      description: "INDUCTION PATTERN • SAMPLE SIZE VALIDATED",
      fallacy: "FALSE DILEMMA",
      chain: "AX-07: PROPORTIO EXEMP",
    },
    {
      id: "3",
      axiom: "AX-12 VIA MEDIA",
      description: "DIALECTIC RESOLUTION • MIDDLE PATH",
      fallacy: "AVCTORITATIS FALLACIA",
      chain: "AX-12: MEDIA VIA",
    },
    {
      id: "4",
      axiom: "AX-15 RATIO ANTE NOMEN",
      description: "REASON BEFORE AUTHORITY • LOGIC PRIMACY",
      fallacy: "",
      chain: "AX-15: RATIO PRIMA",
    },
  ];

  const logEntries = [
    {
      id: "1",
      module: "LOGIC BASICS + MORTALITAS",
      pattern: "SYLLOGISMYS / BARBARA AAA",
      axiomata: "AX-01: VH(X)→M(X))",
      logStatus: "OK VALIDITAS CONFIRMATA",
    },
    {
      id: "2",
      module: "TRADITIO VS DIGITVM",
      pattern: "INDUCTION HASTY GENERAL..",
      axiomata: "AX-07: PROPORTIO EXEMP",
      logStatus: "WARN SAMPLE SIZE PARVA",
    },
    {
      id: "3",
      module: "CENTRAL ARCHIVVM",
      pattern: "FALSE DILEMMA RISK",
      axiomata: "AX-12: VIA MEDIA",
      logStatus: "NOTE FALSE DILEMMA RISK",
    },
    {
      id: "4",
      module: "SYSTEM CHECK",
      pattern: "NO ERRORS DETECTED",
      axiomata: "",
      logStatus: "OK NYLLVS ERROR CRITICVS",
    },
    {
      id: "5",
      module: "DEBATE ENGINE",
      pattern: "DIALECTIC ACTIVE",
      axiomata: "AX-15: RATIO PRIMA",
      logStatus: "STATUS: IN DEBATE • RESOLVE PENDING",
    },
    {
      id: "6",
      module: "ARCHIVVM STORAGE",
      pattern: "OBIECTIONEM STORED",
      axiomata: "",
      logStatus: "LOG: OBIECTIONEM STORED IN ARCHIVVM",
    },
  ];

  return (
    <Main className="max-w-[1600px]">
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

      {/* Header Zone */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 text-center relative"
      >
        <h1 className="font-serif text-5xl md:text-6xl uppercase tracking-[0.12em] engraved-text mb-2">
          ARS RATIONIS
        </h1>
        <h2 className="font-serif text-xl md:text-2xl uppercase tracking-widest text-muted-foreground mb-4">
          OFFICINA LOGICA
        </h2>
        <p className="font-serif text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          A silent computational temple where arguments are dissected, axioms
          are tested, and truth is engineered.
        </p>

        {/* Circular engraved disc element */}
        <div className="flex justify-center mb-8">
          <div
            className="w-24 h-24 rounded-full border border-[#b29b68] relative"
            style={{
              opacity: 0.1,
              boxShadow:
                "inset 0 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(178,155,104,0.1)",
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#b29b68", opacity: 0.6 }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#b29b68", opacity: 0.6 }}
                />
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: "#b29b68", opacity: 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr_400px] gap-6 mb-6">
        {/* Three Pillars */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
            className="mb-4"
          >
            <h3 className="font-serif text-sm uppercase tracking-[0.12em] engraved-text text-muted-foreground">
              TRIA PILARIA
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Panel 1 - SYLLOGISMS */}
            <LogicPillar
              title="SYLLOGISMVS"
              subtitle="DEDVCTIVE ENGINE"
              delay={0.1}
            >
              <div className="space-y-4">
                <div>
                  <label className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    MAIOR PROPOSITIO
                  </label>
                  <input
                    type="text"
                    value={majorProposition}
                    onChange={(e) => setMajorProposition(e.target.value)}
                    className="w-full border border-border bg-transparent px-3 py-2 font-mono text-sm focus:outline-none focus:border-[#b29b68] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    MINOR PROPOSITIO
                  </label>
                  <input
                    type="text"
                    value={minorProposition}
                    onChange={(e) => setMinorProposition(e.target.value)}
                    className="w-full border border-border bg-transparent px-3 py-2 font-mono text-sm focus:outline-none focus:border-[#b29b68] transition-colors"
                  />
                </div>
                <div>
                  <label className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    CONCLUSIO GENERATA
                  </label>
                  <div className="border border-border bg-transparent px-3 py-2 font-mono text-sm">
                    {conclusion}
                  </div>
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="font-mono text-xs">
                    <span className="text-muted-foreground">FIGURA: </span>
                    <span>BARBARA</span>
                  </div>
                  <div className="font-mono text-xs">
                    <span className="text-muted-foreground">MOOD: </span>
                    <span>AAA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#b29b68] border border-[#b29b68] px-2 py-0.5">
                      VALIDVM
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="border border-border bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#b29b68] hover:text-[#b29b68]">
                    TEST VALIDITY
                  </button>
                  <button className="border border-border bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#b29b68] hover:text-[#b29b68]">
                    GENERATE EXEMPLVM
                  </button>
                  <button className="border border-border bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#b29b68] hover:text-[#b29b68]">
                    SAVE IN ARCHIVVM
                  </button>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="font-mono text-xs text-muted-foreground">
                    DEDVCTIVE CIRCUIT • 3 NODI • 1 CONCLUSIO • LOGIC STONE
                    LINKED.
                  </p>
                </div>
              </div>
            </LogicPillar>

            {/* Panel 2 - ARGVMENTVM */}
            <LogicPillar
              title="ARGVMENTVM"
              subtitle="ANALYSIS ET STRUCTURA"
              delay={0.2}
            >
              <div className="space-y-4">
                <div>
                  <label className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
                    TEXTUS ARGVMENTI
                  </label>
                  <textarea
                    value={argumentText}
                    onChange={(e) => setArgumentText(e.target.value)}
                    rows={4}
                    className="w-full border border-border bg-transparent px-3 py-2 font-mono text-sm focus:outline-none focus:border-[#b29b68] transition-colors resize-none"
                  />
                </div>
                <div>
                  <div className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    CLAIMA IDENTIFICATA
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-xs border border-border p-2">
                      [C1] Technologia saepe deficit.
                    </div>
                    <div className="font-mono text-xs border border-border p-2">
                      [C2] Traditio oralis est trvstvm.
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    PREMISSE
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-xs border border-border p-2">
                      P1: Omne quod saepe deficit non est plvrum trvstvm.
                    </div>
                    <div className="font-mono text-xs border border-border p-2">
                      P2: Technologia saepe deficit.
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    FALLACIA DETECTE
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-xs border border-red-500/30 bg-red-500/10 p-2">
                      HASTY GENERALIZATION
                    </div>
                    <div className="font-mono text-xs border border-red-500/30 bg-red-500/10 p-2">
                      FALSE DILEMMA
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    GRADYS ROBUSTIA
                  </div>
                  <div className="font-mono text-xs">STRENGTH: MODERATA</div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">
                    Sample size insufficient for universal claim.
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="border border-border bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#b29b68] hover:text-[#b29b68]">
                    ANALYZE ARGVMENT
                  </button>
                  <button className="border border-border bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#b29b68] hover:text-[#b29b68]">
                    HIGHLIGHT FALLACIA
                  </button>
                  <button className="border border-border bg-transparent px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:border-[#b29b68] hover:text-[#b29b68]">
                    CONVERT TO SYLLOGISMVS
                  </button>
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="font-serif text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    ROMAN INSCRIPTION BLOCKS
                  </div>
                  <div className="font-mono text-xs space-y-1 text-muted-foreground">
                    <div>• CLAIMA</div>
                    <div>• PREMISSE</div>
                    <div>• FALLACIA</div>
                    <div>• STRENGTH GRADE</div>
                  </div>
                </div>
              </div>
            </LogicPillar>

            {/* Panel 3 - DILEMMATA */}
            <DebatePanel
              dilemma="Centralized knowledge archives offer maximum coherence but create a single point of failure. Distributed archives provide resilience but risk fragmented truth coordination."
              horns={[
                {
                  id: "1",
                  title: "HORNVS I",
                  label:
                    "Centralized archivum maxima coherentia • vnicum punctum defectvs.",
                },
                {
                  id: "2",
                  title: "HORNVS II",
                  label:
                    "Distributed archivum minima resilientia • fragilis coordinatio veritatis.",
                },
              ]}
              status="IN DEBATE"
              delay={0.3}
            />
          </div>
        </div>

        {/* Right Side - LOGICA LEDGER */}
        <div className="lg:col-span-1">
          <LedgerPanel
            syllogisms={syllogisms}
            arguments={argumentEntries}
            dilemmas={dilemmaEntries}
            delay={0.4}
          />
        </div>
      </div>

      {/* Mid-Bottom - TABVLA AXIOMATVM */}
      <div className="mb-6">
        <AxiomTable entries={axiomEntries} delay={0.5} />
      </div>

      {/* Bottom - RATIO COMPUTATIONVM */}
      <div>
        <ComputationLogSection entries={logEntries} delay={0.6} />
      </div>
    </Main>
  );
}
