import type { MemoryCard, ReviewQuality } from "./types";
import { calculateReview } from "./review";
import { updateCard } from "./storage";

/**
 * Map quality rating to ReviewQuality
 */
export function mapQualityToReviewQuality(
  quality: "easy" | "good" | "hard" | "forgot"
): ReviewQuality {
  switch (quality) {
    case "easy":
      return 5;
    case "good":
      return 4;
    case "hard":
      return 3;
    case "forgot":
      return 0;
    default:
      return 3;
  }
}

/**
 * Review a card and save the result
 */
export async function reviewCard(
  card: MemoryCard,
  quality: "easy" | "good" | "hard" | "forgot"
): Promise<MemoryCard> {
  const reviewQuality = mapQualityToReviewQuality(quality);
  const result = calculateReview(card, reviewQuality);

  // Save updated card
  updateCard(result.card);

  return result.card;
}

/**
 * Get cards due for review today
 */
export function getDueCardsToday(cards: MemoryCard[]): MemoryCard[] {
  const today = new Date().toISOString().split("T")[0];
  return cards.filter((card) => card.due <= today);
}

/**
 * Calculate statistics from cards
 */
export function calculateStats(cards: MemoryCard[]) {
  const today = new Date().toISOString().split("T")[0];
  const dueToday = getDueCardsToday(cards);

  const totalCards = cards.length;
  const newCards = cards.filter((c) => c.stage === "new").length;
  const learningCards = cards.filter((c) => c.stage === "learning").length;
  const reviewCards = cards.filter((c) => c.stage === "review").length;
  const masteredCards = cards.filter((c) => c.stage === "mastered").length;

  const totalReviews = cards.reduce((sum, c) => sum + c.totalReviews, 0);
  const averageEase =
    cards.length > 0
      ? cards.reduce((sum, c) => sum + c.ease, 0) / cards.length
      : 0;

  const currentStreak = Math.max(...cards.map((c) => c.consecutiveCorrect), 0);

  // Calculate accuracy (simplified: based on consecutive correct vs total reviews)
  const accuracy =
    totalReviews > 0
      ? (cards.reduce((sum, c) => sum + c.consecutiveCorrect, 0) /
          totalReviews) *
        100
      : 0;

  // Difficulty distribution
  const difficultyDistribution = {
    easy: cards.filter((c) => c.ease >= 2.2).length,
    medium: cards.filter((c) => c.ease >= 1.7 && c.ease < 2.2).length,
    hard: cards.filter((c) => c.ease < 1.7).length,
  };

  return {
    totalCards,
    dueToday: dueToday.length,
    newCards,
    learningCards,
    reviewCards,
    masteredCards,
    totalReviews,
    averageEase: Math.round(averageEase * 100) / 100,
    currentStreak,
    accuracy: Math.round(accuracy * 10) / 10,
    difficultyDistribution,
  };
}
