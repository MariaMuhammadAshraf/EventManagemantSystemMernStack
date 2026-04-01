 
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import ExhibitorSidebar from "./ExhibitorSidebar";
// import {
//   Building2,
//   Globe,
//   Phone,
//   MapPin,
//   FileText,
//   User,
//   Camera,
//   Mail,
//   ShieldCheck,
//   Loader2,
//   Package,
// } from "lucide-react";

// const API_BASE_URL = "http://localhost:5000/api";

// const getUserId = () => {
//   try {
//     const user = JSON.parse(localStorage.getItem("user"));
//     return user?._id || null;
//   } catch {
//     return null;
//   }
// };

// // ✅ FIX: FormField OUTSIDE the component to prevent focus loss
// const FormField = ({ label, name, value, onChange, type = "text", icon: Icon, isTextArea = false, placeholder = "" }) => (
//   <div className="flex flex-col gap-1.5">
//     <label htmlFor={name} className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2 cursor-pointer">
//       {Icon && <Icon size={14} className="text-blue-400" />}
//       {label}
//     </label>
//     {isTextArea ? (
//       <textarea
//         id={name}
//         name={name}
//         value={value}
//         onChange={onChange}
//         rows={3}
//         placeholder={placeholder}
//         className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
//       />
//     ) : (
//       <input
//         id={name}
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl p-3 text-sm text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
//       />
//     )}
//   </div>
// );

// const Profile = () => {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyDescription: "",
//     productsServices: "",
//     website: "",
//     logoUrl: "",
//     contactPerson: "",
//     phone: "",
//     address: "",
//     documents: "",
//   });

//   const [userInfo, setUserInfo] = useState({ name: "", email: "", role: "" });
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const userId = getUserId();
//         if (!userId) {
//           setError("Please login again (user not found).");
//           return;
//         }
//         const res = await axios.get(`${API_BASE_URL}/exhibitors/me/${userId}`);
//         const user = res.data;
//         const profile = user.exhibitorProfile || {};

//         setUserInfo({ name: user.name, email: user.email, role: user.role });
//         setFormData({
//           companyName: profile.companyName || "",
//           companyDescription: profile.companyDescription || "",
//           productsServices: profile.productsServices || "",
//           website: profile.website || "",
//           logoUrl: profile.logoUrl || "",
//           contactPerson: profile.contactPerson || "",
//           phone: profile.phone || "",
//           address: profile.address || "",
//           documents: (profile.documents || []).join(", "),
//         });
//       } catch (err) {
//         setError("Failed to load profile.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError("");
//     setSuccess("");
//     try {
//       const userId = getUserId();
//       const payload = {
//         ...formData,
//         documents: formData.documents.split(",").map((d) => d.trim()).filter(Boolean),
//       };
//       await axios.put(`${API_BASE_URL}/exhibitors/me/${userId}`, payload);
//       setSuccess("Profile updated successfully!");
//     } catch (err) {
//       setError("Update failed.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex h-screen bg-[#020617] items-center justify-center">
//       <Loader2 className="animate-spin text-blue-500" size={40} />
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-200">
//       <ExhibitorSidebar />
//       <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
//         <div className="max-w-5xl mx-auto">
          
//           {/* Top Profile Header with Logo Preview */}
//           <div className="relative mb-8 p-8 rounded-3xl bg-gradient-to-r from-blue-900/40 to-slate-900/40 border border-white/5 backdrop-blur-xl">
//             <div className="flex flex-col md:flex-row items-center gap-6">
//               <div className="h-24 w-24 rounded-2xl bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10 shadow-xl">
//                 {formData.logoUrl ? (
//                   <img src={formData.logoUrl} alt="Logo" className="h-full w-full object-cover" />
//                 ) : (
//                   <Building2 size={40} className="text-slate-500" />
//                 )}
//               </div>
//               <div className="text-center md:text-left">
//                 <h1 className="text-3xl font-bold text-white tracking-tight">{userInfo.name}</h1>
//                 <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 text-sm text-slate-400">
//                   <span className="flex items-center gap-1.5"><Mail size={14} /> {userInfo.email}</span>
//                   <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 capitalize">
//                     <ShieldCheck size={14} /> {userInfo.role}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm">{error}</div>}
//           {success && <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm">{success}</div>}

//           <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Left Column */}
//             <div className="lg:col-span-2 space-y-6">
//               <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-sm">
//                 <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-800 pb-4">
//                   <Building2 size={20} className="text-blue-500" /> Company Identity
//                 </h3>
//                 <FormField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} icon={Building2} />
//                 <FormField label="Company Description" name="companyDescription" value={formData.companyDescription} onChange={handleChange} isTextArea />
//                 <FormField label="Products & Services" name="productsServices" value={formData.productsServices} onChange={handleChange} isTextArea icon={Package} />
//               </div>

