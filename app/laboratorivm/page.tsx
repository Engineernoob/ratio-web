import { PlateHeader } from "@/components/PlateHeader";
import { PuzzleCanvas } from "@/components/PuzzleCanvas";
import { BrutalistCard } from "@/components/BrutalistCard";
import { ContextPanel } from "@/components/ContextPanel";
import { OrangeAction } from "@/components/OrangeAction";
import { Main } from "@/components/Main";

export default function LaboratorivmPage() {
  return (
    <>
      <Main>
        <PlateHeader 
          title="LABORATORIVM" 
          subtitle="Interactive Logic Puzzles"
          plateNumber="III"
        />
        
        <div className="space-y-6">
          <BrutalistCard borderWidth="1.5" className="p-6">
            <div className="font-serif text-lg mb-4 engraved">Puzzle: Syllogism Construction</div>
            <div className="font-mono text-sm mb-4">
              Construct a valid syllogism using the given premises. Draw connections between terms.
            </div>
            <PuzzleCanvas width={800} height={400} />
          </BrutalistCard>

          <BrutalistCard borderWidth="1" className="p-6">
            <div className="font-serif text-lg mb-4 engraved">Available Puzzles</div>
            <div className="grid grid-cols-3 gap-4">
              <OrangeAction active>Syllogism</OrangeAction>
              <OrangeAction>Fallacy Detection</OrangeAction>
              <OrangeAction>Logical Forms</OrangeAction>
            </div>
          </BrutalistCard>
        </div>
      </Main>

      <ContextPanel title="Hints & Logic Notes">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Current Step</div>
          <div className="font-mono text-xs">
            Step 1: Identify the major term (predicate of conclusion)
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Logic Notes</div>
          <div className="font-mono text-xs space-y-2">
            <div>• Major premise contains major term</div>
            <div>• Minor premise contains minor term</div>
            <div>• Middle term appears in both premises</div>
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Hint</div>
          <div className="font-mono text-xs text-muted-foreground">
            The conclusion's predicate is your major term. Find the premise that contains it.
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}

