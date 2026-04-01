



// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { Send, MessageSquare, ChevronDown, Sparkles, Building2, Clock, ShieldCheck, Zap } from "lucide-react";
// import AttendeeSidebar from "./AttendeeSidebar";

// const API = "http://localhost:5000";

// function AttendeeMessages() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const convoId = useMemo(() => {
//     const sp = new URLSearchParams(location.search);
//     return sp.get("convoId") || "";
//   }, [location.search]);

//   const [me, setMe] = useState(null);
//   const [exhibitors, setExhibitors] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const bottomRef = useRef(null);

//   useEffect(() => {
//     const raw = localStorage.getItem("userInfo") || localStorage.getItem("user");
//     if (raw) {
//       try {
//         const parsed = JSON.parse(raw);
//         const userObj = parsed?.user || parsed;
//         setMe(userObj);
//       } catch (e) { console.error("User parse error"); }
//     }
//     fetchExhibitors();
//   }, []);

//   const fetchExhibitors = async () => {
//     try {
//       const res = await fetch(`${API}/api/users/exhibitors`);
//       const data = await res.json();
//       if (res.ok) setExhibitors(data);
//     } catch (e) { console.error("Exhibitor fetch error"); }
//   };

//   const loadChatContent = async (showLoading = true) => {
//     if (!me?._id || !convoId) return;
//     if (showLoading) setLoading(true);

//     try {
//       const headers = { "x-user-id": me._id };
//       const msgRes = await fetch(`${API}/api/chat/conversations/${convoId}/messages`, { headers });
//       const msgData = await msgRes.json();

//       if (msgRes.ok) {
//         setMessages(Array.isArray(msgData) ? msgData : []);
//         if (showLoading) {
//           setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
//         }
//       }
//     } catch (e) {
//       console.error("Sync error:", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (me?._id && convoId) {
//       loadChatContent(true);
//       const interval = setInterval(() => loadChatContent(false), 4000);
//       return () => clearInterval(interval);
//     }
//   }, [me?._id, convoId]);

//   const handleSend = async () => {
//     if (!text.trim() || !convoId || !me?._id) return;
//     try {
//       const res = await fetch(`${API}/api/chat/messages`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "x-user-id": me._id },
//         body: JSON.stringify({ conversationId: convoId, text: text.trim() }),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessages(prev => [...prev, data]);
//         setText("");
//         setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
//       }
//     } catch (e) { console.error("Message not sent"); }
//   };

//   const handleExhibitorChange = async (exId) => {
//     if (!exId || !me?._id) return;
//     try {
//       const res = await fetch(`${API}/api/chat/conversations`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "x-user-id": me._id },
//         body: JSON.stringify({ otherUserId: exId }),
//       });
//       const data = await res.json();
//       if (res.ok) navigate(`/attendee/messages?convoId=${data._id}`);
//     } catch (e) { console.error("Chat init failed"); }
//   };

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden">
      
//       {/* Sidebar - Fixed for Desktop */}
//       <div className="hidden md:flex flex-none w-64 h-full border-r border-white/5 bg-slate-950/50 backdrop-blur-md">
//         <AttendeeSidebar />
//       </div>

//       <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        
//         {/* Cinematic Header Background */}
//         <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-sky-500/5 to-transparent pointer-events-none" />

//         {/* --- HEADER --- */}
//         <header className="flex flex-col md:flex-row justify-between items-start md:items-center px-8 py-8 gap-4 z-10">
//           <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
//             <div className="flex items-center gap-2 mb-1">
//               <Sparkles className="h-4 w-4 text-sky-400" />
//               <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Direct Connect</span>
//             </div>
//             <h1 className="text-4xl font-black tracking-tighter">Messages</h1>
//           </motion.div>
          
