import axios from "axios"

export  async function createPost(formData) {
     const token = localStorage.getItem('token')
     const { data } = await axios.post(`https://linked-posts.routemisr.com/posts`, formData,
     {
         headers: {
               token,
               'Content-Type':'multipart/form-data'
          }
          })
     return data

}