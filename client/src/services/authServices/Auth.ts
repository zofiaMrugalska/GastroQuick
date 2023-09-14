import axios from "axios";
import { SignInInterface, SignUpInterface } from "../../interfaces/AuthInterfaces";

export const signInServices = async (data: SignInInterface) => {
  try {
    const response = await axios.post("http://localhost:5000/users/login", data);
    if (response.data.success === true) {
      alert("login complete");
    }
    console.log(response, "backend login");

    const token = response.data.data;
    localStorage.setItem("accessToken", JSON.stringify(token));

    const userInfo = response.data.data.user;
    localStorage.setItem("userInformation", JSON.stringify(userInfo));
  } catch (error) {
    alert("login failed");
    console.log("error", error);
  }
};

export const signUpServices = async (data: SignUpInterface) => {
  try {
    const response = await axios.post("http://localhost:5000/users/register", data);
    console.log(response, "backend register");
    console.log(response.data.success);
    if (response.data.success === true) {
      alert("registration was successful");
    }
  } catch (error) {
    alert("registration failed");
    console.log("error", error);
  }
};
