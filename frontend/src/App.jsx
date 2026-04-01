// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; // ✅ Import Toaster

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import ForgotPassword from "./components/ForgotPassword";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Contact from "./pages/ContactUs";
// import Expos from "./pages/Expos";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
 

// // Admin
// import AdminDashboard from "./Admin/AdminDashboard";
// import Users from "./Admin/Users";
// import AdminExpos from "./Admin/AdminExpos";
// import Reports from "./Admin/Reports";
// import AdminAbout from "./Admin/AdminAbout";
// import AdminContact from "./Admin/AdminContact";
// import BoothRequests from "./Admin/BoothRequests";
// import AdminExhibitors from "./Admin/AdminExhibitors";
//      import AdminFeedback from "./Admin/AdminFeedback";

// // Attendee
// import Dashboard from "./attendee/Dashboard";
// import ExhibitorList from "./attendee/ExhibitorList";
// import MySchedule from "./attendee/MySchedule";
// import Bookmarks from "./attendee/Bookmarks";
// import AttendeeMessages from "./attendee/Messages";
// import AttendeeInterests from "./attendee/AttendeeInterests";
// import ExpoDetails from "./attendee/ExpoDetails"; // ✅ correct path
// // 👆 path apne folder ke hisaab se correct karo
// import Feedback from "./attendee/Feedback";
// import AppointmentBooking from "./attendee/AppointmentBooking";
 

// // Exhibitor
// import ExhibitorDashboard from "./Exhibitor/ExhibitorDashboard";
// import MyBooths from "./Exhibitor/MyBooths";
// import Leads from "./Exhibitor/Leads";
 
// import ExhibitorMessages from "./Exhibitor/Messages";
// import Registration from "./Exhibitor/Registration";
// import Profile from "./Exhibitor/Profile";
// import ExhibitorAppointments from "./Exhibitor/ExhibitorAppointments";







// function App() {
//   const location = useLocation();

//   const isSpecialPage =
//     location.pathname.startsWith("/attendee") ||
//     location.pathname.startsWith("/admin") ||
//     location.pathname.startsWith("/exhibitor");

//   return (
//     <div className="w-full min-h-screen overflow-x-hidden">
//       {/* ✅ Toaster added at top-level */}
//       <Toaster position="top-right" reverseOrder={false} />

//       {!isSpecialPage && <Navbar />}

//       <div className={!isSpecialPage ? "pt-[72px]" : ""}>
//         <Routes>
//           {/* Public */}
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/expos" element={<Expos />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />

//           {/* Attendee */}
//           <Route path="/attendee/dashboard" element={<Dashboard />} />
//           <Route path="/attendee/exhibitors" element={<ExhibitorList />} />
//           <Route path="/attendee/schedule" element={<MySchedule />} />
//           <Route path="/attendee/bookmarks" element={<Bookmarks />} />
//           <Route path="/attendee/messages" element={<AttendeeMessages />} />
//          <Route path="/attendee/interests" element={<AttendeeInterests />} />
//            <Route path="/attendee/expo/:id" element={<ExpoDetails />} />
//           <Route path="/attendee/appointments" element={<AppointmentBooking />} />
//             <Route path="/attendee/feedback" element={<Feedback />} />
           

//           {/* Admin */}
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/admin/users" element={<Users />} />
//           <Route path="/admin/expos" element={<AdminExpos />} />
//           <Route path="/admin/reports" element={<Reports />} />
//           <Route path="/admin/about" element={<AdminAbout />} />
//           <Route path="/admin/contact" element={<AdminContact />} />
//           <Route path="/admin/booth-requests" element={<BoothRequests />} />
//              <Route path="/admin/exhibitors" element={<AdminExhibitors />} />
//            <Route path="/admin/feedback" element={<AdminFeedback />} />


//           {/* Exhibitor */}
//           <Route path="/exhibitor" element={<ExhibitorDashboard />} />
//           <Route path="/exhibitor/booths" element={<MyBooths />} />
//           <Route path="/exhibitor/leads" element={<Leads />} />
         
//           <Route path="/exhibitor/messages" element={<ExhibitorMessages />} />
//            <Route path="/exhibitor/registration" element={<Registration/>} />
//             <Route path="/exhibitor/profile" element={<Profile />} />
//             <Route path="/exhibitor/appointments" element={<ExhibitorAppointments />} />
         
//         </Routes>
//       </div>

//       {!isSpecialPage && <Footer />}
//     </div>
//   );
// }

// export default App;


import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import this

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForgotPassword from "./components/ForgotPassword";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/ContactUs";
import Expos from "./pages/Expos";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

// Admin
import AdminDashboard from "./Admin/AdminDashboard";
import Users from "./Admin/Users";
import AdminExpos from "./Admin/AdminExpos";
import Reports from "./Admin/Reports";
import AdminAbout from "./Admin/AdminAbout";
import AdminContact from "./Admin/AdminContact";
import BoothRequests from "./Admin/BoothRequests";
import AdminExhibitors from "./Admin/AdminExhibitors";
import AdminFeedback from "./Admin/AdminFeedback";

