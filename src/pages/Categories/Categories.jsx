import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../componants/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState(null);

  //Get All Categories
  async function getCategories() {
    const options = {
      url: "http://task-ecommerce-api.vercel.app/api/categories",
      method: "GET",
    };
    let { data } = await axios.request(options);
    setCategories(data.data);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories ? (
        <section>
          <div className="grid sm:grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-4 md:px-0 ">
            {categories.map((category) => (
              <div
                onClick={() => {
                  //Navigate to specific Category
                  navigate(`/category/${category.id}`);
                }}
                key={category.id}
                className="category-item border-solid border-2 border-gray-400 border-opacity-30 rounded-md overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-64 object-cover"
                  src={category.image}
                  alt=""
                />
                <div className="title text-center my-4">
                  <Link
                    //Navigate to specific Category
                    to={`/category/${category.id}`}
                    className="text-gray-500 font-semibold text-2xl"
                  >
                    {category.nameEn}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
}
