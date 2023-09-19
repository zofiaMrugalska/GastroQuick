import axios from "axios";
import { SignInInterface, SignUpInterface } from "../../interfaces/AuthInterfaces";

export const AuthServices = {
  register: async (userData: SignUpInterface) => {
    try {
      const response = await axios.post("http://localhost:5000/users/register", userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  login: async (userData: SignInInterface) => {
    try {
      const response = await axios.post("http://localhost:5000/users/login", userData);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response.data.message);
    }
  },

  getTokenFromLocalStorage: () => {
    const accessTokenJSON = localStorage.getItem("accessToken");
    if (accessTokenJSON) {
      const accessTokenObj = JSON.parse(accessTokenJSON);
      console.log(accessTokenObj, "token z auth services");

      return accessTokenObj;
    }
    return null;
  },

  getUserInfoFromLocalStorage: () => {
    const accessUserInfo = localStorage.getItem("userInformation");

    if (accessUserInfo) {
      const accessInfoObj = JSON.parse(accessUserInfo);
      console.log(accessInfoObj, "access user info z auth services");
      return accessInfoObj;
    }
    return null;
  },

  saveTokenToLocalStorage: (token: string) => {
    localStorage.setItem("accessToken", JSON.stringify(token));
  },

  saveUserInfoToLocalStorage: (userInfo: string) => {
    localStorage.setItem("userInformation", JSON.stringify(userInfo));
  },

  removeTokenFromLocalStorage: () => {
    localStorage.removeItem("accessToken");
  },

  removeUserInfoFromLocalStorage: () => {
    localStorage.removeItem("userInformation");
  },
};
