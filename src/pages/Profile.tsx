import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUser } from "@/store/authSlice";

export default function Profile() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const loans = useQuery({ queryKey: ["loans"], queryFn: api.getLoans });
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [editing, setEditing] = useState(false);

  if (!user) return <div className="container-page py-10"><Card className="p-8 text-center">Please login to see your profile.</Card></div>;

  async function save() {
    try { const updated = await api.updateProfile({ name, phone }); dispatch(updateUser(updated)); setEditing(false); toast.success("Profile updated."); }
    catch (e) { toast.error(e instanceof Error ? e.message : "Update failed."); }
  }

  const borrowed = loans.data?.filter((l) => l.status === "BORROWED").length ?? 0;
  const returned = loans.data?.filter((l) => l.status === "RETURNED").length ?? 0;

  return (
    <section className="container-page py-10">
      <div className="mx-auto max-w-[780px]">
        <div className="flex w-full rounded-2xl bg-gray-100 p-2 text-sm"><button className="flex-1 rounded-xl bg-white py-3 font-semibold shadow-sm">Profile</button><span className="flex-1 py-3 text-center text-gray-500">Borrowed List</span><span className="flex-1 py-3 text-center text-gray-500">Reviews</span></div>
        <h1 className="mt-8 text-3xl font-bold">Profile</h1>
        <Card className="mt-6 p-6 sm:p-8">
          <img src={user.avatar || "/assets/avatar.png"} className="size-20 rounded-full object-cover" />
          <div className="mt-7 grid gap-5">
            <label className="text-sm font-medium">Name<Input className="mt-2" value={name} disabled={!editing} onChange={(e) => setName(e.target.value)} /></label>
            <label className="text-sm font-medium">Email<Input className="mt-2" value={user.email} disabled /></label>
            <label className="text-sm font-medium">Nomor Handphone<Input className="mt-2" value={phone} disabled={!editing} onChange={(e) => setPhone(e.target.value)} /></label>
          </div>
          {editing ? <div className="mt-6 flex gap-3"><Button className="flex-1" onClick={save}>Save Profile</Button><Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>Cancel</Button></div> : <Button className="mt-6 w-full" onClick={() => setEditing(true)}>Update Profile</Button>}
        </Card>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Card className="p-6"><p className="text-sm text-gray-500">Currently Borrowed</p><p className="mt-2 text-3xl font-bold">{borrowed}</p></Card>
          <Card className="p-6"><p className="text-sm text-gray-500">Returned</p><p className="mt-2 text-3xl font-bold">{returned}</p></Card>
        </div>
      </div>
    </section>
  );
}