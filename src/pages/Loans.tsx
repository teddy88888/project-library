import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";

export default function Loans() {
  const query = useQuery({ queryKey: ["loans"], queryFn: api.getLoans });
  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-bold">My Loans</h1>
      {query.isLoading ? <LoadingState /> : query.isError ? <ErrorState message="Unable to load your loans." /> : (
        <div className="mt-8 space-y-4">
          {query.data?.map((loan) => (
            <Card key={loan.id} className="flex flex-col gap-5 border border-gray-100 p-5 sm:flex-row sm:items-center">
              <img src={loan.coverUrl} className="h-32 w-24 rounded-xl object-cover" />
              <div className="flex-1"><h2 className="font-bold">{loan.bookTitle}</h2><p className="mt-2 text-sm text-gray-500">Borrowed: {dayjs(loan.borrowedAt).format("DD MMM YYYY")}</p><p className="mt-1 text-sm text-gray-500">Due: {dayjs(loan.dueDate).format("DD MMM YYYY")}</p></div>
              <Badge className={loan.status === "RETURNED" ? "bg-emerald-50 text-emerald-700" : ""}>{loan.status}</Badge>
            </Card>
          ))}
          {!query.data?.length && <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">You have no loans yet.</div>}
        </div>
      )}
    </section>
  );
}