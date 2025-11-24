"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FogPanel } from "@/components/FogPanel";
import { CircularRecallMeter } from "@/components/CircularRecallMeter";
import { MemoryGrid } from "@/components/MemoryGrid";
import { ContextPanel } from "@/components/ContextPanel";
import { Main } from "@/components/Main";
import { OrangeAction } from "@/components/OrangeAction";

interface MemoriaConcept {
  id: string;
  title: string;
  explanation: string;
  micro_question: string;
  micro_answer: string;
  date_added: string;
  next_review: string;
  interval_days: number;
  ease_factor: number;
  review_count: number;
  source: "lesson" | "manual" | "tiktok" | "book_summary" | "book" | "puzzle";
}

export default function MemoriaPage() {
  const [dueReviews, setDueReviews] = useState<MemoriaConcept[]>([]);
  const [allConcepts, setAllConcepts] = useState<MemoriaConcept[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/memoria");
      const data = await response.json();
      if (data.dueReviews) {
        setDueReviews(data.dueReviews);
      }
      if (data.allConcepts) {
        setAllConcepts(data.allConcepts);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReviewResult = async (result: "correct" | "incorrect") => {
    const currentReview = dueReviews[currentReviewIndex];
    if (!currentReview) return;

    try {
      const response = await fetch("/api/memoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          conceptId: currentReview.id,
          result,
        }),
      });

      if (response.ok) {
        if (currentReviewIndex < dueReviews.length - 1) {
          setCurrentReviewIndex(currentReviewIndex + 1);
          setShowAnswer(false);
        } else {
          fetchReviews();
          setCurrentReviewIndex(0);
          setShowAnswer(false);
        }
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const currentReview = dueReviews[currentReviewIndex];

  // Calculate overall confidence level
  const calculateConfidence = () => {
    if (allConcepts.length === 0) return 0;
    const totalRetention = allConcepts.reduce((sum, concept) => {
      const retention = Math.min(
        100,
        Math.round(concept.review_count * 15 + concept.ease_factor * 20)
      );
      return sum + retention;
    }, 0);
    return Math.round(totalRetention / allConcepts.length);
  };

  const confidenceLevel = calculateConfidence();

  // Convert concepts to memory grid format
  const memoryCells = allConcepts.map((concept) => {
    const retention = Math.min(
      100,
      Math.round(concept.review_count * 15 + concept.ease_factor * 20)
    );
    return {
      id: concept.id,
      title: concept.title.substring(0, 10),
      retention,
      lastReview: new Date(concept.next_review),
    };
  });

  if (loading) {
    return (
      <>
        <Main>
          <FogPanel className="card-padding">
            <div className="font-mono text-sm text-muted-foreground">
              Loading reviews...
            </div>
          </FogPanel>
        </Main>
        <ContextPanel title="Review Schedule">
          <div className="font-mono text-xs text-muted-foreground">
            Loading...
          </div>
        </ContextPanel>
      </>
    );
  }

  return (
    <>
      <Main>
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 section-spacing"
        >
          <h1 className="font-serif text-[64px] font-normal tracking-[0.08em] uppercase mb-4 fade-fog-in">
            MEMORIA
          </h1>
          <p className="font-mono text-sm text-muted-foreground tracking-wider">
            Retention & Spaced Repetition
          </p>
        </motion.div>

        {/* Circular Recall Meter */}
        <div className="mb-16 flex justify-center">
          <CircularRecallMeter percentage={confidenceLevel} size={280} />
        </div>

        {/* Review Section */}
        <div className="space-y-6 mb-16">
          {dueReviews.length > 0 && currentReview ? (
            <FogPanel className="card-padding">
              <div className="font-serif text-lg mb-4 engraved engrave">
                Review {currentReviewIndex + 1} of {dueReviews.length}
              </div>
              <div className="font-mono text-sm space-y-4">
                <div>
                  <div className="font-semibold mb-2">
                    {currentReview.title}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {currentReview.explanation}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="mb-2 font-semibold">Question:</div>
                  <p className="text-muted-foreground mb-4">
                    {currentReview.micro_question}
                  </p>

                  {showAnswer ? (
                    <div className="space-y-4">
                      <div className="border-t border-border pt-4">
                        <div className="mb-2 font-semibold">Answer:</div>
                        <p className="text-muted-foreground mb-4">
                          {currentReview.micro_answer}
                        </p>
                      </div>

                      <div className="flex gap-3">
                        <OrangeAction
                          onClick={() => handleReviewResult("correct")}
                          className="flex-1"
                        >
                          Correct
                        </OrangeAction>
                        <OrangeAction
                          onClick={() => handleReviewResult("incorrect")}
                          className="flex-1"
                          active={false}
                        >
                          Incorrect
                        </OrangeAction>
                      </div>
                    </div>
                  ) : (
                    <OrangeAction onClick={() => setShowAnswer(true)}>
                      Reveal Answer
                    </OrangeAction>
                  )}
                </div>
              </div>
            </FogPanel>
          ) : (
            <FogPanel className="card-padding">
              <div className="font-serif text-lg mb-4 engraved engrave">
                No Reviews Due
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                All concepts are up to date. Check back tomorrow for new
                reviews.
              </div>
            </FogPanel>
          )}
        </div>

        {/* Memory Grid */}
        {allConcepts.length > 0 && (
          <div>
            <div className="font-serif text-xl mb-6 engraved engrave">
              Retention Mosaic
            </div>
            <div className="font-mono text-sm text-muted-foreground mb-4">
              Retention levels: Darker = stronger memory. Review items below
              60%.
            </div>
            <MemoryGrid cells={memoryCells} />
          </div>
        )}
      </Main>

      <ContextPanel title="Review Schedule">
        <FogPanel className="card-padding mb-4">
          <div className="font-serif text-sm mb-2 engraved">Due Today</div>
          <div className="font-mono text-xs space-y-1">
            {dueReviews.length > 0 ? (
              dueReviews.map((review) => (
                <div key={review.id}>• {review.title}</div>
              ))
            ) : (
              <div className="text-muted-foreground">None</div>
            )}
          </div>
        </FogPanel>

        <FogPanel className="card-padding mb-4">
          <div className="font-serif text-sm mb-2 engraved">Statistics</div>
          <div className="font-mono text-xs space-y-1">
            <div>Total Concepts: {allConcepts.length}</div>
            <div>Due Reviews: {dueReviews.length}</div>
            <div>
              Average Reviews:{" "}
              {allConcepts.length > 0
                ? Math.round(
                    allConcepts.reduce((sum, c) => sum + c.review_count, 0) /
                      allConcepts.length
                  )
                : 0}
            </div>
            <div>Confidence Level: {confidenceLevel}%</div>
          </div>
        </FogPanel>

        <FogPanel className="card-padding">
          <div className="font-serif text-sm mb-2 engraved">Intervals</div>
          <div className="font-mono text-xs space-y-1">
            <div>1d → 3d → 7d → 14d → 30d</div>
            <div className="text-muted-foreground mt-2">
              Correct answers advance interval. Incorrect resets to 1 day.
            </div>
          </div>
        </FogPanel>
      </ContextPanel>
    </>
  );
}
