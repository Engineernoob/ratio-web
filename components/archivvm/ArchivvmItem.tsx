"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { ArchivvmItem } from "@/lib/archivvm/types";

interface ArchivvmItemProps {
  item: ArchivvmItem;
  onClick: () => void;
}

export function ArchivvmItem({ item, onClick }: ArchivvmItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const truncateText = (text?: string, maxLength = 120) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="cursor-pointer"
      animate={{
        scale: isHovered ? 1.01 : 1,
        y: isHovered ? -2 : 0,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="relative p-4 h-full"
        style={{
          border: `1px solid ${
            isHovered ? "rgba(200, 182, 141, 0.3)" : "rgba(200, 182, 141, 0.1)"
          }`,
          background: isHovered
            ? "rgba(200, 182, 141, 0.05)"
            : "rgba(10, 10, 10, 0.6)",
          borderRadius: "4px",
        }}
      >
        {/* Hover Glow */}
        <motion.div
          className="absolute inset-0 rounded"
          style={{
            background: "rgba(200, 182, 141, 0.1)",
            boxShadow: isHovered ? "0 0 20px rgba(200, 182, 141, 0.2)" : "none",
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Content */}
        <div className="relative z-10 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3
                className="font-serif text-sm mb-1 truncate"
                style={{ color: "#C8B68D" }}
              >
                {item.title || item.summary || truncateText(item.text, 50)}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="font-mono text-xs px-2 py-0.5"
                  style={{
                    color: "rgba(200, 182, 141, 0.6)",
                    background: "rgba(200, 182, 141, 0.1)",
                    borderRadius: "2px",
                  }}
                >
                  {getTypeLabel(item.type)}
                </span>
                {item.page && (
                  <span
                    className="font-mono text-xs opacity-50"
                    style={{ color: "#C8B68D" }}
                  >
                    p.{item.page}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Text Preview */}
          {(item.text || item.summary) && (
            <p
              className="font-mono text-xs leading-relaxed line-clamp-3"
              style={{ color: "rgba(200, 182, 141, 0.7)" }}
            >
              {truncateText(item.text || item.summary)}
            </p>
          )}

          {/* Metadata */}
          <div
            className="flex items-center justify-between pt-2 border-t"
            style={{ borderColor: "rgba(200, 182, 141, 0.1)" }}
          >
            <div
              className="font-mono text-xs opacity-50"
              style={{ color: "#C8B68D" }}
            >
              {item.bookId}
              {item.chapterId && ` • ${item.chapterId}`}
            </div>
            <div
              className="font-mono text-xs opacity-40"
              style={{ color: "#C8B68D" }}
            >
              {formatDate(item.createdAt)}
            </div>
          </div>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs px-1.5 py-0.5"
                  style={{
                    color: "rgba(200, 182, 141, 0.5)",
                    background: "rgba(200, 182, 141, 0.05)",
                    borderRadius: "2px",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
