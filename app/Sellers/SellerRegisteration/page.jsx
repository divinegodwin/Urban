"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "@/app/supabaseClient";
import useUserAuth from "@/app/Auth/useUserAuth";
import Swal from "sweetalert2";
import Loader from "@/app/Loader";

const SellerRegisteration = () => {
  const router = useRouter();
  const user = useUserAuth(); // custom hook
  const [inserting, setInserting] =useState(false)

  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    shopName: "",
    shopDescription: "",
    email: "",
    nin: "",
    accountNumber: "",
    accountName: "",
    phoneNumber: "",
    profilePic:"",
  });
  const handleChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Access the first file in the file input

    if (file) {
      const reader = new FileReader(); // Create a new FileReader instance

      reader.onload = (event) => {
        setFormData((previousData) => ({
          ...previousData,
          profilePic: event.target.result, // Set the image to the data URL
        }));
      };

      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  const SubmitRegisteration = async () => {
    if(Object.values(formData).some(field => field === '' || field === null)) {
     setFormError('all fields must be filled')
      return;
    } 

      const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if(!phoneRegex.test(formData.phoneNumber)){
    setFormError('invalid phone number')
   
    return;
    } 
  
setInserting(true)
    const { data, error } = await supabase.from("Seller").insert({
      shop_name: formData.shopName,
      shop_description: formData.shopDescription,
      email: formData.email,
      phone_number: formData.phoneNumber,
      nin: formData.nin,
      account_number: formData.accountNumber,
      account_name: formData.accountName,
      user_id: user.id,
      profile_pic: formData.profilePic,
    });
    if (error) {
      console.log(error);
    } else {
     
      return Swal.fire({
        title: "Resgistration Succesfull!",
        text: "Shop registeration complete! you're ready to start selling",
        icon: "success",
      }).then(() => {
        router.push("/Products");
      });
    }
  };

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md m-auto w-full">
        <h2 className="text-2xl font-bold mb-6 ">
          Register as a Seller at <span className="text-bold text-[#1746c3]">Urban</span>
        </h2>
        {formError &&<p className="text-center text-red-500">{formError}</p>}
        <div className="w-[150px] h-[150px] border-blue-500  mb-4 rounded-full overflow-hidden border-2">
          <img src={formData.profilePic} 
          className="w-full h-full object-cover " 
          />
        </div>
        <div className="flex justify-center">
          <input
            className="mb-6 "
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name ="profilePic"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="shopName"
            placeholder="Shop name"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <textarea
            type="text"
            name="shopDescription"
            placeholder="Shop description"
            className="h-[100px] w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>
    
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>
        {inserting && <Loader />}
        <div className="mb-4">
          <textarea 
  
            type="number"
            name="phoneNumber"
            placeholder="Phone number eg 23470..."
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="nin"
            placeholder="Nin"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="accountNumber"
            placeholder="Account number"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="accountName"
            placeholder="Account name"
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between pt-6">
          <button
            onClick={SubmitRegisteration}
            className="center p-3 bg-[#1746c3] h-[50px] text-white rounded-lg"
          >
            SUBMIT
          </button>

          <Link href="/Products">
            <button className="center p-3 bg-red-500 h-[50px] text-white rounded-lg">
              CANCEL
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerRegisteration;
