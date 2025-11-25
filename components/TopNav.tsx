"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "OIKOS", path: "/oikos" },
  { label: "LECTIO", path: "/lectio" },
  { label: "RITUAL", path: "/ritual" },
  { label: "MEMORIA", path: "/memoria" },
  { label: "BIBLIOTHECA", path: "/bibliotheca" },
  { label: "ARS RATIONIS", path: "/ars-rationis" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center"
    >
      <div
        className="mt-6 px-8 py-4 rounded-lg"
        style={{
          background: "rgba(0, 0, 0, 0.45)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="flex items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={item.path}
                  className={cn(
                    "relative font-serif text-sm uppercase tracking-[0.15em] transition-all duration-300",
                    isActive
                      ? "text-[#f5f5dc]"
                      : "text-[rgba(255,255,255,0.6)] hover:text-[#f5f5dc]"
                  )}
                >
                  {item.label}
                  {/* Hover underline */}
                  <motion.div
                    className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-[#f5f5dc]"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      boxShadow: isActive
                        ? "0 0 8px rgba(245, 245, 220, 0.4)"
                        : "none",
                    }}
                  />
                  {/* Active glow */}
                  {isActive && (
                    <motion.div
                      className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-[#f5f5dc]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{
                        boxShadow: "0 0 8px rgba(245, 245, 220, 0.4)",
                      }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}

