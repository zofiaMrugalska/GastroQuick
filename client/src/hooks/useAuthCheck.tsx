import { useState, useEffect } from "react";
import { AuthorInterface } from "../interfaces/AuthInterfaces";
import { AuthServices } from "../services/AuthServices";

const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenicated] = useState<boolean>(false);

  useEffect(() => {
    const token: string | null = AuthServices.getTokenFromLocalStorage();
    const author: AuthorInterface | null = AuthServices.getUserInfoFromLocalStorage();

    if (token && author) {
      setIsAuthenicated(true);
    }
  }, []);

  return { isAuthenticated };
};
export default useAuthCheck;
