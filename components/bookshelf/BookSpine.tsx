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
  spineWidth?: "skinny" | "normal" | "thick";
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
  // Get width based on spineWidth from meta.json, default to "normal"
  const spineWidth = book.spineWidth || "normal";
  const widthMap = {
    skinny: "40px",
    normal: "55px",
    thick: "70px",
  };
  const width = widthMap[spineWidth];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        type: "spring",
        stiffness: 160,
      }}
      whileHover={{ y: -6, scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className="book-spine cursor-pointer focus:outline-none"
      style={{ width }}
      onClick={onClick}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-[#111] border border-white/10">
        <img
          src={encodeURI(book.spine)}
          alt=""
          className="w-full h-[240px] object-cover object-center"
          style={{
            filter: "grayscale(100%)",
          }}
          onError={(e) => {
            console.error("Failed to load spine image:", book.spine);
            (e.target as HTMLImageElement).style.display = "none";
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
    </motion.div>
  );
}
