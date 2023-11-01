import ProjectRoutes from "./config/ProjectRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className=" my-12 mx-6 sm:mx-12 md:mx-16 lg:mx-24 font-JosefinSans">
      <ProjectRoutes />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default App;
