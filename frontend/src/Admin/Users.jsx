// import React, { useEffect, useState } from "react";
// import { Search, Edit2, Trash2, Check, X, User as UserIcon, Shield } from "lucide-react";
// import AdminSidebar from "./AdminSidebar";

// function Users() {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [editUserId, setEditUserId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/users");
//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setUsers(data);
//         setFilteredUsers(data);
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error("Failed to fetch users", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchUsers(); }, []);

//   useEffect(() => {
//     const filtered = users.filter(
//       (u) =>
//         u.name.toLowerCase().includes(search.toLowerCase()) ||
//         u.email.toLowerCase().includes(search.toLowerCase()) ||
//         u.role.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredUsers(filtered);
//   }, [search, users]);

//   const saveUser = async (id) => {
//     try {
//       const res = await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/users/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editForm),
//       });
//       if (!res.ok) throw new Error("Update failed");
//       setEditUserId(null);
//       fetchUsers();
//     } catch (err) {
//       alert("Failed to update user");
//     }
//   };

//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure?")) return;
//     try {
//       const res = await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/users/${id}`, { method: "DELETE" });
//       if (!res.ok) throw new Error("Delete failed");
//       setUsers((prev) => prev.filter((u) => u._id !== id));
//     } catch (err) {
//       alert("Failed to delete user");
//     }
//   };

//   // Helper to color-code roles
//   const getRoleBadge = (role) => {
//     const styles = {
//       admin: "bg-rose-500/20 text-rose-400 border-rose-500/30",
//       exhibitor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
//       attendee: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
//       user: "bg-slate-500/20 text-slate-400 border-slate-500/30",
//     };
//     return styles[role?.toLowerCase()] || styles.user;
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100">
//       <AdminSidebar />

//       <div className="flex-1 p-8 lg:p-12 overflow-x-hidden">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//           <div>
//             <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
//               <Shield className="text-sky-400" size={32} />
//               User Management
//             </h1>
//             <p className="text-slate-400 mt-2">Manage permissions and view platform activity.</p>
//           </div>

//           {/* Search Bar */}
//           <div className="relative group w-full max-w-md">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-sky-400 transition-colors" size={18} />
//             <input
//               type="text"
//               placeholder="Search users..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/10 transition-all outline-none text-slate-200"
//             />
//           </div>
//         </div>

//         {/* Table Container */}
//         <div className="bg-slate-900/40 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
//           {loading ? (
//             <div className="p-20 text-center animate-pulse text-sky-400 font-medium">Loading records...</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="w-full text-left border-collapse">
//                 <thead>
//                   <tr className="bg-slate-800/50 border-b border-slate-700/50">
//                     <th className="p-5 text-sm font-semibold uppercase tracking-wider text-slate-400">User Details</th>
//                     <th className="p-5 text-sm font-semibold uppercase tracking-wider text-slate-400">Access Level</th>
//                     <th className="p-5 text-sm font-semibold uppercase tracking-wider text-slate-400">Joined</th>
//                     <th className="p-5 text-sm font-semibold uppercase tracking-wider text-slate-400 text-right">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-800/50">
//                   {filteredUsers.map((user) => (
//                     <tr key={user._id} className="hover:bg-sky-500/5 transition-colors group">
//                       {/* Name & Email Column */}
//                       <td className="p-5">
//                         <div className="flex items-center gap-4">
//                           <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
//                             <UserIcon size={20} />
//                           </div>
//                           <div className="flex flex-col">
//                             {editUserId === user._id ? (
//                               <input
//                                 value={editForm.name}
//                                 onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
//                                 className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-sm outline-none focus:border-sky-400"
//                               />
//                             ) : (
//                               <span className="font-semibold text-slate-100">{user.name}</span>
//                             )}
//                             {editUserId === user._id ? (
//                               <input
//                                 value={editForm.email}
//                                 onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
//                                 className="mt-1 bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs outline-none focus:border-sky-400"
//                               />
//                             ) : (
//                               <span className="text-xs text-slate-500">{user.email}</span>
//                             )}
//                           </div>
//                         </div>
//                       </td>

