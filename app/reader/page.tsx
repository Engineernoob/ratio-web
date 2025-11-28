"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ChapterReader } from "@/components/bibliotheca/ChapterReader";
import type { BookManifest, ChapterContent } from "@/lib/books";

export default function ReaderPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const bookId = searchParams.get("book");

  const [manifest, setManifest] = useState<BookManifest | null>(null);
  const [currentChapter, setCurrentChapter] = useState<ChapterContent | null>(
    null
  );
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load book manifest
  useEffect(() => {
    if (!bookId) {
      router.push("/bibliotheca");
      return;
    }

    const loadManifest = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/books/${bookId}?action=manifest`);

        if (!response.ok) {
          throw new Error("Book not found");
        }

        const data = await response.json();
        setManifest(data.manifest);

        // Load first chapter by default
        if (data.manifest.chapters.length > 0) {
          const firstChapter = data.manifest.chapters[0];
          setSelectedChapterId(firstChapter.id);
          await loadChapter(firstChapter.file);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load book");
        console.error("Error loading manifest:", err);
      } finally {
        setLoading(false);
      }
    };

    loadManifest();
  }, [bookId, router]);

  // Load chapter content
  const loadChapter = async (fileName: string) => {
    if (!bookId) return;

    try {
      const response = await fetch(
        `/api/books/${bookId}?action=chapter&file=${encodeURIComponent(
          fileName
        )}`
      );

      if (!response.ok) {
        throw new Error("Chapter not found");
      }

      const data = await response.json();
      setCurrentChapter(data.chapter);
    } catch (err) {
      console.error("Error loading chapter:", err);
      setError("Failed to load chapter");
    }
  };

  // Handle chapter selection
  const handleChapterSelect = async (chapterId: string, fileName: string) => {
    setSelectedChapterId(chapterId);
    await loadChapter(fileName);
  };

  const handleClose = () => {
    router.push("/bibliotheca");
  };

  if (!bookId) {
    return null;
  }

  if (loading) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: "#0A0A0A", color: "#C8B68D" }}
      >
        <div className="text-center">
          <div className="font-serif text-xl mb-4">Loading...</div>
          <div className="font-mono text-sm opacity-60">
            Opening the scroll...
          </div>
        </div>
      </div>
    );
  }

  if (error || !manifest) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: "#0A0A0A", color: "#C8B68D" }}
      >
        <div className="text-center">
          <div className="font-serif text-xl mb-4">Error</div>
          <div className="font-mono text-sm opacity-60">
            {error || "Book not found"}
          </div>
          <button
            onClick={handleClose}
            className="mt-6 px-6 py-2 border rounded font-mono text-sm transition-colors"
            style={{
              borderColor: "#312A1D",
              color: "#C8B68D",
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
            Return to Library
          </button>
        </div>
      </div>
    );
  }

  return (
    <ChapterReader
      bookId={manifest.id}
      bookTitle={manifest.title}
      author={manifest.author}
      pdfPath={manifest.pdf}
      chapters={manifest.chapters.map((ch) => ({
        id: ch.id,
        title: ch.title,
        file: ch.file,
        pageStart: ch.pageStart,
        pageEnd: ch.pageEnd,
      }))}
      currentChapter={currentChapter}
      selectedChapterId={selectedChapterId}
      onChapterSelect={handleChapterSelect}
      onClose={handleClose}
    />
  );
}
