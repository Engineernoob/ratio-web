import { PlateHeader } from "@/components/core/PlateHeader";
import { BrutalistCard } from "@/components/BrutalistCard";
import { ContextPanel } from "@/components/core/ContextPanel";
import { Main } from "@/components/Main";

const completedItems = [
  { id: "1", title: "Classical Logic Fundamentals", date: "2024-01-15", status: "completed" },
  { id: "2", title: "Syllogism Construction", date: "2024-01-20", status: "completed" },
  { id: "3", title: "Fallacy Detection", date: "2024-01-25", status: "completed" },
  { id: "4", title: "Rhetorical Devices", date: "2024-02-01", status: "completed" },
];

export default function ArchivvmPage() {
  return (
    <>
      <Main>
        <PlateHeader 
          title="ARCHIVVM" 
          subtitle="Completed Knowledge Ledger"
          plateNumber="V"
        />
        
        <div className="space-y-4">
          {completedItems.map((item) => (
            <BrutalistCard key={item.id} borderWidth="1" className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div className="font-serif text-lg engraved">{item.title}</div>
                <div className="font-mono text-xs text-muted-foreground">{item.date}</div>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                Status: {item.status.toUpperCase()}
              </div>
            </BrutalistCard>
          ))}
        </div>
      </Main>

      <ContextPanel title="Archive Statistics">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Total Completed</div>
          <div className="font-mono text-2xl">{completedItems.length}</div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">This Month</div>
          <div className="font-mono text-sm">
            {completedItems.filter(item => item.date.startsWith("2024-02")).length} items
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Categories</div>
          <div className="font-mono text-xs space-y-1">
            <div>• Logic: 2</div>
            <div>• Rhetoric: 1</div>
            <div>• Analysis: 1</div>
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}

