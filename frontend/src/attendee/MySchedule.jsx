 
// import React, { useEffect, useState } from "react";
// import AttendeeSidebar from "./AttendeeSidebar";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Bookmark, BookmarkCheck, MapPin, Calendar, Search, Filter, ArrowRight, Layers } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// const API = "https://event-managemant-system-mern-stack.vercel.app/api";

// function MySchedule() {
//   const navigate = useNavigate();
//   const [expos, setExpos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [bookmarked, setBookmarked] = useState([]);
//   const [user, setUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [expoRes, userRes] = await Promise.all([
//           axios.get(`${API}/expos`),
//           user ? axios.get(`${API}/users/${user._id}/bookmarks`) : Promise.resolve({ data: { bookmarks: [] } })
//         ]);

//         setExpos(expoRes.data.filter((expo) => expo.availability === "available"));
//         if (userRes.data.bookmarks) {
//           setBookmarked(userRes.data.bookmarks.map((b) => b._id.toString()));
//         }
//       } catch (err) {
//         console.error(err);
//         toast.error("Failed to sync schedule data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [user]);

//   const handleBookmark = async (expoId) => {
//     if (!user) {
//       toast.error("Please login to save events");
//       return;
//     }

//     try {
//       await axios.post(`${API}/bookmarks`, { userId: user._id, expoId });
//       setBookmarked((prev) =>
//         prev.includes(expoId) ? prev.filter((id) => id !== expoId) : [...prev, expoId]
//       );
//       toast.success("Schedule updated");
//     } catch (err) {
//       toast.success("Bookmark updated ✅");
//     }
//   };

//   const filteredExpos = expos.filter(expo => 
//     expo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     expo.location.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
//       {/* Cinematic Background */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-600/5 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
//       </div>

//       <div className="hidden md:flex flex-none w-64 h-full border-r border-white/5 bg-slate-950/50 backdrop-blur-md">
//         <AttendeeSidebar />
//       </div>

//       <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar">
//         <div className="max-w-[1400px] mx-auto p-8 md:p-12">
          
//           {/* HEADER & SEARCH SECTION */}
//           <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
//             <motion.div 
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex-1"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-sky-500/10 rounded-lg border border-sky-500/20">
//                   <Calendar className="text-sky-400" size={18} />
//                 </div>
//                 <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Event Explorer</span>
//               </div>
//               <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-4">
//                 Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-500 to-sky-600">Schedule</span>
//               </h1>
//               <p className="text-slate-500 text-lg font-medium max-w-xl italic">
//                 Real-time availability of global expos. Secure your spot in the future of industry.
//               </p>
//             </motion.div>

//             <motion.div 
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="flex flex-wrap items-center gap-4"
//             >
//               <div className="relative group">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
//                 <input
//                   type="text"
//                   placeholder="Search by title or venue..."
//                   className="bg-white/[0.03] border border-white/10 text-white text-sm rounded-2xl focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/50 block w-full sm:w-80 pl-12 pr-4 py-4 outline-none transition-all backdrop-blur-md"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//               <button className="h-14 w-14 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all backdrop-blur-md">
//                 <Filter size={20} />
//               </button>
//             </motion.div>
//           </header>

//           {/* GRID CONTENT */}
//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//               {[1, 2, 3, 4, 5, 6].map(n => (
//                 <div key={n} className="h-[450px] bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse" />
//               ))}
//             </div>
//           ) : filteredExpos.length === 0 ? (
//             <motion.div 
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//               className="text-center py-32 bg-white/[0.01] rounded-[4rem] border border-dashed border-white/10"
//             >
//               <Layers size={48} className="mx-auto text-slate-800 mb-6" />
//               <p className="text-slate-500 text-xl font-medium">No matches found for your current search.</p>
//             </motion.div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//               <AnimatePresence>
//                 {filteredExpos.map((expo, index) => {
//                   const isBookmarked = bookmarked.includes(expo._id);
//                   return (
//                     <motion.div
//                       key={expo._id}
//                       initial={{ opacity: 0, y: 30 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       whileHover={{ y: -12 }}
//                       className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500"
//                     >
//                       {/* IMAGE & OVERLAYS */}
//                       <div className="relative h-56 overflow-hidden">
//                         <img
//                           src={expo.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
//                           alt={expo.title}
//                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
                        
