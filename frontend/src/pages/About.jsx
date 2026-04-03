// import React, { useEffect, useState } from "react";

// function About() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     fetch("https://event-managemant-system-mern-stack.vercel.app//api/about")
//       .then((res) => res.json())
//       .then(setData)
//       .catch(console.error);
//   }, []);

//   if (!data) return <div className="text-white flex items-center justify-center min-h-screen">Loading...</div>;

//   const { hero, mission, vision, features, cta } = data;

//   return (
//     <div className="text-white bg-slate-900">

//       {/* HERO */}
//       <section
//         className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-cover bg-center relative"
//         style={{ backgroundImage: `url(${hero?.backgroundImageUrl || ""})` }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-sky-900/60"></div>
//         <div className="relative z-10 max-w-4xl">
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//             {hero?.title} <span className="text-sky-400">{hero?.highlight}</span>
//           </h1>
//           <p className="mt-6 text-lg text-blue-100">{hero?.description}</p>
//         </div>
//       </section>

//       {/* MISSION & VISION */}
//       <section className="relative py-32 px-6 overflow-hidden">
//         <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
//           {mission && (
//             <div className="bg-blue-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-sky-400/20 shadow-2xl hover:scale-[1.03] transition">
//               {mission.imageUrl && <img src={mission.imageUrl} alt="Mission" className="w-full h-56 object-cover rounded-2xl mb-6" />}
//               <h2 className="text-3xl font-bold mb-4 text-white">{mission.title}</h2>
//               <p className="text-blue-100 text-lg leading-relaxed">{mission.description}</p>
//             </div>
//           )}
//           {vision && (
//             <div className="bg-blue-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-sky-400/20 shadow-2xl hover:scale-[1.03] transition">
//               {vision.imageUrl && <img src={vision.imageUrl} alt="Vision" className="w-full h-56 object-cover rounded-2xl mb-6" />}
//               <h2 className="text-3xl font-bold mb-4 text-white">{vision.title}</h2>
//               <p className="text-blue-100 text-lg leading-relaxed">{vision.description}</p>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* FEATURES */}
//       <section className="relative py-32 px-6 overflow-hidden">
//         <div className="relative max-w-6xl mx-auto text-center">
//           <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
//             {features?.heading} 
//           </h2>
//           <div className="grid md:grid-cols-3 gap-10">
//             {(features?.items || []).map((f, i) => (
//               <div key={i} className="bg-blue-900/40 backdrop-blur-2xl p-8 rounded-3xl border border-sky-400/20 shadow-2xl hover:scale-[1.05] hover:shadow-sky-500/30 transition">
//                 {f.iconUrl && <img src={f.iconUrl} alt={f.title} className="w-16 mx-auto mb-6" />}
//                 <h3 className="text-2xl font-semibold mb-4 text-white">{f.title}</h3>
//                 <p className="text-blue-100 leading-relaxed">{f.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       {cta && (
        
//         <section className="relative py-32 px-6 text-center overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-sky-900/30 to-transparent"></div>
//          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/20 blur-3xl rounded-full"></div>
//           <div className="relative max-w-4xl mx-auto">
//             <h2 className="text-4xl md:text-5xl font-extrabold mb-6">{cta.title}</h2>
//             <p className="text-blue-100 mb-12 text-lg">{cta.description}</p>
//             {cta.link && (
//               <a
//                 href={cta.link}
//                 className="inline-flex items-center gap-3 px-12 py-4 rounded-2xl text-white font-semibold text-lg bg-gradient-to-r from-blue-500 to-sky-500 shadow-2xl hover:scale-110 hover:shadow-sky-500/40 transition"
//               >
//                 Get Started 🚀
//               </a>
//             )}
//           </div>
//         </section>
//       )}
//     </div>
//   );
// }

