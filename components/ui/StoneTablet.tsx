"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StoneTabletProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  delay?: number;
}

export function StoneTablet({
  children,
  title,
  subtitle,
  className,
  delay = 0,
}: StoneTabletProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={cn("stone-tablet", className)}
    >
      <div className="relative p-8">
        {/* Engraved Title */}
        <div className="mb-4">
          <h3 className="font-serif text-xl uppercase tracking-[0.15em] engraved-text mb-2">
            {title}
          </h3>
          {subtitle && (
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}

