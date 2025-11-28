"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Highlight } from "@/lib/notes";
import type { BookChapterRef } from "@/lib/books";

interface NotesPanelProps {
  notes: Highlight[];
  chapters: BookChapterRef[];
  onSelectNote: (note: Highlight) => void;
}

export function NotesPanel({ notes, chapters, onSelectNote }: NotesPanelProps) {
  // Group notes by chapter
  const notesByChapter = useMemo(() => {
    const grouped = new Map<string, Highlight[]>();

    notes.forEach((note) => {
      const chapterId = note.chapterId || "uncategorized";
      if (!grouped.has(chapterId)) {
        grouped.set(chapterId, []);
      }
      grouped.get(chapterId)!.push(note);
    });

    // Sort notes within each chapter by page, then by timestamp
    grouped.forEach((chapterNotes) => {
      chapterNotes.sort((a, b) => {
        if (a.pageNumber !== b.pageNumber) {
          return a.pageNumber - b.pageNumber;
        }
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      });
    });

    return grouped;
  }, [notes]);

  // Get chapter title by ID
  const getChapterTitle = (chapterId: string): string => {
    if (chapterId === "uncategorized") return "Uncategorized";
    const chapter = chapters.find((ch) => ch.id === chapterId);
    return chapter?.title || chapterId;
  };

  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Truncate text
  const truncateText = (text: string, maxLength: number = 80): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "…";
  };

  if (notes.length === 0) {
    return (
      <div className="h-full flex flex-col">
        <div
          className="p-6 border-b flex-shrink-0"
          style={{ borderColor: "rgba(200, 182, 141, 0.1)" }}
        >
          <h2 className="font-serif text-lg" style={{ color: "#C8B68D" }}>
            Notes
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <p
            className="font-mono text-xs text-center opacity-40"
            style={{ color: "#C8B68D" }}
          >
            No notes yet.
            <br />
            Select text to create highlights.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div
        className="p-6 border-b flex-shrink-0"
        style={{ borderColor: "rgba(200, 182, 141, 0.1)" }}
      >
        <h2 className="font-serif text-lg mb-1" style={{ color: "#C8B68D" }}>
          Notes
        </h2>
        <p
          className="font-mono text-xs opacity-60"
          style={{ color: "#C8B68D" }}
        >
          {notes.length} {notes.length === 1 ? "note" : "notes"}
        </p>
      </div>

      {/* Scrollable content with shadow overlays */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Top shadow */}
        <div
          className="sticky top-0 h-8 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10, 10, 10, 0.8), transparent)",
          }}
        />

        {/* Notes grouped by chapter */}
        <div className="p-4 space-y-6">
          {Array.from(notesByChapter.entries()).map(
            ([chapterId, chapterNotes]) => (
              <div key={chapterId} className="space-y-3">
                {/* Chapter header */}
                <div
                  className="pb-2 border-b"
                  style={{ borderColor: "rgba(200, 182, 141, 0.1)" }}
                >
                  <h3
                    className="font-serif text-sm"
                    style={{ color: "rgba(200, 182, 141, 0.8)" }}
                  >
                    {getChapterTitle(chapterId)}
                  </h3>
                </div>

                {/* Notes in this chapter */}
                <div className="space-y-2">
                  {chapterNotes.map((note) => (
                    <motion.button
                      key={note.id}
                      onClick={() => onSelectNote(note)}
                      className="w-full text-left p-3 rounded transition-all"
                      style={{
                        background: "transparent",
                        border: "1px solid rgba(200, 182, 141, 0.05)",
                      }}
                      whileHover={{
                        background: "rgba(200, 182, 141, 0.05)",
                        borderColor: "rgba(200, 182, 141, 0.15)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Page marker */}
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className="font-mono text-xs opacity-40"
                          style={{ color: "#C8B68D" }}
                        >
                          Page {note.pageNumber}
                        </span>
                        <span
                          className="font-mono text-xs opacity-30"
                          style={{ color: "#C8B68D" }}
                        >
                          •
                        </span>
                        <span
                          className="font-mono text-xs opacity-40"
                          style={{ color: "#C8B68D" }}
                        >
                          {formatTimestamp(note.timestamp)}
                        </span>
                      </div>

                      {/* Text preview */}
                      <p
                        className="font-mono text-xs leading-relaxed mb-2"
                        style={{ color: "rgba(200, 182, 141, 0.7)" }}
                      >
                        {truncateText(note.text)}
                      </p>

                      {/* Tags (if any) */}
                      {note.tags && note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {note.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 rounded text-xs font-mono"
                              style={{
                                background: "rgba(200, 182, 141, 0.1)",
                                color: "rgba(200, 182, 141, 0.6)",
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Bottom shadow */}
        <div
          className="sticky bottom-0 h-8 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(to top, rgba(10, 10, 10, 0.8), transparent)",
          }}
        />
      </div>
    </div>
  );
}
