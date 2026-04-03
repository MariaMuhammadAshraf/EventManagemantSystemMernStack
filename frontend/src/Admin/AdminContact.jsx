// import { useEffect, useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import axios from "axios";
// import { Search, Trash2, Edit3, Save, X, MessageSquare, Mail, User } from "lucide-react"; // npm install lucide-react

// export default function AdminContact() {
//   const [data, setData] = useState([]);
//   const [edit, setEdit] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);

//   const loadData = async () => {
//     try {
//       const res = await axios.get("https://event-managemant-system-mern-stack.vercel.app//api/contact");
//       setData(res.data || []);
//     } catch (err) {
//       console.error("API ERROR:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const del = async (id) => {
//     if (!window.confirm("Delete this message permanently?")) return;
//     await axios.delete(`https://event-managemant-system-mern-stack.vercel.app//api/contact/${id}`);
//     loadData();
//   };

//   const update = async () => {
//     const { _id, name, email, message } = edit;
//     await axios.put(`https://event-managemant-system-mern-stack.vercel.app//api/contact/${_id}`, {
//       name,
//       email,
//       message,
//     });
//     setEdit(null);
//     loadData();
//   };

//   const filteredData = data.filter((item) =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     item.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans">
//       <AdminSidebar />

//       <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
//         {/* HEADER SECTION */}
//         <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
//           <div>
//             <div className="flex items-center gap-2 mb-2">
//               <MessageSquare className="text-sky-400" size={20} />
//               <p className="text-sky-400 font-bold uppercase tracking-widest text-[10px]">Communication Center</p>
//             </div>
//             <h1 className="text-4xl font-black text-white tracking-tight text-white">Contact Messages</h1>
//             <p className="text-slate-400 mt-1">Review and manage user inquiries.</p>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="relative group">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search by name or email..."
//                 className="bg-slate-900/50 border border-slate-800 text-slate-200 text-sm rounded-xl focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 block w-full sm:w-80 pl-10 p-3 outline-none transition-all"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <div className="hidden sm:block px-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-center">
//               <p className="text-[10px] text-slate-500 uppercase font-bold leading-none mb-1">Total</p>
//               <p className="text-lg font-black text-white leading-none">{filteredData.length}</p>
//             </div>
//           </div>
//         </header>

//         {/* CONTENT AREA */}
//         <div className="bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-800 shadow-2xl overflow-hidden">
//           {loading ? (
//             <div className="p-20 text-center animate-pulse text-slate-500 font-bold tracking-widest">LOADING MESSAGES...</div>
//           ) : filteredData.length === 0 ? (
//             <div className="p-20 text-center">
//               <div className="inline-flex p-4 rounded-full bg-slate-800/50 text-slate-600 mb-4">
//                 <Search size={32} />
//               </div>
//               <p className="text-slate-400 font-medium text-lg">No matching records found.</p>
//               <button onClick={() => setSearchTerm("")} className="mt-2 text-sky-400 hover:text-sky-300 font-bold text-sm uppercase tracking-tighter transition-colors">Clear filters</button>
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left">
//                 <thead>
//                   <tr className="bg-slate-900/80 border-b border-slate-800">
//                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Sender Info</th>
//                     <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Message Content</th>
//                     <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-800/50">
//                   {filteredData.map((c) => (
//                     <tr key={c._id} className={`group transition-all ${edit?._id === c._id ? "bg-sky-500/5" : "hover:bg-white/[0.02]"}`}>
                      
//                       {/* SENDER INFO */}
//                       <td className="px-8 py-6 align-top">
//                         {edit?._id === c._id ? (
//                           <div className="space-y-3">
//                             <input
//                               className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-sky-500 outline-none"
//                               value={edit.name}
//                               onChange={(e) => setEdit({ ...edit, name: e.target.value })}
//                             />
//                             <input
//                               className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-sky-500 outline-none"
//                               value={edit.email}
//                               onChange={(e) => setEdit({ ...edit, email: e.target.value })}
//                             />
//                           </div>
//                         ) : (
//                           <div className="flex flex-col">
//                             <span className="text-white font-bold flex items-center gap-2">
//                               <User size={14} className="text-slate-500" /> {c.name}
//                             </span>
//                             <span className="text-sky-400/80 text-xs font-medium flex items-center gap-2 mt-1">
//                               <Mail size={12} /> {c.email}
//                             </span>
//                           </div>
//                         )}
//                       </td>

//                       {/* MESSAGE */}
//                       <td className="px-8 py-6 align-top">
//                         {edit?._id === c._id ? (
//                           <textarea
//                             rows={4}
//                             className="w-full bg-black/40 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-sky-500 outline-none resize-none"
//                             value={edit.message}
//                             onChange={(e) => setEdit({ ...edit, message: e.target.value })}
//                           />
//                         ) : (
//                           <p className="text-slate-400 text-sm leading-relaxed max-w-xl italic">
//                             "{c.message}"
//                           </p>
//                         )}
//                       </td>

