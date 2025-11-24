import fs from "fs";
import path from "path";

export interface TikTokLesson {
  id: string;
  topic: string;
  insight: string;
  example?: string;
}

export interface BookSummary {
  title: string;
  author: string;
  year?: number;
  key_ideas: string[];
  micro_lessons?: MicroLesson[];
}

export interface MicroLesson {
  id: string;
  title: string;
  core_idea: string;
  micro_test_q: string;
  micro_test_a: string;
}

export interface BookChapter {
  chapter: number;
  chapter_title: string;
  summary: string;
  micro_lessons: MicroLesson[];
}

export interface FeedItem {
  id: string;
  type: "tiktok" | "book_summary" | "book_micro" | "puzzle";
  title: string;
  content: string;
  example?: string;
  micro_test_q?: string;
  micro_test_a?: string;
  source?: string;
  date_assigned: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const TIKTOK_FILE = path.join(DATA_DIR, "tiktok_lessons.json");
const FEED_ASSIGNMENTS_FILE = path.join(DATA_DIR, "feed-assignments.json");

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function getTikTokLessons(): TikTokLesson[] {
  try {
    if (fs.existsSync(TIKTOK_FILE)) {
      const data = fs.readFileSync(TIKTOK_FILE, "utf-8");
      return JSON.parse(data).lessons || [];
    }
  } catch (error) {
    console.error("Error reading TikTok lessons:", error);
  }
  return [];
}

function getBookSummaries(): BookSummary[] {
  try {
    const summariesDir = path.join(DATA_DIR, "book_summaries");
    if (!fs.existsSync(summariesDir)) return [];
    
    const files = fs.readdirSync(summariesDir).filter(f => f.endsWith(".json"));
    const summaries: BookSummary[] = [];
    
    for (const file of files) {
      try {
        const data = fs.readFileSync(path.join(summariesDir, file), "utf-8");
        summaries.push(JSON.parse(data));
      } catch (error) {
        console.error(`Error reading ${file}:`, error);
      }
    }
    
    return summaries;
  } catch (error) {
    console.error("Error reading book summaries:", error);
    return [];
  }
}

function getBookMicroLessons(): MicroLesson[] {
  try {
    const booksDir = path.join(DATA_DIR, "books");
    if (!fs.existsSync(booksDir)) return [];
    
    const microLessons: MicroLesson[] = [];
    const bookDirs = fs.readdirSync(booksDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    for (const bookDir of bookDirs) {
      const bookPath = path.join(booksDir, bookDir);
      const chapterFiles = fs.readdirSync(bookPath).filter(f => f.endsWith(".json"));
      
      for (const chapterFile of chapterFiles) {
        try {
          const data = fs.readFileSync(path.join(bookPath, chapterFile), "utf-8");
          const chapter: BookChapter = JSON.parse(data);
          if (chapter.micro_lessons) {
            microLessons.push(...chapter.micro_lessons.map(ml => ({
              ...ml,
              id: `${bookDir}-${chapter.chapter}-${ml.id}`
            })));
          }
        } catch (error) {
          console.error(`Error reading ${chapterFile}:`, error);
        }
      }
    }
    
    return microLessons;
  } catch (error) {
    console.error("Error reading book micro-lessons:", error);
    return [];
  }
}

function getFeedAssignments(): Record<string, string[]> {
  try {
    if (fs.existsSync(FEED_ASSIGNMENTS_FILE)) {
      const data = fs.readFileSync(FEED_ASSIGNMENTS_FILE, "utf-8");
      return JSON.parse(data).assignments || {};
    }
  } catch (error) {
    console.error("Error reading feed assignments:", error);
  }
  return {};
}

function saveFeedAssignments(assignments: Record<string, string[]>): void {
  try {
    fs.writeFileSync(
      FEED_ASSIGNMENTS_FILE,
      JSON.stringify({ assignments }, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.error("Error saving feed assignments:", error);
  }
}

export function getDailyFeed(count: number = 5): FeedItem[] {
  const today = getTodayDateString();
  const assignments = getFeedAssignments();
  
  // Check if feed already assigned for today
  if (assignments[today] && assignments[today].length > 0) {
    return assignments[today].map(id => {
      // Reconstruct from stored IDs (simplified - in production, store full objects)
      return {
        id,
        type: "tiktok" as const,
        title: "Daily Feed Item",
        content: "Content",
        date_assigned: today
      };
    });
  }

  const feedItems: FeedItem[] = [];
  
  // Get TikTok lessons
  const tiktokLessons = getTikTokLessons();
  const selectedTiktok = tiktokLessons
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(2, count));
  
  for (const lesson of selectedTiktok) {
    feedItems.push({
      id: lesson.id,
      type: "tiktok",
      title: `${lesson.topic.toUpperCase()}: ${lesson.insight.substring(0, 50)}...`,
      content: lesson.insight,
      example: lesson.example,
      date_assigned: today
    });
  }
  
  // Get book summaries
  const summaries = getBookSummaries();
  const selectedSummary = summaries[Math.floor(Math.random() * summaries.length)];
  if (selectedSummary && feedItems.length < count) {
    feedItems.push({
      id: `summary-${selectedSummary.title.toLowerCase().replace(/\s+/g, "-")}`,
      type: "book_summary",
      title: `${selectedSummary.title} by ${selectedSummary.author}`,
      content: selectedSummary.key_ideas[0] || "Key insight from book",
      date_assigned: today,
      source: selectedSummary.title
    });
  }
  
  // Get book micro-lessons
  const bookMicros = getBookMicroLessons();
  const selectedMicros = bookMicros
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(2, count - feedItems.length));
  
  for (const micro of selectedMicros) {
    feedItems.push({
      id: micro.id,
      type: "book_micro",
      title: micro.title,
      content: micro.core_idea,
      micro_test_q: micro.micro_test_q,
      micro_test_a: micro.micro_test_a,
      date_assigned: today
    });
  }
  
  // Shuffle and limit to count
  const shuffled = feedItems.sort(() => Math.random() - 0.5).slice(0, count);
  
  // Save assignments
  assignments[today] = shuffled.map(item => item.id);
  saveFeedAssignments(assignments);
  
  return shuffled;
}

export function getAllTikTokLessons(): TikTokLesson[] {
  return getTikTokLessons();
}

export function getAllBookSummaries(): BookSummary[] {
  return getBookSummaries();
}

export function getBookSummaryByTitle(title: string): BookSummary | null {
  const summaries = getBookSummaries();
  return summaries.find(s => s.title.toLowerCase() === title.toLowerCase()) || null;
}

export function getBookMicroLessonsByBook(bookName: string): MicroLesson[] {
  const allMicros = getBookMicroLessons();
  return allMicros.filter(m => m.id.startsWith(bookName.toLowerCase()));
}

