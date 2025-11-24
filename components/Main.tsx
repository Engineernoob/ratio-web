import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

export function Main({ children }: MainProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-background dither grain relative">
      <div className="p-8 max-w-6xl mx-auto">
        {children}
      </div>
    </main>
  );
}

