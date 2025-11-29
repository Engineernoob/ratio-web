"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TopNavBar } from "@/components/core/TopNavBar";
import { ScholarivmShell } from "@/components/Scholarivm/ScholarivmShell";
import { ScholarHeader } from "@/components/Scholarivm/ScholarHeader";
import { MasterySlab } from "@/components/Scholarivm/MasterySlab";
import { StatsGraph } from "@/components/Scholarivm/StatsGraph";
import { BookProgressList } from "@/components/Scholarivm/BookProgressList";
import { MemoriaStats } from "@/components/Scholarivm/MemoriaStats";
import { ReasoningStats } from "@/components/Scholarivm/ReasoningStats";
import { DividerRoman } from "@/components/Scholarivm/DividerRoman";
import { Main } from "@/components/Main";
import type { MemoryCard } from "@/lib/memoria/types";
import {
  calculateMemoryRetention,
  calculateLearningVelocity,
  calculateBookProgress,
  calculateMasteryXP,
  getMemoriaStats,
  generateMemoryRetentionData,
  generateLearningVelocityData,
  calculateReasoningStats,
  calculateStreak,
  type BookProgress,
  type MasteryData,
  type ReasoningStats as ReasoningStatsType,
} from "@/lib/scholarivm/utils";
import { calculateMasteryLevel } from "@/lib/scholarivm/utils";

interface BookManifest {
  id: string;
  title: string;
  author: string;
  chapters: Array<{ id: string; file: string }>;
}

