import React, { useContext, useEffect, useState } from 'react'
import formateDate from '../lib/formatData'
import { Link, useLocation } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Comment from './Comment';
import CreateComment from './CreateComment';
import { auth } from '../context/auth.context';
import { deletePost } from '../Apis/posts/deletePost.api';
import toast from 'react-hot-toast';
export default function PostItem({ post }) {
     const queryClient = useQueryClient()
     const { userData } = useContext(auth)
     const { body, createdAt, image, user: { name, photo, _id: userId }, _id } = post;
     const [isToggle, setToggle] = useState(false)
     const location = useLocation().pathname.startsWith('/posts')
     //to know where i am in details so comment can be open but if in home comment should be closed
     const { data, isError, isPending, isSuccess, mutate } = useMutation({
          mutationFn: deletePost, onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['posts'] })
          }
     })
     //it return true/false
     //so we can gave it to useState
     let [isOpen, setOpen] = useState(location)
     function deleteFn() {
          mutate(_id)
          console.log('delete ', data)
          setToggle(false)
     }
     useEffect(() => {
          if (isPending) {
               toast('Deleting Post.....');
          }
     }, [isPending]);

     useEffect(() => {
          if (isSuccess) {
               toast.success('Post Deleted successfully');
          }
     }, [isSuccess]);
     return (
          <div>

               <div className={`${isOpen && 'mt-30'} max-w-3xl relative m-auto my-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700`}>
                    <div className='flex justify-between'>
                         <div className='createdInfo flex items-center py-3 px-2 ' >
                              <div className=' rounded-full '>
                                   <img src={photo} className='rounded-full size-15 ' />
                              </div>
                              <div className='pl-5'>
                                   <p>{name}</p>
                                   <span className='text-gray-400'>{formateDate(createdAt)}</span>
                              </div>
                         </div>
                         <div>
                              {userData?._id === userId && <i className='fa-solid fa-trash hover:text-red-800 transition-all  fa-1x p-10 text-gray-500' onClick={() => setToggle(true)}></i>}
                              {isToggle &&
                                   <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
                                        <div className="relative  p-4 w-full max-w-md max-h-full">
                                             <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                  <button type="button" onClick={() => setToggle(false)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                                                       <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                       </svg>
                                                       <span className="sr-only">Close modal</span>
                                                  </button>
                                                  <div className="p-4 md:p-5 text-center">
                                                       <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                       </svg>
                                                       <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Post?</h3>
                                                       <button data-modal-hide="popup-modal" type="button" onClick={deleteFn} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                                            Yes, I'm sure
                                                       </button>
                                                       <button data-modal-hide="popup-modal" type="button" onClick={() => setToggle(false)} className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              }
                         </div>
                    </div>
                    <Link to={`/posts/${_id}`}>
                         <img className="rounded-t-lg w-full" src={image} alt="post-image" />
                    </Link>
                    <div className="p-5">
                         <a href="#">
                              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"></h5>
                         </a>
                         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{body}</p>
                         <div className='flex justify-between border-t border-b py-3 text-gray-400 '>
                              <i className='fa-solid fa-thumbs-up hover:text-purple '></i>
                              <i className='fa-solid fa-comment hover:text-purple cursor-pointer' onClick={() => setOpen(!isOpen)}></i>
                              <i className='fa-solid fa-share hover:text-purple'></i>
                         </div>
                    </div>
                    {isOpen && <>
                         <CreateComment id={_id}></CreateComment>
                         <Comment id={_id} /></>}
               </div>
          </div>
     )
}


//body,_id,createdAt,image,user:{name,photo}