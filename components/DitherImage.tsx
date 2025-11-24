import Image from "next/image";
import { cn } from "@/lib/utils";

interface DitherImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export function DitherImage({ 
  src, 
  alt, 
  width = 800, 
  height = 600,
  className,
  priority = false
}: DitherImageProps) {
  return (
    <div className={cn("relative dither grain engraving-image overflow-hidden border border-border", className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto engraving-filter"
        priority={priority}
      />
    </div>
  );
}

