"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FogPanelProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function FogPanel({
  children,
  className,
  onClick,
  hover = true,
}: FogPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={hover ? { y: -3, transition: { duration: 0.24 } } : {}}
      onClick={onClick}
      className={cn(
        "relative rounded-lg border border-border",
        "bg-gradient-to-br from-[rgba(255,255,255,0.07)] to-[rgba(255,255,255,0.02)]",
        "backdrop-blur-sm",
        "dither grain",
        "transition-all duration-240",
        hover && "cursor-pointer",
        hover && "hover:border-[rgba(255,255,255,0.12)]",
        hover && "hover:shadow-[0_0_40px_rgba(0,0,0,0.6)]",
        className
      )}
      style={{
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Dither texture overlay at 35% opacity */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-35"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

