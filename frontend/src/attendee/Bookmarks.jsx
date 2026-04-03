 
// import React, { useEffect, useState } from "react";
// import AttendeeSidebar from "./AttendeeSidebar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { BookmarkCheck, MapPin, Trash2, Sparkles, ExternalLink, ArrowRight, Heart, Info } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// const API = "https://event-managemant-system-mern-stack.vercel.app/api";

// function Bookmarks() {
//   const navigate = useNavigate();
//   const [bookmarks, setBookmarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const fetchBookmarks = async () => {
//     if (!user?._id) return;
//     try {
//       const { data } = await axios.get(`${API}/bookmarks/${user._id}`);
//       setBookmarks(data.bookmarks || []);
//     } catch (err) {
//       toast.error("Failed to sync your bookmarks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookmarks();
//   }, [user]);

//   const removeBookmark = async (expoId) => {
//     try {
//       if (!user?._id) {
//         toast.error("User not found");
//         return;
//       }
//       // UI se foran hatane ke liye optimistic update
//       setBookmarks(prev => prev.filter(b => b.expo._id !== expoId));
      
//       const res = await axios.post(`${API}/bookmarks`, {
//         userId: user._id,
//         expoId,
//       });

//       toast.success("Bookmark removed");
//     } catch (err) {
//       console.log("Error:", err);
//       toast.error("Could not update bookmarks");
//       fetchBookmarks(); // Rollback if error
//     }
//   };

//   if (!user && !loading) {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center p-12 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl"
//         >
//           <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//             <Info className="text-rose-500" size={40} />
//           </div>
//           <h2 className="text-2xl font-black text-white mb-2">Session Expired</h2>
//           <p className="text-slate-400 mb-8">Please login to access your saved exhibitions.</p>
//           <button 
//             onClick={() => navigate('/login')} 
//             className="px-8 py-3 bg-white text-black font-bold rounded-2xl hover:bg-sky-500 hover:text-white transition-all"
//           >
//             Login Now
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
//       {/* Background Glows */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
//         <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
//       </div>

//       <div className="hidden md:flex flex-none w-64 h-full border-r border-white/5 bg-slate-950/50 backdrop-blur-md">
//         <AttendeeSidebar />
//       </div>

//       <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar">
//         <div className="max-w-[1400px] mx-auto p-8 md:p-12">
          
//           {/* HEADER SECTION */}
//           <header className="mb-16">
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="flex items-center gap-2 mb-4"
//             >
//                <div className="h-px w-10 bg-amber-500/50"></div>
//                <span className="text-amber-400 font-bold tracking-[0.3em] text-[10px] uppercase">My Collections</span>
//             </motion.div>
            
//             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4">
//                   Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Shortlist</span>
//                 </h1>
//                 <p className="text-slate-500 text-lg font-medium max-w-lg">
//                   Your curated list of must-visit booths and exhibitions. 
//                   <span className="text-sky-500/80 italic ml-1">Plan your day effectively.</span>
//                 </p>
//               </motion.div>

//               <motion.div 
//                 whileHover={{ scale: 1.05 }}
//                 className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md flex items-center gap-4"
//               >
//                 <div className="h-10 w-10 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
//                   <BookmarkCheck className="text-white" size={20} />
//                 </div>
//                 <div>
//                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Saved</p>
//                   <p className="text-xl font-black">{bookmarks.length}</p>
//                 </div>
//               </motion.div>
//             </div>
//           </header>

