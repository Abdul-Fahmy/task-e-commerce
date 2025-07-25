import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Card from "../../componants/Card/Card";
import Loading from "../../componants/Loading/Loading";

export default function CategoryDetails() {
  const [categoryDetails, setCategoryDetails] = useState(null);
  let { id } = useParams();

  //getCategoryDetails
  async function getCategoryDetails() {
    const options = {
      url: `http://task-ecommerce-api.vercel.app/api/products?category=${id}`,
      method: "GET",
    };
    let { data } = await axios.request(options);

    setCategoryDetails(data.data.products);
  }
  useEffect(() => {
    getCategoryDetails();
  }, []);
  return (
    <>
      {categoryDetails && categoryDetails.length === 0 ? (
        <div className="mx-4">
          <div className="bg-gray-100 rounded-md  mt-5 shadow p-8 flex flex-col justify-center items-center gap-4 ">
            <h2>This Category is Empty, Will add products here soon</h2>
            <Link
              to={"/categories"}
              className=" bg-gray-600 rounded hover:bg-gray-500 transition-colors text-white py-1.5 px-2"
            >
              {" "}
              Back To Categories
            </Link>
          </div>
        </div>
      ) : (
        <>
          {" "}
          {categoryDetails ? (
            <>
              <section>
                <div className="category-details grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 px-4 md:px-0">
                  {categoryDetails.map((category) => (
                    <Card key={category.id} productInfo={category} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <Loading />
          )}
        </>
      )}
    </>
  );
}
