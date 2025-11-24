import { PlateHeader } from "@/components/PlateHeader";
import { MemoryGrid } from "@/components/MemoryGrid";
import { ContextPanel } from "@/components/ContextPanel";
import { BrutalistCard } from "@/components/BrutalistCard";
import { Main } from "@/components/Main";

const memoryCells = [
  { id: "1", title: "Syllogism", retention: 85, lastReview: new Date() },
  { id: "2", title: "Fallacies", retention: 72, lastReview: new Date() },
  { id: "3", title: "Rhetoric", retention: 60, lastReview: new Date() },
  { id: "4", title: "Memory", retention: 45, lastReview: new Date() },
  { id: "5", title: "Logic", retention: 90, lastReview: new Date() },
  { id: "6", title: "Ethos", retention: 55, lastReview: new Date() },
  { id: "7", title: "Pathos", retention: 50, lastReview: new Date() },
  { id: "8", title: "Logos", retention: 65, lastReview: new Date() },
  { id: "9", title: "Loci", retention: 40, lastReview: new Date() },
  { id: "10", title: "Mnemonics", retention: 35, lastReview: new Date() },
  { id: "11", title: "Dialectic", retention: 70, lastReview: new Date() },
  { id: "12", title: "Sophistry", retention: 30, lastReview: new Date() },
];

export default function MemoriaPage() {
  return (
    <>
      <Main>
        <PlateHeader 
          title="MEMORIA" 
          subtitle="Retention Mosaic Grid"
          plateNumber="IV"
        />
        
        <div className="mb-6">
          <div className="font-mono text-sm text-muted-foreground mb-4">
            Retention levels: Darker = stronger memory. Review items below 60%.
          </div>
          <MemoryGrid cells={memoryCells} />
        </div>
      </Main>

      <ContextPanel title="Review Schedule">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Due Today</div>
          <div className="font-mono text-xs space-y-1">
            <div>• Memory (45%)</div>
            <div>• Mnemonics (35%)</div>
            <div>• Sophistry (30%)</div>
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Due Tomorrow</div>
          <div className="font-mono text-xs space-y-1">
            <div>• Loci (40%)</div>
            <div>• Ethos (55%)</div>
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Statistics</div>
          <div className="font-mono text-xs space-y-1">
            <div>Average Retention: 55%</div>
            <div>Strong Memories: 3</div>
            <div>Needs Review: 9</div>
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}