//               <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-sm">
//                 <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-800 pb-4">
//                   <Globe size={20} className="text-blue-500" /> Online & Physical Presence
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <FormField label="Website" name="website" value={formData.website} onChange={handleChange} icon={Globe} type="url" placeholder="https://..." />
//                   <FormField label="Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} icon={Camera} placeholder="Image link" />
//                 </div>
//                 <FormField label="Office Address" name="address" value={formData.address} onChange={handleChange} isTextArea icon={MapPin} />
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-6">
//               <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-sm">
//                 <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-800 pb-4">
//                   <User size={20} className="text-blue-500" /> Contact Info
//                 </h3>
//                 <FormField label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} icon={User} />
//                 <FormField label="Phone" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} />
//               </div>

//               <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-sm">
//                 <h3 className="text-lg font-semibold flex items-center gap-2 border-b border-slate-800 pb-4">
//                   <FileText size={20} className="text-blue-500" /> Documents
//                 </h3>
//                 <FormField label="Documents (Comma Separated)" name="documents" value={formData.documents} onChange={handleChange} isTextArea placeholder="doc1.pdf, doc2.pdf" />
//               </div>

//               <button 
//                 type="submit" 
//                 disabled={saving} 
//                 className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
//               >
//                 {saving ? <Loader2 className="animate-spin" size={20} /> : "Save Changes"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Profile;



import React, { useEffect, useState } from "react";
import axios from "axios";
import ExhibitorSidebar from "./ExhibitorSidebar";
import {
  Building2,
  Globe,
  Phone,
  MapPin,
  FileText,
  User,
  Camera,
  Mail,
  ShieldCheck,
  Loader2,
  Package,
  Menu,
  CheckCircle2
} from "lucide-react";
import { motion } from "framer-motion";

const API_BASE_URL = "http://localhost:5000/api";

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?._id || null;
  } catch {
    return null;
  }
};

const FormField = ({ label, name, value, onChange, type = "text", icon: Icon, isTextArea = false, placeholder = "" }) => (
  <div className="flex flex-col gap-2 group">
    <label htmlFor={name} className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 group-focus-within:text-sky-400 transition-colors">
      {Icon && <Icon size={12} />}
      {label}
    </label>
    {isTextArea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={3}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 outline-none transition-all placeholder:text-slate-700"
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-sm text-white focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 outline-none transition-all placeholder:text-slate-700"
      />
    )}
  </div>
);

