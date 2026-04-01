 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { CheckCircle2, XCircle, Clock, User, Loader2, Calendar, Sparkles, Inbox } from "lucide-react";
// import ExhibitorSidebar from "./ExhibitorSidebar";

// const API = "http://localhost:5000/api";

// const ExhibitorAppointments = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const exhibitorId = user?._id;

//   useEffect(() => {
//     if (exhibitorId) fetchAppointments();
//     else setLoading(false);
//   }, [exhibitorId]);

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(`${API}/appointments/exhibitor/${exhibitorId}`);
//       setAppointments(res.data || []);
//     } catch (error) {
//       console.error("Fetch Error:", error);
//       setAppointments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       await axios.put(`${API}/appointments/${id}`, { status });
//       fetchAppointments();
//     } catch (error) {
//       console.error("Update Error:", error);
//     }
//   };

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "Approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
//       case "Rejected": return "bg-rose-500/10 text-rose-400 border-rose-500/30";
//       default: return "bg-amber-500/10 text-amber-400 border-amber-500/30";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 overflow-hidden relative">
//       {/* Background Effects */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
//         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
//       </div>

//       {/* Main Layout Grid */}
//       <div className="flex h-screen overflow-hidden">
//         {/* Sidebar Fixed Width */}
//         <div className="w-64 flex-shrink-0 hidden lg:block border-r border-slate-800/50">
//           <ExhibitorSidebar />
//         </div>

//         {/* Content Area - Ye ab centrally align karega */}
//         <main className="flex-1 overflow-y-auto px-4 py-8 md:px-12 md:py-12 flex flex-col items-center">
          
//           {/* Inner Container: Ye asli cheez hai jo center hogi */}
//           <div className="w-full max-w-[1000px] flex flex-col">
            
//             {!exhibitorId ? (
//               <div className="h-full flex items-center justify-center py-20">
//                 <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center">
//                   <XCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
//                   <h2 className="text-xl font-bold italic">Access Denied</h2>
//                 </div>
//               </div>
//             ) : (
//               <>
//                 {/* Header Section */}
//                 <motion.div 
//                   initial={{ opacity: 0, y: -20 }} 
//                   animate={{ opacity: 1, y: 0 }} 
//                   className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
//                 >
//                   <div className="flex-1">
//                     <div className="flex items-center gap-2 mb-3">
//                       <Sparkles className="h-5 w-5 text-indigo-400" />
//                       <span className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-[10px]">Management</span>
//                     </div>
//                     <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
//                       Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{user?.name || "Exhibitor"}</span>
//                     </h1>
//                     <p className="text-slate-500 mt-2 text-lg">Manage your incoming appointment requests efficiently.</p>
//                   </div>

//                   {/* Stats Badge */}
//                   <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 px-8 py-5 rounded-[2rem] flex items-center gap-10 shadow-2xl shrink-0">
//                     <div className="text-center">
//                       <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Total</p>
//                       <p className="text-3xl font-black text-white">{appointments.length}</p>
//                     </div>
//                     <div className="w-[1px] h-10 bg-slate-800" />
//                     <div className="text-center">
//                       <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Pending</p>
//                       <p className="text-3xl font-black text-amber-400">{appointments.filter(a => a.status === "Pending").length}</p>
//                     </div>
//                   </div>
//                 </motion.div>

