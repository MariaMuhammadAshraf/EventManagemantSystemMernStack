// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   MessageSquare, 
//   Send, 
//   Star, 
//   AlertCircle, 
//   Lightbulb, 
//   CheckCircle2, 
//   Clock, 
//   RefreshCcw,
//   Sparkles
// } from "lucide-react";
// import AttendeeSidebar from "./AttendeeSidebar";

// const API = "http://localhost:5000/api";

// const Feedback = () => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   const [type, setType] = useState("General");
//   const [priority, setPriority] = useState("Low");
//   const [rating, setRating] = useState(5);
//   const [message, setMessage] = useState("");
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user?._id) {
//       fetchMyFeedback();
//     }
//   }, []);

//   const fetchMyFeedback = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.get(`${API}/feedback/my/${user._id}`);
//       setFeedbackList(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async () => {
//     if (!message.trim()) {
//       alert("Please write your feedback.");
//       return;
//     }

//     await axios.post(`${API}/feedback`, {
//       type,
//       rating: Number(rating),
//       message,
//       priority: type === "Issue" ? priority : "Low",
//       userId: user._id,
//     });

//     alert("Feedback submitted successfully ✅");
//     setMessage("");
//     setType("General");
//     setPriority("Low");
//     setRating(5);
//     fetchMyFeedback();
//   };

//   const getStatusStyle = (status) => {
//     if (status === "Pending") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
//     if (status === "In Progress") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
//     if (status === "Resolved") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
//     return "bg-slate-500/10 text-slate-400 border-slate-500/20";
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-white overflow-hidden relative">
//       {/* Background Glows */}
//       <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

//       <AttendeeSidebar />

//       <main className="flex-1 lg:ml-64 p-6 md:p-10 overflow-y-auto h-screen relative z-10">
//         <div className="max-w-5xl mx-auto space-y-12">
          
//           {/* Header */}
//           <motion.div 
//             initial={{ opacity: 0, y: -20 }} 
//             animate={{ opacity: 1, y: 0 }}
//             className="flex flex-col md:flex-row md:items-center justify-between gap-4"
//           >
//             <div>
//               <div className="flex items-center gap-2 mb-2">
//                 <Sparkles className="h-4 w-4 text-cyan-400" />
//                 <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px]">Help Center</span>
//               </div>
//               <h1 className="text-4xl font-black text-white tracking-tight">Feedback & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Support</span></h1>
//               <p className="text-slate-400 mt-1">We value your thoughts to make the event better.</p>
//             </div>
//             <button onClick={fetchMyFeedback} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all">
//               <RefreshCcw className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
//             </button>
//           </motion.div>

//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
//             {/* ✅ Feedback Form (4 Columns) */}
//             <motion.div 
//               initial={{ opacity: 0, x: -20 }}
//               animate={{ opacity: 1, x: 0 }}
//               className="lg:col-span-5 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl h-fit"
//             >
//               <div className="flex items-center gap-3 mb-8">
//                 <div className="p-3 bg-blue-500/10 rounded-2xl">
//                   <MessageSquare className="text-blue-400 h-6 w-6" />
//                 </div>
//                 <h2 className="text-xl font-bold">New Submission</h2>
//               </div>

//               <div className="space-y-5">
//                 <div>
//                   <label className="text-xs font-bold text-slate-500 uppercase ml-1">Feedback Type</label>
//                   <select
//                     value={type}
//                     onChange={(e) => setType(e.target.value)}
//                     className="w-full mt-1.5 p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all"
//                   >
//                     <option value="General">General Feedback</option>
//                     <option value="Suggestion">Suggestion</option>
//                     <option value="Issue">Report an Issue</option>
//                   </select>
//                 </div>

//                 {type === "Issue" && (
//                   <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
//                     <label className="text-xs font-bold text-slate-500 uppercase ml-1">Priority Level</label>
//                     <select
//                       value={priority}
//                       onChange={(e) => setPriority(e.target.value)}
//                       className="w-full mt-1.5 p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-red-500 outline-none transition-all"
//                     >
//                       <option value="Low">Low</option>
//                       <option value="Medium">Medium</option>
//                       <option value="High">High</option>
//                     </select>
//                   </motion.div>
//                 )}

//                 <div>
//                   <label className="text-xs font-bold text-slate-500 uppercase ml-1">Rating</label>
//                   <div className="flex items-center gap-2 mt-1.5">
//                     {[1, 2, 3, 4, 5].map((star) => (
//                       <Star
//                         key={star}
//                         onClick={() => setRating(star)}
//                         className={`h-8 w-8 cursor-pointer transition-all ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700 hover:text-slate-500"}`}
//                       />
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="text-xs font-bold text-slate-500 uppercase ml-1">Message</label>
//                   <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Tell us what's on your mind..."
//                     rows="5"
//                     className="w-full mt-1.5 p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all resize-none"
//                   />
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleSubmit}
//                   className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
//                 >
//                   <Send className="h-5 w-5" /> Submit Feedback
//                 </motion.button>
//               </div>
//             </motion.div>

