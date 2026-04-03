 
// import React, { useEffect, useState } from "react";
// import { Users, Calendar, Briefcase, DollarSign, TrendingUp, BarChart3, ArrowUpRight } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import AdminSidebar from "./AdminSidebar";

// const API_BASE_URL = "https://event-managemant-system-mern-stack.vercel.app/api";

// function Dashboard() {
//   const [stats, setStats] = useState(null);
//   const [view, setView] = useState("Months"); // State for switching views

//   useEffect(() => {
//     fetch(`${API_BASE_URL}/dashboard/stats`)
//       .then((res) => res.json())
//       .then((data) => setStats(data))
//       .catch((err) => console.error("Error fetching stats:", err));
//   }, []);

//   if (!stats) {
//     return (
//       <div className="flex min-h-screen items-center justify-center bg-[#020617] text-sky-400">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
//           <p className="animate-pulse text-sm font-bold tracking-[0.3em]">LOADING DATA</p>
//         </div>
//       </div>
//     );
//   }

//   // Chart Data Logic
//   const dataMap = {
//     Days: {
//       labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       values: [30, 50, 45, 70, 90, 65, 40]
//     },
//     Months: {
//       labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//       values: [45, 55, 40, 90, 60, 85, 50, 95, 70, 80, 50, 88]
//     },
//     Years: {
//       labels: ["2022", "2023", "2024", "2025", "2026"],
//       values: [60, 75, 95, 80, 99]
//     }
//   };

//   const cards = [
//     { title: "Total Users", value: stats.totalUsers, icon: <Users size={22} />, color: "from-blue-600 to-cyan-400", shadow: "shadow-blue-500/20" },
//     { title: "Active Expos", value: stats.activeExpos, icon: <Calendar size={22} />, color: "from-purple-600 to-pink-400", shadow: "shadow-purple-500/20" },
//     { title: "Exhibitors", value: stats.exhibitors, icon: <Briefcase size={22} />, color: "from-orange-600 to-amber-400", shadow: "shadow-orange-500/20" },
//     { title: "Revenue", value: `$${stats.revenue.toLocaleString()}`, icon: <DollarSign size={22} />, color: "from-emerald-600 to-teal-400", shadow: "shadow-emerald-500/20" },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans">
//       <AdminSidebar />
//       <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        
//         {/* Stylish Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           {cards.map((card, index) => (
//             <motion.div 
//               key={index}
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: index * 0.1 }}
//               className="group relative bg-slate-900/40 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/5 hover:border-sky-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
//             >
//               {/* Stylish Glowing Icon */}
//               <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white ${card.shadow} shadow-2xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 z-10 border border-white/20`}>
//                 {card.icon}
//               </div>

//               <div className="relative z-0">
//                 <p className="text-slate-400 font-medium text-[11px] uppercase tracking-[0.2em] mb-2">{card.title}</p>
//                 <h2 className="text-3xl font-extrabold text-white tracking-tight mb-4">{card.value}</h2>
//                 <div className="flex items-center text-[10px] text-emerald-400 font-black bg-emerald-400/10 w-fit px-3 py-1 rounded-full border border-emerald-400/20">
//                   <TrendingUp size={12} className="mr-1" />
//                   <span>+12.5% GROWTH</span>
//                 </div>
//               </div>

//               {/* Decorative Glow */}
//               <div className={`absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 blur-3xl rounded-full group-hover:opacity-20 transition-opacity`}></div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Updated Chart Section */}
//         <motion.div 
//           layout
//           className="bg-slate-900/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden"
//         >
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
//             <div>
//               <h3 className="text-xl font-bold text-white flex items-center gap-2">
//                 <BarChart3 className="text-sky-400" size={24} /> Platform Activity
//               </h3>
//               <p className="text-slate-400 text-sm mt-1">Showing {view} engagement analytics</p>
//             </div>
            
//             {/* View Switcher Controls */}
//             <div className="flex bg-slate-950/80 p-1.5 rounded-2xl border border-white/5 shadow-inner">
//                {["Days", "Months", "Years"].map((tab) => (
//                  <button 
//                   key={tab}
//                   onClick={() => setView(tab)}
//                   className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 ${view === tab ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30 scale-105' : 'text-slate-500 hover:text-slate-300'}`}
//                  >
//                   {tab}
//                  </button>
//                ))}
//             </div>
//           </div>

