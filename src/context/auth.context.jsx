import { createContext, useEffect, useState } from "react";
import { getUserInfo } from "../Apis/auth/user.api";

export const auth = createContext(null)
export default function AuthContextProvider({ children }) {
     const [isLogin, setLogin] = useState(null)
     const [userData, setUserData] = useState(null)
     async function getUserData() {
          const res = await getUserInfo()
          setUserData(res.user)
          // console.log(res.user)
     }
     useEffect(() => {
          if (localStorage.getItem('token')) {
               setLogin(localStorage.getItem('token'))
               getUserData()
          }
     }, [])
     return <auth.Provider value={{ isLogin, setLogin ,userData}}>
          {children}
     </auth.Provider>
}