import axios  from "axios";
export async function changePassword(dataForm){
     const token  = localStorage.getItem('token')
     const {data} = await axios.patch('https://linked-posts.routemisr.com/users/change-password',dataForm,{
          headers:{
               token
          }
     })
     return data
}