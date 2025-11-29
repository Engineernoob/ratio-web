"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TopNavBar } from "@/components/core/TopNavBar";
import { ArchivvmShell } from "@/components/Archivvm/ArchivvmShell";
import { ArchivvmSearch } from "@/components/Archivvm/ArchivvmSearch";
import { ArchivvmFilters } from "@/components/Archivvm/ArchivvmFilters";
import { ArchivvmGrid } from "@/components/Archivvm/ArchivvmGrid";
import { ArchivvmModal } from "@/components/Archivvm/ArchivvmModal";
import { ArchivvmEmptyState } from "@/components/Archivvm/ArchivvmEmptyState";
import { ToastContainer } from "@/components/core/Toast";
import { useToast } from "@/hooks/useToast";
import { Main } from "@/components/Main";
import type { ArchivvmItem } from "@/lib/archivvm/types";
import {
  fuzzySearch,
  filterItems,
  getUniqueValues,
} from "@/lib/archivvm/search";

export default function ArchivvmPage() {
  const [items, setItems] = useState<ArchivvmItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState<string | undefined>();
  const [selectedChapter, setSelectedChapter] = useState<string | undefined>();
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedTag, setSelectedTag] = useState<string | undefined>();
  const [selectedItem, setSelectedItem] = useState<ArchivvmItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toasts, removeToast } = useToast();

  // Load items
  useEffect(() => {
    const loadItems = async () => {
      try {
        const response = await fetch("/api/archivvm/items");
        if (response.ok) {
          const data = await response.json();
          setItems(data.items || []);
        }
      } catch (error) {
        console.error("Error loading Archivvm items:", error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  // Get unique values for filters
  const uniqueValues = useMemo(() => getUniqueValues(items), [items]);

  // Filter and search items
  const filteredItems = useMemo(() => {
    let result = items;

    // Apply filters
    result = filterItems(result, {
      bookId: selectedBook,
      chapterId: selectedChapter,
      type: selectedType,
      tag: selectedTag,
    });

    // Apply search
    if (searchQuery.trim()) {
      result = fuzzySearch(result, searchQuery);
    }

    // Sort by creation date (newest first)
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return result;
  }, [
    items,
    searchQuery,
    selectedBook,
    selectedChapter,
    selectedType,
    selectedTag,
  ]);

  const handleItemClick = (item: ArchivvmItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 300);
  };

  if (loading) {
    return (
      <>
        <TopNavBar />
        <Main>
          <ArchivvmShell>
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <div
                  className="font-serif text-xl mb-4"
                  style={{ color: "#C8B68D" }}
                >
                  Loading Archivvm...
                </div>
                <div
                  className="font-mono text-sm opacity-60"
                  style={{ color: "#C8B68D" }}
                >
                  Gathering knowledge fragments...
                </div>
              </div>
            </div>
          </ArchivvmShell>
        </Main>
      </>
    );
  }

  return (
    <>
      <TopNavBar />
      <Main>
        <ArchivvmShell>
          <div className="relative z-10 min-h-screen">
            {/* Header */}
            <motion.div
              className="sticky top-0 z-20 p-6 border-b"
              style={{
                background: "rgba(10, 10, 10, 0.95)",
                borderColor: "rgba(200, 182, 141, 0.1)",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="max-w-7xl mx-auto">
                <h1
                  className="font-serif text-4xl mb-2"
                  style={{ color: "#C8B68D" }}
                >
                  ARCHIVVM
                </h1>
                <p
                  className="font-mono text-xs opacity-60"
                  style={{ color: "#C8B68D" }}
                >
                  Your Personal Knowledge Vault
                </p>
              </div>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar - Filters */}
                <div className="lg:col-span-1">
                  <motion.div
                    className="sticky top-24"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {/* Search */}
                    <div className="mb-6">
                      <ArchivvmSearch
                        value={searchQuery}
                        onChange={setSearchQuery}
                      />
                    </div>

                    {/* Filters */}
                    <ArchivvmFilters
                      books={uniqueValues.books}
                      chapters={uniqueValues.chapters}
                      types={uniqueValues.types}
                      tags={uniqueValues.tags}
                      selectedBook={selectedBook}
                      selectedChapter={selectedChapter}
                      selectedType={selectedType}
                      selectedTag={selectedTag}
                      onBookChange={setSelectedBook}
                      onChapterChange={setSelectedChapter}
                      onTypeChange={setSelectedType}
                      onTagChange={setSelectedTag}
                    />

                    {/* Stats */}
                    <div
                      className="mt-6 pt-6 border-t"
                      style={{ borderColor: "rgba(200, 182, 141, 0.1)" }}
                    >
                      <div
                        className="font-mono text-xs opacity-60"
                        style={{ color: "#C8B68D" }}
                      >
                        {filteredItems.length} of {items.length} items
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Main Grid */}
                <div className="lg:col-span-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {filteredItems.length > 0 ? (
                      <ArchivvmGrid
                        items={filteredItems}
                        onItemClick={handleItemClick}
                      />
                    ) : (
                      <ArchivvmEmptyState />
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal */}
          <ArchivvmModal
            item={selectedItem}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        </ArchivvmShell>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </Main>
    </>
  );
}
