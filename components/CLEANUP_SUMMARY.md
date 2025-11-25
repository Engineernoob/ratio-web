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
- `SideNav.tsx` - Side navigation
- `TopNav.tsx` - Top navigation
- `Main.tsx` - Main content area
- `PixelIcon.tsx` - Pixel icon component

### Page-Specific Components
- `BookPlate.tsx` - Book plate component
- `KnowledgeNode.tsx` - Knowledge graph node
- `CircularRecallMeter.tsx` - Circular recall meter
- `EmptyState.tsx` - Empty state component
- `BrutalistCard.tsx` - Brutalist card component

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
│   ├── index.ts            # Barrel exports
│   ├── README.md           # Documentation
│   └── [20 components]     # All core components
├── RootLayoutWrapper.tsx   # Layout wrapper
├── SideNav.tsx             # Side navigation
├── TopNav.tsx              # Top navigation
├── Main.tsx                # Main content area
├── PixelIcon.tsx           # Icon component
├── BookPlate.tsx           # Page-specific
├── KnowledgeNode.tsx       # Page-specific
├── CircularRecallMeter.tsx # Page-specific
├── EmptyState.tsx          # Page-specific
└── BrutalistCard.tsx      # Base card component
```

