 





// import React, { useEffect, useMemo, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MessageSquare, Search, Building2, User, ArrowRight, Sparkles } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import AttendeeSidebar from "./AttendeeSidebar";

// const API = "https://event-managemant-system-mern-stack.vercel.app";

// function ExhibitorList() {
//   const [exhibitors, setExhibitors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [q, setQ] = useState("");
//   const [openingId, setOpeningId] = useState("");

//   const navigate = useNavigate();

//   const getUser = () => {
//     const rawA = localStorage.getItem("userInfo");
//     const rawB = localStorage.getItem("user");
//     let obj = null;
//     try { obj = rawA ? JSON.parse(rawA) : null; } catch {}
//     if (!obj) { try { obj = rawB ? JSON.parse(rawB) : null; } catch {} }
//     const user = obj?.user || obj;
//     return user?._id ? user : null;
//   };

//   useEffect(() => {
//     const fetchExhibitors = async () => {
//       try {
//         const res = await fetch(`${API}/api/users/exhibitors`);
//         const data = await res.json();
//         setExhibitors(Array.isArray(data) ? data : []);
//       } catch (e) {
//         console.error(e);
//         setExhibitors([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchExhibitors();
//   }, []);

//   const openChat = async (exhibitorId) => {
//     const user = getUser();
//     if (!user) {
//       alert("Please login first");
//       return;
//     }
//     try {
//       setOpeningId(exhibitorId);
//       const res = await fetch(`${API}/api/chat/conversations`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": user._id,
//         },
//         body: JSON.stringify({ otherUserId: exhibitorId }),
//       });
//       const data = await res.json();
//       if (!res.ok) {
//         alert(data?.message || "Failed to open chat");
//         return;
//       }
//       navigate(`/attendee/messages?convoId=${data._id}`);
//     } catch (err) {
//       console.error(err);
//       alert("Error opening chat");
//     } finally {
//       setOpeningId("");
//     }
//   };

//   const filtered = useMemo(() => {
//     const term = q.toLowerCase();
//     return exhibitors.filter((e) => {
//       return (
//         (e.name || "").toLowerCase().includes(term) ||
//         (e.company || "").toLowerCase().includes(term)
//       );
//     });
//   }, [exhibitors, q]);

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
//       {/* Background Glows */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
//         <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
//       </div>

//       <div className="hidden md:flex flex-none w-64 h-full border-r border-white/5 bg-slate-950/50 backdrop-blur-md">
//         <AttendeeSidebar />
//       </div>

//       <main className="flex-1 h-full overflow-y-auto relative">
//         <div className="max-w-[1400px] mx-auto p-8 md:p-12">
          
//           {/* Header Section */}
//           <header className="mb-12">
//             <div className="flex items-center gap-2 mb-4">
//                <div className="h-px w-10 bg-sky-500/50"></div>
//                <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Directory</span>
//             </div>
            
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//               <div>
//                 <h1 className="text-5xl font-black tracking-tight mb-4">
//                   Exhibitors <span className="text-slate-500 font-light">List</span>
//                 </h1>
//                 <p className="text-slate-400 max-w-lg font-medium">
//                   Connect with industry leaders and explore innovative booths at the expo.
//                 </p>
//               </div>

//               {/* Search Bar */}
//               <div className="relative group">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
//                 <input
//                   value={q}
//                   onChange={(e) => setQ(e.target.value)}
//                   placeholder="Search by name or company..."
//                   className="w-full md:w-96 bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all backdrop-blur-md"
//                 />
//               </div>
//             </div>
//           </header>

//           {/* Main Grid */}
//           {loading ? (
//             <div className="flex flex-col items-center justify-center h-[50vh]">
//               <div className="h-12 w-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mb-4" />
//               <p className="text-slate-400 font-bold animate-pulse tracking-widest text-xs uppercase">Fetching Partners</p>
//             </div>
//           ) : filtered.length === 0 ? (
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//               className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10"
//             >
//               <Building2 className="mx-auto text-slate-700 mb-4" size={48} />
//               <p className="text-slate-400 text-lg">No exhibitors match your search.</p>
//             </motion.div>
//           ) : (
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//             >
//               <AnimatePresence>
//                 {filtered.map((exhibitor, index) => (
//                   <motion.div
//                     key={exhibitor._id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: index * 0.05 }}
//                     whileHover={{ y: -8 }}
//                     className="group relative rounded-[2.5rem] bg-slate-900/40 border border-white/5 p-8 shadow-2xl hover:bg-slate-900/60 hover:border-sky-500/30 transition-all duration-500 overflow-hidden"
//                   >
//                     {/* Decor Overlay */}
//                     <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
//                       <Sparkles size={20} className="text-sky-500/50" />
//                     </div>

//                     <div className="flex flex-col h-full">
//                       <div className="mb-6">
//                         <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-600/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
//                           <User size={24} className="text-sky-400" />
//                         </div>
//                         <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-sky-400 transition-colors">
//                           {exhibitor.name}
//                         </h3>
//                         <div className="flex items-center gap-2 mt-2 text-slate-400">
//                           <Building2 size={14} />
//                           <span className="text-xs font-bold uppercase tracking-widest italic">
//                             {exhibitor.company || "Independent Partner"}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="mt-auto">
//                         <motion.button
//                           whileHover={{ 
//                             scale: 1.02,
//                             boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" 
//                           }}
//                           whileTap={{ scale: 0.98 }}
//                           onClick={() => openChat(exhibitor._id)}
//                           disabled={openingId === exhibitor._id}
//                           className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl 
//                                      bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-[length:200%_auto] hover:bg-right
//                                      text-white font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 disabled:opacity-50 shadow-lg shadow-sky-500/20"
//                         >
//                           <MessageSquare size={16} />
//                           {openingId === exhibitor._id ? "Initializing..." : "Start Conversation"}
//                           <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ExhibitorList;






