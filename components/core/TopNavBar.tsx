"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "RATIO", path: "/" },
  { label: "OIKOS", path: "/oikos" },
  { label: "BIBLIOTHECA", path: "/bibliotheca" },
  { label: "LABORATORIVM", path: "/laboratorivm" },
  { label: "MEMORIA", path: "/memoria" },
  { label: "ARCHIVVM", path: "/archivvm" },
  { label: "SCHOLARIUM", path: "/scholarivm" },
  { label: "ARS RATIONIS", path: "/ars-rationis" },
];

export function TopNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e0e] border-b border-[#1a1a1a]">
      <div className="max-w-[1920px] mx-auto px-8 py-4">
        <div className="flex items-center gap-8">
          {navItems.map((item, index) => {
            const isActive = pathname === item.path || (item.path === "/" && pathname === "/oikos");
            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={item.path === "/" ? "/oikos" : item.path}
                  className={cn(
                    "font-sans text-sm uppercase tracking-wider transition-colors",
                    isActive
                      ? "text-white font-semibold"
                      : "text-[#888888] hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

