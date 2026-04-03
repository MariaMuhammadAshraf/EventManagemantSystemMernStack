 


// import React, { useEffect, useMemo, useRef, useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { Send, RefreshCcw, User, MessageCircle, Clock, Sparkles } from "lucide-react";
// import ExhibitorSidebar from "./ExhibitorSidebar";

// const API = "https://event-managemant-system-mern-stack.vercel.app";

// const getAuth = () => {
//   const raw = localStorage.getItem("userInfo") || localStorage.getItem("user");
//   if (!raw) return { userId: "", token: "" };
//   try {
//     const obj = JSON.parse(raw);
//     const user = obj.user || obj;
//     return {
//       userId: user?._id || "",
//       token: obj.token || obj.accessToken || ""
//     };
//   } catch { return { userId: "", token: "" }; }
// };

// function ExhibitorMessages() {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const convoId = searchParams.get("convoId") || "";

//   const [convos, setConvos] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [err, setErr] = useState("");

//   const bottomRef = useRef(null);
//   const { userId, token } = useMemo(() => getAuth(), []);

//   const fetchConversations = async () => {
//     if (!userId) return;
//     try {
//       const res = await fetch(`${API}/api/chat/conversations`, {
//         headers: { "x-user-id": userId, "Authorization": `Bearer ${token}` },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         const formattedConvos = data.map(convo => {
//           const otherUser = convo.participants?.find(p => String(p._id) !== String(userId));
//           return { ...convo, displayUser: otherUser };
//         });
//         setConvos(formattedConvos);
//       }
//     } catch (e) { console.error("Sidebar load failed"); }
//   };

//   const fetchMessages = async (id) => {
//     if (!id || !userId) return;
//     setLoading(true);
//     setErr("");
//     try {
//       const res = await fetch(`${API}/api/chat/conversations/${id}/messages`, {
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//           "Authorization": `Bearer ${token}`
//         },
//       });
//       const data = await res.json();
//       if (res.ok) {
//         setMessages(Array.isArray(data) ? data : []);
//         setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
//       } else {
//         setErr(data.message || "Failed to load chat history");
//       }
//     } catch (e) {
//       setErr("Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchConversations();
//     const interval = setInterval(fetchConversations, 10000);
//     return () => clearInterval(interval);
//   }, [userId]);

//   useEffect(() => {
//     if (convoId) fetchMessages(convoId);
//   }, [convoId]);

//   const handleReply = async () => {
//     if (!text.trim() || !convoId) return;
//     try {
//       const res = await fetch(`${API}/api/chat/messages`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "x-user-id": userId,
//           "Authorization": `Bearer ${token}`
//         },
//         body: JSON.stringify({ conversationId: convoId, text: text.trim() }),
//       });
//       if (res.ok) {
//         const newMsg = await res.json();
//         setMessages(prev => [...prev, newMsg]);
//         setText("");
//         fetchConversations();
//       }
//     } catch (e) { setErr("Message delivery failed"); }
//   };

//   const currentConvo = convos.find(c => c._id === convoId);

//   return (
//     <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden">
//       {/* SIDEBAR WRAPPER */}
//       <div className="hidden md:block w-64 h-full shrink-0 border-r border-white/5">
//         <ExhibitorSidebar />
//       </div>

//       {/* MAIN CONTENT AREA */}
//       <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
//         {/* PAGE HEADER */}
//         <header className="p-8 pb-4 shrink-0">
//           <div className="flex items-center gap-2 mb-1">
//             <Sparkles className="h-4 w-4 text-cyan-400" />
//             <span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase">Exhibitor Panel</span>
//           </div>
//           <h1 className="text-4xl font-black tracking-tight">
//             Attendee <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inquiries</span>
//           </h1>
//           <p className="text-slate-400 text-sm mt-1 font-medium opacity-70">Manage incoming visitor questions and leads.</p>
//         </header>

//         {err && (
//           <div className="mx-8 mb-4 bg-rose-500/10 border border-rose-500/20 p-3 rounded-2xl text-rose-400 text-xs font-bold shrink-0 animate-pulse">
//             {err}
//           </div>
//         )}

//         {/* MESSAGING GRID */}
//         <div className="flex-1 flex gap-6 px-8 pb-8 min-h-0">
          
