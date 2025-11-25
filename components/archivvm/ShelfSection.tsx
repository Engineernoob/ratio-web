"use client";

import { ReactNode, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShelfSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function ShelfSection({
  title,
  subtitle,
  children,
  defaultOpen = true,
  className,
}: ShelfSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("mb-8", className)}>
      {/* Section header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <h2 className="font-mono text-xs uppercase tracking-wider text-[rgba(215,196,158,0.8)]">
          {title}
          {subtitle && ` ‣ ${subtitle}`}
        </h2>
        <span className="font-mono text-xs text-[rgba(215,196,158,0.6)]">
          {isOpen ? "▼" : "▶"}
        </span>
      </button>

      {/* Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
