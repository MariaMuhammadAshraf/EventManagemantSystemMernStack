// import React, { useEffect, useMemo, useState } from "react";
// import axios from "axios";
// import AdminSidebar from "./AdminSidebar";

// const API_BASE_URL = "https://event-managemant-system-mern-stack.vercel.app//api";

// const safe = (v) => (v === undefined || v === null ? "" : String(v));

// const AdminExhibitors = () => {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");
//   const [q, setQ] = useState("");

//   const fetchAll = async () => {
//     try {
//       setLoading(true);
//       setErr("");

//       const res = await axios.get(`${API_BASE_URL}/exhibitors`);
//       const data = Array.isArray(res.data)
//         ? res.data
//         : res.data.exhibitors || res.data.data || [];

//       setItems(data);
//     } catch (e) {
//       setErr(e.response?.data?.message || e.message || "Failed to load exhibitors");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchAll();
//   }, []);

//   // ✅ DELETE FUNCTION ADDED
//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this exhibitor?");
//     if (!confirmDelete) return;

//     try {
//       await axios.delete(`${API_BASE_URL}/exhibitors/${id}`);
//       setItems((prev) => prev.filter((item) => item._id !== id));
//     } catch (e) {
//       alert(e.response?.data?.message || "Delete failed");
//     }
//   };

//   const normalized = useMemo(() => {
//     return items.map((p) => {
//       const user = p.user || p.exhibitor || p.owner || {};
//       return {
//         _id: p._id,
//         name: p.userName || user.name || "",
//         email: p.userEmail || user.email || "",
//         companyName: p.companyName || "",
//         phone: p.phone || "",
//         website: p.website || "",
//       };
//     });
//   }, [items]);

//   const filtered = useMemo(() => {
//     const query = q.trim().toLowerCase();
//     if (!query) return normalized;

//     return normalized.filter((x) => {
//       const blob = `${x.name} ${x.email} ${x.companyName} ${x.phone} ${x.website}`.toLowerCase();
//       return blob.includes(query);
//     });
//   }, [normalized, q]);

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100">
//       <AdminSidebar />

//       <div className="min-h-screen bg-[#020617] text-slate-200 flex">
//         <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
//           <div className="max-w-6xl mx-auto">

//             <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold text-white">Exhibitors List</h1>
//                 <p className="text-slate-400 text-sm">
//                   List of registered exhibitor profiles (company details + contact).
//                 </p>
//               </div>

//               <div className="flex gap-3 items-center">
//                 <input
//                   value={q}
//                   onChange={(e) => setQ(e.target.value)}
//                   placeholder="Search name, email, company..."
//                   className="w-full md:w-[360px] bg-slate-900/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:ring-2 focus:ring-blue-500/40"
//                 />
//                 <button
//                   onClick={fetchAll}
//                   className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
//               <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
//                 <div className="text-slate-400 text-xs uppercase tracking-wider">Total Profiles</div>
//                 <div className="text-2xl font-bold text-white mt-1">{normalized.length}</div>
//               </div>
//               <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
//                 <div className="text-slate-400 text-xs uppercase tracking-wider">Showing</div>
//                 <div className="text-2xl font-bold text-white mt-1">{filtered.length}</div>
//               </div>
//               <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-4">
//                 <div className="text-slate-400 text-xs uppercase tracking-wider">Search</div>
//                 <div className="text-sm text-slate-300 mt-2 break-words">{q ? q : "—"}</div>
//               </div>
//             </div>

//             {err && (
//               <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl text-sm">
//                 {err}
//               </div>
//             )}

//             {loading ? (
//               <div className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl">
//                 Loading exhibitors...
//               </div>
//             ) : (
//               <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full text-sm">
//                     <thead className="bg-slate-900/60">
//                       <tr className="text-left text-slate-300">
//                         <th className="px-5 py-3 font-semibold">Exhibitor</th>
//                         <th className="px-5 py-3 font-semibold">Company</th>
//                         <th className="px-5 py-3 font-semibold">Phone</th>
//                         <th className="px-5 py-3 font-semibold">Website</th>
//                         <th className="px-5 py-3 font-semibold text-center">Action</th> {/* ✅ Added */}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filtered.map((x) => (
//                         <tr key={x._id} className="border-t border-slate-800 hover:bg-slate-900/40">
//                           <td className="px-5 py-4">
//                             <div className="font-semibold text-white">{safe(x.name) || "—"}</div>
//                             <div className="text-slate-400">{safe(x.email) || "—"}</div>
//                           </td>
//                           <td className="px-5 py-4">
//                             <div className="text-white">{safe(x.companyName) || "—"}</div>
//                           </td>
//                           <td className="px-5 py-4 text-slate-200">
//                             {safe(x.phone) || "—"}
//                           </td>
//                           <td className="px-5 py-4">
//                             {x.website ? (
//                               <a
//                                 href={x.website}
//                                 target="_blank"
//                                 rel="noreferrer"
//                                 className="text-blue-400 hover:underline break-all"
//                               >
//                                 {x.website}
//                               </a>
//                             ) : (
//                               <span className="text-slate-500">—</span>
//                             )}
//                           </td>

//                           {/* ✅ DELETE BUTTON SAME THEME */}
//                           <td className="px-5 py-4 text-center">
//                             <button
//                               onClick={() => handleDelete(x._id)}
//                               className="px-4 py-1.5 rounded-lg 
//                            bg-gradient-to-r from-slate-700 to-slate-800 
//                          hover:from-slate-600 hover:to-slate-700 
//                         text-white text-xs font-medium 
//                           shadow-md hover:shadow-slate-500/30 
//                           border border-slate-600/40
//                           transition-all duration-300"
//                             >
//                               Delete
//                             </button>
//                           </td>

