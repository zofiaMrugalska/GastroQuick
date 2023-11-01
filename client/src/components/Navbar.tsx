import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { BiLogInCircle, BiFoodMenu, BiLogOutCircle, BiCart } from "react-icons/bi";
import { AuthServices } from "../services/AuthServices";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await AuthServices.logout();

      if (response.success === true) {
        toast.success(response.message);
        navigate("/signIn");
      }
    } catch (error: any) {
      const errorMessage: string = error.toString();
      toast.error(errorMessage);
    }
  };

  const accessToken = AuthServices.getTokenFromLocalStorage();
  const userInfo = AuthServices.getUserInfoFromLocalStorage();

  const btnStyle = `flex flex-col items-center`;

  return (
    <div>
      <nav className="flex justify-between">
        <h1 className="text-2xl sm:text-3xl font-medium">GastroQuick</h1>
        <ul className="flex items-center gap-7 scale-75 sm:scale-100">
          <li>
            <Link to={"/"} className={`${btnStyle}`}>
              <BiFoodMenu size={25} />
              <p>menu</p>
            </Link>
          </li>

          <li>
            <Link to={"/cart"} className={`${btnStyle}`}>
              <BiCart size={25} />
              <p>cart</p>
            </Link>
          </li>

          <li>
            <Link to={"/account"} className={`${btnStyle}`}>
              <FiUser size={25} />
              {!accessToken && !userInfo ? <p>user</p> : <p>{userInfo.name}</p>}
            </Link>
          </li>

          {accessToken && userInfo ? (
            <button onClick={logout} className={`${btnStyle}`}>
              <BiLogOutCircle size={25} />
              <p>logout</p>
            </button>
          ) : (
            <li>
              <Link to={"/signIn"} className={`${btnStyle}`}>
                <BiLogInCircle size={25} />
                <p>login</p>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
