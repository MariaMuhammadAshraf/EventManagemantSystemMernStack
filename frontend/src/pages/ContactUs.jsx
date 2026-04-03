//  import React, { useState } from "react";
// import axios from "axios";
// import emailjs from "@emailjs/browser"; // 1. Import EmailJS

// function Contact() {
//   const [form, setForm] = useState({ name: "", email: "", message: "" });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // A. Pehle Backend (Database) mein save karein
//       await axios.post("https://event-managemant-system-mern-stack.vercel.app//api/contact", form);

//       // B. Phir EmailJS se email bhejein
//       // In IDs ko apne EmailJS Dashboard se replace karein
//       const serviceID = "service_mpybi5k"; 
//       const templateID = "template_tf9cjle";
//       const publicKey = "Or6vQrwXNpmlr_7WB";

//       // ⭐ Dashboard template variables ke mutabiq change:
//       const templateParams = {
//      name: form.name,    // Template ke {{name}} ke liye
//        email: form.email,  // Template ke {{email}} ke liye
//          message: form.message
// };

//       await emailjs.send(serviceID, templateID, templateParams, publicKey);

//       setSuccess("Message sent to Database & Email successfully!");
//       setForm({ name: "", email: "", message: "" });
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen text-white bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950">
//       {/* Hero Section (Unchanged) */}
//       <section
//         className="h-[60vh] flex items-center justify-center text-center px-6 bg-cover bg-center relative"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=3840&q=100')",
//         }}
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-blue-900/60 to-sky-900/60"></div>
//         <div className="relative z-10">
//           <h1 className="text-5xl md:text-6xl font-extrabold">Contact Us</h1>
//           <p className="mt-4 text-blue-100 text-lg">Let’s build your next world-class expo together.</p>
//         </div>
//       </section>

//       {/* Form Section */}
//       <section className="py-24 px-6">
//           <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14">
//           {/* Left Info */}
//          <div>
//             <h2 className="text-3xl font-bold mb-6">Get in Touch with EventSphere</h2>
//             <p className="text-blue-100 mb-8">             Have a question, need a demo, or want to partner with us? Our team is ready to help.
//             </p>
//            <div className="space-y-6 text-blue-100">
//               <div>
//                 <p className="font-semibold text-sky-400">📍 Office</p>
//                 <p>Dubai, UAE</p>
//               </div>
//               <div>
//                 <p className="font-semibold text-sky-400">📧 Email</p>
//                  <p>support@eventsphere.com</p>
//                </div>
//               <div>
//                  <p className="font-semibold text-sky-400">📞 Phone</p>
//                 <p>+971 55 123 4567</p>
//               </div>
//             </div>
//            </div>
//           {/* Right Form */}
//           <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-400/20 shadow-xl">
//             <h3 className="text-2xl font-semibold mb-6 text-sky-400">Send us a message</h3>
//             {success && <p className="text-green-400 mb-4 font-bold">{success}</p>}
            
//             <form className="space-y-5" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="name"
//                 required
//                 placeholder="Your Name"
//                 value={form.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-sky-400"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 required
//                 placeholder="Your Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-sky-400"
//               />
//               <textarea
//                 name="message"
//                 required
//                 rows="4"
//                 placeholder="Your Message"
//                 value={form.message}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 outline-none focus:border-sky-400"
//               ></textarea>
              
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-sky-500 hover:scale-105 transition shadow-lg disabled:opacity-50"
//               >
//                 {loading ? "Sending..." : "Send Message"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Contact;





import React, { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion"; // Animation ke liye

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // A. Database Save
      await axios.post("https://event-managemant-system-mern-stack.vercel.app//api/contact", form);

      // B. EmailJS Send
      const serviceID = "service_mpybi5k";
      const templateID = "template_tf9cjle";
      const publicKey = "Or6vQrwXNpmlr_7WB";

      const templateParams = {
        name: form.name,
        email: form.email,
        message: form.message
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);

      setSuccess("✨ Message sent successfully to our team!");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSuccess(""), 5000);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong! Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-white bg-[#020617] overflow-x-hidden">
      {/* --- PROFESSIONAL RESPONSIVE HERO BANNER --- */}
      <section className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background Image */}
        <motion.div 
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-slate-950/80 to-[#020617] z-10"></div>
        
        {/* Hero Content - Fixed Responsive Heading */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-blue-400 uppercase leading-tight"
          >
            Contact Us
          </motion.h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.8, duration: 1 }}
            className="h-1 bg-sky-500 mx-auto mt-4 rounded-full"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-base md:text-xl text-blue-100/70 font-medium px-2"
          >
            Let’s build your next world-class expo together.
          </motion.p>
        </div>
      </section>
      {/* --- CONTENT SECTION --- */}
      <section className="relative z-30 -mt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT SIDE: INFO */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-4">Connect with <span className="text-sky-400">EventSphere</span></h2>
              <div className="h-1.5 w-20 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full"></div>
            </div>

            <div className="grid gap-8">
              {[
                { icon: "📍", title: "Global Headquaters", detail: "Business Bay, Dubai, UAE" },
                { icon: "📧", title: "Corporate Inquiries", detail: "support@eventsphere.com" },
                { icon: "📞", title: "Hotline", detail: "+971 55 123 4567" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <span className="text-3xl grayscale hover:grayscale-0 transition duration-300">{item.icon}</span>
                  <div>
                    <h4 className="text-sky-400 font-bold tracking-widest text-sm uppercase">{item.title}</h4>
                    <p className="text-lg text-slate-300">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE: PREMIUM FORM */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative group">
              {/* Background Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative bg-[#0f172a]/80 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                <h3 className="text-3xl font-bold mb-8 italic">Drop us a line...</h3>
                
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-green-400 text-center font-medium"
                  >
                    {success}
                  </motion.div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                      <input
                        type="text" name="name" required placeholder="full name"
                        value={form.name} onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-sky-500 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                      <input
                        type="email" name="email" required placeholder="email@example.com"
                        value={form.email} onChange={handleChange}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-sky-500 focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                    <textarea
                      name="message" required rows="5" placeholder="Tell us about your project..."
                      value={form.message} onChange={handleChange}
                      className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-sky-500 focus:bg-white/10 transition-all duration-300 resize-none"
                    ></textarea>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 rounded-2xl font-black text-lg uppercase tracking-widest bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-sky-500/50 transition-all disabled:opacity-50"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        PROCESING...
                      </span>
                    ) : "SEND MESSAGE"}
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subtle Footer Decorative Line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </div>
  );
}

export default Contact;