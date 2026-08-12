import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { Book, Review } from "@/types";

export const bookKeys = {
  all: ["books"] as const,
  detail: (id: string) => ["books", id] as const,
  reviews: (id: string) => ["reviews", id] as const,
};

export function useBooks() {
  return useQuery({ queryKey: bookKeys.all, queryFn: api.getBooks });
}

export function useBook(id: string) {
  return useQuery({ queryKey: bookKeys.detail(id), queryFn: () => api.getBook(id), enabled: Boolean(id) });
}

export function useReviews(id: string) {
  return useQuery({ queryKey: bookKeys.reviews(id), queryFn: () => api.getReviews(id), enabled: Boolean(id) });
}

export function useBorrowBook() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => api.borrow(bookId),
    onMutate: async (bookId) => {
      await qc.cancelQueries({ queryKey: bookKeys.detail(bookId) });
      const previous = qc.getQueryData<Book>(bookKeys.detail(bookId));
      qc.setQueryData<Book>(bookKeys.detail(bookId), (book) => book ? { ...book, stock: Math.max(0, book.stock - 1) } : book);
      return { previous };
    },
    onError: (_err, bookId, context) => {
      if (context?.previous) qc.setQueryData(bookKeys.detail(bookId), context.previous);
    },
    onSettled: (_data, _err, bookId) => {
      qc.invalidateQueries({ queryKey: bookKeys.detail(bookId) });
      qc.invalidateQueries({ queryKey: bookKeys.all });
      qc.invalidateQueries({ queryKey: ["loans"] });
    },
  });
}

export function useAddReview(bookId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { rating: number; comment: string }) => api.addReview(bookId, payload.rating, payload.comment),
    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: bookKeys.reviews(bookId) });
      const previous = qc.getQueryData<Review[]>(bookKeys.reviews(bookId)) ?? [];
      const optimistic: Review = { id: `temp-${Date.now()}`, userName: "John Doe", ...payload, createdAt: new Date().toISOString() };
      qc.setQueryData<Review[]>(bookKeys.reviews(bookId), [optimistic, ...previous]);
      return { previous };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) qc.setQueryData(bookKeys.reviews(bookId), context.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: bookKeys.reviews(bookId) }),
  });
}

export function useDeleteReview(bookId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => api.deleteReview(bookId, reviewId),
    onSuccess: () => qc.invalidateQueries({ queryKey: bookKeys.reviews(bookId) }),
  });
}