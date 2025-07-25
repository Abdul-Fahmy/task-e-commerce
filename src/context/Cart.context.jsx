import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  const isCartEmpty = cart.length === 0;
  const cartCount = cart.length;

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Add Products specific To Cart
  function addToCart(product) {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    toast.success("Added to Cart successfully");
  }

  //Empty Cart
  function clearCart() {
    localStorage.clear("cart");
    setCart([]);
    toast.success("Your cart is now clear");
  }

  //Remove specific product From Cart
  function removeProductFromCart(productId) {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.success("removed from cart successfully");
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        isCartEmpty,
        cartCount,
        removeProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
