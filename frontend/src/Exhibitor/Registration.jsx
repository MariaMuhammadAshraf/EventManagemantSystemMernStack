// import React, { useState } from "react";
// import axios from "axios";
// import ExhibitorSidebar from "./ExhibitorSidebar";
// import { Building2, Globe, Phone, MapPin, FileText, User, Camera, Package } from "lucide-react";

// const API_BASE_URL = "https://event-managemant-system-mern-stack.vercel.app//api";

// const getLoggedInUser = () => {
//   try {
//     return JSON.parse(localStorage.getItem("user"));
//   } catch {
//     return null;
//   }
// };

// // ✅ FIX: FormField moved OUTSIDE the component to prevent focus loss
// const FormField = ({ label, name, value, onChange, type = "text", icon: Icon, placeholder, isTextArea = false }) => (
//   <div className="flex flex-col gap-2">
//     <label htmlFor={name} className="text-sm font-medium text-slate-300 flex items-center gap-2 cursor-pointer">
//       {Icon && <Icon size={16} className="text-blue-400" />}
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
//         className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
//       />
//     ) : (
//       <input
//         id={name}
//         type={type}
//         name={name}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600"
//       />
//     )}
//   </div>
// );

// const Registration = () => {
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

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");
//     setLoading(true);

//     try {
//       const user = getLoggedInUser();
//       if (!user?._id) {
//         setError("Please login again (user not found in localStorage).");
//         return;
//       }

//       const payload = {
//         userId: user._id,
//         ...formData,
//         documents: formData.documents.split(",").map((d) => d.trim()).filter(Boolean),
//       };

//       const res = await axios.post(`${API_BASE_URL}/exhibitors/register`, payload);
//       setSuccess(res.data.message || "Registered successfully!");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-white font-sans">
//       <ExhibitorSidebar />
//       <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
//         <div className="max-w-4xl mx-auto">
//           <header className="mb-10">
//             <h1 className="text-3xl font-bold">Exhibitor Registration</h1>
//             <p className="text-slate-400 mt-2">Complete your profile to start showcasing your products.</p>
//           </header>

//           {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl">{error}</div>}
//           {success && <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 rounded-xl">{success}</div>}

//           <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl space-y-8">
//             <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField label="Company Name *" name="companyName" value={formData.companyName} onChange={handleChange} icon={Building2} placeholder="e.g. TechCorp Solutions" />
//               <FormField label="Website" name="website" value={formData.website} onChange={handleChange} type="url" icon={Globe} placeholder="https://..." />
//               <div className="md:col-span-2">
//                 <FormField label="Company Description" name="companyDescription" value={formData.companyDescription} onChange={handleChange} isTextArea icon={FileText} placeholder="Describe your business..." />
//               </div>
//               <div className="md:col-span-2">
//                 <FormField label="Products & Services" name="productsServices" value={formData.productsServices} onChange={handleChange} isTextArea icon={Package} placeholder="List products..." />
//               </div>
//             </section>

//             <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
//               <FormField label="Contact Person" name="contactPerson" value={formData.contactPerson} onChange={handleChange} icon={User} placeholder="Full Name" />
//               <FormField label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} placeholder="+123456789" />
//               <div className="md:col-span-2">
//                 <FormField label="Office Address" name="address" value={formData.address} onChange={handleChange} isTextArea icon={MapPin} placeholder="Full address..." />
//               </div>
//             </section>

//             <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
//               <FormField label="Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} icon={Camera} placeholder="https://image-link.com" />
//               <FormField label="Required Documents" name="documents" value={formData.documents} onChange={handleChange} icon={FileText} placeholder="doc1.pdf, doc2.pdf" />
//             </section>

//             <button type="submit" disabled={loading} className="w-full md:w-auto px-10 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all">
//               {loading ? "Processing..." : "Register as Exhibitor"}
//             </button>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Registration;



import React, { useState } from "react";
import axios from "axios";
import ExhibitorSidebar from "./ExhibitorSidebar";
import { Building2, Globe, Phone, MapPin, FileText, User, Camera, Package, Menu, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion"; // Adding subtle animations like your dashboard

const API_BASE_URL = "https://event-managemant-system-mern-stack.vercel.app//api";

const getLoggedInUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

const FormField = ({ label, name, value, onChange, type = "text", icon: Icon, placeholder, isTextArea = false }) => (
  <div className="flex flex-col gap-2 group">
    <label htmlFor={name} className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-sky-400 transition-colors">
      {Icon && <Icon size={14} />}
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
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 outline-none transition-all placeholder:text-slate-700"
      />
    ) : (
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-4 text-white focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500/50 outline-none transition-all placeholder:text-slate-700"
      />
    )}
  </div>
);