//                       {/* ACTIONS */}
//                       <td className="px-8 py-6 align-top text-right">
//                         {edit?._id === c._id ? (
//                           <div className="flex justify-end gap-2">
//                             <button onClick={update} className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all shadow-lg shadow-emerald-900/20">
//                               <Save size={18} />
//                             </button>
//                             <button onClick={() => setEdit(null)} className="p-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all">
//                               <X size={18} />
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button 
//                               onClick={() => setEdit(c)}
//                               className="p-2.5 rounded-xl border border-sky-500/20 text-sky-400 hover:bg-sky-500 hover:text-white transition-all"
//                               title="Edit Message"
//                             >
//                               <Edit3 size={16} />
//                             </button>
//                             <button 
//                               onClick={() => del(c._id)}
//                               className="p-2.5 rounded-xl border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
//                               title="Delete Message"
//                             >
//                               <Trash2 size={16} />
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

 import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { 
  Search, Trash2, Edit3, Save, X, MessageSquare, 
  Mail, User, Menu 
} from "lucide-react";

export default function AdminContact() {
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const loadData = async () => {
    try {
      const res = await axios.get("https://event-managemant-system-mern-stack.vercel.app//api/contact");
      setData(res.data || []);
    } catch (err) {
      console.error("API ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const del = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    await axios.delete(`https://event-managemant-system-mern-stack.vercel.app//api/contact/${id}`);
    loadData();
  };

  const update = async () => {
    const { _id, name, email, message } = edit;
    await axios.put(`https://event-managemant-system-mern-stack.vercel.app//api/contact/${_id}`, { name, email, message });
    setEdit(null);
    loadData();
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] text-sky-400">
      <div className="animate-pulse font-bold tracking-widest uppercase">Loading Messages...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#020617] border-b border-white/5 sticky top-0 z-40 w-full">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 bg-slate-800 rounded-xl border border-slate-700 active:scale-90 transition-transform"
          >
            <Menu size={20} />
          </button>
          <span className="font-black text-sky-500 text-[10px] tracking-[0.3em] uppercase">Contact Manager</span>
          <div className="w-10" />
        </div>

        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 lg:py-12 overflow-y-auto w-full">
          
          <header className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 w-full text-center md:text-left">
            <div className="w-full md:w-auto">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <MessageSquare className="text-sky-400" size={18} />
                <p className="text-sky-400 font-bold uppercase tracking-widest text-[10px]">Communication Center</p>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight italic">
                Contact <span className="text-sky-500">Messages</span>
              </h1>
            </div>

            {/* Responsive Search Input & Total Box */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <div className="relative group w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-black/40 border border-slate-700 rounded-xl px-10 py-3 text-white focus:outline-none focus:border-sky-500 transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Total Messages Count Box - Added Back */}
              <div className="flex items-center justify-between bg-slate-900/50 border border-white/5 rounded-xl px-5 py-3 w-full sm:w-auto min-w-[100px]">
                <p className="text-[10px] text-slate-500 uppercase font-bold mr-4">Total</p>
                <p className="text-lg font-black text-white">{filteredData.length}</p>
              </div>
            </div>
          </header>

          <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-slate-900/50 border-b border-white/5">
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Sender</th>
                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Message</th>
                    <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-500 italic">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredData.map((c) => (
                    <tr key={c._id} className="flex flex-col md:table-row hover:bg-white/[0.02] transition-colors p-6 md:p-0">
                      
                      <td className="px-0 md:px-8 py-2 md:py-6">
                        {edit?._id === c._id ? (
                          <div className="space-y-2 w-full">
                            <input className="w-full bg-black/60 border border-slate-700 rounded px-2 py-2 text-sm text-white" value={edit.name} onChange={(e)=>setEdit({...edit, name:e.target.value})} />
                            <input className="w-full bg-black/60 border border-slate-700 rounded px-2 py-2 text-sm text-sky-400" value={edit.email} onChange={(e)=>setEdit({...edit, email:e.target.value})} />
                          </div>
                        ) : (
                          <div className="flex flex-col">
                            <span className="text-white font-bold flex items-center gap-2 text-base md:text-sm"><User size={14} className="text-slate-500"/>{c.name}</span>
                            <span className="text-sky-400 text-xs mt-1 truncate">{c.email}</span>
                          </div>
                        )}
                      </td>

                      <td className="px-0 md:px-8 py-4 md:py-6">
                         <p className="md:hidden text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Message:</p>
                        {edit?._id === c._id ? (
                          <textarea className="w-full bg-black/60 border border-slate-700 rounded px-2 py-2 text-sm text-white resize-none" rows={3} value={edit.message} onChange={(e)=>setEdit({...edit, message:e.target.value})} />
                        ) : (
                          <p className="text-slate-400 text-sm italic leading-relaxed">"{c.message}"</p>
                        )}
                      </td>

                      <td className="px-0 md:px-8 py-2 md:py-6 md:text-right">
                        <div className="flex md:justify-end gap-3 mt-2 md:mt-0">
                          {edit?._id === c._id ? (
                            <>
                              <button onClick={update} className="flex-1 md:flex-none flex justify-center items-center p-3 bg-emerald-600 rounded-xl text-white"><Save size={18}/></button>
                              <button onClick={() => setEdit(null)} className="flex-1 md:flex-none flex justify-center items-center p-3 bg-slate-700 rounded-xl text-white"><X size={18}/></button>
                            </>
                          ) : (
                            <>
                              <button onClick={() => setEdit(c)} className="flex-1 md:flex-none flex justify-center items-center p-3 text-sky-400 border border-sky-500/20 rounded-xl hover:bg-sky-500 hover:text-white transition-all"><Edit3 size={18}/></button>
                              <button onClick={() => del(c._id)} className="flex-1 md:flex-none flex justify-center items-center p-3 text-rose-400 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all"><Trash2 size={18}/></button>
                            </>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}