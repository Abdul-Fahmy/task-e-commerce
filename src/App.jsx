import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import CartProvider from "./context/Cart.context";
import Layout from "./componants/Layout/Layout";
import Categories from "./pages/Categories/Categories";
import CategoryDetails from "./pages/CategoryDetails/CategoryDetails";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "category/:id",
          element: <CategoryDetails />,
        },
        {
          path: "product/:id",
          element: <ProductDetails />,
        },
        {
          path: "cart",
          element: <Cart />,
        },
      ],
    },
  ]);
  return (
    <>
      <CartProvider>
        <RouterProvider router={routes}></RouterProvider>
      </CartProvider>
      <Toaster />
    </>
  );
}

export default App;
