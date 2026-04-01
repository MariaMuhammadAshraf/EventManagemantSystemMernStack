// import React, { useEffect, useMemo, useState } from "react";
// import ExhibitorSidebar from "./ExhibitorSidebar";
// import { LayoutDashboard, Users, TrendingUp, Building2 } from "lucide-react";

// const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// function startOfToday() {
//   const d = new Date();
//   d.setHours(0, 0, 0, 0);
//   return d;
// }

// function startOfWeekMonday() {
//   const d = startOfToday();
//   const day = d.getDay(); // 0..6
//   const diff = (day === 0 ? -6 : 1) - day;
//   d.setDate(d.getDate() + diff);
//   return d;
// }

// function buildDailySeries(leads, days = 14) {
//   const map = new Map(); // yyyy-mm-dd => count
//   for (const l of leads) {
//     const dt = new Date(l.createdAt);
//     dt.setHours(0, 0, 0, 0);
//     const key = dt.toISOString().slice(0, 10);
//     map.set(key, (map.get(key) || 0) + 1);
//   }

//   const out = [];
//   const today = startOfToday();
//   for (let i = days - 1; i >= 0; i--) {
//     const d = new Date(today);
//     d.setDate(d.getDate() - i);
//     const key = d.toISOString().slice(0, 10);
//     out.push({
//       key,
//       label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
//       value: map.get(key) || 0,
//     });
//   }
//   return out;
// }

// function clamp(n, min, max) {
//   return Math.max(min, Math.min(max, n));
// }

// function LeadsActivityCard({ series, total }) {
//   const maxVal = Math.max(1, ...series.map((x) => x.value));
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setAnimate(true), 50);
//     return () => clearTimeout(t);
//   }, [series]);

//   return (
//     <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/10 p-6 backdrop-blur-2xl">
//       <div className="absolute -top-12 -right-12 h-52 w-52 bg-sky-500/10 blur-3xl" />

//       <div className="flex items-start justify-between gap-4 mb-5">
//         <div>
//           <h3 className="text-lg font-semibold text-white">Leads Activity</h3>
//           <p className="text-sm text-slate-400 mt-1">Last 14 days (dynamic)</p>
//         </div>
//         <div className="text-right">
//           <div className="text-sm text-slate-300">{total} leads</div>
//           <div className="inline-flex items-center mt-2 text-xs font-medium px-2 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/20">
//             Live
//           </div>
//         </div>
//       </div>

