"use client";

import { useState } from "react";
import { PageHeader } from "@/components/archivvm/PageHeader";
import { ScrollShelf } from "@/components/archivvm/ScrollShelf";
import { ShelfSection } from "@/components/archivvm/ShelfSection";
import { ArchivistNotes } from "@/components/archivvm/ArchivistNotes";
import { ExpandableNote } from "@/components/archivvm/ExpandableNote";
import { RavenSessionCard } from "@/components/archivvm/RavenSessionCard";
import { ExpandedScrollModal } from "@/components/archivvm/ExpandedScrollModal";
import { GoldenButton } from "@/components/archivvm/GoldenButton";
import { TagPill } from "@/components/archivvm/TagPill";
import { Scroll } from "@/components/archivvm/ScrollCard";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Placeholder data matching the screenshot
const scrolls: Scroll[] = [
  {
    id: "1",
    title: "THINKING IN SYSTEMS",
    author: "DONELLA MEADOWS",
    summary:
      "Systems think in loops, not lines. Each intervention shifts stocks, flows, and feedback. This archive entry condenses the book into a set of leverage points...",
    type: "book",
    tags: ["LECTIO"],
    icon: "📊",
    strength: "medius",
    chapters: [
      { title: "CAPVT I ‣ THE BASICS", strength: "medius" },
      { title: "CAPVT II ‣ STOCKS AND FLOWS", strength: "medius" },
      { title: "CAPVT III ‣ FEEDBACK LOOPS", strength: "fragilis" },
      { title: "CAPVT IV ‣ LEVERAGE POINTS", strength: "novus" },
    ],
  },
  {
    id: "2",
    title: "HOW TO TAKE SMART NOTES",
    author: "SÖNKE AHRNS",
    summary: "A method for knowledge management and note-taking...",
    type: "book",
    tags: ["LECTIO"],
    icon: "📝",
    strength: "medius",
  },
  {
    id: "3",
    title: "THE ART OF THINKING CLEARLY",
    author: "ROLF DOBELLI",
    summary: "Cognitive biases and how to avoid them...",
    type: "book",
    tags: ["LECTIO"],
    icon: "🧠",
    strength: "fragilis",
  },
  {
    id: "4",
    title: "INFINITE GAMES",
    author: "SIMON SINEK",
    summary: "Finite vs infinite games in business and life...",
    type: "book",
    tags: ["LECTIO"],
    icon: "∞",
    strength: "novus",
  },
  {
    id: "5",
    title: "THE SHIELD OF ACHILLES",
    author: "PHILIP BOBBITT",
    summary: "The evolution of the modern state...",
    type: "book",
    tags: ["LECTIO"],
    icon: "🛡",
    strength: "medius",
  },
  {
    id: "6",
    title: "INFORMATION THEORY",
    author: "CLAUDE SHANNON",
    summary: "Mathematical theory of communication...",
    type: "book",
    tags: ["LECTIO"],
    icon: "ℹ",
    strength: "fragilis",
  },
];

const microLessons = [
  {
    id: "ml1",
    title: "ONE DECISION, ONE METRIC",
    tag: "BOOK",
    scroll: scrolls[0],
  },
  {
    id: "ml2",
    title: "REHEARSE FAILURE FIRST",
    tag: "PVZZLE",
    scroll: scrolls[1],
  },
  {
    id: "ml3",
    title: "STEELMAN BEFORE STRIKE",
    tag: "DIALECTIC",
    scroll: scrolls[2],
  },
  {
    id: "ml4",
    title: "STATE THE NULL PLAN",
    tag: "RITUAL",
    scroll: scrolls[0],
  },
];

const sealedScrolls = [
  {
    id: "ss1",
    title: "SHIP OF THESEUS NOTE ARCHIVE",
    isSealed: true,
    difficulty: "MEDIVS",
  },
  {
    id: "ss2",
    title: "SORITES PARADOX",
    isSealed: false,
    difficulty: "ALTA",
  },
  {
    id: "ss3",
    title: "BARBER PARADOX",
    isSealed: true,
    difficulty: "BASSA",
  },
];