export default function ScholarivmPage() {
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [books, setBooks] = useState<BookManifest[]>([]);
  const [feedAssignments, setFeedAssignments] = useState<Record<string, any>>({});
  const [puzzleResults, setPuzzleResults] = useState<
    Array<{ correct: boolean; type: string }>
  >([]);
  const [completedChapters, setCompletedChapters] = useState<
    Record<string, Set<string>>
  >({});

  // Load all data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load memoria cards
        const memoriaRes = await fetch("/api/memoria/cards");
        if (memoriaRes.ok) {
          const memoriaData = await memoriaRes.json();
          setCards(memoriaData.cards || []);
        }

        // Load books
        const bookIds = ["meditations", "AtomicHabits"];
        const bookPromises = bookIds.map(async (id) => {
          try {
            const res = await fetch(`/api/books/${id}?action=manifest`);
            if (res.ok) {
              return await res.json();
            }
          } catch (error) {
            console.error(`Error loading book ${id}:`, error);
          }
          return null;
        });

        const loadedBooks = (await Promise.all(bookPromises)).filter(
          (b) => b !== null
        );
        setBooks(loadedBooks);

        // Simulate completed chapters (in real app, this would come from user progress)
        const completed: Record<string, Set<string>> = {};
        loadedBooks.forEach((book) => {
          const completedSet = new Set<string>();
          // Simulate some progress
          const progressPercent = Math.random() * 0.6; // 0-60% progress
          const chaptersToComplete = Math.floor(
            book.chapters.length * progressPercent
          );
          for (let i = 0; i < chaptersToComplete; i++) {
            completedSet.add(book.chapters[i].id);
          }
          completed[book.id] = completedSet;
        });
        setCompletedChapters(completed);

        // Load feed assignments
        const feedRes = await fetch("/api/feed/assignments");
        if (feedRes.ok) {
          const feedData = await feedRes.json();
          setFeedAssignments(feedData.assignments || {});
        }

        // Load puzzle results (simulated - in real app, this would come from a results file)
        // For now, we'll generate some sample data
        const sampleResults: Array<{ correct: boolean; type: string }> = [];
        for (let i = 0; i < 20; i++) {
          sampleResults.push({
            correct: Math.random() > 0.3, // 70% accuracy
            type: ["fallacy", "logic", "syllogism"][
              Math.floor(Math.random() * 3)
            ],
          });
        }
        setPuzzleResults(sampleResults);
      } catch (error) {
        console.error("Error loading scholarivm data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <TopNavBar />
        <Main>
          <ScholarivmShell>
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div
                className="font-serif text-xl mb-4"
                style={{ color: "#C8B68D" }}
              >
                Loading SCHOLARIVM...
              </div>
              <div
                className="font-mono text-sm opacity-60"
                style={{ color: "#C8B68D" }}
              >
                Preparing your mastery dashboard...
              </div>
            </div>
          </div>
        </ScholarivmShell>
      </Main>
    </>
  );
  }

  // Calculate statistics
  const memoryRetention = calculateMemoryRetention(cards);
  const learningVelocity = calculateLearningVelocity(cards, 30);
  const bookProgressData = calculateBookProgress(books, completedChapters);
  const reasoningStats = calculateReasoningStats(puzzleResults);
  const streak = calculateStreak(cards, feedAssignments);

  // Calculate mastery XP
  const masteryXP = calculateMasteryXP(
    cards,
    bookProgressData,
    reasoningStats.logicPuzzleAccuracy
  );

  // Calculate mastery data for each slab
  const getMasteryData = (
    xp: number,
    lastWeekXP: number = 0
  ): MasteryData => {
    const { level, xpToNext } = calculateMasteryLevel(xp);
    const masteryPercent = Math.min((xp / 1000) * 100, 100);
    const growthSinceLastWeek =
      lastWeekXP > 0 ? ((xp - lastWeekXP) / lastWeekXP) * 100 : 0;

    return {
      level,
      xp,
      xpToNext,
      masteryPercent,
      growthSinceLastWeek,
    };
  };

  const masteryData = {
    knowledge: getMasteryData(masteryXP.knowledge, masteryXP.knowledge * 0.9),
    memoria: getMasteryData(masteryXP.memoria, masteryXP.memoria * 0.9),
    ratio: getMasteryData(masteryXP.ratio, masteryXP.ratio * 0.9),
    ars: getMasteryData(masteryXP.ars, masteryXP.ars * 0.9),
  };

  // Generate graph data
  const memoryRetentionData = generateMemoryRetentionData(cards, 30);
  const learningVelocityData = generateLearningVelocityData(cards, 30);
  const reasoningAccuracyData = Array.from({ length: 31 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (30 - i));
    return {
      date: date.toISOString().split("T")[0],
      value: reasoningStats.logicPuzzleAccuracy + (Math.random() - 0.5) * 10,
    };
  });

  // Get memoria stats
  const memoriaStats = getMemoriaStats(cards);

  return (
    <>
      <TopNavBar />
      <Main className="scroll-fade-top scroll-fade-bottom">
        <ScholarivmShell>
        <div className="relative z-10 min-h-screen p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <ScholarHeader streak={streak} />

            <DividerRoman className="mb-12" delay={0.8} />

            {/* Mastery Slabs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            >
              <MasterySlab name="Knowledge" data={masteryData.knowledge} delay={1.2} />
              <MasterySlab name="Memoria" data={masteryData.memoria} delay={1.3} />
              <MasterySlab name="Ratio" data={masteryData.ratio} delay={1.4} />
              <MasterySlab name="Ars" data={masteryData.ars} delay={1.5} />
            </motion.div>

            <DividerRoman className="mb-12" delay={1.6} />

            {/* Stats Graphs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
            >
              <StatsGraph
                title="Memory Retention"
                data={memoryRetentionData}
                color="#d7c49e"
                delay={2}
                maxValue={100}
              />
              <StatsGraph
                title="Learning Velocity"
                data={learningVelocityData}
                color="#d7c49e"
                delay={2.1}
              />
              <StatsGraph
                title="Reasoning Accuracy"
                data={reasoningAccuracyData}
                color="#d7c49e"
                delay={2.2}
                maxValue={100}
              />
            </motion.div>

            <DividerRoman className="mb-12" delay={2.4} />

            {/* Bottom Section: Books, Memoria, Reasoning */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
            >
              <BookProgressList books={bookProgressData} delay={2.8} />
              <MemoriaStats stats={memoriaStats} delay={2.9} />
              <ReasoningStats stats={reasoningStats} delay={3} />
            </motion.div>

            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
            >
              <div
                className="p-6 border rounded-sm text-center"
                style={{
                  borderColor: "rgba(215, 196, 158, 0.2)",
                  background: "rgba(10, 10, 10, 0.6)",
                }}
              >
                <div
                  className="font-mono text-xs uppercase mb-2"
                  style={{ color: "rgba(215, 196, 158, 0.6)" }}
                >
                  Memory Retention
                </div>
                <div
                  className="font-serif text-3xl font-bold"
                  style={{ color: "#d7c49e" }}
                >
                  {memoryRetention.toFixed(1)}%
                </div>
              </div>

              <div
                className="p-6 border rounded-sm text-center"
                style={{
                  borderColor: "rgba(215, 196, 158, 0.2)",
                  background: "rgba(10, 10, 10, 0.6)",
                }}
              >
                <div
                  className="font-mono text-xs uppercase mb-2"
                  style={{ color: "rgba(215, 196, 158, 0.6)" }}
                >
                  Learning Velocity
                </div>
                <div
                  className="font-serif text-3xl font-bold"
                  style={{ color: "#d7c49e" }}
                >
                  {learningVelocity.toFixed(1)}/day
                </div>
              </div>

              <div
                className="p-6 border rounded-sm text-center"
                style={{
                  borderColor: "rgba(215, 196, 158, 0.2)",
                  background: "rgba(10, 10, 10, 0.6)",
                }}
              >
                <div
                  className="font-mono text-xs uppercase mb-2"
                  style={{ color: "rgba(215, 196, 158, 0.6)" }}
                >
                  Chapters Mastered
                </div>
                <div
                  className="font-serif text-3xl font-bold"
                  style={{ color: "#d7c49e" }}
                >
                  {bookProgressData.reduce(
                    (sum, book) => sum + book.chaptersCompleted,
                    0
                  )}
                </div>
              </div>
            </motion.div>
            </div>
          </div>
        </ScholarivmShell>
      </Main>
    </>
  );
}
