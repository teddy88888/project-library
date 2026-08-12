import { Link } from "react-router-dom";
import { useMemo } from "react";
import { BookOpen } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { setCategory } from "@/store/uiSlice";
import { useBooks } from "@/features/books/hooks";
import { BookCard } from "@/components/BookCard";
import { CategoryCard } from "@/components/CategoryCard";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import type { Category } from "@/types";

const categories: Category[] = ["Fiction","Non-Fiction","Self-Improvement","Finance","Science & Technology","Education"];

export default function Home() {
  const dispatch = useAppDispatch();
  const query = useBooks();
  const recommendations = useMemo(() => query.data?.slice(0, 10) ?? [], [query.data]);

  return (
    <>
      <section className="container-page pt-8">
        <div className="overflow-hidden rounded-3xl">
          <img src="/assets/hero.png" alt="Welcome to Booky" className="h-auto w-full object-cover" />
        </div>
        <div className="mt-3 flex justify-center gap-1"><span className="size-2 rounded-full bg-blue-600" /><span className="size-2 rounded-full bg-gray-300" /><span className="size-2 rounded-full bg-gray-300" /></div>
      </section>

      <section className="container-page mt-8 overflow-x-auto pb-2">
        <div className="flex gap-3">
          {categories.map((category) => <CategoryCard key={category} category={category} onClick={() => { dispatch(setCategory(category)); window.location.href = `/books?category=${encodeURIComponent(category)}`; }} />)}
        </div>
      </section>

      <section className="container-page mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold">Recommendation</h2>
          <Link className="hidden text-sm font-semibold text-blue-600 sm:block" to="/books">View all</Link>
        </div>
        {query.isLoading ? <LoadingState /> : query.isError ? <ErrorState message="Unable to load recommendations." /> : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {recommendations.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        )}
        <div className="mt-8 text-center"><Link to="/books" className="inline-flex rounded-full border border-gray-200 px-8 py-3 text-sm font-medium hover:bg-gray-50">Load More</Link></div>
      </section>

      <section className="container-page mt-12 border-t border-gray-200 pt-10">
        <h2 className="text-3xl font-bold">Popular Authors</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-soft">
              <img src="/assets/avatar.png" className="size-14 rounded-full object-cover" />
              <div><p className="font-semibold">Author name</p><p className="mt-1 flex items-center gap-1 text-sm text-gray-600"><BookOpen className="size-4 text-blue-600" />5 books</p></div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}