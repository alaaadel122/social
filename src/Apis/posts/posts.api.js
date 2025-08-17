import axios from "axios";
export async function getPosts({ limit = 10, page = 1 }){
     const token = localStorage.getItem('token')
     const {data} = await axios.get(`https://linked-posts.routemisr.com/posts?limit=${limit}&page=${page}&sort=-createdAt`,{
          headers:{
               token:token
          }
     })
     return data;  
}