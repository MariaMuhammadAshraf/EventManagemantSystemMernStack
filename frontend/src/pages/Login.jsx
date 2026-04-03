// // src/pages/Login.jsx
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       setLoading(true);

//       const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/users/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       console.log("Login response:", data);

//       if (!res.ok) {
//         setError(data.message || "Login failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ TOKEN + USER STORE (🔥 MAIN FIX)
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // 🔁 Navbar ko instantly update karne ke liye
//       window.dispatchEvent(new Event("storage"));

//       alert("Login successful!");
//       console.log("Logged in user role:", data.user.role);

//       // 🔀 ROLE BASED REDIRECT
//       if (data.user.role === "admin") {
//         navigate("/admin");
//       } else if (data.user.role === "attendee") {
//         navigate("/attendee/dashboard");
//       } else if (data.user.role === "exhibitor") {
//         navigate("/exhibitor");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//       setError("Server error, please try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-6 
//       bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950">

//       <div className="absolute -top-40 left-1/2 -translate-x-1/2 
//             w-[600px] h-[600px] bg-sky-500/30 blur-3xl rounded-full"></div>
//       <div className="absolute bottom-0 right-20 
//             w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full"></div>

//       <div className="relative z-10 w-full max-w-md 
//             bg-blue-900/40 backdrop-blur-xl 
//             border border-sky-400/20 
//             rounded-3xl p-10 shadow-2xl">

//         <h2 className="text-4xl font-extrabold text-white text-center mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-blue-200 text-center mb-4">
//           Login to continue to EventSphere
//         </p>

//         {error && (
//           <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Email */}
//           <div>
//             <label className="block text-sm text-blue-200 mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="john@example.com"
//               className="w-full px-4 py-3 rounded-xl 
//                    bg-blue-900/40 border border-sky-400/30 
//                    text-white placeholder-blue-200
//                    focus:outline-none focus:ring-2 focus:ring-sky-400"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-sm text-blue-200 mb-1">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="********"
//               className="w-full px-4 py-3 rounded-xl 
//                    bg-blue-900/40 border border-sky-400/30 
//                    text-white placeholder-blue-200
//                    focus:outline-none focus:ring-2 focus:ring-sky-400 pr-10"
//               required
//             />
//             <span
//               className="absolute right-3 top-10 text-blue-200 cursor-pointer"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? (
//                 <AiOutlineEyeInvisible size={20} />
//               ) : (
//                 <AiOutlineEye size={20} />
//               )}
//             </span>
//           </div>

//           <div className="text-right">
//             <Link
//               to="/forgot-password"
//               className="text-sky-400 text-sm hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 mt-4 rounded-2xl
//                bg-gradient-to-r from-blue-500 to-sky-500
//                text-white font-semibold text-lg
//                shadow-xl hover:scale-105 hover:shadow-sky-500/40 transition
//                disabled:opacity-60 disabled:hover:scale-100"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-blue-200 text-sm">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-sky-400 hover:underline">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;




// import React, { useState, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 🚀 Generate 500 Stars
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

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

 


// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   try {
//     setLoading(true);
//     const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/users/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();
//     if (!res.ok) {
//       setError(data.message || "Login failed");
//       return;
//     }

//     // ✅ Clean and Save
//    const role = data.user.role?.toLowerCase().trim() || "user";

//     // ✅ 2. Phir pura storage saaf karein
//     localStorage.clear(); 

//     // ✅ 3. Ab fresh data set karein
//     localStorage.setItem("role", role);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     localStorage.setItem("token", "logged_in");

//     // ✅ 4. Redirect (window.location page refresh karega jo storage ko sync kar dega)
//     if (role === "admin") {
//       window.location.href = "/admin";
//     } else if (role === "attendee") {
//       window.location.href = "/attendee/dashboard";
//     } else if (role === "exhibitor") {
//       window.location.href = "/exhibitor";
//     } else {
//       window.location.href = "/";
//     }

//   } catch (err) {
//     setError("Server error!");
//   } finally {
//     setLoading(false);
//   }
// };
//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 
//       bg-[#020617] relative overflow-hidden">
      
//       {/* 🌌 ANIMATED STARS CSS */}
//       <style>
//         {`
//           @keyframes starAnimation {
//             0% { transform: scale(0.5); opacity: 0; }
//             50% { transform: scale(1.2); opacity: 0.8; }
//             100% { transform: scale(0.5); opacity: 0; }
//           }
//           .star-particle {
//             position: absolute;
//             background: white;
//             border-radius: 50%;
//             pointer-events: none;
//             animation: starAnimation var(--duration) infinite ease-in-out;
//             animation-delay: var(--delay);
//           }
//         `}
//       </style>

