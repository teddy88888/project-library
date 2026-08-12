import { Instagram, Linkedin, Music2, Facebook } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200">
      <div className="container-page flex min-h-[280px] flex-col items-center justify-center py-14 text-center">
        <Logo />
        <p className="mt-6 max-w-3xl text-sm text-gray-600">Discover inspiring stories & timeless knowledge, ready to borrow anytime. Explore online or visit our nearest library branch.</p>
        <p className="mt-8 font-semibold">Follow on Social Media</p>
        <div className="mt-4 flex gap-3">
          {[Facebook, Instagram, Linkedin, Music2].map((Icon, i) => <a key={i} href="#" className="grid size-10 place-items-center rounded-full border border-gray-200 hover:bg-gray-50"><Icon className="size-4" /></a>)}
        </div>
      </div>
    </footer>
  );
}