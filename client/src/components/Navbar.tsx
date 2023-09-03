import { Link } from "react-router-dom";

import { LiaShoppingCartSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { BiLogInCircle, BiFoodMenu } from "react-icons/bi";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between">
        <h1 className=" text-3xl font-medium">GastroQuick</h1>
        <ul className="flex items-center gap-5">
          <Link to={"/"}>
            <BiFoodMenu size={25} />
          </Link>

          <Link to={"/cart"}>
            <LiaShoppingCartSolid size={35} />
          </Link>

          <Link to={"/account"}>
            <FiUser size={25} />
          </Link>

          <Link to={"/signIn"}>
            <BiLogInCircle size={25} />
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
