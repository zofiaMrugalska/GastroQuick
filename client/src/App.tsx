import ProjectRoutes from "./config/ProjectRoutes";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <CartProvider>
      <div className=" appBackground font-JosefinSans">
        <ProjectRoutes />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </CartProvider>
  );
}

export default App;
