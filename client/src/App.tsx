import ProjectRoutes from "./config/ProjectRoutes";
import { Toaster } from "react-hot-toast";
import "./index.css";

function App() {
  return (
    <div className=" appBackground font-JosefinSans">
      <ProjectRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
