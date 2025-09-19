import React, { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Register from './pages/Register'
import Login from './pages/login'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ProtectedPage from './pages/ProtectedPage'
import PostDetails from './pages/PostDetails'
import Profile from './pages/Profile'
import ProfileLayout from './pages/ProfileLayout'
import ProfilePosts from './component/ProfilePosts'
import ChangePassword from './component/ChangePassword'

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')

  function changeTheme() {
    if (theme === 'dark') { setTheme('light'); 
      localStorage.setItem('theme', 'light') 
    }else { 
      setTheme('dark'); 
      localStorage.setItem('theme', 'dark') 
    }
  }

  const routes = createBrowserRouter([{
    path: '/', element: <Layout changeTheme={changeTheme} theme={theme}></Layout>, children: [
      { index: true, element: <Login></Login> },
      { path: '/register', element: <Register></Register> },
      { path: '/home', element:<ProtectedPage><Home></Home></ProtectedPage>  },
      { path: '/profile/:id', element:<ProtectedPage><ProfileLayout></ProfileLayout></ProtectedPage> , children: [
          { index: true, element: <ProfilePosts /> },
          { path: 'changePassword', element: <ChangePassword /> },
        ] },
      { path: '/posts/:id', element: <ProtectedPage><PostDetails></PostDetails></ProtectedPage>},
      { path: '*', element: <NotFound></NotFound> }
    ]
  }])
  return (
    <div className={`${theme === 'dark' && 'dark'}`}>
      <RouterProvider router={routes} ></RouterProvider>
    </div>
  )
}
