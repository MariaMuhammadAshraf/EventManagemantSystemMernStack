// import React, { useEffect, useState } from "react";
// import { Plus, MapPin, Calendar, Edit3, Trash2, Eye, X, Image as ImageIcon } from "lucide-react"; // npm install lucide-react
// import AdminSidebar from "./AdminSidebar";

// function AdminExpos() {
//   const [expos, setExpos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedExpo, setSelectedExpo] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     theme: "",
//     description: "",
//     location: "",
//     startDate: "",
//     endDate: "",
//     registrationDeadline: "",
//     image: "",
//     availability: "available",
//   });

//   const fetchExpos = async () => {
//     try {
//       const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/expos");
//       const data = await res.json();
//       setExpos(data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchExpos(); }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isEditMode ? `https://event-managemant-system-mern-stack.vercel.app//api/expos/${selectedExpo._id}` : "https://event-managemant-system-mern-stack.vercel.app//api/expos";
//     const method = isEditMode ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     setShowModal(false);
//     setIsEditMode(false);
//     setSelectedExpo(null);
//     resetForm();
//     fetchExpos();
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "", theme: "", description: "", location: "",
//       startDate: "", endDate: "", registrationDeadline: "",
//       image: "", availability: "available",
//     });
//   };

//   const handleEdit = (expo) => {
//     setIsEditMode(true);
//     setSelectedExpo(expo);
//     setFormData({
//       title: expo.title,
//       theme: expo.theme,
//       description: expo.description,
//       location: expo.location,
//       startDate: expo.startDate?.slice(0, 10),
//       endDate: expo.endDate?.slice(0, 10),
//       registrationDeadline: expo.registrationDeadline?.slice(0, 10),
//       image: expo.image,
//       availability: expo.availability,
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;
//     await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/expos/${id}`, { method: "DELETE" });
//     fetchExpos();
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100">
//       <AdminSidebar />

//       <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
//         {/* HEADER SECTION */}
//         <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
//           <div>
//             <p className="text-sky-400 font-medium mb-1">Event Management</p>
//             <h1 className="text-4xl font-extrabold tracking-tight text-white">Manage Expos</h1>
//           </div>
//           <button
//             onClick={() => { setIsEditMode(false); resetForm(); setShowModal(true); }}
//             className="group bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-sky-900/20 flex items-center gap-2"
//           >
//             <Plus size={20} className="group-hover:rotate-90 transition-transform" />
//             Create Expo
//           </button>
//         </header>

//         {/* EXPO GRID */}
//         {loading ? (
//           <div className="flex items-center justify-center h-64 text-sky-400 animate-pulse font-medium">
//             Fetching upcoming events...
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
//             {expos.map((expo) => (
//               <div key={expo._id} className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-2xl transition-all hover:border-sky-500/50 overflow-hidden">
//                 {/* Image Section */}
//                 <div className="relative h-44 w-full bg-slate-800">
//                   {expo.image ? (
//                     <img src={expo.image} alt={expo.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center text-slate-600"><ImageIcon size={40} /></div>
//                   )}
//                   <div className="absolute top-4 left-4">
//                     <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border shadow-sm ${
//                       expo.availability === "available" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40" : "bg-rose-500/20 text-rose-400 border-rose-500/40"
//                     }`}>
//                       {expo.availability === "available" ? "• Active" : "• Closed"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Content Section */}
//                 <div className="p-6 flex-1 flex flex-col">
//                   <h2 className="text-xl font-bold text-white mb-1 leading-tight">{expo.title}</h2>
//                   <p className="text-xs font-bold text-sky-500 uppercase tracking-tighter mb-3">{expo.theme}</p>
//                   <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-1 italic">"{expo.description}"</p>

//                   <div className="space-y-2 mb-6">
//                     <div className="flex items-center gap-2 text-xs text-slate-300">
//                       <MapPin size={14} className="text-sky-400" /> {expo.location}
//                     </div>
//                     <div className="flex items-center gap-2 text-xs text-slate-300">
//                       <Calendar size={14} className="text-sky-400" /> {new Date(expo.startDate).toLocaleDateString()}
//                     </div>
//                   </div>

//                   {/* Actions */}
//                   <div className="flex gap-2 pt-4 border-t border-slate-800">
//                     <button onClick={() => setSelectedExpo(expo)} className="flex-1 flex justify-center py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-sky-500 hover:text-white transition-all"><Eye size={18} /></button>
//                     <button onClick={() => handleEdit(expo)} className="flex-1 flex justify-center py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-amber-500 hover:text-white transition-all"><Edit3 size={18} /></button>
//                     <button onClick={() => handleDelete(expo._id)} className="flex-1 flex justify-center py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-rose-600 hover:text-white transition-all"><Trash2 size={18} /></button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* CREATE / EDIT MODAL */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6">
//             <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
//               <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
//                 <h2 className="text-2xl font-black text-white">{isEditMode ? "Update Expo" : "New Expo"}</h2>
//                 <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto scrollbar-hide">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {[["title", "Expo Title"], ["theme", "Theme"], ["location", "Location"], ["image", "Image URL"]].map(([name, label]) => (
//                     <div key={name} className="flex flex-col gap-2">
//                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
//                       <input name={name} value={formData[name]} onChange={handleChange} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
//                   <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all resize-none" />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {[["startDate", "Start"], ["endDate", "End"], ["registrationDeadline", "Deadline"]].map(([name, label]) => (
//                     <div key={name} className="flex flex-col gap-2">
//                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
//                       <input type="date" name={name} value={formData[name]} onChange={handleChange} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none text-xs" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</label>
//                   <select name="availability" value={formData.availability} onChange={handleChange} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none">
//                     <option value="available" className="bg-slate-900 text-white">Available</option>
//                     <option value="not_available" className="bg-slate-900 text-white">Not Available</option>
//                   </select>
//                 </div>

//                 <div className="flex justify-end gap-3 pt-6">
//                   <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
//                   <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-3 rounded-xl font-bold transition-all shadow-lg shadow-emerald-900/20">
//                     {isEditMode ? "Save Changes" : "Launch Expo"}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* VIEW DETAILS MODAL */}
//         {selectedExpo && !isEditMode && (
//           <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-6">
//             <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative">
//               <button onClick={() => setSelectedExpo(null)} className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"><X size={20} /></button>
              
//               <div className="h-64 w-full relative">
//                 <img src={selectedExpo.image} alt="" className="w-full h-full object-cover" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
//               </div>

//               <div className="p-10 -mt-16 relative">
//                 <h2 className="text-4xl font-black text-white mb-2">{selectedExpo.title}</h2>
//                 <p className="text-sky-400 font-bold uppercase tracking-widest mb-8">{selectedExpo.theme}</p>

//                 <div className="grid grid-cols-2 gap-4 mb-8">
//                   <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
//                     <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Venue</p>
//                     <p className="text-white text-sm font-medium">{selectedExpo.location}</p>
//                   </div>
//                   <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
//                     <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">Dates</p>
//                     <p className="text-white text-sm font-medium">{new Date(selectedExpo.startDate).toLocaleDateString()} - {new Date(selectedExpo.endDate).toLocaleDateString()}</p>
//                   </div>
//                 </div>

//                 <p className="text-slate-400 leading-relaxed mb-10 text-lg italic">"{selectedExpo.description}"</p>

//                 <button onClick={() => setSelectedExpo(null)} className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-xl shadow-sky-900/20">
//                   Return to Dashboard
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default AdminExpos;







// import React, { useEffect, useState } from "react";
// import {
//   Plus, MapPin, Calendar, Edit3, Trash2,
//   Eye, X, Image as ImageIcon, Menu
// } from "lucide-react";

// import AdminSidebar from "./AdminSidebar";

