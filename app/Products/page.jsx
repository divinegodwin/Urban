"use client";
import React from "react";
import Navbar from "../components/Navbar";
import supabase from "../supabaseClient";
import { useState, useEffect } from "react";
import useUserAuth from "../Auth/useUserAuth";
import Loader from "../Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
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
      }finally{
        setLoading(false)
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      {loading && <Loader />}
     
      {products.length > 0 ? (
       
        <div className="mt-[7rem] flex p-2 gap-5 ml-2">
          {products.map((product) => {
            console.log(product.product_image)
            return(
            <div key={product.id} className=" w-[45%] h-[320px]  bg-slate-200 text-center rounded-2xl shadow-lg ">
              <img src={product.product_image}></img>
              <p className="font-bold text-lg pt-4 ">{product.product_name}</p>
              <p>{product.product_description}</p>
              <p className="font-mono text-lg font-bold">{product.currency}{product.product_price}</p>
            </div>
            
            )
            
})
}

        </div>
      ) : (
        <p>no product</p>
       
      )}
    </div>
  );
};

export default Products;
