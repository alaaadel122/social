import React, { useContext, useEffect, useState } from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../context/auth.context'
import { mode } from '../context/theme.context'
export default function Navbar() {
     const { isLogin, setLogin, userData } = useContext(auth)
     const { theme, toggleTheme } = useContext(mode)
     const [isOpen, setOpen] = useState(false)
     const navigate = useNavigate()
     console.log(userData)
     function toggle() {
          setOpen(!isOpen);
     }
     function logOut() {
          setLogin(null)
          localStorage.removeItem('token')
          navigate('/')
     }
     const [isScrolled, setIsScrolled] = useState(false);

     useEffect(() => {
          const handleScroll = () => {
               setIsScrolled(window.scrollY > 50); // change 50 to when you want opacity to start
          };

          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
     }, []);
     return (
          isLogin && (<nav className={`bg-white border-gray-200 dark:bg-gray-900 w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 
               ${isScrolled ? "bg-white/70 backdrop-blur-lg shadow-md" : "bg-transparent"} shadow`}>
               <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to={'/home'} className='logo text-2xl text-purple'><h2 className='tracking-widest'>Social</h2></Link>
                    <button data-collapse-toggle="navbar-default" onClick={toggle} type="button" className="cursor-pointer inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                         <span className="sr-only">Open main menu</span>
                         <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                         </svg>
                    </button>
                    <div className={`${!isOpen && 'hidden '} w-full md:block md:w-auto`} id="navbar-default">
                         <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">


                              <li className='bg-red-800 btn '>
                                   <Link to={'/'} className='text-white ' onClick={logOut}>Log Out <i className="fa-solid fa-right-from-bracket"></i></Link>
                              </li>
                              <li className=''>
                                   <Link to={`/profile/${userData?._id}`} className='flex gap-3 items-center'>
                                        <div className='flex rounded-full '>
                                             <img src={userData?.photo} className=' size-8 rounded-full ' />
                                        </div>
                                        <p className='text-gray-600 capitalize dark:text-gray-200'>{userData?.name}</p>
                                   </Link>
                              </li>

                              <li>
                                   <label className="inline-flex items-center cursor-pointer pt-1">
                                        <input type="checkbox" checked={theme === 'dark'} defaultValue className="sr-only peer" onChange={toggleTheme} />
                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple dark:peer-focus:ring-purple rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple dark:peer-checked:bg-purple" />
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                             {theme === "dark" && <i className='fa-solid text-purple fa-sun'></i>}
                                             {theme === 'light' && <i className='fa-solid text-purple fa-moon'></i>}
                                        </span>
                                   </label>
                              </li>

                         </ul>
                    </div>
               </div>
          </nav>

          )
     )
}
