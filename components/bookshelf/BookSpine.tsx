"use client";

import { motion } from "framer-motion";

export interface BookMeta {
  id: string;
  title: string;
  author: string;
  category?: string;
  tags?: string[];
  spine: string;
  cover?: string;
  chapters: Array<{
    id: string;
    title: string;
    file: string;
  }>;
}

interface BookSpineProps {
  book: BookMeta;
  onClick: () => void;
  index: number;
}

export function BookSpine({ book, onClick, index }: BookSpineProps) {
  // Vary spine width for visual interest
  const spineWidths = ["w-8", "w-10", "w-12", "w-9", "w-11", "w-8"];
  const widthClass = spineWidths[index % spineWidths.length];

  return (
    <motion.button
      onClick={onClick}
      className={`${widthClass} h-64 md:h-80 shrink-0 cursor-pointer focus:outline-none`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{
        translateY: -6,
        rotateZ: -1,
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.97,
        transition: { duration: 0.1 },
      }}
    >
      <div className="relative w-full h-full group">
        {/* Spine Image */}
        <div className="relative w-full h-full overflow-hidden bg-[#111] border border-white/10">
          <img
            src={book.spine}
            alt={`${book.title} by ${book.author}`}
            className="w-full h-full object-cover grayscale contrast-125"
            style={{
              filter: "grayscale(100%) contrast(125%)",
            }}
          />
          {/* Dithered overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.02]"
            style={{
              backgroundImage: "url('/images/textures/texture_bayer.png')",
              backgroundSize: "256px 256px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        {/* Hover tooltip */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
        >
          <div className="bg-[#111] border border-white/20 px-3 py-2 whitespace-nowrap">
            <p className="font-serif text-xs text-white">{book.title}</p>
            <p className="font-mono text-[10px] text-[#b7b7b7]">
              {book.author}
            </p>
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
}
