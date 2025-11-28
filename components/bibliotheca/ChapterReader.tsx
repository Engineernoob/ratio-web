"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Save,
  Sparkles,
  X,
} from "lucide-react";
import { useMemoriaQueue } from "@/hooks/useMemoriaQueue";

interface Chapter {
  id: string;
  title: string;
  page: number;
}

interface ChapterReaderProps {
  bookId: string;
  bookTitle: string;
  pdfPath?: string;
  chapters?: Chapter[];
  onClose?: () => void;
}

export function ChapterReader({
  bookId,
  bookTitle,
  pdfPath,
  chapters = [],
  onClose,
}: ChapterReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedText, setSelectedText] = useState("");
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [currentNote, setCurrentNote] = useState("");
  const [showChapterList, setShowChapterList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const { createCard } = useMemoriaQueue();

  // Page flip sound
  const playPageFlipSound = () => {
    try {
      // Create a subtle page flip sound using Web Audio API if file doesn't exist
      const audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 200;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Fallback: try to load audio file
      const audio = new Audio("/sounds/page-flip.mp3");
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore if file doesn't exist
      });
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
    playPageFlipSound();
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    playPageFlipSound();
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      setSelectedText(selection.toString().trim());
    }
  };

  const handleSaveExcerpt = async () => {
    if (!selectedText.trim()) return;

    try {
      await createCard({
        title: `Excerpt from ${bookTitle}`,
        content: selectedText,
        question: `Recall the key points from this excerpt: "${selectedText.substring(
          0,
          50
        )}..."`,
        answer: selectedText,
        source: "bibliotheca",
        sourceId: bookId,
        sourceMetadata: {
          page: currentPage,
          bookTitle,
        },
        tags: ["EXCERPT", "BIBLIOTHECA"],
      });

      // Clear selection
      window.getSelection()?.removeAllRanges();
      setSelectedText("");
    } catch (error) {
      console.error("Failed to save excerpt:", error);
    }
  };

  const handleSaveNote = () => {
    if (!currentNote.trim()) return;
    setNotes((prev) => ({ ...prev, [currentPage]: currentNote }));
    setCurrentNote("");
  };

  const handleChapterSelect = (chapter: Chapter) => {
    setCurrentPage(chapter.page);
    setShowChapterList(false);
    playPageFlipSound();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      style={{ background: "#0A0A0A" }}
    >
      {/* Sepia Textured Background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "url('/images/textures/parchment-dither.png')",
          backgroundSize: "512px 512px",
          backgroundRepeat: "repeat",
          mixBlendMode: "multiply",
        }}
      />

      {/* Main Content */}
      <div className="relative h-full flex">
        {/* Left Sidebar - Chapter List & Notes */}
        <motion.div
          className="w-80 border-r flex flex-col"
          style={{
            background:
              "linear-gradient(135deg, rgba(49, 42, 29, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)",
            borderColor: "#312A1D",
          }}
          initial={{ x: -320 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="p-6 border-b" style={{ borderColor: "#312A1D" }}>
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xl font-serif tracking-wider"
                style={{ color: "#C8B68D" }}
              >
                {bookTitle}
              </h2>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-[#C8B68D] hover:text-[#D4C5A0] transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Chapter List Toggle */}
            <button
              onClick={() => setShowChapterList(!showChapterList)}
              className="w-full flex items-center gap-2 px-4 py-2 rounded border text-sm font-mono transition-colors"
              style={{
                color: "#C8B68D",
                borderColor: "#312A1D",
                background: "rgba(49, 42, 29, 0.5)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#C8B68D";
                e.currentTarget.style.background = "rgba(200, 182, 141, 0.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#312A1D";
                e.currentTarget.style.background = "rgba(49, 42, 29, 0.5)";
              }}
            >
              <BookOpen size={16} />
              Chapters ({chapters.length})
            </button>
          </div>

          {/* Chapter List */}
          <AnimatePresence>
            {showChapterList && (
              <motion.div
                className="flex-1 overflow-y-auto p-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterSelect(chapter)}
                    className="w-full text-left px-4 py-3 mb-2 rounded border text-sm font-mono transition-colors"
                    style={{
                      color:
                        currentPage === chapter.page ? "#C8B68D" : "#C8B68D",
                      opacity: currentPage === chapter.page ? 1 : 0.7,
                      borderColor:
                        currentPage === chapter.page ? "#C8B68D" : "#312A1D",
                      background:
                        currentPage === chapter.page
                          ? "rgba(200, 182, 141, 0.1)"
                          : "rgba(49, 42, 29, 0.3)",
                    }}
                  >
                    <div className="font-serif text-xs mb-1">
                      {chapter.title}
                    </div>
                    <div className="text-xs opacity-60">
                      Page {chapter.page}
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Notes Section */}
          <div className="p-4 border-t" style={{ borderColor: "#312A1D" }}>
            <h3
              className="text-sm font-serif mb-3"
              style={{ color: "#C8B68D" }}
            >
              Notes (Page {currentPage})
            </h3>
            <textarea
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full h-24 p-3 rounded border text-sm font-mono resize-none"
              style={{
                background: "rgba(10, 10, 10, 0.5)",
                borderColor: "#312A1D",
                color: "#C8B68D",
              }}
            />
            <button
              onClick={handleSaveNote}
              className="w-full mt-2 px-4 py-2 rounded border text-sm font-mono transition-colors"
              style={{
                color: "#C8B68D",
                borderColor: "#312A1D",
                background: "rgba(49, 42, 29, 0.5)",
              }}
            >
              Save Note
            </button>
            {notes[currentPage] && (
              <div
                className="mt-3 p-3 rounded border text-xs font-mono"
                style={{
                  background: "rgba(200, 182, 141, 0.05)",
                  borderColor: "#312A1D",
                  color: "#C8B68D",
                }}
              >
                {notes[currentPage]}
              </div>
            )}
          </div>
        </motion.div>

        {/* Center - PDF Viewer */}
        <div className="flex-1 flex flex-col relative">
          {/* PDF Container */}
          <div
            ref={pdfContainerRef}
            className="flex-1 overflow-auto p-8"
            onMouseUp={handleTextSelection}
            style={{ background: "rgba(10, 10, 10, 0.5)" }}
          >
            {pdfPath ? (
              <iframe
                src={`${pdfPath}#page=${currentPage}`}
                className="w-full h-full border-0"
                style={{ minHeight: "800px" }}
                title={`${bookTitle} - Page ${currentPage}`}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div
                    className="w-32 h-32 mx-auto mb-6 rounded-full border-4 flex items-center justify-center"
                    style={{
                      borderColor: "#C8B68D",
                      background:
                        "radial-gradient(circle, rgba(200, 182, 141, 0.1) 0%, transparent 70%)",
                    }}
                  >
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C8B68D"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <path d="M9 12l2 2 4-4" />
                    </svg>
                  </div>
                  <p
                    className="text-2xl font-serif mb-4"
                    style={{ color: "#C8B68D" }}
                  >
                    This Scroll Is Sealed
                  </p>
                  <p
                    className="text-sm font-mono"
                    style={{ color: "#C8B68D", opacity: 0.6 }}
                  >
                    The knowledge within awaits discovery...
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Selection Toolbar */}
          <AnimatePresence>
            {selectedText && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-6 py-3 rounded border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                style={{
                  background: "rgba(49, 42, 29, 0.95)",
                  borderColor: "#312A1D",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                }}
              >
                <button
                  onClick={handleSaveExcerpt}
                  className="flex items-center gap-2 px-4 py-2 rounded border text-sm font-mono transition-colors"
                  style={{
                    color: "#C8B68D",
                    borderColor: "#312A1D",
                    background: "rgba(200, 182, 141, 0.1)",
                  }}
                >
                  <Save size={16} />
                  Save to Memory
                </button>
                <button
                  onClick={() => {
                    window.getSelection()?.removeAllRanges();
                    setSelectedText("");
                  }}
                  className="text-[#C8B68D] hover:text-[#D4C5A0] transition-colors"
                >
                  <X size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Page Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 px-6 py-3 rounded border">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="p-2 rounded border transition-colors disabled:opacity-30"
              style={{
                color: "#C8B68D",
                borderColor: "#312A1D",
                background: "rgba(49, 42, 29, 0.5)",
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <span
              className="text-sm font-mono px-4"
              style={{ color: "#C8B68D" }}
            >
              Page {currentPage}
            </span>
            <button
              onClick={handleNextPage}
              className="p-2 rounded border transition-colors"
              style={{
                color: "#C8B68D",
                borderColor: "#312A1D",
                background: "rgba(49, 42, 29, 0.5)",
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Right Sidebar - AI Summary (optional) */}
        <motion.div
          className="w-64 border-l p-6"
          style={{
            background:
              "linear-gradient(135deg, rgba(49, 42, 29, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%)",
            borderColor: "#312A1D",
          }}
          initial={{ x: 256 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded border text-sm font-mono transition-colors"
            style={{
              color: "#C8B68D",
              borderColor: "#312A1D",
              background: "rgba(49, 42, 29, 0.5)",
            }}
          >
            <Sparkles size={16} />
            AI Summary
          </button>
        </motion.div>
      </div>
    </div>
  );
}
