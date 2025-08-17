import React, { useContext } from 'react'
import Navbar from '../component/Navbar'
import { Outlet } from 'react-router-dom'
import { mode } from '../context/theme.context'

export default function Layout() {
  const {theme} = useContext(mode)
  return (
    <div className={`${theme === 'dark' && 'dark'} dark:bg-gray-700 dark:text-white flex min-h-screen flex-col`}>
      <Navbar />
      
      <div className="container justify-center ">
        <Outlet/>
      </div>
    </div>
  )
}
