import { NextResponse } from "next/server";
import { loadPuzzle } from "@/lib/puzzles/loader";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const puzzle = loadPuzzle(params.id);
    if (!puzzle) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
    }
    return NextResponse.json({ puzzle });
  } catch (error) {
    console.error("Error loading puzzle:", error);
    return NextResponse.json(
      { error: "Failed to load puzzle" },
      { status: 500 }
    );
  }
}
