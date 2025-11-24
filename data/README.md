# RATIO Knowledge Loop Data

This directory contains all data files for the personal knowledge loop system.

## Files

- **topics.json** - List of study topics and their descriptions
- **lessons.json** - Generated daily lessons (auto-populated)
- **puzzles.json** - Collection of logic puzzles and reasoning challenges
- **puzzle-assignments.json** - Daily puzzle assignments (auto-populated)
- **memoria.json** - Spaced repetition concepts and review schedule (auto-populated)

## Data Flow

1. **OIKOS** → Generates daily lesson → Adds to memoria.json
2. **LABORATORIVM** → Assigns daily puzzle from puzzles.json
3. **MEMORIA** → Reviews concepts from memoria.json → Updates intervals

## Adding Content

### Topics
Edit `topics.json` to add new study areas. Topics are used to generate lessons.

### Puzzles
Edit `puzzles.json` to add new logic puzzles. Supported types:
- `mcq` - Multiple choice questions
- `pattern` - Pattern recognition
- `ratio` - Ratio/mathematical problems

### Lessons
Lessons are auto-generated from templates in `/lib/lessons.ts`. To add static lessons, create files in `/data/lessons/[topic].json`.

## File Structure

All files use JSON format and are read/written by server-side API routes in `/app/api/`.