//                       {/* Role Column */}
//                       <td className="p-5">
//                         {editUserId === user._id ? (
//                           <select
//                             value={editForm.role}
//                             onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
//                             className="bg-slate-800 text-sm border border-slate-600 rounded px-2 py-1 outline-none"
//                           >
//                             <option value="exhibitor">Exhibitor</option>
//                             <option value="attendee">Attendee</option>
//                             <option value="user">User</option>
//                           </select>
//                         ) : (
//                           <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest border ${getRoleBadge(user.role)}`}>
//                             {user.role}
//                           </span>
//                         )}
//                       </td>

//                       {/* Date Column */}
//                       <td className="p-5 text-sm text-slate-400">
//                         {new Date(user.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
//                       </td>

//                       {/* Actions Column */}
//                       <td className="p-5">
//                         <div className="flex justify-end gap-2">
//                           {editUserId === user._id ? (
//                             <>
//                               <button onClick={() => saveUser(user._id)} className="p-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-colors">
//                                 <Check size={18} />
//                               </button>
//                               <button onClick={() => setEditUserId(null)} className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors">
//                                 <X size={18} />
//                               </button>
//                             </>
//                           ) : (
//                             <>
//                               <button
//                                 onClick={() => {
//                                   setEditUserId(user._id);
//                                   setEditForm({ name: user.name, email: user.email, role: user.role });
//                                 }}
//                                 className="p-2 bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
//                               >
//                                 <Edit2 size={18} />
//                               </button>
//                               <button
//                                 onClick={() => deleteUser(user._id)}
//                                 className="p-2 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
//                               >
//                                 <Trash2 size={18} />
//                               </button>
//                             </>
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//               {filteredUsers.length === 0 && (
//                 <div className="p-12 text-center text-slate-500">No users found matching your search.</div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Users;




