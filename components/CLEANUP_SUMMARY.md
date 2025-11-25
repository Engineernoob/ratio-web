# Components Cleanup Summary

## Deleted Components (Unused)

- ✅ `PuzzleCanvas.tsx` - Not used anywhere
- ✅ `ScholarSlab.tsx` - Not used anywhere
- ✅ `AuthButton.tsx` - Moved to mobile folder
- ✅ `AuthCard.tsx` - Moved to mobile folder
- ✅ `MarblePanel.tsx` - Replaced by StoneTablet

## Moved to `/components/core/`

### UI Components

- `StoneTablet.tsx` - Engraved stone tablet component
- `ScrollCard.tsx` - Parchment scroll card
- `WaxSealButton.tsx` - Wax seal button
- `FogPanel.tsx` - Floating fog panel
- `EngravedHeader.tsx` - Serif header with engraved effect
- `FloatingSigil.tsx` - Circular floating sigil
- `ParchmentOverlay.tsx` - Parchment texture overlay
- `LogicNode.tsx` - Draggable logic node
- `LedgerList.tsx` - Ancient ledger list

### Image & Media

- `EngravedStatue.tsx` - Engraved statue image component
- `DitherImage.tsx` - Dithered image component
- `ClassicalImage.tsx` - Classical image with fallback
- `ClassicalFigure.tsx` - SVG classical figure

### Content Components

- `ExpandableText.tsx` - Expandable text with read more
- `PlateHeader.tsx` - Plate header component
- `MemoryGrid.tsx` - Memory retention grid
- `ContextPanel.tsx` - Right-side context panel

### Action Components

- `OrangeAction.tsx` - Orange accent action button

### Utility Components

- `SkeletonLoader.tsx` - Loading skeleton
- `Toast.tsx` - Toast notification component

## Remaining in Root `/components/`

### Layout & Navigation

- `RootLayoutWrapper.tsx` - Root layout wrapper
- `Main.tsx` - Main content area
- `PixelIcon.tsx` - Pixel icon component
- ⚠️ `SideNav.tsx` - Referenced but not found (needs to be created or import path fixed)

### Page-Specific Components

- `BookPlate.tsx` - Book plate component
- `KnowledgeNode.tsx` - Knowledge graph node
- `CircularRecallMeter.tsx` - Circular recall meter
- `BrutalistCard.tsx` - Brutalist card component

### Bibliotheca-Specific Components

- `bibliotheca/PageHeader.tsx` - Bibliotheca page header
- `bibliotheca/ScrollShelf.tsx` - Scroll shelf component
- `bibliotheca/LibraryLedger.tsx` - Bibliotheca-specific library ledger (different from core/LibraryLedger)
- `bibliotheca/BookOverview.tsx` - Book overview component
- `bibliotheca/ChapterList.tsx` - Chapter list component
- `bibliotheca/ChapterItem.tsx` - Chapter item component

## Import Updates

All imports have been updated to use `/components/core/` for moved components:

```tsx
// Before
import { FogPanel } from "@/components/FogPanel";

// After
import { FogPanel } from "@/components/core/FogPanel";
```

Or use the barrel export:

```tsx
import { FogPanel, StoneTablet, ScrollCard } from "@/components/core";
```

## Structure

```
components/
├── core/                    # Reusable UI components
│   ├── index.ts            # Barrel exports (includes FogCard)
│   ├── README.md           # Documentation
│   ├── COMPONENTS_LIST.md  # Complete components list
│   └── [30+ components]    # All core components
├── bibliotheca/             # Bibliotheca-specific components
│   ├── PageHeader.tsx
│   ├── ScrollShelf.tsx
│   ├── LibraryLedger.tsx   # Different from core/LibraryLedger
│   ├── BookOverview.tsx
│   ├── ChapterList.tsx
│   └── ChapterItem.tsx
├── RootLayoutWrapper.tsx   # Layout wrapper
├── Main.tsx                # Main content area
├── PixelIcon.tsx           # Icon component
├── BookPlate.tsx           # Page-specific
├── KnowledgeNode.tsx       # Page-specific
├── CircularRecallMeter.tsx # Page-specific
└── BrutalistCard.tsx      # Base card component
```

## Notes

- `TopNavBar` is in `core/` (not `TopNav.tsx` in root)
- `SideNav.tsx` is referenced in `RootLayoutWrapper.tsx` but file doesn't exist
- `FogCard` is now exported from `core/index.ts`
- `bibliotheca/LibraryLedger` is different from `core/LibraryLedger` - both are used
