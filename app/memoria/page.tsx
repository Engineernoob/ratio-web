"use client";

import { useState } from "react";
import { TopNavBar } from "@/components/core/TopNavBar";
import { MemoriaHeader } from "@/components/memoria/MemoriaHeader";
import { MemoriaStatsRow } from "@/components/memoria/MemoriaStatsRow";
import { ReviewQueueCard } from "@/components/memoria/ReviewQueueCard";
import { ArcanaMemoriaPanel } from "@/components/memoria/ArcanaMemoriaPanel";
import { ReviewModal } from "@/components/memoria/ReviewModal";
import { ReviewFilters } from "@/components/memoria/ReviewFilters";
import { ArchivumContinuum } from "@/components/memoria/ArchivumContinuum";
import {
  reviewQueue,
  memoryItems,
  archivumStats,
  strongestConcepts,
  weakestConcepts,
  arcanaMemoria,
  statsData,
  ReviewItem,
  MemoryItem,
} from "@/lib/memoriaData";

type FilterType = "BY SOURCE" | "BY DATE ADDED" | "BY MEMORY STRENGTH";

export default function MemoriaPage() {
  const [selectedReview, setSelectedReview] = useState<ReviewItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("BY SOURCE");

  const handleBeginReview = (item: ReviewItem) => {
    setSelectedReview(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReview(null);
  };

  const handleMarkRemembered = () => {
    // For now, just close the modal
    handleCloseModal();
  };

  const handleAgainSoon = () => {
    // For now, just close the modal
    handleCloseModal();
  };

  const handleReviewItem = (item: MemoryItem) => {
    // Find matching review item or create one
    const reviewItem = reviewQueue.find((r) => r.title === item.title) || {
      id: item.id,
      title: item.title,
      description: `Review ${item.title}`,
      origo: item.source,
      tags: [item.source],
      dueNow: true,
      singleTabula: false,
      interrogatum: "Recall and explain this concept.",
      responsumRevelatum: "Provide a clear explanation with examples.",
    };
    handleBeginReview(reviewItem);
  };

  const handleExport = () => {
    console.log("Exporting all notes...");
    // Implement export functionality
  };

  const handleArcanaReview = () => {
    // Start review from arcana panel
    if (reviewQueue.length > 0) {
      handleBeginReview(reviewQueue[0]);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <TopNavBar />

      <div className="max-w-[1920px] mx-auto px-8 py-12 pt-28">
        {/* Header */}
        <MemoriaHeader />

        {/* Stats Row */}
        <MemoriaStatsRow
          itemsDueToday={statsData.itemsDueToday}
          itemsDueLabel={statsData.itemsDueLabel}
          newConceptsLearned={statsData.newConceptsLearned}
          newConceptsLabel={statsData.newConceptsLabel}
          currentReviewStreak={statsData.currentReviewStreak}
          reviewStreakLabel={statsData.reviewStreakLabel}
        />

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Review Queue */}
          <div className="space-y-6">
            <div>
              <h2 className="font-mono text-xs uppercase tracking-wider text-gold mb-4">
                REVIEW QUEUE
              </h2>
              <div>
                {reviewQueue.map((item) => (
                  <ReviewQueueCard
                    key={item.id}
                    item={item}
                    onBeginReview={handleBeginReview}
                  />
                ))}
              </div>
            </div>

            {/* Review Filters */}
            <ReviewFilters
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              memoryItems={memoryItems}
              onReviewItem={handleReviewItem}
            />
          </div>

          {/* Right Column - Arcana Memoriæ */}
          <div>
            <ArcanaMemoriaPanel
              reviewPath={arcanaMemoria.reviewPath}
              timeEstimate={arcanaMemoria.timeEstimate}
              includedItemTypes={arcanaMemoria.includedItemTypes}
              onReview={handleArcanaReview}
            />
          </div>
        </div>

        {/* Archivvm Continuum */}
        <ArchivumContinuum
          stats={archivumStats}
          strongestConcepts={strongestConcepts}
          weakestConcepts={weakestConcepts}
          onExport={handleExport}
        />
      </div>

      {/* Review Modal */}
      <ReviewModal
        item={selectedReview}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onMarkRemembered={handleMarkRemembered}
        onAgainSoon={handleAgainSoon}
      />
    </div>
  );
}
