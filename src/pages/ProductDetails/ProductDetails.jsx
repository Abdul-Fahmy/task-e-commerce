import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../componants/Loading/Loading";

import { AiFillStar } from "react-icons/ai";
import ReactImageGallery from "react-image-gallery";
import { FiEye } from "react-icons/fi";
import { CartContext } from "../../context/Cart.context";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const { addToCart } = useContext(CartContext);

  async function getProductDetails() {
    const options = {
      url: `http://task-ecommerce-api.vercel.app/api/products/${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data.data);
    setProductDetails(data.data);
  }

  useEffect(() => {
    getProductDetails();
  }, []);

  return (
    <>
      {productDetails ? (
        <>
          <section className="md:grid md:grid-cols-12 md:gap-10 p-3 md:p-0">
            <div className="col-span-4">
              <ReactImageGallery
                showNav={false}
                showPlayButton={false}
                items={productDetails.images.map((image) => {
                  return {
                    original: image,
                    thumbnail: image,
                  };
                })}
              />
            </div>

            <div className="col-span-8 space-y-2">
              <div>
                <h2 className="text-2xl font-semibold text-gray-500">
                  {productDetails.nameEn}
                </h2>
                <Link
                  to={`/category/${productDetails.category.id}`}
                  className="text-black font-semibold text-lg "
                >
                  {productDetails.category.nameEn}
                </Link>
              </div>
              <p className="text-gray-400">{productDetails.description}</p>
              <div className=" flex justify-between items-center">
                <span className="font-semibold">
                  {productDetails.price} L.E
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <AiFillStar className="text-yellow-500 text-xl" />
                    <span className="font-semibold">
                      {productDetails.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <FiEye className="text-gray-500 text-xl" />
                    <span className="font-semibold">
                      {productDetails.reviewCount}
                    </span>
                  </div>
                </div>
              </div>
              <span className="font-semibold">
                Quantity: {productDetails.stockQuantity}
              </span>
              <div className="mt-2 border-b border-gray-300 ">
                {productDetails.specifications ? (
                  <>
                    {Object.entries(productDetails.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="flex flex-col">
                          <span className="font-semibold">{key}:</span> {value}
                        </div>
                      )
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>

              <div className="mt-4 ">
                {productDetails.tags ? (
                  <>
                    {productDetails.tags.map((tag) => (
                      <span
                        key={tag[0]}
                        className="bg-gray-500 rounded text-white mr-2 px-2 py-1.5"
                      >
                        {tag.toUpperCase()}
                      </span>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </div>
              <div className="mt-4 ">
                <button
                  onClick={() => {
                    if (productDetails) {
                      addToCart(productDetails);
                    }
                  }}
                  className="w-full bg-gray-600 rounded hover:bg-gray-500 transition-colors text-white py-1.5 px-2 cursor-pointer"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </section>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
