import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { BiLogInCircle, BiFoodMenu, BiLogOutCircle, BiCart } from "react-icons/bi";
import { AuthServices } from "../services/authServices/Auth";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await AuthServices.logout();

      if (response.success === true) {
        alert(response.message);
        navigate("/signIn");
      }
    } catch (error) {
      alert(error);
    }
  };

  const accessToken = AuthServices.getTokenFromLocalStorage();
  const userInfo = AuthServices.getUserInfoFromLocalStorage();

  const btnStyle = `flex flex-col items-center`;

  return (
    <div>
      <nav className="flex justify-between">
        <h1 className=" text-3xl font-medium">GastroQuick</h1>
        <ul className="flex items-center gap-7">
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

          {accessToken && userInfo ? null : (
            <li>
              <Link to={"/signIn"} className={`${btnStyle}`}>
                <BiLogInCircle size={25} />
                <p>log in</p>
              </Link>
            </li>
          )}

          {accessToken && userInfo ? (
            <button onClick={logout} className={`${btnStyle}`}>
              <BiLogOutCircle size={25} />
              <p>log out</p>
            </button>
          ) : null}
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
