"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MemoriaShell } from "@/components/Memoria/MemoriaShell";
import { RitualHeader } from "@/components/Memoria/RitualHeader";
import { DailyRitual } from "@/components/Memoria/DailyRitual";
import { ScholarMode } from "@/components/Memoria/ScholarMode";
import { ArchivumMode } from "@/components/Memoria/ArchivumMode";
import { Main } from "@/components/Main";
import type { MemoryCard } from "@/lib/memoria/types";

type MemoriaMode = "ritual" | "scholar" | "archivum";

export default function MemoriaPage() {
  const router = useRouter();
  const [mode, setMode] = useState<MemoriaMode>("ritual");
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cards
  useEffect(() => {
    const loadCards = async () => {
      try {
        const response = await fetch("/api/memoria/cards");
        if (response.ok) {
          const data = await response.json();
          setCards(data.cards || []);
        }
      } catch (error) {
        console.error("Error loading memoria cards:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCards();
  }, []);

  const handleCardReviewed = () => {
    // Reload cards after review
    fetch("/api/memoria/cards")
      .then((res) => res.json())
      .then((data) => setCards(data.cards || []))
      .catch(console.error);
  };

  if (loading) {
    return (
      <Main>
        <MemoriaShell>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div
                className="font-serif text-xl mb-4"
                style={{ color: "#C8B68D" }}
              >
                Loading Memoria...
              </div>
              <div
                className="font-mono text-sm opacity-60"
                style={{ color: "#C8B68D" }}
              >
                Preparing your memory dojo...
              </div>
            </div>
          </div>
        </MemoriaShell>
      </Main>
    );
  }

  return (
    <Main>
      <MemoriaShell>
        <div className="relative z-10 min-h-screen p-6">
          {/* Mode Selector */}
          <div className="max-w-7xl mx-auto mb-8">
            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              <motion.button
                onClick={() => router.push("/memoria/insights")}
                className="px-6 py-2 font-mono text-sm"
                style={{
                  color: "rgba(200, 182, 141, 0.8)",
                  border: "1px solid rgba(200, 182, 141, 0.3)",
                  background: "rgba(200, 182, 141, 0.1)",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Insight Curator
              </motion.button>
              {(
                [
                  { id: "ritual", label: "Daily Ritual" },
                  { id: "scholar", label: "Scholar Mode" },
                  { id: "archivum", label: "Archivum" },
                ] as const
              ).map((m) => (
                <motion.button
                  key={m.id}
                  onClick={() => setMode(m.id as MemoriaMode)}
                  className="px-6 py-2 font-mono text-sm"
                  style={{
                    color:
                      mode === m.id ? "#C8B68D" : "rgba(200, 182, 141, 0.5)",
                    border: `1px solid ${
                      mode === m.id
                        ? "rgba(200, 182, 141, 0.4)"
                        : "rgba(200, 182, 141, 0.2)"
                    }`,
                    background:
                      mode === m.id
                        ? "rgba(200, 182, 141, 0.15)"
                        : "rgba(10, 10, 10, 0.6)",
                    borderRadius: "4px",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {m.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="max-w-7xl mx-auto">
            {mode === "ritual" && (
              <>
                <RitualHeader
                  title="MEMORIA"
                  subtitle="Daily Ritual of Knowledge Reinforcement"
                />
                <DailyRitual
                  cards={cards}
                  onCardReviewed={handleCardReviewed}
                />
              </>
            )}

            {mode === "scholar" && (
              <>
                <RitualHeader
                  title="SCHOLAR MODE"
                  subtitle="Intensive Study Session"
                />
                <ScholarMode
                  cards={cards}
                  onCardReviewed={handleCardReviewed}
                />
              </>
            )}

            {mode === "archivum" && (
              <>
                <RitualHeader
                  title="ARCHIVUM"
                  subtitle="Complete Memory Archive"
                />
                <ArchivumMode cards={cards} />
              </>
            )}
          </div>
        </div>
      </MemoriaShell>
    </Main>
  );
}
