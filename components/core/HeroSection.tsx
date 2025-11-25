"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  lectioCount?: number;
  ritusCount?: number;
  memoriaCount?: number;
  className?: string;
}

export function HeroSection({
  lectioCount = 3,
  ritusCount = 2,
  memoriaCount = 7,
  className,
}: HeroSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn("mb-12", className)}
    >
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-[#d4af37] mb-4 tracking-tight">
        SALVE, SCHOLAR
      </h1>
      
      <p className="font-sans text-sm text-[#888888] mb-8 uppercase tracking-wider">
        INITIUM SAPIENTIAE EST COGNITIO SUI
      </p>

      <div className="flex flex-wrap items-center gap-6 font-mono text-xs text-[#cccccc] uppercase tracking-wider">
        <div className="flex items-center gap-2">
          <span className="text-[#888888]">LECTIO</span>
          <span className="text-[#888888]">•</span>
          <span>{lectioCount} TEXTVS</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#888888]">RITVS</span>
          <span className="text-[#888888]">•</span>
          <span>{ritusCount} EXERCITIA</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#888888]">MEMORIA</span>
          <span className="text-[#888888]">•</span>
          <span>{memoriaCount} REVISIONES</span>
        </div>
      </div>
    </motion.div>
  );
}

