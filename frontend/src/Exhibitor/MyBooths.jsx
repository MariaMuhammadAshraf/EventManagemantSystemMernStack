// import React, { useEffect, useMemo, useState } from "react";
// import ExhibitorSidebar from "./ExhibitorSidebar";

// const API_BASE = "https://event-managemant-system-mern-stack.vercel.app/";

// const emptyStaffRow = () => ({ name: "", role: "", phone: "", email: "" });

// export default function MyBooths() {
//   const user = useMemo(() => {
//     try {
//       return JSON.parse(localStorage.getItem("user"));
//     } catch {
//       return null;
//     }
//   }, []);

//   const exhibitorId = user?._id;

//   // ---- expo selection ----
//   const [expos, setExpos] = useState([]);
//   const [selectedExpoId, setSelectedExpoId] = useState("");

//   // ---- data ----
//   const [requests, setRequests] = useState([]);
//   const [booths, setBooths] = useState([]);

//   // ---- ui states ----
//   const [loading, setLoading] = useState(true);
//   const [sending, setSending] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");

//   // ---- request form (EXHIBITOR -> ADMIN) ----
//   const [reqForm, setReqForm] = useState({
//     hall: "Hall A",
//     boothName: "",
//     company: "",
//     description: "",
//     productsServicesText: "",
//   });
//   const [reqStaff, setReqStaff] = useState([emptyStaffRow()]);

//   // ---- manage approved booth ----
//   const [selectedBooth, setSelectedBooth] = useState(null);
//   const [edit, setEdit] = useState({
//     boothName: "",
//     company: "",
//     description: "",
//     productsServicesText: "",
//   });
//   const [editStaff, setEditStaff] = useState([emptyStaffRow()]);

//   const headersWithUser = useMemo(() => {
//     return {
//       "Content-Type": "application/json",
//       "x-user-id": exhibitorId || "",
//     };
//   }, [exhibitorId]);

//   const parseProducts = (text) =>
//     text
//       .split(",")
//       .map((s) => s.trim())
//       .filter(Boolean);

//   const cleanStaff = (arr) =>
//     (Array.isArray(arr) ? arr : [])
//       .map((s) => ({
//         name: (s?.name || "").trim(),
//         role: (s?.role || "").trim(),
//         phone: (s?.phone || "").trim(),
//         email: (s?.email || "").trim(),
//       }))
//       .filter((s) => s.name || s.role || s.phone || s.email);

//   // ---------- API calls ----------
//   const fetchExpos = async () => {
//     try {
//       const res = await fetch(`${API_BASE}/api/expos`);
//       const data = await res.json();
//       const list = Array.isArray(data) ? data : [];
//       setExpos(list);

//       if (!selectedExpoId && list.length > 0) setSelectedExpoId(list[0]._id);
//     } catch {
//       setExpos([]);
//     }
//   };

//   const fetchMyRequests = async (expoId) => {
//     if (!exhibitorId) return;
//     try {
//       const url = expoId
//         ? `${API_BASE}/api/booth-requests/my?expoId=${expoId}`
//         : `${API_BASE}/api/booth-requests/my`;

//       const res = await fetch(url, { headers: headersWithUser });
//       const data = await res.json();
//       setRequests(Array.isArray(data) ? data : []);
//     } catch {
//       setRequests([]);
//     }
//   };

//   const fetchMyBooths = async (expoId) => {
//     if (!exhibitorId) return;
//     try {
//       const url = expoId
//         ? `${API_BASE}/api/booths/exhibitor/${exhibitorId}?expoId=${expoId}`
//         : `${API_BASE}/api/booths/exhibitor/${exhibitorId}`;

//       const res = await fetch(url);
//       const data = await res.json();
//       setBooths(Array.isArray(data) ? data : []);
//     } catch {
//       setBooths([]);
//     }
//   };

//   const refreshAll = async () => {
//     if (!selectedExpoId) return;
//     setLoading(true);
//     setError("");
//     try {
//       await Promise.all([fetchMyRequests(selectedExpoId), fetchMyBooths(selectedExpoId)]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpos();
//     // eslint-disable-next-line
//   }, []);

//   useEffect(() => {
//     if (!selectedExpoId) return;
//     refreshAll();
//     // eslint-disable-next-line
//   }, [selectedExpoId]);

//   // ---------- Staff helpers (Request) ----------
//   const addReqStaff = () => setReqStaff((p) => [...p, emptyStaffRow()]);
//   const removeReqStaff = (idx) =>
//     setReqStaff((p) => (p.length === 1 ? p : p.filter((_, i) => i !== idx)));
//   const updateReqStaff = (idx, key, value) =>
//     setReqStaff((p) => p.map((row, i) => (i === idx ? { ...row, [key]: value } : row)));

//   // ---------- Staff helpers (Edit Booth) ----------
//   const addEditStaff = () => setEditStaff((p) => [...p, emptyStaffRow()]);
//   const removeEditStaff = (idx) =>
//     setEditStaff((p) => (p.length === 1 ? p : p.filter((_, i) => i !== idx)));
//   const updateEditStaff = (idx, key, value) =>
//     setEditStaff((p) => p.map((row, i) => (i === idx ? { ...row, [key]: value } : row)));