import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Search, Building2, User, ArrowRight, Sparkles, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AttendeeSidebar from "./AttendeeSidebar";

const API = "https://event-managemant-system-mern-stack.vercel.app";

function ExhibitorList() {
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [openingId, setOpeningId] = useState("");
  
  // ✅ Sidebar State for Mobile (Dashboard ki tarah)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const getUser = () => {
    const rawA = localStorage.getItem("userInfo");
    const rawB = localStorage.getItem("user");
    let obj = null;
    try { obj = rawA ? JSON.parse(rawA) : null; } catch {}
    if (!obj) { try { obj = rawB ? JSON.parse(rawB) : null; } catch {} }
    const user = obj?.user || obj;
    return user?._id ? user : null;
  };

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await fetch(`${API}/api/users/exhibitors`);
        const data = await res.json();
        setExhibitors(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setExhibitors([]);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibitors();
  }, []);

  const openChat = async (exhibitorId) => {
    const user = getUser();
    if (!user) {
      alert("Please login first");
      return;
    }
    try {
      setOpeningId(exhibitorId);
      const res = await fetch(`${API}/api/chat/conversations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user._id,
        },
        body: JSON.stringify({ otherUserId: exhibitorId }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data?.message || "Failed to open chat");
        return;
      }
      navigate(`/attendee/messages?convoId=${data._id}`);
    } catch (err) {
      console.error(err);
      alert("Error opening chat");
    } finally {
      setOpeningId("");
    }
  };

  const filtered = useMemo(() => {
    const term = q.toLowerCase();
    return exhibitors.filter((e) => {
      return (
        (e.name || "").toLowerCase().includes(term) ||
        (e.company || "").toLowerCase().includes(term)
      );
    });
  }, [exhibitors, q]);

  return (
    <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
      {/* ✅ Sidebar with Props (Matching Dashboard) */}
      <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* ✅ Main Content Area - lg:ml-64 used to make space for sidebar on desktop */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 relative">
        
        {/* ✅ MOBILE HEADER (Dashboard wala logic) */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617]/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-white shadow-xl"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">
              Event<span className="text-sky-500">Sphere</span>
            </h2>
            <div className="w-10" /> 
        </div>

        {/* Background Glows */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
        </div>

        <main className="flex-1 h-full overflow-y-auto no-scrollbar relative">
          <div className="max-w-[1400px] mx-auto p-8 md:p-12">
            
            {/* Header Section */}
            <header className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                 <div className="h-px w-10 bg-sky-500/50"></div>
                 <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Directory</span>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                    Exhibitors <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-sky-600">List</span>
                  </h1>
                  <p className="text-slate-400 max-w-lg font-medium">
                    Connect with industry leaders and explore innovative booths at the expo.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search by name or company..."
                    className="w-full md:w-96 bg-white/[0.03] border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:ring-2 focus:ring-sky-500/50 focus:border-sky-500/50 transition-all backdrop-blur-md"
                  />
                </div>
              </div>
            </header>

            {/* Main Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[50vh]">
                <div className="h-12 w-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mb-4" />
                <p className="text-slate-400 font-bold animate-pulse tracking-widest text-xs uppercase">Fetching Partners</p>
              </div>
            ) : filtered.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-20 bg-white/[0.02] rounded-[3rem] border border-dashed border-white/10"
              >
                <Building2 className="mx-auto text-slate-700 mb-4" size={48} />
                <p className="text-slate-400 text-lg">No exhibitors match your search.</p>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence>
                  {filtered.map((exhibitor, index) => (
                    <motion.div
                      key={exhibitor._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -8 }}
                      className="group relative rounded-[2.5rem] bg-slate-900/40 border border-white/5 p-8 shadow-2xl hover:bg-slate-900/60 hover:border-sky-500/30 transition-all duration-500 overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sparkles size={20} className="text-sky-500/50" />
                      </div>

                      <div className="flex flex-col h-full">
                        <div className="mb-6">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-600/10 border border-sky-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                            <User size={24} className="text-sky-400" />
                          </div>
                          <h3 className="text-2xl font-black tracking-tight text-white group-hover:text-sky-400 transition-colors">
                            {exhibitor.name}
                          </h3>
                          <div className="flex items-center gap-2 mt-2 text-slate-400">
                            <Building2 size={14} />
                            <span className="text-xs font-bold uppercase tracking-widest italic">
                              {exhibitor.company || "Independent Partner"}
                            </span>
                          </div>
                        </div>

                        <div className="mt-auto">
                          <motion.button
                            whileHover={{ 
                              scale: 1.02,
                              boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" 
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => openChat(exhibitor._id)}
                            disabled={openingId === exhibitor._id}
                           className="w-full flex items-center justify-center gap-2 sm:gap-3 py-3.5 sm:py-4 px-4 rounded-2xl 
           bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-[length:200%_auto] hover:bg-right
           text-white font-black text-[10px] sm:text-xs uppercase tracking-[0.1em] sm:tracking-[0.2em] 
           transition-all duration-500 disabled:opacity-50 shadow-lg shadow-sky-500/20 
           whitespace-nowrap overflow-hidden"
                          >
                            <MessageSquare size={16} />
                            {openingId === exhibitor._id ? "Initializing..." : "Start Conversation"}
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExhibitorList;