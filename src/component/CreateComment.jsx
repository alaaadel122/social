import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { createComments } from '../Apis/Comments/createComment.api'
import { useRef } from 'react'

export default function CreateComment({id}) {
     const queryClient = useQueryClient()
     const textareaRef = useRef()
     const {isPending,data,mutate,error} = useMutation({mutationFn:createComments,onSuccess:queryClient.invalidateQueries(['comments',id])})
     function addCommentFn(e){
          e.preventDefault()
          const content = textareaRef.current.value
          mutate({content,post:id})
          textareaRef.current.value=''
     }
     console.log(data)
     return (
          <>
          {isPending && <h5>Posting ...</h5>}
               <form> 
                    <label htmlFor="chat" className="sr-only">Your comment</label>
                    <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                         <textarea id="chat" rows={2}   ref={textareaRef} className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-purple focus:border-purple dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple dark:focus:border-purple" placeholder="Your message..." defaultValue={""} />
                         <button type="submit" onClick={addCommentFn} className="inline-flex justify-center p-2 text-purple rounded-full cursor-pointer hover:bg-blue-100 dark:text-purple dark:hover:bg-gray-600">
                              <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                   <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                              </svg>
                              <span className="sr-only">Send message</span>
                         </button>
                    </div>
               </form>



          </>
     )
}
