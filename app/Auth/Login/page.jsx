"use client";
import React, { useState } from "react";
import supabase from "@/app/supabaseClient";
import Loader from "@/app/Loader";
import Link from "next/link"
import { useRouter } from "next/navigation";

const Login = () => {
    const router = useRouter()
  const [formData, setFormData] = useState({
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
  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if ((email || password) == "") {
      setError("all input fields must be filled");
      return;
    }
    try {
      setLoading(true)
      
const { data, error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password                ,
  })
  router.push('/Products')
  if(error){
    setError('No account found')
  }
    
    } catch (error) {
        setError('You do not have an account, please create one')
      console.log(error);
    }finally{
      setError('')
        setLoading(false)
      
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">SignIn</h2>
        {error && <p className="text-red-500 text-lg">{error}</p>}
      
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
          onClick={handleLogin}
          className="w-full bg-[#1746c3] text-white py-3 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Sign In
        </button>
        <p className="text-center pt-4">Don't have an account?<Link href='/Auth/Signup'> <span className="text-[#1746c3]">SignUp</span></Link></p>

      </div>
    </div>
  );
};

export default Login;
