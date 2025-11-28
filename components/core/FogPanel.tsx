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
        "relative rounded-lg border",
        "backdrop-blur-sm",
        "transition-all duration-300",
        hover && "cursor-pointer",
        hover && "hover:border-[rgba(255,255,255,0.12)]",
        hover && "hover:shadow-stone",
        className
      )}
      style={{
        background: "rgba(0, 0, 0, 0.35)",
        backdropFilter: "blur(1px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow:
          "0 0 25px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
