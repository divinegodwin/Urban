"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import ProductLoader from "@/ProductLoader";
import Navbar from "../components/Navbar";
import ErrorPage from "../Error/page";
import supabase from "../supabaseClient";
import Cart from "../Cart/page";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);0
  const [isLoading, setIsLoading] = useState(true);
  const[error, setError] = useState(false)


  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("https://fakestoreapi.com/products");
        setProducts(response.data);
      } catch (error) {
        console.log(error);
        setError(true)
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <main className="flex-1">
      <Navbar />
      {error && <ErrorPage />}
      {isLoading ? (
        <div className="flex justify-center"><ProductLoader /></div>
      ) : (
        <div className="grid grid-cols-2 gap-1 p-2 mt-20">
              

          {products.map((product) => (
            <div
              key={product.id}
              className="w-[95%] rounded-xl h-fit pb-4 max-h-[500px] mt-[2rem] bg-[#efefef]"
            >
              <img src={product.image} className="w-full h-[150px]" alt={product.title} />
              <p className="font-bold text-center px-2 py-2">{product.title}</p>
              <p className="text-center">${product.price}</p>
              <div className="flex justify-center items-center">
                <button
            onClick={addToCart}
                   className="bg-[#1746c3] text-white rounded-full w-[120px] h-[40px] mt-10"
                >
                  Add to Cart
                </button>
              </div>
           
            </div>
          ))}
      
        </div>
      )}
    </main>
  );
};

export default Products;