//                         {/* Bookmark Button */}
//                         <motion.button
//                           whileTap={{ scale: 0.8 }}
//                           onClick={() => handleBookmark(expo._id)}
//                           className={`absolute top-6 right-6 h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border ${
//                             isBookmarked 
//                               ? "bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/40" 
//                               : "bg-black/40 border-white/10 text-white hover:bg-white hover:text-black"
//                           }`}
//                         >
//                           {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
//                         </motion.button>

//                         <div className="absolute bottom-6 left-8">
//                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
//                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
//                              <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Available</span>
//                            </div>
//                         </div>
//                       </div>

//                       {/* CONTENT */}
//                       <div className="p-8">
//                         <h2 className="text-2xl font-black text-white mb-3 line-clamp-1 group-hover:text-sky-400 transition-colors">
//                           {expo.title}
//                         </h2>
                        
//                         <div className="flex items-center text-slate-400 text-sm gap-2 mb-8 font-medium">
//                           <MapPin size={14} className="text-sky-500" />
//                           <span className="truncate italic opacity-80">{expo.location}</span>
//                         </div>

//                         <div className="flex items-center justify-between pt-6 border-t border-white/5">
//                           <motion.button 
//                             whileHover={{ x: 5 }}
//                             onClick={() => navigate(`/attendee/expo/${expo._id}`)}
//                             className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-sky-400 transition-all"
//                           >
//                             Explore <ArrowRight size={14} />
//                           </motion.button>

//                           {/* Attendance Avatars */}
//                           <div className="flex -space-x-3 group-hover:space-x-1 transition-all duration-500">
//                             {[1, 2, 3].map(i => (
//                               <div key={i} className="w-8 h-8 rounded-xl border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-bold shadow-xl">
//                                 {String.fromCharCode(64 + i)}
//                               </div>
//                             ))}
//                             <div className="w-8 h-8 rounded-xl border-2 border-[#020617] bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
//                               +12
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   );
//                 })}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default MySchedule;






import React, { useEffect, useState } from "react";
import AttendeeSidebar from "./AttendeeSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bookmark, BookmarkCheck, MapPin, Calendar, Search, Filter, ArrowRight, Layers, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const API = "https://event-managemant-system-mern-stack.vercel.app/api";

