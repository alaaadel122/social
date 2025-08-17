import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ChangePasswordSchema } from '../lib/changePassword.schema'
import { changePassword } from '../Apis/auth/changePassword'
import Feedback from './Feedback'
import { auth } from '../context/auth.context'
import { useNavigate } from 'react-router-dom'

export default function ChangePassword() {
     const [error, setError] = useState('')
     const navigate = useNavigate();
     const [loading, setLoading] = useState(false)
     const { setLogin } = useContext(auth);
     const { register, handleSubmit, formState: { errors }, reset } = useForm({
          resolver: zodResolver(ChangePasswordSchema),
          defaultValues: {
               password: '',
               newPassword: '',

          },
     })
     async function onSubmit(data) {
          setLoading(true)
          try {
               const res = await changePassword(data)
               if (res.message === 'success') {
                    console.log("==========", res)
                    setLoading(false)
                    setError('')
                    setLogin(res.token)
                    localStorage.setItem('token', res.token)
                    reset();
                    navigate('/home')
               }

          } catch (error) {
               setLoading(false)
               setError(error?.response?.data?.error)
               console.log(error?.response?.data?.error)
          } finally {
               setLoading(false);
          }

     }

     return (
          <div className='w-2xl mx-auto'>
               <div className='w-1/3 mx-auto my-2'>
                    {error && <Feedback msg={error}></Feedback>}
               </div>
               <form className="pl-25 pt-10 flex justify-center flex-col " onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='text-purple text-center  text-3xl dark:text-gray-200'>Change Password</h1>
                    <div className="relative z-0 w-full mb-5 mt-4 group">
                         <input type="password" id="password" {...register('password')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
                         {errors.password && <Feedback msg={errors.password?.message}></Feedback>}

                         <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Old Password</label>

                    </div>
                    <div className="relative z-0 w-full mb-5 mt-4 group">
                         <input type="password" id="newPassword" {...register('newPassword')} className="block py-2.5 px-0 w-full text-sm text-gray-400 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-400 dark:focus:border-purple focus:outline-none focus:ring-0 focus:border-purple peer" placeholder=" " />
                         {errors.newPassword && <Feedback msg={errors.newPassword?.message}></Feedback>}
                         <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-400 dark:text-gray-200 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-gray-400 peer-focus:dark:text-gray-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                    </div>
                    <button className='bg-purple btn w-full'>{loading ? <i className='fa-solid fa-spin fa-spinner text-white'></i> : 'Change Password'}</button>
               </form>
          </div>
     )
}
