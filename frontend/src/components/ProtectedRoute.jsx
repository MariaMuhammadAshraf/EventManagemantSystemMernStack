// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, allowedRole }) => {
//   const userRole = localStorage.getItem("role");

//   // Agar user login nahi hai ya uska role required role se match nahi karta
//   if (!userRole || userRole.toLowerCase() !== allowedRole.toLowerCase()) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;




import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRole }) => {
  // Har render par fresh value uthayen
  const userRole = localStorage.getItem("role")?.toLowerCase().trim();
  const token = localStorage.getItem("token");
  const requiredRole = allowedRole?.toLowerCase().trim();

  // 🚨 AGAR TOKEN NAHI HAI TOH FORAN HOME BHEJO (Manual URL Bypass Block)
  if (!token || userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;