//   // ---------- Request Submit ----------
//   const submitRequest = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!exhibitorId) {
//       setError("Please login as exhibitor first.");
//       return;
//     }
//     if (!selectedExpoId) {
//       setError("Please select an expo.");
//       return;
//     }
//     if (!reqForm.boothName.trim()) {
//       setError("Booth name is required.");
//       return;
//     }
//     if (reqForm.hall !== "Hall A" && reqForm.hall !== "Hall B") {
//       setError("Only Hall A or Hall B allowed.");
//       return;
//     }

//     setSending(true);
//     try {
//       const payload = {
//         expoId: selectedExpoId,
//         hall: reqForm.hall,
//         boothName: reqForm.boothName.trim(),
//         company: reqForm.company.trim(),
//         description: reqForm.description.trim(),
//         productsServices: parseProducts(reqForm.productsServicesText),
//         staff: cleanStaff(reqStaff),
//       };

//       const res = await fetch(`${API_BASE}/api/booth-requests`, {
//         method: "POST",
//         headers: headersWithUser,
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Failed to send request");

//       // reset request form
//       setReqForm({
//         hall: "Hall A",
//         boothName: "",
//         company: "",
//         description: "",
//         productsServicesText: "",
//       });
//       setReqStaff([emptyStaffRow()]);

//       await refreshAll();
//     } catch (err) {
//       setError(err.message || "Failed to send request");
//     } finally {
//       setSending(false);
//     }
//   };

//   // ---------- Booth Manage ----------
//   const selectBooth = (b) => {
//     setSelectedBooth(b);
//     setEdit({
//       boothName: b.boothName || "",
//       company: b.company || "",
//       description: b.description || "",
//       productsServicesText: (b.productsServices || []).join(", "),
//     });

//     const staffArr = Array.isArray(b.staff) && b.staff.length ? b.staff : [emptyStaffRow()];
//     setEditStaff(
//       staffArr.map((s) => ({
//         name: s?.name || "",
//         role: s?.role || "",
//         phone: s?.phone || "",
//         email: s?.email || "",
//       }))
//     );
//   };

//   const saveBooth = async () => {
//     if (!selectedBooth?._id) return;
//     setSaving(true);
//     setError("");

//     try {
//       const payload = {
//         boothName: edit.boothName.trim(),
//         company: edit.company.trim(),
//         description: edit.description.trim(),
//         productsServices: parseProducts(edit.productsServicesText),
//         staff: cleanStaff(editStaff),
//       };

//       const res = await fetch(`${API_BASE}/api/booths/${selectedBooth._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data?.message || "Failed to update booth");

//       await refreshAll();

//       // keep selected updated
//       setSelectedBooth(data.booth);
//     } catch (err) {
//       setError(err.message || "Failed to update booth");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ---------- Derived ----------
//   const pendingReq = requests.find((r) => r.status === "pending");
//   const approvedReq = requests.find((r) => r.status === "approved");
//   const rejectedReq = requests.find((r) => r.status === "rejected");

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950 text-slate-100">
//       <div className="flex min-h-screen">
//         <ExhibitorSidebar />

//         <div className="flex-1 min-w-0 px-4 sm:px-8 lg:px-10 py-8">
//           <div className="max-w-6xl mx-auto w-full">
//             <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
//               <div>
//                 <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">My Booth</h1>
//                 <p className="text-slate-300 mt-2">
//                   Choose an Expo → Send Booth Request → Admin Approves → Booth is Created.
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <select
//                   value={selectedExpoId}
//                   onChange={(e) => setSelectedExpoId(e.target.value)}
//                   className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 outline-none"
//                 >
//                   {expos.map((expo) => (
//                     <option key={expo._id} value={expo._id}>
//                       {expo.title}
//                     </option>
//                   ))}
//                 </select>

//                 <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3">
//                   <p className="text-xs text-slate-300">Approved Booths</p>
//                   <p className="text-xl font-semibold">{booths.length}</p>
//                 </div>
//               </div>
//             </div>

//             {error && (
//               <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 text-red-200">
//                 {error}
//               </div>
//             )}

//             {/* STATUS BAR */}
//             <div className="mb-6 grid sm:grid-cols-3 gap-3">
//               <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                 <p className="text-xs text-slate-300">Pending</p>
//                 <p className="mt-1 font-semibold text-amber-200">
//                   {pendingReq ? "Yes (waiting admin)" : "No"}
//                 </p>
//               </div>
//               <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                 <p className="text-xs text-slate-300">Approved</p>
//                 <p className="mt-1 font-semibold text-emerald-200">
//                   {approvedReq ? "Yes" : "No"}
//                 </p>
//               </div>
//               <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                 <p className="text-xs text-slate-300">Rejected</p>
//                 <p className="mt-1 font-semibold text-rose-200">
//                   {rejectedReq ? "Yes" : "No"}
//                 </p>
//               </div>
//             </div>

//             <div className="grid lg:grid-cols-2 gap-6">
//               {/* LEFT: REQUEST FORM */}
//               <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//                 <div className="flex items-start justify-between gap-4">
//                   <div>
//                     <h2 className="text-lg font-semibold">Request Booth (Admin Approval Required)</h2>
//                     <p className="text-sm text-slate-300 mt-1">
//                       Only <span className="font-semibold">Hall A</span> &{" "}
//                       <span className="font-semibold">Hall B</span> allowed. Max 15 booths per hall.
//                     </p>
//                   </div>

