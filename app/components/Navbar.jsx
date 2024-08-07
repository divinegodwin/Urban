import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const ShowNavigation = () => {
    setOpen(!isOpen);
  };
  return (
    <div>
      <main className="bg-[#ffff] h-[60px] fixed top-0 w-full shadow-lg p-4 flex justify-between items-center">
        <header className="font-bold text-xl text-[#1746c3]">Urban</header>

        <div className="flex items-center gap-[5rem]">
          <div className="flex gap-[1rem]">
            <Link href="/Cart">
              <svg
              className="w-[30px]"
                data-slot="icon"
                fill="none"
                stroke-width="1.5"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
            ? " nav fixed w-full top-0 flex flex-col mt-[3rem] h-[220px] bg-white shadow-sm items-center pt-4 text-md"
            : "close hidden"
        }
      >
        <ul>
          <Link href='/Products'>
          <li className="p-2">Products</li>
          </Link>
          <li className="p-2">About</li>
          <li className="p-2">Contact</li>
          <button className="center p-3 bg-[#1746c3] h-[50px] text-white rounded-lg">Logout</button>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
