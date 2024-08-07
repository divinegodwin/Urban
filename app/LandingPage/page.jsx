"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const page = () => {
  const router = useRouter();

  const GetStarted = ()=>{
    
    router.push('./Products')
  }

  const Images =[
    {
      id:1,
      src:"/walking.png",
      text:'Welcome To Our App And Enjoy The Time'
    },
    {
      id:2,
      src:"/services.png",
      text:'Best Service You Will Find In Market'
    },
    {
      id:3,
      src:"/delivery.png",
      text:'Quick Delivery To Your place'
    }
  ]
const [displayImage, setDisplayimage] = useState(0)

  const  Next =()=>{
    setDisplayimage((previous)=>(previous+1)% Images.length)
  }

  return (
    <div className="mt-[6rem]">
      
      <div>
        <Image
          src={Images[displayImage].src}
          className="pt-[2rem]"
          height={800}
          width={800}
          alt="an image"
        />
         <p className="text-center font-bold text-2xl px-4">{Images[displayImage].text}</p>

        {displayImage !== Images.length-1? (
          <button onClick={Next} className="bg-[#1746c3] text-white w-[100px] h-[40px] rounded-full float-right mr-10 mt-14">
          Next
        </button>
        )
        :(

          <Link href='Auth/Signup'>
        <button
        onClick={GetStarted}
         className="bg-[#1746c3] text-white w-[120px] h-[50px] rounded-full float-right mr-10 mt-14">
          Get Started
        </button>
        </Link>
        )
}
      </div>
      
    </div>
  );
};

export default page;
