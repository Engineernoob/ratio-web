"use client";

import { useRouter } from "next/navigation";
import { Bookshelf, type BookData } from "@/components/bibliotheca/Bookshelf";
import { PageHeader } from "@/components/bibliotheca/PageHeader";
import { Main } from "@/components/Main";

// Book coordinates and metadata
const BOOK_COORDINATES: BookData[] = [
  {
    id: "atomic_habits",
    title: "Atomic Habits",
    pdf: "/pdfs/atomic_habits.pdf",
    x: 360,
    y: 165,
    width: 40,
    height: 108,
  },
  {
    id: "thinking_fast_and_slow",
    title: "Thinking, Fast and Slow",
    pdf: "/pdfs/thinking_fast_and_slow.pdf",
    x: 405,
    y: 165,
    width: 38,
    height: 108,
  },
  {
    id: "book_top_left_1",
    x: 120,
    y: 55,
    width: 32,
    height: 100,
  },
  {
    id: "book_top_center_1",
    x: 390,
    y: 55,
    width: 28,
    height: 100,
  },
  {
    id: "book_top_right_1",
    x: 650,
    y: 55,
    width: 35,
    height: 100,
  },
  {
    id: "book_row3_left_1",
    x: 135,
    y: 285,
    width: 33,
    height: 112,
  },
  {
    id: "book_row3_center_1",
    x: 390,
    y: 285,
    width: 30,
    height: 112,
  },
  {
    id: "book_row3_right_1",
    x: 650,
    y: 285,
    width: 34,
    height: 112,
  },
];

export default function BibliothecaPage() {
  const router = useRouter();

  const handleBookClick = (bookId: string) => {
    router.push(`/reader/${bookId}`);
  };

  return (
    <Main>
      <div className="w-full">
        {/* Top Header Section */}
        <PageHeader />

        {/* Interactive Bookshelf */}
        <Bookshelf
          books={BOOK_COORDINATES}
          shelfImagePath="/images/alexandria-shelf.jpg"
          onBookClick={handleBookClick}
        />
      </div>
    </Main>
  );
}
