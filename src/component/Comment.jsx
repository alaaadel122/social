import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { getComments } from '../Apis/Comments/comments.api'
import Loading from './Loading'
import CommentItem from './CommentItem'
import CreateComment from './CreateComment'

export default function Comment({id}) {
     const {data,isError,error,isLoading} = useQuery({queryKey:['comments',id],queryFn:()=>getComments(id)})
     if(isLoading)
          return <p>Loading...</p>
     if(isError)   
          return <p>{error?.message}</p>  
  return (
    <div>
     {data.comments.map((comment)=><CommentItem key={comment._id} comment={comment} postId={id}></CommentItem>)}
    </div>
  )
}