// export default About;

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://event-managemant-system-mern-stack.vercel.app//api/about")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return (
    <div className="bg-[#020617] h-screen flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-sky-400 font-medium tracking-widest animate-pulse uppercase">Initializing EventSphere...</p>
    </div>
  );

  const { hero, mission, vision, features, cta } = data;

  return (
    <div className="text-white bg-[#020617] overflow-x-hidden font-sans">
      
      <section className="relative h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-[#020617]">
  
  {/* Background Image with Scale Animation */}
  <motion.div 
    initial={{ scale: 1.15 }}
    animate={{ scale: 1 }}
    transition={{ duration: 2 }}
    className="absolute inset-0 z-0 bg-cover bg-center opacity-40"
    style={{ backgroundImage: `url(${hero?.backgroundImageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1920&q=80"})` }}
  />
  
  {/* Dark Layer for Text Contrast */}
  <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-slate-950/80 to-[#020617] z-10"></div>

  {/* --- THE HEADING STYLE YOU REQUESTED --- */}
  <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Exact Heading Style from image_041217.jpg */}
      <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-blue-400 uppercase leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-blue-400 uppercase">{hero?.title || "About"}</span>{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-blue-500">
          {hero?.highlight || "EventSphere"}
        </span>
      </h1>

      {/* Blue Underline from image_e3484a.jpg */}
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: "80px" }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="h-1.5 bg-sky-500 mx-auto mt-4 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.6)]"
      ></motion.div>

      {/* Subtext from image_041217.jpg */}
      <p className="mt-6 text-sm sm:text-lg md:text-xl text-blue-100/70 font-medium px-4 md:px-0 max-w-2xl mx-auto leading-relaxed sm:leading-loose tracking-wide">
        {hero?.description || "Let's build your next world-class expo together."}
      </p>
    </motion.div>
  </div>
</section>

      {/* --- MISSION & VISION (Interactive Cards) --- */}
      <section className="relative z-30 -mt-16 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10">
          {[
            { content: mission, color: "from-blue-600/20" },
            { content: vision, color: "from-sky-600/20" }
          ].map((item, idx) => (
            item.content && (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: idx === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative group overflow-hidden bg-[#0f172a]/80 backdrop-blur-2xl p-1 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="relative p-8 z-10">
                  {item.content.imageUrl && (
                    <img 
                      src={item.content.imageUrl} 
                      alt="img" 
                      className="w-full h-64 object-cover rounded-3xl mb-8 shadow-lg grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  )}
                  <h2 className="text-3xl font-black mb-4 flex items-center gap-3 italic">
                    <span className="w-8 h-1 bg-sky-500 rounded-full group-hover:w-12 transition-all"></span>
                    {item.content.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed font-light">
                    {item.content.description}
                  </p>
                </div>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* --- FEATURES GRID (Animated Reveal) --- */}
      <section className="relative py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              {features?.heading}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-sky-500 to-blue-600 mx-auto rounded-full shadow-[0_0_15px_rgba(14,165,233,0.3)]"></div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {(features?.items || []).map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:border-sky-500/50 hover:bg-sky-900/10 transition-all duration-300 shadow-xl relative overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 text-9xl font-black text-white/5 group-hover:text-sky-500/10 transition-colors pointer-events-none">0{i+1}</div>
                {f.iconUrl && (
                  <div className="w-16 h-16 mb-8 rounded-2xl bg-sky-500/10 flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                    <img src={f.iconUrl} alt="icon" className="w-10 h-10 object-contain" />
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-sky-400 transition-colors">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA (High-Impact Glow Style) --- */}
      {cta && (
        <section className="py-40 px-6 relative overflow-hidden">
          {/* Background Glow Effect - Exactly like Contact Form */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/20 blur-[150px] rounded-full pointer-events-none animate-pulse"></div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative z-10 max-w-5xl mx-auto bg-[#0f172a]/60 backdrop-blur-3xl p-12 md:p-20 rounded-[4rem] border border-white/10 text-center shadow-2xl overflow-hidden group"
          >
             <div className="absolute -inset-1 bg-gradient-to-r from-sky-600/20 to-blue-600/20 rounded-[4rem] blur opacity-0 group-hover:opacity-100 transition duration-1000"></div>
            
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tighter uppercase break-words relative z-10">
              {cta.title}
            </h2>
            <p className="text-blue-100/70 mb-12 text-xl font-light max-w-2xl mx-auto relative z-10">
              {cta.description}
            </p>
            {cta.link && (
              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(14, 165, 233, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                href={cta.link}
                className="relative z-10 inline-flex items-center gap-4 px-14 py-6 rounded-2xl text-white font-black text-xl uppercase tracking-widest bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 shadow-2xl transition-all"
              >
                Join the Future 🚀
              </motion.a>
            )}
          </motion.div>
        </section>
      )}

      {/* Footer Divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-500/20 to-transparent"></div>
    </div>
  );
}

export default About;