export function LoadingState({ label = "Loading..." }: { label?: string }) {
  return <div className="flex min-h-40 items-center justify-center text-sm text-gray-500"><span className="mr-2 size-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />{label}</div>;
}