import React from 'react'
import { Navigate, NavLink, useParams } from 'react-router-dom'

export default function SliderItem() {
const { id } = useParams();
  return (
    <div>
     <button className='border-2 border-gray-200 mt-5 p-2 rounded-2xl w-full text-start'>
          <NavLink to={`/profile/${id}/changePassword`}>Change Password</NavLink>
     </button>
    </div>
  )
}
