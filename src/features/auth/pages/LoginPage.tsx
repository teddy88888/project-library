import React, { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { setCredentials } from "../authSlice";
import axiosInstance from "@/api/axiosInstance";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Endpoint pada Railway biasanya menggunakan prefix /auth/login atau /login
      // Sesuaikan string di bawah ini dengan yang tertulis di link Swagger kamu
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Ambil token dari response data
      const token = response.data.token || response.data.data?.token;

      if (token) {
        dispatch(setCredentials({ token }));
        toast({
          title: "Login Berhasil",
          description: "Selamat datang kembali di Booky!",
        });
        navigate("/home");
      }
    } catch (error: any) {
      // Menangkap pesan error spesifik dari backend Railway
      const errorMessage =
        error.response?.data?.message || "Email atau password salah.";
      toast({
        variant: "destructive",
        title: "Login Gagal",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4 font-sans">
      <div className="w-full max-w-[400px] space-y-6">
        {/* Header Logo */}
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Booky Logo"
              className="h-10 w-10 object-contain"
            />
            <span className="text-3xl font-bold tracking-tight text-slate-900">
              Booky
            </span>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
            <p className="text-sm text-slate-500">
              Sign in to manage your library account.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-lg border-slate-200 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-lg border-slate-200 pr-10 focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold rounded-full shadow-md transition-all active:scale-95 mt-2"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Authenticating...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-bold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
