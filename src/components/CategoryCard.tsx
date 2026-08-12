import type { ReactNode } from "react";
import type { Category } from "@/types";

const icons: Record<Category, string> = {
  Fiction: "🪄",
  "Non-Fiction": "📚",
  "Self-Improvement": "🌱",
  Finance: "💰",
  "Science & Technology": "🔬",
  Education: "🎓",
};

export function CategoryCard({ category, onClick }: { category: Category; onClick: () => void }) {
  return (
    <button onClick={onClick} className="min-w-[150px] rounded-2xl bg-white p-3 text-left shadow-soft transition hover:-translate-y-0.5">
      <div className="grid h-12 place-items-center rounded-xl bg-blue-50 text-2xl">{icons[category]}</div>
      <div className="mt-3 text-sm font-medium">{category}</div>
    </button>
  );
}