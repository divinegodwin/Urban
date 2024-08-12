"use client";
import React from "react";
import Navbar from "../components/Navbar";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";
import useUserAuth from "../Auth/useUserAuth";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
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
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      {products.length > 0 ? (
       
        <div className="mt-[7rem]">
          {products.map((product) => {
            console.log(product.product_image)
            return(
            <div key={product.id} className="w-[50%] h-[320px] ml-2 bg-slate-200 text-center rounded-2xl shadow-lg ">
              <img src={product.product_image}></img>
              <p className="font-bold text-lg ">{product.product_name}</p>
              <p>{product.product_description}</p>
              <p className="font-mono font-bold">{product.currency}{product.product_price}</p>
            </div>
            )
})}
        </div>
      ) : (
        <p>no product</p>
      )}
    </div>
  );
};

export default Products;
