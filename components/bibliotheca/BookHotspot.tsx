"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { BookData } from "./Bookshelf";

interface BookHotspotProps {
  book: BookData;
  isZoomed: boolean;
  onClick: () => void;
}

export function BookHotspot({ book, isZoomed, onClick }: BookHotspotProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: `${book.x}px`,
        top: `${book.y}px`,
        width: `${book.width}px`,
        height: `${book.height}px`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      animate={{
        x: isZoomed ? 12 : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      {/* Hover Glow - Amber highlight */}
      <motion.div
        className="absolute inset-0 rounded-sm"
        style={{
          background: isHovered
            ? "linear-gradient(to right, rgba(200, 182, 141, 0.1) 0%, rgba(200, 182, 141, 0.05) 100%)"
            : "transparent",
          boxShadow: isHovered
            ? "inset 0 0 20px rgba(200, 182, 141, 0.15), 0 0 15px rgba(200, 182, 141, 0.1)"
            : "none",
          border: isHovered
            ? "1px solid rgba(200, 182, 141, 0.2)"
            : "1px solid transparent",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Pull-out animation overlay */}
      {isZoomed && (
        <motion.div
          className="absolute inset-0 rounded-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            background:
              "linear-gradient(to right, rgba(200, 182, 141, 0.2) 0%, rgba(200, 182, 141, 0.1) 100%)",
            boxShadow:
              "inset 0 0 30px rgba(200, 182, 141, 0.25), 0 0 25px rgba(200, 182, 141, 0.2)",
            border: "2px solid rgba(200, 182, 141, 0.4)",
          }}
        />
      )}
    </motion.div>
  );
}
