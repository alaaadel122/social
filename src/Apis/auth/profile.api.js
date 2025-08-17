import axios from "axios"

export async function getUserPosts(userId) {
     const token = localStorage.getItem('token')
     const { data } = await axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts`, {
          headers: {
               token: token

          }
     })
     return data

}