//           {/* Visual Bars Container */}
//           <div className="h-80 flex items-end justify-between gap-2 md:gap-4 relative px-2 border-b border-white/5 pb-2">
//             <AnimatePresence mode="popLayout">
//               {dataMap[view].values.map((height, i) => (
//                 <motion.div 
//                   key={`${view}-${i}`} // Dynamic key triggers animation on view change
//                   className="flex-1 flex flex-col items-center group/bar max-w-[50px] h-full justify-end"
//                 >
//                   <motion.div 
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: `${height}%`, opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.8, delay: i * 0.03, ease: "backOut" }}
//                     className="w-full rounded-t-2xl bg-gradient-to-t from-sky-600/20 via-sky-500 to-sky-300 relative z-10 shadow-[0_0_20px_rgba(56,189,248,0.2)] group-hover/bar:brightness-110 transition-all cursor-crosshair"
//                   >
//                     {/* Glowing Tip */}
//                     <div className="absolute top-0 left-0 w-full h-1 bg-white/40 rounded-full blur-[2px]"></div>
                    
//                     {/* Tooltip */}
//                     <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-3 py-1.5 rounded-xl text-[11px] font-black opacity-0 group-hover/bar:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-2xl scale-50 group-hover/bar:scale-100">
//                       {height}% Impact
//                     </div>
//                   </motion.div>
//                   <span className="text-[10px] text-slate-500 mt-4 font-bold uppercase tracking-widest">{dataMap[view].labels[i]}</span>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {/* Subtle Grid Lines */}
//             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 py-2">
//               {[1, 2, 3, 4, 5].map((line) => (
//                 <div key={line} className="w-full border-t border-slate-600 border-dashed"></div>
//               ))}
//             </div>
//           </div>

//           {/* Indicators Section */}
//           <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap gap-10">
//             <div className="flex items-center gap-5 group cursor-default">
//               <div className="w-14 h-14 bg-emerald-500/10 rounded-[1.25rem] flex items-center justify-center text-emerald-400 border border-emerald-500/20 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">
//                 <ArrowUpRight size={28} />
//               </div>
//               <div>
//                 <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] mb-1">Performance</p>
//                 <p className="text-2xl font-black text-white">+24.8%</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-5 group cursor-default">
//               <div className="w-14 h-14 bg-sky-500/10 rounded-[1.25rem] flex items-center justify-center text-sky-400 border border-sky-500/20 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all duration-500">
//                 <TrendingUp size={28} />
//               </div>
//               <div>
//                 <p className="text-slate-500 text-[10px] uppercase font-black tracking-[0.2em] mb-1">Retention</p>
//                 <p className="text-2xl font-black text-white">82.1%</p>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;



