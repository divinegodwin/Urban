import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const[isOpen, setOpen]= useState(false)
  const ShowNavigation = ()=>{
    setOpen(!isOpen)
  }
  return (
    <div>
      <main className='bg-[#ffff] h-[60px] fixed top-0 w-full shadow-lg p-4 flex justify-between items-center'>
        <header className='font-bold text-xl text-[#1746c3]'>Urban</header>
        
        <div className='flex items-center gap-[5rem]'>

          <div className='flex gap-[1rem]'>
            <Link href='/Cart'>
              <Image 
                src='/shopping-bag.png'
                height={30} 
                width={30}
                className='h-[30px] w-[30px]'
                alt='shopping bag'
              />
            </Link>
           
            <Image 
            onClick={ShowNavigation}
              src='/menu.png'
              height={30} 
              width={30}
              className='h-[30px] w-[30px]'
              alt='menu'
            />
          </div>
        </div>
       
      </main>

      <nav className={isOpen ? ' nav fixed w-full top-0 flex flex-col mt-[3rem] max-h-[200px] bg-white shadow-sm items-center pt-4 text-md' : 'close hidden' }>
            <ul >
              <li className='p-2'>Products</li>
              <li className='p-2'>About</li>
              <li className='p-2'>Contact</li>
              <li className='p-2'>Login</li>
            </ul>
          </nav>
    </div>
  );
}

export default Navbar;
