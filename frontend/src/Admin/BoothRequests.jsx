// import React, { useEffect, useMemo, useState } from "react";
// import AdminSidebar from "./AdminSidebar";

// const API_BASE = "https://event-managemant-system-mern-stack.vercel.app";

// export default function BoothRequests() {
//   const admin = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   }, []);

//   const adminId = admin?._id;

//   const [status, setStatus] = useState("pending");
//   const [requests, setRequests] = useState([]);
//   const [expos, setExpos] = useState([]);
//   const [selectedExpoId, setSelectedExpoId] = useState("");
//   const [stats, setStats] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [actingId, setActingId] = useState("");
//   const [error, setError] = useState("");
//   const [adminNote, setAdminNote] = useState("");

//   const headers = useMemo(
//     () => ({
//       "Content-Type": "application/json",
//       "x-user-id": adminId || "",
//     }),
//     [adminId]
//   );

//   const fetchExpos = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/expos`);
//       const data = await res.json();
//       const list = Array.isArray(data) ? data : [];
//       setExpos(list);
//       if (!selectedExpoId && list.length > 0) setSelectedExpoId(list[0]._id);
//     } catch {
//       setExpos([]);
//     }
//   };

//   const fetchRequests = async () => {
//     setLoading(true);
//     setError("");

//     if (!adminId) {
//       setError("Admin login required (localStorage user missing).");
//       setRequests([]);
//       setLoading(false);
//       return;
//     }

//     if (!selectedExpoId) {
//       setRequests([]);
//       setLoading(false);
//       return;
//     }

//     try {
//       // ✅ FIX: status + expoId both
//       const res = await fetch(
//         `${API_BASE}/api/booth-requests?status=${status}&expoId=${selectedExpoId}`,
//         { headers }
//       );
//       const data = await res.json();
//       setRequests(Array.isArray(data) ? data : []);
//     } catch {
//       setError("Failed to load booth requests.");
//       setRequests([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async (expoId) => {
//     if (!expoId || !adminId) {
//       setStats(null);
//       return;
//     }
//     try {
//       const res = await fetch(`${API_BASE}/api/booth-requests/stats/expo/${expoId}`, {
//         headers,
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Failed to fetch stats");
//       setStats(data);
//     } catch {
//       setStats(null);
//     }
//   };

//   const refreshAll = async () => {
//     await Promise.all([fetchRequests(), fetchStats(selectedExpoId)]);
//   };

//   useEffect(() => {
//     fetchExpos();
//     // eslint-disable-next-line
//   }, []);

//   // ✅ FIX: re-fetch when status OR expo changes
//   useEffect(() => {
//     fetchRequests();
//     // eslint-disable-next-line
//   }, [status, selectedExpoId]);

//   useEffect(() => {
//     fetchStats(selectedExpoId);
//     // eslint-disable-next-line
//   }, [selectedExpoId]);

//   const approve = async (id) => {
//     setActingId(id);
//     setError("");
//     try {
//       const res = await fetch(`${API_BASE}/api/booth-requests/${id}/approve`, {
//         method: "POST",
//         headers,
//         body: JSON.stringify({ adminNote }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Approve failed");
//       setAdminNote("");
//       await refreshAll();
//     } catch (err) {
//       setError(err.message || "Approve failed");
//     } finally {
//       setActingId("");
//     }
//   };

//   const reject = async (id) => {
//     setActingId(id);
//     setError("");
//     try {
//       const res = await fetch(`${API_BASE}/api/booth-requests/${id}/reject`, {
//         method: "POST",
//         headers,
//         body: JSON.stringify({ adminNote }),
//       });
//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Reject failed");
//       setAdminNote("");
//       await refreshAll();
//     } catch (err) {
//       setError(err.message || "Reject failed");
//     } finally {
//       setActingId("");
//     }
//   };

//   const StatCard = ({ title, value, sub }) => (
//     <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
//       <p className="text-xs text-slate-300">{title}</p>
//       <p className="mt-1 text-2xl font-semibold">{value}</p>
//       {sub && <p className="mt-1 text-xs text-slate-400">{sub}</p>}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950 text-slate-100">
//       <div className="flex min-h-screen">
//         <AdminSidebar />