//           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group w-full md:w-80">
//             <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
//             <select
//               onChange={(e) => handleExhibitorChange(e.target.value)}
//               className="w-full bg-slate-900/40 border border-white/10 pl-12 pr-10 py-4 rounded-2xl text-sm outline-none focus:border-sky-500/50 backdrop-blur-md transition-all appearance-none cursor-pointer hover:bg-slate-900/60"
//             >
//               <option value="">Choose an Exhibitor...</option>
//               {exhibitors.map(ex => (
//                 <option key={ex._id} value={ex._id} className="bg-slate-900 text-white">
//                   {ex.company || ex.name}
//                 </option>
//               ))}
//             </select>
//             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
//           </motion.div>
//         </header>

//         {/* --- CHAT MAIN AREA --- */}
//         <div className="flex-1 px-8 pb-8 flex flex-col overflow-hidden">
//           <div className="flex-1 bg-white/[0.02] border border-white/5 backdrop-blur-2xl rounded-[3rem] overflow-hidden flex flex-col shadow-inner">
            
//             {/* Chat Feed */}
//             <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar scroll-smooth">
//               {!convoId ? (
//                 <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
//                   <div className="h-24 w-24 rounded-full bg-slate-950/50 border border-white/5 flex items-center justify-center mb-6">
//                     <MessageSquare size={40} className="text-sky-500" />
//                   </div>
//                   <h3 className="text-xl font-bold mb-2">No Active Discussion</h3>
//                   <p className="max-w-xs text-sm">Select an exhibitor from the menu above to start a secure 1-on-1 chat session.</p>
//                 </div>
//               ) : (
//                 <AnimatePresence>
//                   {messages.map((m, idx) => {
//                     const isMine = String(m.senderId?._id || m.senderId) === String(me?._id);
//                     return (
//                       <motion.div 
//                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         key={m._id} 
//                         className={`flex ${isMine ? "justify-end" : "justify-start"} items-end gap-3`}
//                       >
//                         {!isMine && (
//                            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/5 flex items-center justify-center text-[10px] font-black text-sky-400 shadow-xl">
//                              EX
//                            </div>
//                         )}
//                         <div className={`group relative max-w-[70%] p-5 rounded-[2rem] shadow-2xl transition-all ${
//                           isMine 
//                           ? "bg-gradient-to-br from-sky-500 to-blue-700 text-white rounded-br-none" 
//                           : "bg-white/[0.05] border border-white/10 text-slate-100 rounded-bl-none"
//                         }`}>
//                           <p className="text-sm md:text-[15px] font-medium leading-relaxed">{m.text}</p>
//                           <div className={`flex items-center gap-1.5 text-[8px] mt-2 font-black uppercase tracking-widest opacity-40 ${isMine ? "justify-end" : "justify-start"}`}>
//                             <Clock className="h-2.5 w-2.5" />
//                             {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                           </div>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </AnimatePresence>
//               )}
//               <div ref={bottomRef} />
//             </div>

//             {/* --- INPUT AREA --- */}
//             <div className="p-8 bg-slate-950/40 border-t border-white/5">
//               <div className="max-w-5xl mx-auto flex items-center gap-4">
//                 <div className="relative flex-1">
//                   <div className="absolute left-4 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-sky-500 animate-pulse" />
//                   <input
//                     value={text}
//                     onChange={e => setText(e.target.value)}
//                     onKeyDown={e => e.key === 'Enter' && handleSend()}
//                     placeholder={convoId ? "Write your inquiry here..." : "Select an exhibitor to chat"}
//                     className="w-full bg-slate-900/60 border border-white/10 rounded-[2rem] pl-10 pr-6 py-5 outline-none focus:border-sky-500/40 focus:ring-4 focus:ring-sky-500/5 transition-all text-[15px] font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-inner"
//                     disabled={!convoId}
//                   />
//                 </div>
                
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={handleSend}
//                   disabled={!text.trim() || !convoId}
//                   className="bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-sky-500/20 disabled:from-slate-800 disabled:to-slate-800 text-white h-[60px] px-10 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center gap-3 group"
//                 >
//                   Send
//                   <Zap className="h-4 w-4 fill-white group-hover:scale-125 transition-transform" />
//                 </motion.button>
//               </div>
              
