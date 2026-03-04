import React from "react";
import { Search, Bell, Star } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { type RootState } from "../../../app/store";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

const categories = [
  { name: "Fiction", icon: "/fiction.png" },
  { name: "Non-Fiction", icon: "/nonfiction.png" },
  { name: "Self-improvement", icon: "/selfimprove.png" },
  { name: "Finance", icon: "/finance.png" },
  { name: "Science", icon: "/science.png" },
  { name: "Education", icon: "/education.png" },
];

const dummyBooks = [
  {
    id: 1,
    title: "21 Rasa Bakso Pak Bowo",
    author: "Tuhufah Rachman",
    rating: 4.5,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(1).png", // Mengarah ke public/oliver-twist.jpg
  },
  {
    id: 2,
    title: "Lisa Kleypas",
    author: "Jack London",
    rating: 4.8,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(2).png", // Mengarah ke public/white-fang.jpg
  },
  {
    id: 3,
    title: "Oliver Twist",
    author: "Charles Dickens",
    rating: 4.5,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(3).png", // Mengarah ke public/oliver-twist.jpg
  },
  {
    id: 4,
    title: "White Fang",
    author: "Jack London",
    rating: 4.8,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(4).png", // Mengarah ke public/white-fang.jpg
  },
  {
    id: 5,
    title: "WOMAN",
    author: "Jussi Adler-Olsen",
    rating: 4.5,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(5).png", // Mengarah ke public/oliver-twist.jpg
  },
  {
    id: 6,
    title: "The Plague",
    author: "Albert Camus",
    rating: 4.8,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(6).png", // Mengarah ke public/white-fang.jpg
  },
  {
    id: 7,
    title: "Kapan Pindah Rumah",
    author: "Annisa Diandari",
    rating: 4.5,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(7).png", // Mengarah ke public/oliver-twist.jpg
  },
  {
    id: 8,
    title: "Yeti dan terik yang abadi",
    author: "Darian Reve",
    rating: 4.8,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(8).png", // Mengarah ke public/white-fang.jpg
  },
  {
    id: 9,
    title: "Rumah yang menelan Penghuninya",
    author: "Kenken Layla",
    rating: 4.5,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(9).png", // Mengarah ke public/oliver-twist.jpg
  },
  {
    id: 10,
    title: "Other Half of Me",
    author: "Elasa Puspita",
    rating: 4.8,
    // Pastikan nama file ini sama persis dengan yang ada di folder public/
    image: "/image(10).png", // Mengarah ke public/white-fang.jpg
  },
];

const HomePage = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const isAuthenticated = auth?.isAuthenticated || false;
  const user = auth?.user || null;

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-900 overflow-x-hidden right-0 md:right-20 w-300px md:w-[calc(100vw-80px)] lg:w-[calc(100vw-160px)]">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-5 md:py-8 sticky top-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-50">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-8 h-8 md:w-12 md:h-12 object-contain"
          />
          <span className="text-xl md:text-3xl font-black tracking-tighter">
            Booky
          </span>
        </div>

        <div className="relative flex-1 max-w-md lg:max-w-3xl mx-4 md:mx-16">
          <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 text-slate-400" />
          <input
            placeholder="Search for books, authors..."
            className="w-full pl-12 md:pl-16 rounded-full bg-slate-100 border-none h-10 md:h-16 text-sm md:text-lg outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <Bell
                size={28}
                className="hidden md:block text-slate-500 cursor-pointer hover:text-blue-600"
              />
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border-4 border-blue-50 overflow-hidden shadow-sm">
                <img
                  src={user?.avatar || "/avatar-placeholder.png"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:gap-6">
              <Link
                to="/login"
                className="text-sm md:text-xl font-bold text-slate-600"
              >
                Login
              </Link>
              <Link to="/register">
                <Button className="bg-blue-600 rounded-full px-5 md:px-12 h-9 md:h-16 text-xs md:text-xl font-black shadow-lg">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION: welcome.png POP-OUT --- */}
      <header className="px-4 md:px-30 lg:px-24 mt-12 md:mt-40 left-0 md:left-20">
        {/* 'overflow-visible' penting agar gambar bisa keluar dari bingkai biru */}
        <div className="bg-[#E0F2FE] rounded-[2.5rem] md:rounded-[6rem] relative h-[180px] md:h-[250px] flex items-center justify-center overflow-visible">
          {/* Container Gambar dengan posisi absolut */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center md: h-full pointer-events-none">
            <img
              src="/welcome.png"
              alt="Welcome"
              className="
                w-auto 
                /* Mobile: h-[130%] membuatnya keluar bingkai ke atas */
                h-[135%] 
                md:h-[150%] 
                object-contain 
                object-bottom 
                transform 
                /* Menyesuaikan posisi agar tidak terlalu ke bawah */
                translate-y-4
                md:translate-y-12               
                md:scale-[1.8]
                md:translate-x-20
                transition-all duration-700
              "
            />
          </div>
        </div>
      </header>

      {/* --- CATEGORIES --- */}
      <section className="px-6 md:px-16 lg:px-24 mt-20 md:mt-48 space-y-8 md:space-y-24">
        <h2 className="text-2xl md:text-7xl font-black text-slate-800 tracking-tight">
          Categories
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-12">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className="relative group cursor-pointer rounded-[1.8rem] md:rounded-[5 rem] aspect-square bg-[#F8FAFC] border border-slate-100 overflow-hidden transition-all hover:shadow-xl hover:-translate-y-6"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center pb-6 md:pb-10">
                <img
                  src={cat.icon}
                  className="w-10 h-10 md:w-48 md:h-48 object-contain transition-transform group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 py-2 md:py-1 bg-white/40 backdrop-blur-md text-center border-t border-white/10">
                <span className="text-[9px] md:text-[16px] font-black text-slate-700 uppercase tracking-widest">
                  {cat.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- RECOMMENDATION --- */}
      <section className="px-6 md:px-16 lg:px-24 mt-16 md:mt-48 space-y-10 md:space-y-32">
        <h2 className="text-2xl md:text-7xl font-bold text-slate-800 tracking-tight">
          Recommendation
        </h2>

        {/* Grid: 2 Kolom (Mobile) | 5 Kolom (Desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-20">
          {/* 2. Gunakan .map() untuk me-render buku dari array dummyBooks */}
          {dummyBooks.map((book) => (
            <div key={book.id} className="flex flex-col group h-full">
              {/* Container Cover Buku dengan Aspek Rasio */}
              <div className="relative aspect-[2/3] w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* 3. Properti src mengambil data dari book.image */}
                <img
                  src={book.image} // Ini akan merender "/oliver-twist.jpg"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={book.title}
                />
              </div>

              {/* Teks Informasi Buku */}
              <div className="mt-5 md:mt-14 flex-1 flex flex-col px-2">
                <div className="flex-1 space-y-1 md:space-y-6">
                  <h3 className="font-bold text-xs md:text-3xl text-slate-800 leading-tight uppercase line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-[10px] md:text-xl text-slate-400 font-bold italic tracking-wide">
                    {book.author}
                  </p>
                </div>

                {/* RATING DI STRUKTUR PALING BAWAH */}
                <div className="flex items-center gap-1.5 md:gap-6 mt-4 md:mt-16 pt-3 md:pt-10 border-t border-slate-100">
                  <Star
                    size={14}
                    className="fill-yellow-400 text-yellow-400 md:w-10 md:h-10"
                  />
                  <span className="text-xs md:text-3xl font-black text-slate-700">
                    {book.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* --- POPULAR AUTHORS SECTION (Identik dengan Gambar After Login) --- */}
      {/* --- POPULAR AUTHORS SECTION (Identik dengan Gambar After Login) --- */}
      <section className="px-6 md:px-16 lg:px-24 mt-20 md:mt-48 space-y-10 md:space-y-32">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-7xl font-bold text-slate-800 tracking-tight">
            Popular Authors
          </h2>
          <button className="text-xs md:text-2xl font-bold text-blue-600 uppercase tracking-tighter">
            View all
          </button>
        </div>

        {/* Grid: 5 Kolom Sesuai Rekomendasi */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 md:gap-20">
          {[
            { name: "Charles Dickens", role: "Classic", img: "/author1.jpg" },
            { name: "Jack London", role: "Adventure", img: "/author2.jpg" },
            { name: "J.K. Rowling", role: "Fantasy", img: "/author3.jpg" },
            { name: "James Clear", role: "Habits", img: "/author4.jpg" },
          ].map((author, i) => (
            <div
              key={i}
              className="flex col-col items-center group cursor-pointer"
            >
              {/* Profile Frame Bulat Sempurna */}
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-[6px] md:border-[4px] border-slate-50 shadow-xl group-hover:shadow-2xl group-hover:border-blue-50 transition-all duration-500">
                <img
                  src={author}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={author.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${author.name}&background=random`;
                  }}
                />
              </div>
              <div className="mt-6 md:mt-14 text-center space-y-2 md:space-y-5">
                <h3 className="font-bold text-[10px] md:text-2xl text-slate-800 uppercase tracking-tight line-clamp-1">
                  {author.name}
                </h3>
                <div className="flex items-center justify-center gap-1 md:gap-3">
                  <span className="w-1.5 h-1.5 md:w-3 md:h-3 bg-blue-500 rounded-full"></span>
                  <p className="text-[8px] md:text-xl text-slate-400 font-bold uppercase tracking-widest">
                    {author.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* --- FOOTER (Struktur After Login) --- */}
      <footer className="mt-40 md:mt-72 bg-white border-t border-slate-100 pt-20 md:pt-48 pb-10 md:pb-24 px-6 md:px-16 lg:px-24">
        <div className="flex flex-col items-center text-center space-y-10 md:space-y-24">
          {/* Logo Footer */}
          <div className="flex col-col items-center gap-3 md:gap-6">
            <img
              src="/logo.png"
              className="w-10 h-10 md:w-20 md:h-20 "
              alt="Logo"
            />
            <span className="text-2xl md:text-5xl font-black tracking-tighter ">
              Booky<span className="">.</span>
            </span>
          </div>

          {/* Minimalist Description */}
          <p className="max-w-6xl text-slate-400 text-sm md:text-xl leading-relaxed font-medium italic">
            "Discover inspiring stories & timeless knowledge, ready to borrow
            anytime. Explore online or visit our nearest library branch."
          </p>

          {/* Social Links sesuai gambar */}
          <div className="flex flex-col items-center  gap-8 md:gap-20 text-slate-400 font-black text-[10px] md:text-[12px] uppercase tracking-[0.3em]">
            <h1 className="">Follow On  Social Media</h1>
            <div className="flex flex col- gap-5 ">
              <img
                src="/fb.png"
                className="hover:text-blue-600 transition-colors w-14"
              ></img>
              <img
                src="/instagr.png"
                className="hover:text-blue-600 transition-colors w-14"
              ></img>
              <img
                src="/linkedin.png"
                className="hover:text-blue-600 transition-colors w-14 justify-center"
              ></img>
              <img
                src="/tiktik.png"
                className="hover:text-blue-600 transition-colors w-14"
              ></img>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-10 md:pt-20 border-t border-slate-50 w-full text-center">
            <p className="text-slate-300 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">
              © 2026 Booky Digital Library. Designed by Teddy. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
