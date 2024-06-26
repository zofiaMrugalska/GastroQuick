import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Navbar from "../components/Navbar";
import User from "../pages/account/User";
import SignIn from "../pages/authentication/authComponents/SignIn";
import SignUp from "../pages/authentication/authComponents/SignUp";
import DynamicRouteForMeal from "../pages/home/homeComponents/DynamicRouteForMeal";
import Menu from "../pages/home/Menu";
import Cart from "../pages/order/Cart";
import AccountVerification from "../pages/authentication/authComponents/AccountVerification";
import SetNewPassword from "../pages/account/SetNewPassword";

const ProjectRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/meal/:meal/:mealId" element={<DynamicRouteForMeal />} />

          <Route
            path="/cart"
            element={
              <ProtectedRoutes>
                <Cart />
              </ProtectedRoutes>
            }
          />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/verify" element={<AccountVerification />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />

          <Route
            path="/account"
            element={
              <ProtectedRoutes>
                <User />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<h1>ERROR 404</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default ProjectRoutes;
