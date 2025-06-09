import { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRoutesProps {
  children: JSX.Element;
}

const ProtectedRoutes: React.FC<ProtectedRoutesProps> = ({ children }) => {
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  if (username === "Admin@admin.com" && role === "ROLE_ADMIN") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
