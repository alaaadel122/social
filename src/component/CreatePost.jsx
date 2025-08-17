import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { createPost } from '../Apis/posts/createPost.api'
import toast from 'react-hot-toast'
import { auth } from '../context/auth.context'

export default function CreatePost() {
     const queryClient = useQueryClient()
     const userData = useContext(auth)
     const { data, isPending, mutate, error, isSuccess } = useMutation({ mutationFn: createPost,
           onSuccess:()=>{
               queryClient.invalidateQueries({ queryKey: ['posts'] , refetchType: 'all' });     
               clear()}
 })
     const user = userData.userData;
     const [body, setBody] = useState('')
     const [image, setImage] = useState('')
     const [imgSrc, setImageSrc] = useState('')
     const [isOpen,setOpen] = useState(false)

     function handleChange(e) {
          const file = e.target.files[0];
          if (file) {
               setImage(file)
               setImageSrc(URL.createObjectURL(file))
          }
     }
     function openCreatePost(){
          setOpen(!isOpen)
     }
     function handleAddPost(e) {
          e.preventDefault();
          const formdata = new FormData()
          if (body)
               formdata.append('body', body)
          if (image)
               formdata.append('image', image)
          mutate(formdata)
          setOpen(!isOpen)

     }
     function clear() {
          setBody('')
          setImageSrc('')
     }
     useEffect(() => {
          if (isPending) {
               toast('Loading.....');
          }
     }, [isPending]);

     useEffect(() => {
          if (isSuccess) {
               toast.success('Post added successfully');
          }
     }, [isSuccess]);
     return (
          <div className='mt-30 mx-auto w-3xl'>
               <button className='mb-3 flex border-2 w-full border-gray-200 rounded-full p-1' onClick={openCreatePost}>
                    <div className='rounded-full w-fit flex justify-center items-center size-15'>
                    <img src={user?.photo} className='size-13 flex justify-center rounded-full items-center ml-2'/>
                    </div>
                    <div className='pl-5 flex items-center'>
                         <p className='text-gray-600 dark:text-gray-200'>What's on your mind , {user?.name.toUpperCase()} ?</p>
                    </div>
               </button>
               <form onSubmit={handleAddPost} className={`${!isOpen && 'hidden'} editor mx-auto  flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl`}>

                    {imgSrc && <img src={imgSrc} value={imgSrc}/>}
                    <input id="file" onChange={handleChange} className="title bg-gray-100 hidden border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="file" />
                    <textarea value={body} onChange={(e) => setBody(e.target.value)} className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" placeholder="Describe everything about this post here" />
                    {/* icons */}
                    <div className="icons flex text-gray-500 m-2">
                         <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                         <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         <label htmlFor='file'>
                              <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>

                         </label>
                    </div>
                    {/* buttons */}
                    <div className="buttons flex">
                         <button className=" btn btn-text-purple border border-gray-300 p-1 px-4 font-semibold cursor-pointer  ml-auto">Cancel</button>
                         <button className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-2 bg-indigo-500">Post</button>
                    </div>
               </form>

          </div>
     )
}
