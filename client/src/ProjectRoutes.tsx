import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import User from "./pages/account/User";
import SignIn from "./pages/authentication/authComponents/SignIn";
import SignUp from "./pages/authentication/authComponents/SignUp";
import Menu from "./pages/home/Menu";
import Cart from "./pages/order/Cart";

const ProjectRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/account" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default ProjectRoutes;
