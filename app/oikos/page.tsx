"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { FogPanel } from "@/components/FogPanel";
import { EngravedStatue } from "@/components/EngravedStatue";
import { TopNav } from "@/components/TopNav";
import { OrangeAction } from "@/components/OrangeAction";
import { ToastContainer } from "@/components/Toast";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { ExpandableText } from "@/components/ExpandableText";
import { useToast } from "@/hooks/useToast";
import { StoneTablet } from "@/components/ui/StoneTablet";
import { ScrollCard } from "@/components/ui/ScrollCard";
import { WaxSealButton } from "@/components/ui/WaxSealButton";

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
  const [scrollY, setScrollY] = useState(0);
  const { toasts, showToast, removeToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        showToast(`"${item.title}" added to MEMORIA`, "success");
      } else {
        showToast("Failed to add to MEMORIA", "error");
      }
    } catch (error) {
      console.error("Error adding to memoria:", error);
      showToast("Error adding to MEMORIA", "error");
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

  // Split feed items into three panels
  const lectioItems = feedItems.filter(
    (item) => item.type === "book_micro" || item.type === "book_summary"
  );
  const ritualItems = feedItems.filter((item) => item.type === "tiktok");
  const memoriaItems = feedItems.filter((item) => item.type === "puzzle");

  const fogTopOpacity = Math.max(0, Math.min(0.4, 1 - scrollY / 400));
  const fogBottomOpacity = Math.max(0, Math.min(0.4, scrollY / 600));

  return (
    <div
      ref={containerRef}
      className="oikos-bg min-h-screen relative overflow-x-hidden"
    >
      {/* Fog Gradients */}
      <div className="fog-top" style={{ opacity: fogTopOpacity }} />
      <div className="fog-bottom" style={{ opacity: fogBottomOpacity }} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-20"
      >
        {/* Top Navigation */}
        <TopNav />

        {/* Main Content */}
        <div className="relative z-20 pt-32 pb-24 px-8 max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="text-center mb-32 relative"
          >
            {/* Ambient Fog Movement */}
            <motion.div
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* Floating Engraved Statue Behind Text */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
              <EngravedStatue
                imageSrc="/images/classical/statue-login.jpg"
                alt="Classical statue"
                size="lg"
                className="max-w-full max-h-[500px]"
              />
            </div>

            {/* Hero Text */}
            <div className="relative z-10">
              <h1
                className="font-serif text-[96px] font-normal tracking-[0.12em] uppercase mb-8 breathing-glow engraved-text"
                style={{
                  color: "#f5f5dc",
                  textShadow:
                    "2px 2px 4px rgba(0,0,0,0.8), -1px -1px 2px rgba(255,255,255,0.1), 0 0 30px rgba(245, 245, 220, 0.3)",
                }}
              >
                SALVE, SCHOLAR
              </h1>

              {/* Etched Divider */}
              <div className="etched-divider mb-6" />

              <p
                className="font-serif text-sm tracking-[0.2em] uppercase"
                style={{
                  color: "rgba(245, 245, 220, 0.7)",
                  letterSpacing: "0.15em",
                }}
              >
                Initium sapientiae est cognitio sui
              </p>
            </div>
          </motion.div>

          {/* Three Stone Tablets */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
              {[1, 2, 3].map((i) => (
                <StoneTablet key={i} title="Loading..." delay={i * 0.1}>
                  <SkeletonLoader variant="text" lines={3} />
                </StoneTablet>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
              {/* LECTIO Tablet */}
              <StoneTablet
                title="LECTIO"
                subtitle="Reading & Study"
                delay={0.4}
              >
                <div className="space-y-4">
                  {lectioItems.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-[rgba(255,255,255,0.08)] pb-3 last:border-0"
                    >
                      <div
                        className="font-serif text-sm mb-2 font-medium"
                        style={{ color: "rgba(245, 245, 220, 0.9)" }}
                      >
                        <ExpandableText text={item.title} maxLength={40} />
                      </div>
                      <div
                        className="font-mono text-[11px] leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        <ExpandableText text={item.content} maxLength={60} />
                      </div>
                    </div>
                  ))}
                  {lectioItems.length === 0 && (
                    <div
                      className="font-mono text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      No readings today
                    </div>
                  )}
                </div>
              </StoneTablet>

              {/* RITUAL Tablet */}
              <StoneTablet title="RITUAL" subtitle="Daily Practice" delay={0.5}>
                <div className="space-y-4">
                  {ritualItems.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-[rgba(255,255,255,0.08)] pb-3 last:border-0"
                    >
                      <div
                        className="font-serif text-sm mb-2 font-medium"
                        style={{ color: "rgba(245, 245, 220, 0.9)" }}
                      >
                        <ExpandableText text={item.title} maxLength={40} />
                      </div>
                      {item.example && (
                        <div
                          className="font-mono text-[11px] italic leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        >
                          <ExpandableText text={item.example} maxLength={50} />
                        </div>
                      )}
                    </div>
                  ))}
                  {ritualItems.length === 0 && (
                    <div
                      className="font-mono text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      No rituals today
                    </div>
                  )}
                </div>
              </StoneTablet>

              {/* MEMORIA Tablet */}
              <StoneTablet title="MEMORIA" subtitle="Retention" delay={0.6}>
                <div className="space-y-4">
                  {memoriaItems.slice(0, 2).map((item) => (
                    <div
                      key={item.id}
                      className="border-b border-[rgba(255,255,255,0.08)] pb-3 last:border-0"
                    >
                      <div
                        className="font-serif text-sm mb-2 font-medium"
                        style={{ color: "rgba(245, 245, 220, 0.9)" }}
                      >
                        <ExpandableText text={item.title} maxLength={40} />
                      </div>
                    </div>
                  ))}
                  {memoriaItems.length === 0 && (
                    <div
                      className="font-mono text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      No reviews today
                    </div>
                  )}
                </div>
              </StoneTablet>
            </div>
          )}

          {/* Full Feed List - Scroll Cards */}
          <div className="space-y-6 max-w-5xl mx-auto">
            {feedItems.length === 0 && !loading ? (
              <ScrollCard delay={0.7}>
                <div
                  className="font-mono text-sm text-center"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  No feed items available.
                </div>
              </ScrollCard>
            ) : (
              feedItems.map((item, index) => (
                <ScrollCard key={item.id} delay={0.7 + index * 0.08}>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className="font-serif text-xl uppercase tracking-widest engraved-text"
                      style={{ color: "#f5f5dc" }}
                    >
                      {item.title}
                    </div>
                    <div
                      className="font-mono text-[10px] uppercase tracking-wider border border-[rgba(255,255,255,0.1)] px-3 py-1"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {item.type.replace("_", "-")}
                    </div>
                  </div>

                  {/* Etched Divider */}
                  <div className="etched-divider mb-6" />

                  {/* Content */}
                  <div className="space-y-6">
                    <div
                      className="font-mono text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      <ExpandableText text={item.content} maxLength={200} />
                    </div>

                    {item.example && (
                      <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
                        <div
                          className="font-serif text-sm mb-3 uppercase tracking-widest small-caps engraved-text"
                          style={{ color: "rgba(245, 245, 220, 0.8)" }}
                        >
                          Example
                        </div>
                        <p
                          className="text-xs italic leading-relaxed"
                          style={{ color: "rgba(255,255,255,0.6)" }}
                        >
                          {item.example}
                        </p>
                      </div>
                    )}

                    {item.micro_test_q && (
                      <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
                        <div
                          className="font-serif text-sm mb-3 uppercase tracking-widest small-caps engraved-text"
                          style={{ color: "rgba(245, 245, 220, 0.8)" }}
                        >
                          Micro-Test
                        </div>
                        <div className="space-y-4">
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.7)" }}
                          >
                            {item.micro_test_q}
                          </p>

                          {revealedAnswers.has(item.id) ? (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5 }}
                            >
                              <div
                                className="mb-3 font-semibold text-sm engraved-text"
                                style={{ color: "rgba(245, 245, 220, 0.9)" }}
                              >
                                Answer:
                              </div>
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="mb-4 text-sm leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.7)" }}
                              >
                                {item.micro_test_a}
                              </motion.p>
                              {!addedToMemoria.has(item.id) && (
                                <OrangeAction
                                  onClick={() => addToMemoria(item)}
                                >
                                  Add to MEMORIA
                                </OrangeAction>
                              )}
                              {addedToMemoria.has(item.id) && (
                                <div
                                  className="font-mono text-xs"
                                  style={{ color: "rgba(255,255,255,0.5)" }}
                                >
                                  ✓ Added to MEMORIA
                                </div>
                              )}
                            </motion.div>
                          ) : (
                            <WaxSealButton
                              onClick={() => toggleAnswer(item.id)}
                            >
                              Reveal Answer
                            </WaxSealButton>
                          )}
                        </div>
                      </div>
                    )}

                    {!item.micro_test_q && (
                      <div className="border-t border-[rgba(255,255,255,0.08)] pt-6">
                        <OrangeAction onClick={() => addToMemoria(item)}>
                          Add to MEMORIA
                        </OrangeAction>
                      </div>
                    )}
                  </div>
                </ScrollCard>
              ))
            )}
          </div>
        </div>
      </motion.div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
