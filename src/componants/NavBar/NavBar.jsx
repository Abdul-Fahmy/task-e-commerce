import { useContext } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";

export default function NavBar() {
  const { cartCount } = useContext(CartContext);
  return (
    <nav className="shadow bg-stone-800 fixed top-0 left-0 right-0 z-50">
      <div className="container flex items-center gap-10 px-3 mx-auto">
        <Link to={"/"}>
          <p className="text-white text-2xl font-semibold py-2">Shopping</p>
        </Link>
        <ul className=" flex  items-center gap-5">
          <li>
            <NavLink
              className={({ isActive }) => {
                return `text-white relative before:absolute before:w-0 before:h-0.5 before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                  isActive ? "before:!w-full font-semibold" : ""
                }`;
              }}
              to={"/"}
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              className={({ isActive }) => {
                return `text-white relative before:absolute before:w-0 before:h-0.5 before:bg-green-600 hover:before:w-full before:transition-[width] before:duration-300 before:left-0 before:-bottom-1 ${
                  isActive ? "before:!w-full font-semibold" : ""
                }`;
              }}
              to={"categories"}
            >
              Categories
            </NavLink>
          </li>
        </ul>
        <Link to={"/cart"} className=" cart cursor-pointer ml-auto relative">
          <FiShoppingCart className="text-white text-2xl" />
          <div className="cart-counter absolute h-4  w-4 rounded-full right-0 top-0 translate-x-1/2 -translate-y-1/2 bg-white text-black flex justify-center items-center ">
            <span className="font-semibold">{cartCount}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}
