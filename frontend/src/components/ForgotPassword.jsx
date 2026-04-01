// import React, { useState, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineMail, AiOutlineArrowLeft } from "react-icons/ai";

// function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ⭐ Stars Animation (Same as Login/Signup)
//   const stars = useMemo(() => {
//     return [...Array(500)].map((_, i) => ({
//       id: i,
//       size: Math.random() * 2 + 1,
//       top: Math.random() * 100 + "%",
//       left: Math.random() * 100 + "%",
//       duration: Math.random() * 2 + 1 + "s", 
//       delay: Math.random() * 5 + "s",
//     }));
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:5000/api/users/forgot-password", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Something went wrong");
//       } else {
//         setMessage("Reset link sent! Please check your email.");
//       }
//     } catch (err) {
//       setError("Server error, please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden">
      
//       {/* 🌌 Stars Background */}
//       <style>
//         {`
//           @keyframes starAnimation {
//             0% { transform: scale(0.5); opacity: 0; }
//             50% { transform: scale(1.2); opacity: 0.8; }
//             100% { transform: scale(0.5); opacity: 0; }
//           }
//           .star-particle { position: absolute; background: white; border-radius: 50%; animation: starAnimation var(--duration) infinite ease-in-out; animation-delay: var(--delay); }
//         `}
//       </style>
//       <div className="absolute inset-0">
//         {stars.map((star) => (
//           <div key={star.id} className="star-particle" style={{ width: star.size + "px", height: star.size + "px", top: star.top, left: star.left, "--duration": star.duration, "--delay": star.delay }} />
//         ))}
//       </div>

//       <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
        
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-black text-white tracking-tight mb-2">
//             Reset <span className="text-sky-400">Password</span>
//           </h2>
//           <p className="text-slate-400 text-sm">Enter your email to receive a reset link</p>
//         </div>

//         {message && <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-bold">{message}</div>}
//         {error && <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-bold">{error}</div>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Email Address</label>
//             <div className="relative">
//               <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="email@example.com"
//                 className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
//           >
//             {loading ? "Sending..." : "Send Reset Link"}
//           </button>
//         </form>

//         <div className="mt-8 text-center">
//           <Link to="/login" className="inline-flex items-center text-sky-400 hover:text-sky-300 text-xs font-bold uppercase tracking-widest transition">
//             <AiOutlineArrowLeft className="mr-2" size={16} /> Back to Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;








import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineArrowLeft } from "react-icons/ai";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stars = useMemo(() => {
    return [...Array(500)].map((_, i) => ({
      id: i, size: Math.random() * 2 + 1, top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%", duration: Math.random() * 2 + 1 + "s", delay: Math.random() * 5 + "s",
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to process request");
      } else {
        setMessage("Reset link sent! Please check your email inbox.");
        setEmail(""); // Input clear kar dia success par
      }
    } catch (err) {
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden">
      <style>{`@keyframes starAnimation { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 0.8; } 100% { transform: scale(0.5); opacity: 0; } } .star-particle { position: absolute; background: white; border-radius: 50%; animation: starAnimation var(--duration) infinite ease-in-out; animation-delay: var(--delay); }`}</style>
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div key={star.id} className="star-particle" style={{ width: star.size + "px", height: star.size + "px", top: star.top, left: star.left, "--duration": star.duration, "--delay": star.delay }} />
        ))}
      </div>
      <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white tracking-tight mb-2">Reset <span className="text-sky-400">Password</span></h2>
          <p className="text-slate-400 text-sm">Enter your email to receive a reset link</p>
        </div>
        {message && <div className="mb-6 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center font-bold">{message}</div>}
        {error && <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-bold uppercase">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Email Address</label>
            <div className="relative">
              <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">{loading ? "Sending..." : "Send Reset Link"}</button>
        </form>
        <div className="mt-8 text-center"><Link to="/login" className="inline-flex items-center text-sky-400 hover:text-sky-300 text-xs font-bold uppercase tracking-widest"><AiOutlineArrowLeft className="mr-2" size={16} /> Back to Login</Link></div>
      </div>
    </div>
  );
}
export default ForgotPassword;