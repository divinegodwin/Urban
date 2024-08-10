import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState, useEffect } from 'react'


const SellerRegisteration = () => {



  const[formError, setFormError] = useState('')
  const [formData, setFormData] = useState(
    {
      image:'',
      shopName:'',
      shopDescription:'',
      email:'',
      nin:'',
      accountNumber:'',
      accountName:'',
    }
  )
  const handleChange = (e)=>{
    setFormData((previousData)=>({
      ...previousData,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div>

<div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Register as a Seller</h2>
       <div className='w-[150px] h-[150px]  mb-4 rounded-full border-2'></div>
        <div className='flex justify-center'>
        <input 
        className='mb-6 '
        type ="file"
        accept='image/*' />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="ShopName"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
          onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="shopDescription"
            placeholder="Shop description"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}

          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}


         />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="nin"
            placeholder="Nin"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}

          />
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="accountNumber"
            placeholder="Account number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}

          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="accountName"
            placeholder="Account name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1746c3]"
            onChange={handleChange}

          />
        </div>
        <div className='flex justify-between pt-6'> 
          <button  className="center p-3 bg-[#1746c3] h-[50px] text-white rounded-lg">Continue</button>
          
          <Link href='/Products'>
          <button  className="center p-3 bg-red-500 h-[50px] text-white rounded-lg">Cancel</button>
</Link>
        </div>

    </div>
    </div>
  )
}

export default SellerRegisteration