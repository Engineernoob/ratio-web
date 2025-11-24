import { PlateHeader } from "@/components/PlateHeader";
import { BookPlate } from "@/components/BookPlate";
import { ContextPanel } from "@/components/ContextPanel";
import { BrutalistCard } from "@/components/BrutalistCard";
import { Main } from "@/components/Main";

export default function BibliothecaPage() {
  return (
    <>
      <Main>
        <PlateHeader 
          title="BIBLIOTHECA" 
          subtitle="Library of Knowledge"
          plateNumber="II"
        />
        
        <div className="space-y-6">
          <BookPlate
            title="The Art of Memory"
            author="Frances A. Yates"
            year={1966}
            description="A comprehensive study of mnemonic techniques from classical antiquity through the Renaissance. Explores the method of loci and its application in scholarly practice."
            themes={["Memory", "Renaissance", "Classical"]}
          />

          <BookPlate
            title="Rhetoric"
            author="Aristotle"
            year={-350}
            description="The foundational text on the art of persuasion. Three books covering ethos, pathos, and logos as the pillars of effective communication."
            themes={["Rhetoric", "Classical", "Philosophy"]}
          />

          <BookPlate
            title="The Organon"
            author="Aristotle"
            year={-350}
            description="The collection of logical works that established the foundation of Western logic. Includes Categories, On Interpretation, Prior Analytics, and Posterior Analytics."
            themes={["Logic", "Classical", "Philosophy"]}
          />
        </div>
      </Main>

      <ContextPanel title="Author Bio">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Selected Author</div>
          <div className="font-mono text-xs space-y-2">
            <div className="font-semibold">Aristotle</div>
            <div className="text-muted-foreground">
              Classical Greek philosopher (384-322 BCE). Student of Plato, teacher of Alexander the Great. 
              Founded the Peripatetic school of philosophy. Works span logic, metaphysics, ethics, politics, and natural sciences.
            </div>
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Themes</div>
          <div className="font-mono text-xs space-y-1">
            <div>• Logic</div>
            <div>• Classical</div>
            <div>• Philosophy</div>
            <div>• Rhetoric</div>
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}

