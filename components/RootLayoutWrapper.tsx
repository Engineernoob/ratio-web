"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOikosPage = pathname === "/oikos";
  const isMemoriaPage = pathname === "/memoria";

  // OIKOS and MEMORIA pages have their own layout with TopNavBar
  if (isOikosPage || isMemoriaPage) {
    return <>{children}</>;
  }

  return (
    <>
      {/* Global Dither Overlay - now handled by body::before in globals.css */}

      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex min-w-0 overflow-y-auto">
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