//           {/* CONTENT GRID */}
//           {loading ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//               {[1, 2, 3].map(n => (
//                 <div key={n} className="h-[400px] bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse" />
//               ))}
//             </div>
//           ) : bookmarks.length === 0 ? (
//             <motion.div 
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-32 bg-white/[0.01] rounded-[4rem] border border-dashed border-white/10"
//             >
//               <div className="inline-flex p-8 rounded-full bg-slate-900 border border-white/5 text-slate-700 mb-8">
//                 <Heart size={64} strokeWidth={1} />
//               </div>
//               <h3 className="text-3xl font-black text-white mb-4">Your vault is empty</h3>
//               <p className="text-slate-500 max-w-xs mx-auto mb-10 text-lg font-medium italic">
//                 You haven't bookmarked any exhibitions yet.
//               </p>
//               <button 
//                 onClick={() => navigate('/attendee/schedule')}
//                 className="px-10 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-sky-500/20"
//               >
//                 Explore Live Events
//               </button>
//             </motion.div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//               <AnimatePresence mode="popLayout">
//                 {bookmarks.map(({ _id, expo }) => (
//                   <motion.div
//                     key={_id}
//                     layout
//                     initial={{ opacity: 0, scale: 0.9 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
//                     whileHover={{ y: -12 }}
//                     className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500"
//                   >
//                     {/* TOP ACTION BAR */}
//                     <div className="absolute top-6 right-6 z-20">
//                       <motion.button 
//                         whileHover={{ scale: 1.1, rotate: 90 }}
//                         whileTap={{ scale: 0.9 }}
//                         onClick={() => removeBookmark(expo._id)}
//                         className="h-10 w-10 flex items-center justify-center bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-2xl transition-all duration-300 backdrop-blur-md"
//                       >
//                         <Trash2 size={18} />
//                       </motion.button>
//                     </div>

//                     {/* COVER IMAGE */}
//                     <div className="h-52 overflow-hidden relative">
//                       <img
//                         src={expo.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
//                         alt={expo.title}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                       />
//                       <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                      
//                       {/* Floating Badge */}
//                       <div className="absolute bottom-4 left-6">
//                         <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 backdrop-blur-md">
//                           <Sparkles size={12} className="text-sky-400" />
//                           <span className="text-[10px] font-black text-sky-400 uppercase tracking-tighter">Featured Expo</span>
//                         </div>
//                       </div>
//                     </div>

//                     {/* CONTENT AREA */}
//                     <div className="p-8">
//                       <div className="flex items-center gap-2 mb-4 opacity-60">
//                          <MapPin size={14} className="text-sky-400" />
//                          <span className="text-xs font-bold truncate tracking-wide italic">{expo.location}</span>
//                       </div>

//                       <h2 className="text-2xl font-black text-white mb-6 leading-tight group-hover:text-sky-400 transition-colors">
//                         {expo.title}
//                       </h2>
                      
//                       <div className="flex items-center justify-between pt-6 border-t border-white/5">
//                         <motion.button 
//                           whileHover={{ x: 5 }}
//                           onClick={() => navigate(`/attendee/expo/${expo._id}`)}
//                           className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-sky-400 transition-all"
//                         >
//                           Discover More <ArrowRight size={14} />
//                         </motion.button>
                        
//                         <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 tracking-widest">
//                           ID: {expo._id.slice(-4)}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Subtle Hover Glow */}
//                     <div className="absolute inset-0 border-[3px] border-sky-500/0 group-hover:border-sky-500/20 rounded-[3rem] pointer-events-none transition-all duration-500" />
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Bookmarks;









// import React, { useEffect, useState } from "react";
// import AttendeeSidebar from "./AttendeeSidebar";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { BookmarkCheck, MapPin, Trash2, Sparkles, ExternalLink, ArrowRight, Heart, Info, Menu } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// const API = "https://event-managemant-system-mern-stack.vercel.app/api";

// function Bookmarks() {
//   const navigate = useNavigate();
//   const [bookmarks, setBookmarks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [user, setUser] = useState(null);
  
