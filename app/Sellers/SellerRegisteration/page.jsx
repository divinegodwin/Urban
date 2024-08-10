"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import supabase from "@/app/supabaseClient";
import useUserAuth from "@/app/Auth/useUserAuth";
import Swal from "sweetalert2";
import Loader from "@/app/Loader";

const SellerRegisteration = () => {
  const router = useRouter();
  const user = useUserAuth(); // custom hook
  console.log(user);
  const [inserting, setInserting] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formError, setFormError] = useState("");
  const [formData, setFormData] = useState({
    shopName: "",
    shopDescription: "",
    email: "",
    nin: "",
    accountNumber: "",
    accountName: "",
    phoneNumber: "",
    profilePic: "",
  });

  const handleChange = (e) => {
    setFormData((previousData) => ({
      ...previousData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setFormData((previousData) => ({
          ...previousData,
          profilePic: event.target.result,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const checkForSeller = async () => {
      if (user && user.id) {
        const { data: availableSeller, error } = await supabase
          .from("Seller")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.log("Error checking for sellers:", error);
        } else if (availableSeller.length > 0) {
          router.push("/Sellers/SellerDashboard");
        } else {
          console.log("Seller does not exist");
        }
      }
      setLoading(false);
    };
    checkForSeller();
  }, [user, user?.id, router]);

  const SubmitRegisteration = async () => {
    if (Object.values(formData).some((field) => field === "" || field === null)) {
      setFormError("All fields must be filled");
      return;
    }

    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      setFormError("Invalid phone number");
      return;
    }

    setInserting(true);

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
      setInserting(false); 
    } else {
      Swal.fire({
        title: "Registration Successful!",
        text: "Shop registration complete! You're ready to start selling.",
        icon: "success",
      }).then(() => {
        router.push("/Seller/SellerDashboard");
      });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md m-auto w-full">
        <h2 className="text-2xl font-bold mb-6">
          Register as a Seller at <span className="text-bold text-[#1746c3]">Urban</span>
        </h2>
        {formError && <p className="text-center text-red-500">{formError}</p>}
        <div className="w-[150px] h-[150px] border-blue-500 mb-4 rounded-full overflow-hidden border-2">
          <img
            src={formData.profilePic}
            className="w-full h-full object-cover"
            alt="Profile"
          />
        </div>
        <div className="flex justify-center">
          <input
            className="mb-6"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            name="profilePic"
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
          <input
            type="number"
            name="phoneNumber"
            placeholder="Phone number e.g. 23470..."
            className="w-full p-3 border-2 border-gray-400 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="number"
            name="nin"
            placeholder="NIN"
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