//         <div className="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 py-8">
//           <div className="max-w-6xl mx-auto w-full">
//             {/* HEADER */}
//             <div className="mb-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
//                   Booth Requests
//                 </h1>
//                 <p className="text-slate-300 mt-2">
//                   Approve or reject exhibitor booth requests. (Hall A/B only, 15 booths per hall)
//                 </p>
//               </div>

//               <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
//                 <select
//                   value={selectedExpoId}
//                   onChange={(e) => setSelectedExpoId(e.target.value)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                 >
//                   {expos.map((expo) => (
//                     <option key={expo._id} value={expo._id}>
//                       {expo.title}
//                     </option>
//                   ))}
//                 </select>

//                 <div className="flex gap-2">
//                   {["pending", "approved", "rejected"].map((s) => (
//                     <button
//                       key={s}
//                       onClick={() => setStatus(s)}
//                       className={`px-4 py-2 rounded-xl border transition ${
//                         status === s
//                           ? "border-sky-400/40 bg-sky-500/15 text-white"
//                           : "border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
//                       }`}
//                     >
//                       {s}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* ERROR */}
//             {error && (
//               <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-red-200">
//                 {error}
//               </div>
//             )}

//             {/* STATS */}
//             <div className="mb-6 grid md:grid-cols-3 gap-4">
//               <StatCard
//                 title="Hall A Booths"
//                 value={stats ? `${stats.halls["Hall A"].used}/15` : "—"}
//                 sub={stats ? `${stats.halls["Hall A"].remaining} remaining` : ""}
//               />
//               <StatCard
//                 title="Hall B Booths"
//                 value={stats ? `${stats.halls["Hall B"].used}/15` : "—"}
//                 sub={stats ? `${stats.halls["Hall B"].remaining} remaining` : ""}
//               />
//               <StatCard
//                 title="Pending Requests (Selected Expo)"
//                 value={stats ? stats.pendingRequests : "—"}
//                 sub="Only for selected expo"
//               />
//             </div>

//             {/* NOTE input */}
//             <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
//               <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
//                 <div>
//                   <p className="font-semibold">Admin Note (optional)</p>
//                   <p className="text-xs text-slate-400">
//                     This note is saved on approve/reject and shown to exhibitor.
//                   </p>
//                 </div>
//                 <input
//                   value={adminNote}
//                   onChange={(e) => setAdminNote(e.target.value)}
//                   placeholder="e.g. Please update company details..."
//                   className="w-full md:w-[480px] rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                 />
//               </div>
//             </div>

//             {/* REQUESTS LIST */}
//             <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold">
//                   Requests ({status}) — Selected Expo Only
//                 </h2>
//                 <button
//                   onClick={refreshAll}
//                   className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
//                 >
//                   Refresh
//                 </button>
//               </div>

//               {loading ? (
//                 <p className="text-slate-300 mt-4">Loading...</p>
//               ) : requests.length === 0 ? (
//                 <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
//                   No requests found for this expo.
//                 </div>
//               ) : (
//                 <div className="mt-4 grid lg:grid-cols-2 gap-4">
//                   {requests.map((r) => (
//                     <div
//                       key={r._id}
//                       className="rounded-2xl border border-white/10 bg-white/5 p-5"
//                     >
//                       <div className="flex items-start justify-between gap-4">
//                         <div>
//                           <div className="text-lg font-semibold text-sky-200">
//                             {r.boothName}
//                           </div>
//                           <div className="text-sm text-slate-300">
//                             {r.company || "—"}
//                           </div>

//                           <div className="mt-2 text-xs text-slate-400">
//                             Expo:{" "}
//                             <span className="text-slate-200">{r.expoId?.title || "—"}</span>
//                           </div>

//                           <div className="text-xs text-slate-400">
//                             Hall: <span className="text-slate-200">{r.hall}</span>
//                           </div>

//                           <div className="mt-2 text-xs text-slate-400">
//                             Exhibitor:{" "}
//                             <span className="text-slate-200">{r.exhibitorId?.name || "—"}</span>{" "}
//                             <span className="text-slate-500">({r.exhibitorId?.email || "—"})</span>
//                           </div>
//                         </div>

