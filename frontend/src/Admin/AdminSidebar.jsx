// // import React from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";

// // import {
// //   LayoutDashboard,
// //   Users,
// //   CalendarDays,
// //   BarChart3,
// //   Info,
// //   Mail,
// //   LogOut,
// //   ChevronRight,
// //   Inbox,
// //   Briefcase,
 
// //   Headset, // ✅ added for Booth Requests
// // } from "lucide-react";

// // function AdminSidebar() {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const menu = [
// //     { title: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
// //     { title: "Users", path: "/admin/users", icon: <Users size={20} /> },
// //     { title: "Expos", path: "/admin/expos", icon: <CalendarDays size={20} /> },

// //     // ✅ NEW ITEM (UI same, just added)
// //     { title: "Booth Requests", path: "/admin/booth-requests", icon: <Inbox size={20} /> },
// //      // ✅ NEW: Exhibitors list
// //   { title: "Exhibitors List", path: "/admin/exhibitors", icon: <Briefcase size={20} /> },
 
// //     { title: "Reports", path: "/admin/reports", icon: <BarChart3 size={20} /> },
// //     { title: "About", path: "/admin/about", icon: <Info size={20} /> },
// //     { title: "Contact", path: "/admin/contact", icon: <Mail size={20} /> },
// //      // ✅ NEW — Feedback View
// //   { title: "Feedback & Support", path: "/admin/feedback", icon: <Headset size={20} /> },
    
// //   ];

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     navigate("/login");
// //   };

// //   return (
// //     <aside className="w-64 min-h-screen bg-[#020617] text-white p-6 border-r border-slate-800 flex flex-col justify-between sticky top-0 h-screen">
// //       {/* BRANDING */}
// //       <div>
// //         <div className="flex items-center gap-3 mb-10 px-2">
// //           <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20">
// //             <LayoutDashboard size={18} className="text-white" />
// //           </div>
// //           <h2 className="text-xl font-black tracking-tighter">
// //             EVENT<span className="text-sky-500">SPHERE</span>
// //           </h2>
// //         </div>

// //         {/* NAVIGATION */}
// //         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
// //           Main Menu
// //         </p>

// //         <nav className="space-y-1">
// //           {menu.map((item) => {
// //             const isActive = location.pathname === item.path;

// //             return (
// //               <Link
// //                 key={item.title}
// //                 to={item.path}
// //                 className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
// //                   isActive
// //                     ? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]"
// //                     : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-100"
// //                 }`}
// //               >
// //                 <div className="flex items-center gap-3">
// //                   <span
// //                     className={`transition-transform duration-300 ${
// //                       isActive ? "scale-110" : "group-hover:scale-110"
// //                     }`}
// //                   >
// //                     {item.icon}
// //                   </span>
// //                   <span className="font-bold text-sm tracking-tight">
// //                     {item.title}
// //                   </span>
// //                 </div>

// //                 {isActive && <ChevronRight size={14} className="animate-pulse" />}
// //               </Link>
// //             );
// //           })}
// //         </nav>
// //       </div>

// //       {/* FOOTER / LOGOUT */}
// //       <div className="space-y-4">
// //         <div className="px-4 py-4 rounded-2xl bg-slate-900/50 border border-slate-800">
// //           <div className="flex items-center gap-3">
// //             <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-[10px] font-bold">
// //               AD
// //             </div>
// //             <div>
// //               <p className="text-xs font-bold text-white leading-none">
// //                 Admin Root
// //               </p>
// //               <p className="text-[10px] text-slate-500 mt-1">
// //                 System Controller
// //               </p>
// //             </div>
// //           </div>
// //         </div>

// //         <button
// //           onClick={handleLogout}
// //           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold
// //                      text-rose-500 hover:bg-rose-500/10 transition-colors group"
// //         >
// //           <LogOut
// //             size={18}
// //             className="group-hover:-translate-x-1 transition-transform"
// //           />
// //           <span>Sign Out</span>
// //         </button>
// //       </div>
// //     </aside>
// //   );
// // }

// // export default AdminSidebar;

// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   CalendarDays,
//   BarChart3,
//   Info,
//   Mail,
//   LogOut,
//   ChevronRight,
//   Inbox,
//   Briefcase,
//   Headset,
//   X,
// } from "lucide-react";

// function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const menu = [
//     { title: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
//     { title: "Users", path: "/admin/users", icon: <Users size={20} /> },
//     { title: "Expos", path: "/admin/expos", icon: <CalendarDays size={20} /> },
//     { title: "Booth Requests", path: "/admin/booth-requests", icon: <Inbox size={20} /> },
//     { title: "Exhibitors List", path: "/admin/exhibitors", icon: <Briefcase size={20} /> },
//     { title: "Reports", path: "/admin/reports", icon: <BarChart3 size={20} /> },
//     { title: "About", path: "/admin/about", icon: <Info size={20} /> },
//     { title: "Contact", path: "/admin/contact", icon: <Mail size={20} /> },
//     { title: "Feedback & Support", path: "/admin/feedback", icon: <Headset size={20} /> },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <>
//       {/* ✅ Overlay for mobile */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//         />
//       )}

