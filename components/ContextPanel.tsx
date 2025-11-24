import { ReactNode } from "react";

interface ContextPanelProps {
  children: ReactNode;
  title?: string;
}

export function ContextPanel({ children, title }: ContextPanelProps) {
  return (
    <aside className="w-80 border-l border-border bg-background overflow-y-auto dither grain relative">
      <div className="p-6">
        {title && (
          <div className="mb-6 border-b border-border pb-4">
            <h2 className="font-serif text-xl font-semibold engraved">{title}</h2>
          </div>
        )}
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </aside>
  );
}

