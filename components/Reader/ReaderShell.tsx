"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, X } from "lucide-react";
import { ChapterSidebar } from "./ChapterSidebar";
import { ChapterContent } from "./ChapterContent";
import { CodexReader } from "./CodexReader";
import { NotesPanel } from "./NotesPanel";
import type {
  BookChapterRef,
  ChapterContent as ChapterContentType,
  BookManifest,
} from "@/lib/books";
import type { Highlight } from "@/lib/notes";

interface ReaderShellProps {
  bookTitle: string;
  author?: string;
  chapters: BookChapterRef[];
  currentChapter: ChapterContentType | null;
  selectedChapter: BookChapterRef | null;
  onSelectChapter: (chapter: BookChapterRef) => void;
  manifest: BookManifest;
  pdfPath?: string;
  notes: Highlight[];
  onSelectNote: (note: Highlight) => void;
  onHighlightCreated?: () => void;
}

export function ReaderShell({
  bookTitle,
  author,
  chapters,
  currentChapter,
  selectedChapter,
  onSelectChapter,
  manifest,
  pdfPath,
  notes,
  onSelectNote,
  onHighlightCreated,
}: ReaderShellProps) {
  const [showNotesPanel, setShowNotesPanel] = useState(true);
  return (
    <div
      className="fixed inset-0 flex"
      style={{
        background: "#0A0A0A",
      }}
    >
      {/* Dithering texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url('/images/textures/texture_bayer.png')",
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Main Layout - Responsive */}
      <div className="relative flex-1 flex h-full w-full">
        {/* Left Sidebar - Chapters */}
        <div className="flex-shrink-0">
          <ChapterSidebar
            chapters={chapters}
            selectedChapterId={selectedChapter?.id || null}
            onSelectChapter={onSelectChapter}
            bookTitle={bookTitle}
            author={author}
          />
        </div>

        {/* Center Panel - CodexReader */}
        <div
          className="flex-1 flex flex-col border-r min-w-0"
          style={{ borderColor: "rgba(200, 182, 141, 0.1)" }}
        >
          <div
            className="h-[600px] w-full flex-shrink-0"
            style={{
              background: "#0A0A0A",
              borderBottom: "1px solid rgba(200, 182, 141, 0.1)",
            }}
          >
            <CodexReader
              bookId={manifest.id}
              manifest={manifest}
              pdfPath={pdfPath}
              selectedChapter={selectedChapter}
              onHighlightCreated={onHighlightCreated}
            />
          </div>

          {/* Chapter Content */}
          <div className="flex-1 overflow-hidden min-h-0">
            <ChapterContent chapter={currentChapter} />
          </div>
        </div>

        {/* Toggle Notes Panel Button */}
        <div
          className="absolute top-4 right-4 z-30"
          style={{ right: showNotesPanel ? "280px" : "20px" }}
        >
          <motion.button
            onClick={() => setShowNotesPanel(!showNotesPanel)}
            className="p-3 rounded-full transition-all"
            style={{
              background: showNotesPanel
                ? "rgba(200, 182, 141, 0.15)"
                : "rgba(200, 182, 141, 0.1)",
              border: "1px solid rgba(200, 182, 141, 0.2)",
              color: "#C8B68D",
            }}
            whileHover={{
              background: "rgba(200, 182, 141, 0.2)",
              scale: 1.1,
            }}
            whileTap={{ scale: 0.95 }}
          >
            {showNotesPanel ? <X size={18} /> : <StickyNote size={18} />}
          </motion.button>
        </div>

        {/* Right Sidebar - Notes Panel */}
        <AnimatePresence>
          {showNotesPanel && (
            <motion.div
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-64 flex-shrink-0 border-l"
              style={{
                background: "rgba(10, 10, 10, 0.95)",
                borderColor: "rgba(200, 182, 141, 0.1)",
              }}
            >
              <NotesPanel
                notes={notes}
                chapters={chapters}
                onSelectNote={onSelectNote}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
