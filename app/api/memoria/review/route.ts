import { NextResponse } from "next/server";
import { getCardById, updateCard } from "@/lib/memoria/storage";
import { calculateReview } from "@/lib/memoria/review";
import type { ReviewQuality } from "@/lib/memoria/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cardId, quality } = body;

    // Validate inputs
    if (!cardId || quality === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: cardId, quality" },
        { status: 400 }
      );
    }

    // Validate quality range
    if (quality < 0 || quality > 5 || !Number.isInteger(quality)) {
      return NextResponse.json(
        { error: "Quality must be an integer between 0 and 5" },
        { status: 400 }
      );
    }

    // Load card
    const card = getCardById(cardId);
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    // Calculate review result
    const result = calculateReview(card, quality as ReviewQuality);

    // Update card in storage
    const updatedCard = updateCard(result.card);

    return NextResponse.json({
      card: updatedCard,
      review: {
        newInterval: result.newInterval,
        newDue: result.newDue,
        newEase: result.newEase,
        newStage: result.newStage,
      },
    });
  } catch (error) {
    console.error("Error reviewing card:", error);
    return NextResponse.json(
      { error: "Failed to process review" },
      { status: 500 }
    );
  }
}
