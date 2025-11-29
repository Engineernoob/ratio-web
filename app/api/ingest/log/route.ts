import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKS_DIR = path.join(DATA_DIR, "books");

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter required" },
        { status: 400 }
      );
    }

    const bookDir = path.join(BOOKS_DIR, slug);
    const logPath = path.join(bookDir, "log.json");

    if (!fs.existsSync(logPath)) {
      return NextResponse.json(
        { error: "Ingestion log not found" },
        { status: 404 }
      );
    }

    const logData = fs.readFileSync(logPath, "utf-8");
    const log = JSON.parse(logData);

    return NextResponse.json(log);
  } catch (error: any) {
    console.error("Error loading ingestion log:", error);
    return NextResponse.json(
      { error: `Failed to load log: ${error.message}` },
      { status: 500 }
    );
  }
}