//   // ✅ Sidebar State for Mobile
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const fetchBookmarks = async () => {
//     if (!user?._id) return;
//     try {
//       const { data } = await axios.get(`${API}/bookmarks/${user._id}`);
//       setBookmarks(data.bookmarks || []);
//     } catch (err) {
//       toast.error("Failed to sync your bookmarks");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookmarks();
//   }, [user]);

//   const removeBookmark = async (expoId) => {
//     try {
//       if (!user?._id) {
//         toast.error("User not found");
//         return;
//       }
//       // UI se foran hatane ke liye optimistic update
//       setBookmarks(prev => prev.filter(b => b.expo._id !== expoId));
      
//       const res = await axios.post(`${API}/bookmarks`, {
//         userId: user._id,
//         expoId,
//       });

//       toast.success("Bookmark removed");
//     } catch (err) {
//       console.log("Error:", err);
//       toast.error("Could not update bookmarks");
//       fetchBookmarks(); // Rollback if error
//     }
//   };

//   if (!user && !loading) {
//     return (
//       <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
//         <motion.div 
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="text-center p-12 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl"
//         >
//           <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
//             <span className="text-rose-500"><Info size={40} /></span>
//           </div>
//           <h2 className="text-2xl font-black text-white mb-2">Session Expired</h2>
//           <p className="text-slate-400 mb-8">Please login to access your saved exhibitions.</p>
//           <button 
//             onClick={() => navigate('/login')} 
//             className="px-8 py-3 bg-white text-black font-bold rounded-2xl hover:bg-sky-500 hover:text-white transition-all"
//           >
//             Login Now
//           </button>
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
//       {/* ✅ Sidebar Integrated */}
//       <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

//       {/* ✅ Main Content Area Adjusted for Sidebar */}
//       <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 relative">
        
//         {/* ✅ MOBILE HEADER (Hamburger Menu) */}
//         <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617]/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
//             <button 
//               onClick={() => setIsSidebarOpen(true)} 
//               className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-white shadow-xl"
//             >
//               <Menu size={22} />
//             </button>
//             <h2 className="text-xl font-black tracking-tighter text-white uppercase">
//               Event<span className="text-sky-500">Sphere</span>
//             </h2>
//             <div className="w-10" /> 
//         </div>

//         {/* Background Glows (Original) */}
//         <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//           <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
//           <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
//         </div>

//         <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar no-scrollbar">
//           <div className="max-w-[1400px] mx-auto p-8 md:p-12">
            
//             {/* HEADER SECTION */}
//             <header className="mb-16">
//               <motion.div 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="flex items-center gap-2 mb-4"
//               >
//                  <div className="h-px w-10 bg-sky-500/50"></div>
//                 <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">My Collections</span>
//               </motion.div>
              
//               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
//                 <motion.div
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                 >
//                   <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
//                     Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Shortlist</span>
//                   </h1>
//                   <p className="text-slate-500 text-lg font-medium max-w-lg">
//                     Your curated list of must-visit booths and exhibitions. 
//                     <span className="text-sky-500/80 italic ml-1">Plan your day effectively.</span>
//                   </p>
//                 </motion.div>

//                 <motion.div 
//                   whileHover={{ scale: 1.05 }}
//                   className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md flex items-center gap-4"
//                 >
//                   <div className="h-10 w-10 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
//                     <BookmarkCheck className="text-white" size={20} />
//                   </div>
//                   <div>
//                     <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Saved</p>
//                     <p className="text-xl font-black">{bookmarks.length}</p>
//                   </div>
//                 </motion.div>
//               </div>
//             </header>

//             {/* CONTENT GRID */}
//             {loading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {[1, 2, 3].map(n => (
//                   <div key={n} className="h-[400px] bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse" />
//                 ))}
//               </div>
//             ) : bookmarks.length === 0 ? (
//               <motion.div 
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="text-center py-32 bg-white/[0.01] rounded-[4rem] border border-dashed border-white/10"
//               >
//                 <div className="inline-flex p-8 rounded-full bg-slate-900 border border-white/5 text-slate-700 mb-8">
//                   <Heart size={64} strokeWidth={1} />
//                 </div>
//                 <h3 className="text-3xl font-black text-white mb-4">Your vault is empty</h3>
//                 <p className="text-slate-500 max-w-xs mx-auto mb-10 text-lg font-medium italic">
//                   You haven't bookmarked any exhibitions yet.
//                 </p>
//                 <button 
//                   onClick={() => navigate('/attendee/schedule')}
//                   className="px-10 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-sky-500/20"
//                 >
//                   Explore Live Events
//                 </button>
//               </motion.div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//                 <AnimatePresence mode="popLayout">
//                   {bookmarks.map(({ _id, expo }) => (
//                     <motion.div
//                       key={_id}
//                       layout
//                       initial={{ opacity: 0, scale: 0.9 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
//                       whileHover={{ y: -12 }}
//                       className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500"
//                     >
//                       <div className="absolute top-6 right-6 z-20">
//                         <motion.button 
//                           whileHover={{ scale: 1.1, rotate: 90 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => removeBookmark(expo._id)}
//                           className="h-10 w-10 flex items-center justify-center bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-2xl transition-all duration-300 backdrop-blur-md"
//                         >
//                           <Trash2 size={18} />
//                         </motion.button>
//                       </div>

//                       <div className="h-52 overflow-hidden relative">
//                         <img
//                           src={expo.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
//                           alt={expo.title}
//                           className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                        
//                         <div className="absolute bottom-4 left-6">
//                           <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 backdrop-blur-md">
//                             <Sparkles size={12} className="text-sky-400" />
//                             <span className="text-[10px] font-black text-sky-400 uppercase tracking-tighter">Featured Expo</span>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="p-8">
//                         <div className="flex items-center gap-2 mb-4 opacity-60">
//                            <MapPin size={14} className="text-sky-400" />
//                            <span className="text-xs font-bold truncate tracking-wide italic">{expo.location}</span>
//                         </div>

//                         <h2 className="text-2xl font-black text-white mb-6 leading-tight group-hover:text-sky-400 transition-colors">
//                           {expo.title}
//                         </h2>
                        
//                         <div className="flex items-center justify-between pt-6 border-t border-white/5">
//                           <motion.button 
//                             whileHover={{ x: 5 }}
//                             onClick={() => navigate(`/attendee/expo/${expo._id}`)}
//                             className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-sky-400 transition-all"
//                           >
//                             Discover More <ArrowRight size={14} />
//                           </motion.button>
                          
//                           <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 tracking-widest">
//                             ID: {expo._id.slice(-4)}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="absolute inset-0 border-[3px] border-sky-500/0 group-hover:border-sky-500/20 rounded-[3rem] pointer-events-none transition-all duration-500" />
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default Bookmarks;






import React, { useEffect, useState } from "react";
import AttendeeSidebar from "./AttendeeSidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BookmarkCheck, MapPin, Trash2, Sparkles, ArrowRight, Heart, Info, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

const API = "https://event-managemant-system-mern-stack.vercel.app/api";

function Bookmarks() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const fetchBookmarks = async () => {
    if (!user?._id) return;
    try {
      const { data } = await axios.get(`${API}/bookmarks/${user._id}`);
      setBookmarks(data.bookmarks || []);
    } catch (err) {
      toast.error("Failed to sync your bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  const removeBookmark = async (expoId) => {
    try {
      if (!user?._id) {
        toast.error("User not found");
        return;
      }
      
      // ✅ Safety check added to filter: b.expo?._id
      setBookmarks(prev => prev.filter(b => b.expo?._id !== expoId));
      
      await axios.post(`${API}/bookmarks`, {
        userId: user._id,
        expoId,
      });

      toast.success("Bookmark removed");
    } catch (err) {
      console.log("Error:", err);
      toast.error("Could not update bookmarks");
      fetchBookmarks(); 
    }
  };

  if (!user && !loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[3rem] shadow-2xl"
        >
          <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-rose-500"><Info size={40} /></span>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Session Expired</h2>
          <p className="text-slate-400 mb-8">Please login to access your saved exhibitions.</p>
          <button 
            onClick={() => navigate('/login')} 
            className="px-8 py-3 bg-white text-black font-bold rounded-2xl hover:bg-sky-500 hover:text-white transition-all"
          >
            Login Now
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 relative">
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

        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full" />
        </div>

        <main className="flex-1 h-full overflow-y-auto relative custom-scrollbar no-scrollbar">
          <div className="max-w-[1400px] mx-auto p-8 md:p-12">
            
            <header className="mb-16">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                 <div className="h-px w-10 bg-sky-500/50"></div>
                <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">My Collections</span>
              </motion.div>
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
                    Saved <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Shortlist</span>
                  </h1>
                  <p className="text-slate-500 text-lg font-medium max-w-lg">
                    Your curated list of must-visit booths and exhibitions. 
                    <span className="text-sky-500/80 italic ml-1">Plan your day effectively.</span>
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 border border-white/10 rounded-3xl p-4 backdrop-blur-md flex items-center gap-4"
                >
                  <div className="h-10 w-10 rounded-2xl bg-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20">
                    <BookmarkCheck className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Total Saved</p>
                    <p className="text-xl font-black">{bookmarks.length}</p>
                  </div>
                </motion.div>
              </div>
            </header>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(n => (
                  <div key={n} className="h-[400px] bg-white/[0.02] rounded-[2.5rem] border border-white/5 animate-pulse" />
                ))}
              </div>
            ) : bookmarks.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-32 bg-white/[0.01] rounded-[4rem] border border-dashed border-white/10"
              >
                <div className="inline-flex p-8 rounded-full bg-slate-900 border border-white/5 text-slate-700 mb-8">
                  <Heart size={64} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">Your vault is empty</h3>
                <p className="text-slate-500 max-w-xs mx-auto mb-10 text-lg font-medium italic">
                  You haven't bookmarked any exhibitions yet.
                </p>
                <button 
                  onClick={() => navigate('/attendee/schedule')}
                  className="px-10 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-sky-500/20"
                >
                  Explore Live Events
                </button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                <AnimatePresence mode="popLayout">
                  {bookmarks.map(({ _id, expo }) => {
                    // 🛡️ CRITICAL FIX: If the expo object is null (deleted event), skip rendering it
                    if (!expo) return null;

                    return (
                      <motion.div
                        key={_id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                        whileHover={{ y: -12 }}
                        className="group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500"
                      >
                        <div className="absolute top-6 right-6 z-20">
                          <motion.button 
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeBookmark(expo._id)}
                            className="h-10 w-10 flex items-center justify-center bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-500/20 rounded-2xl transition-all duration-300 backdrop-blur-md"
                          >
                            <Trash2 size={18} />
                          </motion.button>
                        </div>

                        <div className="h-52 overflow-hidden relative">
                          <img
                            src={expo.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87"}
                            alt={expo.title || "Exhibition"}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                          
                          <div className="absolute bottom-4 left-6">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-500/40 backdrop-blur-md">
                              <Sparkles size={12} className="text-sky-400" />
                              <span className="text-[10px] font-black text-sky-400 uppercase tracking-tighter">Featured Expo</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-8">
                          <div className="flex items-center gap-2 mb-4 opacity-60">
                             <MapPin size={14} className="text-sky-400" />
                             <span className="text-xs font-bold truncate tracking-wide italic">{expo.location || "Location TBD"}</span>
                          </div>

                          <h2 className="text-2xl font-black text-white mb-6 leading-tight group-hover:text-sky-400 transition-colors">
                            {expo.title || "Untitled Exhibition"}
                          </h2>
                          
                          <div className="flex items-center justify-between pt-6 border-t border-white/5">
                            <motion.button 
                              whileHover={{ x: 5 }}
                              onClick={() => navigate(`/attendee/expo/${expo._id}`)}
                              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/40 hover:text-sky-400 transition-all"
                            >
                              Discover More <ArrowRight size={14} />
                            </motion.button>
                            
                            <div className="px-4 py-2 rounded-2xl bg-white/5 border border-white/5 text-[10px] font-bold text-slate-500 tracking-widest">
                              ID: {expo._id ? expo._id.slice(-4) : "N/A"}
                            </div>
                          </div>
                        </div>
                        <div className="absolute inset-0 border-[3px] border-sky-500/0 group-hover:border-sky-500/20 rounded-[3rem] pointer-events-none transition-all duration-500" />
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

export default Bookmarks;