//       <aside
//         className={`
//           fixed top-0 left-0 h-screen w-64
//           bg-[#020617] text-white
//           p-6 border-r border-slate-800
//           flex flex-col justify-between
//           transform transition-transform duration-300 z-50
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           lg:translate-x-0 lg:flex
//         `}
//       >
//         {/* Close Button (Mobile Only) */}
//         <div className="lg:hidden flex justify-end mb-4">
//           <button onClick={() => setSidebarOpen(false)}>
//             <X size={22} />
//           </button>
//         </div>

//         {/* BRANDING */}
//         <div>
//           <div className="flex items-center gap-3 mb-10 px-2">
//             <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20">
//               <LayoutDashboard size={18} className="text-white" />
//             </div>
//             <h2 className="text-xl font-black tracking-tighter">
//               EVENT<span className="text-sky-500">SPHERE</span>
//             </h2>
//           </div>

//           <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
//             Main Menu
//           </p>

//           <nav className="space-y-1">
//             {menu.map((item) => {
//               const isActive = location.pathname === item.path;

//               return (
//                 <Link
//                   key={item.title}
//                   to={item.path}
//                   onClick={() => setSidebarOpen(false)}
//                   className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
//                     isActive
//                       ? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]"
//                       : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-100"
//                   }`}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span
//                       className={`transition-transform duration-300 ${
//                         isActive ? "scale-110" : "group-hover:scale-110"
//                       }`}
//                     >
//                       {item.icon}
//                     </span>
//                     <span className="font-bold text-sm tracking-tight">
//                       {item.title}
//                     </span>
//                   </div>

//                   {isActive && (
//                     <ChevronRight size={14} className="animate-pulse" />
//                   )}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         {/* FOOTER */}
//         <div className="space-y-4">
//           <div className="px-4 py-4 rounded-2xl bg-slate-900/50 border border-slate-800">
//             <div className="flex items-center gap-3">
//               <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-[10px] font-bold">
//                 AD
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-white leading-none">
//                   Admin Root
//                 </p>
//                 <p className="text-[10px] text-slate-500 mt-1">
//                   System Controller
//                 </p>
//               </div>
//             </div>
//           </div>

//           <button
//             onClick={handleLogout}
//             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold
//                        text-rose-500 hover:bg-rose-500/10 transition-colors group"
//           >
//             <LogOut
//               size={18}
//               className="group-hover:-translate-x-1 transition-transform"
//             />
//             <span>Sign Out</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }

// export default AdminSidebar;












import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BarChart3,
  Info,
  Mail,
  LogOut,
  ChevronRight,
  Inbox,
  Briefcase,
  Headset,
  X,
  Building2,
} from "lucide-react";

function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { title: "Dashboard", path: "/admin", icon: <LayoutDashboard size={20} /> },
    { title: "Users", path: "/admin/users", icon: <Users size={20} /> },
    { title: "Expos", path: "/admin/expos", icon: <CalendarDays size={20} /> },
    { title: "Booth Requests", path: "/admin/booth-requests", icon: <Inbox size={20} /> },
    { title: "Exhibitors List", path: "/admin/exhibitors", icon: <Briefcase size={20} /> },
    { title: "Reports", path: "/admin/reports", icon: <BarChart3 size={20} /> },
    { title: "About", path: "/admin/about", icon: <Info size={20} /> },
    { title: "Contact", path: "/admin/contact", icon: <Mail size={20} /> },
    { title: "Feedback & Support", path: "/admin/feedback", icon: <Headset size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-[50] w-72 bg-[#020617] text-white
          border-r border-slate-800/50 flex flex-col h-screen transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 shadow-2xl
        `}
      >
        {/* 1. TOP & MENU AREA (Scrollable) */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 pb-2"> 
          
          {/* Branding */}
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-transform group-hover:rotate-6">
            <span className="text-white font-black text-lg italic uppercase leading-none">E</span>
          </div>
              <h2 className="text-xl font-black tracking-tighter text-white">
                EVENT<span className="text-sky-500">SPHERE</span>
              </h2>
            </div>

            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 bg-white/5 rounded-lg border border-white/10 text-slate-400"
            >
              <X size={18} />
            </button>
          </div>

          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
            Main Menu
          </p>

          <nav className="space-y-1">
            {menu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.title}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]"
                      : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? "text-sky-400 scale-110" : ""}>{item.icon}</span>
                    <span className="font-bold text-sm tracking-tight">{item.title}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="animate-pulse" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 2. FIXED FOOTER (Hamesha nazar aayega) */}
        <div className="px-6 py-4 border-t border-slate-800/50 bg-[#020617]">
          <div className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/5 shadow-lg mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-sm font-black shadow-md">
                A
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate leading-tight">Admin</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] text-slate-500 font-medium truncate">System Controller</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all duration-300 group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AdminSidebar;