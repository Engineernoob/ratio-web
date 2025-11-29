"use client";

import { useEffect, useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { TopNavBar } from "@/components/core/TopNavBar";
import { Main } from "@/components/Main";
import {
  FilterBar,
  SortControl,
  LibraryGrid,
  MobileFilterDrawer,
} from "@/components/library";

type SortOption =
  | "recently-opened"
  | "a-z"
  | "z-a"
  | "progress"
  | "ancient-modern"
  | "modern-ancient";

interface Book {
  id: string;
  title: string;
  author: string;
  category?: string;
  tags?: string[];
  spineTexture?: string;
  readingProgress?: number;
  pdfPath?: string;
  era?: string;
  difficulty?: string;
  status?: string;
  philosophy?: string;
}

export default function BibliothecaPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("recently-opened");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      // Fetch all books from API
      const bookIds = ["meditations", "AtomicHabits"];
      const bookPromises = bookIds.map(async (id) => {
        try {
          const res = await fetch(`/api/books/${id}?action=manifest`);
          if (res.ok) {
            const response = await res.json();
            const data = response.manifest || response;
            return {
              id: data.id || id,
              title: data.title || "",
              author: data.author || "",
              category: data.category,
              tags: data.tags || [],
              spineTexture:
                data.spineTexture || "/images/textures/parchment-dither.png",
              readingProgress: Math.floor(Math.random() * 100), // TODO: Get from user data
              pdfPath: data.pdf,
              era: id === "meditations" ? "ancient" : "modern",
              difficulty: "intermediate",
              status: "to-read",
              philosophy: id === "meditations" ? "stoic" : undefined,
            };
          }
        } catch (error) {
          console.error(`Error loading book ${id}:`, error);
        }
        return null;
      });

      const loadedBooks = (await Promise.all(bookPromises)).filter(
        (b) => b !== null
      ) as Book[];
      setBooks(loadedBooks);
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Category filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((book) => {
        return selectedFilters.some((filterId) => {
          if (
            filterId === "stoicism" ||
            filterId === "epistemology" ||
            filterId === "ethics" ||
            filterId === "logic"
          ) {
            return book.tags?.includes(filterId) || book.category === filterId;
          }
          if (
            filterId === "ancient" ||
            filterId === "medieval" ||
            filterId === "modern" ||
            filterId === "contemporary"
          ) {
            return book.era === filterId;
          }
          if (
            filterId === "beginner" ||
            filterId === "intermediate" ||
            filterId === "advanced"
          ) {
            return book.difficulty === filterId;
          }
          if (
            filterId === "to-read" ||
            filterId === "in-progress" ||
            filterId === "finished"
          ) {
            return book.status === filterId;
          }
          if (
            filterId === "stoic" ||
            filterId === "epicurean" ||
            filterId === "aristotelian" ||
            filterId === "platonist"
          ) {
            return book.philosophy === filterId;
          }
          return false;
        });
      });
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        case "progress":
          return (b.readingProgress || 0) - (a.readingProgress || 0);
        case "ancient-modern":
          const eraOrder = {
            ancient: 1,
            medieval: 2,
            modern: 3,
            contemporary: 4,
          };
          return (
            (eraOrder[a.era as keyof typeof eraOrder] || 0) -
            (eraOrder[b.era as keyof typeof eraOrder] || 0)
          );
        case "modern-ancient":
          const eraOrderRev = {
            ancient: 4,
            medieval: 3,
            modern: 2,
            contemporary: 1,
          };
          return (
            (eraOrderRev[a.era as keyof typeof eraOrderRev] || 0) -
            (eraOrderRev[b.era as keyof typeof eraOrderRev] || 0)
          );
        case "recently-opened":
        default:
          return 0; // TODO: Implement recently opened tracking
      }
    });

    return sorted;
  }, [books, searchQuery, selectedFilters, sortOption]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filterId)
        ? prev.filter((id) => id !== filterId)
        : [...prev, filterId]
    );
  };

  const handleClearFilters = () => {
    setSelectedFilters([]);
  };

  if (loading) {
    return (
      <div className="relative min-h-screen">
        <div
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: "url('/images/alexandria-shelf.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px) brightness(0.3)",
          }}
        />
        <TopNavBar />
        <div className="relative z-10 pt-20">
          <Main>
            <div className="text-center py-32">
              <div className="font-serif text-xl mb-4 text-[#e8e6e1]">
                Loading Bibliotheca...
              </div>
              <div className="font-mono text-sm text-[#888888]">
                Unfolding the archive...
              </div>
            </div>
          </Main>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Blurred Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/alexandria-shelf.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(12px) brightness(0.25)",
        }}
      />
      <div className="fixed inset-0 z-0 bg-[rgba(10,10,10,0.4)]" />

      <TopNavBar />

      <div className="relative z-10 pt-20">
        <Main>
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-12">
            {/* Header */}
            <div className="mb-12 text-center">
              <h1 className="font-serif text-4xl md:text-5xl mb-2 text-[#e8e6e1]">
                BIBLIOTHECA
              </h1>
              <p className="font-mono text-sm text-[#888888]">
                Your Living Archive of Volumes
              </p>
            </div>

            {/* Search Bar */}
            <div className="mb-8 max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#888888]" />
                <input
                  type="text"
                  placeholder="Search by title, author, or tag..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(200,182,141,0.1)] font-mono text-sm text-[#e8e6e1] placeholder-[#888888] focus:outline-none focus:border-[#c8b68d] focus:ring-1 focus:ring-[#c8b68d] transition-all"
                />
              </div>
            </div>

            {/* Filters and Sort - Desktop */}
            <div className="mb-8 hidden md:flex md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <FilterBar
                  filters={[]}
                  selectedFilters={selectedFilters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearFilters}
                />
              </div>
              <div>
                <SortControl value={sortOption} onChange={setSortOption} />
              </div>
            </div>

            {/* Mobile Filter Button */}
            <div className="mb-8 md:hidden flex justify-end">
              <button
                onClick={() => setMobileFilterOpen(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(200,182,141,0.1)] font-mono text-sm text-[#e8e6e1] hover:bg-[rgba(255,255,255,0.1)] transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filter & Sort
                {selectedFilters.length > 0 && (
                  <span className="ml-1 px-2 py-0.5 rounded-full bg-[#c8b68d] text-[#0a0a0a] text-xs">
                    {selectedFilters.length}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
              isOpen={mobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              sortOption={sortOption}
              onSortChange={setSortOption}
            />

            {/* Library Grid */}
            <LibraryGrid books={filteredAndSortedBooks} />
          </div>
        </Main>
      </div>
    </div>
  );
}
