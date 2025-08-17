import axios from "axios";

export default function changeProfileImg(formData){
     const token = localStorage.getItem('token')
     const {data} = axios.put('https://linked-posts.routemisr.com/users/upload-photo',formData,{
          headers:{
               token
          }
     })
     return data
}