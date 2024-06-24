import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = Cookies.get("role");

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/lists" replace />;
  }

  return children;
};

export default ProtectedRoute;
