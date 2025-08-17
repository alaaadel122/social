import React from 'react'
import SliderMenu from '../component/SliderMenu'
import { Outlet, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getUserPosts } from '../Apis/auth/profile.api'

export default function ProfileLayout() {
     const { id } = useParams()
  const { data, isLoading, error, isError } = useQuery({ queryKey: ['profile', id], queryFn: () => getUserPosts(id) })
  console.log('user posts' , data?.posts)
  return (
    
      <div className=" grid grid-cols-4 gap-4 mt-30">
      {/* Left Side Menu */}
      <div className="col-1"><SliderMenu data={data}></SliderMenu></div>

      {/* Right Side Content */}
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
   
  )
}
