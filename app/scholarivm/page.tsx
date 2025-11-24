import { PlateHeader } from "@/components/PlateHeader";
import { ScholarSlab } from "@/components/ScholarSlab";
import { ContextPanel } from "@/components/ContextPanel";
import { BrutalistCard } from "@/components/BrutalistCard";
import { Main } from "@/components/Main";

const achievements = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first lesson",
    unlocked: true,
  },
  {
    id: "2",
    title: "Dedicated Scholar",
    description: "Complete 10 lessons",
    unlocked: true,
  },
  {
    id: "3",
    title: "Master Logician",
    description: "Complete all logic puzzles",
    unlocked: false,
  },
  {
    id: "4",
    title: "Memory Keeper",
    description: "Maintain 80%+ retention on 20 items",
    unlocked: false,
  },
];

const stats = {
  "Lessons Completed": 12,
  "Puzzles Solved": 8,
  "Books Read": 3,
  "Memory Items": 12,
  "Current Streak": 5,
};

export default function ScholarivmPage() {
  return (
    <>
      <Main>
        <PlateHeader 
          title="SCHOLARIUM" 
          subtitle="Scholar Dossier"
          plateNumber="VI"
        />
        
        <ScholarSlab
          name="Scholar"
          level={3}
          achievements={achievements}
          stats={stats}
        />
      </Main>

      <ContextPanel title="Achievements">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Unlocked</div>
          <div className="font-mono text-xs space-y-2">
            {achievements
              .filter(a => a.unlocked)
              .map(achievement => (
                <div key={achievement.id} className="border border-border p-2">
                  <div className="font-semibold">{achievement.title}</div>
                  <div className="text-muted-foreground text-[10px]">
                    {achievement.description}
                  </div>
                </div>
              ))}
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Locked</div>
          <div className="font-mono text-xs space-y-2 opacity-50">
            {achievements
              .filter(a => !a.unlocked)
              .map(achievement => (
                <div key={achievement.id} className="border border-border p-2">
                  <div>{achievement.title}</div>
                  <div className="text-muted-foreground text-[10px]">
                    {achievement.description}
                  </div>
                </div>
              ))}
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}

