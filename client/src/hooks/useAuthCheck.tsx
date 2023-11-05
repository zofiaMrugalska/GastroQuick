import { useState, useEffect } from "react";
import { AuthServices } from "../services/AuthServices";

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenicated] = useState<boolean>(false);

  useEffect(() => {
    const token = AuthServices.getTokenFromLocalStorage();
    const author = AuthServices.getUserInfoFromLocalStorage();

    console.log(token, author, "yrtyrsatyratyrsyr");

    if (token && author) {
      setIsAuthenicated(true);
    }
  }, []);

  return { isAuthenticated };
};
export default useAuthCheck;
