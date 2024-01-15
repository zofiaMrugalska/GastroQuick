import { useState, useEffect } from "react";
import { AuthorInterface } from "../interfaces/AuthInterfaces";
import { AuthServices } from "../services/AuthServices";

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenicated] = useState<boolean>(false);
  const token: string | null = AuthServices.getTokenFromLocalStorage();

  const author: AuthorInterface | null = AuthServices.getUserInfoFromLocalStorage();

  useEffect(() => {
    if (token && author) {
      setIsAuthenicated(true);
    } else {
      setIsAuthenicated(false);
    }
  }, []);

  return { isAuthenticated };
};
export default useAuthCheck;
