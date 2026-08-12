export type Category =
  | "Fiction"
  | "Non-Fiction"
  | "Self-Improvement"
  | "Finance"
  | "Science & Technology"
  | "Education";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  role?: "user" | "admin";
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: Category;
  coverUrl: string;
  rating: number;
  stock: number;
  description: string;
  publishedYear?: number;
};

export type Review = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
};

export type LoanStatus = "BORROWED" | "RETURNED";

export type Loan = {
  id: string;
  bookId: string;
  bookTitle: string;
  coverUrl: string;
  borrowedAt: string;
  dueDate: string;
  returnedAt?: string;
  status: LoanStatus;
};