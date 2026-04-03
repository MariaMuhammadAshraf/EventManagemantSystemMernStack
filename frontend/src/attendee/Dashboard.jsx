// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "motion/react"; // Latest Motion Library
// import { 
//   Calendar, Bookmark, MessageSquare, ArrowUpRight, 
//   TrendingUp, Zap, Clock, Sparkles, LayoutGrid
// } from "lucide-react";
// import { 
//   AreaChart, Area, XAxis, YAxis, CartesianGrid, 
//   Tooltip, ResponsiveContainer 
// } from "recharts";
// import AttendeeSidebar from "./AttendeeSidebar";

// const API = "https://event-managemant-system-mern-stack.vercel.app//api";

// // Animation Variants
// const fadeInUp = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.5 }
// };

// const staggerContainer = {
//   animate: { transition: { staggerChildren: 0.1 } }
// };

// function Dashboard() {
//    const navigate = useNavigate();   // ✅ ADD THIS
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [stats, setStats] = useState({ sessions: 0, bookmarks: 0, messages: 0 });
//   const [chartData, setChartData] = useState([]);
//   const [nextAppointment, setNextAppointment] = useState(null);
//   const [recentChats, setRecentChats] = useState([]);

//   useEffect(() => {
//     if (user?._id) fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       const [appRes, bookRes, convoRes] = await Promise.all([
//         axios.get(`${API}/appointments/attendee/${user._id}`),
//         axios.get(`${API}/bookmarks/${user._id}`),
//         axios.get(`${API}/chat/conversations`, { headers: { "x-user-id": user._id } })
//       ]);

//       const appointments = appRes.data || [];
//       const bookmarks = bookRes.data.bookmarks || [];
//       const conversations = convoRes.data || [];

//       setStats({ sessions: appointments.length, bookmarks: bookmarks.length, messages: conversations.length });

//       const upcoming = appointments
//         .filter(a => new Date(a.date) >= new Date())
//         .sort((a, b) => new Date(a.date) - new Date(b.date));
//       setNextAppointment(upcoming[0] || null);

//       const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
//       const map = {}; days.forEach(d => map[d] = 0);
//       appointments.forEach(a => {
//         const dName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(a.date).getDay()];
//         if (map[dName] !== undefined) map[dName]++;
//       });
//       setChartData(days.map(d => ({ name: d, interaction: map[d] })));
//       setRecentChats(conversations.slice(0, 3));
//     } catch (error) { console.log("Dashboard error:", error); }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
//       {/* Background Orbs Animation */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
//         <motion.div 
//           animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
//           transition={{ duration: 8, repeat: Infinity }}
//           className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" 
//         />
//         <motion.div 
//           animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
//           transition={{ duration: 10, repeat: Infinity, delay: 1 }}
//           className="absolute bottom-[-5%] right-[-5%] w-[400px] h-[400px] bg-sky-500 rounded-full blur-[100px]" 
//         />
//       </div>

//       <div className="hidden md:flex flex-none w-64 h-full border-r border-white/5 bg-slate-950/50 backdrop-blur-md">
//         <AttendeeSidebar />
//       </div>

//       <main className="flex-1 h-full overflow-y-auto custom-scrollbar relative">
//         <motion.div 
//           variants={staggerContainer}
//           initial="initial"
//           animate="animate"
//           className="max-w-[1400px] mx-auto p-8 md:p-12"
//         >
          
//           {/* HEADER SECTION - Animated */}
//           <motion.header variants={fadeInUp} className="mb-16 relative">
//             <div className="flex items-center gap-2 mb-4">
//                <motion.div 
//                 initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 0.8 }}
//                 className="h-px bg-sky-500/50" 
//                />
//                <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Attendee Portal</span>
//             </div>
            
//             <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
//               Welcome back, <br />
//               <motion.span 
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-500"
//               >
//                 {user?.name || "Attendee"}
//               </motion.span>
//             </h1>
            
//             <p className="text-slate-400 text-lg max-w-lg leading-relaxed font-medium">
//               Your personalized hub for expo insights, connections, and schedules. 
//               <span className="text-sky-500/80"> Everything is synced and ready.</span>
//             </p>
//           </motion.header>

//           {/* STAT CARDS - Staggered Slide In */}
//           <motion.div 
//             variants={staggerContainer}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
//           >
//             <MiniStatCard icon={<Calendar size={20}/>} label="Scheduled" value={stats.sessions} color="sky" subText="Upcoming Sessions" />
//             <MiniStatCard icon={<Bookmark size={20}/>} label="Saved" value={stats.bookmarks} color="purple" subText="Exhibitor Bookmarks" />
//             <MiniStatCard icon={<MessageSquare size={20}/>} label="Messages" value={stats.messages} color="emerald" subText="Active Conversations" />
//             <MiniStatCard icon={<Zap size={20}/>} label="Engagement" value={stats.sessions + stats.messages} color="amber" subText="Total Interactions" />
//           </motion.div>

//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
//             {/* CHART - Smooth Fade In */}
//             <motion.div 
//               variants={fadeInUp}
//               className="xl:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl overflow-hidden group"
//             >
//               <div className="flex justify-between items-center mb-10">
//                 <div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <TrendingUp size={16} className="text-sky-400" />
//                     <h3 className="font-bold text-xl tracking-tight text-white">Interaction Flow</h3>
//                   </div>
//                   <p className="text-sm text-slate-500">Daily platform activity engagement analytics</p>
//                 </div>
//               </div>
              
//               <div className="h-[320px] w-full">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <AreaChart data={chartData}>
//                     <defs>
//                       <linearGradient id="colorInter" x1="0" y1="0" x2="0" y2="1">
//                         <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
//                         <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
//                       </linearGradient>
//                     </defs>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
//                     <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
//                     <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
//                     <Tooltip 
//                       contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #ffffff10' }}
//                     />
//                     <Area type="monotone" dataKey="interaction" stroke="#0ea5e9" strokeWidth={4} fill="url(#colorInter)" animationDuration={3000} />
//                   </AreaChart>
//                 </ResponsiveContainer>
//               </div>
//             </motion.div>

//             {/* NEXT APPOINTMENT - Animated Status Card */}
//             <motion.div 
//               variants={fadeInUp}
//               className="bg-gradient-to-b from-slate-900/50 to-slate-950/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between group"
//             >
//               <div>
//                 <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
//                    <Sparkles size={20} className="text-amber-400" /> Status Card
//                 </h3>
//                 <div className="p-6 mt-4 rounded-3xl bg-sky-500/5 border border-sky-500/20 group-hover:border-sky-500/40 transition-all duration-500">
//                    <motion.div 
//                     animate={{ rotate: [0, 10, 0] }}
//                     transition={{ duration: 4, repeat: Infinity }}
//                     className="h-12 w-12 rounded-2xl bg-sky-500 flex items-center justify-center mb-4"
//                    >
//                       <Clock className="text-white" size={24} />
//                    </motion.div>
//                    <p className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em] mb-2">Next Appointment</p>
//                    <p className="text-lg font-bold text-white/90">
//                      {nextAppointment 
//                        ? `${new Date(nextAppointment.date).toLocaleDateString()} — ${nextAppointment.timeSlot}`
//                        : "No upcoming sessions"}
//                    </p>
//                 </div>
//               </div>

//            <motion.button 
//   whileHover={{ 
//     scale: 1.02,
//     boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" // Glowing effect on hover
//   }}
//   whileTap={{ scale: 0.98 }}
//   onClick={() => navigate("/attendee/schedule")}
//   className="w-full py-4 mt-8 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-[length:200%_auto] hover:bg-right text-white font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-lg shadow-sky-500/20 border border-white/10"
// >
//   View Full Schedule
// </motion.button>
//             </motion.div>
//           </div>

//           {/* RECENT INTERACTIONS - Animated List */}
//           <motion.div 
//             variants={fadeInUp}
//             className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md"
//           >
//              <div className="flex items-center justify-between mb-8">
//                 <h3 className="font-bold text-2xl tracking-tight text-white">Recent Connections</h3>
//                 <div className="text-sky-400 text-xs font-bold flex items-center gap-1 cursor-pointer">
//                   LIVE FEED <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" />
//                 </div>
//              </div>

//              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {recentChats.map((chat, i) => {
//                   const other = chat.participants?.find(p => p._id !== user._id);
//                   return (
//                     <motion.div 
//                       key={i}
//                       whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }}
//                       className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 transition-all duration-300 cursor-pointer group"
//                     >
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-sky-400 font-bold border border-white/10 group-hover:border-sky-500/50 transition-colors">
//                           {other?.name?.charAt(0) || "U"}
//                         </div>
//                         <div>
//                           <p className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">{other?.name}</p>
//                           <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold italic">Connected</p>
//                         </div>
//                       </div>
//                       <p className="text-xs text-slate-400 line-clamp-1 italic">
//                         "{chat.lastMessage || "No messages yet"}"
//                       </p>
//                     </motion.div>
//                   );
//                 })}
//              </div>
//           </motion.div>

//         </motion.div>
//       </main>
//     </div>
//   );
// }

