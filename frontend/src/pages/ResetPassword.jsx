import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineLock, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast from "react-hot-toast";

function ResetPassword() {
  const { token } = useParams(); // URL se token nikalne ke liye
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ⭐ Stars Animation (Matching your theme)
  const stars = useMemo(() => {
    return [...Array(500)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      duration: Math.random() * 2 + 1 + "s",
      delay: Math.random() * 5 + "s",
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/users/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (err) {
      toast.error("Server error, try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#020617] relative overflow-hidden">
        {/* 🌌 Animated Stars Background */}
      <style>{`@keyframes starAnimation { 0% { transform: scale(0.5); opacity: 0; } 50% { transform: scale(1.2); opacity: 0.8; } 100% { transform: scale(0.5); opacity: 0; } } .star-particle { position: absolute; background: white; border-radius: 50%; animation: starAnimation var(--duration) infinite ease-in-out; animation-delay: var(--delay); }`}</style>
      {/* 🌌 Stars Background */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div key={star.id} className="star-particle" style={{
            position: "absolute", background: "white", borderRadius: "50%",
            width: star.size + "px", height: star.size + "px", top: star.top, left: star.left,
            animation: `starAnimation ${star.duration} infinite ease-in-out`, animationDelay: star.delay
          }} />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">New <span className="text-sky-400">Password</span></h2>
          <p className="text-slate-400 text-sm">Enter your new secure password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">New Password</label>
            <div className="relative">
              <AiOutlineLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength="8" // ⭐ SIRF YE LINE ADD KAREIN
                className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-800/40 border border-white/5 text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all"
                required
              />
              <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50">
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;