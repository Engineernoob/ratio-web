"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArchivvmItem } from "./ArchivvmItem";
import type { ArchivvmItem as ArchivvmItemType } from "@/lib/archivvm/types";

interface ArchivvmGridProps {
  items: ArchivvmItemType[];
  onItemClick: (item: ArchivvmItemType) => void;
}

export function ArchivvmGrid({ items, onItemClick }: ArchivvmGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              duration: 0.3,
              delay: index * 0.03,
            }}
          >
            <ArchivvmItem item={item} onClick={() => onItemClick(item)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
