"use client";

import { useEffect, useState } from "react";
import { TopNavBar } from "@/components/core/TopNavBar";
import { Main } from "@/components/Main";
import { ToastContainer } from "@/components/core/Toast";
import { useToast } from "@/hooks/useToast";
import {
  AnimatedBackground,
  HeroSection,
  MinimalRow,
  ProgressWidget,
} from "@/components/home";

interface FeedItem {
  id: string;
  type: string;
  title: string;
  content: string;
  micro_test_q?: string;
  micro_test_a?: string;
  source?: string;
  date_assigned?: string;
}

export default function OikosPage() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toasts, showToast, removeToast } = useToast();

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
      }
    } catch (e) {
      console.error("Feed error:", e);
    } finally {
      setLoading(false);
    }
  };

  // Calculate progress from feed items
  const lectioItems = feedItems.filter((i) =>
    ["book_micro", "book_summary"].includes(i.type)
  );
  const ritualItems = feedItems.filter((i) => i.type === "tiktok");
  const memoriaItems = feedItems.filter((i) => i.type === "puzzle");

  const progressItems = [
    {
      label: "Lectio",
      value: Math.min(lectioItems.length, 3),
      max: 3,
    },
    {
      label: "Rituales",
      value: Math.min(ritualItems.length, 2),
      max: 2,
    },
    {
      label: "Memoria",
      value: Math.min(memoriaItems.length, 5),
      max: 5,
    },
  ];

  // Get content for each row
  const lectioContent =
    lectioItems.length > 0
      ? lectioItems[0].content.length > 120
        ? `${lectioItems[0].content.slice(0, 120)}...`
        : lectioItems[0].content
      : "Continue your reading journey with today's selected texts.";

  const ritualContent =
    ritualItems.length > 0
      ? ritualItems[0].content.length > 120
        ? `${ritualItems[0].content.slice(0, 120)}...`
        : ritualItems[0].content
      : "Engage with today's practice and reflection exercises.";

  const memoriaContent =
    memoriaItems.length > 0
      ? memoriaItems[0].content.length > 120
        ? `${memoriaItems[0].content.slice(0, 120)}...`
        : memoriaItems[0].content
      : "Review and strengthen your knowledge retention.";

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <AnimatedBackground />
        <TopNavBar />
        <div className="relative z-10 pt-20">
          <Main>
            <div className="text-center py-32">
              <div className="font-serif text-xl mb-4 text-[#e8e6e1]">
                Loading OIKOS...
              </div>
              <div className="font-mono text-sm text-[#888888]">
                Preparing your daily feed...
              </div>
            </div>
          </Main>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <AnimatedBackground />
      <TopNavBar />

      <div className="relative z-10 pt-20">
        <Main>
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
            {/* Hero Section */}
            <HeroSection />

            {/* Three Minimal Rows */}
            <div className="space-y-0 mb-24">
              <MinimalRow
                title="LECTIO"
                content={lectioContent}
                href="/bibliotheca"
                cta={lectioItems.length > 0 ? "Continue →" : "Begin →"}
                delay={0.1}
              />
              <MinimalRow
                title="RITUAL"
                content={ritualContent}
                href="/oikos"
                cta={ritualItems.length > 0 ? "Continue →" : "Begin →"}
                delay={0.2}
              />
              <MinimalRow
                title="MEMORIA"
                content={memoriaContent}
                href="/memoria"
                cta={memoriaItems.length > 0 ? "Continue →" : "Begin →"}
                delay={0.3}
              />
            </div>

            {/* Progress Widget - Right Aligned */}
            <div className="flex justify-end">
              <ProgressWidget items={progressItems} />
            </div>
          </div>
        </Main>
      </div>

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
