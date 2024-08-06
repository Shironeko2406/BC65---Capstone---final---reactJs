// import React from "react";
// import { Navigate } from "react-router-dom";
// import useAuth from "./useAuth";

// const ProtectedRoute = ({ element }) => {
//   const { accessToken } = useAuth();

//   return accessToken ? element : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;




import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "./useAuth";

interface ProtectedRouteProps {
  element: React.ReactElement; // or React.ReactNode depending on your needs
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { accessToken } = useAuth();

  return accessToken ? element : <Navigate to="/" replace />;
};

export default ProtectedRoute;
