// import React, { useEffect, useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import { 
//   Save, 
//   Trash2, 
//   Edit3, 
//   EyeOff, 
//   Plus, 
//   Layout, 
//   Target, 
//   Zap, 
//   MousePointer2,
//   Image as ImageIcon
// } from "lucide-react"; // npm install lucide-react

// function AdminAbout() {
//   const [about, setAbout] = useState({
//     hero: { title: "", highlight: "", description: "", backgroundImageUrl: "" },
//     mission: { title: "", description: "", imageUrl: "" },
//     vision: { title: "", description: "", imageUrl: "" },
//     features: { heading: "", items: [] },
//     cta: { title: "", description: "", link: "", imageUrl: "" },
//   });
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(true);

//   // Styling Constants matching your theme
//   const inputClass = "w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder-slate-600 disabled:opacity-50 disabled:cursor-not-allowed";
//   const textareaClass = inputClass + " resize-none min-h-[100px]";
//   const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block";

//   useEffect(() => {
//     const fetchAbout = async () => {
//       try {
//         const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/about");
//         if (!res.ok) throw new Error("Failed to fetch");
//         const data = await res.json();
//         if (!data.features?.items) data.features = { heading: "", items: [] };
//         setAbout(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAbout();
//   }, []);

//   const updateSection = (section, key, value) => {
//     setAbout((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
//   };

//   const handleFeatureChange = (index, key, value) => {
//     const newItems = [...about.features.items];
//     newItems[index] = { ...newItems[index], [key]: value };
//     setAbout((prev) => ({ ...prev, features: { ...prev.features, items: newItems } }));
//   };

//   const addFeature = () => {
//     setAbout((prev) => ({
//       ...prev,
//       features: {
//         ...prev.features,
//         items: [...prev.features.items, { iconUrl: "", title: "", description: "" }],
//       },
//     }));
//   };

