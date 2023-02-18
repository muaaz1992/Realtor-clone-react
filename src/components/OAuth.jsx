import React from 'react'
import {FcGoogle} from "react-icons/fc"

export default function OAuth() {
  return (
    <button className='active-bg-red-900 active-shadow-lg bg-red-700 duration-150 ease-in-out flex font-md hover:bg-red-800 hover:shadow-lg items-center justify-center px-7 py-3 rounded shadow-md text-sm text-white transition uppercase w-full'>
        <FcGoogle className='bg-white mr-2 rounded-full text-2xl'/>
        Continue with Google
    </button>
  )
}
