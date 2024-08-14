"use client";
import React from "react";
import Navbar from "../components/Navbar";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";
import Loader from "../Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      console.log("fetching products");
      try {
        const { data, error } = await supabase.from("Seller_Products").select();
        setProducts(data);
        if (error) {
          console.log("error occured while fetching products", error);
          return;
        }
        console.log(data);
        console.log(data[0].product_image);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsClosed, setModalIsClosed] = useState(false);

  const closeModal = () => {
    setModalIsClosed(true);
  };

  const ClickedProduct = (product) => {
    setSelectedProduct(product);
    setModalIsClosed(false);
  };

  return (
    <div>
      <Navbar />
      {loading && <Loader />}

      <div className="mt-[3.2rem] fixed h-[60px] pt-2 bg-white shadow-lg w-full  pl-1 flex overflow-x-auto overflow-y-hidden space-x-1 scrollbar-hide">
        <div className="flex items-center justify-center py-1 text-sm bg-[#dfdfdf] m-w-[190px] px-3 h-[40px] rounded-full">
          <p className="whitespace-nowrap">Phones & Tablets</p>
        </div>

        <div className="py-2 text-sm bg-[#dfdfdf] w-fit px-5 h-[40px] rounded-full text-center flex items-center justify-center">
          <p>Laptops</p>
        </div>
        <div className="py-2 text-sm bg-[#dfdfdf] w-fit px-5 h-[40px] rounded-full text-center flex items-center justify-center">
          <p>Accessories</p>
        </div>
        <div className="py-2 text-sm bg-[#dfdfdf] w-fit px-5 h-[40px] rounded-full text-center flex items-center justify-center">
          <p>Wearables</p>
        </div>
        <div className="py-2 text-sm bg-[#dfdfdf] w-fit px-5 h-[40px] rounded-full text-center flex items-center justify-center">
          <p>Gaming</p>
        </div>
        <div className="py-2 text-sm bg-[#dfdfdf] w-fit px-5 h-[40px] rounded-full text-center flex items-center justify-center">
          <p>Audio</p>
        </div>
      </div>

      {products.length > 0 ? (
        <div className="mt-[1rem] pt-[8rem] grid py-6 grid-cols-2 p-2 gap-4 w-full ml-2">
          {products.map((product) => {
            return (
              <div
                onClick={(e) => ClickedProduct(product)}
                key={product.id}
                className=" w-[100%] h-fit pb-4  mb-3 bg-slate-200 text-center rounded-2xl shadow-lg "
              >
                <img src={product.product_image}></img>
                <p className="font-bold text-lg pt-4 ">
                  {product.product_name}
                </p>
                <p>{product.product_description}</p>
                <p className="font-mono text-lg font-bold">
                  {product.currency}
                  {product.product_price}
                </p>
              </div>
            );
          })}
        </div>
      ) : (
        <p></p>
      )}

      {selectedProduct && (
       <div
       className={`fixed inset-0 flex justify-center bg-[#000] bg-opacity-90 p-4 ${ modalIsClosed ? "hidden" : "drop-modal"}`}
     >
          <div key={selectedProduct.id} className="text-[#ffff]">
            <svg
              onClick={closeModal}
              className="w-[30px] float-right mr-15 mt-6"
              data-slot="icon"
              fill="none"
              strokeWidth="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>

            <img src={selectedProduct.product_image}></img>
            <p className="font-bold text-3xl ">
              {selectedProduct.product_name}
            </p>
            <p className="text-lg">{selectedProduct.product_description}</p>
            <p className="font-mono text-lg">
              {selectedProduct.currency}
              {selectedProduct.product_price}
            </p>
            <button className="w-[180px] h-[50px] bg-slate-200 rounded-full mt-4 border-none text-[#000]">
              {" "}
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
