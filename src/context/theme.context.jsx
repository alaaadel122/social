import { createContext, useEffect, useState } from "react";

export const mode = createContext('')

export default function ModeContextProvider({ children }) {
     const [theme, setTheme] = useState('light')
     function toggleTheme() {
          if (theme === 'light') {
               setTheme('dark')
               localStorage.setItem('mode', 'dark')
          } else {
               setTheme('light')
               localStorage.setItem('mode', 'light')

          }
     }
     useEffect(() => {
          if (localStorage.getItem('mode') === 'dark')
               setTheme('dark')
     },[])
     return <mode.Provider value={{ theme, toggleTheme }}>
          {children}
     </mode.Provider>

}