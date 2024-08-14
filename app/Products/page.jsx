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

  const [orderQuantity, setOrderQuantity] = useState(0)
  const addQuantity = () =>{
      setOrderQuantity((previousQuantity)=> previousQuantity+1)
  }

 
  const removeQuantity = () =>{
    if(orderQuantity > 0){
    setOrderQuantity((previousQuantity)=> previousQuantity-1)
    }
    }


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
          className={`fixed  overflow-hidden overflow-y-auto inset-0 flex justify-center bg-[#000] bg-opacity-90 p-14 ${
            modalIsClosed ? "hidden" : "drop-modal"
          }`}
        >
          <div key={selectedProduct.id} className="text-[#ffff]">
            <svg
              onClick={closeModal}
              className="w-[30px] float-right mr-15 mt-6 mb-4"
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

            <svg
              className="w-[30px] mt-7"
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
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              ></path>
            </svg>

            <img src={selectedProduct.product_image}></img>

            <div className="text-center">
              <p className="font-bold text-3xl pb-2 ">
                {selectedProduct.product_name}
              </p>
              <p className="text-lg pb-2">
                {selectedProduct.product_description}
              </p>
              <p className="font-mono text-2xl font-bold">
                {selectedProduct.currency}
                {selectedProduct.product_price}
              </p>
            </div>
            <div className="flex gap-3 mt-2 justify-center">
              <p className="text-lg">Quantity</p>
              <svg
               onClick={removeQuantity}
               className="w-[30px]"
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
                  d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
              <p className="text-lg">{orderQuantity}</p>
              <svg
              onClick={addQuantity}
              className="w-[30px] ml-1"
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
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
            </div>
            <div className="flex justify-center mb-5">
              <button className=" w-[180px] h-[50px] bg-slate-200 rounded-full mt-4 border-none text-[#000]">
                {" "}
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