const notes = [
  {
    id: "n1",
    text: "If it does not fit in one sentence, it does not yet fit in memory.",
  },
  {
    id: "n2",
    text: "The best note is the one you can reconstruct from memory.",
  },
  {
    id: "n3",
    text: "Knowledge compounds when connected to existing nodes.",
  },
];

const ravenSessions = [
  {
    id: "rs1",
    question: "WHEN IS IT RATIONAL TO DELAY A DECISION?",
    answer:
      "Your answer: when the expected value of new information exceeds the cost of waiting. The decision should be delayed if the information gain multiplied by its probability is greater than the opportunity cost of delay.",
    sessionNumber: 24,
    addedDaysAgo: 2,
  },
  {
    id: "rs2",
    question: "WHAT IS THE DIFFERENCE BETWEEN RISK AND UNCERTAINTY?",
    answer:
      "Your answer: Risk involves known probabilities of outcomes, while uncertainty involves unknown probabilities. Risk can be calculated and insured against; uncertainty requires different decision frameworks.",
    sessionNumber: 23,
    addedDaysAgo: 5,
  },
];

export default function ArchivvmPage() {
  const pathname = usePathname();
  const [selectedScroll, setSelectedScroll] = useState<Scroll | null>(null);
  const [selectedMicroLessonTitle, setSelectedMicroLessonTitle] = useState<
    string | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sealedStates, setSealedStates] = useState<Record<string, boolean>>(
    sealedScrolls.reduce((acc, scroll) => {
      acc[scroll.id] = scroll.isSealed;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const handleOpenScroll = (scroll: Scroll, microLessonTitle?: string) => {
    setSelectedScroll(scroll);
    setSelectedMicroLessonTitle(microLessonTitle || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScroll(null);
    setSelectedMicroLessonTitle(null);
  };

  const handleBreakSeal = (id: string) => {
    setSealedStates((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <div className="min-h-screen bg-black relative">
      <div className="relative z-10 max-w-[1300px] mx-auto px-8 py-8 min-h-screen">
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

        {/* Page Header */}
        <PageHeader
          title="ARCHIVVM"
          subtitle="TABVLARIVM SAPIENTIÆ"
          descriptor="ARCHIVVM MEMORIÆ. DISPVATIONVM. LIBRORVM. ET COGITATIONVM."
        />

        {/* Navigation Bar (ghosted/inactive) */}
        <div className="flex items-center justify-center gap-6 mb-8 opacity-20">
          {[
            "MEMORIA LEDGER",
            "WORK SESSIONS",
            "OIKOS INDEX",
            "PUZZLE & RIDDLES",
            "LIBRARY SHELVES",
            "DAILY REFLECTION",
          ].map((item) => (
            <span
              key={item}
              className="font-mono text-xs uppercase tracking-wider text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-[70%_30%] gap-8">
          {/* Left Column - Main Content */}
          <div>
            {/* Knowledge Shelf Cards */}
            <ScrollShelf
              scrolls={scrolls}
              visibleCount={6}
              totalCount={64}
              onOpenScroll={handleOpenScroll}
              onAddAllToMemoria={() => console.log("Add all to memoria")}
            />

            {/* Micro-lessons Shelf */}
            <ShelfSection
              title="MICROLESSONS"
              subtitle="MINUTA DOCTRINA"
              defaultOpen={true}
            >
              <div className="space-y-3">
                {microLessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className="flex items-center justify-between p-3 bg-[rgba(0,0,0,0.4)] border border-[rgba(215,196,158,0.3)]"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <p className="font-mono text-xs text-muted-foreground">
                        {lesson.title}
                      </p>
                      <TagPill label={`TAG: ${lesson.tag}`} />
                    </div>
                    <GoldenButton
                      onClick={() =>
                        handleOpenScroll(lesson.scroll, lesson.title)
                      }
                    >
                      OPEN SCROLL
                    </GoldenButton>
                  </div>
                ))}
              </div>
            </ShelfSection>

            {/* Sealed Scrolls Section */}
            <ShelfSection
              title="PUZZLES & RIDDLES"
              subtitle="AENIGMATA"
              defaultOpen={true}
            >
              <div className="space-y-3">
                {sealedScrolls.map((scroll) => (
                  <div
                    key={scroll.id}
                    className="flex items-center gap-4 p-3 bg-[rgba(0,0,0,0.4)] border border-[rgba(215,196,158,0.3)]"
                  >
                    <div
                      className="shrink-0 w-10 h-10 rounded-full border border-[rgba(215,196,158,0.4)] flex items-center justify-center text-lg"
                      style={{
                        boxShadow:
                          "inset 0 1px 2px rgba(255,255,255,0.05), 0 1px 4px rgba(0,0,0,0.2)",
                      }}
                    >
                      🧭
                    </div>
                    <div className="flex-1">
                      <p className="font-mono text-xs text-muted-foreground mb-1">
                        {scroll.title}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[rgba(215,196,158,0.9)]">
                          {sealedStates[scroll.id]
                            ? "SEALED SCROLL + REVEAL ANSWER"
                            : "SCROLL VNROLLED + ANSWER VISIBLE"}
                        </span>
                        <TagPill label={`DIFFICULTAS: ${scroll.difficulty}`} />
                      </div>
                    </div>
                    <GoldenButton
                      onClick={() =>
                        sealedStates[scroll.id]
                          ? handleBreakSeal(scroll.id)
                          : handleBreakSeal(scroll.id)
                      }
                    >
                      {sealedStates[scroll.id] ? "BREAK SEAL" : "CLOSE SCROLL"}
                    </GoldenButton>
                  </div>
                ))}
              </div>
            </ShelfSection>

            {/* General Notes Section */}
            <ShelfSection
              title="NOTES"
              subtitle="CITA MEMOR"
              defaultOpen={true}
            >
              <div>
                {notes.map((note) => (
                  <ExpandableNote key={note.id} text={note.text} icon="□" />
                ))}
              </div>
            </ShelfSection>

            {/* Raven Sessions Section */}
            <ShelfSection
              title="RAVEN SESSIONS"
              subtitle="EXEMPLA INCOGNITA"
              defaultOpen={true}
            >
              <div>
                {ravenSessions.map((session, index) => (
                  <RavenSessionCard
                    key={session.id}
                    question={session.question}
                    answer={session.answer}
                    sessionNumber={session.sessionNumber}
                    addedDaysAgo={session.addedDaysAgo}
                    onRerun={() => console.log("Rerun session", session.id)}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </ShelfSection>

            {/* Footer Stats Section */}
            <div className="mt-8 p-4 bg-[rgba(0,0,0,0.4)] border border-[rgba(215,196,158,0.3)]">
              <h2 className="font-mono text-xs uppercase tracking-wider text-[rgba(215,196,158,0.8)] mb-4">
                CORPVS SAPIENTIÆ
              </h2>
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs text-muted-foreground">
                  TOTAL KNOWLEDGE CONTAINED: 1,274 CONCEPTS SCROLLS CREATED: 432
                  YOUR ARCHIVE EXPANDS DAILY.
                </p>
                <GoldenButton onClick={() => console.log("View stats")}>
                  VIEW ARCHIVE STATISTICS
                </GoldenButton>
              </div>
            </div>
          </div>

          {/* Right Column - Archivist Notes */}
          <div>
            <ArchivistNotes
              stats={{
                totalScrolls: 432,
                totalMicroLessons: 189,
                totalConcepts: 1274,
                lastEdited: "HODIE ‣ HORA IX",
              }}
              ledgerState={{
                strong: 68,
                medium: 22,
                fragile: 10,
              }}
              onExport={() => console.log("Export everything")}
            />
          </div>
        </div>
      </div>

      {/* Expanded Scroll Modal */}
      <ExpandedScrollModal
        scroll={selectedScroll}
        microLessonTitle={selectedMicroLessonTitle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToMemoria={(scroll) => {
          console.log("Add to memoria", scroll);
          handleCloseModal();
        }}
        onAddAllLessons={(scroll) => {
          console.log("Add all lessons", scroll);
          handleCloseModal();
        }}
      />
    </div>
  );
}
