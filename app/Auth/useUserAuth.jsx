'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import supabase from '../supabaseClient'

const useUserAuth = () => {  
    const [user, setUser] = useState(null)
    useEffect(()=>{
        const getUser = async () =>{
          const {data, error} = await supabase.auth.getUser()
          if(data.user){ 
            setUser(data?.user)
          }else{
            console.log(error)
          }
        }
        getUser()
      },[])

  return user
  
}

export default useUserAuth