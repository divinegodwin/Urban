import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import supabase from "../supabaseClient";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const ShowNavigation = () => {
    setOpen(!isOpen);
  };

  const [displayName, setDisplayName] = useState("");
  const [isBoss, setIsBoss] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      let userName;
      if (error) {
        console.log(error.message);
        return;
      }

      if (data && data.user) {
        userName = data.user.user_metadata?.user_name;

        if (userName) {
          setDisplayName(userName);
        }

        if (userName === "Divine") {
          setDisplayName(`${userName}(Boss)`);
        }
      }
    };

    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log("error logging out", error);
    } else {
      localStorage.removeItem("sessionToken");
      router.push("/Auth/Login");
    }
  };

  return (
    <div>
      <main className="bg-[#ffff] h-[66px] fixed top-0 w-full shadow-lg p-4 flex justify-between items-center">
        <div className="flex flex-col">
          <header className="font-bold text-2xl text-[#1746c3]">Urban</header>
          <div>
            <p>
              <span className="text-[#1746c3] font-bold text-md">Welcome,</span>{" "}
              {displayName}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-[5rem]">
          <div className="flex gap-[1rem]">
            <Link href="/Cart">
              <div>
                <div className="w-[20px] h-[20px] rounded-full bg-red-600 top-3 right-[3.4rem] absolute text-[12px] text-center text-[#ffff]">
                  0
                </div>
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
              </div>
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
            ? " nav fixed w-full top-0 flex flex-col mt-[4.1rem] overflow-auto z-10  h-[260px] bg-white shadow-sm items-center pt-4 text-md"
            : "close hidden"
        }
      >
        <ul>
          <Link href="/Products">
            <div className="flex ">
              <svg
                className="mt-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                class="main-grid-item-icon"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              >
                <line x1="16.5" x2="7.5" y1="9.4" y2="4.21" />
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" x2="12" y1="22.08" y2="12" />
              </svg>

              <li className="p-2">Products</li>
            </div>
          </Link>
          <Link href="/Sellers/SellerRegisteration">
            <div className="flex">
              <svg
                className=" w-[20px] "
                data-slot="icon"
                fill="none"
                stroke-width="2"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
                ></path>
              </svg>
              <li className="p-2">My Shop</li>
            </div>
          </Link>
          <div className="flex">
            <svg
              className="mt-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              class="main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>

            <li className="p-2">Contact</li>
          </div>
          <div className="flex">
            <svg
            className="mt-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              class="main-grid-item-icon"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>

            <li className="p-2">Settigns</li>
          </div>
        </ul>
        <button
          onClick={handleLogout}
          className=" w-[140px] center p-3 mt-2 bg-[#1746c3] h-[50px] text-white rounded-lg"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
