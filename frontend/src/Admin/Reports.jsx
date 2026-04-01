// import React, { useEffect, useState } from "react";
// import AdminSidebar from "./AdminSidebar";
// import { Users, Presentation, MessageSquare, BarChart3, TrendingUp } from "lucide-react"; // npm install lucide-react
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// // Modern palette: Sky Blue, Emerald Green, Amber, Rose
// const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#f43f5e"];

// function Reports() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/api/reports/stats")
//       .then((res) => res.json())
//       .then((data) => setStats(data));
//   }, []);

//   if (!stats) {
//     return (
//       <div className="flex min-h-screen bg-[#020617] items-center justify-center">
//         <div className="flex flex-col items-center gap-4">
//           <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
//           <p className="text-slate-400 font-medium">Analyzing data...</p>
//         </div>
//       </div>
//     );
//   }

//   const userData = [
//     { name: "Attendees", value: stats.users.attendees },
//     { name: "Exhibitors", value: stats.users.exhibitors },
//     { name: "Admins", value: stats.users.admins },
//   ];

//   const expoData = [
//     { name: "Available", value: stats.expos.available },
//     { name: "Closed", value: stats.expos.unavailable },
//   ];

//   return (
//     <div className="flex min-h-screen bg-[#020617] text-slate-100">
//       <AdminSidebar />

//       <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
//         {/* HEADER */}
//         <header className="mb-12">
//           <div className="flex items-center gap-3 mb-2">
//             <BarChart3 className="text-sky-400" size={28} />
//             <p className="text-sky-400 font-bold uppercase tracking-widest text-xs">Analytics Dashboard</p>
//           </div>
//           <h1 className="text-4xl font-black text-white tracking-tight">System Reports</h1>
//           <p className="text-slate-400 mt-2">Real-time breakdown of users, events, and engagement.</p>
//         </header>

//         {/* STAT CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           <StatCard 
//             title="Total Attendees" 
//             value={stats.users.attendees} 
//             icon={<Users className="text-sky-400" size={20} />} 
//             trend="+12% from last month"
//           />
//           <StatCard 
//             title="Active Exhibitors" 
//             value={stats.users.exhibitors} 
//             icon={<Presentation className="text-emerald-400" size={20} />} 
//             trend="Steady growth"
//           />
//           <StatCard 
//             title="Customer Queries" 
//             value={stats.contacts} 
//             icon={<MessageSquare className="text-amber-400" size={20} />} 
//             trend="95% response rate"
//           />
//         </div>

//         {/* CHARTS SECTION */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <ChartBox title="User Role Distribution">
//             <PieChartBox data={userData} />
//           </ChartBox>

//           <ChartBox title="Expo Availability Status">
//             <PieChartBox data={expoData} isDonut={true} />
//           </ChartBox>
//         </div>
//       </main>
//     </div>
//   );
// }

// /* ===== UI Components ===== */

// const StatCard = ({ title, value, icon, trend }) => (
//   <div className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 p-6 rounded-2xl hover:border-sky-500/50 transition-all shadow-xl">
//     <div className="flex justify-between items-start mb-4">
//       <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700 group-hover:bg-slate-800 transition-colors">
//         {icon}
//       </div>
//       <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
//         <TrendingUp size={12} /> {trend}
//       </span>
//     </div>
//     <p className="text-slate-400 text-sm font-medium">{title}</p>
//     <h2 className="text-4xl font-black text-white mt-1 tracking-tighter">{value}</h2>
//   </div>
// );

// const ChartBox = ({ title, children }) => (
//   <div className="bg-slate-900/40 backdrop-blur-md p-8 rounded-3xl border border-slate-800 shadow-2xl">
//     <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
//       <div className="w-1.5 h-1.5 rounded-full bg-sky-500"></div>
//       {title}
//     </h3>
//     <div className="h-80 w-full">{children}</div>
//   </div>
// );

// const PieChartBox = ({ data, isDonut = false }) => (
//   <ResponsiveContainer width="100%" height="100%">
//     <PieChart>
//       <Pie
//         data={data}
//         dataKey="value"
//         nameKey="name"
//         cx="50%"
//         cy="50%"
//         innerRadius={isDonut ? 60 : 0} // Creates the donut look
//         outerRadius={85}
//         paddingAngle={5}
//         stroke="none"
//         label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//       >
//         {data.map((entry, i) => (
//           <Cell 
//             key={i} 
//             fill={COLORS[i % COLORS.length]} 
//             className="hover:opacity-80 transition-opacity outline-none" 
//           />
//         ))}
//       </Pie>
//       <Tooltip 
//         contentStyle={{ 
//           backgroundColor: '#0f172a', 
//           border: '1px solid #1e293b', 
//           borderRadius: '12px',
//           color: '#fff' 
//         }}
//         itemStyle={{ color: '#fff' }}
//       />
//       <Legend verticalAlign="bottom" height={36}/>
//     </PieChart>
//   </ResponsiveContainer>
// );

// export default Reports;





import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Users, Presentation, MessageSquare, BarChart3, TrendingUp, Menu, Zap, ArrowUpRight } from "lucide-react"; 
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#0ea5e9", "#10b981", "#f59e0b", "#f43f5e"];

