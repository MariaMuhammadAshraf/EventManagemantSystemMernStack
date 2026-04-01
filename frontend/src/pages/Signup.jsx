// // // src/pages/Signup.jsx
// // import React, { useState } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// // function Signup() {
// //   const navigate = useNavigate();

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState("");
// //   const [loading, setLoading] = useState(false);

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     if (formData.password !== formData.confirmPassword) {
// //       setError("Passwords do not match");
// //       return;
// //     }

// //     try {
// //       setLoading(true);

// //       const res = await fetch("http://localhost:5000/api/users", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           name: formData.name,
// //           email: formData.email,
// //           password: formData.password,
// //           // role nahi bhej rahe, backend "user" set karega
// //         }),
// //       });

// //       const data = await res.json();
// //       console.log("Signup response:", data);

// //       if (!res.ok) {
// //         setError(data.message || "Signup failed");
// //         setLoading(false);
// //         return;
// //       }

// //       alert("Signup successful!");
// //       navigate("/login");
// //     } catch (err) {
// //       console.error("Signup error:", err);
// //       setError("Server error, please try again");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center px-6 
// //                     bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950">

// //       {/* Glow blobs */}
// //       <div className="absolute -top-40 left-1/2 -translate-x-1/2 
// //                       w-[600px] h-[600px] bg-sky-500/30 blur-3xl rounded-full"></div>
// //       <div className="absolute bottom-0 right-20 
// //                       w-[400px] h-[400px] bg-blue-500/20 blur-3xl rounded-full"></div>

// //       <div className="relative z-10 w-full max-w-md 
// //                       bg-blue-900/40 backdrop-blur-xl 
// //                       border border-sky-400/20 
// //                       rounded-3xl p-10 shadow-2xl">

// //         <h2 className="text-4xl font-extrabold text-white text-center mb-2">
// //           Create Account
// //         </h2>
// //         <p className="text-blue-200 text-center mb-4">
// //           Join EventSphere and manage expos smarter
// //         </p>

// //         {error && (
// //           <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
// //         )}

// //         <form onSubmit={handleSubmit} className="space-y-5">

// //           {/* Name */}
// //           <div>
// //             <label className="block text-sm text-blue-200 mb-1">Full Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               placeholder="John Doe"
// //               className="w-full px-4 py-3 rounded-xl 
// //                          bg-blue-900/40 border border-sky-400/30 
// //                          text-white placeholder-blue-200
// //                          focus:outline-none focus:ring-2 focus:ring-sky-400"
// //               required
// //             />
// //           </div>

// //           {/* Email */}
// //           <div>
// //             <label className="block text-sm text-blue-200 mb-1">Email</label>
// //             <input
// //               type="email"
// //               name="email"
// //               value={formData.email}
// //               onChange={handleChange}
// //               placeholder="john@example.com"
// //               className="w-full px-4 py-3 rounded-xl 
// //                          bg-blue-900/40 border border-sky-400/30 
// //                          text-white placeholder-blue-200
// //                          focus:outline-none focus:ring-2 focus:ring-sky-400"
// //               required
// //             />
// //           </div>

// //           {/* Password */}
// //           <div className="relative">
// //             <label className="block text-sm text-blue-200 mb-1">Password</label>
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               name="password"
// //               value={formData.password}
// //               onChange={handleChange}
// //               placeholder="********"
// //               className="w-full px-4 py-3 rounded-xl 
// //                          bg-blue-900/40 border border-sky-400/30 
// //                          text-white placeholder-blue-200
// //                          focus:outline-none focus:ring-2 focus:ring-sky-400 pr-10"
// //               required
// //             />
// //             <span
// //               className="absolute right-3 top-10 text-blue-200 cursor-pointer"
// //               onClick={() => setShowPassword(!showPassword)}
// //             >
// //               {showPassword ? (
// //                 <AiOutlineEyeInvisible size={20} />
// //               ) : (
// //                 <AiOutlineEye size={20} />
// //               )}
// //             </span>
// //           </div>

// //           {/* Confirm Password */}
// //           <div className="relative">
// //             <label className="block text-sm text-blue-200 mb-1">
// //               Confirm Password
// //             </label>
// //             <input
// //               type={showPassword ? "text" : "password"}
// //               name="confirmPassword"
// //               value={formData.confirmPassword}
// //               onChange={handleChange}
// //               placeholder="********"
// //               className="w-full px-4 py-3 rounded-xl 
// //                          bg-blue-900/40 border border-sky-400/30 
// //                          text-white placeholder-blue-200
// //                          focus:outline-none focus:ring-2 focus:ring-sky-400 pr-10"
// //               required
// //             />
// //             <span
// //               className="absolute right-3 top-10 text-blue-200 cursor-pointer"
// //               onClick={() => setShowPassword(!showPassword)}
// //             >
// //               {showPassword ? (
// //                 <AiOutlineEyeInvisible size={20} />
// //               ) : (
// //                 <AiOutlineEye size={20} />
// //               )}
// //             </span>
// //           </div>

// //           {/* Button */}
// //           <button
// //             type="submit"
// //             disabled={loading}
// //             className="w-full py-3 mt-4 rounded-2xl
// //                        bg-gradient-to-r from-blue-500 to-sky-500
// //                        text-white font-semibold text-lg
// //                        shadow-xl hover:scale-105 hover:shadow-sky-500/40 transition
// //                        disabled:opacity-60 disabled:hover:scale-100"
// //           >
// //             {loading ? "Signing up..." : "Sign Up"}
// //           </button>
// //         </form>

// //         <p className="mt-8 text-center text-blue-200 text-sm">
// //           Already have an account?{" "}
// //           <Link to="/login" className="text-sky-400 hover:underline">
// //             Login
// //           </Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Signup;



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// function Signup() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
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

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Signup failed");
//         setLoading(false);
//         return;
//       }

//       alert("Signup successful!");
//       navigate("/login");
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Server error, please try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 
//       bg-[#020617] relative overflow-hidden">
      
//       {/* Background Glows */}
//       <div className="absolute -top-40 left-1/2 -translate-x-1/2 
//             w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-sky-500/20 blur-[100px] rounded-full"></div>
//       <div className="absolute bottom-0 right-0 
//             w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-600/10 blur-[80px] rounded-full"></div>

//       <div className="relative z-10 w-full max-w-md 
//             bg-slate-900/40 backdrop-blur-2xl 
//             border border-white/10 
//             rounded-[2.5rem] p-8 sm:p-10 shadow-2xl ring-1 ring-white/5">

//         <div className="text-center mb-8">
//           <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
//             Create <span className="text-sky-400">Account</span>
//           </h2>
//           <p className="text-slate-400 text-sm sm:text-base">
//             Join EventSphere to manage expos smarter
//           </p>
//         </div>

//         {error && (
//           <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] text-center font-bold uppercase tracking-widest">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Full Name */}
//           <div>
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               placeholder="John Doe"
//               className="w-full px-5 py-3.5 rounded-2xl 
//                    bg-slate-800/40 border border-white/5 
//                    text-white placeholder-slate-600
//                    focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="john@example.com"
//               className="w-full px-5 py-3.5 rounded-2xl 
//                    bg-slate-800/40 border border-white/5 
//                    text-white placeholder-slate-600
//                    focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className="w-full px-5 py-3.5 rounded-2xl 
//                    bg-slate-800/40 border border-white/5 
//                    text-white placeholder-slate-600
//                    focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all pr-12"
//               required
//             />
//             <button
//               type="button"
//               className="absolute right-4 top-11 text-slate-500 hover:text-sky-400 transition-colors"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Confirm Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="••••••••"
//               className="w-full px-5 py-3.5 rounded-2xl 
//                    bg-slate-800/40 border border-white/5 
//                    text-white placeholder-slate-600
//                    focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all pr-12"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 mt-4 rounded-2xl
//                bg-gradient-to-r from-blue-600 to-sky-500
//                text-white font-black text-xs uppercase tracking-[0.2em]
//                shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all
//                disabled:opacity-50 disabled:hover:scale-100"
//           >
//             {loading ? "Creating Account..." : "Sign Up Now"}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
//           Already have an account?{" "}
//           <Link to="/login" className="text-sky-400 hover:text-sky-300 ml-1 transition">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;




// import React, { useState, useMemo } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

// function Signup() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // High-performance: 500 stars generate karna bina re-render ke
//   const stars = useMemo(() => {
//     return [...Array(500)].map((_, i) => ({
//       id: i,
//       size: Math.random() * 2 + 1, // Sizes between 1px and 3px
//       top: Math.random() * 100 + "%",
//       left: Math.random() * 100 + "%",
//       // Random speed and delay for "fast zoom & fade" effect
//       duration: Math.random() * 2 + 1 + "s", 
//       delay: Math.random() * 5 + "s",
//     }));
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("http://localhost:5000/api/users", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Signup failed");
//         setLoading(false);
//         return;
//       }

//       alert("Signup successful!");
//       navigate("/login");
//     } catch (err) {
//       console.error("Signup error:", err);
//       setError("Server error, please try again");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 
//       bg-[#020617] relative overflow-hidden">
      
//       {/* 🚀 ANIMATED STARS LAYER */}
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

//       {/* Background Glows (Keep your original glows) */}
//       <div className="absolute -top-40 left-1/2 -translate-x-1/2 
//             w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-sky-500/20 blur-[100px] rounded-full"></div>
//       <div className="absolute bottom-0 right-0 
//             w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-blue-600/10 blur-[80px] rounded-full"></div>

//       <div className="relative z-10 w-full max-w-md 
//             bg-slate-900/60 backdrop-blur-2xl 
//             border border-white/10 
//             rounded-[2.5rem] p-8 sm:p-10 shadow-2xl ring-1 ring-white/5">

//         <div className="text-center mb-8">
//           <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-2">
//             Create <span className="text-sky-400">Account</span>
//           </h2>
//           <p className="text-slate-400 text-sm sm:text-base">
//             Join EventSphere to manage expos smarter
//           </p>
//         </div>

//         {error && (
//           <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] text-center font-bold uppercase tracking-widest">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Full Name */}
//           <div>
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Full Name</label>
//             <div className="relative">
//               <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 placeholder="full name"
//                 className="w-full pl-12 pr-5 py-3.5 rounded-2xl 
//                      bg-slate-800/40 border border-white/5 
//                      text-white placeholder-slate-600
//                      focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
//                 required
//               />
//             </div>
//           </div>

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
//           <div className="relative">
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

//           {/* Confirm Password */}
//           <div className="relative">
//             <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 ml-1">Confirm Password</label>
//             <div className="relative">
//               <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className="w-full pl-12 pr-12 py-3.5 rounded-2xl 
//                      bg-slate-800/40 border border-white/5 
//                      text-white placeholder-slate-600
//                      focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-4 mt-4 rounded-2xl
//                bg-gradient-to-r from-blue-600 to-sky-500
//                text-white font-black text-xs uppercase tracking-[0.2em]
//                shadow-xl shadow-sky-500/20 hover:scale-[1.02] active:scale-95 transition-all
//                disabled:opacity-50 disabled:hover:scale-100"
//           >
//             {loading ? "Creating Account..." : "Sign Up Now"}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">
//           Already have an account?{" "}
//           <Link to="/login" className="text-sky-400 hover:text-sky-300 ml-1 transition">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;






import React, { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
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
    if (formData.password !== formData.confirmPassword) { setError("Passwords do not match"); return; }
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name, email: formData.email, password: formData.password }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.message || "Signup failed"); return; }
      
      alert("Signup successful! Please login.");
      navigate("/login");
    } catch (err) { setError("Server error, please try again"); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#020617] relative overflow-hidden">
      <style>{`@keyframes starAnimation { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 0.8; } 100% { transform: scale(0.5); opacity: 0; } } .star-particle { position: absolute; background: white; border-radius: 50%; pointer-events: none; animation: starAnimation var(--duration) infinite ease-in-out; animation-delay: var(--delay); }`}</style>
      <div className="absolute inset-0 z-0">
        {stars.map((star) => (
          <div key={star.id} className="star-particle" style={{ width: star.size + "px", height: star.size + "px", top: star.top, left: star.left, "--duration": star.duration, "--delay": star.delay, boxShadow: "0 0 5px rgba(255, 255, 255, 0.8)" }} />
        ))}
      </div>
      <div className="relative z-10 w-full max-w-md bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Create <span className="text-sky-400">Account</span></h2>
          <p className="text-slate-400 text-sm">Join EventSphere to manage expos smarter</p>
        </div>
        {error && <div className="mb-6 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] text-center font-bold uppercase tracking-widest">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Full Name</label>
            <div className="relative">
              <AiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all" required />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Email</label>
            <div className="relative">
              <AiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all" required />
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Password</label>
            <div className="relative">
              <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" minLength="8"  className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all" required />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}</button>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Confirm Password</label>
            <div className="relative">
              <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input type={showPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" minLength="8"className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:ring-2 focus:ring-sky-500/50 outline-none transition-all" required />
            </div>
          </div>
          <button type="submit" disabled={loading} className="w-full py-4 mt-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50">{loading ? "Creating Account..." : "Sign Up Now"}</button>
        </form>
        <p className="mt-8 text-center text-slate-500 text-xs font-bold uppercase tracking-widest">Already have an account? <Link to="/login" className="text-sky-400 hover:text-sky-300 ml-1">Login</Link></p>
      </div>
    </div>
  );
}
export default Signup;