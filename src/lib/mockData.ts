import type { Book, Loan, Review, User } from "@/types";

export const demoUser: User = {
  id: "u1",
  name: "John Doe",
  email: "johndoe@email.com",
  phone: "081234567890",
  avatar: "/assets/avatar.png",
  role: "user",
};

const covers = Array.from({ length: 10 }, (_, i) => `/assets/cover-${i + 1}.png`);

export const books: Book[] = [
  ["21 Rasa Bakso Pak Bowo","Tuhu","Fiction",4.9,5],
  ["Irresistible","Lisa Kleypas","Fiction",4.9,3],
  ["Oliver Twist","Charles Dickens","Fiction",4.9,6],
  ["White Fang","Jack London","Fiction",4.9,4],
  ["The Scared Woman","Jussi Adler-Olsen","Fiction",4.9,2],
  ["The Plague","Albert Camus","Fiction",4.9,7],
  ["Kapan Pindah Rumah","Annisa Damanik","Self-Improvement",4.8,5],
  ["Yeti dan Terik yang Abadi","Darian Reve","Fiction",4.7,3],
  ["Rumah yang Menelan Penghuninya","Kenken Layla","Fiction",4.6,2],
  ["Other Half of Me","Elsa Puspita","Self-Improvement",4.9,4],
].map(([title,author,category,rating,stock], i) => ({
  id: `b${i + 1}`,
  title: title as string,
  author: author as string,
  category: category as Book["category"],
  coverUrl: covers[i],
  rating: rating as number,
  stock: stock as number,
  description: `A sample Booky catalogue entry for ${title}. This description is ready to be replaced by the description returned by the Swagger API.`,
  publishedYear: 2020 + (i % 5),
}));

export const reviews: Review[] = [
  { id: "r1", userName: "Aulia", rating: 5, comment: "Great book and very enjoyable to read.", createdAt: "2026-08-02T10:00:00Z" },
  { id: "r2", userName: "Rizky", rating: 4, comment: "Good story and easy to follow.", createdAt: "2026-08-04T12:00:00Z" },
];

export const loans: Loan[] = [
  { id: "l1", bookId: "b3", bookTitle: "Oliver Twist", coverUrl: covers[2], borrowedAt: "2026-08-05T09:00:00Z", dueDate: "2026-08-19T09:00:00Z", status: "BORROWED" },
  { id: "l2", bookId: "b6", bookTitle: "The Plague", coverUrl: covers[5], borrowedAt: "2026-07-01T09:00:00Z", dueDate: "2026-07-15T09:00:00Z", returnedAt: "2026-07-14T09:00:00Z", status: "RETURNED" },
];