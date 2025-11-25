"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FogPanelProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  delay?: number;
}

export function FogPanel({
  children,
  className,
  onClick,
  hover = true,
  delay = 0,
}: FogPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -3, transition: { duration: 0.24 } } : {}}
      onClick={onClick}
      className={cn(
        "relative rounded-lg border border-border",
        "bg-gradient-to-br from-fogwhite to-transparent",
        "backdrop-blur-sm",
        "transition-all duration-300",
        hover && "cursor-pointer",
        hover && "hover:border-[rgba(255,255,255,0.12)]",
        hover && "hover:shadow-stone",
        className
      )}
      style={{
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Dither texture overlay */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-35"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />
      
      {/* Fog gradient overlay */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