function MySchedule() {
  const navigate = useNavigate();
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState([]);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // ✅ Sidebar State for Mobile (Dashboard Logic)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expoRes, userRes] = await Promise.all([
          axios.get(`${API}/expos`),
          user ? axios.get(`${API}/users/${user._id}/bookmarks`) : Promise.resolve({ data: { bookmarks: [] } })
        ]);

        setExpos(expoRes.data.filter((expo) => expo.availability === "available"));
        if (userRes.data.bookmarks) {
          setBookmarked(userRes.data.bookmarks.map((b) => b._id.toString()));
        }
      } catch (err) {
        console.error(err);
        // toast.error("Failed to sync schedule data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleBookmark = async (expoId) => {
    if (!user) {
      toast.error("Please login to save events");
      return;
    }

    try {
      await axios.post(`${API}/bookmarks`, { userId: user._id, expoId });
      setBookmarked((prev) =>
        prev.includes(expoId) ? prev.filter((id) => id !== expoId) : [...prev, expoId]
      );
      toast.success("Schedule updated");
    } catch (err) {
      toast.success("Bookmark updated ✅");
    }
  };

  const filteredExpos = expos.filter(expo => 
    expo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expo.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
      {/* ✅ Sidebar Integrated with Props */}
      <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* ✅ Main Content Area Adjusted for Sidebar */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 relative">
        
        {/* ✅ MOBILE HEADER (Consistent with Dashboard) */}
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

        {/* Cinematic Background (Original) */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-sky-600/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
        </div>

        <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar no-scrollbar">
          <div className="max-w-[1400px] mx-auto p-8 md:p-12">
            
            {/* HEADER & SEARCH SECTION */}
            <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 mb-16">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  {/* <div className="p-2 bg-sky-500/10 rounded-lg border border-sky-500/20">
                    <Calendar className="text-sky-400" size={18} />
                  </div> */}
                   <div className="h-px w-10 bg-sky-500/50"></div>
                  <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Event Explorer</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                  Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-500 to-sky-600">Schedule</span>
                </h1>
                <p className="text-slate-500 text-lg font-medium max-w-xl italic">
                  Real-time availability of global expos. Secure your spot in the future of industry.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
                  <input
                    type="text"
                    placeholder="Search by title or venue..."
                    className="bg-white/[0.03] border border-white/10 text-white text-sm rounded-2xl focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/50 block w-full sm:w-80 pl-12 pr-4 py-4 outline-none transition-all backdrop-blur-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="h-14 w-14 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all backdrop-blur-md">
                  <Filter size={20} />
                </button>
              </motion.div>
            </header>

            {/* GRID CONTENT */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="h-[450px] bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse" />
                ))}
              </div>
            ) : filteredExpos.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-32 bg-white/[0.01] rounded-[4rem] border border-dashed border-white/10"
              >
                <Layers size={48} className="mx-auto text-slate-800 mb-6" />
                <p className="text-slate-500 text-xl font-medium">No matches found for your current search.</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence>
                  {filteredExpos.map((expo, index) => {
                    const isBookmarked = bookmarked.includes(expo._id);
                    return (
                      <motion.div
                        key={expo._id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -12 }}
                        className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500"
                      >
                        {/* IMAGE & OVERLAYS */}
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={expo.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
                            alt={expo.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/20 to-transparent" />
                          
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => handleBookmark(expo._id)}
                            className={`absolute top-6 right-6 h-12 w-12 rounded-2xl flex items-center justify-center transition-all duration-300 backdrop-blur-md border ${
                              isBookmarked 
                                ? "bg-sky-500 border-sky-400 text-white shadow-lg shadow-sky-500/40" 
                                : "bg-black/40 border-white/10 text-white hover:bg-white hover:text-black"
                            }`}
                          >
                            {isBookmarked ? <BookmarkCheck size={20} /> : <Bookmark size={20} />}
                          </motion.button>

                          <div className="absolute bottom-6 left-8">
                             <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md">
                               <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                               <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">Available</span>
                             </div>
                          </div>
                        </div>

                        {/* CONTENT */}
                        <div className="p-8">
                          <h2 className="text-2xl font-black text-white mb-3 line-clamp-1 group-hover:text-sky-400 transition-colors">
                            {expo.title}
                          </h2>
                          
                          <div className="flex items-center text-slate-400 text-sm gap-2 mb-8 font-medium">
                            <MapPin size={14} className="text-sky-500" />
                            <span className="truncate italic opacity-80">{expo.location}</span>
                          </div>

                          <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <motion.button 
                              whileHover={{ x: 5 }}
                              onClick={() => navigate(`/attendee/expo/${expo._id}`)}
                              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white hover:text-sky-400 transition-all"
                            >
                              Explore <ArrowRight size={14} />
                            </motion.button>

                            <div className="flex -space-x-3 group-hover:space-x-1 transition-all duration-500">
                              {[1, 2, 3].map(i => (
                                <div key={i} className="w-8 h-8 rounded-xl border-2 border-[#020617] bg-slate-800 flex items-center justify-center text-[10px] font-bold shadow-xl">
                                  {String.fromCharCode(64 + i)}
                                </div>
                              ))}
                              <div className="w-8 h-8 rounded-xl border-2 border-[#020617] bg-sky-500 flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
                                +12
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MySchedule;