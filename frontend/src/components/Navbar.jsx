import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Expos", path: "/expos" },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 z-[100] w-full transition-all duration-300 ${
        scrolled 
          ? "bg-[#020617] py-3 border-b border-white/10 shadow-2xl" 
          : "bg-[#020617] py-5 border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10">
        
        {/* 🚀 Brand Logo */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-transform group-hover:rotate-6">
            <span className="text-white font-black text-lg italic uppercase leading-none">E</span>
          </div>
          <span className="text-xl font-[1000] text-white tracking-[0.05em] uppercase leading-none group-hover:text-sky-100 transition-colors">
            Event<span className="text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.6)]">Sphere</span>
          </span>
        </Link>

        {/* 💻 Desktop Links */}
        <ul className="hidden md:flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full border border-white/5">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link 
                to={link.path} 
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                  location.pathname === link.path 
                    ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* 🔑 Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-6">
          {!isLoggedIn ? (
            <div className="flex items-center gap-6">
              <Link to="/login" className="text-slate-400 hover:text-sky-400 font-black text-[10px] uppercase tracking-[0.2em] transition-colors">
                Login
              </Link>
              <Link to="/signup" className="px-6 py-2.5 rounded-xl bg-sky-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-sky-500/20 hover:scale-105 transition-all">
                Get Started
              </Link>
            </div>
          ) : (
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest"
            >
              <LogOut size={14} /> Logout
            </button>
          )}
        </div>

        {/* 📱 Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-sky-400 hover:bg-white/5 rounded-lg transition"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* 📱 Mobile Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-[#020617] border-b border-white/10 transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 py-10" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-8 px-8">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.path} 
                  className={`text-sm font-black uppercase tracking-tighter block transition-all ${
                    location.pathname === link.path ? "text-sky-400 border-l-4 border-sky-400 pl-4" : "text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-col gap-4 pt-8 border-t border-white/5">
            {/* FIXED SECTION: Login ke hisab se buttons change honge */}
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="w-full py-4 text-center rounded-xl border border-white/10 text-white font-black uppercase text-xs tracking-widest">
                  Login
                </Link>
                <Link to="/signup" className="w-full py-4 text-center rounded-xl bg-sky-500 text-white font-black uppercase text-xs tracking-widest shadow-lg shadow-sky-500/20">
                  Join Now
                </Link>
              </>
            ) : (
              <button 
                onClick={handleLogout} 
                className="w-full py-4 flex items-center justify-center gap-3 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-black uppercase text-xs tracking-widest hover:bg-red-500 hover:text-white transition-all"
              >
                <LogOut size={16} /> Logout From Account
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;