"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopNavBar } from "@/components/core/TopNavBar";
import { useTheme } from "@/context/ThemeContext";
import { getAllThemes } from "@/lib/theme";
import { ThemePreviewCard } from "@/components/theme/ThemePreviewCard";
import { Main } from "@/components/Main";

export default function AppearancePage() {
  const { currentTheme, setTheme } = useTheme();
  const themes = getAllThemes();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleThemeChange = (themeId: string) => {
    if (themeId === currentTheme.id) return;

    setIsTransitioning(true);
    setTheme(themeId as any);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
  };

  return (
    <>
      <TopNavBar />
      <Main>
        <div className="relative min-h-screen p-8">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1
              className="font-serif text-5xl mb-3"
              style={{
                color: "var(--accent)",
                textShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
              }}
            >
              VARIAE AURAE
            </h1>
            <p
              className="font-mono text-sm opacity-60"
              style={{ color: "var(--accent)" }}
            >
              Choose Your Aura
            </p>
          </motion.div>

          {/* Transition Overlay */}
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="fixed inset-0 z-50 pointer-events-none"
                style={{
                  background: "var(--background)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* Theme Grid */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <ThemePreviewCard
                    theme={theme}
                    isSelected={currentTheme.id === theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Current Theme Info */}
          <motion.div
            className="max-w-2xl mx-auto mt-12 p-6 rounded-lg"
            style={{
              background: "rgba(10, 10, 10, 0.7)",
              border: "1px solid rgba(200, 182, 141, 0.2)",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2
              className="font-serif text-xl mb-4"
              style={{ color: "var(--accent)" }}
            >
              Current Theme: {currentTheme.name}
            </h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs opacity-60"
                  style={{ color: "var(--accent)" }}
                >
                  Accent Color
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-6 h-6 rounded"
                    style={{ background: currentTheme.accent }}
                  />
                  <span
                    className="font-mono text-xs"
                    style={{ color: "var(--accent)" }}
                  >
                    {currentTheme.accent}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs opacity-60"
                  style={{ color: "var(--accent)" }}
                >
                  Ambient Particles
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  {currentTheme.ambientParticleType}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-xs opacity-60"
                  style={{ color: "var(--accent)" }}
                >
                  Vignette Strength
                </span>
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--accent)" }}
                >
                  {currentTheme.vignetteStrength}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </Main>
    </>
  );
}
