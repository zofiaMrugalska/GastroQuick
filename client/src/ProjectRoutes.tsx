import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
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
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default ProjectRoutes;
