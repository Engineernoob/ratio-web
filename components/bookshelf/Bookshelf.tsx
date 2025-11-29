"use client";

import { BookSpine, BookMeta } from "./BookSpine";

interface BookshelfProps {
  books: BookMeta[];
  onBookClick: (book: BookMeta) => void;
}

export function Bookshelf({ books, onBookClick }: BookshelfProps) {
  return (
    <div className="w-full">
      {/* Responsive Grid: 2 cols mobile, 3-4 tablet, 5-6 desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
        {books.map((book, index) => (
          <BookSpine
            key={book.id}
            book={book}
            onClick={() => onBookClick(book)}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
