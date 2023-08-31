import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import User from "./pages/account/User";
import Auth from "./pages/authentication/Auth";
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
          <Route path="/authentication" element={<Auth />} />
          <Route path="/account" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default ProjectRoutes;
