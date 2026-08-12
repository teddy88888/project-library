import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Star } from "lucide-react";
import { toast } from "sonner";
import dayjs from "dayjs";
import { useAddReview, useBook, useBorrowBook, useDeleteReview, useReviews } from "@/features/books/hooks";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { useAppSelector } from "@/store/hooks";

export default function BookDetail() {
  const { id = "" } = useParams();
  const { data: book, isLoading, isError } = useBook(id);
  const reviews = useReviews(id);
  const borrow = useBorrowBook();
  const addReview = useAddReview(id);
  const deleteReview = useDeleteReview(id);
  const user = useAppSelector((s) => s.auth.user);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  if (isLoading) return <LoadingState />;
  if (isError || !book) return <div className="container-page py-10"><ErrorState message="Book not found." /></div>;

  async function handleBorrow() {
    if (!user) { toast.error("Please login first."); return; }
    try { await borrow.mutateAsync(book.id); toast.success("Book borrowed successfully."); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Borrow failed."); }
  }

  async function handleReview(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    try { await addReview.mutateAsync({ rating, comment }); setComment(""); toast.success("Review added."); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Review failed."); }
  }

  return (
    <section className="container-page py-10">
      <Link to="/books" className="text-sm font-medium text-blue-600">← Back to books</Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-[330px_1fr]">
        <img src={book.coverUrl} alt={book.title} className="mx-auto aspect-[0.68] w-full max-w-[330px] rounded-2xl object-cover shadow-soft" />
        <div>
          <p className="text-sm font-semibold text-blue-600">{book.category}</p>
          <h1 className="mt-2 text-4xl font-bold">{book.title}</h1>
          <p className="mt-2 text-lg text-gray-500">by {book.author}</p>
          <div className="mt-5 flex items-center gap-2"><Star className="fill-amber-400 text-amber-400" /><b>{book.rating.toFixed(1)}</b></div>
          <p className="mt-6 leading-7 text-gray-600">{book.description}</p>
          <div className="mt-8 rounded-2xl border border-gray-200 p-5">
            <div className="flex items-center justify-between"><span className="font-semibold">Stock</span><span className={book.stock ? "font-bold text-emerald-600" : "font-bold text-rose-600"}>{book.stock} available</span></div>
            <Button className="mt-5 w-full" onClick={handleBorrow} disabled={book.stock <= 0 || borrow.isPending}>{borrow.isPending ? "Borrowing..." : "Borrow Book"}</Button>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="mt-5 space-y-4">
            {reviews.isLoading ? <LoadingState /> : reviews.isError ? <ErrorState message="Unable to load reviews." /> : reviews.data?.map((review) => (
              <Card key={review.id} className="border border-gray-100 p-5">
                <div className="flex items-start justify-between"><div><p className="font-semibold">{review.userName}</p><div className="mt-1 flex gap-1">{Array.from({length: review.rating}).map((_, i) => <Star key={i} className="size-4 fill-amber-400 text-amber-400" />)}</div></div><span className="text-xs text-gray-400">{dayjs(review.createdAt).format("DD MMM YYYY")}</span></div>
                <p className="mt-3 text-sm text-gray-600">{review.comment}</p>
                {review.userName === user?.name && <button className="mt-3 text-xs font-semibold text-rose-600" onClick={() => deleteReview.mutate(review.id)}>Delete</button>}
              </Card>
            ))}
          </div>
        </div>
        <Card className="h-fit border border-gray-100 p-6">
          <h2 className="text-xl font-bold">Add Review</h2>
          <form onSubmit={handleReview} className="mt-5 space-y-4">
            <label className="block text-sm font-semibold">Rating<select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="mt-2 h-11 w-full rounded-xl border px-3"><option value="5">5 stars</option><option value="4">4 stars</option><option value="3">3 stars</option><option value="2">2 stars</option><option value="1">1 star</option></select></label>
            <label className="block text-sm font-semibold">Comment<Input className="mt-2" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Write your review..." /></label>
            <Button className="w-full" disabled={addReview.isPending}>{addReview.isPending ? "Adding..." : "Submit Review"}</Button>
          </form>
        </Card>
      </div>
    </section>
  );
}