"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LaboratorivmShell } from "@/components/Laboratorivm/LaboratorivmShell";
import { CategoryBar } from "@/components/Laboratorivm/CategoryBar";
import { DailyChallengeBadge } from "@/components/Laboratorivm/DailyChallengeBadge";
import { PuzzleEngine } from "@/components/Laboratorivm/PuzzleEngine";
import { Main } from "@/components/Main";
import type { Puzzle, PuzzleCategory } from "@/lib/puzzles/types";

export default function LaboratorivmPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    PuzzleCategory | "All"
  >("All");
  const [selectedPuzzleId, setSelectedPuzzleId] = useState<string | null>(null);
  const [dailyChallengeId, setDailyChallengeId] = useState<string>("");
  const [completedPuzzles, setCompletedPuzzles] = useState<Set<string>>(
    new Set()
  );
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);

  useEffect(() => {
    const loadPuzzles = async () => {
      try {
        const response = await fetch("/api/puzzles/index");
        if (response.ok) {
          const data = await response.json();
          setPuzzles(data.puzzles || []);
          setDailyChallengeId(data.dailyChallengeId || "");
        }
      } catch (error) {
        console.error("Error loading puzzles:", error);
      }
    };

    loadPuzzles();

    // Load completed puzzles from localStorage
    const stored = localStorage.getItem("laboratorivm-completed");
    if (stored) {
      setCompletedPuzzles(new Set(JSON.parse(stored)));
    }
  }, []);

  const handlePuzzleComplete = (puzzleId: string) => {
    const newCompleted = new Set([...completedPuzzles, puzzleId]);
    setCompletedPuzzles(newCompleted);
    localStorage.setItem(
      "laboratorivm-completed",
      JSON.stringify(Array.from(newCompleted))
    );
  };

  const filteredPuzzles = puzzles.filter((puzzle) => {
    if (selectedCategory === "All") return true;
    return puzzle.category === selectedCategory;
  });

  const isDailyChallengeCompleted = dailyChallengeId
    ? completedPuzzles.has(dailyChallengeId)
    : false;

  return (
    <Main>
      <LaboratorivmShell>
        <div className="relative z-10 min-h-screen p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="font-serif text-5xl mb-3"
                style={{
                  color: "#C8B68D",
                  textShadow: "0px 2px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                LABORATORIVM
              </h1>
              <p
                className="font-mono text-sm opacity-60"
                style={{ color: "#C8B68D" }}
              >
                Interactive Cognitive Training Environment
              </p>
            </motion.div>

            {/* Daily Challenge */}
            {dailyChallengeId && (
              <DailyChallengeBadge
                puzzleId={dailyChallengeId}
                isCompleted={isDailyChallengeCompleted}
                onClick={() => setSelectedPuzzleId(dailyChallengeId)}
              />
            )}

            {/* Category Bar */}
            <CategoryBar
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />

            {/* Puzzle Selection or Engine */}
            {selectedPuzzleId ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <PuzzleEngine
                  puzzleId={selectedPuzzleId}
                  onComplete={() => handlePuzzleComplete(selectedPuzzleId)}
                />
                <motion.button
                  onClick={() => setSelectedPuzzleId(null)}
                  className="mt-6 px-6 py-3 font-mono text-sm"
                  style={{
                    color: "#C8B68D",
                    border: "1px solid rgba(200, 182, 141, 0.3)",
                    background: "rgba(200, 182, 141, 0.1)",
                    borderRadius: "4px",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Puzzles
                </motion.button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPuzzles.map((puzzle, index) => (
                  <motion.button
                    key={puzzle.id}
                    onClick={() => setSelectedPuzzleId(puzzle.id)}
                    className="text-left p-6 rounded-lg"
                    style={{
                      background: completedPuzzles.has(puzzle.id)
                        ? "rgba(200, 182, 141, 0.1)"
                        : "rgba(10, 10, 10, 0.7)",
                      border: `1px solid ${
                        completedPuzzles.has(puzzle.id)
                          ? "rgba(200, 182, 141, 0.4)"
                          : "rgba(200, 182, 141, 0.2)"
                      }`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3
                      className="font-serif text-lg mb-2"
                      style={{ color: "#C8B68D" }}
                    >
                      {puzzle.prompt.substring(0, 60)}
                      {puzzle.prompt.length > 60 ? "..." : ""}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      {puzzle.category && (
                        <span
                          className="font-mono text-xs px-2 py-1"
                          style={{
                            color: "rgba(200, 182, 141, 0.7)",
                            background: "rgba(200, 182, 141, 0.1)",
                            borderRadius: "4px",
                          }}
                        >
                          {puzzle.category}
                        </span>
                      )}
                      {puzzle.difficulty && (
                        <span
                          className="font-mono text-xs px-2 py-1"
                          style={{
                            color: "rgba(200, 182, 141, 0.7)",
                            background: "rgba(200, 182, 141, 0.1)",
                            borderRadius: "4px",
                          }}
                        >
                          {puzzle.difficulty}
                        </span>
                      )}
                      {completedPuzzles.has(puzzle.id) && (
                        <span
                          className="font-mono text-xs px-2 py-1"
                          style={{
                            color: "#C8B68D",
                            background: "rgba(200, 182, 141, 0.2)",
                            borderRadius: "4px",
                          }}
                        >
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        </div>
      </LaboratorivmShell>
    </Main>
  );
}