//             {/* ✅ History Section (7 Columns) */}
//             <div className="lg:col-span-7 space-y-6">
//               <h3 className="text-xl font-bold flex items-center gap-2">
//                 <RefreshCcw className="h-5 w-5 text-purple-400" />
//                 Previous Submissions
//               </h3>

//               <div className="space-y-4">
//                 <AnimatePresence mode="popLayout">
//                   {feedbackList.length === 0 ? (
//                     <div className="p-10 border-2 border-dashed border-slate-800 rounded-[2.5rem] text-center text-slate-500">
//                       No feedback submitted yet.
//                     </div>
//                   ) : (
//                     feedbackList.map((item, idx) => (
//                       <motion.div
//                         key={item._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: idx * 0.1 }}
//                         className="bg-slate-900/30 border border-slate-800 p-6 rounded-[2rem] hover:border-slate-700 transition-all group"
//                       >
//                         <div className="flex justify-between items-start mb-4">
//                           <div className="flex items-center gap-3">
//                             <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest">
//                               {item.type}
//                             </span>
//                             <div className="flex text-yellow-500">
//                               {[...Array(item.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
//                             </div>
//                           </div>
//                           <span className={`px-4 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(item.status)}`}>
//                             {item.status}
//                           </span>
//                         </div>

//                         <p className="text-slate-300 text-sm leading-relaxed mb-4">
//                           {item.message}
//                         </p>

//                         {item.adminResponse && (
//                           <div className="mt-4 p-4 bg-slate-950/50 border border-blue-500/20 rounded-2xl relative overflow-hidden">
//                             <div className="absolute top-0 left-0 w-1 h-full bg-blue-500" />
//                             <div className="flex items-center gap-2 mb-1 text-blue-400 font-bold text-xs uppercase">
//                               <CheckCircle2 className="h-3 w-3" /> Admin Response
//                             </div>
//                             <p className="text-slate-400 text-sm italic">"{item.adminResponse}"</p>
//                           </div>
//                         )}
//                       </motion.div>
//                     ))
//                   )}
//                 </AnimatePresence>
//               </div>
//             </div>

//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Feedback;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Send, 
  Star, 
  AlertCircle, 
  Lightbulb, 
  CheckCircle2, 
  Clock, 
  RefreshCcw,
  Sparkles,
  Menu // Hamburger icon ke liye
} from "lucide-react";
import AttendeeSidebar from "./AttendeeSidebar";

const API = "http://localhost:5000/api";

