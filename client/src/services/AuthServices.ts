import axios from "axios";
import {
  AuthorInterface,
  LoginResponseInterface,
  SignInInterface,
  SignUpInterface,
} from "../interfaces/AuthInterfaces";

export const AuthServices = {
  register: async (userData: SignUpInterface) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/register`,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  login: async (userData: SignInInterface): Promise<LoginResponseInterface> => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/login`,
        userData
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  saveTokenToLocalStorage: (token: string): void => {
    localStorage.setItem("accessToken", JSON.stringify(token));
  },

  saveUserInfoToLocalStorage: (userInfo: AuthorInterface): void => {
    localStorage.setItem("userInformation", JSON.stringify(userInfo));
  },

  getTokenFromLocalStorage: (): string | null => {
    const accessTokenJSON: string | null = localStorage.getItem("accessToken");
    if (accessTokenJSON) {
      const accessTokenObj: string = JSON.parse(accessTokenJSON);
      return accessTokenObj;
    }
    return null;
  },

  getUserInfoFromLocalStorage: (): AuthorInterface | null => {
    const accessUserInfo: string | null =
      localStorage.getItem("userInformation");

    if (accessUserInfo) {
      const accessInfoObj: AuthorInterface = JSON.parse(accessUserInfo);

      return accessInfoObj;
    }
    return null;
  },

  removeTokenFromLocalStorage: (): void => {
    localStorage.removeItem("accessToken");
  },

  removeUserInfoFromLocalStorage: (): void => {
    localStorage.removeItem("userInformation");
  },

  logout: async () => {
    try {
      const accessTokenObj: string | null =
        AuthServices.getTokenFromLocalStorage();

      if (!accessTokenObj) {
        throw new Error("No access to the authorization token");
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/users/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessTokenObj}`,
          },
        }
      );

      AuthServices.removeTokenFromLocalStorage();
      AuthServices.removeUserInfoFromLocalStorage();

      return response.data;
    } catch (error: any) {
      if (error.response.status === 401) {
        AuthServices.removeTokenFromLocalStorage();
        AuthServices.removeUserInfoFromLocalStorage();
        window.location.reload();
        throw new Error("Logged out successfully");
      }

      throw new Error(error.response.data.message);
    }
  },
};
