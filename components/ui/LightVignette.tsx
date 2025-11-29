"use client";

import { motion } from "framer-motion";

interface LightVignetteProps {
  intensity?: number;
  className?: string;
}

export function LightVignette({
  intensity = 0.2,
  className = "",
}: LightVignetteProps) {
  const vignetteStrength =
    typeof window !== "undefined"
      ? parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--texture-vignette"
          ) || intensity.toString()
        )
      : intensity;

  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, 
          color-mix(in srgb, var(--accent) calc(${vignetteStrength} * 100%), transparent) 0%, 
          color-mix(in srgb, var(--accent) calc(${vignetteStrength} * 50%), transparent) 30%, 
          transparent 70%)`,
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
