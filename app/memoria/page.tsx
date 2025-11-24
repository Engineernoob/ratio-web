"use client";

import { useEffect, useState } from "react";
import { PlateHeader } from "@/components/PlateHeader";
import { MemoryGrid } from "@/components/MemoryGrid";
import { ContextPanel } from "@/components/ContextPanel";
import { BrutalistCard } from "@/components/BrutalistCard";
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
          result
        })
      });

      if (response.ok) {
        // Move to next review or refresh
        if (currentReviewIndex < dueReviews.length - 1) {
          setCurrentReviewIndex(currentReviewIndex + 1);
          setShowAnswer(false);
        } else {
          // All reviews done, refresh
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

  // Convert concepts to memory grid format
  const memoryCells = allConcepts.map((concept, index) => {
    // Calculate retention based on review count and ease factor
    const retention = Math.min(100, Math.round(concept.review_count * 15 + concept.ease_factor * 20));
    return {
      id: concept.id,
      title: concept.title.substring(0, 10),
      retention,
      lastReview: new Date(concept.next_review)
    };
  });

  if (loading) {
    return (
      <>
        <Main>
          <PlateHeader 
            title="MEMORIA" 
            subtitle="Retention Mosaic Grid"
            plateNumber="IV"
          />
          <BrutalistCard borderWidth="1.5" className="p-6">
            <div className="font-mono text-sm text-muted-foreground">Loading reviews...</div>
          </BrutalistCard>
        </Main>
        <ContextPanel title="Review Schedule" />
      </>
    );
  }

  return (
    <>
      <Main>
        <PlateHeader 
          title="MEMORIA" 
          subtitle="Retention Mosaic Grid"
          plateNumber="IV"
        />
        
        <div className="space-y-6">
          {dueReviews.length > 0 && currentReview ? (
            <BrutalistCard borderWidth="1.5" className="p-6">
              <div className="font-serif text-lg mb-4 engraved">
                Review {currentReviewIndex + 1} of {dueReviews.length}
              </div>
              <div className="font-mono text-sm space-y-4">
                <div>
                  <div className="font-semibold mb-2">{currentReview.title}</div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {currentReview.explanation}
                  </p>
                </div>

                <div className="border-t border-border pt-4">
                  <div className="mb-2 font-semibold">Question:</div>
                  <p className="text-muted-foreground mb-4">{currentReview.micro_question}</p>
                  
                  {showAnswer ? (
                    <div className="space-y-4">
                      <div className="border-t border-border pt-4">
                        <div className="mb-2 font-semibold">Answer:</div>
                        <p className="text-muted-foreground mb-4">{currentReview.micro_answer}</p>
                      </div>
                      
                      <div className="flex gap-3">
                        <OrangeAction
                          onClick={() => handleReviewResult("correct")}
                          className="flex-1"
                        >
                          Correct
                        </OrangeAction>
                        <button
                          onClick={() => handleReviewResult("incorrect")}
                          className="flex-1 border border-border px-4 py-2 font-mono text-sm hover:bg-secondary"
                        >
                          Incorrect
                        </button>
                      </div>
                    </div>
                  ) : (
                    <OrangeAction onClick={() => setShowAnswer(true)}>
                      Reveal Answer
                    </OrangeAction>
                  )}
                </div>
              </div>
            </BrutalistCard>
          ) : (
            <BrutalistCard borderWidth="1.5" className="p-6">
              <div className="font-serif text-lg mb-4 engraved">No Reviews Due</div>
              <div className="font-mono text-sm text-muted-foreground">
                All concepts are up to date. Check back tomorrow for new reviews.
              </div>
            </BrutalistCard>
          )}

          {allConcepts.length > 0 && (
            <div>
              <div className="font-mono text-sm text-muted-foreground mb-4">
                Retention levels: Darker = stronger memory. Review items below 60%.
              </div>
              <MemoryGrid cells={memoryCells} />
            </div>
          )}
        </div>
      </Main>

      <ContextPanel title="Review Schedule">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
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
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Statistics</div>
          <div className="font-mono text-xs space-y-1">
            <div>Total Concepts: {allConcepts.length}</div>
            <div>Due Reviews: {dueReviews.length}</div>
            <div>Average Reviews: {allConcepts.length > 0 
              ? Math.round(allConcepts.reduce((sum, c) => sum + c.review_count, 0) / allConcepts.length)
              : 0}
            </div>
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Intervals</div>
          <div className="font-mono text-xs space-y-1">
            <div>1d → 3d → 7d → 14d → 30d</div>
            <div className="text-muted-foreground mt-2">
              Correct answers advance interval. Incorrect resets to 1 day.
            </div>
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}
