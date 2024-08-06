"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Loader from "../Loader";

const Products = () => {   

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get("https://fakestoreapi.com/products");
       
        console.log(response);
        ("");
        setProducts(response.data);
        
      } catch (error) {
        console.log(error);
      }finally{
      setIsLoading(false)
    }

  }
    getData();
  }, []);

  return (

    <main className="flex justify-center items-center mt-14 ">
      <Navbar />
      
      {isLoading ? (<Loader />):(
      <div className="grid grid-cols-2 gap-1 p-2 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="w-[95%]  rounded-xl  h-fit pb-4 max-h-[500px] mt-[2rem] bg-[#efefef]"
          >
            <img src={product.image} className="w-full h-[150px]"></img>

            <p className="font-bold text-center px-2 py-2">{product.title}</p>
            <p className=" text-center">${product.price}</p>
            <div className="flex justify-center items-center">
              <button className="bg-[#1746c3] text-white rounded-full w-[120px] h-[40px] mt-10">add to cart</button>
            </div>
          </div>
        ))}
      </div>
      )
}
    </main>
  );
};

export default Products;
