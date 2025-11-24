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

export interface FeedAssignment {
  id: string;
  type: "external" | "summary" | "chapter-summary" | "micro-lesson";
  source: string;
  difficulty: number;
  priority: number;
  srs_due: string | null;
  chapter?: number;
}

export interface FeedItemRegistry {
  id: string;
  type: "external" | "summary" | "chapter-summary" | "micro-lesson";
  source: string;
  difficulty: number;
  priority: number;
  srs_due: string | null;
  chapter?: number;
  title?: string;
  content?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const FEED_ITEMS_FILE = path.join(DATA_DIR, "feed-items.json");
const FEED_ASSIGNMENTS_FILE = path.join(DATA_DIR, "feed-assignments.json");

// Cache for feed items registry
let feedItemsRegistry: Map<string, FeedItemRegistry> | null = null;

function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

function loadFeedItemsRegistry(): Map<string, FeedItemRegistry> {
  if (feedItemsRegistry) {
    return feedItemsRegistry;
  }

  feedItemsRegistry = new Map();

  try {
    if (fs.existsSync(FEED_ITEMS_FILE)) {
      const data = fs.readFileSync(FEED_ITEMS_FILE, "utf-8");
      const registry = JSON.parse(data);
      for (const item of registry.items || []) {
        feedItemsRegistry.set(item.id, item);
      }
    }
  } catch (error) {
    console.error("Error loading feed items registry:", error);
  }

  return feedItemsRegistry;
}

function getFeedAssignments(): Record<string, (string | FeedAssignment)[]> {
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

function normalizeAssignment(assignment: string | FeedAssignment): FeedAssignment {
  // Backward compatibility: wrap string IDs
  if (typeof assignment === "string") {
    return {
      id: assignment,
      type: "external",
      source: "legacy",
      difficulty: 1,
      priority: 0.5,
      srs_due: null
    };
  }
  return assignment;
}

function resolveFeedItemFromRegistry(assignment: FeedAssignment, today: string): FeedItem | null {
  const registry = loadFeedItemsRegistry();
  const registryItem = registry.get(assignment.id);

  if (!registryItem) {
    // Fallback: try to resolve from original sources
    return resolveFeedItemFallback(assignment, today);
  }

  // Map registry item to FeedItem
  const feedItemType = mapRegistryTypeToFeedType(registryItem.type, registryItem.source);
  
  return {
    id: registryItem.id,
    type: feedItemType,
    title: registryItem.title || "Feed Item",
    content: registryItem.content || "",
    date_assigned: today,
    source: registryItem.source
  };
}

function mapRegistryTypeToFeedType(
  registryType: string,
  source: string
): "tiktok" | "book_summary" | "book_micro" | "puzzle" {
  if (source === "tiktok" || registryType === "external") {
    return "tiktok";
  }
  if (registryType === "summary") {
    return "book_summary";
  }
  if (registryType === "micro-lesson" || registryType === "chapter-summary") {
    return "book_micro";
  }
  return "tiktok"; // default
}

function resolveFeedItemFallback(assignment: FeedAssignment, today: string): FeedItem | null {
  // Fallback resolution for items not in registry
  // This maintains backward compatibility
  
  if (assignment.id.startsWith("tiktok-")) {
    return resolveTikTokItem(assignment, today);
  } else if (assignment.id.startsWith("meditations:")) {
    return resolveMeditationsItem(assignment, today);
  }
  
  return null;
}

function resolveTikTokItem(assignment: FeedAssignment, today: string): FeedItem | null {
  try {
    const tiktokFile = path.join(DATA_DIR, "tiktok_lessons.json");
    if (fs.existsSync(tiktokFile)) {
      const data = fs.readFileSync(tiktokFile, "utf-8");
      const tiktok = JSON.parse(data);
      const lesson = tiktok.lessons?.find((l: TikTokLesson) => l.id === assignment.id);
      if (lesson) {
        return {
          id: lesson.id,
          type: "tiktok",
          title: `${lesson.topic.toUpperCase()}: ${lesson.insight.substring(0, 50)}...`,
          content: lesson.insight,
          example: lesson.example,
          date_assigned: today
        };
      }
    }
  } catch (error) {
    console.error("Error resolving TikTok item:", error);
  }
  return null;
}

function resolveMeditationsItem(assignment: FeedAssignment, today: string): FeedItem | null {
  const parts = assignment.id.split(":");
  
  try {
    if (parts.length === 2 && parts[1] === "summary") {
      // meditations:summary
      const summariesDir = path.join(DATA_DIR, "book_summaries");
      const meditationsFile = path.join(summariesDir, "meditations.json");
      if (fs.existsSync(meditationsFile)) {
        const data = fs.readFileSync(meditationsFile, "utf-8");
        const summary = JSON.parse(data);
        return {
          id: assignment.id,
          type: "book_summary",
          title: `${summary.title} by ${summary.author}`,
          content: summary.key_ideas?.[0] || "Key insight from Meditations",
          date_assigned: today,
          source: summary.title
        };
      }
    } else if (parts.length === 4 && parts[1] === "chapter" && parts[3] === "summary") {
      // meditations:chapter:X:summary
      const chapterNum = parseInt(parts[2]);
      const chapterPath = path.join(DATA_DIR, "books", "meditations", `chapter-${chapterNum}.json`);
      if (fs.existsSync(chapterPath)) {
        const data = fs.readFileSync(chapterPath, "utf-8");
        const chapter: BookChapter = JSON.parse(data);
        return {
          id: assignment.id,
          type: "book_micro",
          title: `Chapter ${chapterNum}: ${chapter.chapter_title}`,
          content: chapter.summary,
          date_assigned: today,
          source: "Meditations"
        };
      }
    } else if (parts.length === 5 && parts[1] === "chapter" && parts[3] === "micro") {
      // meditations:chapter:X:micro:index
      const chapterNum = parseInt(parts[2]);
      const microIndex = parseInt(parts[4]);
      const chapterPath = path.join(DATA_DIR, "books", "meditations", `chapter-${chapterNum}.json`);
      if (fs.existsSync(chapterPath)) {
        const data = fs.readFileSync(chapterPath, "utf-8");
        const chapter: BookChapter = JSON.parse(data);
        if (chapter.micro_lessons && chapter.micro_lessons[microIndex]) {
          const micro = chapter.micro_lessons[microIndex];
          return {
            id: assignment.id,
            type: "book_micro",
            title: micro.title,
            content: micro.core_idea,
            micro_test_q: micro.micro_test_q,
            micro_test_a: micro.micro_test_a,
            date_assigned: today,
            source: "Meditations"
          };
        }
      }
    }
  } catch (error) {
    console.error(`Error resolving Meditations item ${assignment.id}:`, error);
  }
  
  return null;
}

function saveFeedAssignments(assignments: Record<string, FeedAssignment[]>): void {
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

// Utility Functions

export function getItemById(id: string): FeedItemRegistry | undefined {
  const registry = loadFeedItemsRegistry();
  return registry.get(id);
}

export function getFeedItemsForDate(date: string): FeedItem[] {
  const assignments = getFeedAssignments();
  const dateAssignments = assignments[date] || [];
  const today = getTodayDateString();
  
  return dateAssignments
    .map(assignment => {
      const normalized = normalizeAssignment(assignment);
      return resolveFeedItemFromRegistry(normalized, date === today ? today : date);
    })
    .filter((item): item is FeedItem => item !== null);
}

export function getNextSRSItems(count: number): FeedItem[] {
  const registry = loadFeedItemsRegistry();
  const today = getTodayDateString();
  
  const srsItems = Array.from(registry.values())
    .filter(item => item.srs_due && item.srs_due <= today)
    .sort((a, b) => {
      // Sort by priority, then by srs_due
      if (a.priority !== b.priority) {
        return b.priority - a.priority;
      }
      if (a.srs_due && b.srs_due) {
        return a.srs_due.localeCompare(b.srs_due);
      }
      return 0;
    })
    .slice(0, count);
  
  return srsItems
    .map(item => {
      const assignment: FeedAssignment = {
        id: item.id,
        type: item.type,
        source: item.source,
        difficulty: item.difficulty,
        priority: item.priority,
        srs_due: item.srs_due,
        chapter: item.chapter
      };
      return resolveFeedItemFromRegistry(assignment, today);
    })
    .filter((item): item is FeedItem => item !== null);
}

// Main export function (maintains existing API)
export function getDailyFeed(count: number = 5): FeedItem[] {
  const today = getTodayDateString();
  const assignments = getFeedAssignments();
  
  // Check if feed already assigned for today
  if (assignments[today] && assignments[today].length > 0) {
    const resolvedItems = assignments[today]
      .map(assignment => {
        const normalized = normalizeAssignment(assignment);
        return resolveFeedItemFromRegistry(normalized, today);
      })
      .filter((item): item is FeedItem => item !== null);
    
    if (resolvedItems.length > 0) {
      return resolvedItems;
    }
  }

  // Generate new feed
  const feedItems: FeedItem[] = [];
  const registry = loadFeedItemsRegistry();
  
  // Get items by priority
  const allItems = Array.from(registry.values())
    .filter(item => !item.srs_due || item.srs_due > today) // Exclude SRS items
    .sort((a, b) => b.priority - a.priority);
  
  // Select diverse items
  const selected: FeedItemRegistry[] = [];
  const sourcesSeen = new Set<string>();
  
  for (const item of allItems) {
    if (selected.length >= count) break;
    
    // Prefer diversity of sources
    if (!sourcesSeen.has(item.source) || selected.length < 2) {
      selected.push(item);
      sourcesSeen.add(item.source);
    }
  }
  
  // Fill remaining slots
  for (const item of allItems) {
    if (selected.length >= count) break;
    if (!selected.find(s => s.id === item.id)) {
      selected.push(item);
    }
  }
  
  // Convert to FeedItems
  for (const item of selected.slice(0, count)) {
    const assignment: FeedAssignment = {
      id: item.id,
      type: item.type,
      source: item.source,
      difficulty: item.difficulty,
      priority: item.priority,
      srs_due: item.srs_due,
      chapter: item.chapter
    };
    const feedItem = resolveFeedItemFromRegistry(assignment, today);
    if (feedItem) {
      feedItems.push(feedItem);
    }
  }
  
  // Save assignments
  const structuredAssignments: FeedAssignment[] = feedItems.map(item => {
    const registryItem = registry.get(item.id);
    if (registryItem) {
      return {
        id: registryItem.id,
        type: registryItem.type,
        source: registryItem.source,
        difficulty: registryItem.difficulty,
        priority: registryItem.priority,
        srs_due: registryItem.srs_due,
        chapter: registryItem.chapter
      };
    }
    // Fallback
    return {
      id: item.id,
      type: "external",
      source: item.type,
      difficulty: 1,
      priority: 0.5,
      srs_due: null
    };
  });
  
  const structuredAssignmentsRecord: Record<string, FeedAssignment[]> = {
    ...assignments,
    [today]: structuredAssignments
  };
  
  // Convert any remaining string assignments to structured format
  for (const date in structuredAssignmentsRecord) {
    structuredAssignmentsRecord[date] = structuredAssignmentsRecord[date].map(assignment => {
      return normalizeAssignment(assignment);
    });
  }
  
  saveFeedAssignments(structuredAssignmentsRecord);
  
  return feedItems;
}

// Legacy exports (for backward compatibility)
export function getAllTikTokLessons(): TikTokLesson[] {
  try {
    const tiktokFile = path.join(DATA_DIR, "tiktok_lessons.json");
    if (fs.existsSync(tiktokFile)) {
      const data = fs.readFileSync(tiktokFile, "utf-8");
      return JSON.parse(data).lessons || [];
    }
  } catch (error) {
    console.error("Error reading TikTok lessons:", error);
  }
  return [];
}

export function getAllBookSummaries(): BookSummary[] {
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

export function getBookSummaryByTitle(title: string): BookSummary | null {
  const summaries = getAllBookSummaries();
  return summaries.find(s => s.title.toLowerCase() === title.toLowerCase()) || null;
}

export function getBookMicroLessonsByBook(bookName: string): MicroLesson[] {
  try {
    const booksDir = path.join(DATA_DIR, "books");
    if (!fs.existsSync(booksDir)) return [];
    
    const bookPath = path.join(booksDir, bookName);
    if (!fs.existsSync(bookPath)) return [];
    
    const microLessons: MicroLesson[] = [];
    const chapterFiles = fs.readdirSync(bookPath).filter(f => f.endsWith(".json"));
    
    for (const chapterFile of chapterFiles) {
      try {
        const data = fs.readFileSync(path.join(bookPath, chapterFile), "utf-8");
        const chapter: BookChapter = JSON.parse(data);
        if (chapter.micro_lessons) {
          microLessons.push(...chapter.micro_lessons);
        }
      } catch (error) {
        console.error(`Error reading ${chapterFile}:`, error);
      }
    }
    
    return microLessons;
  } catch (error) {
    console.error("Error reading book micro-lessons:", error);
    return [];
  }
}
