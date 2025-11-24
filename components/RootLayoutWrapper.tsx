"use client";

import { usePathname } from "next/navigation";
import { SideNav } from "./SideNav";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthRoute = pathname?.startsWith("/login") || pathname?.startsWith("/onboarding");

  if (isAuthRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex-1 flex ml-64 min-w-0">
        {children}
      </div>
    </div>
  );
}

