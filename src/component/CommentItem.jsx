import React, { useContext, useEffect, useState } from 'react'
import formateDate from '../lib/formatData';
import { auth } from '../context/auth.context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteComment } from '../Apis/Comments/deleteComment.api';
import toast from 'react-hot-toast';

export default function CommentItem({ comment, postId }) {
     console.log(comment)
     const queryClient = useQueryClient()

     const { commentCreator: { name, photo, _id }, content, createdAt, id } = comment;
     const { userData } = useContext(auth)
     const [isToggle, setToggle] = useState(false)
     const { data, isError, isPending, isSuccess, mutate } = useMutation({ mutationFn: deleteComment, onSuccess: queryClient.invalidateQueries({ queryKey: ['comments', postId] }) })
     function deleteFn() {
          mutate(id)
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
          <div className='createdInfo flex justify-between py-2 pl-5'>
               <div className='flex items-center'>
                    <img src={photo} className='rounded-circle size-15  ' />
                    <div className='pl-3'>
                         <p>{name}</p>
                         <span className='text-gray-400'>{formateDate(createdAt)}</span>
                         <p>{content}</p>
                    </div>
               </div>
               {userData?._id === _id && <i className='fa-solid fa-trash hover:text-red-800 transition-all  fa-1x p-10 text-gray-500' onClick={() => setToggle(true)}></i>}
               {isToggle && <div id="popup-modal" tabIndex={-1} className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
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
     )
}
