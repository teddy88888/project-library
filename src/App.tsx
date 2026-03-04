import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import HomePage from "./features/books/pages/HomePage";
import { Toaster } from "@/components/ui/toaster";

function App() {
  // Mengecek status login dari Redux Store
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <Routes>
        {/* Rute Publik */}
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/register"
          element={
            !isAuthenticated ? <RegisterPage /> : <Navigate to="/home" />
          }
        />

        {/* Rute Terproteksi (Hanya bisa diakses jika sudah login) */}
        <Route path="/home" element={<HomePage />} />

        {/* Redirect otomatis jika mengakses route yang tidak ada */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>

      {/* Komponen penting agar notifikasi Toast muncul di layar */}
      <Toaster />
    </Router>
  );
}

export default App;