// Attendee
import Dashboard from "./attendee/Dashboard";
import ExhibitorList from "./attendee/ExhibitorList";
import MySchedule from "./attendee/MySchedule";
import Bookmarks from "./attendee/Bookmarks";
import AttendeeMessages from "./attendee/Messages";
import AttendeeInterests from "./attendee/AttendeeInterests";
import ExpoDetails from "./attendee/ExpoDetails";
import Feedback from "./attendee/Feedback";
import AppointmentBooking from "./attendee/AppointmentBooking";

// Exhibitor
import ExhibitorDashboard from "./Exhibitor/ExhibitorDashboard";
import MyBooths from "./Exhibitor/MyBooths";
import Leads from "./Exhibitor/Leads";
import ExhibitorMessages from "./Exhibitor/Messages";
import Registration from "./Exhibitor/Registration";
import Profile from "./Exhibitor/Profile";
import ExhibitorAppointments from "./Exhibitor/ExhibitorAppointments";

function App() {
  const location = useLocation();

  const isSpecialPage =
    location.pathname.startsWith("/attendee") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/exhibitor");

  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Toaster position="top-right" reverseOrder={false} />

      {!isSpecialPage && <Navbar />}

      <div className={!isSpecialPage ? "pt-[72px]" : ""}>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/expos" element={<Expos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* ================= ATTENDEE ROUTES ================= */}
          <Route path="/attendee/dashboard" element={<ProtectedRoute allowedRole="attendee"><Dashboard /></ProtectedRoute>} />
          <Route path="/attendee/exhibitors" element={<ProtectedRoute allowedRole="attendee"><ExhibitorList /></ProtectedRoute>} />
          <Route path="/attendee/schedule" element={<ProtectedRoute allowedRole="attendee"><MySchedule /></ProtectedRoute>} />
          <Route path="/attendee/bookmarks" element={<ProtectedRoute allowedRole="attendee"><Bookmarks /></ProtectedRoute>} />
          <Route path="/attendee/messages" element={<ProtectedRoute allowedRole="attendee"><AttendeeMessages /></ProtectedRoute>} />
          <Route path="/attendee/interests" element={<ProtectedRoute allowedRole="attendee"><AttendeeInterests /></ProtectedRoute>} />
          <Route path="/attendee/expo/:id" element={<ProtectedRoute allowedRole="attendee"><ExpoDetails /></ProtectedRoute>} />
          <Route path="/attendee/appointments" element={<ProtectedRoute allowedRole="attendee"><AppointmentBooking /></ProtectedRoute>} />
          <Route path="/attendee/feedback" element={<ProtectedRoute allowedRole="attendee"><Feedback /></ProtectedRoute>} />

          {/* ================= ADMIN ROUTES ================= */}
          <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRole="admin"><Users /></ProtectedRoute>} />
          <Route path="/admin/expos" element={<ProtectedRoute allowedRole="admin"><AdminExpos /></ProtectedRoute>} />
          <Route path="/admin/reports" element={<ProtectedRoute allowedRole="admin"><Reports /></ProtectedRoute>} />
          <Route path="/admin/about" element={<ProtectedRoute allowedRole="admin"><AdminAbout /></ProtectedRoute>} />
          <Route path="/admin/contact" element={<ProtectedRoute allowedRole="admin"><AdminContact /></ProtectedRoute>} />
          <Route path="/admin/booth-requests" element={<ProtectedRoute allowedRole="admin"><BoothRequests /></ProtectedRoute>} />
          <Route path="/admin/exhibitors" element={<ProtectedRoute allowedRole="admin"><AdminExhibitors /></ProtectedRoute>} />
          <Route path="/admin/feedback" element={<ProtectedRoute allowedRole="admin"><AdminFeedback /></ProtectedRoute>} />

          {/* ================= EXHIBITOR ROUTES ================= */}
          <Route path="/exhibitor" element={<ProtectedRoute allowedRole="exhibitor"><ExhibitorDashboard /></ProtectedRoute>} />
          <Route path="/exhibitor/booths" element={<ProtectedRoute allowedRole="exhibitor"><MyBooths /></ProtectedRoute>} />
          <Route path="/exhibitor/leads" element={<ProtectedRoute allowedRole="exhibitor"><Leads /></ProtectedRoute>} />
          <Route path="/exhibitor/messages" element={<ProtectedRoute allowedRole="exhibitor"><ExhibitorMessages /></ProtectedRoute>} />
          <Route path="/exhibitor/registration" element={<ProtectedRoute allowedRole="exhibitor"><Registration/></ProtectedRoute>} />
          <Route path="/exhibitor/profile" element={<ProtectedRoute allowedRole="exhibitor"><Profile /></ProtectedRoute>} />
          <Route path="/exhibitor/appointments" element={<ProtectedRoute allowedRole="exhibitor"><ExhibitorAppointments /></ProtectedRoute>} />
          {/* ✅ 2. Reset Password Route (Dynamic Token k sath) */}
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </div>

      {!isSpecialPage && <Footer />}
    </div>
  );
}

export default App;
 