//           {/* CONVERSATION LIST (LEFT) */}
//           <div className="w-[380px] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] flex flex-col overflow-hidden shrink-0 shadow-2xl">
//             <div className="p-6 border-b border-slate-800 bg-white/5 flex items-center justify-between">
//                <div className="flex items-center gap-2">
//                   <MessageCircle size={20} className="text-cyan-400" />
//                   <span className="font-bold text-sm uppercase tracking-widest">Inboxes</span>
//                </div>
//                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2.5 py-1 rounded-full font-black">{convos.length}</span>
//             </div>
            
//             <div className="overflow-y-auto flex-1 custom-scrollbar">
//               {convos.length === 0 ? (
//                 <div className="p-12 text-center opacity-30">
//                   <MessageCircle className="mx-auto mb-3 opacity-20" size={48} />
//                   <p className="text-xs italic font-medium">No inquiries yet</p>
//                 </div>
//               ) : (
//                 convos.map(c => (
//                   <button
//                     key={c._id}
//                     onClick={() => setSearchParams({ convoId: c._id })}
//                     className={`w-full p-6 text-left border-b border-slate-800/30 transition-all flex items-center gap-4 ${convoId === c._id ? "bg-cyan-500/10 border-l-4 border-l-cyan-500 shadow-inner" : "hover:bg-white/5 opacity-60 hover:opacity-100"}`}
//                   >
//                     <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 text-cyan-400 font-black text-xs">
//                         {c.displayUser?.name?.substring(0,2).toUpperCase() || "AT"}
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="font-bold text-sm truncate text-white">{c.displayUser?.name || "Attendee"}</span>
//                         <span className="text-[9px] text-slate-500 font-bold">{c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleDateString() : ""}</span>
//                       </div>
//                       <p className="text-[11px] text-slate-400 truncate italic">"{c.lastMessage || "Click to open chat"}"</p>
//                     </div>
//                   </button>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* CHAT WINDOW (RIGHT) */}
//           <div className="flex-1 bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl">
//             {convoId ? (
//               <>
//                 {/* User Header */}
//                 <div className="p-6 bg-white/5 border-b border-slate-800 flex items-center justify-between shrink-0">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 shadow-lg">
//                       <User size={24} />
//                     </div>
//                     <div>
//                       <h3 className="font-black text-xl leading-none text-white tracking-tight">{currentConvo?.displayUser?.name || "Attendee"}</h3>
//                       <div className="flex items-center gap-2 mt-2">
//                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
//                          <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Live Inquiry</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Messages Feed */}
//                 <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar scroll-smooth">
//                   {loading ? (
//                     <div className="h-full flex items-center justify-center"><RefreshCcw className="animate-spin text-cyan-500" size={40} /></div>
//                   ) : (
//                     messages.map((m) => {
//                       const isMe = String(m.senderId?._id || m.senderId) === String(userId);
//                       return (
//                         <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-3`}>
//                           <div className={`max-w-[75%] p-5 rounded-[2rem] text-[13px] font-medium shadow-2xl transition-all ${isMe ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-br-none" : "bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-none"}`}>
//                             {m.text}
//                             <div className={`flex items-center gap-1.5 text-[9px] mt-3 font-black uppercase tracking-tighter opacity-40 ${isMe ? "justify-end" : "justify-start text-slate-300"}`}>
//                                 <Clock size={10} />
//                                 {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                             </div>
//                           </div>
//                         </div>
//                       );
//                     })
//                   )}
//                   <div ref={bottomRef} />
//                 </div>

//                 {/* Input Section */}
//                 <div className="p-8 bg-slate-950/40 border-t border-slate-800/50 shrink-0">
//                   <div className="flex items-center gap-4">
//                     <input
//                       value={text}
//                       onChange={(e) => setText(e.target.value)}
//                       onKeyDown={(e) => e.key === "Enter" && handleReply()}
//                       placeholder="Type your reply..."
//                       className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm font-medium shadow-inner"
//                     />
//                     <button 
//                       onClick={handleReply} 
//                       className="bg-cyan-600 hover:bg-cyan-500 text-white h-[54px] px-10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center gap-2 group"
//                     >
//                       Reply
//                       <Send size={18} className="group-hover:translate-x-1 transition-transform" />
//                     </button>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <div className="flex-1 flex flex-col items-center justify-center text-slate-700 gap-6 opacity-40">
//                 <div className="h-32 w-32 rounded-full bg-slate-900 border-2 border-dashed border-slate-800 flex items-center justify-center">
//                     <MessageCircle size={56} />
//                 </div>
//                 <p className="font-black text-sm uppercase tracking-[0.3em]">Select an inquiry to respond</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default ExhibitorMessages;



