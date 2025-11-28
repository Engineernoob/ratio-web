import { NextResponse } from "next/server";
import {
  loadHighlights,
  saveHighlight,
  deleteHighlight,
  type Highlight,
} from "@/lib/notes";

export async function GET(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const highlights = loadHighlights(params.bookId);
    return NextResponse.json({ highlights });
  } catch (error) {
    console.error("Error loading highlights:", error);
    return NextResponse.json(
      { error: "Failed to load highlights" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const body = await request.json();
    const highlight = saveHighlight(params.bookId, body);
    return NextResponse.json({ highlight });
  } catch (error) {
    console.error("Error saving highlight:", error);
    return NextResponse.json(
      { error: "Failed to save highlight" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { bookId: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    const highlightId = searchParams.get("id");

    if (!highlightId) {
      return NextResponse.json(
        { error: "Highlight ID required" },
        { status: 400 }
      );
    }

    deleteHighlight(params.bookId, highlightId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting highlight:", error);
    return NextResponse.json(
      { error: "Failed to delete highlight" },
      { status: 500 }
    );
  }
}
