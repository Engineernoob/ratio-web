# RATIO Knowledge Streams

This document describes the four knowledge streams implemented in RATIO.

## Stream 1: TikTok-Speed Micro-Lessons

**Location:** `/data/tiktok_lessons.json`

**Format:**
```json
{
  "id": "tiktok-1",
  "topic": "logic",
  "insight": "Short atomic idea.",
  "example": "Optional short example."
}
```

**Features:**
- Very short, atomic insights
- Quick to consume
- Auto-added to daily feed
- Can include micro-tests

## Stream 2: Blinkist/Headway-Style Book Summaries

**Location:** `/data/book_summaries/*.json`

**Format:**
```json
{
  "title": "Meditations",
  "author": "Marcus Aurelius",
  "year": 180,
  "key_ideas": ["Idea 1", "Idea 2"],
  "micro_lessons": [...]
}
```

**Features:**
- Key ideas from books
- Author and publication year
- Optional micro-lessons
- Accessible via BIBLIOTHECA

## Stream 3: Full Book Ingestion → Micro-Lessons Pipeline

**Location:** `/data/books/<bookname>/*.json`

**Format:**
```json
{
  "chapter": 1,
  "chapter_title": "...",
  "summary": "...",
  "micro_lessons": [
    {
      "title": "...",
      "core_idea": "...",
      "micro_test_q": "...",
      "micro_test_a": "..."
    }
  ]
}
```

**Features:**
- Chapter-by-chapter breakdown
- Each chapter generates micro-lessons
- Micro-lessons include tests
- Auto-extracted to daily feed

## Stream 4: Brilliant-Style Interactive Puzzles

**Location:** `/data/puzzles/*.json`

**Format:**
```json
[
  {
    "id": "logic-1",
    "type": "mcq",
    "prompt": "If all X are Y...",
    "choices": ["A", "B", "C"],
    "answer": 0,
    "explanation": "Why."
  },
  {
    "type": "pattern",
    "prompt": "Identify the pattern."
  }
]
```

**Features:**
- Multiple choice questions
- Pattern recognition
- Ratio problems
- Completed puzzles auto-added to MEMORIA

## Data Flow

```
TikTok Lessons → OIKOS Feed → MEMORIA
Book Summaries → BIBLIOTHECA → MEMORIA
Book Micro-Lessons → OIKOS Feed → MEMORIA
Puzzles → LABORATORIVM → MEMORIA (if correct)
```

## Adding Content

### TikTok Lessons
Edit `/data/tiktok_lessons.json` and add new lesson objects.

### Book Summaries
Create new JSON files in `/data/book_summaries/` following the format.

### Book Chapters
Create book directories in `/data/books/<bookname>/` and add chapter JSON files.

### Puzzles
Create new JSON files in `/data/puzzles/` with puzzle arrays.

## Integration Points

- **OIKOS**: Pulls from all 4 streams for daily feed (3-5 items)
- **BIBLIOTHECA**: Displays book summaries, shows micro-lessons on click
- **LABORATORIVM**: Displays daily puzzle, adds to MEMORIA when completed correctly
- **MEMORIA**: Stores all concepts from all streams with spaced repetition

