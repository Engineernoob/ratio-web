"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookHotspot } from "./BookHotspot";

export interface BookData {
  id: string;
  title?: string;
  pdf?: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface BookshelfProps {
  books: BookData[];
  shelfImagePath: string;
  onBookClick?: (bookId: string) => void;
}

export function Bookshelf({
  books,
  shelfImagePath,
  onBookClick,
}: BookshelfProps) {
  const [zoomedBookId, setZoomedBookId] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleBookClick = (bookId: string) => {
    setZoomedBookId(bookId);
    setIsTransitioning(true);

    // Trigger navigation after animation
    setTimeout(() => {
      if (onBookClick) {
        onBookClick(bookId);
      }
    }, 600);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Bookshelf Image Container */}
      <motion.div
        className="relative w-full h-screen"
        style={{ position: "relative" }}
        animate={{
          scale: zoomedBookId ? 1.12 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut",
        }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${shelfImagePath}')`,
          }}
        />

        {/* Dark Vignette Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%),
              linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.5) 100%)
            `,
          }}
        />

        {/* Dither Texture Overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: "url('/images/textures/texture_bayer.png')",
            backgroundSize: "128px 128px",
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay",
          }}
        />

        {/* Book Hotspots */}
        <div className="absolute inset-0">
          {books.map((book) => (
            <BookHotspot
              key={book.id}
              book={book}
              isZoomed={zoomedBookId === book.id}
              onClick={() => handleBookClick(book.id)}
            />
          ))}
        </div>

        {/* Transition Overlay */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              className="absolute inset-0 bg-[#0A0A0A] z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
