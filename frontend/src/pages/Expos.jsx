// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBookmark, FaRegBookmark } from "react-icons/fa";

// function Expos() {
//   const [expos, setExpos] = useState([]);
//   const [search, setSearch] = useState("");
//   const [bookmarks, setBookmarks] = useState([]);

//   // JWT token (from login)
//   const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

//   // Fetch Expos
//   useEffect(() => {
//     const fetchExpos = async () => {
//       try {
//         const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/expos");
//         const data = await res.json();
//         const availableExpos = data.filter(
//           (expo) => expo.availability === "available"
//         );
//         setExpos(availableExpos);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchExpos();
//   }, []);

//   // Fetch Bookmarks (MongoDB) if logged in
//   useEffect(() => {
//     const fetchBookmarks = async () => {
//       if (!token) return;
//       try {
//         const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/bookmarks", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await res.json();
//         setBookmarks(data.map((expo) => expo._id));
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBookmarks();
//   }, [token]);

//   // Toggle Bookmark (only for logged-in users)
//   const toggleBookmark = async (expoId) => {
//     if (!token) return; // guest click ignored
//     try {
//       const res = await fetch(
//         `https://event-managemant-system-mern-stack.vercel.app/api/bookmarks/${expoId}`,
//         {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const data = await res.json(); // updated bookmark IDs
//       setBookmarks(data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const filteredExpos = expos.filter((expo) =>
//     expo.title.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen text-white px-6 py-24 
//       bg-gradient-to-br from-blue-950 via-slate-900 to-sky-950">

//       {/* HEADER */}
//       <div className="text-center mb-16">
//         <h1 className="text-5xl font-extrabold mb-4">
//           Upcoming <span className="text-sky-400">Expos</span>
//         </h1>
//         <p className="text-blue-200">
//           Explore the upcoming expos organized by EventSphere.
//         </p>
//       </div>

//       {/* SEARCH */}
//       <div className="flex justify-center mb-14">
//         <input
//           type="text"
//           placeholder="Search by title..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           className="px-6 py-3 w-80 rounded-2xl bg-blue-900/40
//           border border-sky-400/30 focus:ring-2 focus:ring-sky-400"
//         />
//       </div>

//       {/* EXPO CARDS */}
//       <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
//         {filteredExpos.map((expo) => (
//           <div
//             key={expo._id}
//             className="bg-blue-900/40 backdrop-blur-xl
//             rounded-2xl border border-sky-400/20
//             shadow-xl overflow-hidden hover:scale-105 transition"
//           >
//             {/* IMAGE + BOOKMARK */}
//             <div className="relative">
//               <img
//                 src={expo.image || "https://via.placeholder.com/400x200"}
//                 alt={expo.title}
//                 className="w-full h-44 object-cover"
//               />

//               {/* Bookmark icon always visible */}
//               {/* <button
//                 onClick={() => toggleBookmark(expo._id)}
//                 className="absolute top-3 right-3
//                   bg-black/40 p-2 rounded-full
//                   hover:scale-110 transition"
//               >
//                 {bookmarks.includes(expo._id) ? (
//                   <FaBookmark className="text-yellow-400 text-xl" />
//                 ) : (
//                   <FaRegBookmark className="text-white text-xl" />
//                 )}
//               </button> */}
//             </div>

//             <div className="p-6">
//               <h3 className="text-2xl font-bold text-sky-400 mb-2">
//                 {expo.title}
//               </h3>

//               {/* <p className="text-blue-100 text-sm">
//                 📍 {expo.location}
//               </p> */}

//               <span className="inline-block mt-4 px-3 py-1 text-xs font-bold
//                 rounded-full bg-green-500/20 text-green-400
//                 border border-green-400">
//                 AVAILABLE
//               </span>

