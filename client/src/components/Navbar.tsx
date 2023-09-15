import { Link } from "react-router-dom";
import { logoutServices } from "../services/authServices/Auth";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { BiLogInCircle, BiFoodMenu } from "react-icons/bi";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between">
        <h1 className=" text-3xl font-medium">GastroQuick</h1>
        <ul className="flex items-center gap-5">
          <li>
            <Link to={"/"}>
              <BiFoodMenu size={25} />
            </Link>
          </li>

          <li>
            <Link to={"/cart"}>
              <LiaShoppingCartSolid size={35} />
            </Link>
          </li>

          <li>
            <Link to={"/account"}>
              <FiUser size={25} />
            </Link>
          </li>

          <li>
            <Link to={"/signIn"}>
              <BiLogInCircle size={25} />
            </Link>
          </li>

          <li>
            <button onClick={logoutServices}>log out</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
