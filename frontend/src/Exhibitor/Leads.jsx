//  import React, { useEffect, useState } from "react";
//  import { useNavigate } from "react-router-dom";
// import ExhibitorSidebar from "./ExhibitorSidebar";

// function Leads() {
//   const navigate = useNavigate();
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchLeads = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user) return;

//         const res = await fetch(
//           `https://event-managemant-system-mern-stack.vercel.app//api/leads/exhibitor/${user._id}`
//         );
//         const data = await res.json();
//         setLeads(Array.isArray(data) ? data : []);
//       } catch (err) {
//         console.error("Error fetching leads:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLeads();
//   }, []);

//   return (
//     <div className="min-h-screen flex bg-[#0f172a] text-slate-200 font-sans">
//       {/* Sidebar */}
//       <ExhibitorSidebar />

//       {/* MAIN CONTENT */}
//       <main className="flex-1 p-6 md:p-12 overflow-y-auto">
//         <div className="max-w-6xl mx-auto">
          
//           {/* Header Section */}
//           <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
//             <div>
//               <h1 className="text-4xl font-black text-white tracking-tight">
//                 Potential <span className="text-sky-400">Leads</span>
//               </h1>
//               <p className="text-slate-400 mt-2 text-lg">
//                 High-intent attendees who engaged with your booth.
//               </p>
//             </div>
            
//             {/* Stats Badge */}
//             <div className="bg-sky-500/10 border border-sky-500/20 px-6 py-3 rounded-2xl flex items-center gap-4">
//               <div className="text-sm text-sky-300 font-medium uppercase tracking-wider">Total Leads</div>
//               <div className="text-3xl font-bold text-white">{leads.length}</div>
//             </div>
//           </div>

//           {/* LOADING STATE */}
//           {loading ? (
//             <div className="flex justify-center py-20">
//               <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
//             </div>
//           ) : leads.length === 0 ? (
//             /* EMPTY STATE */
//             <div className="flex flex-col items-center justify-center py-24 bg-white/[0.02] border border-dashed border-white/10 rounded-[2.5rem]">
//               <div className="w-20 h-20 bg-slate-800 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
//                 <svg className="w-10 h-10 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-bold text-white">No Leads Captured</h3>
//               <p className="text-slate-500 mt-2 max-w-xs text-center">
//                 When attendees express interest in your profile, their details will appear here instantly.
//               </p>
//             </div>
//           ) : (
//             /* LEADS GRID */
//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {leads.map((lead) => (
//                 <div
//                   key={lead._id}
//                   className="group relative overflow-hidden rounded-[2rem] p-8 bg-white/[0.03] border border-white/5 hover:border-sky-500/40 hover:bg-white/[0.05] transition-all duration-500 shadow-2xl"
//                 >
//                   {/* Subtle Background Glow */}
//                   <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/10 blur-3xl rounded-full group-hover:bg-sky-500/20 transition-colors" />

//                   <div className="relative flex flex-col h-full">
//                     {/* Header: Initial & Date */}
//                     <div className="flex justify-between items-start mb-6">
//                       <div className="w-14 h-14 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-sky-500/20">
//                         {lead.attendee?.name?.charAt(0) || "A"}
//                       </div>
//                       <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter bg-white/5 px-3 py-1 rounded-full">
//                         {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
//                       </span>
//                     </div>

//                     {/* Content */}
//                     <div className="space-y-1">
//                       <h2 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors truncate">
//                         {lead.attendee?.name || "Anonymous Attendee"}
//                       </h2>
//                       <div className="flex items-center gap-2 text-slate-400 text-sm">
//                          <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                          </svg>
//                          <span className="truncate">{lead.attendee?.email || "No email available"}</span>
//                       </div>
//                     </div>

//                     {/* Action Button */}
//                     <button 
//   onClick={() => navigate("/exhibitor/profile", { state: { attendeeId: lead.attendee?._id } })}
//   className="mt-8 w-full py-3 bg-white/5 hover:bg-sky-500 text-slate-300 hover:text-white rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-sky-600 shadow-lg"
// >
//   View Profile
//   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//   </svg>
// </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }

// export default Leads;





import React, { useEffect, useState } from "react"; // Fixed: Added missing hooks
import { useNavigate } from "react-router-dom";
import ExhibitorSidebar from "./ExhibitorSidebar";
import { Menu, ArrowRight, Users, Mail } from "lucide-react"; 
import { motion } from "framer-motion"; 

function Leads() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;

        const res = await fetch(
          `https://event-managemant-system-mern-stack.vercel.app//api/leads/exhibitor/${user._id}`
        );
        const data = await res.json();
        setLeads(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching leads:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  return (
    <div className="min-h-screen flex bg-[#020617] text-slate-200 font-sans overflow-x-hidden">
      {/* Sidebar */}
      <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300">
        
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617] border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-white"
          >
            <Menu size={22} />
          </button>
          <h2 className="text-xl font-black tracking-tighter text-white">
            EVENT<span className="text-sky-400">SPHERE</span>
          </h2>
          <div className="w-10" /> 
        </div>

        <main className="p-6 md:p-12 lg:p-14 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            
            {/* Header Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                  Potential <span className="text-sky-400">Leads</span>
                </h1>
                <p className="text-slate-400 mt-3 text-lg">
                  High-intent attendees who engaged with your booth.
                </p>
              </div>
              
              <div className="bg-sky-500/10 border border-sky-500/20 px-6 py-4 rounded-[2rem] flex items-center gap-4 w-fit">
                <div className="p-3 bg-sky-500/20 rounded-xl">
                  <Users size={20} className="text-sky-400" />
                </div>
                <div>
                   <div className="text-[10px] text-sky-300 font-bold uppercase tracking-[0.2em]">Total Leads</div>
                   <div className="text-3xl font-bold text-white leading-none">{leads.length}</div>
                </div>
              </div>
            </motion.div>

            {/* LEADS CONTENT */}
            {loading ? (
              <div className="flex justify-center py-32">
                <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
              </div>
            ) : leads.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]"
              >
                <Users size={40} className="text-slate-600 mb-4" />
                <h3 className="text-xl font-bold text-white">No Leads Captured</h3>
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } }
                }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {leads.map((lead) => (
                  <motion.div
                    key={lead._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    className="group relative overflow-hidden rounded-[2.5rem] p-8 bg-white/[0.03] border border-white/5 hover:border-sky-500/40 hover:bg-white/[0.05] transition-all duration-500 shadow-2xl"
                  >
                    <div className="relative flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black text-white">
                          {lead.attendee?.name?.charAt(0) || "A"}
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                          {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <h2 className="text-xl font-bold text-white group-hover:text-sky-400 transition-colors truncate">
                          {lead.attendee?.name || "Anonymous"}
                        </h2>
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                           <Mail size={14} />
                           <span className="truncate">{lead.attendee?.email}</span>
                        </div>
                      </div>

                      <button 
                        onClick={() => navigate("/exhibitor/profile", { state: { attendeeId: lead.attendee?._id } })}
                        className="mt-8 w-full py-4 bg-white/5 hover:bg-sky-600 text-slate-300 hover:text-white rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
                      >
                        View Profile <ArrowRight size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Leads;