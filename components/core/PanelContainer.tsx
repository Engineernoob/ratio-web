"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PanelContainerProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PanelContainer({
  children,
  className,
  delay = 0,
}: PanelContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{
        filter: "brightness(1.02)",
        transition: { duration: 0.2 },
      }}
      className={cn(
        "relative border border-[rgba(255,255,255,0.08)]",
        "bg-[#0A0A0A]",
        "transition-all duration-300",
        className
      )}
      style={{
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
      }}
    >
      {/* Faint noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
