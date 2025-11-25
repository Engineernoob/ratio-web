"use client";

import { useEffect, useState } from "react";
import { PlateHeader } from "@/components/core/PlateHeader";
import { BrutalistCard } from "@/components/BrutalistCard";
import { ContextPanel } from "@/components/core/ContextPanel";
import { OrangeAction } from "@/components/core/OrangeAction";
import { Main } from "@/components/Main";

interface Puzzle {
  id: string;
  type: "mcq" | "pattern" | "ratio";
  prompt: string;
  choices?: string[];
  answer: number | string;
  explanation: string;
}

export default function LaboratorivmPage() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPuzzle();
  }, []);

  const fetchPuzzle = async () => {
    try {
      const response = await fetch("/api/puzzles");
      const data = await response.json();
      if (data.puzzle) {
        setPuzzle(data.puzzle);
      }
    } catch (error) {
      console.error("Error fetching puzzle:", error);
    } finally {
      setLoading(false);
    }
  };

  const isCorrectAnswer = (answer: number | string, puzzleData: Puzzle): boolean => {
    if (puzzleData.type === "mcq") {
      return answer === puzzleData.answer;
    } else {
      const normalizedSelected = String(answer).trim().toLowerCase();
      const normalizedAnswer = String(puzzleData.answer).trim().toLowerCase();
      return normalizedSelected === normalizedAnswer;
    }
  };

  const addPuzzleToMemoria = async (puzzleData: Puzzle) => {
    try {
      const response = await fetch("/api/memoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          concept: {
            title: `Puzzle: ${puzzleData.prompt.substring(0, 50)}...`,
            explanation: puzzleData.explanation,
            micro_question: puzzleData.prompt,
            micro_answer: puzzleData.explanation,
            source: "puzzle"
          }
        })
      });
    } catch (error) {
      console.error("Error adding puzzle to memoria:", error);
    }
  };

  const handleAnswerSelect = async (answer: number | string) => {
    if (!puzzle) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Show explanation after a brief delay
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);

    // If correct, add to memoria
    if (isCorrectAnswer(answer, puzzle)) {
      await addPuzzleToMemoria(puzzle);
    }
  };

  const handleSubmitTextAnswer = async (textAnswer: string) => {
    if (!puzzle) return;
    
    const answer = textAnswer.trim().toLowerCase();
    setSelectedAnswer(answer);
    setShowResult(true);
    setTimeout(() => {
      setShowExplanation(true);
    }, 500);

    // If correct, add to memoria
    if (isCorrectAnswer(answer, puzzle)) {
      await addPuzzleToMemoria(puzzle);
    }
  };

  const isCorrect = () => {
    if (!puzzle || selectedAnswer === null) return false;
    return isCorrectAnswer(selectedAnswer, puzzle);
  };

  if (loading) {
    return (
      <>
        <Main>
          <PlateHeader 
            title="LABORATORIVM" 
            subtitle="Interactive Logic Puzzles"
            plateNumber="III"
          />
          <BrutalistCard borderWidth="1.5" className="p-6">
            <div className="font-mono text-sm text-muted-foreground">Loading today's puzzle...</div>
          </BrutalistCard>
        </Main>
        <ContextPanel title="Hints & Logic Notes" />
      </>
    );
  }

  if (!puzzle) {
    return (
      <>
        <Main>
          <PlateHeader 
            title="LABORATORIVM" 
            subtitle="Interactive Logic Puzzles"
            plateNumber="III"
          />
          <BrutalistCard borderWidth="1.5" className="p-6">
            <div className="font-mono text-sm text-muted-foreground">No puzzle available.</div>
          </BrutalistCard>
        </Main>
        <ContextPanel title="Hints & Logic Notes" />
      </>
    );
  }

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
            <div className="font-serif text-lg mb-4 engraved">Today's Puzzle</div>
            <div className="font-mono text-sm space-y-4">
              <div>
                <div className="mb-2 font-semibold">Prompt:</div>
                <p className="text-muted-foreground leading-relaxed">{puzzle.prompt}</p>
              </div>

              {puzzle.type === "mcq" && puzzle.choices && (
                <div className="space-y-2">
                  {puzzle.choices.map((choice, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full text-left border border-border p-3 font-mono text-sm transition-colors ${
                        showResult && selectedAnswer === index
                          ? isCorrect()
                            ? "bg-accent/20 border-accent"
                            : "bg-destructive/20 border-destructive"
                          : "hover:bg-secondary"
                      } ${showResult ? "opacity-70" : ""}`}
                    >
                      {String.fromCharCode(65 + index)}. {choice}
                    </button>
                  ))}
                </div>
              )}

              {(puzzle.type === "pattern" || puzzle.type === "ratio") && (
                <div className="space-y-2">
                  <input
                    type="text"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmitTextAnswer(e.currentTarget.value);
                      }
                    }}
                    disabled={showResult}
                    className="w-full border border-border bg-background p-3 font-mono text-sm"
                    placeholder="Enter your answer..."
                  />
                  <OrangeAction
                    onClick={() => {
                      const input = document.querySelector("input") as HTMLInputElement;
                      if (input) handleSubmitTextAnswer(input.value);
                    }}
                    disabled={showResult}
                  >
                    Submit Answer
                  </OrangeAction>
                </div>
              )}

              {showResult && (
                <div className="border-t border-border pt-4">
                  <div className={`font-mono text-sm font-semibold mb-2 ${
                    isCorrect() ? "text-foreground" : "text-destructive"
                  }`}>
                    {isCorrect() ? "✓ Correct" : "✗ Incorrect"}
                  </div>
                  {!isCorrect() && (
                    <div className="font-mono text-xs text-muted-foreground mb-2">
                      Correct answer: {puzzle.type === "mcq" && puzzle.choices 
                        ? puzzle.choices[puzzle.answer as number]
                        : puzzle.answer}
                    </div>
                  )}
                </div>
              )}

              {showExplanation && (
                <div className="border-t border-border pt-4">
                  <div className="font-serif text-sm mb-2 engraved">Explanation</div>
                  <p className="text-muted-foreground leading-relaxed">
                    {puzzle.explanation}
                  </p>
                </div>
              )}
            </div>
          </BrutalistCard>
        </div>
      </Main>

      <ContextPanel title="Hints & Logic Notes">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Puzzle Type</div>
          <div className="font-mono text-xs">
            {puzzle.type === "mcq" ? "Multiple Choice" : 
             puzzle.type === "pattern" ? "Pattern Recognition" : 
             "Ratio Problem"}
          </div>
        </BrutalistCard>

        {showResult && (
          <BrutalistCard borderWidth="1" className="p-4 mb-4">
            <div className="font-serif text-sm mb-2 engraved">Result</div>
            <div className={`font-mono text-xs ${
              isCorrect() ? "text-foreground" : "text-destructive"
            }`}>
              {isCorrect() ? "Correct" : "Incorrect"}
            </div>
          </BrutalistCard>
        )}

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Tip</div>
          <div className="font-mono text-xs text-muted-foreground">
            {puzzle.type === "mcq" 
              ? "Read all choices carefully before selecting."
              : "Think step by step and check your work."}
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}
