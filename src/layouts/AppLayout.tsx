import { Outlet } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export function AppLayout() {
  return <div className="min-h-screen"><Header /><main><Outlet /></main><Footer /></div>;
}