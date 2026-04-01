// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Users,
//   CalendarDays,
//   Bookmark,
//   MessageSquare,
//   LogOut,
//   ChevronRight,
//   CalendarCheck,
// } from "lucide-react";

// function AttendeeSidebar() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   // ✅ Get Logged-in User
//   const user = JSON.parse(localStorage.getItem("user"));

//   const menu = [
//      { title: "Dashboard", path: "/attendee/dashboard", icon: <LayoutDashboard  size={20} /> },
//     { title: "Exhibitors", path: "/attendee/exhibitors", icon: <Users size={20} /> },
//     { title: "My Schedule", path: "/attendee/schedule", icon: <CalendarDays size={20} /> },
//     { title: "Bookmarks", path: "/attendee/bookmarks", icon: <Bookmark size={20} /> },
//     { title: "My Interests", path: "/attendee/interests", icon: <MessageSquare size={20} /> },
//     { title: "Messages", path: "/attendee/messages", icon: <MessageSquare size={20} /> },
//     { title: "My Appointments", path: "/attendee/appointments", icon: <CalendarCheck size={20} /> },
//     { title: "Feedback & Support", path: "/attendee/feedback", icon: <MessageSquare size={20} /> },
//   ];

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <aside className="w-64 min-h-screen bg-[#020617] text-white p-6 border-r border-slate-800 flex flex-col justify-between fixed left-0 top-0 h-screen">

//       {/* TOP SECTION */}
//       <div>
//         <div className="flex items-center gap-3 mb-10 px-2">
//           <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center shadow-lg shadow-sky-500/20">
//             <LayoutDashboard size={18} className="text-white" />
//           </div>
//           <h2 className="text-xl font-black tracking-tighter">
//             EVENT<span className="text-sky-500">SPHERE</span>
//           </h2>
//         </div>

//         <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">
//           Navigation
//         </p>

//         <nav className="space-y-1">
//           {menu.map((item) => {
//             const isActive = location.pathname === item.path;

//             return (
//               <Link
//                 key={item.title}
//                 to={item.path}
//                 className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
//                   isActive
//                     ? "bg-sky-500/10 text-sky-400 shadow-[inset_0_0_20px_rgba(14,165,233,0.05)]"
//                     : "hover:bg-slate-800/50 text-slate-400 hover:text-slate-100"
//                 }`}
//               >
//                 <div className="flex items-center gap-3">
//                   <span
//                     className={`transition-transform duration-300 ${
//                       isActive ? "scale-110" : "group-hover:scale-110"
//                     }`}
//                   >
//                     {item.icon}
//                   </span>
//                   <span className="font-bold text-sm tracking-tight">
//                     {item.title}
//                   </span>
//                 </div>

//                 {isActive && (
//                   <ChevronRight size={14} className="animate-pulse" />
//                 )}
//               </Link>
//             );
//           })}
//         </nav>
//       </div>

//       {/* ✅ BOTTOM PROFILE SECTION */}
//       <div className="space-y-4">
//         <div className="px-4 py-4 rounded-2xl bg-slate-900/50 border border-slate-800">
//           <div className="flex items-center gap-3">

//             {/* Dynamic Initial */}
//             <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-sm font-bold uppercase shadow-md">
//               {user?.name ? user.name.charAt(0) : "A"}
//             </div>

//             <div>
//               {/* ✅ Dynamic Name */}
//               <p className="text-sm font-bold text-white leading-none">
//                 {user?.name || "Attendee"}
//               </p>

//                  <div className="flex items-center gap-1 mt-1">
//                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
//                 <p className="text-[10px] text-slate-500 font-medium">
//                  Attendee
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold
//                      text-rose-500 hover:bg-rose-500/10 transition-colors group"
//         >
//           <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
//           <span>Sign Out</span>
//         </button>
//       </div>
//     </aside>
//   );
// }

// export default AttendeeSidebar;



import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Bookmark,
MessageSquareText,
  LogOut,
  ChevronRight,
  CalendarCheck,
  X,
  Building2,
  Target,
  LifeBuoy,
} from "lucide-react";

function AttendeeSidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const menu = [
    { title: "Dashboard", path: "/attendee/dashboard", icon: <LayoutDashboard size={20} /> },
    { title: "Exhibitors", path: "/attendee/exhibitors", icon: <Users size={20} /> },
    { title: "My Schedule", path: "/attendee/schedule", icon: <CalendarDays size={20} /> },
    { title: "Bookmarks", path: "/attendee/bookmarks", icon: <Bookmark size={20} /> },
    { title: "My Interests", path: "/attendee/interests", icon: <Target size={20} /> },
    { title: "Messages", path: "/attendee/messages", icon: <MessageSquareText size={20} /> },
    { title: "My Appointments", path: "/attendee/appointments", icon: <CalendarCheck size={20} /> },
    { title: "Feedback & Support", path: "/attendee/feedback", icon: <LifeBuoy size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      {/* OVERLAY (Mobile Only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

     {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[50] w-72 bg-[#020617] text-white p-6 border-r border-slate-800/50 
          flex flex-col h-screen transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 shadow-2xl
        `}
      >
        <div className="flex-1">
          {/* TOP SECTION - Fixed Spacing and Alignment */}
          <div className="flex items-center justify-between mb-10 px-2"> 
            <div className="flex items-center gap-3 shrink-0">
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
            Attendee Menu
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
                    <span className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                      {item.icon}
                    </span>
                    <span className="font-bold text-sm tracking-tight">{item.title}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="animate-pulse" />}
                </Link>
              );
            })}
          </nav>
        </div>
 
        {/* BOTTOM PROFILE SECTION */}
        <div className="space-y-4 pt-6">
          <div className="px-4 py-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-sm font-bold uppercase shadow-md">
                {user?.name ? user.name.charAt(0) : "A"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white leading-none truncate">{user?.name || "Attendee"}</p>
                <div className="flex items-center gap-1 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[10px] text-slate-500 font-medium">Attendee</p>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-colors group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default AttendeeSidebar;