//       {/* Bars */}
//       <div className="h-44 flex items-end gap-2">
//         {series.map((d, i) => {
//           const pct = (d.value / maxVal) * 100;
//           return (
//             <div key={d.key} className="flex-1 group">
//               <div className="relative h-40 rounded-xl bg-white/5 border border-white/5 overflow-hidden">
//                 <div
//                   className="absolute bottom-0 left-0 right-0 rounded-xl bg-gradient-to-t from-sky-500/70 via-sky-400/40 to-transparent"
//                   style={{
//                     height: animate ? `${pct}%` : "6%",
//                     transition: `height 800ms cubic-bezier(.2,.8,.2,1)`,
//                     transitionDelay: `${i * 20}ms`,
//                   }}
//                 />
//                 {/* hover tooltip */}
//                 <div className="absolute inset-x-0 top-2 opacity-0 group-hover:opacity-100 transition text-center">
//                   <span className="text-[11px] px-2 py-1 rounded-lg bg-black/50 border border-white/10">
//                     {d.value}
//                   </span>
//                 </div>
//               </div>
//               <div className="mt-2 text-[11px] text-slate-500 text-center truncate">
//                 {i === 0 || i === series.length - 1 || i % 4 === 0 ? d.label : ""}
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function LeadProgressCard({ leads }) {
//   const GOAL = 30;

//   const { total, today, thisWeek, uniqueAttendees, pct } = useMemo(() => {
//     const t0 = startOfToday();
//     const w0 = startOfWeekMonday();

//     let todayCount = 0;
//     let weekCount = 0;
//     const unique = new Set();

//     for (const l of leads) {
//       const dt = new Date(l.createdAt);
//       if (dt >= t0) todayCount++;
//       if (dt >= w0) weekCount++;

//       const attendeeId = l.attendee?._id || l.attendee;
//       if (attendeeId) unique.add(String(attendeeId));
//     }

//     const totalLeads = leads.length;
//     const p = clamp(Math.round((totalLeads / GOAL) * 100), 0, 100);

//     return { total: totalLeads, today: todayCount, thisWeek: weekCount, uniqueAttendees: unique.size, pct: p };
//   }, [leads]);

//   const radius = 34;
//   const circumference = 2 * Math.PI * radius;
//   const dashOffset = circumference * (1 - pct / 100);

//   return (
//     <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/10 p-6 backdrop-blur-2xl">
//       <div className="absolute -bottom-12 -left-12 h-52 w-52 bg-emerald-500/10 blur-3xl" />

//       <div className="flex items-start justify-between gap-4 mb-5">
//         <div>
//           <h3 className="text-lg font-semibold text-white">Lead Progress</h3>
//           <p className="text-sm text-slate-400 mt-1">Goal + daily/weekly activity</p>
//         </div>
//         <div className="inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
//           Live
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//         {/* ring */}
//         <div className="flex items-center gap-5">
//           <div className="relative w-28 h-28">
//             <svg viewBox="0 0 100 100" className="w-28 h-28">
//               <circle cx="50" cy="50" r={radius} className="stroke-white/10" strokeWidth="10" fill="none" />
//               <circle
//                 cx="50"
//                 cy="50"
//                 r={radius}
//                 className="stroke-emerald-400"
//                 strokeWidth="10"
//                 fill="none"
//                 strokeLinecap="round"
//                 strokeDasharray={circumference}
//                 strokeDashoffset={dashOffset}
//                 transform="rotate(-90 50 50)"
//                 style={{ transition: "stroke-dashoffset 900ms ease" }}
//               />
//             </svg>
//             <div className="absolute inset-0 grid place-items-center">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-white">{pct}%</div>
//                 <div className="text-[11px] text-slate-400">of goal</div>
//               </div>
//             </div>
//           </div>

//           <div>
//             <div className="text-sm text-slate-400">Total Leads</div>
//             <div className="text-3xl font-bold text-white">{total}</div>
//             <div className="text-xs text-slate-500 mt-1">Goal: {GOAL}</div>
//           </div>
//         </div>

//         {/* KPI blocks */}
//         <div className="grid grid-cols-3 gap-3">
//           <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
//             <div className="text-[11px] text-slate-400">Today</div>
//             <div className="text-xl font-semibold text-white">{today}</div>
//           </div>
//           <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
//             <div className="text-[11px] text-slate-400">This week</div>
//             <div className="text-xl font-semibold text-white">{thisWeek}</div>
//           </div>
//           <div className="rounded-2xl bg-black/20 border border-white/5 p-3">
//             <div className="text-[11px] text-slate-400">Unique</div>
//             <div className="text-xl font-semibold text-white">{uniqueAttendees}</div>
//           </div>

//           <div className="col-span-3 mt-2">
//             <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
//               <span>Overall progress</span>
//               <span>{pct}%</span>
//             </div>
//             <div className="h-3 rounded-full bg-white/10 overflow-hidden">
//               <div
//                 className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
//                 style={{
//                   width: `${pct}%`,
//                   transition: "width 900ms cubic-bezier(.2,.8,.2,1)",
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function RecentLeadsCard({ leads }) {
//   const recent = useMemo(() => {
//     return [...leads]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, 5);
//   }, [leads]);

//   return (
//     <div className="relative overflow-hidden rounded-[2rem] bg-white/[0.03] border border-white/10 p-6 backdrop-blur-2xl">
//       <div className="absolute -top-12 -left-12 h-52 w-52 bg-rose-500/10 blur-3xl" />

//       <div className="flex items-start justify-between gap-4 mb-5">
//         <div>
//           <h3 className="text-lg font-semibold text-white">Recent Leads</h3>
//           <p className="text-sm text-slate-400 mt-1">Latest interested attendees</p>
//         </div>
//         <div className="text-sm text-slate-300">{leads.length} total</div>
//       </div>

//       {recent.length === 0 ? (
//         <div className="text-slate-400 text-sm">No leads yet.</div>
//       ) : (
//         <div className="space-y-3">
//           {recent.map((l) => (
//             <div
//               key={l._id}
//               className="flex items-center justify-between gap-4 rounded-2xl bg-black/20 border border-white/5 px-4 py-3 hover:border-white/10 transition"
//             >
//               <div className="min-w-0">
//                 <div className="text-sm font-medium text-white truncate">
//                   {l.attendee?.name || "Attendee"}
//                 </div>
//                 <div className="text-xs text-slate-400 truncate">
//                   {l.attendee?.email || "Email not available"}
//                 </div>
//               </div>
//               <div className="text-xs text-slate-500 whitespace-nowrap">
//                 {new Date(l.createdAt).toLocaleDateString()}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// function ExhibitorDashboard() {
//   const [stats, setStats] = useState({
//     totalBooths: 0,
//     leadsCollected: 0,
//     visitors: 0,
//     totalExhibitors: 0,
//     conversionRate: "0%",
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [leads, setLeads] = useState([]);
//   const [leadsError, setLeadsError] = useState("");

//   useEffect(() => {
//     let isMounted = true;

//     const fetchStats = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const res = await fetch(`${API}/api/exhibitors/stats`);
//         const data = await res.json().catch(() => ({}));

//         if (!res.ok) {
//           if (isMounted) setError(data?.message || "Failed to load stats");
//           return;
//         }

//         if (isMounted) {
//           setStats({
//             totalBooths: Number(data?.totalBooths ?? 0),
//             leadsCollected: Number(data?.leadsCollected ?? 0),
//             visitors: Number(data?.visitors ?? 0),
//             totalExhibitors: Number(data?.totalExhibitors ?? data?.visitors ?? 0),
//             conversionRate: data?.conversionRate ?? "0%",
//           });
//         }
//       } catch {
//         if (isMounted) setError("Network error while loading stats");
//       } finally {
//         if (isMounted) setLoading(false);
//       }
//     };

//     fetchStats();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   useEffect(() => {
//     let isMounted = true;

//     const fetchLeads = async () => {
//       setLeadsError("");

//       // ✅ fallback: exhibitorUser not found -> use "user"
//       const raw =
//         localStorage.getItem("exhibitorUser") || localStorage.getItem("user");
//       const exhibitor = raw ? JSON.parse(raw) : null;

//       if (!exhibitor?._id) {
//         setLeads([]);
//         setLeadsError("Please login again (exhibitor not found).");
//         return;
//       }

//       try {
//         const res = await fetch(`${API}/api/leads/exhibitor/${exhibitor._id}`);
//         const data = await res.json().catch(() => ([]));

//         if (!res.ok) {
//           if (isMounted) setLeadsError(data?.message || "Failed to fetch leads");
//           return;
//         }

//         if (isMounted) setLeads(Array.isArray(data) ? data : []);
//       } catch {
//         if (isMounted) setLeadsError("Network error while fetching leads");
//       }
//     };

//     fetchLeads();
//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   const statCards = useMemo(
//     () => [
//       {
//         title: "Total Booths",
//         value: stats.totalBooths,
//         icon: <LayoutDashboard className="text-sky-400" size={24} />,
//         color: "from-blue-500/20",
//       },
//       {
//         title: "Leads Collected",
//         value: stats.leadsCollected,
//         icon: <Users className="text-emerald-400" size={24} />,
//         color: "from-emerald-500/20",
//       },
//       {
//         title: "Total Exhibitors",
//         value: stats.totalExhibitors,
//         icon: <Building2 className="text-amber-300" size={24} />,
//         color: "from-amber-500/20",
//       },
//       {
//         title: "Conversion Rate",
//         value: stats.conversionRate,
//         icon: <TrendingUp className="text-rose-400" size={24} />,
//         color: "from-rose-500/20",
//       },
//     ],
//     [stats]
//   );

//   const series14 = useMemo(() => buildDailySeries(leads, 14), [leads]);
//   const totalLast14 = useMemo(
//     () => series14.reduce((a, x) => a + (Number(x.value) || 0), 0),
//     [series14]
//   );

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-white font-sans selection:bg-sky-500/30">
//       <ExhibitorSidebar />

//       <div className="flex-1 p-6 lg:p-10">
//         <header className="mb-12">
//           <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-400 to-slate-500 bg-clip-text text-transparent">
//             Exhibitor Dashboard
//           </h1>
//           <p className="text-slate-400 mt-2 text-lg">
//             Welcome back! Here's your event performance at a glance.
//           </p>
//         </header>

//         {error ? (
//           <div className="mb-8 rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-200">
//             {error}
//           </div>
//         ) : null}

//         {loading ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-pulse">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="bg-white/5 h-40 rounded-3xl border border-white/10" />
//             ))}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {statCards.map((card, idx) => (
//               <div
//                 key={idx}
//                 className={`relative group overflow-hidden bg-gradient-to-br ${card.color} to-transparent bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] backdrop-blur-2xl hover:border-white/20 transition-all duration-500 hover:-translate-y-2`}
//               >
//                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 blur-3xl group-hover:bg-sky-500/20 transition-all duration-500" />
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="p-3 bg-black/20 rounded-2xl border border-white/5">
//                     {card.icon}
//                   </div>
//                   <span className="text-xs font-medium px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
//                     Live
//                   </span>
//                 </div>
//                 <div>
//                   <p className="text-slate-400 font-medium mb-1">{card.title}</p>
//                   <h2 className="text-4xl font-bold tracking-tight text-white group-hover:scale-105 transition-transform duration-500">
//                     {card.value}
//                   </h2>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ✅ Professional dynamic section */}
//         <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <LeadsActivityCard series={series14} total={totalLast14} />

//           <div className="space-y-8">
//             {leadsError ? (
//               <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-200">
//                 {leadsError}
//               </div>
//             ) : null}

//             <LeadProgressCard leads={leads} />
//           </div>

//           <div className="lg:col-span-2">
//             <RecentLeadsCard leads={leads} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ExhibitorDashboard;




import React, { useEffect, useMemo, useState } from "react";
import ExhibitorSidebar from "./ExhibitorSidebar";
import { LayoutDashboard, Users, TrendingUp, Building2, Menu, ArrowUpRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // Added for high-end animations

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

// --- HELPERS (NO CHANGES) ---
function startOfToday() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; }
function startOfWeekMonday() { 
  const d = startOfToday(); 
  const day = d.getDay(); 
  const diff = (day === 0 ? -6 : 1) - day; 
  d.setDate(d.getDate() + diff); 
  return d; 
}
function buildDailySeries(leads, days = 14) {
  const map = new Map();
  for (const l of leads) {
    const dt = new Date(l.createdAt);
    dt.setHours(0, 0, 0, 0);
    const key = dt.toISOString().slice(0, 10);
    map.set(key, (map.get(key) || 0) + 1);
  }
  const out = []; const today = startOfToday();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    out.push({ key, label: d.toLocaleDateString(undefined, { month: "short", day: "numeric" }), value: map.get(key) || 0 });
  }
  return out;
}
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

// --- ANIMATED NUMBER COMPONENT ---
function AnimatedNumber({ value }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {value}
    </motion.span>
  );
}

