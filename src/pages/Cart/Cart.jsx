import { useContext } from "react";
import { CartContext } from "../../context/Cart.context";
import { Link } from "react-router-dom";
import CartItem from "../../componants/CartItem/CartItem";

export default function Cart() {
  const { cart, clearCart, isCartEmpty } = useContext(CartContext);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const total = totalPrice.toFixed(2);
  return (
    <>
      {isCartEmpty ? (
        <section className="my-8 px-4 md:px-0">
          <div className="bg-gray-100 rounded-md  mt-5 shadow p-8 flex flex-col justify-center items-center gap-4 ">
            <h2>
              Oops! Your Cart is empty. Start shopping now by clicking the
              button below and find something you love!
            </h2>
            <Link
              to={"/"}
              className=" bg-gray-600 rounded hover:bg-gray-500 transition-colors text-white py-1.5 px-2"
            >
              {" "}
              Back To Home
            </Link>
          </div>
        </section>
      ) : (
        <>
          <div className="space-y-4 mt-4">
            {cart.map((product) => (
              <CartItem key={product._id} productInfo={product} />
            ))}
          </div>
          <div className="mt-4 flex justify-between items-center">
            <p className="text-xl">
              Your Total Cart Price is{" "}
              <span className="text-yellow-400 font-semibold">{total}</span> EGP
            </p>
            <button
              onClick={clearCart}
              className=" transition-colors text-white py-1.5 px-2 rounded bg-red-500 hover:bg-red-600"
            >
              <i className="fa-solid fa-trash mr-2"></i> Clear Cart
            </button>
          </div>
          <Link className="inline-block  transition-colors py-1.5 px-2 rounded bg-green-600 hover:bg-green-700 text-white text-center mt-6 w-full">
            Payment Method
          </Link>
        </>
      )}
    </>
  );
}
