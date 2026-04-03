// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import AdminSidebar from "./AdminSidebar";

// // const API = "https://event-managemant-system-mern-stack.vercel.app//api";

// // const AdminFeedback = () => {
// //   const [feedbacks, setFeedbacks] = useState([]);
// //   const [responses, setResponses] = useState({});

// //   useEffect(() => {
// //     fetchFeedback();
// //   }, []);

// //   const fetchFeedback = async () => {
// //     try {
// //       const res = await axios.get(`${API}/feedback`);
// //       setFeedbacks(res.data);

// //       // ✅ preload existing responses
// //       const initialResponses = {};
// //       res.data.forEach((item) => {
// //         initialResponses[item._id] = item.adminResponse || "";
// //       });
// //       setResponses(initialResponses);

// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const updateFeedback = async (id, status) => {
// //     try {
// //       await axios.put(`${API}/feedback/${id}`, {
// //         status,
// //         adminResponse: responses[id],
// //       });

// //       fetchFeedback();
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   const handleResponseChange = (id, value) => {
// //     setResponses({ ...responses, [id]: value });
// //   };

// //   const statusColor = (status) => {
// //     if (status === "Pending") return "text-yellow-400";
// //     if (status === "In Progress") return "text-blue-400";
// //     if (status === "Resolved") return "text-green-400";
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-[#020617] text-white">
// //       <AdminSidebar />

// //       <div className="flex-1 p-8">
// //         <h1 className="text-2xl font-bold mb-6 text-cyan-400">
// //           Feedback & Support
// //         </h1>

// //         {feedbacks.map((item) => (
// //           <div
// //             key={item._id}
// //             className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-6"
// //           >
// //             {/* User Info */}
// //             <div className="flex justify-between">
// //               <div>
// //                 <p className="font-semibold">
// //                   {item.user?.name} ({item.user?.email})
// //                 </p>
// //                 <p className="text-sm text-gray-400">
// //                   {new Date(item.createdAt).toLocaleString()}
// //                 </p>
// //               </div>

// //               <span className="bg-purple-600 px-3 py-1 rounded-full text-xs">
// //                 {item.type}
// //               </span>
// //             </div>

// //             {/* Rating */}
// //             <div className="mt-2 text-yellow-400">
// //               Rating: {item.rating} ⭐
// //             </div>

// //             {/* Priority */}
// //             {item.type === "Issue" && (
// //               <div className="text-red-400 text-sm mt-1">
// //                 Priority: {item.priority}
// //               </div>
// //             )}

// //             {/* Message */}
// //             <div className="mt-3 text-slate-300">
// //               {item.message}
// //             </div>

// //             {/* Status */}
// //             <div className={`mt-3 font-semibold ${statusColor(item.status)}`}>
// //               Status: {item.status}
// //             </div>

// //             {/* Admin Response */}
// //             {item.adminResponse && (
// //               <div className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-700">
// //                 <strong className="text-blue-400">Admin Response:</strong>
// //                 <p className="mt-1">{item.adminResponse}</p>
// //               </div>
// //             )}

// //             {/* ✅ Admin Controls */}
// //             <div className="mt-4 space-y-3">
              
// //               {/* Response Box */}
// //               <textarea
// //                 value={responses[item._id] || ""}
// //                 onChange={(e) =>
// //                   handleResponseChange(item._id, e.target.value)
// //                 }
// //                 placeholder="Write admin response..."
// //                 className="w-full p-3 bg-slate-800 border border-slate-700 rounded"
// //               />

// //               {/* Status Selector */}
// //               <select
// //                 value={item.status}
// //                 onChange={(e) =>
// //                   updateFeedback(item._id, e.target.value)
// //                 }
// //                 className="p-2 bg-slate-800 border border-slate-700 rounded"
// //               >
// //                 <option value="Pending">Pending</option>
// //                 <option value="In Progress">In Progress</option>
// //                 <option value="Resolved">Resolved</option>
// //               </select>

// //               <button
// //                 onClick={() =>
// //                   updateFeedback(item._id, item.status)
// //                 }
// //                 className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
// //               >
// //                 Save Changes
// //               </button>

// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminFeedback;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   User, Mail, Calendar, Star, ShieldAlert, 
//   Send, Sparkles, MessageSquare, Clock 
// } from "lucide-react";
// import AdminSidebar from "./AdminSidebar";

// const API = "https://event-managemant-system-mern-stack.vercel.app//api";

// const AdminFeedback = () => {
//   const [feedbacks, setFeedbacks] = useState([]);
//   const [responses, setResponses] = useState({});

//   useEffect(() => {
//     fetchFeedback();
//   }, []);

//   const fetchFeedback = async () => {
//     try {
//       const res = await axios.get(`${API}/feedback`);
//       setFeedbacks(res.data);
//       const initialResponses = {};
//       res.data.forEach((item) => {
//         initialResponses[item._id] = item.adminResponse || "";
//       });
//       setResponses(initialResponses);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const updateFeedback = async (id, status) => {
//     try {
//       await axios.put(`${API}/feedback/${id}`, {
//         status,
//         adminResponse: responses[id],
//       });
//       alert("Changes saved successfully! ✨");
//       fetchFeedback();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleResponseChange = (id, value) => {
//     setResponses({ ...responses, [id]: value });
//   };

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "Pending": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
//       case "In Progress": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
//       case "Resolved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
//       default: return "bg-slate-500/10 text-slate-400 border-slate-500/30";
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-white">
//       <AdminSidebar />

//       <div className="flex-1 p-8">
//         {/* Header Section */}
//         <div className="mb-10">
//           <div className="flex items-center gap-2 mb-2">
//             <Sparkles className="h-5 w-5 text-cyan-400" />
//             <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase">Management</span>
//           </div>
//           <h1 className="text-4xl font-black tracking-tight text-white">
//             Feedback <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">& Support</span>
//           </h1>
//           <p className="text-slate-400 mt-2">Review user experiences and resolve technical issues.</p>
//         </div>

//         <div className="grid gap-6">
//           <AnimatePresence>
//             {feedbacks.map((item, index) => (
//               <motion.div
//                 key={item._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-8 rounded-[2rem] hover:border-slate-700 transition-all shadow-xl"
//               >
//                 {/* Top Row: User Profile & Type Badge */}
//                 <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
//                   <div className="flex items-center gap-4">
//                     <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700">
//                       <User className="text-cyan-400 h-6 w-6" />
//                     </div>
//                     <div>
//                       <h3 className="font-bold text-lg text-white leading-tight">{item.user?.name}</h3>
//                       <div className="flex flex-wrap items-center gap-4 mt-1 text-slate-500 text-xs">
//                          <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {item.user?.email}</span>
//                          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(item.createdAt).toLocaleDateString()}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex gap-2">
//                     <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
//                       {item.type}
//                     </span>
//                     {item.type === "Issue" && (
//                       <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center gap-1 ${item.priority === 'High' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>
//                         <ShieldAlert className="h-3 w-3" /> {item.priority}
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {/* Rating & Message */}
//                 <div className="mb-6 space-y-3">
//                   <div className="flex gap-1">
//                     {[...Array(5)].map((_, i) => (
//                       <Star key={i} className={`h-4 w-4 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700"}`} />
//                     ))}
//                   </div>
//                   <div className="relative p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50">
//                     <MessageSquare className="absolute -top-3 -left-3 h-8 w-8 text-slate-800/50" />
//                     <p className="text-slate-300 leading-relaxed italic">"{item.message}"</p>
//                   </div>
//                 </div>

//                 {/* Admin Response Display (If exists) */}
//                 {item.adminResponse && (
//                   <div className="mb-6 p-4 bg-cyan-500/5 border-l-4 border-cyan-500 rounded-r-xl">
//                     <div className="flex items-center gap-2 mb-1">
//                       <Clock className="h-3 w-3 text-cyan-400" />
//                       <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">Previous Response</span>
//                     </div>
//                     <p className="text-sm text-slate-300">{item.adminResponse}</p>
//                   </div>
//                 )}

//                 {/* Admin Actions Area */}
//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end pt-4 border-t border-slate-800/50">
//                   <div className="lg:col-span-8">
//                     <label className="text-[10px] uppercase font-bold text-slate-500 ml-2 mb-2 block">Resolution Message</label>
//                     <textarea
//                       value={responses[item._id] || ""}
//                       onChange={(e) => handleResponseChange(item._id, e.target.value)}
//                       placeholder="Write your response to the user..."
//                       className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-cyan-500 outline-none transition-all resize-none text-sm"
//                       rows="2"
//                     />
//                   </div>

//              <div className="lg:col-span-3">
//   <label className="text-[10px] uppercase font-bold text-slate-500 ml-2 mb-2 block tracking-widest">
//     Update Status
//   </label>
//   <select
//     value={item.status}
//     onChange={(e) => updateFeedback(item._id, e.target.value)}
//     className={`w-full p-4 rounded-2xl border font-bold text-xs outline-none transition-all cursor-pointer appearance-none ${getStatusStyles(item.status)}`}
//     style={{ backgroundImage: 'none' }} // Default arrow hatane ke liye agar zarurat ho
//   >
//     {/* Option tags ko manually dark background diya hai taake list readable rahe */}
//     <option value="Pending" className="bg-[#0f172a] text-amber-400">Pending</option>
//     <option value="In Progress" className="bg-[#0f172a] text-blue-400">In Progress</option>
//     <option value="Resolved" className="bg-[#0f172a] text-emerald-400">Resolved</option>
//   </select>
// </div>

//                   <div className="lg:col-span-1">
//                     <button
//                       onClick={() => updateFeedback(item._id, item.status)}
//                       className="w-full h-[54px] bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center group"
//                       title="Save Changes"
//                     >
//                       <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminFeedback;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Calendar, Star, ShieldAlert, 
  Send, Sparkles, MessageSquare, Clock, Menu 
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const API = "https://event-managemant-system-mern-stack.vercel.app//api";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [responses, setResponses] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile sidebar state

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await axios.get(`${API}/feedback`);
      setFeedbacks(res.data);
      const initialResponses = {};
      res.data.forEach((item) => {
        initialResponses[item._id] = item.adminResponse || "";
      });
      setResponses(initialResponses);
    } catch (error) {
      console.log(error);
    }
  };

  const updateFeedback = async (id, status) => {
    try {
      await axios.put(`${API}/feedback/${id}`, {
        status,
        adminResponse: responses[id],
      });
      alert("Changes saved successfully! ✨");
      fetchFeedback();
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponseChange = (id, value) => {
    setResponses({ ...responses, [id]: value });
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending": return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "In Progress": return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "Resolved": return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      default: return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-x-hidden">
      {/* Sidebar with mobile state logic */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        
        {/* Mobile Header - Added for Hamburger Menu */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-[#020617] border-b border-white/5 sticky top-0 z-40 w-full">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 bg-slate-800 rounded-xl border border-slate-700 active:scale-90 transition-transform"
          >
            <Menu size={20} />
          </button>
          <span className="font-black text-cyan-500 text-[10px] tracking-[0.3em] uppercase">Feedback Manager</span>
          <div className="w-10" />
        </div>

        <main className="flex-1 p-4 sm:p-8 lg:p-12 overflow-y-auto">
          {/* Header Section */}
          <div className="mb-10 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <span className="text-cyan-400 font-bold tracking-widest text-xs uppercase">Management</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white italic">
              Feedback <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">& Support</span>
            </h1>
            <p className="text-slate-400 mt-2 text-sm md:text-base">Review user experiences and resolve technical issues.</p>
          </div>

          {/* Cards Container */}
          <div className="grid gap-6">
            <AnimatePresence>
              {feedbacks.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-5 md:p-8 rounded-[2rem] hover:border-slate-700 transition-all shadow-xl"
                >
                  {/* Top Row: User Profile & Type Badge */}
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700">
                        <User className="text-cyan-400 h-6 w-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold text-lg text-white leading-tight truncate">{item.user?.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-slate-500 text-[10px] sm:text-xs">
                           <span className="flex items-center gap-1 truncate"><Mail className="h-3 w-3 shrink-0" /> {item.user?.email}</span>
                           <span className="flex items-center gap-1"><Calendar className="h-3 w-3 shrink-0" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      <span className="px-4 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-center flex-1 md:flex-none">
                        {item.type}
                      </span>
                      {item.type === "Issue" && (
                        <span className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1 flex-1 md:flex-none ${item.priority === 'High' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>
                          <ShieldAlert className="h-3 w-3" /> {item.priority}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rating & Message */}
                  <div className="mb-6 space-y-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < item.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700"}`} />
                      ))}
                    </div>
                    <div className="relative p-5 bg-slate-950/50 rounded-2xl border border-slate-800/50">
                      <MessageSquare className="absolute -top-3 -left-3 h-8 w-8 text-slate-800/50" />
                      <p className="text-slate-300 leading-relaxed italic text-sm md:text-base">"{item.message}"</p>
                    </div>
                  </div>

                  {/* Admin Response Display */}
                  {item.adminResponse && (
                    <div className="mb-6 p-4 bg-cyan-500/5 border-l-4 border-cyan-500 rounded-r-xl">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-3 w-3 text-cyan-400" />
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-tighter">Previous Response</span>
                      </div>
                      <p className="text-sm text-slate-300">{item.adminResponse}</p>
                    </div>
                  )}

                  {/* Admin Actions Area - Responsive Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end pt-4 border-t border-slate-800/50">
                    <div className="md:col-span-7 lg:col-span-8">
                      <label className="text-[10px] uppercase font-bold text-slate-500 ml-2 mb-2 block">Resolution Message</label>
                      <textarea
                        value={responses[item._id] || ""}
                        onChange={(e) => handleResponseChange(item._id, e.target.value)}
                        placeholder="Write your response to the user..."
                        className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-cyan-500 outline-none transition-all resize-none text-sm"
                        rows="2"
                      />
                    </div>

                    <div className="md:col-span-3 lg:col-span-3">
                      <label className="text-[10px] uppercase font-bold text-slate-500 ml-2 mb-2 block tracking-widest">Update Status</label>
                      <select
                        value={item.status}
                        onChange={(e) => updateFeedback(item._id, e.target.value)}
                        className={`w-full p-4 rounded-2xl border font-bold text-xs outline-none transition-all cursor-pointer appearance-none ${getStatusStyles(item.status)}`}
                      >
                        <option value="Pending" className="bg-[#0f172a] text-amber-400">Pending</option>
                        <option value="In Progress" className="bg-[#0f172a] text-blue-400">In Progress</option>
                        <option value="Resolved" className="bg-[#0f172a] text-emerald-400">Resolved</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 lg:col-span-1">
                      <button
                        onClick={() => updateFeedback(item._id, item.status)}
                        className="w-full h-[54px] bg-cyan-600 hover:bg-cyan-500 text-white rounded-2xl transition-all shadow-lg shadow-cyan-900/20 flex items-center justify-center group"
                        title="Save Changes"
                      >
                        <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminFeedback;