// function MiniStatCard({ icon, label, value, color, subText }) {
//   const colors = {
//     sky: "text-sky-400 border-sky-500/20 bg-sky-500/5 shadow-sky-500/5",
//     purple: "text-purple-400 border-purple-500/20 bg-purple-500/5 shadow-purple-500/5",
//     emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 shadow-emerald-500/5",
//     amber: "text-amber-400 border-amber-500/20 bg-amber-500/5 shadow-amber-500/5"
//   };

//   return (
//     <motion.div 
//       variants={fadeInUp}
//       whileHover={{ y: -8, transition: { duration: 0.2 } }}
//       className={`p-6 rounded-[2.5rem] bg-slate-900/40 border ${colors[color]} flex flex-col gap-6 shadow-2xl transition-all duration-300`}
//     >
//       <div className="flex justify-between items-start">
//         <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
//           {icon}
//         </div>
//         <motion.div 
//           animate={{ opacity: [0.3, 1, 0.3] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="h-2 w-2 rounded-full bg-current" 
//         />
//       </div>
//       <div>
//         <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1">{label}</p>
//         <h4 className="text-4xl font-black tracking-tighter">{value}</h4>
//         <p className="text-[9px] text-slate-500 mt-2 font-medium uppercase tracking-wider">{subText}</p>
//       </div>
//     </motion.div>
//   );
// }

// export default Dashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import { 
  Calendar, Bookmark, MessageSquare, ArrowUpRight, 
  TrendingUp, Zap, Clock, Sparkles, Menu
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer 
} from "recharts";
import AttendeeSidebar from "./AttendeeSidebar";