//                 {/* List Section */}
//                 <div className="w-full space-y-5 pb-10">
//                   <AnimatePresence mode="popLayout">
//                     {loading ? (
//                       <div className="flex flex-col items-center justify-center py-20">
//                         <Loader2 className="animate-spin text-indigo-500 h-12 w-12" />
//                       </div>
//                     ) : appointments.length === 0 ? (
//                       <div className="text-center py-20 bg-slate-900/10 border-2 border-dashed border-slate-800/50 rounded-[3rem]">
//                         <Inbox className="h-12 w-12 text-slate-700 mx-auto mb-4" />
//                         <p className="text-slate-500">No appointment requests found.</p>
//                       </div>
//                     ) : (
//                       appointments.map((item, index) => (
//                         <motion.div
//                           key={item._id}
//                           initial={{ opacity: 0, x: 20 }}
//                           animate={{ opacity: 1, x: 0 }}
//                           transition={{ delay: index * 0.05 }}
//                           className="group bg-slate-900/30 hover:bg-slate-900/60 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-slate-800/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all hover:border-indigo-500/30"
//                         >
//                           <div className="flex items-center gap-6">
//                             <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 flex items-center justify-center border border-indigo-500/10 group-hover:border-indigo-500/40 transition-colors">
//                               <User className="text-indigo-400 h-8 w-8" />
//                             </div>
//                             <div>
//                               <h4 className="font-black text-xl text-white group-hover:text-indigo-300 transition-colors uppercase tracking-tight">
//                                 {item.attendee?.name || "Attendee"}
//                               </h4>
//                               <div className="flex flex-wrap items-center gap-4 mt-2">
//                                 <span className="flex items-center gap-2 bg-slate-950/50 px-4 py-1.5 rounded-full border border-slate-800 text-[11px] font-bold text-slate-400">
//                                   <Calendar className="h-3.5 w-3.5 text-indigo-400" /> {new Date(item.date).toLocaleDateString('en-GB')}
//                                 </span>
//                                 <span className="flex items-center gap-2 bg-slate-950/50 px-4 py-1.5 rounded-full border border-slate-800 text-[11px] font-bold text-slate-400">
//                                   <Clock className="h-3.5 w-3.5 text-indigo-400" /> {item.timeSlot}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="flex items-center gap-4">
//                             <span className={`px-6 py-2.5 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] ${getStatusStyles(item.status)}`}>
//                               {item.status}
//                             </span>
//                             {item.status === "Pending" && (
//                               <div className="flex gap-2">
//                                 <button onClick={() => updateStatus(item._id, "Approved")} className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
//                                   <CheckCircle2 className="h-5 w-5" />
//                                 </button>
//                                 <button onClick={() => updateStatus(item._id, "Rejected")} className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all">
//                                   <XCircle className="h-5 w-5" />
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </motion.div>
//                       ))
//                     )}
//                   </AnimatePresence>
//                 </div>
//               </>
//             )}
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ExhibitorAppointments;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Clock, User, Loader2, Calendar, Sparkles, Inbox, Menu } from "lucide-react";
import ExhibitorSidebar from "./ExhibitorSidebar";

const API = "http://localhost:5000/api";

const ExhibitorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state fix

  const user = JSON.parse(localStorage.getItem("user"));
  const exhibitorId = user?._id;

  useEffect(() => {
    if (exhibitorId) fetchAppointments();
    else setLoading(false);
  }, [exhibitorId]);

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API}/appointments/exhibitor/${exhibitorId}`);
      setAppointments(res.data || []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API}/appointments/${id}`, { status });
      fetchAppointments();
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "Rejected": return "bg-rose-500/10 text-rose-400 border-rose-500/30";
      default: return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }
  };

 return (
    <div className="min-h-screen bg-[#020617] text-slate-200 overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar Container: Desktop pe static space lega, Mobile pe hidden */}
        <aside className="hidden lg:block w-72 flex-shrink-0 border-r border-slate-800/50">
          <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </aside>

        {/* Mobile Sidebar (Fixed/Absolute) */}
        <div className="lg:hidden">
            <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto px-6 py-8 md:py-12 flex flex-col items-center">
          
          {/* Mobile Header with Functional Hamburger */}
          <div className="lg:hidden w-full flex items-center justify-between mb-8">
            <button 
              onClick={() => setIsSidebarOpen(true)} // Open Sidebar on Click
              className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-white hover:bg-slate-800 active:scale-90 transition-all z-40"
            >
              <Menu size={24} />
            </button>
             <h2 className="text-xl font-black tracking-tighter text-white">
            EVENT<span className="text-sky-400">SPHERE</span>
          </h2>
            <div className="w-10" /> 
          </div>

          {/* Inner Container: Perfectly Centered with mx-auto */}
          <div className="w-full max-w-[1100px] mx-auto flex flex-col">
            
            {!exhibitorId ? (
              <div className="h-full flex items-center justify-center py-20">
                <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl text-center">
                  <XCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
                  <h2 className="text-xl font-bold italic">Access Denied</h2>
                </div>
              </div>
            ) : (
              <>
                {/* Header Section */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                      <Sparkles className="h-5 w-5 text-indigo-400" />
                      <span className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-[10px]">Management</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                      Hello, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">{user?.name || "Exhibitor"}</span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">Manage your incoming appointment requests efficiently.</p>
                  </div>

                  {/* Stats Badge */}
                  <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/50 px-8 py-5 rounded-[2rem] flex items-center justify-center gap-10 shadow-2xl shrink-0 mx-auto md:mx-0">
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Total</p>
                      <p className="text-3xl font-black text-white">{appointments.length}</p>
                    </div>
                    <div className="w-[1px] h-10 bg-slate-800" />
                    <div className="text-center">
                      <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-1">Pending</p>
                      <p className="text-3xl font-black text-amber-400">{appointments.filter(a => a.status === "Pending").length}</p>
                    </div>
                  </div>
                </motion.div>

                {/* List Section */}
                <div className="w-full space-y-5 pb-10">
                  <AnimatePresence mode="popLayout">
                    {loading ? (
                      <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-indigo-500 h-12 w-12" />
                      </div>
                    ) : appointments.length === 0 ? (
                      <div className="text-center py-20 bg-slate-900/10 border-2 border-dashed border-slate-800/50 rounded-[3rem]">
                        <Inbox className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                        <p className="text-slate-500">No appointment requests found.</p>
                      </div>
                    ) : (
                      appointments.map((item, index) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="group bg-slate-900/30 hover:bg-slate-900/60 backdrop-blur-xl p-6 md:p-8 rounded-[2.5rem] border border-slate-800/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 transition-all hover:border-indigo-500/30"
                        >
                          <div className="flex items-center gap-6">
                            <div className="h-16 w-16 rounded-[1.5rem] bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 flex items-center justify-center border border-indigo-500/10 group-hover:border-indigo-500/40 transition-colors">
                              <User className="text-indigo-400 h-8 w-8" />
                            </div>
                            <div className="text-left">
                              <h4 className="font-black text-xl text-white group-hover:text-indigo-300 transition-colors uppercase tracking-tight">
                                {item.attendee?.name || "Attendee"}
                              </h4>
                              <div className="flex flex-wrap items-center gap-4 mt-2">
                                <span className="flex items-center gap-2 bg-slate-950/50 px-4 py-1.5 rounded-full border border-slate-800 text-[11px] font-bold text-slate-400">
                                  <Calendar className="h-3.5 w-3.5 text-indigo-400" /> {new Date(item.date).toLocaleDateString('en-GB')}
                                </span>
                                <span className="flex items-center gap-2 bg-slate-950/50 px-4 py-1.5 rounded-full border border-slate-800 text-[11px] font-bold text-slate-400">
                                  <Clock className="h-3.5 w-3.5 text-indigo-400" /> {item.timeSlot}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 ml-auto lg:ml-0">
                            <span className={`px-6 py-2.5 rounded-2xl border text-[10px] font-black uppercase tracking-[0.2em] ${getStatusStyles(item.status)}`}>
                              {item.status}
                            </span>
                            {item.status === "Pending" && (
                              <div className="flex gap-2">
                                <button onClick={() => updateStatus(item._id, "Approved")} className="p-3 bg-emerald-500/10 text-emerald-400 rounded-2xl border border-emerald-500/20 hover:bg-emerald-500 hover:text-white transition-all">
                                  <CheckCircle2 className="h-5 w-5" />
                                </button>
                                <button onClick={() => updateStatus(item._id, "Rejected")} className="p-3 bg-rose-500/10 text-rose-400 rounded-2xl border border-rose-500/20 hover:bg-rose-500 hover:text-white transition-all">
                                  <XCircle className="h-5 w-5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ExhibitorAppointments;