"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArsRationisShell } from "@/components/ArsRationis/ArsRationisShell";
import { ModeSelector } from "@/components/ArsRationis/ModeSelector";
import { AnalyzerInput } from "@/components/ArsRationis/AnalyzerInput";
import { AnalyzerOutput } from "@/components/ArsRationis/AnalyzerOutput";
import { SyllogismWorkbench } from "@/components/ArsRationis/SyllogismWorkbench";
import { FallacyTrainer } from "@/components/ArsRationis/FallacyTrainer";
import { ArgumentMapCanvas } from "@/components/ArsRationis/ArgumentMapCanvas";
import { FeedbackPanel } from "@/components/ArsRationis/FeedbackPanel";
import { Main } from "@/components/Main";
import {
  parseArgument,
  extractLogicalForm,
  findMissingPremises,
  detectFallacies,
  evaluateValidity,
  buildArgumentMap,
} from "@/lib/logic";
import type {
  Argument,
  Fallacy,
  Premise,
  ArgumentMap,
} from "@/lib/logic/types";

type ReasoningMode = "analyzer" | "syllogism" | "fallacy" | "mapping";

export default function ArsRationisPage() {
  const [mode, setMode] = useState<ReasoningMode>("analyzer");
  const [argumentText, setArgumentText] = useState("");
  const [parsedArgument, setParsedArgument] = useState<Argument | null>(null);
  const [fallacies, setFallacies] = useState<Fallacy[]>([]);
  const [allFallacies, setAllFallacies] = useState<Fallacy[]>([]);
  const [validityResult, setValidityResult] = useState<boolean | null>(null);
  const [argumentMap, setArgumentMap] = useState<ArgumentMap | null>(null);

  // Load fallacies
  useEffect(() => {
    const loadFallacies = async () => {
      try {
        const response = await fetch("/api/logic/fallacies");
        if (response.ok) {
          const data = await response.json();
          setAllFallacies(data.fallacies || []);
        }
      } catch (error) {
        console.error("Error loading fallacies:", error);
      }
    };

    loadFallacies();
  }, []);

  // Analyze argument when text changes
  useEffect(() => {
    if (argumentText.trim() && mode === "analyzer") {
      const argument = parseArgument(argumentText);
      setParsedArgument(argument);

      // Detect fallacies
      const detected = detectFallacies(argumentText, allFallacies);
      setFallacies(detected);

      // Build argument map
      const map = buildArgumentMap(argument);
      setArgumentMap(map);
    } else if (!argumentText.trim()) {
      setParsedArgument(null);
      setFallacies([]);
      setArgumentMap(null);
    }
  }, [argumentText, allFallacies, mode]);

  const handleValidityCheck = (premises: Premise[], conclusion: string) => {
    const argument: Argument = {
      premises,
      conclusion: { text: conclusion },
    };

    const validity = evaluateValidity(argument);
    setValidityResult(validity === "valid");
  };

  const logicalForm = parsedArgument ? extractLogicalForm(parsedArgument) : "";
  const missingPremises = parsedArgument
    ? findMissingPremises(parsedArgument)
    : [];

  return (
    <Main>
      <ArsRationisShell>
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
                ARS RATIONIS
              </h1>
              <p
                className="font-mono text-sm opacity-60"
                style={{ color: "#C8B68D" }}
              >
                Advanced Logic and Reasoning Forge
              </p>
            </motion.div>

            {/* Mode Selector */}
            <ModeSelector selectedMode={mode} onModeChange={setMode} />

            {/* Content based on mode */}
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mode === "analyzer" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <AnalyzerInput
                      value={argumentText}
                      onChange={setArgumentText}
                    />
                  </div>
                  <div>
                    {parsedArgument && (
                      <AnalyzerOutput
                        argument={parsedArgument}
                        fallacies={fallacies}
                        missingPremises={missingPremises}
                        logicalForm={logicalForm}
                      />
                    )}
                  </div>
                </div>
              )}

              {mode === "syllogism" && (
                <div className="max-w-3xl mx-auto">
                  <SyllogismWorkbench onValidityCheck={handleValidityCheck} />
                  <FeedbackPanel
                    isValid={validityResult}
                    message={
                      validityResult
                        ? "This syllogism is valid"
                        : validityResult === false
                        ? "This syllogism is invalid"
                        : undefined
                    }
                  />
                </div>
              )}

              {mode === "fallacy" && (
                <FallacyTrainer fallacies={allFallacies} />
              )}

              {mode === "mapping" && (
                <div>
                  {argumentMap ? (
                    <ArgumentMapCanvas
                      map={argumentMap}
                      onMapChange={setArgumentMap}
                    />
                  ) : (
                    <div className="text-center py-20">
                      <p
                        className="font-mono text-sm opacity-60 mb-4"
                        style={{ color: "#C8B68D" }}
                      >
                        Enter an argument in Analyzer mode to generate a map
                      </p>
                      <motion.button
                        onClick={() => setMode("analyzer")}
                        className="px-6 py-3 font-mono text-sm"
                        style={{
                          color: "#C8B68D",
                          border: "1px solid rgba(200, 182, 141, 0.3)",
                          background: "rgba(200, 182, 141, 0.1)",
                          borderRadius: "4px",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Go to Analyzer
                      </motion.button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </ArsRationisShell>
    </Main>
  );
}