const Registration = () => {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const user = getLoggedInUser();
      if (!user?._id) {
        setError("Session expired. Please login again.");
        return;
      }

      const payload = {
        userId: user._id,
        ...formData,
        documents: formData.documents.split(",").map((d) => d.trim()).filter(Boolean),
      };

      const res = await axios.post(`${API_BASE_URL}/exhibitors/register`, payload);
      setSuccess(res.data.message || "Registration successful!");
    } catch (err) {
      setError(err.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden selection:bg-sky-500/30">
      
      {/* Sidebar logic from dashboard */}
      <ExhibitorSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-72 transition-all duration-300">
        
        {/* Mobile Header with Hamburger */}
        <div className="lg:hidden flex items-center justify-between px-6 py-5 bg-[#020617]/80 border-b border-white/5 sticky top-0 z-40 backdrop-blur-xl">
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

        <main className="p-6 md:p-12 lg:p-16 h-screen overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            
            {/* Header Section */}
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                Partner Onboarding
              </div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4">
                Exhibitor <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-400 to-indigo-500">Registration</span>
              </h1>
              <p className="text-slate-500 text-lg font-medium max-w-2xl leading-relaxed">
                Unlock your premium booth space and start connecting with thousands of potential leads today.
              </p>
            </motion.header>

            {/* Error/Success Alerts */}
            <div className="space-y-4 mb-8">
              {error && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-2xl font-bold flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)]" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl font-bold flex items-center gap-3">
                  <CheckCircle2 size={18} />
                  {success}
                </motion.div>
              )}
            </div>

            {/* Main Form Card */}
            <motion.form 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit} 
              className="relative overflow-hidden rounded-[2.5rem] bg-white/[0.02] border border-white/10 p-8 md:p-12 backdrop-blur-3xl shadow-2xl"
            >
              <div className="absolute -top-24 -right-24 h-64 w-64 bg-sky-500/5 blur-[100px]" />
              
              <div className="space-y-12 relative">
                
                {/* Section 1: Business Identity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="md:col-span-2 border-b border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="h-6 w-1 bg-sky-500 rounded-full" />
                      Business Identity
                    </h3>
                  </div>
                  <FormField label="Company Name *" name="companyName" value={formData.companyName} onChange={handleChange} icon={Building2} placeholder="e.g. InnovateX Global" />
                  <FormField label="Official Website" name="website" value={formData.website} onChange={handleChange} type="url" icon={Globe} placeholder="https://www.yourbrand.com" />
                  <div className="md:col-span-2">
                    <FormField label="Company Overview" name="companyDescription" value={formData.companyDescription} onChange={handleChange} isTextArea icon={FileText} placeholder="Briefly describe your company mission and vision..." />
                  </div>
                  <div className="md:col-span-2">
                    <FormField label="Key Products & Services" name="productsServices" value={formData.productsServices} onChange={handleChange} isTextArea icon={Package} placeholder="List what you'll be showcasing at the event..." />
                  </div>
                </div>

                {/* Section 2: Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                  <div className="md:col-span-2 border-b border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="h-6 w-1 bg-indigo-500 rounded-full" />
                      Contact Information
                    </h3>
                  </div>
                  <FormField label="Lead Representative" name="contactPerson" value={formData.contactPerson} onChange={handleChange} icon={User} placeholder="Full Name" />
                  <FormField label="Direct Phone" name="phone" value={formData.phone} onChange={handleChange} icon={Phone} placeholder="+1 (555) 000-0000" />
                  <div className="md:col-span-2">
                    <FormField label="Headquarters Address" name="address" value={formData.address} onChange={handleChange} isTextArea icon={MapPin} placeholder="Complete physical address..." />
                  </div>
                </div>

                {/* Section 3: Verification */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pb-4">
                  <div className="md:col-span-2 border-b border-white/5 pb-4">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                      <div className="h-6 w-1 bg-emerald-500 rounded-full" />
                      Assets & Verification
                    </h3>
                  </div>
                  <FormField label="Brand Logo URL" name="logoUrl" value={formData.logoUrl} onChange={handleChange} icon={Camera} placeholder="Link to high-res PNG/SVG" />
                  <FormField label="Required Documents" name="documents" value={formData.documents} onChange={handleChange} icon={FileText} placeholder="doc1.pdf, doc2.pdf (comma separated)" />
                </div>

                {/* Submit Button Section */}
                <div className="flex items-center justify-between gap-6 pt-6 border-t border-white/5">
                  <div className="hidden md:block">
                    <p className="text-xs text-slate-500 font-medium">Please ensure all fields marked with * are filled correctly.</p>
                  </div>
                  <button 
                    type="submit" 
                    disabled={loading} 
                    className="group relative w-full md:w-auto px-10 py-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-black rounded-2xl transition-all shadow-xl shadow-sky-600/20 active:scale-95 flex items-center justify-center gap-3 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    {loading ? (
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>COMPLETE REGISTRATION</span>
                        <CheckCircle2 size={18} className="group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Registration;