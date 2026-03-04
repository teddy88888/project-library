import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "../../../api/axiosInstance";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Pastikan field-nya 'name', bukan 'username' atau 'fullName'
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: "08123456789", // Tambahkan field ini agar tidak error "Field required"
      password: formData.password,
    };

    try {
      // COBA GUNAKAN "/auth/register" (Sesuai standar boilerplate Railway Library)
      const response = await axiosInstance.post("/auth/register", payload);

      console.log("Berhasil:", response.data);
      toast({
        title: "Registrasi Berhasil!",
        description: "Silakan login dengan akun baru Anda.",
      });
      navigate("/login");
    } catch (error: any) {
      console.error("Detail Error:", error.response);

      // Jika "/auth/register" masih Not Found, coba balikkan ke "/register"
      // tapi pastikan payload tetap menggunakan 'name'
      const errorMessage =
        error.response?.data?.message || "Endpoint tidak ditemukan (404).";

      toast({
        variant: "destructive",
        title: "Registrasi Gagal",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-4">
      <div className="w-full max-w-[400px] space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Booky Logo" className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-tight">Booky</span>
          </div>
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Join Booky to manage your library.
            </p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold">Full Name</label>
            <Input
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="h-11"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold">Password</label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="h-11 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-full mt-2"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
