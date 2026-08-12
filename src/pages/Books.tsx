import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Check, SlidersHorizontal, Star } from "lucide-react";
import { useBooks } from "@/features/books/hooks";
import { BookCard } from "@/components/BookCard";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCategory, setRating, setSearch } from "@/store/uiSlice";
import type { Category } from "@/types";

const categories: Category[] = ["Fiction","Non-Fiction","Self-Improvement","Finance","Science & Technology","Education"];

export default function Books() {
  const query = useBooks();
  const dispatch = useAppDispatch();
  const [params] = useSearchParams();
  const { search, category, rating } = useAppSelector((s) => s.ui);

  useEffect(() => {
    const q = params.get("search"); const c = params.get("category");
    if (q !== null) dispatch(setSearch(q));
    if (c && categories.includes(c as Category)) dispatch(setCategory(c as Category));
  }, [params, dispatch]);

  const filtered = useMemo(() => {
    return (query.data ?? []).filter((book) => {
      const matchesSearch = `${book.title} ${book.author}`.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || book.category === category;
      const matchesRating = rating === null || Math.floor(book.rating) >= rating;
      return matchesSearch && matchesCategory && matchesRating;
    });
  }, [query.data, search, category, rating]);

  return (
    <section className="container-page py-10">
      <div className="flex items-center justify-between gap-4"><h1 className="text-4xl font-bold">Book List</h1><button className="rounded-full border p-2 lg:hidden"><SlidersHorizontal size={18} /></button></div>
      <div className="mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">
        <aside className="h-fit rounded-2xl border border-gray-200 p-5">
          <h2 className="font-bold">FILTER</h2>
          <h3 className="mt-6 font-semibold">Category</h3>
          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-3 text-sm"><input type="radio" checked={category === "All"} onChange={() => dispatch(setCategory("All"))} />All</label>
            {categories.map((c) => <label key={c} className="flex items-center gap-3 text-sm"><input type="radio" checked={category === c} onChange={() => dispatch(setCategory(c))} />{c}</label>)}
          </div>
          <div className="my-6 border-t" />
          <h3 className="font-semibold">Rating</h3>
          <div className="mt-3 space-y-3">
            {[5,4,3,2,1].map((r) => <label key={r} className="flex items-center gap-3 text-sm"><input type="radio" checked={rating === r} onChange={() => dispatch(setRating(r))} /><Star className="size-4 fill-amber-400 text-amber-400" />{r}</label>)}
          </div>
        </aside>
        <div>
          {query.isLoading ? <LoadingState /> : query.isError ? <ErrorState message="Unable to load books." /> : filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">No books match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">{filtered.map((book) => <BookCard key={book.id} book={book} />)}</div>
          )}
        </div>
      </div>
    </section>
  );
}