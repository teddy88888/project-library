import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  // Ambil status autentikasi dari Redux
  const { isAuthenticated } = useSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    // Jika tidak login, arahkan ke halaman login
    return <Navigate to="/login" replace />;
  }

  // Jika sudah login, tampilkan konten di dalamnya (Outlet)
  return <Outlet />;
};

export default ProtectedRoute;
