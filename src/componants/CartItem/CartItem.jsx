import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";
import { FiTrash } from "react-icons/fi";

export default function CartItem({ productInfo }) {
  const { image, nameEn, price, category, description, rating, id } =
    productInfo;

  const { removeProductFromCart } = useContext(CartContext);
  return (
    <>
      <div className="flex gap-2">
        <div className="card-item grow flex justify-between items-center bg-gray-100 py-4 px-6 rounded-lg">
          <img
            className="w-24 h-24 object-cover rounded-full border-4 border-white"
            src={image}
            alt={nameEn}
          />
          <Link
            to={`/product/${id}`}
            className="text-lg text-gray-700 font-semibold"
          >
            {nameEn}
          </Link>
          <h4 className="text-gray-500 font-semibold">{category.name}</h4>
          <div className="count flex items-center gap-5">
            <span className="text-xl font-bold text-gray-500"></span>
            <div className="icons space-y-2"></div>
          </div>
          <span>{price}LE</span>
        </div>
        <button
          onClick={() => {
            removeProductFromCart(id);
          }}
          className="bg-gray-100 p-3 rounded-md hover:bg-gray-200 transition-colors duration-300"
        >
          <FiTrash className="text-red-600" />
        </button>
      </div>
    </>
  );
}
