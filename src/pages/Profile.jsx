import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import { getUserPosts } from '../Apis/auth/profile.api'
import SliderMenu from '../component/SliderMenu'
import PostItem from '../component/PostItem'
import ProfilePosts from '../component/ProfilePosts'

export default function Profile() {
  const { id } = useParams()
  const { data, isLoading, error, isError } = useQuery({ queryKey: ['profile', id], queryFn: () => getUserPosts(id) })
  return (
    <div className='grid grid-cols-4 gap-4 mt-30'>
      <div className="col-1"><SliderMenu data={data}></SliderMenu></div>
      <div className="col-span-3">
        <ProfilePosts ></ProfilePosts> 
        
      </div>
    </div>
  )
}
