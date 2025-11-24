import { NextResponse } from "next/server";
import { getBookSummaryByTitle, getBookMicroLessonsByBook } from "@/lib/feed";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get("title");
    
    if (title) {
      const summary = getBookSummaryByTitle(title);
      if (!summary) {
        return NextResponse.json(
          { error: "Book not found" },
          { status: 404 }
        );
      }
      
      const bookName = title.toLowerCase().replace(/\s+/g, "-");
      const microLessons = getBookMicroLessonsByBook(bookName);
      
      return NextResponse.json({ 
        summary,
        microLessons 
      });
    }
    
    return NextResponse.json(
      { error: "Title parameter required" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in books API:", error);
    return NextResponse.json(
      { error: "Failed to get book" },
      { status: 500 }
    );
  }
}

