import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { message } from "antd";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!accessToken && location.pathname !== "/") {
      message.error("You need to log in to access this page!")
      navigate("/", { replace: true });
    }
  }, [accessToken, location.pathname, navigate]);

  return { accessToken };
};

export default useAuth;