//               <div className="flex justify-center gap-6 mt-4">
//                 <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500 uppercase tracking-widest">
//                   <ShieldCheck size={12} className="text-emerald-500" /> End-to-end Encrypted
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default AttendeeMessages;



import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageSquare, ChevronDown, Sparkles, Building2, Clock, ShieldCheck, Zap, Menu } from "lucide-react";
import AttendeeSidebar from "./AttendeeSidebar";

const API = "http://localhost:5000";

function AttendeeMessages() {
  const location = useLocation();
  const navigate = useNavigate();

  const convoId = useMemo(() => {
    const sp = new URLSearchParams(location.search);
    return sp.get("convoId") || "";
  }, [location.search]);

  const [me, setMe] = useState(null);
  const [exhibitors, setExhibitors] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    const raw = localStorage.getItem("userInfo") || localStorage.getItem("user");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        const userObj = parsed?.user || parsed;
        setMe(userObj);
      } catch (e) { console.error("User parse error"); }
    }
    fetchExhibitors();
  }, []);

  const fetchExhibitors = async () => {
    try {
      const res = await fetch(`${API}/api/users/exhibitors`);
      const data = await res.json();
      if (res.ok) setExhibitors(data);
    } catch (e) { console.error("Exhibitor fetch error"); }
  };

  const loadChatContent = async (showLoading = true) => {
    if (!me?._id || !convoId) return;
    if (showLoading) setLoading(true);

    try {
      const headers = { "x-user-id": me._id };
      const msgRes = await fetch(`${API}/api/chat/conversations/${convoId}/messages`, { headers });
      const msgData = await msgRes.json();

      if (msgRes.ok) {
        setMessages(Array.isArray(msgData) ? msgData : []);
        if (showLoading) {
          setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
        }
      }
    } catch (e) {
      console.error("Sync error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (me?._id && convoId) {
      loadChatContent(true);
      const interval = setInterval(() => loadChatContent(false), 4000);
      return () => clearInterval(interval);
    }
  }, [me?._id, convoId]);

  const handleSend = async () => {
    if (!text.trim() || !convoId || !me?._id) return;
    try {
      const res = await fetch(`${API}/api/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": me._id },
        body: JSON.stringify({ conversationId: convoId, text: text.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(prev => [...prev, data]);
        setText("");
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
      }
    } catch (e) { console.error("Message not sent"); }
  };

  const handleExhibitorChange = async (exId) => {
    if (!exId || !me?._id) return;
    try {
      const res = await fetch(`${API}/api/chat/conversations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-user-id": me._id },
        body: JSON.stringify({ otherUserId: exId }),
      });
      const data = await res.json();
      if (res.ok) navigate(`/attendee/messages?convoId=${data._id}`);
    } catch (e) { console.error("Chat init failed"); }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden font-sans">
      
      <AttendeeSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <main className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300 relative overflow-hidden">
        
        {/* MOBILE HEADER */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617]/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-white shadow-xl active:scale-95 transition-all"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xl font-black tracking-tighter text-white uppercase">
              Event<span className="text-sky-500">Sphere</span>
            </h2>
            <div className="w-10" /> 
        </div>

        {/* Cinematic Header Background */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-500/10 to-transparent pointer-events-none" />

        <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 min-h-0 relative z-10">
          
          {/* ✅ UPDATED TOP HEADING (Consistent with other pages) */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                 <div className="flex items-center gap-3 mb-2">
            <div className="h-px w-10 bg-sky-500/50"></div>
            <span className="text-sky-400 font-bold tracking-[0.3em] text-[10px] uppercase">Live Communication</span>
          </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
  Direct
  <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
    Messages
  </span>
</h1>
                 <p className="text-slate-400 text-xs md:text-sm font-medium mt-1 tracking-wide">
                      Chatting with <span className="text-sky-400 font-bold">Exhibitors</span> & Brand Representatives
                         </p>
            </motion.div>

            {/* Selector moved to top right like other pages */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative group w-full md:w-80">
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 group-focus-within:text-sky-400 transition-colors" />
              <select
                onChange={(e) => handleExhibitorChange(e.target.value)}
                className="w-full bg-slate-900/40 border border-white/10 pl-12 pr-10 py-4 rounded-2xl text-sm outline-none focus:border-sky-500/50 backdrop-blur-md transition-all appearance-none cursor-pointer hover:bg-slate-900/60"
              >
                <option value="">Connect with Exhibitor...</option>
                {exhibitors.map(ex => (
                  <option key={ex._id} value={ex._id} className="bg-slate-900 text-white">
                    {ex.company || ex.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500 pointer-events-none" />
            </motion.div>
          </div>

          {/* --- CHAT MAIN AREA --- */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl relative">
              
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-5 md:p-10 space-y-8 custom-scrollbar scroll-smooth min-h-0">
                {!convoId ? (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40 px-4">
                    <div className="h-24 w-24 rounded-full bg-slate-950/50 border border-white/5 flex items-center justify-center mb-6 shadow-2xl">
                      <MessageSquare size={40} className="text-sky-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">Open a Conversation</h3>
                    <p className="max-w-xs text-sm leading-relaxed text-slate-400 font-medium">Select an exhibitor from the list above to begin your secure inquiry.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {messages.map((m) => {
                      const isMine = String(m.senderId?._id || m.senderId) === String(me?._id);
                      return (
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          key={m._id} 
                          className={`flex ${isMine ? "justify-end" : "justify-start"} items-end gap-4`}
                        >
                          {!isMine && (
                              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 border border-white/10 flex items-center justify-center text-[10px] font-black text-sky-400 shadow-2xl flex-shrink-0">
                                EX
                              </div>
                          )}
                          <div className={`group relative max-w-[85%] md:max-w-[65%] p-5 rounded-[1.8rem] shadow-2xl ${
                            isMine 
                            ? "bg-gradient-to-br from-sky-500 to-blue-700 text-white rounded-br-none" 
                            : "bg-white/[0.07] border border-white/10 text-slate-100 rounded-bl-none"
                          }`}>
                            <p className="text-[15px] font-medium leading-relaxed">{m.text}</p>
                            <div className={`flex items-center gap-1.5 text-[9px] mt-3 font-black uppercase tracking-widest opacity-40 ${isMine ? "justify-end" : "justify-start"}`}>
                              <Clock className="h-3 w-3" />
                              {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                )}
                <div ref={bottomRef} />
              </div>

              {/* --- INPUT AREA --- */}
              <div className="p-6 md:p-8 bg-slate-950/60 border-t border-white/5 shrink-0">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex-1 w-full">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 h-2.5 w-2.5 rounded-full bg-sky-500 animate-pulse shadow-[0_0_10px_rgba(14,165,233,0.8)]" />
                    <input
                      value={text}
                      onChange={e => setText(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSend()}
                      placeholder={convoId ? "Type your message..." : "Select recipient first..."}
                      className="w-full bg-slate-900/60 border border-white/10 rounded-2xl md:rounded-[2rem] pl-12 pr-6 py-5 outline-none focus:border-sky-500/40 focus:ring-4 focus:ring-sky-500/5 transition-all text-[15px] font-medium disabled:opacity-50 shadow-inner"
                      disabled={!convoId}
                    />
                  </div>
                  
                  {/* ✅ GRADIENT SEND BUTTON */}
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(14,165,233,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSend}
                    disabled={!text.trim() || !convoId}
                    className="w-full sm:w-auto bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 disabled:from-slate-800 disabled:to-slate-900 text-white h-[60px] px-10 rounded-2xl md:rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-3 group"
                  >
                    Send
                    <Zap className="h-4 w-4 fill-white text-white group-hover:scale-125 transition-transform" />
                  </motion.button>
                </div>
                
                <div className="flex justify-center gap-6 mt-5 opacity-40">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-emerald-500" /> Secure Encryption
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AttendeeMessages;