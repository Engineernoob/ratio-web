"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StatusPanel } from "@/components/lab/StatusPanel";
import { DialecticaCard } from "@/components/lab/DialecticaCard";
import { LogicaCard } from "@/components/lab/LogicaCard";
import { MicroLessonCard, MicroLesson } from "@/components/lab/MicroLessonCard";
import { Workspace } from "@/components/lab/Workspace";
import { Continuum } from "@/components/lab/Continuum";
import dialecticaData from "@/data/lab/dialectica.json";
import problemataData from "@/data/lab/problemata.json";
import moduliData from "@/data/lab/moduli.json";
import "@/styles/lab.css";

interface DialecticaData {
  dailyQuestion: string;
  counterarguments: string[];
  clarityTests: string[];
}

interface ProblemataData {
  today: {
    id: string;
    prompt: string;
    solution?: string;
    explanation?: string[];
    category?: string;
    difficulty?: string;
  };
  variants: Array<{
    id: string;
    prompt: string;
    category?: string;
    difficulty?: string;
  }>;
}

interface ModuliData {
  lessons: MicroLesson[];
}

export default function LaboratorivmPage() {
  const [selectedLesson, setSelectedLesson] = useState<MicroLesson | null>(
    null
  );
  const [showCounterargument, setShowCounterargument] = useState(false);
  const [showClarityTest, setShowClarityTest] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(0);

  // Status metrics (would be loaded from localStorage or API)
  const [lectioComplete, setLectioComplete] = useState(45);
  const [ritvaliaFacta, setRitvaliaFacta] = useState(60);
  const [memoriaRevisio, setMemoriaRevisio] = useState(75);

  // Load status from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lab-status");
    if (saved) {
      try {
        const status = JSON.parse(saved);
        setLectioComplete(status.lectioComplete || 45);
        setRitvaliaFacta(status.ritvaliaFacta || 60);
        setMemoriaRevisio(status.memoriaRevisio || 75);
      } catch (e) {
        console.error("Error loading status:", e);
      }
    }
  }, []);

  const handleCounterargument = () => {
    setShowCounterargument(true);
    // In a real implementation, this would generate or show a counterargument
    setTimeout(() => setShowCounterargument(false), 3000);
  };

  const handleClarityTest = () => {
    setShowClarityTest(true);
    // In a real implementation, this would show clarity test questions
    setTimeout(() => setShowClarityTest(false), 3000);
  };

  const handleGenerateVariant = () => {
    if (problemataData && problemataData.variants.length > 0) {
      const nextVariant = (currentVariant + 1) % problemataData.variants.length;
      setCurrentVariant(nextVariant);
    }
  };

  const handleLessonComplete = () => {
    if (selectedLesson) {
      // Update progress
      const newLectio = Math.min(100, lectioComplete + 5);
      setLectioComplete(newLectio);
      setSelectedLesson(null);

      // Save to localStorage
      localStorage.setItem(
        "lab-status",
        JSON.stringify({
          lectioComplete: newLectio,
          ritvaliaFacta,
          memoriaRevisio,
        })
      );
    }
  };

  const handleAddToMemoria = () => {
    // Add lesson to memoria system
    const newMemoria = Math.min(100, memoriaRevisio + 3);
    setMemoriaRevisio(newMemoria);

    // Save to localStorage
    localStorage.setItem(
      "lab-status",
      JSON.stringify({
        lectioComplete,
        ritvaliaFacta,
        memoriaRevisio: newMemoria,
      })
    );
  };

  const continuumItems = [
    { id: "dialectica", label: "Dialectic" },
    { id: "logica", label: "Logic Problemata" },
    { id: "moduli", label: "Micro-Lessons" },
  ];

  const currentPuzzle =
    currentVariant === 0
      ? problemataData.today
      : problemataData.variants[currentVariant - 1] || problemataData.today;

  return (
    <div className="lab-container min-h-screen">
      {/* Background texture */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('/images/textures/texture_bayer.png')",
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
          opacity: 0.02,
        }}
      />

      {/* Status Panel */}
      <StatusPanel
        lectioComplete={lectioComplete}
        ritvaliaFacta={ritvaliaFacta}
        memoriaRevisio={memoriaRevisio}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-12 md:pt-24 pb-12 px-4 md:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-3 text-white tracking-wide">
              LABORATORIVM
            </h1>
            <p className="font-mono text-xs md:text-sm lg:text-base text-[#b7b7b7] mb-4">
              OFFICINA RATIONIS
            </p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-24 bg-white/20"></div>
              <div className="h-px w-24 bg-white/20"></div>
              <div className="h-px w-24 bg-white/20"></div>
            </div>
          </motion.div>

          {/* Continuum Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Continuum items={continuumItems} />
          </motion.div>

          {/* Three Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Dialectica Card */}
            <DialecticaCard
              dailyQuestion={dialecticaData.dailyQuestion}
              onCounterargument={handleCounterargument}
              onClarityTest={handleClarityTest}
            />

            {/* Logica Card */}
            {currentPuzzle && (
              <LogicaCard
                puzzle={currentPuzzle}
                onRevealSolution={() => {}}
                onExplain={() => {}}
                onGenerateVariant={handleGenerateVariant}
              />
            )}

            {/* Moduli Card - List of lessons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lab-card p-6 rounded-sm"
            >
              <h3 className="font-serif text-xl mb-4 text-white">MODVLI</h3>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {moduliData.lessons.map((lesson, index) => (
                  <MicroLessonCard
                    key={lesson.id}
                    lesson={lesson}
                    onClick={() => setSelectedLesson(lesson)}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Notifications */}
          {showCounterargument && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-[#111] border border-white/20"
            >
              <p className="font-mono text-xs text-white">
                Counterargument generated
              </p>
            </motion.div>
          )}

          {showClarityTest && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 p-4 bg-[#111] border border-white/20"
            >
              <p className="font-mono text-xs text-white">Clarity test ready</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Workspace Modal */}
      <Workspace
        lesson={selectedLesson}
        onClose={() => setSelectedLesson(null)}
        onComplete={handleLessonComplete}
        onAddToMemoria={handleAddToMemoria}
      />
    </div>
  );
}
