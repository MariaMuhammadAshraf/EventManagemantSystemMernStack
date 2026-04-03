import React, { useEffect, useState } from "react"; // 1. Hooks import kiye
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, ArrowRight, Zap, Globe, Shield } from "lucide-react";
// Sirf ye ek line rakhein, purani 'import { motion }...' wali line delete kar dein
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

 
// Note: Logos should be monochrome (white/grey) for a premium dark theme.
const brands = [
  { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
  { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" },
  { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
  { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
];

// We double the array to create a seamless looping effect
const infiniteBrands = [...brands, ...brands];
function Home() {
const [expos, setExpos] = useState([]); // 2. State for dynamic data

  // 3. Backend se data fetch karne ka logic
  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/expos");
        const data = await res.json();
        // Sirf available expos lein aur top 3 dikhayein
        const availableExpos = data
          .filter((expo) => expo.availability === "available")
          .slice(0, 3); 
        setExpos(availableExpos);
      } catch (error) {
        console.error("Error fetching expos for home:", error);
      }
    };
    fetchExpos();
  }, []);
const Counter = ({ from, to }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    // repeat: Infinity lagane se ye chalta rahega
    const controls = animate(count, to, { 
      duration: 3, 
      repeat: Infinity, 
      repeatType: "reverse", // Ye 500 se wapis 0 par smooth laye ga
      ease: "easeInOut" 
    });
    return controls.stop;
  }, [count, to]);

  return <motion.span>{rounded}</motion.span>;
};
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };


  return (
  <div className="bg-[#020617] lg:pt-32 font-sans text-white selection:bg-sky-500/30">
      
     {/* ================= HERO SECTION (FIXED & RESPONSIVE) ================= */}
<section className="relative   flex items-center justify-center overflow-hidden bg-[#020617]">
  {/* Dynamic Background */}
  <motion.div 
    initial={{ scale: 1.2 }}
    animate={{ scale: 1 }}
    transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
    className="absolute inset-0 z-0 opacity-30"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=3840&q=100')",
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  />
  <div className="absolute   inset-0 bg-gradient-to-b from-slate-350/90 via-[#020617]/80 to-[#020617] z-10"></div>

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    /* Fixed: Added top padding to prevent overlap with fixed navbar */
    className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-32 pb-20 md:py-20"
  >
    <motion.span 
      className="inline-block px-4 py-1.5   mb-6 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase bg-sky-500/10 border border-sky-500/20 rounded-full text-sky-400"
    >
      Welcome to the Future of Events
    </motion.span>
    
    {/* Fixed: Responsive Font Sizes for Heading */}
    {/* 2. Balanced Heading */}
  <h1 className="max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-[1000] tracking-tight leading-[1.05] uppercase italic mb-6">
    <span className=" text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-100 to-indigo-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">Powering the</span>
    <span className="relative inline-block mx-2">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-100 to-indigo-300 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]">
        Next Era
      </span>
    </span>
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-100 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">of Expos</span>
  </h1>
    <p className="max-w-xl mx-auto text-sm md:text-xl text-blue-100/60 font-medium leading-relaxed mb-10">
      EventSphere Management delivers seamless, tech-driven expo experiences for world-class organizers and attendees.
    </p>

  
{/* Fixed: Responsive Button Container */}
<div className="flex flex-col sm:flex-row gap-4 md:gap-10 justify-center items-center px-6 mt-8 w-full max-w-[320px] sm:max-w-none mx-auto">

 {/* --- PRIMARY BUTTON: EXPLORE EXPOS --- */}
  <div className="relative group p-[4px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(14,165,233,0.5)] w-full sm:w-auto">
    {/* High-Visibility Animated Border - Contrast Barha Diya Hai */}
    <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite_reverse] 
                     bg-[conic-gradient(from_0deg_at_50%_50%,#38bdf8_0%,#ffffff_15%,transparent_30%,#0ea5e9_50%,#ffffff_65%,transparent_80%,#38bdf8_100%)]">
    </span>
    
    <Link
      to="/expos"
      className="relative z-10 flex items-center justify-center gap-3 px-8 md:px-12 py-3.5 md:py-4 rounded-full bg-[#020617] text-white font-black tracking-[0.15em] uppercase text-[11px] md:text-sm w-full h-full"
    >
      <span className="bg-gradient-to-r from-sky-200 to-white bg-clip-text text-transparent">
        Explore Expos
      </span>
      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform text-sky-400" />
    </Link>
  </div>

  {/* --- SECONDARY BUTTON: GET STARTED --- */}
  <div className="relative group p-[4px] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(56,189,248,0.5)] w-full sm:w-auto">
    {/* Isme white aur sky-blue zyada sharp rakha hai */}
    <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] 
                     bg-[conic-gradient(from_0deg_at_50%_50%,#ffffff_0%,#38bdf8_15%,transparent_30%,#ffffff_50%,#0ea5e9_65%,transparent_80%,#ffffff_100%)]">
    </span>

    <Link
      to="/signup"
      className="relative z-10 flex items-center justify-center gap-3 px-8 md:px-12 py-3.5 md:py-4 rounded-full bg-[#020617] text-white font-black tracking-[0.15em] uppercase text-[11px] md:text-sm w-full h-full"
    >
      <span className="bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
        Get Started
      </span>
      {/* Pulse Glow */}
      <div className="relative flex h-2.5 w-2.5 ml-1">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500 shadow-[0_0_15px_#38bdf8]"></span>
      </div>
    </Link>
  </div>
</div>
  </motion.div>

  {/* Tailwind Animations (Ensure these are in your global CSS or in this style tag) */}
<style dangerouslySetInnerHTML={{ __html: `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`}} />
</section>

{/* --- ANIMATED ORIGINAL COLOR LOGO SECTION --- */}
<motion.section 
  
  initial={{ opacity: 0, y: 60 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.3 }} 
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden bg-[#020617]"
>
  
  {/* Background Glows for Depth */}
  <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
  <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

  <div className="max-w-7xl mx-auto px-6 relative z-10">
    
    {/* --- MODERN HEADER DESIGN --- */}
    <div className="flex flex-col items-center mb-20 text-center">
       <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="px-4 py-1.5 rounded-full border border-sky-500/20 bg-sky-500/5 mb-6"
       >
          <span className="text-sky-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em]">
            Global Partners
          </span>
       </motion.div>
       
       <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
         Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Industry Leaders</span> Worldwide
       </h2>
       <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-sky-500 to-transparent mt-6"></div>
    </div>

    {/* --- PREMIUM INFINITE TICKER --- */}
    <div className="relative">
      {/* Side Fades - Masking effects */}
      <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none"></div>

      <div className="overflow-hidden py-10">
        <motion.div
          className="flex flex-none gap-20 md:gap-32 items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 15, // Speed barha di gayi hai (Pehle 25 thi)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {infiniteBrands.map((brand, index) => (
            <div key={index} className="relative flex-none group">
              <motion.div 
                
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 5, 
                  y: -12 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="relative z-10 flex items-center justify-center cursor-pointer px-4"
              >
                {/* --- ORIGINAL COLORS RESTORED --- */}
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-9 md:h-14 w-auto object-contain opacity-80 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                />
                
                {/* Subtle Glow behind logo on hover */}
                <div className="absolute inset-0 bg-sky-500/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>

    {/* Bottom Glassy Divider */}
    <div className="mt-16 h-[1px] w-full bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
  </div>
</motion.section>




{/* ================= ABOUT SECTION (SCROLL TRIGGERED & RESPONSIVE) ================= */}
<section className="py-20 md:py-32 px-4 md:px-6 relative overflow-hidden bg-[#020617]">
  {/* Background Glows */}
  <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-sky-500/10 blur-[120px] rounded-full z-0 opacity-50"></div>

  <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
    
    {/* --- LEFT CONTENT (Scroll Animated) --- */}
    <motion.div 
      initial="hidden"
      whileInView="visible"
      // viewport once: false ka matlab hai upar niche scroll par animation dobara hogi
      viewport={{ once: false, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, x: -50 },
        visible: { 
          opacity: 1, 
          x: 0, 
          transition: { staggerChildren: 0.2, duration: 0.8, ease: "easeOut" } 
        }
      }}
      className="relative order-2 lg:order-1"
    >
      <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="absolute -top-10 -left-10 w-40 h-40 bg-sky-500/10 blur-3xl rounded-full"></motion.div>
      
      <motion.h2 
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        className="text-4xl md:text-7xl font-black uppercase italic mb-6 md:mb-8 leading-tight text-white"
      >
        About <span className="text-sky-500 drop-shadow-[0_0_20px_rgba(14,165,233,0.5)]">EventSphere</span>
      </motion.h2>
      
      <motion.p 
        variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
        className="text-blue-100/70 text-base md:text-lg leading-relaxed mb-10 md:mb-12 font-medium border-l-4 border-sky-500 pl-6 bg-gradient-to-r from-sky-500/5 to-transparent py-4 rounded-r-2xl"
      >
        We are a next-generation platform designed to simplify large-scale trade shows. From exhibitor onboarding to real-time analytics, we empower you with smart tools.
      </motion.p>

     {/* --- STATS CARDS (MOBILE RESPONSIVE WIDTH FIXED) --- */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 px-4 w-full max-w-5xl mx-auto">
  {[
    { label: "Events Managed", value: 500, suffix: "+" },
    { label: "Happy Attendees", value: 50, suffix: "k+" }
  ].map((stat, idx) => (
    <motion.div 
      key={idx} 
      variants={{ 
        hidden: { y: 30, opacity: 0, scale: 0.9 }, 
        visible: { y: 0, opacity: 1, scale: 1 } 
      }}
      whileHover={{ scale: 1.05, y: -5 }}
     
      className="relative group p-[2px] rounded-3xl overflow-hidden bg-white/5 shadow-[0_0_30px_rgba(14,165,233,0.15)] w-full max-w-[340px] sm:max-w-none mx-auto"
    >
      <span className="absolute inset-[-400%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#38bdf8_25%,transparent_50%,#2563eb_75%,transparent_100%)] opacity-40 group-hover:opacity-100 transition-opacity"></span>
      
      <div className="relative z-10 p-6 md:p-8 rounded-[1.4rem] bg-[#03081a]/90 backdrop-blur-2xl border border-white/10 text-center sm:text-left">
        <p className="text-4xl md:text-5xl font-black text-sky-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]">
          <Counter from={0} to={stat.value} />{stat.suffix}
        </p>
        <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.25em] text-blue-200/50 mt-3">{stat.label}</p>
      </div>
    </motion.div>
  ))}
 
      </div>
    </motion.div>

    {/* --- RIGHT IMAGE (Slide Reveal) --- */}
    <motion.div 
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative order-1 lg:order-2 group w-full max-w-[500px] lg:max-w-none mx-auto"
    >
      <div className="relative p-[2px] md:p-[3px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl shadow-sky-500/10">
        <span className="absolute inset-[-200%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#38bdf8_0%,transparent_50%,#1d4ed8_100%)] opacity-60"></span>
        
        <div className="relative z-10 rounded-[1.9rem] md:rounded-[2.9rem] overflow-hidden border border-white/10">
          <img
            src="https://images.pexels.com/photos/35138560/pexels-photo-35138560.jpeg"
            className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-[3s] ease-out"
            alt="Expo"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent opacity-60"></div>
        </div>
      </div>
      {/* Dynamic Glow */}
      <div className="absolute -bottom-10 -right-10 w-48 md:w-64 h-48 md:h-64 bg-blue-600/20 blur-[100px] rounded-full -z-10 animate-pulse"></div>
    </motion.div>
  </div>

  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `}} />
</section>

    {/* ================= FEATURES (PREMIUM NEON ANIMATED CARDS) ================= */}
<section className="py-32 bg-[#020617] border-y border-white/5 px-6 relative overflow-hidden">
  {/* Ambient background glow - Increased opacity for permanent feel */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-sky-500/10 blur-[130px] rounded-full z-0"></div>

  <div className="max-w-7xl mx-auto relative z-10">
    <div className="text-center mb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-6xl font-black uppercase italic mb-4"
      >
        Why Choose <span className="text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]">Us?</span>
      </motion.h2>
      <div className="h-1.5 w-24 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full shadow-[0_0_20px_rgba(14,165,233,0.6)]"></div>
    </div>

    <div className="grid md:grid-cols-3 gap-10">
      {[
        { icon: <LayoutDashboard size={32} />, title: "Smart Management", desc: "One powerful dashboard for all your expo registrations and schedules." },
        { icon: <Users size={32} />, title: "Exhibitor Engagement", desc: "Interactive profiles and seamless communication tools for booths." },
        { icon: <BarChart3 size={32} />, title: "Real-Time Insights", desc: "Live analytics on attendee behavior and session popularity." }
      ].map((feature, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.2 }}
          whileHover={{ y: -15, scale: 1.02 }}
          className="relative group p-[2px] rounded-[2.5rem] overflow-hidden bg-white/5 transition-all duration-500 shadow-[0_0_30px_rgba(14,165,233,0.1)] hover:shadow-[0_0_50px_rgba(14,165,233,0.3)]"
        >
          {/* --- INFINITE GRADIENT BORDER (Hamesha On, Hover par zyada Bright) --- */}
          <span className="absolute inset-[-500%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#38bdf8_25%,transparent_50%,#2563eb_75%,transparent_100%)] opacity-100 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite]"></span>

          {/* CARD BODY */}
          <div className="relative z-10 h-full p-10 rounded-[2.4rem] bg-[#03081a] backdrop-blur-3xl flex flex-col items-start border border-white/5 shadow-[inset_0_0_20px_rgba(14,165,233,0.1)]">
            
            {/* --- ICON BOX WITH PERMANENT ANIMATED GLOW --- */}
            <div className="relative p-[2px] rounded-2xl overflow-hidden mb-8 shadow-[0_0_20px_rgba(14,165,233,0.4)] group-hover:shadow-[0_0_35px_rgba(14,165,233,0.6)] transition-all">
              <span className="absolute inset-[-300%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,#38bdf8_0%,transparent_50%,#38bdf8_100%)]"></span>
              
              <div className="relative z-10 w-16 h-16 rounded-[14px] bg-[#020617] flex items-center justify-center text-sky-400">
                {feature.icon}
              </div>
            </div>

            <h3 className="text-2xl font-black mb-4 text-white group-hover:text-sky-400 transition-colors uppercase italic tracking-tight drop-shadow-[0_0_8px_rgba(14,165,233,0.3)]">
              {feature.title}
            </h3>
            
            <p className="text-blue-100/60 leading-relaxed font-medium text-lg">
              {feature.desc}
            </p>

            {/* --- PERMANENT BOTTOM GLOW (Hover par barh jaye) --- */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-sky-500/30 blur-md group-hover:bg-sky-500/80 transition-all duration-500 rounded-full"></div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}} />
</section>
   
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full z-0"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-4xl md:text-6xl font-black uppercase italic leading-none"
            >
              Upcoming <span className="text-sky-500 drop-shadow-[0_0_15px_rgba(14,165,233,0.4)]">Events</span>
            </motion.h2>
            <p className="text-blue-100/40 mt-4 font-bold tracking-[0.3em] uppercase text-xs border-l-2 border-sky-500 pl-4">
              Join world-class trade shows
            </p>
          </div>
          <Link to="/expos" className="group text-sky-400 font-black uppercase tracking-widest text-sm hover:text-white transition-all flex items-center gap-3 bg-sky-500/5 px-6 py-3 rounded-full border border-sky-500/20 hover:border-sky-500/60">
            View All Events <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {/* 4. Map through dynamic 'expos' state instead of static array */}
          {expos.map((expo, idx) => (
            <motion.div
              key={expo._id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -15 }}
              className="relative group p-[2px] rounded-[2.5rem] overflow-hidden bg-white/5 transition-all duration-500 shadow-[0_0_30px_rgba(14,165,233,0.1)]"
            >
              {/* --- ALWAYS ACTIVE INFINITE GRADIENT BORDER --- */}
              <span className="absolute inset-[-500%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#38bdf8_25%,transparent_50%,#1d4ed8_75%,transparent_100%)] opacity-60 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite]"></span>

              {/* CARD CONTENT */}
              <div className="relative z-10 h-full bg-[#03081a] rounded-[2.4rem] overflow-hidden flex flex-col border border-white/5">
                
                {/* IMAGE CONTAINER */}
                <div className="h-64 overflow-hidden relative">
                  <img 
                    src={expo.image || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out" 
                    alt={expo.title} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#03081a] via-[#03081a]/20 to-transparent"></div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-5 right-5 px-4 py-1.5 bg-sky-500 rounded-full text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(14,165,233,0.5)] border border-white/20">
                    {expo.availability === "available" ? "Live Shortly" : "Full"}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-8 relative">
                  <p className="text-sky-400 text-xs font-black tracking-[0.2em] uppercase mb-3 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-sky-500/50"></span> 2026 Season
                  </p>
                  <h3 className="text-2xl font-black mb-6 text-white group-hover:text-sky-400 transition-colors leading-tight uppercase italic drop-shadow-[0_0_10px_rgba(14,165,233,0.2)] line-clamp-1">
                    {expo.title}
                  </h3>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-2 text-blue-100/40 text-[11px] font-black uppercase tracking-widest italic">
                      <Globe size={14} className="text-sky-500/70" /> {expo.location || "Online"}
                    </div>
                    {/* Link to specific expo detail if you have it, or just signup */}
                    <Link to="/signup" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-sky-500 transition-all duration-500">
                       <ArrowRight size={14} className="text-white group-hover:rotate-[-45deg] transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Permanent Inner Bottom Glow */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500/40 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
     {/* ================= CTA (FINAL CONVERSION) WITH FLOATING PARTICLES ================= */}
<section className="relative py-40 px-6 text-center overflow-hidden bg-[#020617]">
  
  {/* --- DYNAMIC BACKGROUND LAYERS --- */}
  <div className="absolute inset-0 z-0">
    {/* Main Glow */}
    <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-sky-500/10 blur-[180px] rounded-full"></div>
    {/* Secondary Glow */}
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full"></div>
  </div>

  {/* --- FLOATING PARTICLES (Animated) --- */}
  {[...Array(6)].map((_, i) => (
    <motion.div
      key={i}
      className="absolute bg-sky-400/20 rounded-full blur-sm z-0"
      style={{
        width: Math.random() * 15 + 5,
        height: Math.random() * 15 + 5,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -100, 0],
        opacity: [0.2, 0.5, 0.2],
        scale: [1, 1.5, 1],
      }}
      transition={{
        duration: Math.random() * 10 + 10,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  ))}

  {/* --- CONTENT --- */}
  <div className="relative z-10 max-w-4xl mx-auto">
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-8 tracking-tighter leading-tight">
        Transform Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]">Vision</span> Into Reality
      </h2>
      
      <p className="text-blue-100/60 text-lg md:text-xl font-medium mb-14 max-w-2xl mx-auto leading-relaxed">
        Join thousands of industry leaders using EventSphere to power their world-class expos.
      </p>

     {/* --- ULTRA-VISIBLE NEON GRADIENT BORDER BUTTON (MOBILE-RESPONSIVE) --- */}
<Link
  to="/signup"
  className="relative group inline-flex items-center justify-center rounded-2xl p-[3px] md:p-[4px] overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 
             /* Permanent Active Neon Glow for Table/Mobile */
             shadow-[0_0_20px_rgba(14,165,233,0.4),0_0_40px_rgba(37,99,235,0.2)]"
>
  {/* --- HIGH-CONTRAST PROFESSIONAL ROTATING BORDER (REVERSE) --- */}
  {/* Maine colors professional rakhein hain: Sky Blue, Deep Blue, White taake dark background par visible hon */}
  <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite_reverse] 
                   bg-[conic-gradient(from_0deg_at_50%_50%,#38bdf8_0%,#ffffff_25%,#2563eb_50%,#ffffff_75%,#38bdf8_100%)]">
  </span>

  {/* --- BUTTON INNER CONTENT (GRADIENT BACKGROUND ADDED) --- */}
  {/* Tablet par padding thori kam aur Desktop par zyada rakhi hai */}
  <div className="relative z-10 flex items-center justify-center gap-3 px-8 py-3.5 md:px-14 md:py-5 rounded-[13px] 
                 /* Gradient Background from Deep Blue to Indigo */
                 bg-gradient-to-br from-blue-950/80 to-indigo-950/80 backdrop-blur-md transition-all duration-500">
    
    {/* Animated Shimmer (Visible on Hover/Tap) */}
    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>

    {/* Text & Icon with Premium Shine */}
    <span className="relative z-10 flex items-center gap-2 md:gap-3 text-white font-black tracking-tighter text-lg md:text-xl uppercase italic drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
      Get Started Now 
      <Zap size={22} className="fill-white group-hover:animate-pulse group-hover:text-yellow-300 transition-colors md:w-6 md:h-6" />
    </span>
  </div>

  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `}} />
</Link>
    </motion.div>
  </div>

  {/* Inline Style for Shimmer Animation */}
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes shimmer {
      100% { transform: translateX(100%); }
    }
  `}} />
</section>
    </div>
  );
}

export default Home;







