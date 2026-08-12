import type { Book, Loan, Review, User } from "@/types";
import { books as mockBooks, demoUser, loans as mockLoans, reviews as mockReviews } from "./mockData";

const baseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "");
const useMock = import.meta.env.VITE_USE_MOCK !== "false" || !baseUrl;

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem("booky-auth");
  const auth = token ? JSON.parse(token).token : null;
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(auth ? { Authorization: `Bearer ${auth}` } : {}),
      ...(options.headers ?? {}),
    },
  });
  if (!response.ok) throw new Error((await response.text()) || `Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async login(email: string, password: string) {
    if (useMock) {
      await delay();
      if (!email || !password) throw new Error("Email and password are required.");
      return { token: "demo-token", user: { ...demoUser, email } };
    }
    return request<{ token: string; user: User }>("/auth/login", {
      method: "POST", body: JSON.stringify({ email, password }),
    });
  },

  async register(name: string, email: string, password: string) {
    if (useMock) {
      await delay();
      if (!name || !email || !password) throw new Error("All fields are required.");
      return { token: "demo-token", user: { ...demoUser, name, email } };
    }
    return request<{ token: string; user: User }>("/auth/register", {
      method: "POST", body: JSON.stringify({ name, email, password }),
    });
  },

  async getBooks(): Promise<Book[]> {
    if (useMock) { await delay(250); return [...mockBooks]; }
    return request<Book[]>("/books");
  },

  async getBook(id: string): Promise<Book> {
    if (useMock) { await delay(250); const found = mockBooks.find((b) => b.id === id); if (!found) throw new Error("Book not found"); return { ...found }; }
    return request<Book>(`/books/${id}`);
  },

  async getReviews(bookId: string): Promise<Review[]> {
    if (useMock) { await delay(180); return mockReviews.map((r) => ({ ...r, id: `${r.id}-${bookId}` })); }
    return request<Review[]>(`/books/${bookId}/reviews`);
  },

  async addReview(bookId: string, rating: number, comment: string): Promise<Review> {
    if (useMock) { await delay(250); return { id: crypto.randomUUID(), userName: demoUser.name, rating, comment, createdAt: new Date().toISOString() }; }
    return request<Review>(`/books/${bookId}/reviews`, { method: "POST", body: JSON.stringify({ rating, comment }) });
  },

  async deleteReview(bookId: string, reviewId: string) {
    if (useMock) { await delay(150); return; }
    await request(`/books/${bookId}/reviews/${reviewId}`, { method: "DELETE" });
  },

  async borrow(bookId: string): Promise<Loan> {
    if (useMock) {
      await delay(500);
      const book = mockBooks.find((b) => b.id === bookId);
      if (!book || book.stock <= 0) throw new Error("Book is out of stock.");
      return {
        id: crypto.randomUUID(), bookId, bookTitle: book.title, coverUrl: book.coverUrl,
        borrowedAt: new Date().toISOString(),
        dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
        status: "BORROWED",
      };
    }
    return request<Loan>("/loans", { method: "POST", body: JSON.stringify({ bookId }) });
  },

  async getLoans(): Promise<Loan[]> {
    if (useMock) { await delay(250); return [...mockLoans]; }
    return request<Loan[]>("/loans/me");
  },

  async updateProfile(payload: Partial<User>): Promise<User> {
    if (useMock) { await delay(300); return { ...demoUser, ...payload }; }
    return request<User>("/users/me", { method: "PUT", body: JSON.stringify(payload) });
  },
};