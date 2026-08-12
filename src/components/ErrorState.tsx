export function ErrorState({ message = "Something went wrong." }: { message?: string }) {
  return <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6 text-center text-sm text-rose-700">{message}</div>;
}