"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { SideNav } from "./SideNav";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/onboarding");

  if (isAuthRoute) {
    return (
      <>
        <div className="dither-overlay" />
        {children}
      </>
    );
  }

  return (
    <>
      {/* Global Dither Overlay */}
      <div className="dither-overlay" />
      
      <div className="flex h-screen overflow-hidden">
        <SideNav />
        <div className="flex-1 flex ml-64 min-w-0 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
