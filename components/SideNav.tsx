"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PixelIcon } from "./PixelIcon";

const navItems = [
  { label: "OIKOS", path: "/oikos", icon: "home" },
  { label: "BIBLIOTHECA", path: "/bibliotheca", icon: "book" },
  { label: "LABORATORIVM", path: "/laboratorivm", icon: "lab" },
  { label: "MEMORIA", path: "/memoria", icon: "memory" },
  { label: "ARCHIVVM", path: "/archivvm", icon: "archive" },
  { label: "SCHOLARIUM", path: "/scholarivm", icon: "scholar" },
  { label: "ARS RATIONIS", path: "/ars-rationis", icon: "tool" },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background z-50 flex flex-col grain">
      {/* Vertical grain texture behind nav */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "overlay",
        }}
      />

      {/* RATIO Monogram */}
      <div className="p-6 border-b border-border relative z-10">
        <div className="font-serif text-2xl font-bold tracking-wider engraved">
          RATIO
        </div>
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          SCHOLARLY OS
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 relative z-10">
        {navItems.map((item, index) => {
          const isActive = pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                href={item.path}
                className={cn(
                  "flex items-center gap-3 py-3 px-8 border-b border-border transition-all duration-240 relative group",
                  isActive
                    ? "bg-[rgba(255,255,255,0.08)] text-foreground brightness-110"
                    : "text-muted-foreground hover:text-foreground hover:bg-[rgba(255,255,255,0.03)] hover:translate-x-[2px] hover:brightness-105"
                )}
              >
                {/* Active left glow border */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute left-0 top-0 bottom-0 w-[1px] bg-[rgba(255,255,255,0.2)]"
                  />
                )}

                <PixelIcon name={item.icon} className="w-5 h-5" />
                <span className="font-mono text-sm tracking-wide">
                  {item.label}
                </span>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </nav>
  );
}
