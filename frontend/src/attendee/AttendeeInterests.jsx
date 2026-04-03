 
// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Users, Star, Zap, CheckCircle2, Building2, Info } from "lucide-react";
// import AttendeeSidebar from "./AttendeeSidebar";

// const API = "https://event-managemant-system-mern-stack.vercel.app/api";

// function AttendeeInterests() {
//   const [exhibitors, setExhibitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [msg, setMsg] = useState("");
//   const [success, setSuccess] = useState(false);

//   useEffect(() => {
//     fetchExhibitors();
//   }, []);

//   const fetchExhibitors = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API}/users/exhibitors`);
//       const data = await res.json();

//       if (!res.ok) {
//         setMsg(data?.message || "Failed to fetch exhibitors");
//         setExhibitors([]);
//         return;
//       }
//       setExhibitors(Array.isArray(data) ? data : []);
//     } catch (err) {
//       setMsg("Server error while fetching exhibitors");
//       setExhibitors([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showInterest = async (exhibitorId) => {
//     const attendee = JSON.parse(localStorage.getItem("user"));
//     if (!attendee?._id) {
//       setMsg("Please login as attendee first");
//       setSuccess(false);
//       return;
//     }

//     try {
//       setMsg("");
//       const res = await fetch(`${API}/leads`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ attendeeId: attendee._id, exhibitorId }),
//       });

//       const data = await res.json();
//       if (!res.ok) {
//         setMsg(data?.message || "Failed to send interest");
//         setSuccess(false);
//         return;
//       }

//       setMsg("Interest registered! Exhibitor will be notified.");
//       setSuccess(true);
//       // 3 second baad message hide karne ke liye
//       setTimeout(() => setMsg(""), 3000);
//     } catch (err) {
//       setMsg("Server error while sending interest");
//       setSuccess(false);
//     }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
//       {/* Dynamic Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/10 blur-[120px] rounded-full animate-pulse" />
//         <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
//       </div>

//       <div className="hidden md:flex flex-none w-64 h-full border-r border-white/5 bg-slate-950/50 backdrop-blur-md">
//         <AttendeeSidebar />
//       </div>

//       <main className="flex-1 h-full overflow-y-auto relative">
//         <div className="max-w-[1400px] mx-auto p-8 md:p-12">
          
//           {/* Header Section */}
//           <header className="mb-16">
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="flex items-center gap-2 mb-4"
//             >
//                <div className="h-px w-10 bg-sky-500/50"></div>
//                <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Lead Generation</span>
//             </motion.div>
            
//             <motion.h1 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-5xl md:text-6xl font-black tracking-tight mb-6"
//             >
//               Exhibitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-600">Booths</span>
//             </motion.h1>
            
//             <motion.p 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.1 }}
//               className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed"
//             >
//               Discover industry partners. Click <span className="text-sky-400 italic">"Show Interest"</span> to instantly share your profile with them as a potential lead.
//             </motion.p>
//           </header>

//           {/* Feedback Message */}
//           <AnimatePresence>
//             {msg && (
//               <motion.div 
//                 initial={{ opacity: 0, y: -20, scale: 0.95 }}
//                 animate={{ opacity: 1, y: 0, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.95 }}
//                 className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 backdrop-blur-xl ${
//                   success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
//                 }`}
//               >
//                 {success ? <CheckCircle2 size={20} /> : <Info size={20} />}
//                 <span className="text-sm font-bold uppercase tracking-wider">{msg}</span>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Grid Content */}
//           {loading ? (
//             <div className="flex flex-col items-center justify-center py-20">
//               <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mb-4" />
//               <p className="text-slate-500 font-bold tracking-widest text-xs">SCANNING BOOTHS...</p>
//             </div>
//           ) : exhibitors.length === 0 ? (
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//               className="text-center py-24 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]"
//             >
//               <Users size={48} className="mx-auto text-slate-700 mb-4" />
//               <p className="text-slate-400">No active exhibitors found at the moment.</p>
//             </motion.div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//               {exhibitors.map((ex, index) => (
//                 <motion.div
//                   key={ex._id}
//                   initial={{ opacity: 0, y: 30 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.05 }}
//                   whileHover={{ y: -10 }}
//                   className="group relative rounded-[2.5rem] bg-slate-900/40 border border-white/10 p-8 shadow-2xl hover:border-sky-500/30 transition-all duration-500"
//                 >
//                   {/* Glass Card Top Decoration */}
//                   <div className="absolute top-0 right-0 p-8">
//                     <Star size={20} className="text-sky-500/20 group-hover:text-sky-400 transition-colors" />
//                   </div>

//                   <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-600/10 border border-sky-500/20 flex items-center justify-center mb-6 shadow-inner">
//                     <Building2 className="text-sky-400" size={28} />
//                   </div>

