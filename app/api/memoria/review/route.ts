import { NextResponse } from "next/server";
import { reviewCard } from "@/lib/memoria/utils";
import { getCardById } from "@/lib/memoria/storage";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cardId, quality } = body;

    if (!cardId || !quality) {
      return NextResponse.json(
        { error: "Missing cardId or quality" },
        { status: 400 }
      );
    }

    const card = getCardById(cardId);
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    const updatedCard = await reviewCard(card, quality);

    return NextResponse.json({ card: updatedCard });
  } catch (error) {
    console.error("Error reviewing card:", error);
    return NextResponse.json(
      { error: "Failed to review card" },
      { status: 500 }
    );
  }
}