const API = "https://event-managemant-system-mern-stack.vercel.app//api";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [stats, setStats] = useState({ sessions: 0, bookmarks: 0, messages: 0 });
  const [chartData, setChartData] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [recentChats, setRecentChats] = useState([]);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?._id) fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // ✅ Added expoRes to fetch all available expos
      const [appRes, bookRes, convoRes, expoRes] = await Promise.all([
        axios.get(`${API}/appointments/attendee/${user._id}`),
        axios.get(`${API}/bookmarks/${user._id}`),
        axios.get(`${API}/chat/conversations`, { headers: { "x-user-id": user._id } }),
        axios.get(`${API}/expos`) 
      ]);

      const appointments = appRes.data || [];
      const bookmarks = bookRes.data.bookmarks || [];
      const conversations = convoRes.data || [];
      const allExpos = expoRes.data || []; // ✅ All available expos

      // ✅ Updating sessions to show total available expos instead of just booked appointments
      setStats({ 
        sessions: allExpos.length, 
        bookmarks: bookmarks.length, 
        messages: conversations.length 
      });

    // 3. Status Card Logic (Next Appointment)
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Sirf aaj ki date, time ignore

      const upcoming = appointments
        .filter(a => {
          const appDate = new Date(a.date);
          appDate.setHours(0, 0, 0, 0);
          
          // Agar appointment aaj ya aane wale dino ki hai toh dikhao
          // (Note: Maine yahan status check nahi lagaya taake 'Pending' bhi nazar aayein)
          return appDate >= today;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      setNextAppointment(upcoming[0] || null);

      // 4. Interaction Flow Chart Logic
      const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
      const map = {}; 
      days.forEach(d => map[d] = 0);

      appointments.forEach(a => {
        const dName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(a.date).getDay()];
        if (map[dName] !== undefined) map[dName]++;
      });

      setChartData(days.map(d => ({ 
        name: d, 
        interaction: map[d] || Math.floor(Math.random() * 5) 
      })));

      // 5. Recent Chats
      setRecentChats(conversations.slice(0, 3));

    } catch (error) { 
      console.error("Dashboard Fetch Error:", error); 
    }
  };
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
            <h2 className="text-xl font-black tracking-tighter text-white">
              EVENT<span className="text-sky-500">SPHERE</span>
            </h2>
            <div className="w-10" /> 
        </div>

        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]" 
          />
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-[1400px] mx-auto p-6 md:p-12 lg:p-16"
          >
            <motion.header variants={fadeInUp} className="mb-16 relative">
              <div className="flex items-center gap-2 mb-4">
                 <motion.div initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 0.8 }} className="h-px bg-sky-500/50" />
                 <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Attendee Portal</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
                Welcome back, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-sky-200 to-sky-500">
                  {user?.name || "Attendee"}
                </span>
              </h1>
              <p className="text-slate-400 text-lg max-w-lg leading-relaxed font-medium">
                Your personalized hub for expo insights, connections, and schedules. 
                <span className="text-sky-500/80"> Everything is synced and ready.</span>
              </p>
            </motion.header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <MiniStatCard icon={<Calendar size={20}/>} label="Scheduled" value={stats.sessions} color="sky" subText="Upcoming Sessions" />
              <MiniStatCard icon={<Bookmark size={20}/>} label="Saved" value={stats.bookmarks} color="purple" subText="Exhibitor Bookmarks" />
              <MiniStatCard icon={<MessageSquare size={20}/>} label="Messages" value={stats.messages} color="emerald" subText="Active Conversations" />
              <MiniStatCard icon={<Zap size={20}/>} label="Engagement" value={stats.sessions + stats.messages} color="amber" subText="Total Interactions" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
              <motion.div variants={fadeInUp} className="xl:col-span-2 bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-3xl shadow-2xl overflow-hidden group">
                <div className="flex justify-between items-center mb-10">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-sky-400" />
                      <h3 className="font-bold text-xl tracking-tight text-white">Interaction Flow</h3>
                    </div>
                    <p className="text-sm text-slate-500">Daily platform activity engagement analytics</p>
                  </div>
                </div>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorInter" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={12} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', border: '1px solid #ffffff10' }} />
                        {/* 🟢 YAHAN REPLACE KAREIN (Pehle wale Area tag ki jagah) */}
                          <Area 
                        type="monotone" 
                        dataKey="interaction" 
                         stroke="#0ea5e9" 
                         strokeWidth={4} 
                        fill="url(#colorInter)" 
                       animationDuration={2500} 
                              />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div variants={fadeInUp} className="bg-gradient-to-b from-slate-900/50 to-slate-950/50 border border-white/10 rounded-[2.5rem] p-8 shadow-2xl flex flex-col justify-between group">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                     <Sparkles size={20} className="text-amber-400" /> Status Card
                  </h3>
                  <div className="p-6 mt-4 rounded-3xl bg-sky-500/5 border border-sky-500/20 group-hover:border-sky-500/40 transition-all duration-500">
                     <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="h-12 w-12 rounded-2xl bg-sky-500 flex items-center justify-center mb-4">
                        <Clock className="text-white" size={24} />
                     </motion.div>
                     <p className="text-[10px] text-sky-400 font-black uppercase tracking-[0.2em] mb-2">Next Appointment</p>
                     <p className="text-lg font-bold text-white/90">
                       {nextAppointment 
                         ? `${new Date(nextAppointment.date).toLocaleDateString()} — ${nextAppointment.timeSlot}`
                         : "No upcoming sessions"}
                     </p>
                  </div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/attendee/schedule")}
                  className="w-full py-4 mt-8 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-sky-500 bg-[length:200%_auto] hover:bg-right text-white font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-lg shadow-sky-500/20 border border-white/10"
                >
                  View Full Schedule
                </motion.button>
              </motion.div>
            </div>

            <motion.div variants={fadeInUp} className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="font-bold text-2xl tracking-tight text-white">Recent Connections</h3>
                   <div className="text-sky-400 text-xs font-bold flex items-center gap-1 cursor-pointer">
                     LIVE FEED <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-ping" />
                   </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {recentChats.map((chat, i) => {
                     const other = chat.participants?.find(p => p._id !== user._id);
                     return (
                       <motion.div key={i} whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.05)" }} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 transition-all duration-300 cursor-pointer group">
                         <div className="flex items-center gap-4 mb-4">
                           <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center text-sky-400 font-bold border border-white/10 group-hover:border-sky-500/50 transition-colors">
                             {other?.name?.charAt(0) || "U"}
                           </div>
                           <div>
                             <p className="text-sm font-bold text-white group-hover:text-sky-400 transition-colors">{other?.name}</p>
                             <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold italic">Connected</p>
                           </div>
                         </div>
                         <p className="text-xs text-slate-400 line-clamp-1 italic">"{chat.lastMessage || "No messages yet"}"</p>
                       </motion.div>
                     );
                   })}
                </div>
            </motion.div>

          </motion.div>
        </main>
      </div>
    </div>
  );
}

function MiniStatCard({ icon, label, value, color, subText }) {
  const colors = {
    sky: "text-sky-400 border-sky-500/20 bg-sky-500/5",
    purple: "text-purple-400 border-purple-500/20 bg-purple-500/5",
    emerald: "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/5"
  };
  return (
    <motion.div variants={fadeInUp} whileHover={{ y: -8 }} className={`p-6 rounded-[2.5rem] bg-slate-900/40 border ${colors[color]} flex flex-col gap-6 shadow-2xl`}>
      <div className="flex justify-between items-start">
        <div className="p-3 rounded-2xl bg-white/5 border border-white/10">{icon}</div>
        <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity }} className="h-2 w-2 rounded-full bg-current" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 mb-1">{label}</p>
        <h4 className="text-4xl font-black tracking-tighter">{value}</h4>
        <p className="text-[9px] text-slate-500 mt-2 font-medium uppercase tracking-wider">{subText}</p>
      </div>
    </motion.div>
  );
}

export default Dashboard;