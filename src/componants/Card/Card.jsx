import { useContext } from "react";
import { AiFillStar } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/Cart.context";

export default function Card({ productInfo }) {
  const { image, nameEn, price, category, description, rating, id, inStock } =
    productInfo;
  const product = productInfo;
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  return (
    <>
      <div className="card group/card  shadow-lg overflow-hidden rounded-xl">
        <div className="relative">
          <img className="object-cover w-full " src={image} alt="" />
          <div className="layer group-hover/card:opacity-90 flex justify-center items-center gap-4 absolute w-full h-full left-0 top-0 bg-slate-200 bg-opacity-40 opacity-0 transition-opacity duration-300">
            <div
              onClick={() => {
                addToCart(product);
              }}
              className="w-9 h-9 rounded-full bg-yellow-600 text-white flex justify-center items-center cursor-pointer"
            >
              <FiShoppingCart className="text-lg" />
            </div>
          </div>
        </div>
        <div className="card-body space-y-2 px-3 py-2">
          <div className="card-header ">
            <h3 className="text-lg font-semibold text-gray-400 line-clamp-1">
              <Link to={`product/${id}`}>{nameEn}</Link>
            </h3>
            <h2 className="text-sm text-gray-600 ">{category.name}</h2>
          </div>
          <p className="text-green-400 text-sm line-clamp-2">{description}</p>
          {inStock ? (
            <span className="bg-green-500 rounded px-2 py-1.5 text-white font-semibold ">
              In Stock
            </span>
          ) : (
            <span className="bg-red-500 rounded px-2 py-1.5 text-white font-semibold ">
              Out of Stock
            </span>
          )}
          <div className="flex justify-between items-center mt-2">
            <p>
              {price} <span className="font-semibold">EGP</span>
            </p>
            <div className="rate flex justify-center items-center">
              <AiFillStar className="text-yellow-400" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
