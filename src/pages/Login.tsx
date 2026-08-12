import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/Logo";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api";
import { useAppDispatch } from "@/store/hooks";
import { setAuth } from "@/store/authSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("johndoe@email.com");
  const [password, setPassword] = useState("password");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.login(email, password);
      dispatch(setAuth(result));
      toast.success("Login successful.");
      navigate("/");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed.");
    } finally { setLoading(false); }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-[520px]">
        <Logo />
        <h1 className="mt-8 text-3xl font-bold">Login</h1>
        <p className="mt-2 text-gray-600">Sign in to manage your library account.</p>
        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block text-sm font-semibold">Email<Input className="mt-2" type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="block text-sm font-semibold">Password
            <div className="relative mt-2">
              <Input type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="pr-12" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">{show ? <EyeOff size={18} /> : <Eye size={18} />}</button>
            </div>
          </label>
          <Button className="w-full" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>
        </form>
        <p className="mt-6 text-center text-sm">Don't have an account? <Link className="font-semibold text-blue-600" to="/register">Register</Link></p>
      </div>
    </div>
  );
}