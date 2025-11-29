"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TopNavBar } from "@/components/core/TopNavBar";
import { Bookshelf } from "@/components/bookshelf/Bookshelf";
import { BookSearch } from "@/components/bookshelf/BookSearch";
import { BookFilters } from "@/components/bookshelf/BookFilters";
import { Reader } from "@/components/bookshelf/Reader";
import { BookMeta } from "@/components/bookshelf/BookSpine";
import "@/styles/bookshelf.css";

export default function BibliothecaPage() {
  const [books, setBooks] = useState<BookMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedBook, setSelectedBook] = useState<BookMeta | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/bookshelf");
      if (res.ok) {
        const data = await res.json();
        setBooks(data.books || []);
      }
    } catch (error) {
      console.error("Error loading books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort books
  const filteredBooks = useMemo(() => {
    let filtered = books;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          book.category?.toLowerCase().includes(query)
      );
    }

    // Category/tag filters
    if (selectedFilters.length > 0) {
      filtered = filtered.filter((book) => {
        return selectedFilters.some((filterId) => {
          return (
            book.tags?.includes(filterId) ||
            book.category?.toLowerCase() === filterId.toLowerCase()
          );
        });
      });
    }

    return filtered;
  }, [books, searchQuery, selectedFilters]);

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
      <div className="relative min-h-screen bg-black">
        <TopNavBar />
        <div className="relative z-10 pt-20">
          <div className="text-center py-32">
            <div className="font-serif text-xl mb-4 text-white">
              Loading Bibliotheca...
            </div>
            <div className="font-mono text-sm text-[#b7b7b7]">
              Unfolding the archive...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Blurred Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/images/alexandria-shelf.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(12px) brightness(0.15) grayscale(100%)",
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/60" />

      {/* Dithered texture overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "url('/images/textures/texture_bayer.png')",
          backgroundSize: "256px 256px",
          backgroundRepeat: "repeat",
        }}
      />

      <TopNavBar />

      <div className="relative z-10 pt-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-12">
          {/* Header */}
          <motion.div
            className="mb-12 text-center mt-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-serif text-4xl md:text-5xl mb-2 text-white">
              BIBLIOTHECA
            </h1>
            <p className="font-mono text-sm text-[#b7b7b7]">
              Your Living Archive of Volumes
            </p>
          </motion.div>

          {/* Search Bar */}
          <BookSearch value={searchQuery} onChange={setSearchQuery} />

          {/* Filters */}
          <BookFilters
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearFilters}
          />

          {/* Bookshelf Grid */}
          {filteredBooks.length > 0 ? (
            <Bookshelf books={filteredBooks} onBookClick={setSelectedBook} />
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-lg text-white mb-2">
                No books found
              </p>
              <p className="font-mono text-sm text-[#b7b7b7]">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Reader Modal */}
      <Reader book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}
