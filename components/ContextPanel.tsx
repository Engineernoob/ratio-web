"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContextPanelProps {
  children: ReactNode;
  title?: string;
}

export function ContextPanel({ children, title }: ContextPanelProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-80 border-l border-border bg-background/50 backdrop-blur-sm overflow-y-auto dither grain relative"
      style={{
        background: "linear-gradient(to bottom right, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
      }}
    >
      <div className="p-6">
        {title && (
          <div className="mb-6 border-b border-border pb-4">
            <h2 className="font-serif text-xl font-semibold engraved engrave">
              {title}
            </h2>
          </div>
        )}
        <div className="space-y-6">{children}</div>
      </div>
    </motion.aside>
  );
}
