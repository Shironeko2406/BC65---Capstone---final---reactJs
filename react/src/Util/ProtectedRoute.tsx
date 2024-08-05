import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

const ProtectedRoute = ({ element }) => {
  const { accessToken } = useAuth();

  return accessToken ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