// --- UI CARDS (ANIMATED & ENHANCED) ---
function LeadsActivityCard({ series, total }) {
  const maxVal = Math.max(1, ...series.map((x) => x.value));
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 p-8 backdrop-blur-3xl transition-all duration-500 hover:border-sky-500/30 shadow-2xl"
    >
      <div className="absolute -top-24 -right-24 h-64 w-64 bg-sky-500/10 blur-[100px] group-hover:bg-sky-500/20 transition-colors" />
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Leads Activity</h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">Daily performance tracking</p>
        </div>
        <div className="px-4 py-2 bg-sky-500/10 rounded-2xl border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
          <span className="text-sky-400 font-bold">{total} Total</span>
        </div>
      </div>
      <div className="h-48 flex items-end gap-2 md:gap-3">
        {series.map((d, i) => (
          <div key={d.key} className="flex-1 group/bar relative h-full flex flex-col justify-end">
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: `${(d.value / maxVal) * 100}%` }}
              transition={{ duration: 1, delay: i * 0.05, ease: "circOut" }}
              className="relative w-full min-h-[4px] rounded-t-xl bg-gradient-to-t from-sky-600 via-sky-400 to-sky-300 shadow-[0_0_20px_rgba(14,165,233,0.2)] group-hover/bar:brightness-125 transition-all"
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-xl">
                {d.value} Leads
              </div>
            </motion.div>
            <div className="mt-3 text-[10px] font-bold text-slate-600 group-hover/bar:text-slate-400 transition-colors text-center truncate uppercase tracking-tighter">
              {i % 3 === 0 ? d.label : ""}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function LeadProgressCard({ leads }) {
  const GOAL = 30;
  const { total, today, thisWeek, uniqueAttendees, pct } = useMemo(() => {
    const t0 = startOfToday(); const w0 = startOfWeekMonday();
    let todayCount = 0; let weekCount = 0; const unique = new Set();
    for (const l of leads) {
      const dt = new Date(l.createdAt);
      if (dt >= t0) todayCount++; if (dt >= w0) weekCount++;
      const attendeeId = l.attendee?._id || l.attendee;
      if (attendeeId) unique.add(String(attendeeId));
    }
    return { total: leads.length, today: todayCount, thisWeek: weekCount, uniqueAttendees: unique.size, pct: clamp(Math.round((leads.length / GOAL) * 100), 0, 100) };
  }, [leads]);
  
  const radius = 38; const circumference = 2 * Math.PI * radius;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 p-8 backdrop-blur-3xl transition-all duration-500 hover:border-emerald-500/30"
    >
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Conversion Goal</h3>
          <p className="text-sm text-slate-500 mt-1 font-medium">Progress towards {GOAL} leads</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-lg">
          <TrendingUp size={20} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex items-center gap-8">
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]">
              <circle cx="50" cy="50" r={radius} className="stroke-white/5" strokeWidth="8" fill="none" />
              <motion.circle 
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: circumference * (1 - pct / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                cx="50" cy="50" r={radius} className="stroke-emerald-500" strokeWidth="8" fill="none" strokeLinecap="round" strokeDasharray={circumference} transform="rotate(-90 50 50)" 
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-black text-white leading-none">{pct}%</span>
              <span className="text-[10px] font-bold text-slate-500 uppercase mt-1">Goal</span>
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">Collected</div>
            <div className="text-4xl font-black text-white mt-1"><AnimatedNumber value={total} /></div>
          </div>
        </div>
        <div className="space-y-3">
           {[ {l: 'Today', v: today}, {l: 'Weekly', v: thisWeek}, {l: 'Unique', v: uniqueAttendees} ].map((item, idx) => (
             <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: idx * 0.1 }}
               key={item.l} 
               className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:bg-white/[0.05] transition-colors"
             >
               <span className="text-xs font-bold text-slate-400 uppercase">{item.l}</span>
               <span className="text-sm font-black text-white">{item.v}</span>
             </motion.div>
           ))}
        </div>
      </div>
    </motion.div>
  );
}

