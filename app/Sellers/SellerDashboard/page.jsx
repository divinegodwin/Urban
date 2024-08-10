"use client";
import React from "react";
import Navbar from "@/app/components/Navbar";
import {useState, useEffect} from 'react'

const SellerDashboard = () => {

    const[formData, setFormData] = useState ({
        productPic :'',
        category:null,
        productName: null,
        productDescription: "",
        productBrand: "",
        discountPrice: "",
        productPrice: "",
        currency: "",
       stockQuantity:"",
     
    })
  return (
    <div>
      <Navbar />
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md m-auto w-full mt-14">
        <h2 className="text-2xl font-bold mb-6 ">Create a Product</h2>

        <div className="">
          <input
            className="mb-6 "
            type="file"
            accept="image/*"
            name="productPic"
          />
        </div>

        <div className="mb-4">
          <label>Category</label>
          <select name="category" className="p-1 font-bold">
            <option value="electronics">Phones & Tablets </option>
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
          />
        </div>

        <div className="mb-4">
          <textarea
            type="text"
            name="productDescription"
            placeholder="Product description"
            className="w-full h-[100px] p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="productBrand"
            placeholder="Product brand"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="discountPrice"
            placeholder="Discount price"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <input
            type="Number"
            name="productPrice"
            placeholder="Product price"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <input
            type="Number"
            name="currency"
            placeholder="Currency"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>

        <button className="center p-3 bg-[#1746c3] h-[50px] text-white rounded-lg">
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default SellerDashboard;
