import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthServices } from "../services/authServices/Auth";

interface ProtectedRoutesInterface {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesInterface> = ({ children }: any) => {
  const token = AuthServices.getTokenFromLocalStorage();
  const userInfo = AuthServices.getUserInfoFromLocalStorage();

  if (!token || !userInfo) {
    return <Navigate to="/signIn" />;
  }
  return children;
};
export default ProtectedRoutes;
