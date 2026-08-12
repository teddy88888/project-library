import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { setAuth } from "@/store/authSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      dispatch(setAuth(await api.register(name, email, password)));
      toast.success("Account created.");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Registration failed.");
    } finally { setLoading(false); }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-[520px]">
        <Logo />
        <h1 className="mt-8 text-3xl font-bold">Register</h1>
        <p className="mt-2 text-gray-600">Create your library account.</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold">Name<Input className="mt-2" value={name} onChange={(e) => setName(e.target.value)} required /></label>
          <label className="block text-sm font-semibold">Email<Input className="mt-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label className="block text-sm font-semibold">Password<Input className="mt-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></label>
          <Button className="w-full" disabled={loading}>{loading ? "Creating..." : "Register"}</Button>
        </form>
        <p className="mt-6 text-center text-sm">Already have an account? <Link className="font-semibold text-blue-600" to="/login">Login</Link></p>
      </div>
    </div>
  );
}