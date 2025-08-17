import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../Apis/auth/login.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '../lib/login.schema'
import { auth } from '../context/auth.context'
import Feedback from '../component/Feedback'

export default function Login() {
  //token :::: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjg5MTFlY2RmY2YwMzNjOGI4MGZhMmY0IiwiaWF0IjoxNzU0MzQxNDc3fQ.dOdtOPxHHaSgpqLbk2q8BrIZWepqODRWO9OyNHjH_Lg
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {setLogin,isLogin} = useContext(auth)
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',

    },
  })
  useEffect(()=>{
    if(isLogin)
      navigate('/home')
},[,isLogin,navigate])
  async function onSubmit(data) {
    setLoading(true)
    try {
      const res = await login(data)
      if (res.message === 'success'){
        console.log("==========", res)
        setLoading(false)
        navigate('/home')
        setError('')
        setLogin(res.token)
        localStorage.setItem('token',res.token)
      }
      
    } catch (error) {
      setLoading(false)
      setError(error?.response?.data?.error)
      console.log(error?.response?.data?.error)
    }

  }
  return (
    <>
      <div className='w-1/3 mx-auto my-2'>
        {error && <Feedback msg={error}></Feedback>}
      </div>
      <form className="max-w-md mx-auto mt-20 shadow shadow-gray-400 p-5" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-purple text-center logo text-5xl dark:text-gray-200'>Login</h1>
        <div className="relative z-0 w-full mb-5 mt-4 group">
          <input type="email" id="email" {...register('email')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
          {errors.email && <Feedback msg={errors.email?.message}></Feedback>}

          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

        </div>
        <div className="relative z-0 w-full mb-5 mt-4 group">
          <input type="password" id="password" {...register('password')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
          {errors.password && <Feedback msg={errors.password?.message}></Feedback>}
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        <button className='bg-purple btn w-full'>{loading ? <i className='fa-solid fa-spin fa-spinner text-white'></i> : 'Login'}</button>
        <p className='text-gray-600 pt-3'>Don't Hava an account? <Link className='text-purple font-bold' to={'/register'}>Register</Link></p>
      </form>
    </>
  )

}