//       {/* ⭐ 500 Stars Layer */}
//       <div className="absolute inset-0 z-0">
//         {stars.map((star) => (
//           <div
//             key={star.id}
//             className="star-particle"
//             style={{
//               width: star.size + "px",
//               height: star.size + "px",
//               top: star.top,
//               left: star.left,
//               "--duration": star.duration,
//               "--delay": star.delay,
//               boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)",
//             }}
//           />
//         ))}
//       </div>

//       {/* 🕯️ Background Glow Blobs */}
//       <div className="absolute -top-40 left-1/2 -translate-x-1/2 
//             w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-sky-500/20 blur-[100px] rounded-full"></div>
//       <div className="absolute bottom-0 right-0 
//             w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-600/10 blur-[80px] rounded-full"></div>

//       {/* 📄 Login Card */}
//       <div className="relative z-10 w-full max-w-md 
//             bg-slate-900/40 backdrop-blur-2xl 
//             border border-white/10 
//             rounded-[2.5rem] p-8 sm:p-10 shadow-2xl ring-1 ring-white/5">

//         <div className="text-center mb-8">
//           <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
//             Welcome <span className="text-sky-400">Back</span>
//           </h2>
//           <p className="text-slate-400 text-sm sm:text-base">
//             Login to continue to EventSphere
//           </p>
//         </div>

//         {error && (
//           <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-bold uppercase tracking-widest">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">

//           {/* Email */}
//           <div>
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Email Address</label>
//             <div className="relative">
//               <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="email@example.com"
//                 className="w-full pl-12 pr-5 py-3.5 rounded-2xl 
//                      bg-slate-800/40 border border-white/5 
//                      text-white placeholder-slate-600
//                      focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
//                 required
//               />
//             </div>
//           </div>

//           {/* Password */}
//           <div>
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Password</label>
//             <div className="relative">
//               <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full pl-12 pr-12 py-3.5 rounded-2xl 
//                      bg-slate-800/40 border border-white/5 
//                      text-white placeholder-slate-600
//                      focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
//                 required
//               />
//               <button
//                 type="button"
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-sky-400 transition-colors"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//               </button>
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <Link
//               to="/forgot-password"
//               className="text-sky-400 text-xs font-bold uppercase tracking-widest hover:text-sky-300 transition"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 mt-2 rounded-2xl
//                bg-gradient-to-r from-blue-600 to-sky-500
//                text-white font-black text-xs uppercase tracking-[0.2em]
//                shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all
//                disabled:opacity-50 disabled:hover:scale-100"
//           >
//             {loading ? "Authorizing..." : "Login to Account"}
//           </button>
//         </form>

//         <p className="mt-10 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
//           Don't have an account?{" "}
//           <Link to="/signup" className="text-sky-400 hover:text-sky-300 ml-1 transition">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;







import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const stars = useMemo(() => {
    return [...Array(500)].map((_, i) => ({
      id: i, size: Math.random() * 2 + 1, top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%", duration: Math.random() * 2 + 1 + "s", delay: Math.random() * 5 + "s",
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid Credentials");
        setLoading(false);
        return;
      }

      const role = data.user.role?.toLowerCase().trim() || "user";
      localStorage.clear(); 
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", "logged_in");

      if (role === "admin") window.location.href = "/admin";
      else if (role === "attendee") window.location.href = "/attendee/dashboard";
      else if (role === "exhibitor") window.location.href = "/exhibitor";
      else window.location.href = "/";

    } catch (err) {
      setError("Server connection failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden">
      <style>{`@keyframes starAnimation { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 0.8; } 100% { transform: scale(0.5); opacity: 0; } } .star-particle { position: absolute; background: white; border-radius: 50%; pointer-events: none; animation: starAnimation var(--duration) infinite ease-in-out; animation-delay: var(--delay); }`}</style>
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div key={star.id} className="star-particle" style={{ width: star.size + "px", height: star.size + "px", top: star.top, left: star.left, "--duration": star.duration, "--delay": star.delay, boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)" }} />
        ))}
      </div>
      <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Welcome <span className="text-sky-400">Back</span></h2>
          <p className="text-slate-400 text-sm">Login to continue to EventSphere</p>
        </div>
        {error && <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center font-bold uppercase">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Email</label>
            <div className="relative">
              <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all" required />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Password</label>
            <div className="relative">
              <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all" required />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}</button>
            </div>
          </div>
          <div className="flex justify-end"><Link to="/forgot-password" size={22} className="text-sky-400 text-xs font-bold uppercase hover:text-sky-300">Forgot Password?</Link></div>
          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">{loading ? "Authorizing..." : "Login to Account"}</button>
        </form>
        <p className="mt-10 text-center text-slate-500 text-xs font-bold uppercase">Don't have an account? <Link to="/signup" className="text-sky-400 hover:text-sky-300 ml-1">Sign Up</Link></p>
      </div>
    </div>
  );
}
export default Login;