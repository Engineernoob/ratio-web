"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { PixelIcon } from "./PixelIcon";

const navItems = [
  { label: "OIKOS", path: "/oikos", icon: "home" },
  { label: "BIBLIOTHECA", path: "/bibliotheca", icon: "book" },
  { label: "LABORATORIVM", path: "/laboratorivm", icon: "lab" },
  { label: "MEMORIA", path: "/memoria", icon: "memory" },
  { label: "ARCHIVVM", path: "/archivvm", icon: "archive" },
  { label: "SCHOLARIUM", path: "/scholarivm", icon: "scholar" },
  { label: "ARS RATIONIS", path: "/ars-rationis", icon: "tool" },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 border-r border-border bg-background z-50 flex flex-col">
      {/* RATIO Monogram */}
      <div className="p-6 border-b border-border">
        <div className="font-serif text-2xl font-bold tracking-wider engraved">
          RATIO
        </div>
        <div className="text-xs text-muted-foreground mt-1 font-mono">
          SCHOLARLY OS
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "flex items-center gap-3 px-6 py-3 border-b border-border transition-colors relative",
                isActive
                  ? "bg-secondary text-foreground"
                  : "hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-accent" />
              )}
              <PixelIcon name={item.icon} className="w-5 h-5" />
              <span className="font-mono text-sm tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

