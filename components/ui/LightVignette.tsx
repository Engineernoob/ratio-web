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
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, 
          rgba(200, 182, 141, ${intensity}) 0%, 
          rgba(200, 182, 141, ${intensity * 0.5}) 30%, 
          transparent 70%)`,
        zIndex: 1,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  );
}
