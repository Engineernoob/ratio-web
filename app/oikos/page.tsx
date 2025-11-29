"use client";

import { TopNavBar } from "@/components/core/TopNavBar";
import { HeroSection } from "@/components/core/HeroSection";
import { LectioCard } from "@/components/core/LectioCard";
import { RitualCard } from "@/components/core/RitualCard";
import { MemoriaCard } from "@/components/core/MemoriaCard";
import { DayStatusPanel } from "@/components/core/DayStatusPanel";
import { NextActionsPanel } from "@/components/core/NextActionsPanel";
import { ScrollFeedCard } from "@/components/core/ScrollFeedCard";

export default function OikosPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{ background: "var(--background, #000000)" }}
    >
      <TopNavBar />

      <div className="pt-20 pb-12">
        <div className="max-w-[1920px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Hero Section */}
              <HeroSection lectioCount={3} ritusCount={2} memoriaCount={7} />

              {/* Prima Tabulae Hodiernae */}
              <div>
                <h2 className="font-mono text-xs text-[#888888] uppercase tracking-wider mb-6">
                  PRIMA TABVLÆ HODIERNÆ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <LectioCard delay={0.3} />
                  <RitualCard delay={0.4} />
                  <MemoriaCard delay={0.5} />
                </div>
              </div>

              {/* Scrollvs Hodiernvs */}
              <div>
                <div className="mb-2">
                  <p className="font-mono text-[10px] text-[#888888] uppercase tracking-wider mb-4">
                    LECTIO • RITVS • MEMORIA IN VNVM CONFLVNT
                  </p>
                  <h2 className="font-mono text-xs text-[#888888] uppercase tracking-wider">
                    SCROLLVS HODIERNVS
                  </h2>
                </div>
                <div className="space-y-6 mt-6">
                  <ScrollFeedCard
                    type="LECTIO"
                    title="CONTINVA VIRTUS VT HABITUS: DE MEDIOCRITATE"
                    description="Reread the central argument on virtue as a mean between extremes. Mark any sentences that reframe your current studies or challenge your previous annotations."
                    source="EX SCHEDA • ETHICA NICOMACHEA II"
                    time="12 MIN"
                    actionLabel="ADDERE AD MEMORIAM"
                    delay={0.6}
                  />
                  <ScrollFeedCard
                    type="RITVAL"
                    title="EXERCITIVM QVAESTIO MATVTINA: QVID HODIE DISCIPIAM?"
                    description="Answer in three short lines: (1) quid explorandum, (2) quibus mediis, (3) quibus signis vesperi intelleges te profecisse. Keep language precise and concrete."
                    source="EX OFFICINA • OIKOS RITVS"
                    time="5 MIN"
                    actionLabel="SEGNARE COMPLETVM"
                    delay={0.7}
                  />
                  <ScrollFeedCard
                    type="MEMORIA"
                    title="REVISIO ARBOR SCIENTIAE: RAMUS LOGICVS"
                    description="Walk once more through the logical branch of your memory tree. For each nodus, recite the associated principle and provide a fresh example drawn from today's reading or life."
                    source="EX THEATRO • INTERVALLVM III"
                    time="20 MIN"
                    actionLabel="CONIVNGERE CVM LECTIO"
                    delay={0.8}
                  />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <DayStatusPanel
                lectioComplete={2}
                lectioTotal={3}
                ritualiaFacta={1}
                ritualiaTotal={2}
                memoriaRevisio={3}
                memoriaTotal={7}
                delay={0.3}
              />
              <NextActionsPanel delay={0.4} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
