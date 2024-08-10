"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import { useState, useEffect } from "react";
import useUserAuth from "@/app/Auth/useUserAuth";
import Swal from "sweetalert2";
import supabase from "@/app/supabaseClient";

const SellerDashboard = () => {
  const [formData, setFormData] = useState({
    productPic: "",
    category: null,
    productName: null,
    productDescription: "",
    productBrand: "",
    discountPrice: "",
    productPrice: "",
    currency: "",
    stockQuantity: "",
  });

  const handleChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const user = useUserAuth();

  const SubmitProducts = () => {
    if (user && user?.id) {
      const insertProductDetails = async () => {
        const { error } = await supabase.from("Seller_Products").insert({
          product_image: formData.productPic,
          category: formData.category,
          product_name: formData.productName,
          product_description: formData.productDescription,
          product_brand: formData.product_brand,
          discount_price: formData.discountPrice,
          product_price: formData.productPrice,
          currency: formData.currency,
          stock_quantity: formData.stockQuantity,
          seller_id: user.id,
        });
        if (error) {
          console.log("error inserting data into seller_products", error);
        } else {
          Swal.fire({
            title: "Registration Successful!",
            text: "Shop registration complete! You're ready to start selling.",
            icon: "success",
          }).then(() => {
            console.log("success");
          });
        }
      };
      insertProductDetails();
    }
  };

  const[plusIconIsClicked, setPlusIconIsClicked] = useState(false)

  const ShowForm = () =>{
    setPlusIconIsClicked(!plusIconIsClicked)
  }
  return (
    <div>
      <Navbar />
      <div className="mt-[5rem]">
      <svg
      onClick={ShowForm}
      className="w-[30px] float-right mr-8 "
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
          d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 0 0 2.25-2.25V6a2.25 2.25 0 0 0-2.25-2.25H6A2.25 2.25 0 0 0 3.75 6v2.25A2.25 2.25 0 0 0 6 10.5Zm0 9.75h2.25A2.25 2.25 0 0 0 10.5 18v-2.25a2.25 2.25 0 0 0-2.25-2.25H6a2.25 2.25 0 0 0-2.25 2.25V18A2.25 2.25 0 0 0 6 20.25Zm9.75-9.75H18a2.25 2.25 0 0 0 2.25-2.25V6A2.25 2.25 0 0 0 18 3.75h-2.25A2.25 2.25 0 0 0 13.5 6v2.25a2.25 2.25 0 0 0 2.25 2.25Z"
        ></path>

      </svg>
      </div>

      {plusIconIsClicked &&(

     
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md m-auto w-full mt-[6rem]">
        <h2 className="text-2xl font-bold mb-6 ">Create a Product</h2>

        <div className="">
          <input
            onChange={handleChange}
            className="mb-6 "
            type="file"
            accept="image/*"
            name="productPic"
          />
        </div>

        <div className="mb-4">
          <label>Category</label>
          <select
            name="category"
            className="p-1 font-bold"
            onChange={handleChange}
            value={formData.category}
          >
            <option value="electronics">select the category </option>
            <option value="electronics">phones & tablets </option>
            <option value="shoes"> Shoes </option>
            <option value="bags">Bags </option>
            <option value="shirts"> Shirts</option>
            <option value="Foodstufs"> FoodStufs</option>
            <option value="caps"> Cap </option>
            <option value="electronics"> Gaming</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="productName"
            placeholder="Product name"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <textarea
            type="text"
            name="productDescription"
            placeholder="Product description"
            className="w-full h-[100px] p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            onChange={handleChange}
            type="text"
            name="productBrand"
            placeholder="Product brand"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <input
            onChange={handleChange}
            type="number"
            name="discountPrice"
            placeholder="Discount price"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <input
            onChange={handleChange}
            type="Number"
            name="productPrice"
            placeholder="Product price"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <select
            name="currency"
            className="p-1 font-bold"
            onChange={handleChange}
            value={formData.currency}
          >
            <option value="">Select a ccurrency</option>
            <option value="N"> N </option>
            <option value="$">$ </option>
            <option value="£">£ </option>
          </select>
        </div>

        <div className="mb-4">
          <input
            onChange={handleChange}
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <button
          onClick={SubmitProducts}
          className="center p-3 bg-[#1746c3] h-[50px] text-white rounded-lg"
        >
          SUBMIT
        </button>
      </div>
       )}
    </div>
  );
};

export default SellerDashboard;