import React, { useEffect, useState } from "react";
import {
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  User as UserIcon,
  Shield,
  Menu
} from "lucide-react";
import AdminSidebar from "./AdminSidebar";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", role: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/users");
      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
        setFilteredUsers(data);
      }
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  useEffect(() => {
    const filtered = users.filter(
      (u) =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.role?.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [search, users]);

  const saveUser = async (id) => {
    try {
      const res = await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error();
      setEditUserId(null);
      fetchUsers();
    } catch {
      alert("Failed to update user");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const res = await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/users/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      alert("Failed to delete user");
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      admin: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      exhibitor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      attendee: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      user: "bg-slate-500/20 text-slate-400 border-slate-500/30",
    };
    return styles[role?.toLowerCase()] || styles.user;
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100">

      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-64">

      
        {/* ✅ Mobile Header (Clean & Minimal) */}
<div className="lg:hidden flex items-center justify-between p-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
  <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-800/50 rounded-lg text-white">
    <Menu size={20} />
  </button>
  
  {/* Mobile ke liye chota label */}
  <div className="flex items-center gap-2">
    {/* <Shield className="h-4 w-4 text-sky-400" /> */}
    <span className="text-sky-400 font-extrabold text-xs tracking-tight">Access Control</span>
  </div>
  
  <div className="w-8" /> {/* Balance ke liye spacer */}
</div>

<div className="flex-1 px-4 sm:px-8 lg:px-12 py-8">
  {/* ✅ Main Header (Design consistent with other pages) */}
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 text-center md:text-left">
    <div>
      <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
        <Shield className="h-5 w-5 text-sky-400" />
        <span className="text-sky-400 font-bold tracking-[0.2em] text-[10px] uppercase">
          Security & Permissions
        </span>
      </div>
      
      <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white italic leading-none">
        User <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Management</span>
      </h1>
      
      <p className="text-slate-400 mt-4 text-sm md:text-base font-medium opacity-80">
        Manage permissions and view platform activity.
      </p>
    </div>
  
         
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 focus:border-sky-500 outline-none"
              />
            </div>
          </div>

          {/* ✅ Desktop Table */}
          <div className="hidden md:block bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden shadow-xl">
            {loading ? (
              <div className="p-20 text-center text-sky-400">Loading records...</div>
            ) : (
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="p-5 text-left text-sm text-slate-400">User Details</th>
                    <th className="p-5 text-left text-sm text-slate-400">Access Level</th>
                    <th className="p-5 text-left text-sm text-slate-400">Joined</th>
                    <th className="p-5 text-right text-sm text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {filteredUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-slate-800/40 transition">

                      <td className="p-5">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 flex items-center justify-center bg-sky-500/20 rounded-full">
                            <UserIcon size={18} />
                          </div>
                          <div>
                            {editUserId === user._id ? (
                              <div className="flex flex-col gap-2">
                                <input
                             value={editForm.name}
                             onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                             className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm"
                                  />
                                  <input
                           value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                               className="bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm"
                                  />
                                </div>
                            ) : (
                              <>
                                <div className="font-semibold">{user.name}</div>
                                <div className="text-xs text-slate-400">{user.email}</div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="p-5">
                        {editUserId === user._id ? (
                          <select
                            value={editForm.role}
                            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                            className="bg-slate-800 border border-slate-600 rounded px-2 py-1"
                          >
                            <option value="exhibitor">Exhibitor</option>
                            <option value="attendee">Attendee</option>
                            <option value="user">User</option>
                          </select>
                        ) : (
                          <span className={`px-3 py-1 rounded-full text-xs border ${getRoleBadge(user.role)}`}>
                            {user.role}
                          </span>
                        )}
                      </td>

                      <td className="p-5 text-sm text-slate-400">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-2">
                          {editUserId === user._id ? (
                            <>
                              <button onClick={() => saveUser(user._id)} className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
                                <Check size={18} />
                              </button>
                              <button onClick={() => setEditUserId(null)} className="p-2 bg-rose-500/20 text-rose-400 rounded-lg">
                                <X size={18} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => {
                                  setEditUserId(user._id);
                                  setEditForm({ name: user.name, email: user.email, role: user.role });
                                }}
                                className="p-2 bg-sky-500/20 text-sky-400 rounded-lg"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => deleteUser(user._id)}
                                className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"
                              >
                                <Trash2 size={18} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        {/* ✅ Mobile Cards Clean Layout */}
<div className="md:hidden space-y-5">
  {filteredUsers.map((user) => (
    <div key={user._id} className="bg-slate-900/50 rounded-3xl border border-slate-800 p-5 shadow-lg">

      {editUserId === user._id ? (
        <>
          <input
            value={editForm.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
            className="w-full mb-2 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm"
          />

          <input
            value={editForm.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
            className="w-full mb-2 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm"
          />

          <select
            value={editForm.role}
            onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
            className="w-full mb-3 bg-slate-800 border border-slate-600 rounded px-3 py-2 text-sm"
          >
            <option value="exhibitor">Exhibitor</option>
            <option value="attendee">Attendee</option>
            <option value="user">User</option>
          </select>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => saveUser(user._id)}
              className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => setEditUserId(null)}
              className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"
            >
              <X size={18} />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-12 h-12 flex items-center justify-center bg-sky-500/20 rounded-full">
              <UserIcon size={20} />
            </div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-slate-400">{user.email}</div>
            </div>
          </div>

          <div className="flex justify-between text-sm mb-2">
            <span className="text-slate-400">Role</span>
            <span className={`px-3 py-1 rounded-full text-xs border ${getRoleBadge(user.role)}`}>
              {user.role}
            </span>
          </div>

          <div className="flex justify-between text-sm mb-4">
            <span className="text-slate-400">Joined</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setEditUserId(user._id);
                setEditForm({ name: user.name, email: user.email, role: user.role });
              }}
              className="p-2 bg-sky-500/20 text-sky-400 rounded-lg"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => deleteUser(user._id)}
              className="p-2 bg-rose-500/20 text-rose-400 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </>
      )}

    </div>
  ))}
 
          </div>

        </div>
      </div>
    </div>
  );
}

export default Users;