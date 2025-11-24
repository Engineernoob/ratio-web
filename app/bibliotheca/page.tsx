"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookPlate } from "@/components/BookPlate";
import { EngravedStatue } from "@/components/EngravedStatue";
import { FogPanel } from "@/components/FogPanel";
import { ContextPanel } from "@/components/ContextPanel";
import { Main } from "@/components/Main";

interface BookSummary {
  title: string;
  author: string;
  year?: number;
  key_ideas: string[];
}

export default function BibliothecaPage() {
  const [summaries, setSummaries] = useState<BookSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const response = await fetch("/api/feed", { method: "POST" });
      const data = await response.json();
      if (data.summaries) {
        setSummaries(data.summaries);
      }
    } catch (error) {
      console.error("Error fetching summaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const getSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, "-");
  };

  const getImageSrc = (slug: string) => {
    return `/images/classical/${slug}.jpg`;
  };

  if (loading) {
    return (
      <>
        <Main>
          <FogPanel className="card-padding">
            <div className="font-mono text-sm text-muted-foreground">
              Loading library...
            </div>
          </FogPanel>
        </Main>
        <ContextPanel title="Library">
          <div className="font-mono text-xs text-muted-foreground">Loading...</div>
        </ContextPanel>
      </>
    );
  }

  return (
    <>
      <Main className="scroll-fade-top scroll-fade-bottom">
        {/* Ritual Header with Architectural Engraving Background */}
        <div className="relative mb-16 section-spacing">
          {/* Muted architectural engraving behind header */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none">
            <EngravedStatue
              imageSrc="/images/classical/temple.jpg"
              alt="Classical temple"
              size="lg"
              className="max-w-full max-h-[400px]"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 pb-8 border-b border-border"
          >
            <h1 className="font-serif text-[64px] font-normal tracking-[0.08em] uppercase mb-4 fade-fog-in">
              BIBLIOTHECA
            </h1>
            <p className="text-xs opacity-70 font-mono mb-12">
              The eternal archive of Ratio. Choose a volume to open.
            </p>
          </motion.div>
        </div>

        {/* Floating Grid of Books */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {summaries.map((book, index) => {
            const slug = getSlug(book.title);
            return (
              <motion.div
                key={book.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <BookPlate
                  title={book.title}
                  author={book.author}
                  slug={slug}
                  imageSrc={getImageSrc(slug)}
                  year={book.year}
                />
              </motion.div>
            );
          })}
        </div>

        {summaries.length === 0 && (
          <FogPanel className="card-padding">
            <div className="font-mono text-sm text-muted-foreground">
              No books available in the library.
            </div>
          </FogPanel>
        )}
      </Main>

      <ContextPanel title="Library">
        <FogPanel className="card-padding mb-4">
          <div className="font-serif text-sm mb-2 engraved">Collection</div>
          <div className="font-mono text-xs space-y-1">
            {summaries.length} {summaries.length === 1 ? "volume" : "volumes"} available
          </div>
        </FogPanel>

        <FogPanel className="card-padding mb-4">
          <div className="font-serif text-sm mb-2 engraved">Volumes</div>
          <div className="font-mono text-xs text-muted-foreground space-y-1">
            {summaries.map((book) => (
              <div key={book.title}>• {book.title}</div>
            ))}
          </div>
        </FogPanel>

        <FogPanel className="card-padding">
          <div className="font-serif text-sm mb-2 engraved">Instructions</div>
          <div className="font-mono text-xs text-muted-foreground">
            Click a volume to view its summary, key ideas, chapters, and micro-lessons.
          </div>
        </FogPanel>
      </ContextPanel>
    </>
  );
}