//                   <span
//                     className={`text-xs px-3 py-1 rounded-full border ${
//                       pendingReq
//                         ? "border-amber-400/30 text-amber-200 bg-amber-500/10"
//                         : "border-white/10 text-slate-200 bg-white/5"
//                     }`}
//                   >
//                     {pendingReq ? "Pending" : "Ready"}
//                   </span>
//                 </div>

//                 {pendingReq && (
//                   <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-500/10 p-4">
//                     <p className="text-sm text-amber-100 font-semibold">
//                       Your request is pending approval.
//                     </p>
//                     <p className="text-xs text-amber-100/80 mt-1">
//                       Admin will approve/reject. You can refresh to see updates.
//                     </p>
//                     {pendingReq.adminNote && (
//                       <p className="text-xs text-amber-100/90 mt-2">
//                         Admin note: <span className="italic">{pendingReq.adminNote}</span>
//                       </p>
//                     )}
//                   </div>
//                 )}

//                 <form onSubmit={submitRequest} className="mt-5 space-y-3">
//                   <div className="grid sm:grid-cols-2 gap-3">
//                     <select
//                       value={reqForm.hall}
//                       onChange={(e) => setReqForm((p) => ({ ...p, hall: e.target.value }))}
//                       className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                       disabled={!!pendingReq}
//                     >
//                       <option value="Hall A">Hall A</option>
//                       <option value="Hall B">Hall B</option>
//                     </select>

//                     <input
//                       value={reqForm.boothName}
//                       onChange={(e) => setReqForm((p) => ({ ...p, boothName: e.target.value }))}
//                       placeholder="Booth Name *"
//                       className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                       disabled={!!pendingReq}
//                     />
//                   </div>

//                   <input
//                     value={reqForm.company}
//                     onChange={(e) => setReqForm((p) => ({ ...p, company: e.target.value }))}
//                     placeholder="Company"
//                     className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                     disabled={!!pendingReq}
//                   />

//                   <textarea
//                     value={reqForm.description}
//                     onChange={(e) => setReqForm((p) => ({ ...p, description: e.target.value }))}
//                     placeholder="Description"
//                     rows={3}
//                     className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none resize-none"
//                     disabled={!!pendingReq}
//                   />

//                   <input
//                     value={reqForm.productsServicesText}
//                     onChange={(e) =>
//                       setReqForm((p) => ({ ...p, productsServicesText: e.target.value }))
//                     }
//                     placeholder="Products/Services (comma separated)"
//                     className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                     disabled={!!pendingReq}
//                   />

//                   {/* STAFF (request) */}
//                   <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                     <div className="flex items-center justify-between mb-3">
//                       <p className="font-semibold">Staff</p>
//                       <button
//                         type="button"
//                         onClick={addReqStaff}
//                         disabled={!!pendingReq}
//                         className="text-sm px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
//                       >
//                         + Add Staff
//                       </button>
//                     </div>

//                     <div className="space-y-3">
//                       {reqStaff.map((row, idx) => (
//                         <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-3">
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                             <input
//                               value={row.name}
//                               onChange={(e) => updateReqStaff(idx, "name", e.target.value)}
//                               placeholder="Name"
//                               className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                               disabled={!!pendingReq}
//                             />
//                             <input
//                               value={row.role}
//                               onChange={(e) => updateReqStaff(idx, "role", e.target.value)}
//                               placeholder="Role"
//                               className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                               disabled={!!pendingReq}
//                             />
//                             <input
//                               value={row.phone}
//                               onChange={(e) => updateReqStaff(idx, "phone", e.target.value)}
//                               placeholder="Phone"
//                               className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                               disabled={!!pendingReq}
//                             />
//                             <input
//                               value={row.email}
//                               onChange={(e) => updateReqStaff(idx, "email", e.target.value)}
//                               placeholder="Email"
//                               className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                               disabled={!!pendingReq}
//                             />
//                           </div>

//                           <div className="mt-3 flex justify-end">
//                             <button
//                               type="button"
//                               onClick={() => removeReqStaff(idx)}
//                               disabled={!!pendingReq || reqStaff.length === 1}
//                               className="text-xs px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={sending || !!pendingReq}
//                     className="w-full py-3 rounded-xl font-semibold
//                     bg-gradient-to-r from-emerald-500 to-green-600
//                     hover:from-emerald-400 hover:to-green-500
//                     disabled:opacity-60 disabled:cursor-not-allowed transition"
//                   >
//                     {sending ? "Sending Request..." : pendingReq ? "Request Pending" : "Send Request to Admin"}
//                   </button>

//                   {rejectedReq?.adminNote && (
//                     <div className="mt-3 text-xs text-rose-200">
//                       Last rejected note: <span className="italic">{rejectedReq.adminNote}</span>
//                     </div>
//                   )}
//                 </form>
//               </div>

//               {/* RIGHT: APPROVED BOOTHS + MANAGE */}
//               <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-semibold">Approved Booth (Selected Expo)</h2>
//                   <button
//                     onClick={refreshAll}
//                     className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10 transition"
//                   >
//                     Refresh
//                   </button>
//                 </div>

