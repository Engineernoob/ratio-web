"use client";

import { useEffect, useState } from "react";
import { PlateHeader } from "@/components/PlateHeader";
import { BookPlate } from "@/components/BookPlate";
import { ContextPanel } from "@/components/ContextPanel";
import { BrutalistCard } from "@/components/BrutalistCard";
import { Main } from "@/components/Main";
import { OrangeAction } from "@/components/OrangeAction";

interface BookSummary {
  title: string;
  author: string;
  year?: number;
  key_ideas: string[];
  micro_lessons?: MicroLesson[];
}

interface MicroLesson {
  id: string;
  title: string;
  core_idea: string;
  micro_test_q: string;
  micro_test_a: string;
}

export default function BibliothecaPage() {
  const [summaries, setSummaries] = useState<BookSummary[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookSummary | null>(null);
  const [selectedMicroLessons, setSelectedMicroLessons] = useState<MicroLesson[]>([]);
  const [revealedAnswers, setRevealedAnswers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      const response = await fetch("/api/feed", { method: "POST" });
      const data = await response.json();
      if (data.summaries) {
        setSummaries(data.summaries);
      }
    } catch (error) {
      console.error("Error fetching summaries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookClick = async (book: BookSummary) => {
    setSelectedBook(book);
    try {
      const response = await fetch(`/api/books?title=${encodeURIComponent(book.title)}`);
      const data = await response.json();
      if (data.microLessons) {
        setSelectedMicroLessons(data.microLessons);
      }
    } catch (error) {
      console.error("Error fetching micro-lessons:", error);
    }
  };

  const toggleAnswer = (lessonId: string) => {
    setRevealedAnswers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(lessonId)) {
        newSet.delete(lessonId);
      } else {
        newSet.add(lessonId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <>
        <Main>
          <PlateHeader 
            title="BIBLIOTHECA" 
            subtitle="Library of Knowledge"
            plateNumber="II"
          />
          <BrutalistCard borderWidth="1.5" className="p-6">
            <div className="font-mono text-sm text-muted-foreground">Loading library...</div>
          </BrutalistCard>
        </Main>
        <ContextPanel title="Author Bio" />
      </>
    );
  }

  return (
    <>
      <Main>
        <PlateHeader 
          title="BIBLIOTHECA" 
          subtitle="Library of Knowledge"
          plateNumber="II"
        />
        
        <div className="space-y-6">
          {!selectedBook ? (
            summaries.map((book) => (
              <BookPlate
                key={book.title}
                title={book.title}
                author={book.author}
                year={book.year}
                description={book.key_ideas[0] || "Key insights from this work."}
                themes={book.key_ideas.slice(0, 3).map(idea => idea.substring(0, 20))}
              >
                <div className="mt-4">
                  <OrangeAction onClick={() => handleBookClick(book)}>
                    View Summary & Micro-Lessons
                  </OrangeAction>
                </div>
              </BookPlate>
            ))
          ) : (
            <>
              <BrutalistCard borderWidth="1.5" className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-serif text-2xl engraved mb-2">{selectedBook.title}</div>
                    <div className="font-mono text-sm text-muted-foreground">
                      by {selectedBook.author} {selectedBook.year && `(${selectedBook.year > 0 ? selectedBook.year : Math.abs(selectedBook.year) + ' BCE'})`}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedBook(null);
                      setSelectedMicroLessons([]);
                      setRevealedAnswers(new Set());
                    }}
                    className="border border-border px-3 py-1 font-mono text-xs hover:bg-secondary"
                  >
                    Back
                  </button>
                </div>

                <div className="font-mono text-sm space-y-4">
                  <div>
                    <div className="font-serif text-lg mb-3 engraved">Key Ideas</div>
                    <ul className="space-y-2 text-muted-foreground">
                      {selectedBook.key_ideas.map((idea, idx) => (
                        <li key={idx} className="border-l border-border pl-3">
                          {idea}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </BrutalistCard>

              {selectedMicroLessons.length > 0 && (
                <div>
                  <div className="font-serif text-xl mb-4 engraved">Micro-Lessons</div>
                  <div className="space-y-4">
                    {selectedMicroLessons.map((lesson) => (
                      <BrutalistCard key={lesson.id} borderWidth="1" className="p-6">
                        <div className="font-serif text-lg mb-3 engraved">{lesson.title}</div>
                        <div className="font-mono text-sm space-y-4">
                          <p className="text-muted-foreground leading-relaxed">{lesson.core_idea}</p>
                          
                          <div className="border-t border-border pt-4">
                            <div className="font-serif text-sm mb-2 engraved">Micro-Test</div>
                            <div className="space-y-3">
                              <p className="text-muted-foreground">{lesson.micro_test_q}</p>
                              
                              {revealedAnswers.has(lesson.id) ? (
                                <div>
                                  <div className="mb-2 font-semibold">Answer:</div>
                                  <p className="text-muted-foreground">{lesson.micro_test_a}</p>
                                </div>
                              ) : (
                                <OrangeAction onClick={() => toggleAnswer(lesson.id)}>
                                  Reveal Answer
                                </OrangeAction>
                              )}
                            </div>
                          </div>
                        </div>
                      </BrutalistCard>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </Main>

      <ContextPanel title={selectedBook ? "Book Details" : "Library"}>
        {selectedBook ? (
          <>
            <BrutalistCard borderWidth="1" className="p-4 mb-4">
              <div className="font-serif text-sm mb-2 engraved">Selected Book</div>
              <div className="font-mono text-xs">
                <div className="font-semibold">{selectedBook.title}</div>
                <div className="text-muted-foreground mt-1">{selectedBook.author}</div>
              </div>
            </BrutalistCard>

            <BrutalistCard borderWidth="1" className="p-4 mb-4">
              <div className="font-serif text-sm mb-2 engraved">Key Ideas</div>
              <div className="font-mono text-xs text-muted-foreground">
                {selectedBook.key_ideas.length} ideas
              </div>
            </BrutalistCard>

            <BrutalistCard borderWidth="1" className="p-4">
              <div className="font-serif text-sm mb-2 engraved">Micro-Lessons</div>
              <div className="font-mono text-xs text-muted-foreground">
                {selectedMicroLessons.length} lessons available
              </div>
            </BrutalistCard>
          </>
        ) : (
          <>
            <BrutalistCard borderWidth="1" className="p-4 mb-4">
              <div className="font-serif text-sm mb-2 engraved">Library</div>
              <div className="font-mono text-xs space-y-1">
                {summaries.length} books available
              </div>
            </BrutalistCard>

            <BrutalistCard borderWidth="1" className="p-4">
              <div className="font-serif text-sm mb-2 engraved">Instructions</div>
              <div className="font-mono text-xs text-muted-foreground">
                Click a book to view its summary, key ideas, and micro-lessons.
              </div>
            </BrutalistCard>
          </>
        )}
      </ContextPanel>
    </>
  );
}
