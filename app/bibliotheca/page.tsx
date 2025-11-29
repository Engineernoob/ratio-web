"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookHotspot } from "@/components/bibliotheca/BookHotspot";
import type { BookData } from "@/components/bibliotheca/Bookshelf";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { TopNavBar } from "@/components/core/TopNavBar";
import { Main } from "@/components/Main";

interface BookshelfMap {
  books: BookData[];
}

export default function BibliothecaPage() {
  const router = useRouter();
  const [books, setBooks] = useState<BookData[]>([]);
  const [loading, setLoading] = useState(true);
  const [clickedBookId, setClickedBookId] = useState<string | null>(null);

  // Load bookshelf map
  useEffect(() => {
    const loadBookshelfMap = async () => {
      try {
        // Try to load from public directory first
        let response = await fetch("/bookshelf-map.json");
        if (!response.ok) {
          // Fallback: try to load from data directory via API
          response = await fetch("/api/bookshelf-map");
        }

        if (!response.ok) {
          throw new Error("Failed to load bookshelf map");
        }

        const data: BookshelfMap = await response.json();
        setBooks(data.books || []);
      } catch (error) {
        console.error("Error loading bookshelf map:", error);
        // Fallback to empty array
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBookshelfMap();
  }, []);

  const handleBookClick = (bookId: string) => {
    setClickedBookId(bookId);
    setTimeout(() => {
      router.push(`/reader?book=${bookId}`);
    }, 600);
  };

  if (loading) {
    return (
      <Main>
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ background: "#0A0A0A" }}
        >
          <div className="text-center">
            <div
              className="font-serif text-xl mb-4"
              style={{ color: "#C8B68D" }}
            >
              Loading Bibliotheca...
            </div>
            <div
              className="font-mono text-sm opacity-60"
              style={{ color: "#C8B68D" }}
            >
              Unfolding the archive...
            </div>
          </div>
        </div>
      </Main>
    );
  }

  return (
    <>
      <TopNavBar />
      <Main>
        <div
          className="relative w-full min-h-screen overflow-hidden"
          style={{ background: "#0A0A0A" }}
        >
          {/* Dithering texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "url('/images/textures/texture_bayer.png')",
              backgroundSize: "256px 256px",
              backgroundRepeat: "repeat",
              zIndex: 0,
            }}
          />

          {/* Header */}
          <motion.div
            className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 text-center"
            style={{ zIndex: 10 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-serif text-2xl md:text-4xl mb-2 pointer-events-none"
              style={{
                color: "#C8B68D",
                textShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              BIBLIOTHECA
            </h1>
            <p
              className="font-mono text-xs opacity-60 px-4 pointer-events-none"
              style={{ color: "#C8B68D" }}
            >
              Your Living Archive of Volumes
            </p>
            <a
              href="/bibliotheca/upload"
              className="font-mono text-xs mt-3 inline-block px-4 py-2 border border-[#C8B68D] opacity-60 hover:opacity-100 transition-opacity pointer-events-auto"
              style={{
                color: "#C8B68D",
                textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
              }}
            >
              Upload Book
            </a>
          </motion.div>

          {/* Bookshelf Container with Parallax */}
          <div className="relative w-full h-screen overflow-hidden">
            {/* Background Shelf with Parallax */}
            <div className="absolute inset-0" style={{ zIndex: 2 }}>
              <ParallaxLayer depth={0}>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: "url('/images/alexandria-shelf.jpg')",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                  }}
                />
              </ParallaxLayer>
            </div>

            {/* Dark Vignette Overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 3,
                background: `
                radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%),
                linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)
              `,
              }}
            />

            {/* Book Hotspots with Parallax */}
            <div className="absolute inset-0" style={{ zIndex: 4 }}>
              <ParallaxLayer depth={0.3}>
                <div className="relative w-full h-full">
                  {books.map((book) => (
                    <BookHotspot
                      key={book.id}
                      book={book}
                      isZoomed={clickedBookId === book.id}
                      onClick={() => handleBookClick(book.id)}
                    />
                  ))}
                </div>
              </ParallaxLayer>
            </div>

            {/* Zoom overlay when book is clicked */}
            {clickedBookId && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 5 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: "rgba(10, 10, 10, 0.8)",
                  }}
                />
              </motion.div>
            )}
          </div>
        </div>
      </Main>
    </>
  );
}
