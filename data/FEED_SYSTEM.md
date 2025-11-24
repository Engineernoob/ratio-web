# RATIO Feed System Architecture

## Overview

The RATIO feed system uses a structured registry-based approach for managing all feed items across knowledge streams.

## Files

### `feed-items.json`
Global registry of all available feed items. Contains:
- TikTok lessons
- Book summaries
- Chapter summaries
- Micro-lessons from all chapters
- Generated lessons

**Structure:**
```json
{
  "items": [
    {
      "id": "meditations:chapter:2:micro:4",
      "type": "micro-lesson",
      "source": "meditations",
      "chapter": 2,
      "difficulty": 1,
      "priority": 0.7,
      "srs_due": null,
      "title": "...",
      "content": "..."
    }
  ]
}
```

### `feed-assignments.json`
Daily assignments mapping dates to structured feed items.

**Structure:**
```json
{
  "assignments": {
    "2025-11-24": [
      {
        "id": "meditations:chapter:2:micro:4",
        "type": "micro-lesson",
        "source": "meditations",
        "chapter": 2,
        "difficulty": 1,
        "priority": 0.7,
        "srs_due": null
      }
    ]
  }
}
```

## ID Naming Conventions

### Meditations
- Summary: `meditations:summary`
- Chapter Summary: `meditations:chapter:{n}:summary`
- Micro-lesson: `meditations:chapter:{n}:micro:{index}`

### TikTok
- Keep original ID: `tiktok-{n}`

### Other Books
- Summary: `{bookname}:summary`
- Chapter Summary: `{bookname}:chapter:{n}:summary`
- Micro-lesson: `{bookname}:chapter:{n}:micro:{index}`

## API Functions

### `getDailyFeed(count: number): FeedItem[]`
Main function to get today's feed. Uses registry to resolve items.

### `getFeedItemsForDate(date: string): FeedItem[]`
Get feed items for a specific date.

### `getItemById(id: string): FeedItemRegistry | undefined`
Look up a specific item by ID from the registry.

### `getNextSRSItems(count: number): FeedItem[]`
Get items due for spaced repetition review.

## Backward Compatibility

The system automatically wraps legacy string IDs:
```typescript
{
  id: string,
  type: "external",
  source: "legacy",
  difficulty: 1,
  priority: 0.5,
  srs_due: null
}
```

## Regenerating feed-items.json

Run the generator script:
```bash
npx tsx lib/generate-feed-items.ts
```

This scans all sources and regenerates the complete registry.