import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Send, RefreshCcw, User, MessageCircle, Clock, Sparkles, Menu, X } from "lucide-react";
import ExhibitorSidebar from "./ExhibitorSidebar";
import { motion } from "framer-motion";

const API = "https://event-managemant-system-mern-stack.vercel.app";

const getAuth = () => {
  const raw = localStorage.getItem("userInfo") || localStorage.getItem("user");
  if (!raw) return { userId: "", token: "" };
  try {
    const obj = JSON.parse(raw);
    const user = obj.user || obj;
    return {
      userId: user?._id || "",
      token: obj.token || obj.accessToken || ""
    };
  } catch { return { userId: "", token: "" }; }
};

function ExhibitorMessages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const convoId = searchParams.get("convoId") || "";

  const [convos, setConvos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  
  // Sidebar state logic (Same as your Registration file)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const bottomRef = useRef(null);
  const { userId, token } = useMemo(() => getAuth(), []);

  const fetchConversations = async () => {
    if (!userId) return;
    try {
      const res = await fetch(`${API}/api/chat/conversations`, {
        headers: { "x-user-id": userId, "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        const formattedConvos = data.map(convo => {
          const otherUser = convo.participants?.find(p => String(p._id) !== String(userId));
          return { ...convo, displayUser: otherUser };
        });
        setConvos(formattedConvos);
      }
    } catch (e) { console.error("Sidebar load failed"); }
  };

  const fetchMessages = async (id) => {
    if (!id || !userId) return;
    setLoading(true);
    setErr("");
    try {
      const res = await fetch(`${API}/api/chat/conversations/${id}/messages`, {
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await res.json();
      if (res.ok) {
        setMessages(Array.isArray(data) ? data : []);
        setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      } else {
        setErr(data.message || "Failed to load chat history");
      }
    } catch (e) {
      setErr("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
    const interval = setInterval(fetchConversations, 10000);
    return () => clearInterval(interval);
  }, [userId]);

  useEffect(() => {
    if (convoId) fetchMessages(convoId);
  }, [convoId]);

  const handleReply = async () => {
    if (!text.trim() || !convoId) return;
    try {
      const res = await fetch(`${API}/api/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": userId,
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ conversationId: convoId, text: text.trim() }),
      });
      if (res.ok) {
        const newMsg = await res.json();
        setMessages(prev => [...prev, newMsg]);
        setText("");
        fetchConversations();
      }
    } catch (e) { setErr("Message delivery failed"); }
  };

  const currentConvo = convos.find(c => c._id === convoId);

  return (
    <div className="flex h-screen w-full bg-[#020617] text-white overflow-hidden relative selection:bg-sky-500/30">
      
      {/* Sidebar logic from your Registration file */}
      <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300 h-full">
        
        {/* Mobile Header with Hamburger (Exactly like Registration) */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617]/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl shrink-0">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-white shadow-xl active:scale-95 transition-transform"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-xl font-black tracking-tighter text-white">
              EVENT<span className="text-sky-500">SPHERE</span>
            </h2>
            <div className="w-10" /> 
        </div>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          
          <header className="p-6 md:p-8 pb-4 shrink-0">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase">Exhibitor Panel</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Attendee <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Inquiries</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1 font-medium opacity-70">Manage incoming visitor questions and leads.</p>
          </header>

          {err && (
            <div className="mx-6 md:mx-8 mb-4 bg-rose-500/10 border border-rose-500/20 p-3 rounded-2xl text-rose-400 text-xs font-bold shrink-0 animate-pulse">
              {err}
            </div>
          )}

          {/* MESSAGING GRID */}
          <div className="flex-1 flex flex-col md:flex-row gap-6 px-6 md:px-8 pb-8 min-h-0">
            
            {/* CONVERSATION LIST (LEFT) - Hide on mobile if chat is open */}
            <div className={`w-full md:w-[350px] lg:w-[380px] bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 rounded-[2.5rem] flex flex-col overflow-hidden shrink-0 shadow-2xl ${convoId ? 'hidden md:flex' : 'flex'}`}>
              <div className="p-6 border-b border-slate-800 bg-white/5 flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <MessageCircle size={20} className="text-cyan-400" />
                    <span className="font-bold text-sm uppercase tracking-widest">Inboxes</span>
                 </div>
                 <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-2.5 py-1 rounded-full font-black">{convos.length}</span>
              </div>
              
              <div className="overflow-y-auto flex-1 custom-scrollbar">
                {convos.length === 0 ? (
                  <div className="p-12 text-center opacity-30">
                    <MessageCircle className="mx-auto mb-3 opacity-20" size={48} />
                    <p className="text-xs italic font-medium">No inquiries yet</p>
                  </div>
                ) : (
                  convos.map(c => (
                    <button
                      key={c._id}
                      onClick={() => setSearchParams({ convoId: c._id })}
                      className={`w-full p-6 text-left border-b border-slate-800/30 transition-all flex items-center gap-4 ${convoId === c._id ? "bg-cyan-500/10 border-l-4 border-l-cyan-500 shadow-inner" : "hover:bg-white/5 opacity-60 hover:opacity-100"}`}
                    >
                      <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700 text-cyan-400 font-black text-xs shrink-0">
                          {c.displayUser?.name?.substring(0,2).toUpperCase() || "AT"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-bold text-sm truncate text-white">{c.displayUser?.name || "Attendee"}</span>
                          <span className="text-[9px] text-slate-500 font-bold">{c.lastMessageAt ? new Date(c.lastMessageAt).toLocaleDateString() : ""}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate italic">"{c.lastMessage || "Click to open chat"}"</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* CHAT WINDOW (RIGHT) - Full screen on mobile if chat is open */}
            <div className={`flex-1 bg-slate-900/40 backdrop-blur-2xl border border-slate-800/50 rounded-[2.5rem] md:rounded-[3rem] flex flex-col overflow-hidden shadow-2xl ${convoId ? 'flex' : 'hidden md:flex'}`}>
              {convoId ? (
                <>
                  {/* User Header */}
                  <div className="p-6 bg-white/5 border-b border-slate-800 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-4">
                      {/* Back button for mobile */}
                      <button onClick={() => setSearchParams({})} className="md:hidden p-2 -ml-2 text-slate-400">
                        <X size={20} />
                      </button>
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                        <User size={22} />
                      </div>
                      <div>
                        <h3 className="font-black text-lg md:text-xl leading-none text-white tracking-tight">{currentConvo?.displayUser?.name || "Attendee"}</h3>
                        <div className="flex items-center gap-2 mt-1.5 md:mt-2">
                           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                           <span className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Live Inquiry</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className="flex-1 overflow-y-auto p-5 md:p-8 space-y-6 custom-scrollbar scroll-smooth">
                    {loading ? (
                      <div className="h-full flex items-center justify-center"><RefreshCcw className="animate-spin text-cyan-500" size={40} /></div>
                    ) : (
                      messages.map((m) => {
                        const isMe = String(m.senderId?._id || m.senderId) === String(userId);
                        return (
                          <div key={m._id} className={`flex ${isMe ? "justify-end" : "justify-start"} items-end gap-3`}>
                            <div className={`max-w-[85%] md:max-w-[75%] p-4 md:p-5 rounded-[1.8rem] md:rounded-[2rem] text-[12px] md:text-[13px] font-medium shadow-2xl ${isMe ? "bg-gradient-to-br from-cyan-600 to-blue-700 text-white rounded-br-none" : "bg-slate-800/90 border border-slate-700 text-slate-100 rounded-bl-none"}`}>
                              {m.text}
                              <div className={`flex items-center gap-1.5 text-[9px] mt-2.5 md:mt-3 font-black uppercase tracking-tighter opacity-40 ${isMe ? "justify-end" : "justify-start text-slate-300"}`}>
                                  <Clock size={10} />
                                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={bottomRef} />
                  </div>

                  {/* Input Section */}
                  <div className="p-5 md:p-8 bg-slate-950/40 border-t border-slate-800/50 shrink-0">
                    <div className="flex items-center gap-3 md:gap-4">
                      <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleReply()}
                        placeholder="Type reply..."
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl md:rounded-2xl px-5 md:px-6 py-3 md:py-4 outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm"
                      />
                      <button 
                        onClick={handleReply} 
                        className="bg-cyan-600 hover:bg-cyan-500 text-white h-[48px] md:h-[54px] px-6 md:px-10 rounded-xl md:rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2 group shadow-lg shadow-cyan-500/20"
                      >
                        <span className="hidden sm:inline">Reply</span>
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-700 gap-6 opacity-40">
                  <div className="h-32 w-32 rounded-full bg-slate-900 border-2 border-dashed border-slate-800 flex items-center justify-center">
                      <MessageCircle size={56} />
                  </div>
                  <p className="font-black text-sm uppercase tracking-[0.3em] text-center px-6">Select an inquiry to respond</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ExhibitorMessages;