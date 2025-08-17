import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPostDetail } from '../Apis/posts/postDetails.api'
import Loading from '../component/Loading'
import { useParams } from 'react-router-dom'
import PostItem from '../component/PostItem'

export default function PostDetails() {
     const {id}=useParams()
     const {data,isLoading,error,isError} = useQuery({queryKey:['post',id],queryFn:()=>getPostDetail(id)})
     if(isLoading)
          return <Loading></Loading>
          if(isError)
               return <h2>{error?.message}</h2>

   return (
    <PostItem key={data.post._id} post={data.post}></PostItem>
  )
 
}
