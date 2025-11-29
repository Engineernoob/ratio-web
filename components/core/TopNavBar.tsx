"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[rgba(14,14,14,0.8)] border-b border-[rgba(255,255,255,0.03)]">
        <div className="max-w-[1920px] mx-auto px-6 md:px-12 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/oikos"
              className="font-serif text-lg text-[#e8e6e1] hover:text-[#c8b68d] transition-colors tracking-wide"
            >
              RATIO
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.slice(1).map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="relative font-serif text-sm text-[#888888] hover:text-[#e8e6e1] transition-colors tracking-wide"
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-underline"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-[#c8b68d]"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#888888] hover:text-[#e8e6e1] transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-64 bg-[#0e0e0e] border-l border-[rgba(255,255,255,0.05)] z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link
                    href="/oikos"
                    className="font-serif text-lg text-[#e8e6e1] tracking-wide"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    RATIO
                  </Link>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-[#888888] hover:text-[#e8e6e1] transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {navItems.slice(1).map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block font-serif text-sm tracking-wide transition-colors ${
                          isActive
                            ? "text-[#c8b68d]"
                            : "text-[#888888] hover:text-[#e8e6e1]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