//                 {loading ? (
//                   <p className="text-slate-300 mt-4">Loading...</p>
//                 ) : booths.length === 0 ? (
//                   <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5 text-slate-300">
//                     No approved booth yet. Send a request and wait for admin approval.
//                   </div>
//                 ) : (
//                   <div className="mt-4 space-y-3">
//                     {booths.map((b) => (
//                       <button
//                         key={b._id}
//                         onClick={() => selectBooth(b)}
//                         className={`w-full text-left rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition ${
//                           selectedBooth?._id === b._id ? "ring-2 ring-sky-400/30" : ""
//                         }`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <div className="font-semibold text-sky-200">{b.boothName}</div>
//                           <div className="text-xs text-slate-300">
//                             {b.hall} • Booth #{b.boothNo}
//                           </div>
//                         </div>
//                         <div className="text-sm text-slate-300">{b.company || "—"}</div>
//                       </button>
//                     ))}
//                   </div>
//                 )}

//                 {/* Manage booth */}
//                 <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
//                   <h3 className="font-semibold">
//                     {selectedBooth ? "Manage Selected Booth" : "Select your booth to manage"}
//                   </h3>

//                   <div className="mt-4 grid sm:grid-cols-2 gap-3">
//                     <input
//                       value={edit.boothName}
//                       onChange={(e) => setEdit((p) => ({ ...p, boothName: e.target.value }))}
//                       placeholder="Booth Name"
//                       className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                       disabled={!selectedBooth}
//                     />
//                     <input
//                       value={edit.company}
//                       onChange={(e) => setEdit((p) => ({ ...p, company: e.target.value }))}
//                       placeholder="Company"
//                       className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                       disabled={!selectedBooth}
//                     />
//                     <textarea
//                       value={edit.description}
//                       onChange={(e) => setEdit((p) => ({ ...p, description: e.target.value }))}
//                       placeholder="Description"
//                       rows={3}
//                       className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none resize-none"
//                       disabled={!selectedBooth}
//                     />
//                     <input
//                       value={edit.productsServicesText}
//                       onChange={(e) =>
//                         setEdit((p) => ({ ...p, productsServicesText: e.target.value }))
//                       }
//                       placeholder="Products/Services (comma separated)"
//                       className="sm:col-span-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none"
//                       disabled={!selectedBooth}
//                     />

//                     {/* Staff edit */}
//                     <div className="sm:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-4">
//                       <div className="flex items-center justify-between mb-3">
//                         <p className="font-semibold">Staff</p>
//                         <button
//                           type="button"
//                           onClick={addEditStaff}
//                           className="text-sm px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
//                           disabled={!selectedBooth}
//                         >
//                           + Add Staff
//                         </button>
//                       </div>

//                       <div className="space-y-3">
//                         {editStaff.map((row, idx) => (
//                           <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-3">
//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                               <input
//                                 value={row.name}
//                                 onChange={(e) => updateEditStaff(idx, "name", e.target.value)}
//                                 placeholder="Name"
//                                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                                 disabled={!selectedBooth}
//                               />
//                               <input
//                                 value={row.role}
//                                 onChange={(e) => updateEditStaff(idx, "role", e.target.value)}
//                                 placeholder="Role"
//                                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                                 disabled={!selectedBooth}
//                               />
//                               <input
//                                 value={row.phone}
//                                 onChange={(e) => updateEditStaff(idx, "phone", e.target.value)}
//                                 placeholder="Phone"
//                                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                                 disabled={!selectedBooth}
//                               />
//                               <input
//                                 value={row.email}
//                                 onChange={(e) => updateEditStaff(idx, "email", e.target.value)}
//                                 placeholder="Email"
//                                 className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 outline-none"
//                                 disabled={!selectedBooth}
//                               />
//                             </div>

//                             <div className="mt-3 flex justify-end">
//                               <button
//                                 type="button"
//                                 onClick={() => removeEditStaff(idx)}
//                                 className="text-xs px-3 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition disabled:opacity-50"
//                                 disabled={!selectedBooth || editStaff.length === 1}
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <button
//                       onClick={saveBooth}
//                       disabled={!selectedBooth || saving}
//                       className="sm:col-span-2 w-full py-3 rounded-xl font-semibold
//                       bg-gradient-to-r from-sky-500 to-blue-600
//                       hover:from-sky-400 hover:to-blue-500
//                       disabled:opacity-60 disabled:cursor-not-allowed transition"
//                     >
//                       {saving ? "Saving..." : "Save Changes"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Requests list */}
//             <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
//               <h2 className="text-lg font-semibold">My Requests (Selected Expo)</h2>
//               {requests.length === 0 ? (
//                 <p className="text-slate-300 mt-2">No requests yet.</p>
//               ) : (
//                 <div className="mt-4 grid md:grid-cols-2 gap-4">
//                   {requests.map((r) => (
//                     <div key={r._id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="font-semibold text-slate-100">{r.boothName}</div>
//                         <span
//                           className={`text-xs px-3 py-1 rounded-full border ${
//                             r.status === "pending"
//                               ? "border-amber-400/30 text-amber-200 bg-amber-500/10"
//                               : r.status === "approved"
//                               ? "border-emerald-400/30 text-emerald-200 bg-emerald-500/10"
//                               : "border-rose-400/30 text-rose-200 bg-rose-500/10"
//                           }`}
//                         >
//                           {r.status}
//                         </span>
//                       </div>
//                       <div className="text-xs text-slate-300 mt-1">
//                         {r.hall} • Sent: {new Date(r.createdAt).toLocaleString()}
//                       </div>
//                       {r.adminNote && (
//                         <div className="text-xs text-slate-200 mt-2">
//                           Admin note: <span className="italic">{r.adminNote}</span>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <p className="mt-6 text-xs text-slate-400">
//               Note: Booth creation is only after admin approval. Halls allowed: Hall A & Hall B (15 max each).
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useMemo, useState } from "react";
import ExhibitorSidebar from "./ExhibitorSidebar";
import { Menu, X, RefreshCw, LayoutGrid, Users, Send, Info } from "lucide-react";

