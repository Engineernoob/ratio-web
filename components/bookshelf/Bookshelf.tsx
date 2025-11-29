"use client";

import { BookSpine, BookMeta } from "./BookSpine";

interface BookshelfProps {
  books: BookMeta[];
  onBookClick: (book: BookMeta) => void;
}

export function Bookshelf({ books, onBookClick }: BookshelfProps) {
  return (
    <div className="w-full relative">
      <div className="bookshelf-grid">
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
