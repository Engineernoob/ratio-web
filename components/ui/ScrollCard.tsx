"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollCard({
  children,
  className,
  delay = 0,
}: ScrollCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      whileInView={{ opacity: 1, height: "auto" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className={cn("scroll-card", className)}
    >
      <div className="parchment-mask">
        <div className="relative p-6">{children}</div>
      </div>
    </motion.div>
  );
}

