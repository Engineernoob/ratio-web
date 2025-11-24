import { PlateHeader } from "@/components/PlateHeader";
import { BrutalistCard } from "@/components/BrutalistCard";
import { ContextPanel } from "@/components/ContextPanel";
import { Main } from "@/components/Main";

export default function OikosPage() {
  return (
    <>
      <Main>
        <PlateHeader 
          title="OIKOS" 
          subtitle="Daily Ritual & Lessons"
          plateNumber="I"
        />
        
        <div className="space-y-6">
          <BrutalistCard borderWidth="1.5" className="p-6">
            <div className="font-serif text-xl mb-4 engraved">Today's Lesson</div>
            <div className="font-mono text-sm space-y-2">
              <p>PLATE I: Introduction to Classical Logic</p>
              <p className="text-muted-foreground">
                Begin with the fundamental principles of deductive reasoning.
                Study the syllogism and its three parts: major premise, minor premise, conclusion.
              </p>
            </div>
          </BrutalistCard>

          <BrutalistCard borderWidth="1" className="p-6">
            <div className="font-serif text-lg mb-4 engraved">Upcoming Lessons</div>
            <div className="space-y-3 font-mono text-sm">
              <div className="border-b border-border pb-2">
                <div>PLATE II: The Art of Memory</div>
                <div className="text-muted-foreground text-xs">Scheduled for tomorrow</div>
              </div>
              <div className="border-b border-border pb-2">
                <div>PLATE III: Rhetorical Devices</div>
                <div className="text-muted-foreground text-xs">In 3 days</div>
              </div>
            </div>
          </BrutalistCard>
        </div>
      </Main>

      <ContextPanel title="Daily Ritual">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Next Lesson</div>
          <div className="font-mono text-xs">
            PLATE I: Classical Logic
          </div>
        </BrutalistCard>
        
        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Progress</div>
          <div className="font-mono text-xs space-y-1">
            <div>Completed: 0/12</div>
            <div>Current Streak: 0 days</div>
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}

