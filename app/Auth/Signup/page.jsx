"use client";
import React, { useState } from "react";
import supabase from "@/app/supabaseClient";
import Loader from "@/app/Loader";
import Link from "next/link";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  //const [notificationRecieved, setNotificationRecieved] = useState(false)
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)

 
  function handleChange(e) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }
  const handleSignup = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    if ((username || email || password) == "") {
      setError("all input fields must be filled");
      return;
    }
    let passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (!passwordRegex.test(password) && password.length < 8) {
      setError("use a strong password");
      return;
    }
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      setError("use a valid email");
      return;
    }
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            user_name: formData.username,
          },
          emailRedirectTo: 'https://checkurban.netlify.app/Products'
        },
      });
      alert("check your email for verification");
    } catch (error) {
      console.log(error);
      setError('no user found')
    }finally{
      setError('')
        setLoading(false)
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">SignUp</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>
        {loading && <Loader />}
        <div className="mb-6">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
          />
        </div>
        <button
          onClick={handleSignup}
          className="w-full bg-[#1746c3] text-white py-3 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Sign Up
        </button>
        
        <p className="text-center pt-4">Already have an account?<Link href='/Auth/Login'> <span className="text-[#1746c3]">Sign In</span></Link></p>
      </div>
    </div>
  );
};

export default Signup;
