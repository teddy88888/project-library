import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import { Logo } from "./Logo";
import { Input } from "./ui/Input";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout, setAuth } from "@/store/authSlice";

export function Header() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((s) => s.auth.user);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/books?search=${encodeURIComponent(search)}`);
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Link to="/"><Logo /></Link>

        <form onSubmit={submitSearch} className="hidden w-full max-w-xl md:block">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search book" className="pl-11" />
          </div>
        </form>

        <div className="hidden items-center gap-5 md:flex">
          <button className="relative rounded-full p-2 hover:bg-gray-100" title="Cart">
            <ShoppingBag className="size-5" />
            <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full bg-rose-500 text-[10px] text-white">1</span>
          </button>
          <button className="flex items-center gap-3" onClick={() => setOpen(!open)}>
            <img src={user?.avatar || "/assets/avatar.png"} className="size-9 rounded-full object-cover" />
            <span className="text-sm font-medium">{user?.name || "Guest"}</span>
            <ChevronDown className="size-4" />
          </button>
          {open && (
            <div className="absolute right-6 top-[62px] w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-lg">
              {user ? (
                <>
                  <Link onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50" to="/profile">Profile</Link>
                  <Link onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-50" to="/loans">My Loans</Link>
                  <button onClick={() => { dispatch(logout()); setOpen(false); navigate("/login"); }} className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-gray-50">Logout</button>
                </>
              ) : <Link className="block rounded-lg px-3 py-2 text-sm" to="/login">Login</Link>}
            </div>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Open menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-gray-100 p-4 md:hidden">
          <form onSubmit={submitSearch} className="mb-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search book" className="pl-11" />
            </div>
          </form>
          <div className="grid gap-1">
            <Link className="rounded-lg px-3 py-2" to="/profile">Profile</Link>
            <Link className="rounded-lg px-3 py-2" to="/loans">My Loans</Link>
            {user && <button className="rounded-lg px-3 py-2 text-left" onClick={() => { dispatch(logout()); navigate("/login"); }}>Logout</button>}
          </div>
        </div>
      )}
    </header>
  );
}