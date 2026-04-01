// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Store,
//   ClipboardCheck,
//   UserCircle,
//   MessageSquare,
//   LogOut,
//   ChevronRight,
//   Users,
//   CalendarCheck,
//   Building2,
//   X,
// } from "lucide-react";

// function ExhibitorSidebar({ isOpen, setIsOpen }) {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const menu = [
//     { title: "Dashboard", path: "/exhibitor", icon: <LayoutDashboard size={20} /> },
//     { title: "My Booth", path: "/exhibitor/booths", icon: <Store size={20} /> },
//     { title: "Registration", path: "/exhibitor/registration", icon: <ClipboardCheck size={20} /> },
//     { title: "Messages", path: "/exhibitor/messages", icon: <MessageSquare size={20} /> },
//     { title: "Profile", path: "/exhibitor/profile", icon: <UserCircle size={20} /> },
//     { title: "Leads", path: "/exhibitor/leads", icon: <Users size={20} /> },
//     { title: "Appointments", path: "/exhibitor/appointments", icon: <CalendarCheck size={20} /> },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* OVERLAY: Sidebar ke bahar click karne par band hoga */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}

//       {/* SIDEBAR */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-[50] w-72 bg-[#020617] text-white p-6 border-r border-slate-800 
//           flex flex-col justify-between h-screen transition-transform duration-300 ease-in-out
//           ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//           lg:translate-x-0 lg:sticky lg:top-0 shadow-2xl
//         `}
//       >
//         <div>
//           {/* ✅ TOP SECTION: Logo aur Cross button ko door door kar diya */}
//           <div className="flex items-center justify-between mb-10 px-2 relative"> 
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-sky-500 rounded-xl shadow-lg shadow-sky-500/20">
//                 <Building2 size={24} className="text-white" />
//               </div>
//               <h2 className="text-xl font-black tracking-tighter text-white">
//                 EVENT<span className="text-sky-500">SPHERE</span>
//               </h2>
//             </div>

//             {/* Cross Button: Right side par fix hai aur gap ke sath hai */}
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="lg:hidden p-1 bg-white/5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-all active:scale-90"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* ✅ SPACING: Menu text aur header ke darmiyan gap */}
//           <div className="h-2 lg:hidden" /> 

//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
//             Exhibitor Menu
//           </p>

//           <nav className="space-y-1">
//             {menu.map((item) => {
//               const isActive = location.pathname === item.path;
//               return (
//                 <Link
//                   key={item.title}
//                   to={item.path}
//                   onClick={() => setIsOpen(false)}
//                   className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
//                     isActive
//                       ? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]"
//                       : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-100"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className={isActive ? "text-sky-400" : ""}>{item.icon}</span>
//                     <span className="font-bold text-sm tracking-tight">{item.title}</span>
//                   </div>
//                   {isActive && <ChevronRight size={14} className="animate-pulse" />}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         {/* PROFILE SECTION */}
//         <div className="space-y-4">
//           <div className="px-4 py-4 rounded-2xl bg-slate-900/50 border border-slate-800">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-sm font-black uppercase">
//                 {user?.name ? user.name.charAt(0) : "E"}
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-white leading-none">{user?.name || "Exhibitor"}</p>
//                 <div className="flex items-center gap-1 mt-1">
//                   <div className="w-1 h-1 rounded-full bg-emerald-500" />
//                   <p className="text-[10px] text-slate-500 font-medium">Active Now</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-colors group"
//           >
//             <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
//             <span>Sign Out</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default ExhibitorSidebar;



import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  ClipboardCheck,
  UserCircle,
  MessageSquare,
  LogOut,
  ChevronRight,
  Users,
  CalendarCheck,
  Building2,
  X,
} from "lucide-react";

function ExhibitorSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    { title: "Dashboard", path: "/exhibitor", icon: <LayoutDashboard size={20} /> },
    { title: "My Booth", path: "/exhibitor/booths", icon: <Store size={20} /> },
    { title: "Registration", path: "/exhibitor/registration", icon: <ClipboardCheck size={20} /> },
    { title: "Messages", path: "/exhibitor/messages", icon: <MessageSquare size={20} /> },
    { title: "Profile", path: "/exhibitor/profile", icon: <UserCircle size={20} /> },
    { title: "Leads", path: "/exhibitor/leads", icon: <Users size={20} /> },
    { title: "Appointments", path: "/exhibitor/appointments", icon: <CalendarCheck size={20} /> },
    
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR - Fixed height and border issues */}
     <aside
        className={`
          fixed inset-y-0 left-0 z-[50] w-72 bg-[#020617] text-white p-6 border-r border-slate-800/50 
          flex flex-col h-screen transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 shadow-2xl
        `}
      >
        <div className="flex-1"> {/* Is div se menu upar rahega aur profile niche push hogi */}
          {/* TOP SECTION */}
          <div className="flex items-center justify-between mb-10 px-2 relative"> 
            <div className="flex items-center gap-3">
               <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-transform group-hover:rotate-6">
            <span className="text-white font-black text-lg italic uppercase leading-none">E</span>
          </div>
              <h2 className="text-lg font-black tracking-tighter text-white">
                EVENT<span className="text-sky-500">SPHERE</span>
              </h2>
            </div>

                        <button 
                          onClick={() => setIsOpen(false)}
                          className="lg:hidden p-2 bg-white/5 rounded-lg border border-white/10 text-slate-400 hover:text-white transition-all active:scale-90 shrink-0"
                        >
                          <X size={20} />
                        </button>
          </div>

          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
            Exhibitor Menu
          </p>

          <nav className="space-y-1">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]"
                      : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-sky-400" : ""}>{item.icon}</span>
                    <span className="font-bold text-sm tracking-tight">{item.title}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="animate-pulse" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* PROFILE SECTION - Properly pushed to bottom */}
        <div className="space-y-4 pt-6 mt-10">
          <div className="px-4 py-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-sm font-black uppercase shadow-md shadow-sky-500/20">
                  {user?.name ? user.name.charAt(0) : "E"}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#020617] rounded-full" />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-white leading-none truncate mb-1">
                  {user?.name || "User Name"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">
                    Exhibitor
                  </span>
                  <span className="text-slate-600">•</span>
                  <p className="text-[10px] text-slate-500 font-medium italic">Online</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all duration-300 group border border-transparent hover:border-rose-500/20"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default ExhibitorSidebar;