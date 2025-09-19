import React from 'react'
import { BounceLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className='flex justify-center items-center min-h-screen'>  
      <BounceLoader
      visible={true}
      height="80"
      width="80"
      color="#6941C6"
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
      secondaryColor='gray'
    />
    </div>
  )
}
