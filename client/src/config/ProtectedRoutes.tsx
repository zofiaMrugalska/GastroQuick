import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthServices } from "../services/authServices/Auth";
// import { useGetUserInfo } from "../hooks/useGetUserInfo";
// import { useGetUserToken } from "../hooks/useGetUserToken";

interface ProtectedRoutesInterface {
  children: ReactNode;
}

const ProtectedRoutes: React.FC<ProtectedRoutesInterface> = ({ children }: any) => {
  const token = AuthServices.getTokenFromLocalStorage();
  const userInfo = AuthServices.getUserInfoFromLocalStorage();

  console.log(token, "token z protected");
  console.log(userInfo, "info z protected");

  if (!token || !userInfo) {
    return <Navigate to="/signIn" />;
  }
  return children;
};
export default ProtectedRoutes;
