"use client";

import { motion } from "framer-motion";

interface ContinuumProps {
  items: Array<{
    id: string;
    label: string;
  }>;
  activeId?: string;
  onItemClick?: (id: string) => void;
}

export function Continuum({ items, activeId, onItemClick }: ContinuumProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {items.map((item, index) => (
        <div key={item.id} className="flex items-center">
          <button
            onClick={() => onItemClick?.(item.id)}
            className={`font-mono text-sm transition-all ${
              activeId === item.id
                ? "text-white underline"
                : "text-[#b7b7b7] hover:text-white"
            }`}
          >
            {item.label}
          </button>
          {index < items.length - 1 && (
            <span className="mx-2 text-[#b7b7b7] font-mono text-sm">•</span>
          )}
        </div>
      ))}
    </div>
  );
}
