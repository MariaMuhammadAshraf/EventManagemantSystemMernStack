 
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import { Calendar, Clock, User, Loader2, Send, BookmarkCheck } from "lucide-react";
// import AttendeeSidebar from "./AttendeeSidebar";

// const API = "https://event-managemant-system-mern-stack.vercel.app/api";

// const AppointmentBooking = () => {
//   const [date, setDate] = useState("");
//   const [timeSlot, setTimeSlot] = useState("");
//   const [exhibitors, setExhibitors] = useState([]);
//   const [selectedExhibitor, setSelectedExhibitor] = useState("");
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const attendeeId = user?._id;

//   useEffect(() => {
//     fetchExhibitors();
//   }, []);

//   useEffect(() => {
//     if (!attendeeId) return;
//     fetchAppointments();
//     const interval = setInterval(fetchAppointments, 10000);
//     return () => clearInterval(interval);
//   }, [attendeeId]);

//   const fetchExhibitors = async () => {
//     try {
//       const res = await axios.get(`${API}/users/exhibitors`);
//       setExhibitors(res.data);
//     } catch (error) {
//       console.error("Exhibitor fetch error:", error);
//     }
//   };

//   const fetchAppointments = async () => {
//     try {
//       const res = await axios.get(`${API}/appointments/attendee/${attendeeId}`);
//       setAppointments(res.data || []);
//     } catch (error) {
//       console.error("Appointment fetch error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!attendeeId || !selectedExhibitor || !date || !timeSlot) return;

//     try {
//       await axios.post(`${API}/appointments`, {
//         attendee: attendeeId,
//         exhibitor: selectedExhibitor,
//         date: new Date(date),
//         timeSlot,
//       });
//       setDate("");
//       setTimeSlot("");
//       setSelectedExhibitor("");
//       fetchAppointments();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "Approved": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
//       case "Rejected": return "bg-rose-500/20 text-rose-400 border-rose-500/50";
//       default: return "bg-amber-500/20 text-amber-400 border-amber-500/50";
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">
//       <AttendeeSidebar />

//       {/* Main Content Area */}
//       <main className="flex-1 lg:ml-64 min-h-screen p-6 lg:p-12 transition-all duration-300">
        
//         {/* TOP PROFESSIONAL HEADING */}
//         <motion.div 
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="mb-12 ml-2"
//         >
//           <div className="flex items-center gap-3 mb-2">
//             <div className="h-1 w-12 bg-indigo-500 rounded-full"></div>
//             <span className="text-indigo-400 font-semibold tracking-widest uppercase text-xs">Management</span>
//           </div>
//           <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
//             Appointment <span className="text-indigo-500">Booking</span>
//           </h1>
//           <p className="text-slate-400 mt-3 max-w-2xl text-lg">
//             Connect with exhibitors and schedule your sessions efficiently in one place.
//           </p>
//         </motion.div>

//         <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
//           {/* LEFT: FORM SECTION */}
//           <motion.div 
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="lg:col-span-5 w-full"
//           >
//             <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 p-8 rounded-[2.5rem] shadow-2xl ring-1 ring-white/5 relative overflow-hidden group">
//               {/* Subtle background glow */}
//               <div className="absolute -top-24 -right-24 h-48 w-48 bg-indigo-600/10 blur-[80px] group-hover:bg-indigo-600/20 transition-all"></div>
              
//               <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white">
//                 <BookmarkCheck className="text-indigo-500 h-6 w-6" />
//                 Reserve your slot
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Select Exhibitor</label>
//                   <div className="relative">
//                     <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
//                     <select
//                       value={selectedExhibitor}
//                       onChange={(e) => setSelectedExhibitor(e.target.value)}
//                       className="w-full pl-12 pr-4 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-800/60 text-white"
//                     >
//                       <option value="">Choose an Exhibitor</option>
//                       {exhibitors.map((ex) => <option key={ex._id} value={ex._id} className="bg-slate-900">{ex.name}</option>)}
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Date</label>
//                     <input
//                       type="date"
//                       value={date}
//                       onChange={(e) => setDate(e.target.value)}
//                       className="w-full p-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all [color-scheme:dark] text-white"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium text-slate-400 mb-2 ml-1">Time Slot</label>
//                     <input
//                       type="text"
//                       placeholder="e.g. 10:00 AM"
//                       value={timeSlot}
//                       onChange={(e) => setTimeSlot(e.target.value)}
//                       className="w-full p-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-600"
//                     />
//                   </div>
//                 </div>

//                 <motion.button
//                   whileHover={{ scale: 1.02, translateY: -2 }}
//                   whileTap={{ scale: 0.98 }}
//                   type="submit"
//                   className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl font-bold flex items-center justify-center gap-2 hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all shadow-lg text-white mt-4"
//                 >
//                   <Send className="h-5 w-5" /> Confirm Appointment
//                 </motion.button>
//               </form>
//             </div>
//           </motion.div>

