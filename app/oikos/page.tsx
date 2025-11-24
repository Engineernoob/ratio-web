"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
      const today = new Date().toISOString().split("T")[0];
      const response = await fetch(`/api/feed?date=${today}`);
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

  // Split feed items into three panels
  const lectioItems = feedItems.filter(
    (item) => item.type === "book_micro" || item.type === "book_summary"
  );
  const ritualItems = feedItems.filter((item) => item.type === "tiktok");
  const memoriaItems = feedItems.filter((item) => item.type === "puzzle");

  return (
    <>
      <Main>
        {/* Greeting Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 pb-8 border-b border-border"
        >
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="font-serif text-6xl font-bold salve-glow engraved mb-4"
          >
            SALVE, SCHOLAR
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-mono text-sm text-muted-foreground tracking-wider"
          >
            Initium sapientiae est cognitio sui
          </motion.p>
        </motion.div>

        {/* Three Floating Panels */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {/* Lectio Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 opacity-10 dither grain">
              <div className="w-full h-full bg-gradient-to-br from-muted/20 to-background" />
            </div>
            <BrutalistCard borderWidth="1.5" className="p-6 floating-panel">
              <div className="font-serif text-lg mb-4 engraved engrave">
                LECTIO
              </div>
              <div className="font-mono text-xs text-muted-foreground mb-4">
                Reading & Study
              </div>
              <div className="space-y-3">
                {lectioItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="border-b border-border pb-2">
                    <div className="font-mono text-xs font-semibold mb-1">
                      {item.title.substring(0, 40)}...
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground">
                      {item.content.substring(0, 60)}...
                    </div>
                  </div>
                ))}
                {lectioItems.length === 0 && (
                  <div className="font-mono text-xs text-muted-foreground">
                    No readings today
                  </div>
                )}
              </div>
            </BrutalistCard>
          </motion.div>

          {/* Ritual Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 opacity-10 dither grain">
              <div className="w-full h-full bg-gradient-to-br from-muted/20 to-background" />
            </div>
            <BrutalistCard borderWidth="1.5" className="p-6 floating-panel">
              <div className="font-serif text-lg mb-4 engraved engrave">
                RITUAL
              </div>
              <div className="font-mono text-xs text-muted-foreground mb-4">
                Daily Practice
              </div>
              <div className="space-y-3">
                {ritualItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="border-b border-border pb-2">
                    <div className="font-mono text-xs font-semibold mb-1">
                      {item.title.substring(0, 40)}...
                    </div>
                    {item.example && (
                      <div className="font-mono text-[10px] text-muted-foreground italic">
                        {item.example.substring(0, 50)}...
                      </div>
                    )}
                  </div>
                ))}
                {ritualItems.length === 0 && (
                  <div className="font-mono text-xs text-muted-foreground">
                    No rituals today
                  </div>
                )}
              </div>
            </BrutalistCard>
          </motion.div>

          {/* Memoria Panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 opacity-10 dither grain">
              <div className="w-full h-full bg-gradient-to-br from-muted/20 to-background" />
            </div>
            <BrutalistCard borderWidth="1.5" className="p-6 floating-panel">
              <div className="font-serif text-lg mb-4 engraved engrave">
                MEMORIA
              </div>
              <div className="font-mono text-xs text-muted-foreground mb-4">
                Retention
              </div>
              <div className="space-y-3">
                {memoriaItems.slice(0, 2).map((item) => (
                  <div key={item.id} className="border-b border-border pb-2">
                    <div className="font-mono text-xs font-semibold mb-1">
                      {item.title.substring(0, 40)}...
                    </div>
                  </div>
                ))}
                {memoriaItems.length === 0 && (
                  <div className="font-mono text-xs text-muted-foreground">
                    No reviews today
                  </div>
                )}
              </div>
            </BrutalistCard>
          </motion.div>
        </div>

        {/* Full Feed Items */}
        <div className="space-y-6 scholar-content">
          {feedItems.length === 0 ? (
            <BrutalistCard borderWidth="1.5" className="p-6">
              <div className="font-mono text-sm text-muted-foreground">
                No feed items available.
              </div>
            </BrutalistCard>
          ) : (
            feedItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <BrutalistCard
                  borderWidth={index === 0 ? "1.5" : "1"}
                  className="p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="font-serif text-lg engraved engrave">
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
              </motion.div>
            ))
          )}
        </div>
      </Main>

      <ContextPanel title="Daily Ritual">
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
