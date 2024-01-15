import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { BiLogInCircle, BiFoodMenu, BiLogOutCircle, BiCart } from "react-icons/bi";
import { AuthServices } from "../services/AuthServices";
import { toast } from "react-hot-toast";
import { AuthorInterface } from "../interfaces/AuthInterfaces";
import { useCartContext } from "../hooks/useCartContext";
import { useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { order, setCartQuantity, cartQuantity } = useCartContext();
  const accessToken: string | null = AuthServices.getTokenFromLocalStorage();
  const userInfo: AuthorInterface | null = AuthServices.getUserInfoFromLocalStorage();
  const btnStyle = `flex flex-col items-center`;

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

  useEffect(() => {
    const newTotalQuantity = order.reduce((total, meal) => total + meal.quantity, 0);
    setCartQuantity(newTotalQuantity);
  }, [order, setCartQuantity]);

  return (
    <div className=" max-w-7xl mx-auto ">
      <nav className="flex justify-between ">
        <h1 className="text-2xl sm:text-3xl font-medium  my-12 mx-6 sm:mx-12 md:mx-16 lg:mx-24 ">GastroQuick</h1>
        <ul className="flex items-center gap-7 my-12 mx-6 sm:mx-12 md:mx-16 lg:mx-24 scale-75 sm:scale-100 ">
          <li>
            <Link to={"/"} className={`${btnStyle}`}>
              <BiFoodMenu size={25} />
              <p>menu</p>
            </Link>
          </li>

          <li className="relative ">
            <Link to={"/cart"} className={`${btnStyle} `}>
              <BiCart size={25} />
              <p>cart</p>
              <div className=" bg-[#ff8f34]  rounded-full px-[6px] absolute bottom-9 left-5">
                {location.pathname !== "/cart" && cartQuantity > 0 && accessToken && userInfo && (
                  <p className=" text-xs font-bold ">{cartQuantity}</p>
                )}
              </div>
            </Link>
          </li>

          <li>
            <Link to={"/account"} className={`${btnStyle}`}>
              <FiUser size={25} />
              {!accessToken && !userInfo ? <p>user</p> : <p>{userInfo?.name}</p>}
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