// function AdminExpos() {
//   const [expos, setExpos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedExpo, setSelectedExpo] = useState(null);
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [formData, setFormData] = useState({
//     title: "",
//     theme: "",
//     description: "",
//     location: "",
//     startDate: "",
//     endDate: "",
//     registrationDeadline: "",
//     image: "",
//     availability: "available",
//   });

//   const fetchExpos = async () => {
//     try {
//       const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/expos");
//       const data = await res.json();
//       setExpos(data);
//       setLoading(false);
//     } catch {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchExpos(); }, []);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isEditMode
//       ? `https://event-managemant-system-mern-stack.vercel.app//api/expos/${selectedExpo._id}`
//       : "https://event-managemant-system-mern-stack.vercel.app//api/expos";
//     const method = isEditMode ? "PUT" : "POST";

//     await fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     setShowModal(false);
//     setIsEditMode(false);
//     setSelectedExpo(null);
//     resetForm();
//     fetchExpos();
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "", theme: "", description: "", location: "",
//       startDate: "", endDate: "", registrationDeadline: "",
//       image: "", availability: "available",
//     });
//   };

//   const handleEdit = (expo) => {
//     setIsEditMode(true);
//     setSelectedExpo(expo);
//     setFormData({
//       title: expo.title,
//       theme: expo.theme,
//       description: expo.description,
//       location: expo.location,
//       startDate: expo.startDate?.slice(0, 10),
//       endDate: expo.endDate?.slice(0, 10),
//       registrationDeadline: expo.registrationDeadline?.slice(0, 10),
//       image: expo.image,
//       availability: expo.availability,
//     });
//     setShowModal(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this event?")) return;
//     await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/expos/${id}`, { method: "DELETE" });
//     fetchExpos();
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100">

//       <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

//       <div className="flex-1 flex flex-col lg:ml-64">

//         {/* ✅ Mobile Topbar */}
//         <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-800">
//           <button onClick={() => setSidebarOpen(true)}>
//             <Menu size={24} />
//           </button>
//           <span className="font-bold text-sm">Manage Expos</span>
//           <div />
//         </div>

//         <main className="flex-1 p-8 lg:p-12 overflow-y-auto">

//           {/* HEADER */}
//          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

//   <div className="text-center md:text-left">
//     <p className="text-sky-400 font-medium mb-2">
//       Event Management
//     </p>

//     <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
//       Manage Expos
//     </h1>
//   </div>

//   <div className="flex justify-center md:justify-end">
//     <button
//       onClick={() => { setIsEditMode(false); resetForm(); setShowModal(true); }}
//       className="group bg-sky-600 hover:bg-sky-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-sky-900/20 flex items-center gap-2"
//     >
//       <Plus size={20} className="group-hover:rotate-90 transition-transform" />
//       Create Expo
//     </button>
//   </div>

// </header>

//           {/* GRID */}
//           {loading ? (
//             <div className="flex items-center justify-center h-64 text-sky-400">
//               Fetching upcoming events...
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-10">
//               {expos.map((expo) => (
//                 <div key={expo._id}
//                   className="group flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md shadow-2xl overflow-hidden">

//                   <div className="relative h-44 w-full bg-slate-800">
//                     {expo.image ? (
//                       <img src={expo.image} alt={expo.title}
//                         className="h-full w-full object-cover" />
//                     ) : (
//                       <div className="h-full w-full flex items-center justify-center text-slate-600">
//                         <ImageIcon size={40} />
//                       </div>
//                     )}
//                   </div>

//                   <div className="p-6 flex-1 flex flex-col">
//                     <h2 className="text-xl font-bold text-white mb-1">
//                       {expo.title}
//                     </h2>

//                     <p className="text-xs font-bold text-sky-500 uppercase mb-3">
//                       {expo.theme}
//                     </p>

//                     <p className="text-slate-400 text-sm line-clamp-2 mb-6 flex-1 italic">
//                       "{expo.description}"
//                     </p>

//                     <div className="space-y-2 mb-6">
//                       <div className="flex items-center gap-2 text-xs text-slate-300">
//                         <MapPin size={14} /> {expo.location}
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-slate-300">
//                         <Calendar size={14} />
//                         {new Date(expo.startDate).toLocaleDateString()}
//                       </div>
//                     </div>

//                     <div className="flex gap-2 pt-4 border-t border-slate-800">
//                       <button onClick={() => setSelectedExpo(expo)}
//                         className="flex-1 py-2 bg-slate-800 rounded-lg">
//                         <Eye size={18} />
//                       </button>
//                       <button onClick={() => handleEdit(expo)}
//                         className="flex-1 py-2 bg-slate-800 rounded-lg">
//                         <Edit3 size={18} />
//                       </button>
//                       <button onClick={() => handleDelete(expo._id)}
//                         className="flex-1 py-2 bg-slate-800 rounded-lg">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </div>

//                 </div>
//               ))}
//             </div>
//           )}
          

//         {/* CREATE / EDIT MODAL */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-6">
//             <div className="bg-[#0f172a] border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
//               <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
//                 <h2 className="text-2xl font-black text-white">{isEditMode ? "Update Expo" : "New Expo"}</h2>
//                 <button onClick={() => setShowModal(false)} className="p-2 hover:bg-slate-800 rounded-full transition-colors"><X size={20} /></button>
//               </div>

//               <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto scrollbar-hide">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {[["title", "Expo Title"], ["theme", "Theme"], ["location", "Location"], ["image", "Image URL"]].map(([name, label]) => (
//                     <div key={name} className="flex flex-col gap-2">
//                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
//                       <input name={name} value={formData[name]} onChange={handleChange} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Description</label>
//                   <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-all resize-none" />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   {[["startDate", "Start"], ["endDate", "End"], ["registrationDeadline", "Deadline"]].map(([name, label]) => (
//                     <div key={name} className="flex flex-col gap-2">
//                       <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</label>
//                       <input type="date" name={name} value={formData[name]} onChange={handleChange} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none text-xs" />
//                     </div>
//                   ))}
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</label>
//                   <select name="availability" value={formData.availability} onChange={handleChange} className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none">
//                     <option value="available" className="bg-slate-900 text-white">Available</option>
//                     <option value="not_available" className="bg-slate-900 text-white">Not Available</option>
//                   </select>
//                 </div>

//                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">

//   {/* Cancel Button */}
//   <button
//     type="button"
//     onClick={() => setShowModal(false)}
//     className="
//       w-full sm:w-auto
//       px-8 py-3
//       rounded-xl
//       font-bold
//       bg-slate-800/70
//       border border-slate-700
//       text-slate-300
//       hover:bg-slate-700
//       hover:text-white
//       transition-all
//       duration-300
//       backdrop-blur-md
//     "
//   >
//     Cancel
//   </button>

//   {/* Launch / Save Button */}
//   <button
//     type="submit"
//     className="
//       w-full sm:w-auto
//       px-10 py-3
//       rounded-xl
//       font-bold
//       bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500
//       text-white
//       shadow-lg shadow-emerald-900/30
//       hover:shadow-emerald-500/40
//       hover:scale-[1.03]
//       active:scale-[0.98]
//       transition-all
//       duration-300
//     "
//   >
//     {isEditMode ? "Save Changes" : "Launch Expo"}
//   </button>

// </div>
//               </form>
//             </div>
//           </div>
//         )}

//        {selectedExpo && !isEditMode && (
//   <div className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-4 sm:p-6">

//     <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl relative">

//       {/* Close Button */}
//       <button
//         onClick={() => setSelectedExpo(null)}
//         className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black rounded-full text-white transition-colors"
//       >
//         <X size={20} />
//       </button>

//       {/* Image */}
//       <div className="relative h-48 sm:h-64 w-full">
//         <img
//           src={selectedExpo.image}
//           alt=""
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
//       </div>

//       {/* Content */}
//       <div className="p-6 sm:p-10 -mt-10 sm:-mt-16 relative">

//         <h2 className="text-2xl sm:text-4xl font-black text-white mb-2 leading-tight">
//           {selectedExpo.title}
//         </h2>

//         <p className="text-sky-400 font-bold uppercase tracking-widest mb-6 sm:mb-8 text-sm sm:text-base">
//           {selectedExpo.theme}
//         </p>

//         {/* Info Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 sm:mb-8">
//           <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
//             <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
//               Venue
//             </p>
//             <p className="text-white text-sm font-medium">
//               {selectedExpo.location}
//             </p>
//           </div>

//           <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
//             <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">
//               Dates
//             </p>
//             <p className="text-white text-sm font-medium">
//               {new Date(selectedExpo.startDate).toLocaleDateString()} -{" "}
//               {new Date(selectedExpo.endDate).toLocaleDateString()}
//             </p>
//           </div>
//         </div>

//         <p className="text-slate-400 leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg italic">
//           "{selectedExpo.description}"
//         </p>

//         <button
//           onClick={() => setSelectedExpo(null)}
//           className="w-full py-4 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-bold transition-all shadow-xl shadow-sky-900/20"
//         >
//           Return to Dashboard
//         </button>

//       </div>
//     </div>
//   </div>
// )}
//       </main>
//     </div>
//     </div>
//   );
// }

// export default AdminExpos;







import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, MapPin, Calendar, Edit3, Trash2,
  Eye, X, Image as ImageIcon, Menu, Sparkles, Rocket
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";

function AdminExpos() {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "", theme: "", description: "", location: "",
    startDate: "", endDate: "", registrationDeadline: "",
    image: "", availability: "available",
  });

  const fetchExpos = async () => {
    try {
      const res = await fetch("https://event-managemant-system-mern-stack.vercel.app//api/expos");
      const data = await res.json();
      setExpos(data);
      setLoading(false);
    } catch { setLoading(false); }
  };

  useEffect(() => { fetchExpos(); }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isEditMode ? `https://event-managemant-system-mern-stack.vercel.app//api/expos/${selectedExpo._id}` : "https://event-managemant-system-mern-stack.vercel.app//api/expos";
    await fetch(url, {
      method: isEditMode ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setShowModal(false);
    resetForm();
    fetchExpos();
  };

  const resetForm = () => setFormData({
    title: "", theme: "", description: "", location: "",
    startDate: "", endDate: "", registrationDeadline: "",
    image: "", availability: "available"
  });

  const handleEdit = (expo) => {
    setIsEditMode(true);
    setSelectedExpo(expo);
    setFormData({
      ...expo,
      startDate: expo.startDate?.slice(0, 10) || "",
      endDate: expo.endDate?.slice(0, 10) || "",
      registrationDeadline: expo.registrationDeadline?.slice(0, 10) || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await fetch(`https://event-managemant-system-mern-stack.vercel.app//api/expos/${id}`, { method: "DELETE" });
    fetchExpos();
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 font-sans">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col lg:ml-64 w-full relative">
        <div className="hidden lg:block absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-sky-500/10 blur-[130px] rounded-full -z-10 animate-pulse" />
        
        <div className="lg:hidden flex items-center justify-between p-5 bg-[#020617]/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
                           <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-800 rounded-lg"><Menu size={20} /></button>
          <span className="font-black text-sky-400 tracking-tighter">EXPO HUB</span>
          <div className="w-8" />
        </div>

        <main className="flex-1 p-4 md:p-12 w-full overflow-x-hidden">
          <motion.header 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
          >
            <div>
              <p className="text-sky-400 font-black uppercase tracking-[0.3em] text-[10px] mb-2">Event Management</p>
              <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter">
                Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-500">Expos</span>
              </h1>
            </div>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setIsEditMode(false); resetForm(); setShowModal(true); }}
              className="w-full md:w-auto bg-gradient-to-br from-sky-500 to-indigo-600 text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-3 shadow-2xl shadow-sky-900/40 uppercase text-sm transition-all hover:brightness-110"
            > Create Expo
              {/* <Plus size={20} strokeWidth={4} /> Create Expo */}
            </motion.button>
          </motion.header>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 italic text-sky-400">Loading Dashboard...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10">
              {expos.map((expo) => (
                <motion.div
                  key={expo._id}
                  layout
                  whileHover={{ y: -5 }}
                  className="group flex flex-col rounded-[2.5rem] bg-slate-900/40 border border-slate-800/50 backdrop-blur-md overflow-hidden transition-all duration-500 shadow-xl"
                >
                  <div className="relative h-48 md:h-56 overflow-hidden">
                    <img src={expo.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase text-sky-400">{expo.availability}</div>
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-black text-white mb-1 line-clamp-1 transition-colors duration-300 group-hover:text-sky-400">
                      {expo.title}
                    </h2>
                    <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">{expo.theme}</p>
                    <p className="text-slate-400 text-xs italic mb-6 line-clamp-2">"{expo.description}"</p>
                    
                    <div className="flex flex-col gap-2 mb-6">
                      <div className="flex items-center gap-2 text-[10px] text-slate-300"><MapPin size={12} className="text-sky-500" /> {expo.location}</div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-300"><Calendar size={12} className="text-indigo-500" /> {new Date(expo.startDate).toLocaleDateString()}</div>
                    </div>

                    <div className="flex gap-2 pt-6 border-t border-slate-800">
                      <button onClick={() => setSelectedExpo(expo)} className="flex-1 py-3 bg-slate-800 rounded-xl flex justify-center transition-all hover:bg-sky-500 hover:text-white"><Eye size={18} /></button>
                      <button onClick={() => handleEdit(expo)} className="flex-1 py-3 bg-slate-800 rounded-xl flex justify-center transition-all hover:bg-emerald-500 hover:text-white"><Edit3 size={18} /></button>
                      <button onClick={() => handleDelete(expo._id)} className="flex-1 py-3 bg-slate-800 rounded-xl flex justify-center transition-all hover:bg-rose-500 hover:text-white"><Trash2 size={18} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* FORM MODAL - UPDATED CENTERING AND SHADOWS */}
          <AnimatePresence>
            {showModal && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/90 backdrop-blur-md"
              >
                <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }} 
                   animate={{ scale: 1, opacity: 1 }} 
                   exit={{ scale: 0.9, opacity: 0 }}
                   className="bg-[#0f172a] border border-slate-800 rounded-[2.5rem] md:rounded-[3rem] w-full max-w-2xl max-h-[90vh] flex flex-col mx-auto shadow-[0_0_60px_rgba(14,165,233,0.15)] overflow-hidden"
                >
                  <div className="p-6 md:p-8 border-b border-slate-800 flex justify-between items-center sticky top-0 bg-[#0f172a]/80 backdrop-blur-md z-10">
                    <h2 className="text-xl md:text-2xl font-black italic tracking-tighter text-white">{isEditMode ? "EDIT" : "LAUNCH"} <span className="text-sky-500">EXPO</span></h2>
                    <button onClick={() => setShowModal(false)} className="p-2 bg-slate-800 hover:bg-rose-500 transition-colors rounded-full text-slate-400 hover:text-white"><X size={20} /></button>
                  </div>

                  <form onSubmit={handleSubmit} className="px-6 md:px-10 py-8 space-y-6 overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {[
                        { name: "title", label: "Title" }, { name: "theme", label: "Theme" },
                        { name: "location", label: "Location" }, { name: "image", label: "Image URL" }
                      ].map((f) => (
                        <div key={f.name} className="flex flex-col gap-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">{f.label}</label>
                          <input name={f.name} value={formData[f.name]} onChange={handleChange} className="bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:border-sky-500 outline-none transition-all focus:ring-1 focus:ring-sky-500/50 text-white" required />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Description</label>
                      <textarea name="description" value={formData.description} onChange={handleChange} rows="3" className="bg-slate-950/50 border border-slate-800 rounded-2xl px-5 py-4 text-sm focus:border-sky-500 outline-none resize-none transition-all text-white" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {["startDate", "endDate", "registrationDeadline"].map((d) => (
                        <div key={d} className="flex flex-col gap-2">
                          <label className="text-[10px] font-black text-slate-500 uppercase ml-1">{d.replace('Date', '')}</label>
                          <input type="date" name={d} value={formData[d]} onChange={handleChange} className="bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white" required />
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Status</label>
                        <select name="availability" value={formData.availability} onChange={handleChange} className="bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 text-sm appearance-none cursor-pointer text-white">
                            <option value="available">Available</option>
                            <option value="not_available">Not Available</option>
                        </select>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-6 pb-2">
                      <button type="button" onClick={() => setShowModal(false)} className="order-2 sm:order-1 flex-1 py-4 font-bold text-slate-400 hover:text-white transition-colors">Cancel</button>
                      <button type="submit" className="order-1 sm:order-2 flex-[2] py-4 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-2xl font-black text-white shadow-xl shadow-sky-900/40 active:scale-95 transition-all uppercase tracking-tighter">
                        {isEditMode ? "Update Database" : "Confirm Launch"}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </motion.div>
            )}

            {selectedExpo && !isEditMode && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-950/95 backdrop-blur-2xl">
                <motion.div 
                   initial={{ scale: 0.9, opacity: 0 }} 
                   animate={{ scale: 1, opacity: 1 }} 
                   className="bg-slate-900 w-full max-w-4xl h-full md:h-auto md:max-h-[90vh] overflow-y-auto rounded-[2.5rem] md:rounded-[3rem] relative shadow-[0_0_80px_rgba(14,165,233,0.1)]"
                >
                  <button onClick={() => setSelectedExpo(null)} className="absolute top-6 right-6 z-10 p-3 bg-black/50 hover:bg-rose-500 transition-colors rounded-2xl"><X size={20} /></button>
                  <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden"><img src={selectedExpo.image} className="w-full h-full object-cover" alt="" /></div>
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <h2 className="text-3xl md:text-5xl font-black mb-2 tracking-tighter text-white transition-colors hover:text-sky-400 cursor-default">{selectedExpo.title}</h2>
                      <p className="text-sky-500 font-bold text-sm mb-8 tracking-widest uppercase">{selectedExpo.theme}</p>
                      <div className="space-y-4 mb-8 text-sm">
                        <div className="flex items-center gap-3 text-slate-300 font-bold"><MapPin size={20} className="text-sky-500" /> {selectedExpo.location}</div>
                        <div className="flex items-center gap-3 text-slate-300 font-bold"><Calendar size={20} className="text-indigo-500" /> {new Date(selectedExpo.startDate).toLocaleDateString()}</div>
                      </div>
                      <p className="text-slate-400 italic text-sm md:text-base mb-10 border-l-4 border-sky-500 pl-4 bg-sky-500/5 py-4">"{selectedExpo.description}"</p>
                      <button onClick={() => setSelectedExpo(null)} className="w-full py-5 bg-gradient-to-r from-sky-600 to-indigo-600 rounded-full font-black uppercase shadow-xl shadow-sky-900/40">Close Preview</button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default AdminExpos;