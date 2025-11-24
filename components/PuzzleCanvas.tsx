"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { BrutalistCard } from "./BrutalistCard";

interface PuzzleCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export function PuzzleCanvas({ 
  width = 600, 
  height = 400,
  className 
}: PuzzleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
    }
  }, [width, height]);

  const handleMouseDown = () => {
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x - 2, y - 2, 4, 4);
    }
  };

  return (
    <BrutalistCard className={cn("p-4", className)} borderWidth="1.5">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="w-full h-auto border border-border bg-background cursor-crosshair"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
      />
    </BrutalistCard>
  );
}