//               <Link
//                 to="/signup"
//                 className="block w-full text-center mt-6
//                   px-6 py-3 rounded-xl
//                   bg-gradient-to-r from-red-500 to-red-600
//                   hover:from-red-400 hover:to-red-500
//                   text-white font-semibold shadow-lg
//                   transition"
//               >
//                 Register Now
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredExpos.length === 0 && (
//         <p className="text-center mt-20 text-blue-200">
//           No expos found.
//         </p>
//       )}
//     </div>
//   );
// }

// export default Expos;





import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookmark, FaRegBookmark, FaMapMarkerAlt, FaCalendarAlt, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Expos() {
  const [expos, setExpos] = useState([]);
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  // JWT token (from login)
  const token = JSON.parse(localStorage.getItem("userInfo"))?.token;

  // Fetch Expos
  useEffect(() => {
    const fetchExpos = async () => {
      try {
        const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/expos");
        const data = await res.json();
        const availableExpos = data.filter(
          (expo) => expo.availability === "available"
        );
        setExpos(availableExpos);
      } catch (error) {
        console.error(error);
      }
    };
    fetchExpos();
  }, []);

  // Fetch Bookmarks (MongoDB) if logged in
  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!token) return;
      try {
        const res = await fetch("https://event-managemant-system-mern-stack.vercel.app/api/bookmarks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBookmarks(data.map((expo) => expo._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBookmarks();
  }, [token]);

  // Toggle Bookmark
  const toggleBookmark = async (expoId) => {
    if (!token) return; 
    try {
      const res = await fetch(
        `https://event-managemant-system-mern-stack.vercel.app/api/bookmarks/${expoId}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json(); 
      setBookmarks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredExpos = expos.filter((expo) =>
    expo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white bg-[#020617] relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-900/20 blur-[120px] rounded-full z-0"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[120px] rounded-full z-0"></div>

      <div className="relative z-10 px-6 py-24 max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-200 to-blue-400 uppercase leading-tight">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Expos</span>
          </h1>
          <motion.div
                     initial={{ width: 0 }}
                     animate={{ width: "100px" }}
                     transition={{ delay: 0.8, duration: 1 }}
                     className="h-1 bg-sky-500 mx-auto mt-4 rounded-full"
                   ></motion.div>
          <p className="mt-6 text-blue-200/70 text-lg max-w-2xl mx-auto font-medium">
            Explore and register for world-class expos powered by EventSphere technology.
          </p>
        </motion.div>

        {/* SEARCH BAR (Glassmorphism Style) */}
        <div className="flex justify-center mb-20">
          <div className="relative group w-full max-w-md">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-sky-400/50 group-focus-within:text-sky-400 transition-colors" />
            <input
              type="text"
              placeholder="Search expos by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-6 py-4 rounded-2xl bg-blue-950/30 backdrop-blur-md border border-sky-500/20 focus:border-sky-400 outline-none transition-all shadow-2xl focus:ring-4 focus:ring-sky-500/10"
            />
          </div>
        </div>

        {/* EXPO CARDS GRID */}
        <motion.div 
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredExpos.map((expo, index) => (
              <motion.div
                key={expo._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group relative bg-slate-900/40 backdrop-blur-xl rounded-3xl border border-white/5 hover:border-sky-500/40 overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(8,145,178,0.2)]"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={expo.image || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80"}
                    alt={expo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
                  
                  {/* Bookmark Button */}
                  {/* <button
                    onClick={() => toggleBookmark(expo._id)}
                    className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-black/20 backdrop-blur-md border border-white/10 hover:bg-sky-500/20 transition-all active:scale-90"
                  >
                    {bookmarks.includes(expo._id) ? (
                      <FaBookmark className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
                    ) : (
                      <FaRegBookmark className="text-white/70" />
                    )}
                  </button> */}

                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm">
                      {expo.availability}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white group-hover:text-sky-400 transition-colors line-clamp-1">
                    {expo.title}
                  </h3>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-blue-100/60">
                      <FaMapMarkerAlt className="mr-2 text-sky-500" />
                      <span>{expo.location || "Online / Global"}</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-100/60">
                      <FaCalendarAlt className="mr-2 text-sky-500" />
                      <span>2026 Season</span>
                    </div>
                  </div>

                  <Link
                    to="/signup"
                    className="relative inline-flex items-center justify-center w-full mt-8 px-6 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-sky-600 rounded-xl group/btn hover:bg-sky-500 shadow-lg shadow-sky-900/20"
                  >
                    <span className="relative z-10">Register Now</span>
                    <div className="absolute inset-0 w-full h-full transition-all duration-300 scale-0 group-hover/btn:scale-100 group-hover/btn:bg-white/10 rounded-xl"></div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredExpos.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-40"
          >
            <div className="inline-block p-6 rounded-full bg-blue-900/20 mb-4">
              <FaSearch className="text-4xl text-sky-500/50" />
            </div>
            <p className="text-blue-200/50 text-xl font-medium">No matches found for "{search}"</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Expos;