//                         <span
//                           className={`text-xs px-3 py-1 rounded-full border ${
//                             r.status === "pending"
//                               ? "border-amber-400/30 text-amber-200 bg-amber-500/10"
//                               : r.status === "approved"
//                               ? "border-emerald-400/30 text-emerald-200 bg-emerald-500/10"
//                               : "border-rose-400/30 text-rose-200 bg-rose-500/10"
//                           }`}
//                         >
//                           {r.status}
//                         </span>
//                       </div>

//                       {r.description && (
//                         <p className="mt-3 text-sm text-slate-300 line-clamp-3">
//                           {r.description}
//                         </p>
//                       )}

//                       {Array.isArray(r.productsServices) && r.productsServices.length > 0 && (
//                         <div className="mt-3 text-xs text-slate-300">
//                           <span className="text-slate-400">Products/Services:</span>{" "}
//                           {r.productsServices.join(", ")}
//                         </div>
//                       )}

//                       {r.adminNote && (
//                         <div className="mt-3 text-xs text-slate-200">
//                           Admin Note: <span className="italic">{r.adminNote}</span>
//                         </div>
//                       )}

//                       {r.status === "pending" && (
//                         <div className="mt-4 flex gap-3">
//                           <button
//                             onClick={() => approve(r._id)}
//                             disabled={actingId === r._id}
//                             className="flex-1 py-3 rounded-xl font-semibold
//                             bg-gradient-to-r from-emerald-500 to-green-600
//                             hover:from-emerald-400 hover:to-green-500
//                             disabled:opacity-60 disabled:cursor-not-allowed transition"
//                           >
//                             {actingId === r._id ? "Approving..." : "Approve"}
//                           </button>

//                           <button
//                             onClick={() => reject(r._id)}
//                             disabled={actingId === r._id}
//                             className="flex-1 py-3 rounded-xl font-semibold
//                             bg-gradient-to-r from-rose-500 to-red-600
//                             hover:from-rose-400 hover:to-red-500
//                             disabled:opacity-60 disabled:cursor-not-allowed transition"
//                           >
//                             {actingId === r._id ? "Rejecting..." : "Reject"}
//                           </button>
//                         </div>
//                       )}

//                       <div className="mt-4 text-xs text-slate-500">
//                         Sent: {new Date(r.createdAt).toLocaleString()}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <p className="mt-6 text-xs text-slate-400">
//               Capacity Rule: Each Expo has Hall A & Hall B only. Each hall can contain max 15 booths.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "./AdminSidebar";
import { Menu, RefreshCcw, CheckCircle2, XCircle, Info, LayoutDashboard } from "lucide-react";

const API_BASE = "https://event-managemant-system-mern-stack.vercel.app";

export default function BoothRequests() {
  const admin = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const adminId = admin?._id;

  const [status, setStatus] = useState("pending");
  const [requests, setRequests] = useState([]);
  const [expos, setExpos] = useState([]);
  const [selectedExpoId, setSelectedExpoId] = useState("");
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState("");
  const [error, setError] = useState("");
  const [adminNote, setAdminNote] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      "x-user-id": adminId || "",
    }),
    [adminId]
  );

  const fetchExpos = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/expos`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setExpos(list);
      if (!selectedExpoId && list.length > 0) setSelectedExpoId(list[0]._id);
    } catch {
      setExpos([]);
    }
  };

 // Is fetchRequests function ko replace karein
const fetchRequests = async () => {
  setLoading(true);
  setError("");

  if (!adminId || !selectedExpoId) {
    setRequests([]);
    setLoading(false);
    return;
  }

  try {
    const res = await fetch(
      `${API_BASE}/api/booth-requests?status=${status}&expoId=${selectedExpoId}`,
      { headers }
    );

    // Agar 403 error aaye to handle karein
    if (res.status === 403) {
       setError("Access Denied: You don't have admin permissions or your session expired.");
       setRequests([]);
       return;
    }

    if (!res.ok) throw new Error("Server Error");

    const data = await res.json();
    setRequests(Array.isArray(data) ? data : []);
  } catch (err) {
    setError("Failed to load requests. Check your connection or login again.");
    setRequests([]);
  } finally {
    setLoading(false);
  }
};
  const fetchStats = async (expoId) => {
    if (!expoId || !adminId) {
      setStats(null);
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/booth-requests/stats/expo/${expoId}`, {
        headers,
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setStats(data);
    } catch {
      setStats(null);
    }
  };

  const refreshAll = async () => {
    await Promise.all([fetchRequests(), fetchStats(selectedExpoId)]);
  };

  useEffect(() => { fetchExpos(); }, []);
  useEffect(() => { fetchRequests(); }, [status, selectedExpoId]);
  useEffect(() => { fetchStats(selectedExpoId); }, [selectedExpoId]);

  const approve = async (id) => {
    setActingId(id);
    try {
      await fetch(`${API_BASE}/api/booth-requests/${id}/approve`, {
        method: "POST",
        headers,
        body: JSON.stringify({ adminNote }),
      });
      setAdminNote("");
      await refreshAll();
    } finally {
      setActingId("");
    }
  };

  const reject = async (id) => {
    setActingId(id);
    try {
      await fetch(`${API_BASE}/api/booth-requests/${id}/reject`, {
        method: "POST",
        headers,
        body: JSON.stringify({ adminNote }),
      });
      setAdminNote("");
      await refreshAll();
    } finally {
      setActingId("");
    }
  };

  const StatCard = ({ title, value, sub, color }) => (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/40 backdrop-blur-2xl p-6 shadow-2xl"
    >
      <div className={`absolute -right-4 -top-4 h-24 w-24 rounded-full blur-[50px] opacity-20 ${color}`} />
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-black italic tracking-tighter text-white">{value}</p>
      {sub && <p className="mt-1 text-xs font-medium text-slate-400">{sub}</p>}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-sky-500/30 overflow-x-hidden">
      
      {/* Background Animated Glows */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sky-500/10 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full animate-pulse delay-700" />
      </div>

      <div className="flex min-h-screen">
        <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
          
          {/* Mobile Topbar */}
          <div className="lg:hidden flex items-center justify-between p-5 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
            <button onClick={() => setSidebarOpen(true)} className="p-2.5 bg-slate-900 border border-white/10 rounded-xl"><Menu size={20} /></button>
            <span className="font-black text-sky-400 tracking-tighter uppercase text-sm">admin Approval</span>
            <div className="w-10" />
          </div>

          <main className="flex-1 p-4 sm:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto space-y-10">

              {/* HEADER SECTION */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col xl:flex-row xl:items-end justify-between gap-8"
              >
                <div className="space-y-2">
                  <p className="text-sky-400 font-black uppercase tracking-[0.4em] text-[10px]">Admin Approval</p>
                  <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter text-white">
                    Booth <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Requests</span>
                  </h1>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <select
                    value={selectedExpoId}
                    onChange={(e) => setSelectedExpoId(e.target.value)}
                    className="h-14 rounded-2xl border border-white/10 bg-slate-900 px-6 font-bold text-sm outline-none focus:border-sky-500 transition-all cursor-pointer shadow-xl"
                  >
                    {expos.map((expo) => (
                      <option key={expo._id} value={expo._id}>{expo.title}</option>
                    ))}
                  </select>

                  <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                    {["pending", "approved", "rejected"].map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`px-5 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                          status === s ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20" : "text-slate-500 hover:text-slate-200"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* STATS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="Hall A Utilization" 
                  value={stats ? `${stats.halls["Hall A"].used}/15` : "0/15"} 
                  sub={`${stats?.halls["Hall A"].remaining || 15} slots left`}
                  color="bg-sky-500"
                />
                <StatCard 
                  title="Hall B Utilization" 
                  value={stats ? `${stats.halls["Hall B"].used}/15` : "0/15"} 
                  sub={`${stats?.halls["Hall B"].remaining || 15} slots left`}
                  color="bg-indigo-500"
                />
                <StatCard 
                  title="Awaiting Action" 
                  value={stats ? stats.pendingRequests : "0"} 
                  sub="Requires immediate review"
                  color="bg-amber-500"
                />
              </div>

              {/* ADMIN NOTE BOX */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="group rounded-[2.5rem] border border-white/5 bg-slate-900/30 backdrop-blur-xl p-6 md:p-8 flex flex-col lg:flex-row lg:items-center gap-6 shadow-2xl transition-all hover:border-white/10"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Info size={16} className="text-sky-400" />
                    <h3 className="font-black italic tracking-tight text-white uppercase text-sm">Decision Note</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">Add feedback that will be visible to the exhibitor.</p>
                </div>
                <input
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  placeholder="Type feedback here (e.g. Please update hall details...)"
                  className="w-full lg:w-[60%] h-14 rounded-2xl border border-white/10 bg-black/40 px-6 text-sm font-medium outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 transition-all placeholder:text-slate-700 text-sky-100"
                />
              </motion.div>

              {/* REQUESTS LIST */}
              <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                  <h2 className="text-xl font-black italic tracking-tighter text-white flex items-center gap-3">
                    <LayoutDashboard className="text-sky-500" />
                    {status.toUpperCase()} QUEUE
                  </h2>
                  <motion.button
                    whileTap={{ rotate: 180 }}
                    onClick={refreshAll}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    <RefreshCcw size={14} /> Refresh Terminal
                  </motion.button>
                </div>

                {loading ? (
                  <div className="h-64 flex items-center justify-center text-sky-500 italic font-bold animate-pulse">Synchronizing Data...</div>
                ) : requests.length === 0 ? (
                  <div className="rounded-[2.5rem] border border-dashed border-white/10 bg-slate-900/20 p-20 text-center">
                    <p className="text-slate-500 font-black italic tracking-widest uppercase text-xs">No Requests Found in this Sector</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                      {requests.map((r) => (
                        <motion.div
                          layout
                          key={r._id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          whileHover={{ y: -5 }}
                          className="group relative rounded-[2.5rem] border border-white/5 bg-slate-900/40 backdrop-blur-xl p-8 transition-all hover:border-white/10 shadow-2xl overflow-hidden"
                        >
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-2xl font-black tracking-tighter text-white group-hover:text-sky-400 transition-colors">
                                {r.boothName}
                              </h3>
                              <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mt-1">{r.company || "Unknown Entity"}</p>
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter border ${
                              r.status === "pending" ? "border-amber-500/30 text-amber-400 bg-amber-500/10" :
                              r.status === "approved" ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10" :
                              "border-rose-500/30 text-rose-400 bg-rose-500/10"
                            }`}>
                              {r.status}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Target Expo</p>
                              <p className="text-xs font-bold text-slate-200">{r.expoId?.title || "—"}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-[9px] font-black uppercase text-slate-500 tracking-widest">Hall Placement</p>
                              <p className="text-xs font-bold text-sky-400">{r.hall}</p>
                            </div>
                          </div>

                          <div className="bg-black/20 rounded-2xl p-4 border border-white/5 mb-6">
                            <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 italic">Exhibitor Intelligence:</p>
                            <p className="text-xs text-slate-300 font-medium leading-relaxed">
                              {r.description || "No project description provided."}
                            </p>
                          </div>

                          {r.adminNote && (
                            <div className="flex items-center gap-2 mb-6 px-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
                              <p className="text-xs text-sky-200 italic font-medium truncate">Note: {r.adminNote}</p>
                            </div>
                          )}

                          {r.status === "pending" && (
                            <div className="flex gap-4">
                              <button
                                onClick={() => approve(r._id)}
                                disabled={actingId === r._id}
                                className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-900/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {actingId === r._id ? "Processing..." : <><CheckCircle2 size={16} /> Authorize</>}
                              </button>
                              <button
                                onClick={() => reject(r._id)}
                                disabled={actingId === r._id}
                                className="flex-1 h-14 rounded-2xl font-black uppercase text-[11px] tracking-widest bg-slate-800 border border-white/5 text-rose-400 transition-all hover:bg-rose-500 hover:text-white active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                              >
                                {actingId === r._id ? "Processing..." : <><XCircle size={16} /> Decline</>}
                              </button>
                            </div>
                          )}

                          <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500">{r.exhibitorId?.email}</span>
                            <span className="text-[9px] font-medium text-slate-600">{new Date(r.createdAt).toLocaleDateString()}</span>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <div className="rounded-3xl bg-indigo-500/5 border border-indigo-500/10 p-6 flex items-center gap-4">
                <div className="p-3 bg-indigo-500/20 rounded-2xl text-indigo-400"><Info size={20} /></div>
                <p className="text-[11px] font-bold text-indigo-300/60 uppercase tracking-widest leading-relaxed">
                  System Protocol: Capacities are strictly locked at 15 units per hall (Hall A & B).
                </p>
              </div>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
 


























































