//   const removeFeature = (index) => {
//     const newItems = about.features.items.filter((_, i) => i !== index);
//     setAbout((prev) => ({ ...prev, features: { ...prev.features, items: newItems } }));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     try {
//       const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/about", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(about),
//       });
//       if (res.ok) alert("Page content updated successfully!");
//     } catch (err) {
//       alert("Error saving data");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("This will clear all About content. Proceed?")) return;
//     setSaving(true);
//     try {
//       await fetch("https://event-managemant-system-mern-stack.vercel.app/api/about", { method: "DELETE" });
//       setAbout({
//         hero: { title: "", highlight: "", description: "", backgroundImageUrl: "" },
//         mission: { title: "", description: "", imageUrl: "" },
//         vision: { title: "", description: "", imageUrl: "" },
//         features: { heading: "", items: [] },
//         cta: { title: "", description: "", link: "", imageUrl: "" },
//       });
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading) return (
//     <div className="flex items-center justify-center min-h-screen bg-[#020617] text-sky-400">
//       <div className="animate-pulse font-bold tracking-widest">LOADING CONTENT...</div>
//     </div>
//   );

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100">
//       <AdminSidebar />
      
//       <main className="flex-1 px-8 lg:px-12 py-12 overflow-y-auto">
//         <header className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
//           <div>
//             <p className="text-sky-400 font-bold uppercase tracking-widest text-xs mb-2">Content Management</p>
//             <h1 className="text-4xl font-black text-white tracking-tight">About Page Editor</h1>
//           </div>
          
//           <div className="flex gap-3">
//             <button 
//               type="button" 
//               onClick={() => setIsEditing(!isEditing)} 
//               className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-bold transition-all ${
//                 isEditing 
//                 ? "border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white" 
//                 : "border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white"
//               }`}
//             >
//               {isEditing ? <EyeOff size={18}/> : <Edit3 size={18}/>}
//               {isEditing ? "View Mode" : "Edit Mode"}
//             </button>
//             <button 
//               onClick={handleDelete}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all font-bold"
//             >
//               <Trash2 size={18}/> Reset
//             </button>
//           </div>
//         </header>

//         <form onSubmit={handleSave} className="space-y-12 pb-20">

//           {/* HERO SECTION */}
//           <SectionCard icon={<Layout size={20}/>} title="Hero Section">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className={labelClass}>Main Title</label>
//                 <input className={inputClass} value={about.hero.title} onChange={(e) => updateSection("hero", "title", e.target.value)} disabled={!isEditing} />
//               </div>
//               <div>
//                 <label className={labelClass}>Text Highlight</label>
//                 <input className={inputClass} value={about.hero.highlight} onChange={(e) => updateSection("hero", "highlight", e.target.value)} disabled={!isEditing} />
//               </div>
//               <div className="md:col-span-2">
//                 <label className={labelClass}>Hero Description</label>
//                 <textarea className={textareaClass} value={about.hero.description} onChange={(e) => updateSection("hero", "description", e.target.value)} disabled={!isEditing} />
//               </div>
//               <div className="md:col-span-2">
//                 <label className={labelClass}>Background Image URL</label>
//                 <input className={inputClass} value={about.hero.backgroundImageUrl} onChange={(e) => updateSection("hero", "backgroundImageUrl", e.target.value)} disabled={!isEditing} />
//               </div>
//             </div>
//           </SectionCard>

//           {/* MISSION & VISION */}
//           <SectionCard icon={<Target size={20}/>} title="Mission & Vision">
//             <div className="grid lg:grid-cols-2 gap-10">
//               <div className="space-y-6 p-6 bg-white/5 rounded-2xl border border-white/5">
//                 <h4 className="text-emerald-400 font-bold text-sm uppercase tracking-tighter italic">Mission Statement</h4>
//                 <div>
//                   <label className={labelClass}>Heading</label>
//                   <input className={inputClass} value={about.mission.title} onChange={(e) => updateSection("mission", "title", e.target.value)} disabled={!isEditing} />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Description</label>
//                   <textarea className={textareaClass} value={about.mission.description} onChange={(e) => updateSection("mission", "description", e.target.value)} disabled={!isEditing} />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Image URL</label>
//                   <input className={inputClass} value={about.mission.imageUrl} onChange={(e) => updateSection("mission", "imageUrl", e.target.value)} disabled={!isEditing} />
//                 </div>
//               </div>

//               <div className="space-y-6 p-6 bg-white/5 rounded-2xl border border-white/5">
//                 <h4 className="text-sky-400 font-bold text-sm uppercase tracking-tighter italic">Vision Statement</h4>
//                 <div>
//                   <label className={labelClass}>Heading</label>
//                   <input className={inputClass} value={about.vision.title} onChange={(e) => updateSection("vision", "title", e.target.value)} disabled={!isEditing} />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Description</label>
//                   <textarea className={textareaClass} value={about.vision.description} onChange={(e) => updateSection("vision", "description", e.target.value)} disabled={!isEditing} />
//                 </div>
//                 <div>
//                   <label className={labelClass}>Image URL</label>
//                   <input className={inputClass} value={about.vision.imageUrl} onChange={(e) => updateSection("vision", "imageUrl", e.target.value)} disabled={!isEditing} />
//                 </div>
//               </div>
//             </div>
//           </SectionCard>

//           {/* FEATURES */}
//           <SectionCard icon={<Zap size={20}/>} title="Core Features">
//             <div className="mb-8">
//               <label className={labelClass}>Section Heading</label>
//               <input className={inputClass + " text-xl font-bold"} value={about.features.heading} onChange={(e) => updateSection("features", "heading", e.target.value)} disabled={!isEditing} />
//             </div>

//             <div className="grid md:grid-cols-2 gap-6">
//               {about.features.items.map((f, i) => (
//                 <div key={i} className="relative group p-6 border border-slate-800 bg-slate-900/40 rounded-2xl space-y-4 hover:border-sky-500/50 transition-all">
//                   <button type="button" onClick={() => removeFeature(i)} className="absolute top-4 right-4 text-rose-500 hover:text-rose-400 transition-colors" disabled={!isEditing}><Trash2 size={16}/></button>
//                   <div>
//                     <label className={labelClass}>Feature {i+1} Title</label>
//                     <input className={inputClass} value={f.title} onChange={(e) => handleFeatureChange(i, "title", e.target.value)} disabled={!isEditing} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Description</label>
//                     <textarea className={textareaClass} value={f.description} onChange={(e) => handleFeatureChange(i, "description", e.target.value)} disabled={!isEditing} />
//                   </div>
//                   <div>
//                     <label className={labelClass}>Icon URL / Name</label>
//                     <input className={inputClass} value={f.iconUrl} onChange={(e) => handleFeatureChange(i, "iconUrl", e.target.value)} disabled={!isEditing} />
//                   </div>
//                 </div>
//               ))}
//               <button 
//                 type="button" 
//                 onClick={addFeature} 
//                 className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:border-emerald-500 hover:text-emerald-500 transition-all group"
//                 disabled={!isEditing}
//               >
//                 <Plus size={32} className="group-hover:scale-110 transition-transform mb-2"/>
//                 <span className="font-bold uppercase tracking-tighter">Add Feature Block</span>
//               </button>
//             </div>
//           </SectionCard>

//           {/* CTA */}
//           <SectionCard icon={<MousePointer2 size={20}/>} title="Call To Action">
//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <label className={labelClass}>Main Heading</label>
//                 <input className={inputClass} value={about.cta.title} onChange={(e) => updateSection("cta", "title", e.target.value)} disabled={!isEditing} />
//               </div>
//               <div>
//                 <label className={labelClass}>Target Link (URL)</label>
//                 <input className={inputClass} value={about.cta.link} onChange={(e) => updateSection("cta", "link", e.target.value)} disabled={!isEditing} />
//               </div>
//               <div className="md:col-span-2">
//                 <label className={labelClass}>CTA Description</label>
//                 <textarea className={textareaClass} value={about.cta.description} onChange={(e) => updateSection("cta", "description", e.target.value)} disabled={!isEditing} />
//               </div>
//               <div className="md:col-span-2">
//                 <label className={labelClass}>Section Illustration URL</label>
//                 <input className={inputClass} value={about.cta.imageUrl} onChange={(e) => updateSection("cta", "imageUrl", e.target.value)} disabled={!isEditing} />
//               </div>
//             </div>
//           </SectionCard>

//           {/* FLOATING SAVE BAR */}
//           <div className="fixed bottom-8 right-8 z-30">
//             <button 
//               type="submit" 
//               disabled={saving || !isEditing} 
//               className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-lg transition-all shadow-2xl shadow-emerald-900/40 disabled:opacity-0 translate-y-0 disabled:translate-y-10"
//             >
//               {saving ? "SAVING..." : <><Save size={24}/> SAVE ALL CHANGES</>}
//             </button>
//           </div>

//         </form>
//       </main>
//     </div>
//   );
// }

// /* Helper Component: Section Card */
// const SectionCard = ({ icon, title, children }) => (
//   <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
//     <div className="p-6 bg-slate-900/50 border-b border-slate-800 flex items-center gap-3">
//       <div className="p-2 bg-sky-500/10 rounded-lg text-sky-400">
//         {icon}
//       </div>
//       <h2 className="text-xl font-black text-white">{title}</h2>
//     </div>
//     <div className="p-8">
//       {children}
//     </div>
//   </div>
// );

// export default AdminAbout;


import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { 
  Save, 
  Trash2, 
  Edit3, 
  EyeOff, 
  Plus, 
  Layout, 
  Target, 
  Zap, 
  MousePointer2,
  Menu,
  BarChart3
} from "lucide-react";

function AdminAbout() {
  const [about, setAbout] = useState({
    hero: { title: "", highlight: "", description: "", backgroundImageUrl: "" },
    mission: { title: "", description: "", imageUrl: "" },
    vision: { title: "", description: "", imageUrl: "" },
    features: { heading: "", items: [] },
    cta: { title: "", description: "", link: "", imageUrl: "" },
  });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false); // ✅ Mobile Sidebar State

  const inputClass = "w-full bg-black/40 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder-slate-600 disabled:opacity-50 disabled:cursor-not-allowed";
  const textareaClass = inputClass + " resize-none min-h-[100px]";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 block";

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/about");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (!data.features?.items) data.features = { heading: "", items: [] };
        setAbout(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const updateSection = (section, key, value) => {
    setAbout((prev) => ({ ...prev, [section]: { ...prev[section], [key]: value } }));
  };

  const handleFeatureChange = (index, key, value) => {
    const newItems = [...about.features.items];
    newItems[index] = { ...newItems[index], [key]: value };
    setAbout((prev) => ({ ...prev, features: { ...prev.features, items: newItems } }));
  };

  const addFeature = () => {
    setAbout((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        items: [...prev.features.items, { iconUrl: "", title: "", description: "" }],
      },
    }));
  };

  const removeFeature = (index) => {
    const newItems = about.features.items.filter((_, i) => i !== index);
    setAbout((prev) => ({ ...prev, features: { ...prev.features, items: newItems } }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/about", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(about),
      });
      if (res.ok) alert("Page content updated successfully!");
    } catch (err) {
      alert("Error saving data");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("This will clear all About content. Proceed?")) return;
    setSaving(true);
    try {
      await fetch("https://event-managemant-system-mern-stack.vercel.app/api/about", { method: "DELETE" });
      setAbout({
        hero: { title: "", highlight: "", description: "", backgroundImageUrl: "" },
        mission: { title: "", description: "", imageUrl: "" },
        vision: { title: "", description: "", imageUrl: "" },
        features: { heading: "", items: [] },
        cta: { title: "", description: "", link: "", imageUrl: "" },
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#020617] text-sky-400">
      <div className="animate-pulse font-bold tracking-widest uppercase">Initializing Editor...</div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden">
      {/* ✅ Responsive Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-300">
        
        {/* ✅ Mobile Header with Hamburger & Centered Title */}
       <div className="lg:hidden flex items-center justify-between p-4 bg-[#020617] border-b border-white/5 sticky top-0 z-40">
          <button 
            onClick={() => setSidebarOpen(true)} 
            className="p-2 bg-slate-800 rounded-xl border border-slate-700 active:scale-90 transition-transform"
          >
            <Menu size={20} />
          </button>
          <span className="font-black text-sky-500 text-[10px] tracking-[0.3em] uppercase">About Editor</span>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>

        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-8 lg:py-12 overflow-y-auto">
          {/* ✅ Responsive Header - Centered on Mobile */}
          <header className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left">
            <div>
              <p className="text-sky-400 font-bold uppercase tracking-widest text-[10px] mb-2">Content Management</p>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight italic">
                About <span className="text-sky-500">Editor</span>
              </h1>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                type="button" 
                onClick={() => setIsEditing(!isEditing)} 
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border font-bold transition-all ${
                  isEditing 
                  ? "border-amber-500/30 text-amber-400 hover:bg-amber-500 hover:text-white" 
                  : "border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white"
                }`}
              >
                {isEditing ? <EyeOff size={18}/> : <Edit3 size={18}/>}
                <span className="hidden sm:inline">{isEditing ? "View Mode" : "Edit Mode"}</span>
              </button>
              <button 
                onClick={handleDelete}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-all font-bold"
              >
                <Trash2 size={18}/> Reset
              </button>
            </div>
          </header>

          <form onSubmit={handleSave} className="space-y-12 pb-24">
            {/* HERO SECTION */}
            <SectionCard icon={<Layout size={20}/>} title="Hero Section">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className={labelClass}>Main Title</label>
                  <input className={inputClass} value={about.hero.title} onChange={(e) => updateSection("hero", "title", e.target.value)} disabled={!isEditing} />
                </div>
                <div className="md:col-span-1">
                  <label className={labelClass}>Text Highlight</label>
                  <input className={inputClass} value={about.hero.highlight} onChange={(e) => updateSection("hero", "highlight", e.target.value)} disabled={!isEditing} />
                </div>
                <div className="col-span-full">
                  <label className={labelClass}>Hero Description</label>
                  <textarea className={textareaClass} value={about.hero.description} onChange={(e) => updateSection("hero", "description", e.target.value)} disabled={!isEditing} />
                </div>
                <div className="col-span-full">
                  <label className={labelClass}>Background Image URL</label>
                  <input className={inputClass} value={about.hero.backgroundImageUrl} onChange={(e) => updateSection("hero", "backgroundImageUrl", e.target.value)} disabled={!isEditing} />
                </div>
              </div>
            </SectionCard>

            {/* MISSION & VISION */}
            <SectionCard icon={<Target size={20}/>} title="Mission & Vision">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="space-y-6 p-5 sm:p-8 bg-white/5 rounded-3xl border border-white/5">
                  <h4 className="text-emerald-400 font-black text-xs uppercase tracking-[0.2em] italic mb-4">Mission Statement</h4>
                  <div>
                    <label className={labelClass}>Heading</label>
                    <input className={inputClass} value={about.mission.title} onChange={(e) => updateSection("mission", "title", e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea className={textareaClass} value={about.mission.description} onChange={(e) => updateSection("mission", "description", e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className={labelClass}>Image URL</label>
                    <input className={inputClass} value={about.mission.imageUrl} onChange={(e) => updateSection("mission", "imageUrl", e.target.value)} disabled={!isEditing} />
                  </div>
                </div>

                <div className="space-y-6 p-5 sm:p-8 bg-white/5 rounded-3xl border border-white/5">
                  <h4 className="text-sky-400 font-black text-xs uppercase tracking-[0.2em] italic mb-4">Vision Statement</h4>
                  <div>
                    <label className={labelClass}>Heading</label>
                    <input className={inputClass} value={about.vision.title} onChange={(e) => updateSection("vision", "title", e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea className={textareaClass} value={about.vision.description} onChange={(e) => updateSection("vision", "description", e.target.value)} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className={labelClass}>Image URL</label>
                    <input className={inputClass} value={about.vision.imageUrl} onChange={(e) => updateSection("vision", "imageUrl", e.target.value)} disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* FEATURES */}
            <SectionCard icon={<Zap size={20}/>} title="Core Features">
              <div className="mb-8">
                <label className={labelClass}>Section Heading</label>
                <input className={inputClass + " text-lg md:text-xl font-black"} value={about.features.heading} onChange={(e) => updateSection("features", "heading", e.target.value)} disabled={!isEditing} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {about.features.items.map((f, i) => (
                  <div key={i} className="relative group p-6 border border-slate-800 bg-slate-900/40 rounded-3xl space-y-4 hover:border-sky-500/50 transition-all">
                    <button type="button" onClick={() => removeFeature(i)} className="absolute top-4 right-4 text-rose-500 hover:scale-110 transition-transform" disabled={!isEditing}><Trash2 size={16}/></button>
                    <div>
                      <label className={labelClass}>Feature {i+1} Title</label>
                      <input className={inputClass} value={f.title} onChange={(e) => handleFeatureChange(i, "title", e.target.value)} disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea className={textareaClass} value={f.description} onChange={(e) => handleFeatureChange(i, "description", e.target.value)} disabled={!isEditing} />
                    </div>
                    <div>
                      <label className={labelClass}>Icon URL / Name</label>
                      <input className={inputClass} value={f.iconUrl} onChange={(e) => handleFeatureChange(i, "iconUrl", e.target.value)} disabled={!isEditing} />
                    </div>
                  </div>
                ))}
                <button 
                  type="button" 
                  onClick={addFeature} 
                  className="flex flex-col items-center justify-center min-h-[250px] p-8 border-2 border-dashed border-slate-800 rounded-3xl text-slate-500 hover:border-emerald-500 hover:text-emerald-500 transition-all group"
                  disabled={!isEditing}
                >
                  <Plus size={32} className="group-hover:scale-110 transition-transform mb-2"/>
                  <span className="font-bold uppercase tracking-tighter text-xs">Add Feature Block</span>
                </button>
              </div>
            </SectionCard>

            {/* CTA SECTION */}
            <SectionCard icon={<MousePointer2 size={20}/>} title="Call To Action">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Main Heading</label>
                  <input className={inputClass} value={about.cta.title} onChange={(e) => updateSection("cta", "title", e.target.value)} disabled={!isEditing} />
                </div>
                <div>
                  <label className={labelClass}>Target Link (URL)</label>
                  <input className={inputClass} value={about.cta.link} onChange={(e) => updateSection("cta", "link", e.target.value)} disabled={!isEditing} />
                </div>
                <div className="col-span-full">
                  <label className={labelClass}>CTA Description</label>
                  <textarea className={textareaClass} value={about.cta.description} onChange={(e) => updateSection("cta", "description", e.target.value)} disabled={!isEditing} />
                </div>
                <div className="col-span-full">
                  <label className={labelClass}>Section Illustration URL</label>
                  <input className={inputClass} value={about.cta.imageUrl} onChange={(e) => updateSection("cta", "imageUrl", e.target.value)} disabled={!isEditing} />
                </div>
              </div>
            </SectionCard>

            {/* ✅ FIXED FLOATING SAVE BAR - Positioned better for mobile */}
            <div className="fixed bottom-6 right-6 left-6 md:left-auto md:bottom-8 md:right-8 z-40">
              <button 
                type="submit" 
                disabled={saving || !isEditing} 
                className="w-full md:w-auto flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black text-sm md:text-lg transition-all shadow-2xl shadow-emerald-900/40 disabled:opacity-0 translate-y-0 disabled:translate-y-10"
              >
                {saving ? "SAVING..." : <><Save size={24}/> SAVE ALL CHANGES</>}
              </button>
            </div>
          </form>
        </main>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>
    </div>
  );
}

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-slate-900/40 backdrop-blur-md border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
    <div className="p-6 bg-slate-900/50 border-b border-white/5 flex items-center gap-4">
      <div className="p-2.5 bg-sky-500/10 rounded-xl text-sky-400">
        {icon}
      </div>
      <h2 className="text-lg md:text-xl font-black text-white italic tracking-tight">{title}</h2>
    </div>
    <div className="p-5 sm:p-10">
      {children}
    </div>
  </div>
);

export default AdminAbout;














