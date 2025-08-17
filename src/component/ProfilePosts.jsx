import React from 'react'
import PostItem from './PostItem'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts } from '../Apis/auth/profile.api';
import Loading from './Loading';

export default function ProfilePosts() {
      const { id } = useParams();
  
  const { data, isLoading, error, isError } = useQuery({ queryKey: ['profile', id], queryFn: () => getUserPosts(id) })
  console.log('posts===',data?.posts)
  if (isLoading) return <Loading></Loading>;

  return (
    <div className='w-5xl'>
    
     {data?.posts.map((post)=><PostItem key={post._id} post={post}></PostItem>)}
    </div>
  )
}
