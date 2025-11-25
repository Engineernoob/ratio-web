"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function PageHeader() {
  const pathname = usePathname();

  return (
    <div className="w-full mb-12">
      {/* Navigation Bar */}
      <div className="w-full border-b border-[rgba(255,255,255,0.08)] pb-3 mb-8">
        <div className="flex items-center justify-between font-mono text-xs text-[rgba(232,230,225,0.6)]">
          <div className="flex items-center gap-4">
            <Link
              href="/oikos"
              className="hover:text-[rgba(232,230,225,0.9)] transition-colors"
            >
              RATIO
            </Link>
            <span>•</span>
            <Link
              href="/oikos"
              className="hover:text-[rgba(232,230,225,0.9)] transition-colors"
            >
              OIKOS
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/oikos"
              className={cn(
                "transition-colors",
                pathname === "/oikos" && "text-[#d4af37]"
              )}
            >
              OIKOS
            </Link>
            <Link
              href="/bibliotheca"
              className={cn(
                "transition-colors relative",
                pathname === "/bibliotheca" && "text-[#d4af37]"
              )}
            >
              BIBLIOTHECA
              {pathname === "/bibliotheca" && (
                <span className="absolute -bottom-1 left-0 right-0 h-px bg-[#d4af37] opacity-60" />
              )}
            </Link>
            <Link
              href="/laboratorivm"
              className={cn(
                "transition-colors",
                pathname === "/laboratorivm" && "text-[#d4af37]"
              )}
            >
              LABORATORIVM
            </Link>
            <Link
              href="/memoria"
              className={cn(
                "transition-colors",
                pathname === "/memoria" && "text-[#d4af37]"
              )}
            >
              MEMORIA
            </Link>
            <Link
              href="/archivvm"
              className={cn(
                "transition-colors",
                pathname === "/archivvm" && "text-[#d4af37]"
              )}
            >
              ARCHIVVM
            </Link>
            <Link
              href="/scholarivm"
              className={cn(
                "transition-colors",
                pathname === "/scholarivm" && "text-[#d4af37]"
              )}
            >
              SCHOLARIVM
            </Link>
            <Link
              href="/ars-rationis"
              className={cn(
                "transition-colors",
                pathname === "/ars-rationis" && "text-[#d4af37]"
              )}
            >
              ARS RATIONIS
            </Link>
          </div>
        </div>
      </div>

      {/* Main Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <h1
          className="font-serif text-[64px] font-normal tracking-[0.08em] uppercase mb-4 engraved-text"
          style={{
            textShadow:
              "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.1), 0 0 20px rgba(232, 230, 225, 0.2)",
          }}
        >
          BIBLIOTHECA
        </h1>
        <p className="font-serif text-lg text-[rgba(232,230,225,0.7)] mb-3 tracking-wide">
          TABVLARIVM SAPIENTIAE
        </p>
        <p className="font-mono text-xs text-[rgba(232,230,225,0.5)]">
          SCROLL RACKS • COSMOLOGICAL INDEX • MICRO-LESSONS
        </p>
      </motion.div>
    </div>
  );
}
