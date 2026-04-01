import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#020617] border-t border-white/10 text-slate-400 relative overflow-hidden">
      {/* 🌌 Enhanced Glow Effect (Ab ye washed-out nahi lagega) */}
      <div className="absolute -top-24 -left-24 w-[500px] h-[500px] bg-sky-500/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20 relative z-10">
        <div className="grid gap-12 md:grid-cols-4 lg:grid-cols-5">
          
          {/* 🚀 Brand & Description */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link to="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(14,165,233,0.2)] group-hover:shadow-sky-500/40 transition-all">
                <span className="text-white font-black text-xl italic">E</span>
              </div>
              <span className="text-2xl font-black text-white tracking-tighter uppercase">
                Event<span className="text-sky-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.4)]">Sphere</span>
              </span>
            </Link>
            <p className="mt-8 text-sm leading-relaxed max-w-sm text-slate-400 font-medium">
              Next-generation platform for managing high-impact expos and trade shows. 
              We streamline the experience for organizers, exhibitors, and attendees worldwide.
            </p>
            {/* Social Icons (Dark Premium Style) */}
            <div className="flex gap-4 mt-8">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <a key={index} href="#" className="p-3 rounded-xl bg-slate-900/50 border border-white/5 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 hover:bg-slate-900 transition-all duration-300 shadow-lg">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

         {/* 🔗 Quick Links */}
          <div>
  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white mb-8 flex items-center gap-2">
    <span className="w-2 h-2 bg-sky-500 rounded-full"></span> Navigation
  </h3>
  <ul className="space-y-4 text-[13px] font-bold">
    {[
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Expos", path: "/expos" },
      { name: "Contact Us", path: "/contact" }, // 👈 Ab ye exact /contact pe jayega
    ].map((item) => (
      <li key={item.name}>
        <Link 
          to={item.path} 
          className="hover:text-sky-400 transition-colors duration-300 block"
        >
          {item.name}
        </Link>
      </li>
    ))}
  </ul>
      </div>

         {/* 🛠 User Panels */}
<div>
  <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white mb-8 flex items-center gap-2">
    <span className="w-2 h-2 bg-sky-500 rounded-full"></span> User Panels
  </h3>
  <ul className="space-y-4 text-[13px] font-bold">
    {[
      { name: 'Admin', path: '/admin' },
      { name: 'Exhibitor', path: '/exhibitor' },
      { name: 'Attendee', path: '/attendee/dashboard' }
    ].map((panel) => (
      <li key={panel.name}>
        <Link 
          to={panel.path} 
          className="hover:text-sky-400 transition-colors duration-300 block"
        >
          {panel.name} Panel
        </Link>
      </li>
    ))}
  </ul>
</div>

          {/* 📞 Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-white mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-sky-500 rounded-full"></span> Get in Touch
            </h3>
            <ul className="space-y-5 text-[13px] font-bold">
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-sky-500/5 border border-sky-500/10 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <Mail size={14} className="text-sky-500 group-hover:text-white" />
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">support@eventsphere.com</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-sky-500/5 border border-sky-500/10 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <Phone size={14} className="text-sky-500 group-hover:text-white" />
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg bg-sky-500/5 border border-sky-500/10 group-hover:bg-sky-500 group-hover:text-white transition-all">
                  <MapPin size={14} className="text-sky-500 group-hover:text-white" />
                </div>
                <span className="text-slate-300 group-hover:text-white transition-colors leading-snug">Global Expo Hub, Tech City</span>
              </li>
            </ul>
          </div>

        </div>

        {/* 📜 Bottom Bar (Solid Dark) */}
       {/* 📜 Bottom Bar (Perfectly Centered) */}
<div className="mt-20 pt-10 border-t border-white/5 flex flex-col items-center justify-center gap-6 text-center">
  
  {/* Copyright Text */}
  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
    © {currentYear} <span className="text-slate-400">EventSphere Management System</span> 
  </p>

  {/* Policy Links */}
  <div className="flex gap-10 text-[10px] font-black uppercase tracking-[0.15em] text-slate-500">
    <a href="#" className="hover:text-sky-400 transition-all duration-300 relative group">
      Privacy Policy
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
    </a>
    <a href="#" className="hover:text-sky-400 transition-all duration-300 relative group">
      Terms of Service
      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-sky-400 transition-all duration-300 group-hover:w-full"></span>
    </a>
  </div>

</div>


      </div>
    </footer>
  );
}

export default Footer;