const API_BASE = "https://event-managemant-system-mern-stack.vercel.app/";

const emptyStaffRow = () => ({ name: "", role: "", phone: "", email: "" });

export default function MyBooths() {
  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  }, []);

  const exhibitorId = user?._id;

  // ---- UI Responsive States ----
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ---- expo selection ----
  const [expos, setExpos] = useState([]);
  const [selectedExpoId, setSelectedExpoId] = useState("");

  // ---- data ----
  const [requests, setRequests] = useState([]);
  const [booths, setBooths] = useState([]);

  // ---- ui states ----
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // ---- request form (EXHIBITOR -> ADMIN) ----
  const [reqForm, setReqForm] = useState({
    hall: "Hall A",
    boothName: "",
    company: "",
    description: "",
    productsServicesText: "",
  });
  const [reqStaff, setReqStaff] = useState([emptyStaffRow()]);

  // ---- manage approved booth ----
  const [selectedBooth, setSelectedBooth] = useState(null);
  const [edit, setEdit] = useState({
    boothName: "",
    company: "",
    description: "",
    productsServicesText: "",
  });
  const [editStaff, setEditStaff] = useState([emptyStaffRow()]);

  const headersWithUser = useMemo(() => {
    return {
      "Content-Type": "application/json",
      "x-user-id": exhibitorId || "",
    };
  }, [exhibitorId]);

  const parseProducts = (text) =>
    text
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const cleanStaff = (arr) =>
    (Array.isArray(arr) ? arr : [])
      .map((s) => ({
        name: (s?.name || "").trim(),
        role: (s?.role || "").trim(),
        phone: (s?.phone || "").trim(),
        email: (s?.email || "").trim(),
      }))
      .filter((s) => s.name || s.role || s.phone || s.email);

  // ---------- API calls ----------
  const fetchExpos = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/expos`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setExpos(list);
      if (!selectedExpoId && list.length > 0) setSelectedExpoId(list[0]._id);
    } catch {
      setExpos([]);
    }
  };

  const fetchMyRequests = async (expoId) => {
    if (!exhibitorId) return;
    try {
      const url = expoId
        ? `${API_BASE}/api/booth-requests/my?expoId=${expoId}`
        : `${API_BASE}/api/booth-requests/my`;
      const res = await fetch(url, { headers: headersWithUser });
      const data = await res.json();
      setRequests(Array.isArray(data) ? data : []);
    } catch {
      setRequests([]);
    }
  };

  // const fetchMyBooths = async (expoId) => {
  //   if (!exhibitorId) return;
  //   try {
  //     const url = expoId
  //       ? `${API_BASE}/api/booths/exhibitor/${exhibitorId}?expoId=${expoId}`
  //       : `${API_BASE}/api/booths/exhibitor/${exhibitorId}`;
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     setBooths(Array.isArray(data) ? data : []);
  //   } catch {
  //     setBooths([]);
  //   }
  // };

  const fetchMyBooths = async (expoId) => {
  if (!exhibitorId) return;
  try {
    const url = expoId
      ? `${API_BASE}/api/booths/exhibitor/${exhibitorId}?expoId=${expoId}`
      : `${API_BASE}/api/booths/exhibitor/${exhibitorId}`;
    const res = await fetch(url);
    const data = await res.json();

    // AGAR DATA NAHI HAI TOH STATE KO KHALI ([]) KAREIN
    if (res.ok && Array.isArray(data) && data.length > 0) {
      setBooths(data);
    } else {
      setBooths([]); // Ye line screen saaf kar degi
      setSelectedBooth(null); // Selected details bhi band kar degi
    }
  } catch (error) {
    setBooths([]);
    setSelectedBooth(null);
  }
};

  const refreshAll = async () => {
    if (!selectedExpoId) return;
    setLoading(true);
    setError("");
    try {
      await Promise.all([fetchMyRequests(selectedExpoId), fetchMyBooths(selectedExpoId)]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpos();
  }, []);

  useEffect(() => {
    if (!selectedExpoId) return;
    refreshAll();
  }, [selectedExpoId]);

  const addReqStaff = () => setReqStaff((p) => [...p, emptyStaffRow()]);
  const removeReqStaff = (idx) =>
    setReqStaff((p) => (p.length === 1 ? p : p.filter((_, i) => i !== idx)));
  const updateReqStaff = (idx, key, value) =>
    setReqStaff((p) => p.map((row, i) => (i === idx ? { ...row, [key]: value } : row)));

  const addEditStaff = () => setEditStaff((p) => [...p, emptyStaffRow()]);
  const removeEditStaff = (idx) =>
    setEditStaff((p) => (p.length === 1 ? p : p.filter((_, i) => i !== idx)));
  const updateEditStaff = (idx, key, value) =>
    setEditStaff((p) => p.map((row, i) => (i === idx ? { ...row, [key]: value } : row)));

  const submitRequest = async (e) => {
    e.preventDefault();
    setError("");
    if (!exhibitorId) { setError("Please login as exhibitor first."); return; }
    if (!selectedExpoId) { setError("Please select an expo."); return; }
    if (!reqForm.boothName.trim()) { setError("Booth name is required."); return; }
    if (reqForm.hall !== "Hall A" && reqForm.hall !== "Hall B") { setError("Only Hall A or Hall B allowed."); return; }

    setSending(true);
    try {
      const payload = {
        expoId: selectedExpoId,
        hall: reqForm.hall,
        boothName: reqForm.boothName.trim(),
        company: reqForm.company.trim(),
        description: reqForm.description.trim(),
        productsServices: parseProducts(reqForm.productsServicesText),
        staff: cleanStaff(reqStaff),
      };
      const res = await fetch(`${API_BASE}/api/booth-requests`, {
        method: "POST",
        headers: headersWithUser,
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to send request");
      setReqForm({ hall: "Hall A", boothName: "", company: "", description: "", productsServicesText: "" });
      setReqStaff([emptyStaffRow()]);
      await refreshAll();
    } catch (err) {
      setError(err.message || "Failed to send request");
    } finally {
      setSending(false);
    }
  };

  const selectBooth = (b) => {
    setSelectedBooth(b);
    setEdit({
      boothName: b.boothName || "",
      company: b.company || "",
      description: b.description || "",
      productsServicesText: (b.productsServices || []).join(", "),
    });
    const staffArr = Array.isArray(b.staff) && b.staff.length ? b.staff : [emptyStaffRow()];
    setEditStaff(staffArr.map((s) => ({
      name: s?.name || "", role: s?.role || "", phone: s?.phone || "", email: s?.email || "",
    })));
  };

  const saveBooth = async () => {
    if (!selectedBooth?._id) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        boothName: edit.boothName.trim(),
        company: edit.company.trim(),
        description: edit.description.trim(),
        productsServices: parseProducts(edit.productsServicesText),
        staff: cleanStaff(editStaff),
      };
      const res = await fetch(`${API_BASE}/api/booths/${selectedBooth._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to update booth");
      await refreshAll();
      setSelectedBooth(data.booth);
    } catch (err) {
      setError(err.message || "Failed to update booth");
    } finally {
      setSaving(false);
    }
  };

  const pendingReq = requests.find((r) => r.status === "pending");
  const approvedReq = requests.find((r) => r.status === "approved");
  const rejectedReq = requests.find((r) => r.status === "rejected");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30">
      <div className="flex relative">
        <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        <div className="flex-1 min-w-0 lg:ml-72 transition-all duration-300">
          <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-slate-950/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
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

          <main className="px-4 sm:px-8 lg:px-10 py-8 lg:py-12 h-screen overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto w-full">
              
              <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  {/* --- Naya Badge Section --- */}
               <div className="flex items-center gap-2 mb-3">
                     <div className="p-1.5 bg-sky-500/10 rounded-lg border border-sky-500/20">
                     <LayoutGrid className="h-4 w-4 text-sky-400" />
                     </div>
                      <span className="text-sky-400 font-black tracking-[0.2em] text-[10px] uppercase">
                 Booth Management System
              </span>
               </div>
    {/* ------------------------- */}
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-2">My <span className="text-sky-500">Booth</span></h1>
                  <p className="text-slate-400 max-w-md font-medium leading-relaxed">
                    Choose an Expo → Send Request → Admin Approves → Booth Created.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <select
                    value={selectedExpoId}
                    onChange={(e) => setSelectedExpoId(e.target.value)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500/40 transition-all text-sm font-semibold cursor-pointer"
                  >
                    {expos.map((expo) => (
                      <option key={expo._id} value={expo._id} className="bg-slate-900">{expo.title}</option>
                    ))}
                  </select>

                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 shadow-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Approved</p>
                    <p className="text-2xl font-black text-sky-400">{booths.length}</p>
                  </div>
                </div>
              </div>

              {error && (
                <div className="mb-6 rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 text-rose-300 font-bold flex items-center gap-3 animate-in fade-in zoom-in">
                  <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                  {error}
                </div>
              )}

              <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: "Pending", val: pendingReq, color: "text-amber-400", bg: "bg-amber-400/10" },
                  { label: "Approved", val: approvedReq, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                  { label: "Rejected", val: rejectedReq, color: "text-rose-400", bg: "bg-rose-400/10" }
                ].map((item, i) => (
                  <div key={i} className={`rounded-[1.5rem] border border-white/5 ${item.bg} p-5 transition-transform hover:scale-[1.02]`}>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className={`text-lg font-black ${item.color}`}>
                      {item.val ? "YES" : "NO"}
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full" />
                  
                  <div className="flex items-start justify-between gap-4 relative z-10 mb-6">
                    <div>
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <Send size={20} className="text-sky-500" />
                        Request Booth
                      </h2>
                      <p className="text-sm bg-white/[0.02] text-slate-500 mt-1 font-medium">Hall A/B only (Max 15 per hall)</p>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${pendingReq ? "border-amber-400/30 text-amber-400 bg-amber-400/10" : "border-white/10 text-slate-400 bg-white/5"}`}>
                      {pendingReq ? "Pending" : "Ready"}
                    </span>
                  </div>

                  {pendingReq && (
                    <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4 animate-pulse">
                      <p className="text-sm text-amber-200 font-bold">Request is currently under review.</p>
                      {pendingReq.adminNote && <p className="text-xs text-amber-200/70 mt-2 italic">Note: {pendingReq.adminNote}</p>}
                    </div>
                  )}

                  <form onSubmit={submitRequest} className="space-y-4 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4  bg-white/[0.02]">
                      <select
                        value={reqForm.hall}
                        onChange={(e) => setReqForm((p) => ({ ...p, hall: e.target.value }))}
                        className=" w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500/50 transition-all disabled:opacity-50"
                        disabled={!!pendingReq}
                      >
                        <option value="Hall A" className="bg-[#0f172a] text-white">Hall A</option>
                        <option value="Hall B" className="bg-[#0f172a] text-white" >Hall B</option>
                      </select>
                      <input
                        value={reqForm.boothName}
                        onChange={(e) => setReqForm((p) => ({ ...p, boothName: e.target.value }))}
                        placeholder="Booth Name *"
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500/50 transition-all disabled:opacity-50"
                        disabled={!!pendingReq}
                      />
                    </div>

                    <input
                      value={reqForm.company}
                      onChange={(e) => setReqForm((p) => ({ ...p, company: e.target.value }))}
                      placeholder="Company Name"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500/50 transition-all disabled:opacity-50"
                      disabled={!!pendingReq}
                    />

                    <textarea
                      value={reqForm.description}
                      onChange={(e) => setReqForm((p) => ({ ...p, description: e.target.value }))}
                      placeholder="Brief Description"
                      rows={3}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500/50 transition-all resize-none disabled:opacity-50"
                      disabled={!!pendingReq}
                    />

                    <input
                      value={reqForm.productsServicesText}
                      onChange={(e) => setReqForm((p) => ({ ...p, productsServicesText: e.target.value }))}
                      placeholder="Products/Services (comma separated)"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500/50 transition-all disabled:opacity-50"
                      disabled={!!pendingReq}
                    />

                    <div className="rounded-[1.5rem] border border-white/5 bg-white/5 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <p className="font-bold flex items-center gap-2"><Users size={16} className="text-sky-500"/> Staff</p>
                        <button type="button" onClick={addReqStaff} disabled={!!pendingReq} className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 transition disabled:opacity-50">
                          + Add Staff
                        </button>
                      </div>

                      <div className="space-y-3">
                        {reqStaff.map((row, idx) => (
                          <div key={idx} className="rounded-xl border border-white/5 bg-slate-900/50 p-4 space-y-3">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <input value={row.name} onChange={(e) => updateReqStaff(idx, "name", e.target.value)} placeholder="Name" className="bg-white/5 rounded-xl px-3 py-2 text-sm outline-none border border-white/5" disabled={!!pendingReq} />
                              <input value={row.role} onChange={(e) => updateReqStaff(idx, "role", e.target.value)} placeholder="Role" className="bg-white/5 rounded-xl px-3 py-2 text-sm outline-none border border-white/5" disabled={!!pendingReq} />
                              <input value={row.phone} onChange={(e) => updateReqStaff(idx, "phone", e.target.value)} placeholder="Phone" className="bg-white/5 rounded-xl px-3 py-2 text-sm outline-none border border-white/5" disabled={!!pendingReq} />
                              <input value={row.email} onChange={(e) => updateReqStaff(idx, "email", e.target.value)} placeholder="Email" className="bg-white/5 rounded-xl px-3 py-2 text-sm outline-none border border-white/5" disabled={!!pendingReq} />
                            </div>
                            <button type="button" onClick={() => removeReqStaff(idx)} disabled={!!pendingReq || reqStaff.length === 1} className="text-[10px] font-bold text-rose-400 hover:text-rose-300 transition uppercase tracking-tighter disabled:opacity-30">
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={sending || !!pendingReq}
                      className="w-full py-4 rounded-[1.25rem] font-black text-sm tracking-widest uppercase bg-sky-600 hover:bg-sky-500 shadow-xl shadow-sky-600/20 active:scale-95 transition-all disabled:opacity-40"
                    >
                      {sending ? "Sending..." : pendingReq ? "Waiting for Admin" : "Send Request to Admin"}
                    </button>
                  </form>
                </div>

                <div className="space-y-6">
                  <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] backdrop-blur-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <LayoutGrid size={20} className="text-emerald-500" />
                        Approved Booth (Selected Expo)
                      </h2>
                      <button onClick={refreshAll} className="p-2 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition">
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                      </button>
                    </div>

                    {loading ? (
                      <div className="flex justify-center py-10"><div className="h-8 w-8 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"/></div>
                    ) : booths.length === 0 ? (
                      <div className="text-center py-10 px-6 rounded-3xl border border-dashed border-white/10 text-slate-500 font-medium italic">
                        No approved booths in this Expo yet.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-3 relative z-10">
                        {booths.map((b) => (
                          <button
                            key={b._id}
                            onClick={() => selectBooth(b)}
                            className={`group w-full text-left rounded-2xl border transition-all duration-300 p-5 ${selectedBooth?._id === b._id ? "bg-sky-500/10 border-sky-500" : "bg-white/5 border-white/5 hover:border-white/20"}`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-black text-lg">{b.boothName}</span>
                              <span className="text-[10px] font-bold bg-white/10 px-2 py-1 rounded-lg uppercase tracking-widest">{b.hall} • Booth #{b.boothNo || "1"}</span>
                            </div>
                            <p className="text-sm text-slate-400 font-medium">{b.company || "Brand Name Pending"}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* MANAGE SELECTED BOOTH (EDIT SECTION) */}
                  {selectedBooth && (
                    <div className="rounded-[2.5rem] border border-sky-500/30 bg-sky-500/[0.03] backdrop-blur-3xl p-6 sm:p-8 shadow-2xl animate-in slide-in-from-bottom-5 duration-500">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        Manage Selected Booth
                      </h3>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input value={edit.boothName} onChange={(e) => setEdit((p) => ({ ...p, boothName: e.target.value }))} placeholder="Booth Name" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500" />
                          <input value={edit.company} onChange={(e) => setEdit((p) => ({ ...p, company: e.target.value }))} placeholder="Company" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500" />
                        </div>
                        <textarea value={edit.description} onChange={(e) => setEdit((p) => ({ ...p, description: e.target.value }))} placeholder="Description" rows={3} className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500 resize-none" />
                        <input value={edit.productsServicesText} onChange={(e) => setEdit((p) => ({ ...p, productsServicesText: e.target.value }))} placeholder="Products/Services (comma separated)" className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-4 outline-none focus:border-sky-500" />

                        <div className="rounded-2xl border border-white/5 bg-black/20 p-5">
                          <div className="flex items-center justify-between mb-4">
                            <p className="font-bold text-sm">Staff</p>
                            <button type="button" onClick={addEditStaff} className="text-[10px] font-black uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-lg hover:bg-white/10">+ Add Staff</button>
                          </div>
                          <div className="space-y-3">
                            {editStaff.map((row, idx) => (
                              <div key={idx} className="p-4 bg-white/5 rounded-2xl space-y-3 border border-white/5">
                                <div className="grid grid-cols-2 gap-3">
                                  <input value={row.name} onChange={(e) => updateEditStaff(idx, "name", e.target.value)} placeholder="Name" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-sky-500" />
                                  <input value={row.role} onChange={(e) => updateEditStaff(idx, "role", e.target.value)} placeholder="Role" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-sky-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                  <input value={row.phone} onChange={(e) => updateEditStaff(idx, "phone", e.target.value)} placeholder="Phone" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-sky-500" />
                                  <input value={row.email} onChange={(e) => updateEditStaff(idx, "email", e.target.value)} placeholder="Email" className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:border-sky-500" />
                                </div>
                                <button type="button" onClick={() => removeEditStaff(idx)} disabled={editStaff.length === 1} className="text-[10px] text-slate-500 font-bold uppercase hover:text-rose-500 transition px-2 py-1 rounded-lg border border-white/5">Remove</button>
                              </div>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={saveBooth}
                          disabled={saving}
                          className="w-full py-4 rounded-[1.25rem] font-black text-sm tracking-widest uppercase bg-sky-600 hover:bg-sky-500 shadow-xl transition-all"
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-6 sm:p-8">
                <h2 className="text-2xl font-black mb-6">Request <span className="text-sky-500">History</span></h2>
                {requests.length === 0 ? (
                  <p className="text-slate-500 font-medium italic">No past requests recorded.</p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {requests.map((r) => (
                      <div key={r._id} className="rounded-2xl border border-white/5 bg-white/5 p-5 hover:border-white/20 transition-all">
                        <div className="flex items-center justify-between mb-3">
                          <div className="font-bold text-lg">{r.boothName}</div>
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                            r.status === "pending" ? "border-amber-400/30 text-amber-400 bg-amber-400/10" :
                            r.status === "approved" ? "border-emerald-400/30 text-emerald-400 bg-emerald-400/10" :
                            "border-rose-400/30 text-rose-400 bg-rose-400/10"
                          }`}>
                            {r.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 font-bold uppercase">{r.hall} • {new Date(r.createdAt).toLocaleDateString()}</p>
                        {r.adminNote && <div className="mt-3 p-3 bg-black/20 rounded-xl text-xs text-slate-400 border border-white/5 italic">Admin: {r.adminNote}</div>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="mt-10 text-center text-xs text-slate-600 font-medium uppercase tracking-[0.2em]">
                Exhibitor Management System • 15 Booths Per Hall Limit
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}