//           {/* RIGHT: LIST SECTION */}
//           <div className="lg:col-span-7 w-full">
//             <div className="flex items-center justify-between mb-8 px-2">
//               <h3 className="text-xl font-bold flex items-center gap-3 text-white">
//                 <div className="p-2 bg-indigo-500/20 rounded-xl">
//                   <Calendar className="text-indigo-400 h-5 w-5" />
//                 </div>
//                 My Schedule
//               </h3>
//               <span className="text-xs font-medium text-slate-500 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-700/50">
//                 {appointments.length} Total Bookings
//               </span>
//             </div>

//             {loading ? (
//               <div className="flex flex-col items-center justify-center py-20 gap-4">
//                 <Loader2 className="animate-spin text-indigo-500 h-12 w-12" />
//                 <p className="text-slate-500 animate-pulse font-medium">Updating your schedule...</p>
//               </div>
//             ) : (
//               <div className="space-y-4 max-h-[650px] overflow-y-auto pr-3 custom-scrollbar">
//                 <AnimatePresence mode="popLayout">
//                   {appointments.length === 0 ? (
//                     <motion.div 
//                       initial={{ opacity: 0 }} 
//                       animate={{ opacity: 1 }} 
//                       className="text-center py-20 bg-slate-900/20 rounded-[2.5rem] border-2 border-dashed border-slate-800 text-slate-500 flex flex-col items-center"
//                     >
//                       <div className="h-16 w-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
//                         <Calendar className="h-8 w-8 text-slate-700" />
//                       </div>
//                       <p className="text-lg font-medium">No appointments scheduled yet.</p>
//                       <p className="text-sm text-slate-600 mt-1">Book your first session on the left.</p>
//                     </motion.div>
//                   ) : (
//                     appointments.map((item, index) => (
//                       <motion.div
//                         key={item._id}
//                         initial={{ opacity: 0, x: 20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         exit={{ opacity: 0, scale: 0.95 }}
//                         transition={{ delay: index * 0.05 }}
//                         className="group relative bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-800/50 flex items-center justify-between transition-all hover:shadow-xl"
//                       >
//                         <div className="flex items-center gap-5">
//                           <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:border-indigo-500/60 group-hover:scale-105 transition-all shadow-inner">
//                             <User className="h-7 w-7 text-indigo-400" />
//                           </div>
//                           <div>
//                             <h4 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
//                               {item.exhibitor?.name || "Unknown Exhibitor"}
//                             </h4>
//                             <div className="flex items-center gap-4 mt-1.5 text-sm text-slate-400 font-medium">
//                               <span className="flex items-center gap-1.5 bg-slate-800/40 px-2 py-0.5 rounded-lg border border-slate-700/30">
//                                 <Calendar className="h-3.5 w-3.5 text-indigo-400" /> 
//                                 {new Date(item.date).toLocaleDateString()}
//                               </span>
//                               <span className="flex items-center gap-1.5 bg-slate-800/40 px-2 py-0.5 rounded-lg border border-slate-700/30">
//                                 <Clock className="h-3.5 w-3.5 text-indigo-400" /> 
//                                 {item.timeSlot}
//                               </span>
//                             </div>
//                           </div>
//                         </div>

//                         <div className={`px-5 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-[0.15em] shadow-lg transition-all ${getStatusStyles(item.status)}`}>
//                           {item.status || "Pending"}
//                         </div>
//                       </motion.div>
//                     ))
//                   )}
//                 </AnimatePresence>
//               </div>
//             )}
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default AppointmentBooking;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  User, 
  Loader2, 
  Send, 
  BookmarkCheck,
  Menu // Hamburger icon add kiya
} from "lucide-react";
import AttendeeSidebar from "./AttendeeSidebar";

const API = "https://event-managemant-system-mern-stack.vercel.app/api";

