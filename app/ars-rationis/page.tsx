import { PlateHeader } from "@/components/core/PlateHeader";
import { BrutalistCard } from "@/components/BrutalistCard";
import { ContextPanel } from "@/components/core/ContextPanel";
import { Main } from "@/components/Main";

const tools = [
  {
    id: "1",
    name: "Syllogism Builder",
    description: "Construct valid categorical syllogisms with visual term mapping",
    category: "Logic",
  },
  {
    id: "2",
    name: "Fallacy Detector",
    description: "Identify and classify logical fallacies in arguments",
    category: "Analysis",
  },
  {
    id: "3",
    name: "Memory Palace",
    description: "Create and navigate mnemonic loci for information storage",
    category: "Memory",
  },
  {
    id: "4",
    name: "Rhetoric Analyzer",
    description: "Deconstruct persuasive techniques and rhetorical devices",
    category: "Rhetoric",
  },
];

export default function ArsRationisPage() {
  return (
    <>
      <Main>
        <PlateHeader 
          title="ARS RATIONIS" 
          subtitle="Tools of Reason"
          plateNumber="VII"
        />
        
        <div className="space-y-4">
          {tools.map((tool) => (
            <BrutalistCard key={tool.id} borderWidth="1.5" className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-serif text-xl engraved mb-1">{tool.name}</div>
                  <div className="font-mono text-xs text-muted-foreground">
                    {tool.category}
                  </div>
                </div>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                {tool.description}
              </div>
            </BrutalistCard>
          ))}
        </div>
      </Main>

      <ContextPanel title="Tool Descriptions">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Selected Tool</div>
          <div className="font-mono text-xs">
            Select a tool from the main panel to view detailed instructions and usage guidelines.
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Categories</div>
          <div className="font-mono text-xs space-y-1">
            <div>• Logic</div>
            <div>• Analysis</div>
            <div>• Memory</div>
            <div>• Rhetoric</div>
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Usage</div>
          <div className="font-mono text-xs text-muted-foreground">
            Each tool is designed to enhance your scholarly practice. Access tools from their respective sections in the navigation.
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}

