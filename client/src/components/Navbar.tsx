import { Link } from "react-router-dom";

import { LiaShoppingCartSolid } from "react-icons/lia";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between">
        <h1 className=" text-3xl font-medium">GastroQuick</h1>
        <ul className="flex items-center gap-5">
          <Link to={"/"} className=" text-xl font-semibold">
            MENU
          </Link>

          <Link to={"/cart"}>
            <LiaShoppingCartSolid size={37} />
          </Link>

          <Link to={"/authentication"} className=" text-xl font-semibold">
            LOG IN
          </Link>
        </ul>
      </nav>
    </div>
  );
};
export default Navbar;