//                   <h2 className="text-2xl font-black text-white mb-2 group-hover:text-sky-400 transition-colors">
//                     {ex.name || "Exhibitor"}
//                   </h2>
                  
//                   <p className="text-slate-500 text-sm mb-8 font-medium italic break-all">
//                     {ex.email}
//                   </p>

//                   <div className="pt-6 border-t border-white/5">
//                     <motion.button
//                       whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)" }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => showInterest(ex._id)}
//                       className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-[length:200%_auto] hover:bg-right text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10"
//                     >
//                       <Zap size={14} />
//                       Show Interest
//                     </motion.button>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AttendeeInterests;




import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Star, Zap, CheckCircle2, Building2, Info, Menu } from "lucide-react";
import AttendeeSidebar from "./AttendeeSidebar";

const API = "https://event-managemant-system-mern-stack.vercel.app/api";

function AttendeeInterests() {
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  
  // ✅ Sidebar State for Mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchExhibitors();
  }, []);

  const fetchExhibitors = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/users/exhibitors`);
      const data = await res.json();

      if (!res.ok) {
        setMsg(data?.message || "Failed to fetch exhibitors");
        setExhibitors([]);
        return;
      }
      setExhibitors(Array.isArray(data) ? data : []);
    } catch (err) {
      setMsg("Server error while fetching exhibitors");
      setExhibitors([]);
    } finally {
      setLoading(false);
    }
  };

  const showInterest = async (exhibitorId) => {
    const attendee = JSON.parse(localStorage.getItem("user"));
    if (!attendee?._id) {
      setMsg("Please login as attendee first");
      setSuccess(false);
      return;
    }

    try {
      setMsg("");
      const res = await fetch(`${API}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendeeId: attendee._id, exhibitorId }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMsg(data?.message || "Failed to send interest");
        setSuccess(false);
        return;
      }

      setMsg("Interest registered! Exhibitor will be notified.");
      setSuccess(true);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Server error while sending interest");
      setSuccess(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
      {/* ✅ Sidebar Integrated with props */}
      <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* ✅ Main Content Area Adjusted for Sidebar */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 relative">
        
        {/* ✅ MOBILE HEADER (Hamburger Menu) */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617]/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-white shadow-xl active:scale-95 transition-all"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">
              Event<span className="text-sky-500">Sphere</span>
            </h2>
            <div className="w-10" /> 
        </div>

        {/* Dynamic Background (Original) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-600/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full" />
        </div>

        <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar no-scrollbar">
          <div className="max-w-[1400px] mx-auto p-8 md:p-12">
            
            {/* Header Section */}
            <header className="mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                 <div className="h-px w-10 bg-sky-500/50"></div>
                 <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Lead Generation</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black tracking-tight mb-6"
              >
                Exhibitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-600">Booths</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed"
              >
                Discover industry partners. Click <span className="text-sky-400 italic">"Show Interest"</span> to instantly share your profile with them as a potential lead.
              </motion.p>
            </header>

            {/* Feedback Message */}
            <AnimatePresence>
              {msg && (
                <motion.div 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`mb-8 p-4 rounded-2xl border flex items-center gap-3 backdrop-blur-xl ${
                    success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"
                  }`}
                >
                  {success ? <CheckCircle2 size={20} /> : <Info size={20} />}
                  <span className="text-sm font-bold uppercase tracking-wider">{msg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Grid Content */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mb-4" />
                <p className="text-slate-500 font-bold tracking-widest text-xs">SCANNING BOOTHS...</p>
              </div>
            ) : exhibitors.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-24 rounded-[3rem] border border-dashed border-white/10 bg-white/[0.01]"
              >
                <Users size={48} className="mx-auto text-slate-700 mb-4" />
                <p className="text-slate-400">No active exhibitors found at the moment.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {exhibitors.map((ex, index) => (
                  <motion.div
                    key={ex._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="group relative rounded-[2.5rem] bg-slate-900/40 border border-white/10 p-8 shadow-2xl hover:border-sky-500/30 transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 p-8">
                      <Star size={20} className="text-sky-500/20 group-hover:text-sky-400 transition-colors" />
                    </div>

                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-600/10 border border-sky-500/20 flex items-center justify-center mb-6 shadow-inner">
                      <Building2 className="text-sky-400" size={28} />
                    </div>

                    <h2 className="text-2xl font-black text-white mb-2 group-hover:text-sky-400 transition-colors">
                      {ex.name || "Exhibitor"}
                    </h2>
                    
                    <p className="text-slate-500 text-sm mb-8 font-medium italic break-all">
                      {ex.email}
                    </p>

                    <div className="pt-6 border-t border-white/5">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(14, 165, 233, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => showInterest(ex._id)}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-[length:200%_auto] hover:bg-right text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 shadow-lg shadow-sky-500/10"
                      >
                        <Zap size={14} />
                        Show Interest
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AttendeeInterests;