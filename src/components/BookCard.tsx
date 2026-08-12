import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import type { Book } from "@/types";
import { Card } from "./ui/Card";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.id}`} className="group block">
      <Card className="overflow-hidden border border-gray-100 transition group-hover:-translate-y-1">
        <img src={book.coverUrl} alt={book.title} className="aspect-[0.68] w-full object-cover" />
        <div className="p-4">
          <h3 className="truncate font-semibold">{book.title}</h3>
          <p className="mt-1 truncate text-sm text-gray-500">{book.author}</p>
          <div className="mt-2 flex items-center gap-1 text-sm">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            <span>{book.rating.toFixed(1)}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}