function Reports() {
  const [stats, setStats] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/reports/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  if (!stats) {
    return (
      <div className="flex min-h-screen bg-[#020617] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin"></div>
          <p className="text-sky-400 font-black uppercase tracking-widest text-[10px] animate-pulse">Syncing Neural Data...</p>
        </div>
      </div>
    );
  }

  const userData = [
    { name: "Admins", value: stats.users.admins },
    { name: "Attendees", value: stats.users.attendees },
    { name: "Exhibitors", value: stats.users.exhibitors },
  ];

  const expoData = [
    { name: "Available", value: stats.expos.available },
    { name: "Closed", value: stats.expos.unavailable },
  ];

  return (
    <div className="flex min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-sky-500/30">
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0 lg:ml-64 transition-all duration-500">
        
        {/* MOBILE HEADER */}
               {/* ✅ Mobile Header (Clean & Minimal) */}
       <div className="lg:hidden flex items-center justify-between p-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
         <button onClick={() => setSidebarOpen(true)} className="p-2 bg-slate-800/50 rounded-lg text-white">
           <Menu size={20} />
         </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-pulse shadow-[0_0_10px_#0ea5e9]"></div>
            <span className="text-sky-400 font-bold uppercase tracking-widest text-xs">Analytics Dashboard</span>
          </div>
          <div className="w-10" />
        </div>

        <main className="flex-1 p-6 sm:p-10 lg:p-14">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {/* HEADER SECTION */}
            <motion.header 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-sky-500/10 rounded-xl border border-sky-500/20">
                  <BarChart3  className="text-sky-400 fill-sky-400/20" size={20} />
                </div>
                <p className="text-sky-400 font-black uppercase tracking-[0.3em] text-[10px]">System Reports</p>
              </div>
              <h1 className="text-4xl md:text-7xl font-black text-white tracking-tighter italic leading-none mb-4">
             Reports <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600"> Analytics</span>
              </h1>
              <p className="text-slate-500 text-sm md:text-base max-w-xl font-medium leading-relaxed">
                Visualizing cross-platform engagement and resource distribution in real-time.
              </p>
            </motion.header>

            {/* STAT CARDS - ULTIMATE UI UPDATE */}
          
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  <StatCard 
    title="Total Attendees" 
    value={stats.users.attendees} 
    icon={<Users size={24} />} 
    trend="+12.5%"
    color="from-sky-500 to-blue-600"
  />

  <StatCard 
    title="Active Exhibitors" 
    value={stats.users.exhibitors} 
    icon={<Presentation size={24} />} 
    trend="Stable"
    color="from-emerald-500 to-teal-600"
  />

 
{/* Reports.jsx mein StatCard section */}
<StatCard 
  title="Customer Queries" 
  // ✅ Hardcoded value ki jagah backend wala data lagayein
  value={stats.customerQueries || 0} 
  icon={<MessageSquare size={24} />} 
  trend="Active"
  color="from-amber-500 to-orange-600"
  glow="group-hover:shadow-amber-500/20"
/>
</div>
            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <ChartBox title="User Distribution Analysis">
                <PieChartBox data={userData} />
              </ChartBox>

              <ChartBox title="Expo Resource Status">
                <PieChartBox data={expoData} isDonut={true} />
              </ChartBox>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ===== NEW ATTRACTIVE STAT CARD ===== */
const StatCard = ({ title, value, icon, trend, color, glow }) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className={`group relative bg-slate-900/40 backdrop-blur-3xl border border-white/5 p-8 rounded-[2.5rem] transition-all duration-500 shadow-2xl overflow-hidden ${glow}`}
  >
    {/* Animated Gradient Background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
    
    <div className="relative z-10">
      <div className="flex justify-between items-center mb-8">
        <div className={`p-4 bg-gradient-to-br ${color} rounded-2xl text-white shadow-xl group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500`}>
          {icon}
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1">
          <ArrowUpRight size={12} className="text-sky-400" />
          <span className="text-[10px] font-black text-white">{trend}</span>
        </div>
      </div>

      <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <div className="flex items-end gap-2">
        <h2 className="text-5xl font-black text-white tracking-tighter italic">{value}</h2>
        <span className="text-slate-600 font-bold text-xs mb-2">Units</span>
      </div>
      
      {/* Decorative Line */}
      <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "70%" }}
          className={`h-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
    
    {/* Corner Glow */}
    <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${color} opacity-10 blur-3xl rounded-full`} />
  </motion.div>
);

const ChartBox = ({ title, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-slate-900/60 backdrop-blur-3xl p-8 sm:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden"
  >
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-4">
        <div className="w-2 h-8 bg-sky-500 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.5)]"></div>
        <h3 className="text-base font-black text-white uppercase tracking-[0.2em] italic">{title}</h3>
      </div>
      <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white cursor-pointer transition-colors">
        <TrendingUp size={16} />
      </div>
    </div>
    <div className="h-80 w-full relative z-10">
      {children}
    </div>
    {/* Background Pattern */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[100px] rounded-full pointer-events-none" />
  </motion.div>
);

const PieChartBox = ({ data, isDonut = false }) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={isDonut ? "68%" : 0}
        outerRadius="95%"
        paddingAngle={10}
        stroke="none"
        labelLine={false}
        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
      >
        {data.map((entry, i) => (
          <Cell 
            key={i} 
            fill={COLORS[i % COLORS.length]} 
            className="hover:brightness-125 transition-all cursor-pointer outline-none" 
          />
        ))}
      </Pie>
      <Tooltip 
        cursor={{ fill: 'transparent' }}
        contentStyle={{ 
          backgroundColor: '#020617', 
          border: '1px solid rgba(255,255,255,0.1)', 
          borderRadius: '20px',
          fontSize: '11px',
          fontWeight: '900',
          textTransform: 'uppercase',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
        }}
      />
      <Legend 
        verticalAlign="bottom" 
        height={36} 
        iconType="diamond" 
        formatter={(value) => <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-2 hover:text-sky-400 transition-colors">{value}</span>}
      />
    </PieChart>
  </ResponsiveContainer>
);

export default Reports;