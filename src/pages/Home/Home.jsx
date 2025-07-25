import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../componants/Loading/Loading";
import Card from "../../componants/Card/Card";

export default function Home() {
  const [products, setProducts] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [empty, setEmpty] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  //getProducts
  async function getProduct() {
    const options = {
      url: "http://task-ecommerce-api.vercel.app/api/products",
      method: "GET",
    };
    let { data } = await axios.request(options);

    setProducts(data.data.products);
    setEmpty(null);
  }

  //Product Search by Name, Tags, description,
  async function getProductBySearch() {
    const options = {
      url: `http://task-ecommerce-api.vercel.app/api/products/search/${searchValue}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data.meta.total);

    if (data.meta.total === 0) {
      console.log(" no result Found");
      setEmpty(searchValue);
      setProducts(data.data);
    } else {
      console.log(data);

      setEmpty(null);
      setProducts(data.data);
    }
  }

  //Products By Price Range
  async function filteredProductsByPrice() {
    const options = {
      url: `http://task-ecommerce-api.vercel.app/api/products?minPrice=${minPrice}&maxPrice=${maxPrice}`,
      method: "GET",
    };
    let { data } = await axios.request(options);
    console.log(data);
    setProducts(data.data.products);
    setMinPrice("");
    setMaxPrice("");
  }

  // handleSearchOnChange
  const onChange = (e) => {
    const search = e.target.value;
    setSearchValue(search);
  };

  useEffect(() => {
    if (searchValue !== "") {
      getProductBySearch(searchValue);
    } else {
      getProduct();
    }
  }, [searchValue]);

  return (
    <>
      <input
        type="search"
        id="search"
        placeholder="Search products by query, name, description"
        className=" w-1/2 mx-auto flex border-2 px-2 py-1.5 border-gray-400 rounded focus:outline-none"
        value={searchValue}
        onChange={onChange}
      />
      <div className="flex flex-col gap-4 items-center md:items-end md:flex-row justify-center my-4">
        <div className="flex flex-col">
          <label
            htmlFor="minPrice"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Minimum Price
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="e.g. 100"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="maxPrice"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Maximum Price
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="e.g. 1000"
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={filteredProductsByPrice}
          className="bg-green-500 text-white px-4 py-2 sm:mt-0 rounded hover:bg-green-600 cursor-pointer"
        >
          Filter
        </button>
      </div>
      {empty ? (
        <div className="text-2xl">
          No result Found For: {""}
          <span className="text-gray-400">{empty}</span>
        </div>
      ) : (
        ""
      )}
      {products ? (
        <div className="p-3 md:p-0 my-5 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <Card productInfo={product} key={product.id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

// api/products/search/:query

//http://task-ecommerce-api.vercel.app/api/products?search=${searchValue}
