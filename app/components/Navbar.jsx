
import React from 'react'
import Image from 'next/image'

const Navbar = () => {
    
  return (
    <div>
        <main className='bg-[#ffff] h-[60px] fixed top-0 w-[100%] shadow-xl p-4 flex gap-[12rem]'>
            <header className='font-bold text-xl text-[#1746c3]'>Urban</header>
            
            <div className='flex gap-8'>
            <Image src='/shopping-bag.png'
             height={30} 
            width={30}
            alt='an image'/>
            <Image src='/menu.png'
             height={30} 
            width={30}
            alt='an image'/>
            </div>
        </main>

    </div>
  )
}

export default Navbar