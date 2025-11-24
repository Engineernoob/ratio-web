"use client";

import { useEffect, useState } from "react";
import { PlateHeader } from "@/components/PlateHeader";
import { BrutalistCard } from "@/components/BrutalistCard";
import { ContextPanel } from "@/components/ContextPanel";
import { Main } from "@/components/Main";
import { OrangeAction } from "@/components/OrangeAction";

interface FeedItem {
  id: string;
  type: "tiktok" | "book_summary" | "book_micro" | "puzzle";
  title: string;
  content: string;
  example?: string;
  micro_test_q?: string;
  micro_test_a?: string;
  source?: string;
  date_assigned: string;
}

export default function OikosPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(
    new Set()
  );
  const [addedToMemoria, setAddedToMemoria] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await fetch("/api/feed?count=5");
      const data = await response.json();
      if (data.feed) {
        setFeedItems(data.feed);
        // Auto-add items with micro-tests to memoria
        data.feed.forEach((item: FeedItem) => {
          if (item.micro_test_q) {
            addToMemoria(item);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching feed:", error);
    } finally {
      setLoading(false);
    }
  };

  const addToMemoria = async (item: FeedItem) => {
    if (addedToMemoria.has(item.id)) return;

    try {
      const response = await fetch("/api/memoria", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "add",
          concept: {
            title: item.title,
            explanation: item.content,
            micro_question:
              item.micro_test_q ||
              `What is the key insight from: ${item.title}?`,
            micro_answer: item.micro_test_a || item.content,
            source:
              item.type === "tiktok"
                ? "tiktok"
                : item.type === "book_summary"
                ? "book_summary"
                : item.type === "book_micro"
                ? "book"
                : "puzzle",
          },
        }),
      });

      if (response.ok) {
        setAddedToMemoria((prev) => new Set(prev).add(item.id));
      }
    } catch (error) {
      console.error("Error adding to memoria:", error);
    }
  };

  const toggleAnswer = (itemId: string) => {
    setRevealedAnswers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "tiktok":
        return "MICRO-INSIGHT";
      case "book_summary":
        return "BOOK SUMMARY";
      case "book_micro":
        return "BOOK LESSON";
      case "puzzle":
        return "PUZZLE";
      default:
        return "LESSON";
    }
  };

  if (loading) {
    return (
      <>
        <Main>
          <PlateHeader
            title="OIKOS"
            subtitle="Daily Ritual & Lessons"
            plateNumber="I"
          />
          <BrutalistCard borderWidth="1.5" className="p-6">
            <div className="font-mono text-sm text-muted-foreground">
              Loading today's feed...
            </div>
          </BrutalistCard>
        </Main>
        <ContextPanel title="Daily Ritual">
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
        <PlateHeader
          title="OIKOS"
          subtitle="Daily Knowledge Feed"
          plateNumber="I"
        />

        <div className="space-y-6">
          {feedItems.length === 0 ? (
            <BrutalistCard borderWidth="1.5" className="p-6">
              <div className="font-mono text-sm text-muted-foreground">
                No feed items available.
              </div>
            </BrutalistCard>
          ) : (
            feedItems.map((item, index) => (
              <BrutalistCard
                key={item.id}
                borderWidth={index === 0 ? "1.5" : "1"}
                className="p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="font-serif text-lg engraved">
                    {item.title}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground border border-border px-2 py-1">
                    {getTypeLabel(item.type)}
                  </div>
                </div>

                <div className="font-mono text-sm space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>

                  {item.example && (
                    <div className="border-t border-border pt-4">
                      <div className="font-serif text-sm mb-2 engraved">
                        Example
                      </div>
                      <p className="text-muted-foreground italic text-xs">
                        {item.example}
                      </p>
                    </div>
                  )}

                  {item.micro_test_q && (
                    <div className="border-t border-border pt-4">
                      <div className="font-serif text-sm mb-2 engraved">
                        Micro-Test
                      </div>
                      <div className="space-y-3">
                        <p className="text-muted-foreground">
                          {item.micro_test_q}
                        </p>

                        {revealedAnswers.has(item.id) ? (
                          <div>
                            <div className="mb-2 font-semibold">Answer:</div>
                            <p className="text-muted-foreground mb-3">
                              {item.micro_test_a}
                            </p>
                            {!addedToMemoria.has(item.id) && (
                              <OrangeAction onClick={() => addToMemoria(item)}>
                                Add to MEMORIA
                              </OrangeAction>
                            )}
                            {addedToMemoria.has(item.id) && (
                              <div className="font-mono text-xs text-muted-foreground">
                                ✓ Added to MEMORIA
                              </div>
                            )}
                          </div>
                        ) : (
                          <OrangeAction onClick={() => toggleAnswer(item.id)}>
                            Reveal Answer
                          </OrangeAction>
                        )}
                      </div>
                    </div>
                  )}

                  {!item.micro_test_q && (
                    <div className="border-t border-border pt-4">
                      <OrangeAction onClick={() => addToMemoria(item)}>
                        Add to MEMORIA
                      </OrangeAction>
                    </div>
                  )}
                </div>
              </BrutalistCard>
            ))
          )}
        </div>
      </Main>

      <ContextPanel title="Daily Feed">
        <BrutalistCard borderWidth="1" className="p-4 mb-4">
          <div className="font-serif text-sm mb-2 engraved">Today's Items</div>
          <div className="font-mono text-xs space-y-1">
            {feedItems.length} items loaded
          </div>
          <div className="font-mono text-xs text-muted-foreground mt-2 space-y-1">
            {feedItems.map((item, idx) => (
              <div key={item.id}>
                {idx + 1}. {getTypeLabel(item.type)}
              </div>
            ))}
          </div>
        </BrutalistCard>

        <BrutalistCard borderWidth="1" className="p-4">
          <div className="font-serif text-sm mb-2 engraved">Sources</div>
          <div className="font-mono text-xs space-y-1">
            <div>• TikTok Lessons</div>
            <div>• Book Summaries</div>
            <div>• Book Micro-Lessons</div>
            <div>• Puzzles</div>
          </div>
        </BrutalistCard>
      </ContextPanel>
    </>
  );
}