const AppointmentBooking = () => {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [exhibitors, setExhibitors] = useState([]);
  const [selectedExhibitor, setSelectedExhibitor] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  // Sidebar state for mobile functionality
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const attendeeId = user?._id;

  useEffect(() => {
    fetchExhibitors();
  }, []);

  useEffect(() => {
    if (!attendeeId) return;
    fetchAppointments();
    const interval = setInterval(fetchAppointments, 10000);
    return () => clearInterval(interval);
  }, [attendeeId]);

  const fetchExhibitors = async () => {
    try {
      const res = await axios.get(`${API}/users/exhibitors`);
      setExhibitors(res.data);
    } catch (error) {
      console.error("Exhibitor fetch error:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await axios.get(`${API}/appointments/attendee/${attendeeId}`);
      setAppointments(res.data || []);
    } catch (error) {
      console.error("Appointment fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!attendeeId || !selectedExhibitor || !date || !timeSlot) return;

    try {
      await axios.post(`${API}/appointments`, {
        attendee: attendeeId,
        exhibitor: selectedExhibitor,
        date: new Date(date),
        timeSlot,
      });
      setDate("");
      setTimeSlot("");
      setSelectedExhibitor("");
      fetchAppointments();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "Approved": return "bg-emerald-500/20 text-emerald-400 border-emerald-500/50";
      case "Rejected": return "bg-rose-500/20 text-rose-400 border-rose-500/50";
      default: return "bg-amber-500/20 text-amber-400 border-amber-500/50";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden">
      {/* Sidebar with mobile state props */}
      <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 min-h-screen p-6 lg:p-12 transition-all duration-300 relative">
        
        {/* ✅ MOBILE HEADER & HAMBURGER (Only visible on mobile) */}
        <div className="lg:hidden flex items-center justify-between mb-8">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white shadow-xl active:scale-95 transition-all"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">
              Event<span className="text-sky-500">Sphere</span>
            </h2>
            <div className="w-10" /> {/* Centering spacer */}
        </div>

        {/* TOP PROFESSIONAL HEADING */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 ml-2"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-10 bg-sky-500/50"></div>
            <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Management</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black text-white tracking-tight uppercase">
            Appointment <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-500 to-sky-600">Booking</span>
          </h1>
          <p className="text-slate-400 mt-3 max-w-2xl text-lg">
            Connect with exhibitors and schedule your sessions efficiently in one place.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: FORM SECTION */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 p-8 rounded-[2.5rem] shadow-2xl ring-1 ring-white/5 relative overflow-hidden group">
              {/* Subtle background glow */}
              <div className="absolute -top-24 -right-24 h-48 w-48 bg-indigo-600/10 blur-[80px] group-hover:bg-indigo-600/20 transition-all"></div>
              
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 text-white uppercase italic tracking-tight">
                <BookmarkCheck className="text-indigo-500 h-6 w-6" />
                Reserve your slot
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2 ml-1 uppercase text-[10px] tracking-widest">Select Exhibitor</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
                    <select
                      value={selectedExhibitor}
                      onChange={(e) => setSelectedExhibitor(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer hover:bg-slate-800/60 text-white"
                    >
                      <option value="">Choose an Exhibitor</option>
                      {exhibitors.map((ex) => <option key={ex._id} value={ex._id} className="bg-slate-900">{ex.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1 uppercase text-[10px] tracking-widest">Date</label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full p-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all [color-scheme:dark] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-2 ml-1 uppercase text-[10px] tracking-widest">Time Slot</label>
                    <input
                      type="text"
                      placeholder="e.g. 10:00 AM"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full p-3.5 bg-slate-800/40 border border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-white placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, translateY: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2 hover:shadow-[0_10px_40px_rgba(79,70,229,0.4)] transition-all shadow-lg text-white mt-4"
                >
                  <Send className="h-4 w-4" /> Confirm Appointment
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* RIGHT: LIST SECTION */}
          <div className="lg:col-span-7 w-full">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-xl font-bold flex items-center gap-3 text-white uppercase italic tracking-tighter">
                <div className="p-2 bg-indigo-500/20 rounded-xl">
                  <Calendar className="text-indigo-400 h-5 w-5" />
                </div>
                My Schedule
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700/50">
                {appointments.length} Bookings
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-indigo-500 h-12 w-12" />
                <p className="text-slate-500 animate-pulse font-medium">Updating your schedule...</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[650px] overflow-y-auto pr-3 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {appointments.length === 0 ? (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="text-center py-20 bg-slate-900/20 rounded-[2.5rem] border-2 border-dashed border-slate-800 text-slate-500 flex flex-col items-center"
                    >
                      <div className="h-16 w-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-slate-700" />
                      </div>
                      <p className="text-lg font-medium italic">No appointments scheduled yet.</p>
                      <p className="text-sm text-slate-600 mt-1 uppercase tracking-widest text-[10px] font-bold">Book your first session on the left.</p>
                    </motion.div>
                  ) : (
                    appointments.map((item, index) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="group relative bg-slate-900/40 hover:bg-slate-800/60 backdrop-blur-sm p-6 rounded-[2rem] border border-slate-800/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-xl"
                      >
                        <div className="flex items-center gap-5">
                          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 group-hover:border-indigo-500/60 group-hover:scale-105 transition-all shadow-inner">
                            <User className="h-7 w-7 text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                              {item.exhibitor?.name || "Unknown Exhibitor"}
                            </h4>
                            <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-slate-400 font-medium uppercase tracking-wider">
                              <span className="flex items-center gap-1.5 bg-slate-800/40 px-2 py-0.5 rounded-lg border border-slate-700/30">
                                <Calendar className="h-3 w-3 text-indigo-400" /> 
                                {new Date(item.date).toLocaleDateString()}
                              </span>
                              <span className="flex items-center gap-1.5 bg-slate-800/40 px-2 py-0.5 rounded-lg border border-slate-700/30">
                                <Clock className="h-3 w-3 text-indigo-400" /> 
                                {item.timeSlot}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className={`px-5 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-[0.15em] shadow-lg transition-all ${getStatusStyles(item.status)}`}>
                          {item.status || "Pending"}
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};

export default AppointmentBooking;