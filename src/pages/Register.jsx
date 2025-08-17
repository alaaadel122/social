import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from "zod";
import { RegisterSchema } from '../lib/register.schema'
import Feedback from '../component/Feedback';
import { addUser } from '../Apis/auth/register.api'
import { Link, useNavigate } from 'react-router-dom';
export default function Register() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, handleSubmit, trigger,watch,
    formState: { errors   } } = useForm({
      resolver: zodResolver(RegisterSchema),
      mode: "onChange", // ✅ validates as you type
      reValidateMode: "onChange",
      defaultValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        gender: '',
        dateOfBirth: '',
      },
    })

  async function onSubmit(data) {
    setLoading(true)
    try {
      const res = await addUser(data)
      if (res.message === 'success') {
        console.log("==========", res)
        setLoading(false)
        navigate('/')
        setError('')
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
      <form className="max-w-md mx-auto mt-20 shadow shadow-gray-400 p-5" onSubmit={handleSubmit(onSubmit, (errors) => console.log('Form errors:', errors))}>
        <h1 className='text-purple text-center logo text-5xl dark:text-gray-200'>Register</h1>

        <div className="relative z-0 w-full mb-5 group">
          <input type="text" id="name" {...register('name', { required: 'Name is required!' })} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
          {errors.name && <Feedback msg={errors.name?.message}></Feedback>}


          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-purple dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
        </div>
        <div className="relative z-0 w-full mb-5 mt-4 group">
          <input type="email" id="email" {...register('email')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
          {errors.email && <Feedback msg={errors.email?.message}></Feedback>}
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-purple dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>

        </div>
        <div className="relative z-0 w-full mb-5 mt-4 group">
          <input type="password" id="password" {...register('password')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
          {errors.password && <Feedback msg={errors.password?.message}></Feedback>}

          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-purple dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

        </div>
        <div className="relative z-0 w-full mb-5 mt-4 group">
          <input type="password" id="rePassword" {...register('rePassword')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
          {errors.rePassword && <Feedback msg={errors.rePassword?.message}></Feedback>}
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-purple dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-Password</label>
        </div>
        <div className="relative z-0 w-full mb-5 mt-4 group">
          <input type="date" id="dateOfBirth" {...register('dateOfBirth')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
          {errors.dateOfBirth && <Feedback msg={errors.dateOfBirth?.message}></Feedback>}
          <label htmlFor="dateOfBirth" className="peer-focus:font-medium absolute text-sm text-purple dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Date Of Birth</label>
        </div>
        <div className="flex items-center mb-4">
          <input id="female" type="radio" value='female' {...register('gender')} className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 accent-purple  dark:ring-offset-purple  dark:bg-purple dark:border-gray-400" />
          <label htmlFor="female" className="ms-2 text-sm font-medium text-purple dark:text-gray-200">Female</label>
        </div>
        <div className="flex items-center mb-4">
          <input id="male" type="radio" value='male' {...register('gender')} className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 accent-purple  dark:ring-offset-purple  dark:bg-purple dark:border-gray-400" />
          <label htmlFor="male" className="ms-2 text-sm font-medium text-purple dark:text-gray-200">Male</label>
        </div>
        {errors.gender && <Feedback msg={errors.gender?.message}></Feedback>}

        <button className='bg-purple btn w-full'>{loading ? <i className='fa-solid fa-spin fa-spinner text-white'></i> : 'Register'}</button>
        <p className='text-gray-600 pt-3'>Hava an account? <Link className='text-purple font-bold' to={'/'}>Login</Link></p>

      </form>
    </>

  )
}