const Profile = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    productsServices: "",
    website: "",
    logoUrl: "",
    contactPerson: "",
    phone: "",
    address: "",
    documents: "",
  });

  const [userInfo, setUserInfo] = useState({ name: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = getUserId();
        if (!userId) {
          setError("Please login again (user not found).");
          return;
        }
        const res = await axios.get(`${API_BASE_URL}/exhibitors/me/${userId}`);
        const user = res.data;
        const profile = user.exhibitorProfile || {};

        setUserInfo({ name: user.name, email: user.email, role: user.role });
        setFormData({
          companyName: profile.companyName || "",
          companyDescription: profile.companyDescription || "",
          productsServices: profile.productsServices || "",
          website: profile.website || "",
          logoUrl: profile.logoUrl || "",
          contactPerson: profile.contactPerson || "",
          phone: profile.phone || "",
          address: profile.address || "",
          documents: (profile.documents || []).join(", "),
        });
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const userId = getUserId();
      const payload = {
        ...formData,
        documents: formData.documents.split(",").map((d) => d.trim()).filter(Boolean),
      };
      await axios.put(`${API_BASE_URL}/exhibitors/me/${userId}`, payload);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex h-screen bg-[#020617] items-center justify-center">
      <div className="relative">
        <div className="h-12 w-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
        <div className="absolute inset-0 blur-xl bg-sky-500/20 animate-pulse" />
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-200 font-sans overflow-x-hidden">
      
      {/* Sidebar with Props */}
      <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300">
        
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617]/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2.5 bg-white/5 rounded-2xl border border-white/10 text-white"
          >
            <Menu size={22} />
          </button>
          <h2 className="text-xl font-black tracking-tighter text-white">
            EVENT<span className="text-sky-500">SPHERE</span>
          </h2>
          <div className="w-10" /> 
        </div>

        <main className="p-6 md:p-12 lg:p-14 h-screen overflow-y-auto custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            
            {/* Profile Hero Section */}
          {/* Profile Hero Section */}
<motion.div 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  className="relative mb-10 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-sky-500/10 via-slate-900/40 to-indigo-500/10 border border-white/10 p-8 md:p-12 backdrop-blur-3xl"
>
  {/* Badge: Fixed for Mobile & Desktop */}
  <div className="flex justify-center md:absolute md:top-8 md:right-8 mb-6 md:mb-0">
     <div className="px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 whitespace-nowrap">
       <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
       {userInfo.role} Account
     </div>
  </div>

  <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
    <div className="relative group">
      <div className="h-32 w-32 rounded-[2rem] bg-slate-800 flex items-center justify-center overflow-hidden border-4 border-white/5 shadow-2xl transition-transform group-hover:scale-105 duration-500">
        {formData.logoUrl ? (
          <img src={formData.logoUrl} alt="Logo" className="h-full w-full object-cover" />
        ) : (
          <Building2 size={50} className="text-slate-600" />
        )}
      </div>
      <div className="absolute -bottom-2 -right-2 bg-sky-500 p-2 rounded-xl border-4 border-[#020617]">
        <Camera size={16} className="text-white" />
      </div>
    </div>

    <div className="text-center md:text-left">
      <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
        {userInfo.name || "Exhibitor Name"}
      </h1>
      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-slate-400 font-medium">
        <span className="flex items-center gap-2 text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <Mail size={16} className="text-sky-400" /> {userInfo.email}
        </span>
        <span className="flex items-center gap-2 text-sm bg-white/5 px-4 py-2 rounded-xl border border-white/5">
          <ShieldCheck size={16} className="text-emerald-400" /> Verified Partner
        </span>
      </div>
    </div>
  </div>
</motion.div>

            {/* Status Messages */}
            <div className="space-y-4 mb-8">
              {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl font-bold text-sm flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-rose-500" /> {error}
              </div>}
              {success && <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-bold text-sm flex items-center gap-3">
                <CheckCircle2 size={18} /> {success}
              </div>}
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Side: Major Details */}
              <div className="lg:col-span-8 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] space-y-8 backdrop-blur-md"
                >
                  <h3 className="text-lg font-bold flex items-center gap-3 text-white border-b border-white/5 pb-5">
                    <Building2 size={20} className="text-sky-500" /> Company Profile
                  </h3>
                  <div className="space-y-6">
                    <FormField label="Full Company Name" name="companyName" value={formData.companyName} onChange={handleChange} icon={Building2} />
                    <FormField label="Company Bio / Description" name="companyDescription" value={formData.companyDescription} onChange={handleChange} isTextArea />
                    <FormField label="Products & Showcase Items" name="productsServices" value={formData.productsServices} onChange={handleChange} isTextArea icon={Package} />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] space-y-8 backdrop-blur-md"
                >
                  <h3 className="text-lg font-bold flex items-center gap-3 text-white border-b border-white/5 pb-5">
                    <Globe size={20} className="text-indigo-500" /> Location & Media
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Official Website" name="website" value={formData.website} onChange={handleChange} icon={Globe} type="url" placeholder="https://..." />
                    <FormField label="Logo Assets URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} icon={Camera} placeholder="Image link" />
                  </div>
                  <FormField label="Headquarters Address" name="address" value={formData.address} onChange={handleChange} isTextArea icon={MapPin} />
                </motion.div>
              </div>

              {/* Right Side: Contact & Actions */}
              <div className="lg:col-span-4 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] space-y-8 backdrop-blur-md h-fit"
                >
                  <h3 className="text-lg font-bold flex items-center gap-3 text-white border-b border-white/5 pb-5">
                    <User size={20} className="text-emerald-500" /> Point of Contact
                  </h3>
                  <div className="space-y-6">
                    <FormField label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} icon={User} />
                    <FormField label="Direct Phone" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white/[0.02] border border-white/10 p-8 rounded-[2rem] space-y-8 backdrop-blur-md h-fit"
                >
                  <h3 className="text-lg font-bold flex items-center gap-3 text-white border-b border-white/5 pb-5">
                    <FileText size={20} className="text-amber-500" /> Attachments
                  </h3>
                  <FormField label="Digital Documents (Links)" name="documents" value={formData.documents} onChange={handleChange} isTextArea placeholder="link1.pdf, link2.pdf" />
                </motion.div>

                <button 
                  type="submit" 
                  disabled={saving} 
                  className="w-full py-5 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-sky-600/20 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 border border-white/10"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : (
                    <>
                      <span>SYNC CHANGES</span>
                      <CheckCircle2 size={18} />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;