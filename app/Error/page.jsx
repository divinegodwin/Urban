'use client'
import React from 'react'
import Image from 'next/image'

const ErrorPage = () => {
  return (

    <div className='flex flex-col justify-center mt-[6rem]'>
<Image className="m-auto" src='/error.png' height={500} width={500} alt="error in diplaying cart" />
<p className='text-xl text-center'>Can't connect to the internet</p>
    </div>
  )
}

export default ErrorPage