import { Card } from "@/components/ui/Card";

export default function Admin() {
  return (
    <section className="container-page py-10">
      <h1 className="text-4xl font-bold">Admin</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <Card className="p-6"><p className="text-sm text-gray-500">Books</p><p className="mt-2 text-3xl font-bold">Manage</p></Card>
        <Card className="p-6"><p className="text-sm text-gray-500">Loans</p><p className="mt-2 text-3xl font-bold">Manage</p></Card>
        <Card className="p-6"><p className="text-sm text-gray-500">Users</p><p className="mt-2 text-3xl font-bold">Manage</p></Card>
      </div>
      <p className="mt-6 text-sm text-gray-500">The MVP guide mentions an Admin feature but does not define its exact screens or API operations, so this page is intentionally a starter dashboard.</p>
    </section>
  );
}