const Feedback = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [type, setType] = useState("General");
  const [priority, setPriority] = useState("Low");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(false);
  // Sidebar state for mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (user?._id) {
      fetchMyFeedback();
    }
  }, []);

  const fetchMyFeedback = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/feedback/my/${user._id}`);
      setFeedbackList(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert("Please write your feedback.");
      return;
    }

    await axios.post(`${API}/feedback`, {
      type,
      rating: Number(rating),
      message,
      priority: type === "Issue" ? priority : "Low",
      userId: user._id,
    });

    alert("Feedback submitted successfully ✅");
    setMessage("");
    setType("General");
    setPriority("Low");
    setRating(5);
    fetchMyFeedback();
  };

  const getStatusStyle = (status) => {
    if (status === "Pending") return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    if (status === "In Progress") return "bg-blue-500/10 text-blue-400 border-blue-500/20";
    if (status === "Resolved") return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[30%] h-[30%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Sidebar with props */}
      <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 lg:ml-64 p-6 md:p-10 overflow-y-auto h-screen relative z-10">
        
        {/* ✅ MOBILE HEADER & HAMBURGER */}
        <div className="lg:hidden flex items-center justify-between mb-8">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white shadow-xl active:scale-95 transition-all"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">
              Event<span className="text-cyan-500">Sphere</span>
            </h2>
            <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
               <div className="h-px w-10 bg-sky-500/50"></div>
                <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-[10px]">Help Center</span>
              </div>
             <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
                Feedback & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Support</span>
              </h1>
              <p className="text-slate-400 mt-1">We value your thoughts to make the event better.</p>
            </div>
            <button onClick={fetchMyFeedback} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all shadow-xl group">
              <RefreshCcw className={`h-5 w-5 text-cyan-400 ${loading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`} />
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Feedback Form */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 bg-slate-900/40 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl h-fit"
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-500/10 rounded-2xl">
                  <MessageSquare className="text-blue-400 h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold uppercase tracking-tight italic text-blue-400">New Submission</h2>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Feedback Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full mt-1.5 p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all cursor-pointer"
                  >
                    <option value="General">General Feedback</option>
                    <option value="Suggestion">Suggestion</option>
                    <option value="Issue">Report an Issue</option>
                  </select>
                </div>

                {type === "Issue" && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">Priority Level</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      className="w-full mt-1.5 p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-red-500 outline-none transition-all cursor-pointer"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </motion.div>
                )}

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Rating</label>
                  <div className="flex items-center gap-2 mt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        onClick={() => setRating(star)}
                        className={`h-8 w-8 cursor-pointer transition-all ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-slate-700 hover:text-slate-500"}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what's on your mind..."
                    rows="5"
                    className="w-full mt-1.5 p-4 bg-slate-950 border border-slate-800 rounded-2xl focus:border-blue-500 outline-none transition-all resize-none shadow-inner"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg transition-all"
                >
                  <Send className="h-4 w-4" /> Submit Feedback
                </motion.button>
              </div>
            </motion.div>

            {/* History Section */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold flex items-center gap-2 uppercase tracking-tighter italic">
                <RefreshCcw className="h-5 w-5 text-purple-400" />
                Previous Submissions
              </h3>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {feedbackList.length === 0 ? (
                    <div className="p-10 border-2 border-dashed border-slate-800 rounded-[2.5rem] text-center text-slate-500 font-medium">
                      No feedback submitted yet. Your history will appear here.
                    </div>
                  ) : (
                    feedbackList.map((item, idx) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-slate-900/30 border border-slate-800 p-6 rounded-[2rem] hover:border-slate-700 transition-all group shadow-xl"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-slate-800 text-slate-300 rounded-lg text-[10px] font-black uppercase tracking-widest">
                              {item.type}
                            </span>
                            <div className="flex text-yellow-500">
                              {[...Array(item.rating)].map((_, i) => <Star key={i} className="h-3 w-3 fill-current" />)}
                            </div>
                          </div>
                          <span className={`px-4 py-1 rounded-full text-[10px] font-bold border ${getStatusStyle(item.status)}`}>
                            {item.status}
                          </span>
                        </div>

                        <p className="text-slate-300 text-sm leading-relaxed mb-4 font-medium">
                          {item.message}
                        </p>

                        {item.adminResponse && (
                          <div className="mt-4 p-5 bg-slate-950/80 border border-blue-500/20 rounded-2xl relative overflow-hidden shadow-inner">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
                            <div className="flex items-center gap-2 mb-2 text-blue-400 font-black text-[10px] uppercase tracking-widest">
                              <CheckCircle2 className="h-3 w-3" /> Admin Response
                            </div>
                            <p className="text-slate-400 text-sm italic font-medium leading-relaxed">"{item.adminResponse}"</p>
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default Feedback;