//                         </tr>
//                       ))}

//                       {filtered.length === 0 && (
//                         <tr className="border-t border-slate-800">
//                           <td className="px-5 py-8 text-slate-400 text-center" colSpan={5}>
//                             No exhibitors found.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminExhibitors;



import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import { Menu, RefreshCcw, Search, Trash2, Globe, Phone, Mail, Building2 } from "lucide-react";

const API_BASE_URL = "https://event-managemant-system-mern-stack.vercel.app//api";

const safe = (v) => (v === undefined || v === null ? "" : String(v));

const AdminExhibitors = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await axios.get(`${API_BASE_URL}/exhibitors`);
      const data = Array.isArray(res.data) ? res.data : res.data.exhibitors || res.data.data || [];
      setItems(data);
    } catch (e) {
      setErr(e.response?.data?.message || e.message || "Failed to load exhibitors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/exhibitors/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (e) { alert(e.response?.data?.message || "Delete failed"); }
  };

  const normalized = useMemo(() => {
    return items.map((p) => {
      const user = p.user || p.exhibitor || p.owner || {};
      return {
        _id: p._id,
        name: p.userName || user.name || "",
        email: p.userEmail || user.email || "",
        companyName: p.companyName || "",
        phone: p.phone || "",
        website: p.website || "",
      };
    });
  }, [items]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return normalized;
    return normalized.filter((x) => 
      `${x.name} ${x.email} ${x.companyName} ${x.phone}`.toLowerCase().includes(query)
    );
  }, [normalized, q]);

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      {/* Sidebar - Passing state to control it */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        
        {/* Mobile Navbar */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-white/5">
          <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-800 rounded-xl border border-white/10">
            <Menu size={20} />
          </button>
          <h2 className="text-xs font-black tracking-[0.3em] text-blue-500">EXHIBITORS LIST</h2>
          <div className="w-10" />
        </div>

        <main className="p-4 sm:p-8 lg:p-12 space-y-8">
          {/* Header & Search */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-black italic tracking-tighter text-white">
                Exhibitor <span className="text-blue-500 text-shadow-glow">Sync</span>
              </h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">Administrative Control Panel</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search database..."
                  className="w-full bg-slate-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-sm outline-none focus:border-blue-500/50 focus:bg-slate-900 transition-all"
                />
              </div>
              <button onClick={fetchAll} className="h-14 px-6 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all">
                <RefreshCcw size={14} /> Refresh
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/40 border border-white/5 p-5 rounded-3xl">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Database</p>
              <p className="text-2xl font-black text-white italic">{normalized.length}</p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 p-5 rounded-3xl">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Matched</p>
              <p className="text-2xl font-black text-blue-500 italic">{filtered.length}</p>
            </div>
            <div className="hidden md:block bg-slate-900/40 border border-white/5 p-5 rounded-3xl">
              <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Status</p>
              <p className="text-xs font-bold text-emerald-500 mt-2 uppercase">● Online</p>
            </div>
          </div>

          {err && <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl text-[11px] font-black uppercase">{err}</div>}

          {/* List Section */}
          <div className="space-y-4">
            {loading ? (
              <div className="py-20 text-center font-black italic text-blue-500 animate-pulse uppercase tracking-[0.2em]">Accessing Mainframe...</div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center bg-slate-900/20 border border-dashed border-white/5 rounded-[2.5rem] text-slate-600 font-black uppercase text-[10px]">No Records Found</div>
            ) : (
              <>
                {/* DESKTOP VIEW: Table */}
                <div className="hidden md:block overflow-hidden rounded-[2.5rem] border border-white/5 bg-slate-900/30">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-950/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                        <th className="p-6">Exhibitor</th>
                        <th className="p-6">Company</th>
                        <th className="p-6">Contact</th>
                        <th className="p-6 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filtered.map((x) => (
                        <tr key={x._id} className="hover:bg-blue-500/5 transition-colors">
                          <td className="p-6">
                            <p className="font-black text-white">{x.name || "—"}</p>
                            <p className="text-xs text-slate-500">{x.email || "—"}</p>
                          </td>
                          <td className="p-6 font-bold text-slate-300">{x.companyName || "—"}</td>
                          <td className="p-6">
                            <p className="text-xs text-slate-400">{x.phone || "—"}</p>
                            {x.website && <a href={x.website} target="_blank" rel="noreferrer" className="text-[10px] text-blue-400 hover:underline">Website ↗</a>}
                          </td>
                          <td className="p-6 text-center">
                            <button onClick={() => handleDelete(x._id)} className="p-3 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* MOBILE VIEW: Cards (Fixes messy tables on small screens) */}
                <div className="md:hidden space-y-4">
                  {filtered.map((x) => (
                    <div key={x._id} className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                          <p className="font-black text-white tracking-tight">{x.name || "—"}</p>
                          <div className="flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase">
                            <Building2 size={12} /> {x.companyName || "No Company"}
                          </div>
                        </div>
                        <button onClick={() => handleDelete(x._id)} className="p-3 bg-rose-500/10 text-rose-500 rounded-xl">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <Mail size={14} className="text-blue-500" /> {x.email}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-400">
                          <Phone size={14} className="text-blue-500" /> {x.phone || "N/A"}
                        </div>
                        {x.website && (
                          <a href={x.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-xs text-blue-400">
                            <Globe size={14} /> Official Website
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        .text-shadow-glow { text-shadow: 0 0 15px rgba(59, 130, 246, 0.5); }
        * { -webkit-tap-highlight-color: transparent; }
        /* Remove any potential scrollbars from root */
        body, html { overflow-x: hidden; }
      `}</style>
    </div>
  );
};

export default AdminExhibitors;


