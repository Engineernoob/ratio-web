import Image from "next/image";
import { cn } from "@/lib/utils";

interface DitherImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function DitherImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className 
}: DitherImageProps) {
  return (
    <div className={cn("relative dither grain overflow-hidden border border-border", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
      />
    </div>
  );
}

