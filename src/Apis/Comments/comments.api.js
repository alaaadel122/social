import axios from "axios"

export async function getComments(postId){
     const token=localStorage.getItem('token')
     const {data} =await axios.get(`https://linked-posts.routemisr.com/posts/${postId}/comments`,{
          headers:{
               token
          }
     })
     return data

}