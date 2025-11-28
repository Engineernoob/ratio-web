"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import { HighlightActionBubble } from "./HighlightActionBubble";
import { motion, AnimatePresence } from "framer-motion";

interface TextSelection {
  text: string;
  bounds: DOMRect;
  pageNumber: number;
}

interface Highlight {
  id: string;
  pageNumber: number;
  bounds: { x: number; y: number; width: number; height: number };
  text: string;
}

interface HighlightLayerProps {
  pageNumber: number;
  pdfDocument: pdfjsLib.PDFDocumentProxy | null;
  pdfPage: pdfjsLib.PDFPageProxy | null;
  viewport: pdfjsLib.PageViewport | null;
  canvasElement: HTMLCanvasElement | null;
  highlights: Highlight[];
  onHighlightCreated?: (highlight: {
    pageNumber: number;
    text: string;
    bounds: DOMRect;
  }) => void;
  onNoteCreated?: (note: { pageNumber: number; text: string }) => void;
  onMemoriaAdded?: (item: { text: string; pageNumber: number }) => void;
  bookId: string;
  chapterId?: string;
}

export function HighlightLayer({
  pageNumber,
  pdfDocument,
  pdfPage,
  viewport,
  canvasElement,
  highlights,
  onHighlightCreated,
  onNoteCreated,
  onMemoriaAdded,
  bookId,
  chapterId,
}: HighlightLayerProps) {
  const layerRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const [selection, setSelection] = useState<TextSelection | null>(null);
  const [bubblePosition, setBubblePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Load and render text layer for text selection
  useEffect(() => {
    if (!pdfPage || !viewport || !textLayerRef.current) return;

    const loadTextLayer = async () => {
      try {
        const textContent = await pdfPage.getTextContent();
        const textLayerDiv = textLayerRef.current;
        if (!textLayerDiv) return;

        // Clear existing content
        textLayerDiv.innerHTML = "";

        // Create text layer using PDF.js text rendering
        pdfjsLib.renderTextLayer({
          textContentSource: textContent,
          container: textLayerDiv,
          viewport: viewport,
          textDivs: [],
        });
      } catch (error) {
        console.error("Error loading text layer:", error);
      }
    };

    loadTextLayer();
  }, [pdfPage, viewport]);

  // Handle text selection
  const handleMouseUp = useCallback(() => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      setSelection(null);
      setBubblePosition(null);
      return;
    }

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();

    if (!selectedText || selectedText.length === 0) {
      setSelection(null);
      setBubblePosition(null);
      return;
    }

    // Get bounding rect relative to the canvas
    const rect = range.getBoundingClientRect();
    const canvasRect = canvasElement?.getBoundingClientRect();

    if (!canvasRect) return;

    // Calculate position relative to canvas
    const bounds = new DOMRect(
      rect.left - canvasRect.left,
      rect.top - canvasRect.top,
      rect.width,
      rect.height
    );

    setSelection({
      text: selectedText,
      bounds: bounds,
      pageNumber: pageNumber,
    });

    // Position bubble above selection
    setBubblePosition({
      x: bounds.left + bounds.width / 2,
      y: bounds.top,
    });
  }, [canvasElement, pageNumber]);

  // Clear selection when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (layerRef.current && !layerRef.current.contains(e.target as Node)) {
        setSelection(null);
        setBubblePosition(null);
        window.getSelection()?.removeAllRanges();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Action handlers
  const handleHighlight = useCallback(() => {
    if (!selection) return;

    const highlight: Highlight = {
      id: `${bookId}-${pageNumber}-${Date.now()}`,
      pageNumber: selection.pageNumber,
      bounds: {
        x: selection.bounds.x,
        y: selection.bounds.y,
        width: selection.bounds.width,
        height: selection.bounds.height,
      },
      text: selection.text,
    };

    onHighlightCreated?.({
      pageNumber: selection.pageNumber,
      text: selection.text,
      bounds: selection.bounds,
    });

    setSelection(null);
    setBubblePosition(null);
    window.getSelection()?.removeAllRanges();
  }, [selection, bookId, pageNumber, onHighlightCreated]);

  const handleAddNote = useCallback(() => {
    if (!selection) return;

    onNoteCreated?.({
      pageNumber: selection.pageNumber,
      text: selection.text,
    });

    setSelection(null);
    setBubblePosition(null);
    window.getSelection()?.removeAllRanges();
  }, [selection, onNoteCreated]);

  const handleAddToMemoria = useCallback(() => {
    if (!selection) return;

    onMemoriaAdded?.({
      text: selection.text,
      pageNumber: selection.pageNumber,
    });

    setSelection(null);
    setBubblePosition(null);
    window.getSelection()?.removeAllRanges();
  }, [selection, onMemoriaAdded]);

  const handleSummarize = useCallback(() => {
    if (!selection) return;
    // TODO: Implement AI summarization
    console.log("Summarize:", selection.text);
    setSelection(null);
    setBubblePosition(null);
    window.getSelection()?.removeAllRanges();
  }, [selection]);

  const handleCopy = useCallback(() => {
    if (!selection) return;
    navigator.clipboard.writeText(selection.text);
    setSelection(null);
    setBubblePosition(null);
    window.getSelection()?.removeAllRanges();
  }, [selection]);

  const handleClose = useCallback(() => {
    setSelection(null);
    setBubblePosition(null);
    window.getSelection()?.removeAllRanges();
  }, []);

  return (
    <div
      ref={layerRef}
      className="absolute inset-0 pointer-events-auto"
      onMouseUp={handleMouseUp}
    >
      {/* Text layer for selection */}
      <div
        ref={textLayerRef}
        className="absolute inset-0"
        style={{
          opacity: 0,
          userSelect: "text",
          pointerEvents: "auto",
        }}
      />

      {/* Highlight overlays */}
      <AnimatePresence>
        {highlights
          .filter((h) => h.pageNumber === pageNumber)
          .map((highlight) => (
            <motion.div
              key={highlight.id}
              className="absolute rounded-sm"
              style={{
                left: `${highlight.bounds.x}px`,
                top: `${highlight.bounds.y}px`,
                width: `${highlight.bounds.width}px`,
                height: `${highlight.bounds.height}px`,
                background: "rgba(200, 182, 141, 0.3)",
                pointerEvents: "none",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ))}
      </AnimatePresence>

      {/* Action bubble */}
      {selection && bubblePosition && (
        <HighlightActionBubble
          x={bubblePosition.x}
          y={bubblePosition.y}
          selectedText={selection.text}
          onHighlight={handleHighlight}
          onAddNote={handleAddNote}
          onAddToMemoria={handleAddToMemoria}
          onSummarize={handleSummarize}
          onCopy={handleCopy}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
