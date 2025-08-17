import axios  from "axios";
export async function login(dataForm){
     const {data} = await axios.post('https://linked-posts.routemisr.com/users/signin',dataForm)
     return data
}