import React, { useEffect, useState } from "react";
import {
  Users,
  Calendar,
  Briefcase,
  DollarSign,
  TrendingUp,
  BarChart3,
  ArrowUpRight,
  Menu,
  Shield,
  Zap,
  UserCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";

const API_BASE_URL = "https://event-managemant-system-mern-stack.vercel.app/api";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [view, setView] = useState("Months");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/dashboard/stats`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  if (!stats) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#020617]">
        <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
            <p className="text-sky-400 font-bold tracking-widest text-xs uppercase">Syncing Data...</p>
        </div>
      </div>
    );
  }

  const dataMap = {
    Days: { labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], values: [30, 50, 45, 70, 90, 65, 40] },
    Months: { labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], values: [45, 55, 40, 90, 60, 85, 50, 95, 70, 80, 50, 88] },
    Years: { labels: ["2022", "2023", "2024", "2025", "2026"], values: [60, 75, 95, 80, 99] },
  };

  // ✅ Updated Cards: Revenue removed, Attendees added with dynamic value
  const cards = [
    { title: "Total Users", value: stats.totalUsers, icon: <Users size={22} />, color: "from-blue-600 to-cyan-400", shadow: "shadow-blue-500/20" },
    { title: "Active Expos", value: stats.activeExpos, icon: <Calendar size={22} />, color: "from-purple-600 to-pink-400", shadow: "shadow-purple-500/20" },
    { title: "Total Exhibitors", value: stats.exhibitors, icon: <Briefcase size={22} />, color: "from-orange-600 to-amber-400", shadow: "shadow-orange-500/20" },
    { title: "Total Attendees", value: stats.totalAttendees || 0, icon: <UserCheck size={22} />, color: "from-emerald-600 to-teal-400", shadow: "shadow-emerald-500/20" },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-sky-500/30">
      
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-64">

        {/* ✅ Professional Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-800/50 rounded-lg text-white hover:bg-slate-700 transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-sky-400 font-bold tracking-[0.2em] text-[10px] uppercase">ADMIN DASHBOARD</span>
          </div>
          <div className="w-8" />
        </div>

        <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
          
          {/* ✅ Page Title Section */}
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <Shield className="h-5 w-5 text-sky-400" />
                <span className="text-sky-400 font-bold tracking-[0.2em] text-[10px] uppercase">Platform Overview</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white italic leading-none">
              Admin
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Dashboard</span>
            </h1>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-slate-900/40 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/5 hover:border-sky-500/30 transition-all duration-500 shadow-2xl overflow-hidden"
              >
                <div className={`absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-white ${card.shadow} shadow-2xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 z-10 border border-white/20`}>
                  {card.icon}
                </div>

                <div className="relative z-0">
                  <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2">{card.title}</p>
                  <h2 className="text-4xl font-black text-white tracking-tighter mb-4">{card.value}</h2>
                  <div className="flex items-center text-[9px] text-emerald-400 font-black bg-emerald-400/10 w-fit px-3 py-1 rounded-full border border-emerald-400/20">
                    <Zap size={10} className="mr-1 fill-emerald-400" />
                    <span>LIVE UPDATED</span>
                  </div>
                </div>
                <div className={`absolute -bottom-12 -left-12 w-24 h-24 bg-gradient-to-br ${card.color} opacity-5 blur-3xl rounded-full group-hover:opacity-10 transition-opacity`}></div>
              </motion.div>
            ))}
          </div>

          {/* ✅ Premium Chart Section */}
          <motion.div 
            layout
            className="bg-slate-900/60 backdrop-blur-3xl rounded-[3rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
              <div>
                <h3 className="text-2xl font-black text-white italic tracking-tight flex items-center gap-3">
                  <BarChart3 className="text-sky-400" size={24} /> Platform <span className="text-sky-500">Activity</span>
                </h3>
                <p className="text-slate-500 text-xs font-medium mt-1 tracking-wide">Global engagement metrics across the ecosystem</p>
              </div>
              
              <div className="flex bg-slate-950/90 p-1.5 rounded-2xl border border-white/5 shadow-2xl">
                {["Days", "Months", "Years"].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setView(tab)}
                    className={`px-6 py-2.5 text-[10px] uppercase font-black rounded-xl transition-all duration-500 ${view === tab ? 'bg-sky-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105' : 'text-slate-500 hover:text-slate-300'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Visual Bars Container */}
            <div className="h-80 grid items-end gap-2 md:gap-5 relative px-2 border-b border-white/5 pb-4"
                 style={{ gridTemplateColumns: `repeat(${dataMap[view].values.length}, minmax(0, 1fr))` }}>
              
              <AnimatePresence mode="popLayout">
                {dataMap[view].values.map((height, i) => (
                  <motion.div 
                    key={`${view}-${i}`} 
                    className="flex flex-col items-center group/bar h-full justify-end relative z-10"
                  >
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: `${height}%`, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 1, delay: i * 0.02, ease: [0.23, 1, 0.32, 1] }}
                      className="w-full rounded-t-xl md:rounded-t-2xl bg-gradient-to-t from-sky-600/10 via-sky-500 to-sky-300 relative shadow-[0_0_30px_rgba(56,189,248,0.1)] group-hover/bar:shadow-[0_0_40px_rgba(56,189,248,0.3)] group-hover/bar:brightness-125 transition-all cursor-pointer"
                    >
                      <div className="absolute top-0 left-0 w-full h-1 bg-white/40 rounded-full blur-[1.5px]"></div>
                      
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-white text-slate-900 px-3 py-2 rounded-xl text-[10px] font-black opacity-0 group-hover/bar:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-[0_10px_30px_rgba(255,255,255,0.2)] scale-50 group-hover/bar:scale-100 border-4 border-slate-900/5">
                        {height}% IMPACT
                      </div>
                    </motion.div>
                    <span className="text-[8px] md:text-[10px] text-slate-500 mt-5 font-black uppercase tracking-[0.2em] opacity-60 group-hover/bar:opacity-100 group-hover/bar:text-sky-400 transition-all">
                        {dataMap[view].labels[i]}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* ✅ Super Fine & Professional Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none py-4 px-1">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="w-full border-t border-white/[0.03] relative">
                     <span className="absolute -left-10 -top-2 text-[8px] text-slate-700 font-bold hidden md:block">
                        {100 - (index * 20)}%
                     </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Indicators Section */}
            <div className="mt-14 pt-8 border-t border-white/5 flex flex-wrap gap-12 relative z-10">
              {[
                { label: "Growth", val: "+24.8%", icon: <ArrowUpRight size={24} />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
                { label: "Retention", val: "82.1%", icon: <TrendingUp size={24} />, color: "text-sky-400", bg: "bg-sky-500/10" }
              ].map((ind, idx) => (
                <div key={idx} className="flex items-center gap-5 group cursor-default">
                  <div className={`w-14 h-14 ${ind.bg} rounded-2xl flex items-center justify-center ${ind.color} border border-white/5 group-hover:scale-110 group-hover:border-sky-500/30 transition-all duration-500`}>
                    {ind.icon}
                  </div>
                  <div>
                    <p className="text-slate-500 text-[9px] uppercase font-black tracking-[0.3em] mb-1">{ind.label}</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{ind.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;