"use client";

import { useState } from "react";
import { PageHeader } from "@/components/bibliotheca/PageHeader";
import { ScrollShelf } from "@/components/bibliotheca/ScrollShelf";
import { LibraryLedger } from "@/components/bibliotheca/LibraryLedger";
import { BookOverview } from "@/components/bibliotheca/BookOverview";
import { Chapter } from "@/components/bibliotheca/ChapterList";
import { Main } from "@/components/Main";

// Mock data
const mockBooks = [
  {
    id: "meditations",
    title: "MEDITATIONS",
    author: "M. AVRELIVS",
    slug: "meditations",
    description:
      "A series of personal writings by Marcus Aurelius, Roman Emperor and Stoic philosopher, recording his private notes to himself and ideas on Stoic philosophy. Written in Greek while on campaign between 170 and 180 AD, the Meditations reflect on how to live a virtuous life and find tranquility in the face of adversity.",
  },
  {
    id: "rhetoric",
    title: "RHETORIC",
    author: "ARISTOTELES",
    slug: "rhetoric",
    description:
      "Aristotle's treatise on the art of persuasion. One of the most influential works on rhetoric, it examines the means of persuasion available in any given situation, focusing on three modes: ethos (credibility), pathos (emotion), and logos (logic).",
  },
];

const mockChapters: Record<string, Chapter[]> = {
  meditations: [
    {
      id: "med-1",
      chapterNumber: 1,
      title: "DEBTS AND LESSONS",
      description:
        "Marcus Aurelius opens by listing the virtues, attitudes, and moral habits he inherited from his family, mentors, and teachers. This book is a map of his psychological ancestry—showing how character is formed through example rather than instruction.",
      microLessonsCount: 2,
      microLessonsTime: "5 MIN",
      microLessonsType: "PROMPTA",
    },
    {
      id: "med-2",
      chapterNumber: 2,
      title: "ON MEETING THE DAY",
      description:
        "Reflections on beginning each day with purpose and accepting whatever comes with equanimity. Marcus reminds himself to expect nothing and to be ready for any challenge.",
      microLessonsCount: 3,
      microLessonsTime: "7 MIN",
      microLessonsType: "EXERCITIA",
    },
    {
      id: "med-3",
      chapterNumber: 3,
      title: "VIEW FROM ABOVE",
      description:
        "A meditation on perspective—seeing one's life and troubles from a cosmic viewpoint. This exercise helps reduce the importance of petty concerns and connects the individual to the universal.",
      microLessonsCount: 1,
      microLessonsTime: "10 MIN",
      microLessonsType: "VISIO MENTALIS",
    },
  ],
  rhetoric: [
    {
      id: "rhet-1",
      chapterNumber: 1,
      title: "ON PERSVASION",
      description:
        "Introduction to the three modes of persuasion: ethos, pathos, and logos. Aristotle establishes rhetoric as the counterpart of dialectic and examines its fundamental principles.",
      microLessonsCount: 2,
      microLessonsTime: "5 MIN",
      microLessonsType: "PROMPTA",
    },
    {
      id: "rhet-2",
      chapterNumber: 2,
      title: "ETHOS AND CHARACTER",
      description:
        "The first mode of persuasion: establishing credibility through character, wisdom, and virtue. How speakers can make themselves trustworthy and authoritative.",
      microLessonsCount: 3,
      microLessonsTime: "7 MIN",
      microLessonsType: "EXERCITIA",
    },
    {
      id: "rhet-3",
      chapterNumber: 3,
      title: "PATHOS AND EMOTION",
      description:
        "The second mode: appealing to the audience's emotions. Aristotle examines various emotions and how to arouse them effectively in different contexts.",
      microLessonsCount: 1,
      microLessonsTime: "10 MIN",
      microLessonsType: "VISIO MENTALIS",
    },
  ],
};

const mockRecentlyOpened = [
  {
    id: "recent-1",
    title: "MEDITATIONS",
    chapter: "CAPVT I — DEBTS AND LESSONS",
  },
  {
    id: "recent-2",
    title: "RHETORIC",
    chapter: "BOOK I — ON PERSVASION",
  },
];

export default function BibliothecaPage() {
  const [selectedBookId, setSelectedBookId] = useState<string>("meditations");
  const [expandedChapterId, setExpandedChapterId] = useState<
    string | undefined
  >("med-1");

  const selectedBook =
    mockBooks.find((book) => book.id === selectedBookId) || null;
  const selectedChapters = selectedBook
    ? mockChapters[selectedBook.id] || []
    : [];

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    // Auto-expand first chapter when switching books
    const firstChapter = mockChapters[bookId]?.[0];
    setExpandedChapterId(firstChapter?.id);
  };

  const handleToggleChapter = (chapterId: string) => {
    setExpandedChapterId(
      expandedChapterId === chapterId ? undefined : chapterId
    );
  };

  const handleContinueLectio = () => {
    // Navigate to the first chapter of the selected book
    const firstChapter = selectedChapters[0];
    if (firstChapter) {
      setExpandedChapterId(firstChapter.id);
      // Scroll to book overview
      document
        .querySelector("[data-book-overview]")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleViewSummary = () => {
    // Navigate to book summary page
    if (selectedBook) {
      window.location.href = `/bibliotheca/${selectedBook.slug}`;
    }
  };

  return (
    <Main>
      <div className="w-full">
        {/* Top Header Section - Full Width */}
        <PageHeader />

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 mb-8">
          {/* Left: ScrollShelf (70%) */}
          <div className="lg:col-span-7">
            <ScrollShelf
              books={mockBooks}
              selectedBookId={selectedBookId}
              onSelectBook={handleSelectBook}
            />
          </div>

          {/* Right: LibraryLedger (30%) */}
          <div className="lg:col-span-3">
            <LibraryLedger
              bookCount={mockBooks.length}
              scrollsExplored={1}
              recentlyOpened={mockRecentlyOpened}
              onContinueLectio={handleContinueLectio}
            />
          </div>
        </div>

        {/* Bottom: BookOverview (Full Width) */}
        {selectedBook && (
          <div data-book-overview>
            <BookOverview
              book={selectedBook}
              chapters={selectedChapters}
              expandedChapterId={expandedChapterId}
              onToggleChapter={handleToggleChapter}
              onViewSummary={handleViewSummary}
            />
          </div>
        )}
      </div>
    </Main>
  );
}