function RecentLeadsCard({ leads }) {
  const recent = useMemo(() => [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6), [leads]);
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 backdrop-blur-3xl shadow-2xl"
    >
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Sparkles className="text-sky-400" size={20} /> Recent Acquires
        </h3>
        <button className="text-xs font-bold text-sky-400 hover:text-sky-300 transition-colors uppercase tracking-widest px-4 py-2 bg-sky-500/5 rounded-xl border border-sky-500/10">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recent.map((l, idx) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={l._id} 
            className="group flex items-center justify-between rounded-[1.5rem] bg-white/[0.03] border border-white/5 p-5 hover:bg-white/10 hover:border-sky-500/20 hover:translate-y-[-4px] transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 flex items-center justify-center text-sky-400 font-black border border-white/10 shadow-lg group-hover:shadow-sky-500/20 group-hover:border-sky-500/30 transition-all">
                {l.attendee?.name ? l.attendee.name.charAt(0) : "A"}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-white truncate group-hover:text-sky-400 transition-colors">{l.attendee?.name || "Attendee"}</div>
                <div className="text-xs text-slate-500 truncate mt-0.5 font-medium">{l.attendee?.email}</div>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// --- MAIN DASHBOARD ---
function ExhibitorDashboard() {
  const [stats, setStats] = useState({ totalBooths: 0, leadsCollected: 0, visitors: 0, totalExhibitors: 0, conversionRate: "0%" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [leads, setLeads] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API}/api/exhibitors/stats`);
        const data = await res.json();
        if (isMounted && res.ok) {
          setStats({
            totalBooths: Number(data?.totalBooths ?? 0),
            leadsCollected: Number(data?.leadsCollected ?? 0),
            visitors: Number(data?.visitors ?? 0),
            totalExhibitors: Number(data?.totalExhibitors ?? data?.visitors ?? 0),
            conversionRate: data?.conversionRate ?? "0%",
          });
        }
      } catch (err) { setError("Network error"); }
      finally { setLoading(false); }
    };
    fetchStats();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const fetchLeads = async () => {
      const raw = localStorage.getItem("exhibitorUser") || localStorage.getItem("user");
      const exhibitor = raw ? JSON.parse(raw) : null;
      if (!exhibitor?._id) return;
      try {
        const res = await fetch(`${API}/api/leads/exhibitor/${exhibitor._id}`);
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      } catch (err) { console.error("Leads error"); }
    };
    fetchLeads();
  }, []);

  const statCards = useMemo(() => [
    { title: "Total Booths", value: stats.totalBooths, icon: <LayoutDashboard size={24} />, color: "from-blue-600/20", text: "text-blue-400" },
    { title: "Leads Collected", value: stats.leadsCollected, icon: <Users size={24} />, color: "from-emerald-600/20", text: "text-emerald-400" },
    { title: "Total Exhibitors", value: stats.totalExhibitors, icon: <Building2 size={24} />, color: "from-amber-600/20", text: "text-amber-400" },
    { title: "Conversion", value: stats.conversionRate, icon: <TrendingUp size={24} />, color: "from-rose-600/20", text: "text-rose-400" },
  ], [stats]);

  const series14 = useMemo(() => buildDailySeries(leads, 14), [leads]);
  const totalLast14 = useMemo(() => series14.reduce((a, x) => a + (Number(x.value) || 0), 0), [series14]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-sky-500/30">
      
    <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

     <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300">
        
        {/* MOBILE HEADER */}
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

        <main className="p-6 md:p-12 lg:p-16 max-w-[1600px] mx-auto w-full">
          <motion.header 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12 md:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(14,165,233,0.1)]">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
              System Status: Active
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
              Exhibitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-indigo-500">Dashboard</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
              Real-time analytics and lead tracking for your event performance.
            </p>
          </motion.header>

          {/* Stat Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statCards.map((card, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white/[0.02] border border-white/10 p-8 rounded-[2.5rem] backdrop-blur-3xl transition-all duration-500 hover:bg-white/[0.04] hover:border-white/20 shadow-xl"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${card.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem]`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-8">
                    <div className={`p-4 bg-black/40 rounded-[1.5rem] border border-white/10 shadow-inner ${card.text}`}>{card.icon}</div>
                    <div className="flex -space-x-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    </div>
                  </div>
                  <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mb-2">{card.title}</p>
                  <h2 className="text-4xl font-black text-white tracking-tighter">
                    <AnimatedNumber value={card.value} />
                  </h2>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Sections */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
              <LeadsActivityCard series={series14} total={totalLast14} />
            </div>
            <div className="lg:col-span-1">
              <LeadProgressCard leads={leads} />
            </div>
            <div className="lg:col-span-2">
              <RecentLeadsCard leads={leads} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExhibitorDashboard;