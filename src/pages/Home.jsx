import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getPosts } from '../Apis/posts/posts.api'
import Loading from '../component/Loading'
import { da } from 'zod/v4/locales'
import PostItem from '../component/PostItem'
import CreatePost from '../component/CreatePost'
import Pagination from '../component/Pagination'

export default function Home() {
  const {isLoading,isError,error,data}= useQuery({queryKey:['posts',{ page: 1, limit: 20 }],queryFn: () => getPosts({ page: 1, limit: 20 })})
  const noOfPage= data?.paginationInfo?.numberOfPages;
  console.log(data?.paginationInfo?.numberOfPages)
  console.log(data)
  if(isLoading)
    return <Loading></Loading>
  if(isError)
    return <h2>{error?.message}</h2>
  return (
    <>
    <CreatePost></CreatePost>
      {[...data.posts].map((post)=><PostItem key={post._id} post={post}></PostItem>)}
      <Pagination noOfPage={noOfPage}></Pagination>
    </>
  )
}
