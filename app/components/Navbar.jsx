import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useRouter } from "next/navigation";

const Navbar = () => {

  const router = useRouter()

  const [isOpen, setOpen] = useState(false);
  const ShowNavigation = () => {
    setOpen(!isOpen);
  };

  const [displayName, setDisplayName] = useState('')

useEffect(()=>{
  const getUser = async () =>{
    const {data, error} = await supabase.auth.getUser()
    if(data){
  
      setDisplayName(data.user.user_metadata.user_name)
    }else{
      console.log(error)
    }
  }
  getUser()
},[])

  const handleLogout = async () =>{
      const{error} = await supabase.auth.signOut()
      if(error){
        console.log('error logging out', error)
      }else{
        localStorage.removeItem('sessionToken');
        router.push('/Auth/Login')
      }
  }

  return (
    <div>
      <main className="bg-[#ffff] h-[60px] fixed top-0 w-full shadow-lg p-4 flex justify-between items-center">
        <div className="flex flex-col">
        <header className="font-bold text-2xl text-[#1746c3]">Urban</header>
        <div><p3><span className="text-[#1746c3] font-bold text-md">Welcome,</span> {displayName}.</p3></div>
        </div>

        <div className="flex items-center gap-[5rem]">
          <div className="flex gap-[1rem]">
            <Link href="/Cart">
              <svg
              className="w-[30px]"
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
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                ></path>
              </svg>
            </Link>

            <Image
              onClick={ShowNavigation}
              src="/menu.png"
              height={30}
              width={30}
              className="h-[30px] w-[30px]"
              alt="menu"
            />
          </div>
        </div>
      </main>

      <nav
        className={
          isOpen
            ? " nav fixed w-full top-0 flex flex-col mt-[3.4rem] overflow-auto z-10  h-[260px] bg-white shadow-sm items-center pt-4 text-md"
            : "close hidden"
        }
      >
        <ul>
          <Link href='/Products'>
          <li className="p-2">Products</li>
          </Link>
          <li className="p-2">About</li>
          <li className="p-2">Contact</li>
          <Link href='/Sellers/SellerRegisteration'><li className="p-2">My Shop</li></Link>
        </ul>
        <button onClick={handleLogout} className=" w-[140px] center p-3 mt-2 bg-[#1746c3] h-[50px] text-white rounded-lg">Logout</button>
      </nav>
    </div>
  );
};

export default Navbar;
