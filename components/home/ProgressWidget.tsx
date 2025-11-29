"use client";

import { motion } from "framer-motion";

interface ProgressItem {
  label: string;
  value: number;
  max: number;
}

interface ProgressWidgetProps {
  items: ProgressItem[];
}

export function ProgressWidget({ items }: ProgressWidgetProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="text-right"
    >
      <h3 className="font-mono text-xs text-[#888888] mb-4 tracking-wide uppercase">
        Today's Progress
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => {
          const percentage = Math.min((item.value / item.max) * 100, 100);
          return (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-end items-center gap-3">
                <span className="font-mono text-xs text-[#888888]">
                  {item.value}/{item.max}
                </span>
                <span className="font-mono text-xs text-[#e8e6e1]">
                  {item.label}
                </span>
              </div>
              <div className="relative h-0.5 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden w-32 ml-auto">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="h-full rounded-full"
                  style={{
                    background: "#c8b68d",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
