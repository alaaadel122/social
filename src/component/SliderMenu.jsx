import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../context/auth.context'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import changeProfileImg from '../Apis/auth/changePhoto.api';
import SliderItem from './SliderItem';

export default function SliderMenu() {
  const queryClient = useQueryClient()
  const userData = useContext(auth)
  const user = userData.userData;
  const [image, setImage] = useState('')
  let [imgSrc, setImageSrc] = useState('')
  const { data, isSuccess, isError, isPending, mutate } = useMutation({
    mutationFn: changeProfileImg,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      clear()
    }
  })
  console.log('slider', user)
  useEffect(() => {
    setImageSrc(user?.photo || '');
  }, [user]);
  useEffect(() => {
    if (isSuccess && data?.photo) {
      setImageSrc(data.photo);
    }
  }, [isSuccess, data]);
  function handleChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImage(file)
      setImageSrc(URL.createObjectURL(file))
      handleUPloadImage(file)
    }
  }
  function handleUPloadImage(file) {
    const formdata = new FormData()
    formdata.append('photo', file)
    mutate(formdata)
  }
  return (
    <div>
      {user && <>
        <div className="pt-5">
          <div className='flex relative'>
            <div className='rounded-full  w-fit'>
              <img src={imgSrc} className='size-20 rounded-5' />
            </div>
            <div className=' mt-22'>
              <input id="file" onChange={handleChange} className="title bg-gray-100 hidden border border-gray-300 p-2 mb-4 outline-none" spellCheck="false" placeholder="Title" type="file" />
              <div className=' border-1 absolute left-13 top-12 bg-gray-700 border-gray-700 size-10 flex justify-center items-center rounded-full'>
                <label htmlFor='file'>
                  <i className="mr-2 fa-solid fa-camera fa-md pl-1.5 pt-1 text-gray-300  cursor-pointer hover:text-gray-500   p-1 h-7"></i>
                </label>
              </div>
            </div>
            <div className='pt-5 pl-6'>
              <h4>{user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()}</h4>
              <h4 className='text-gray-500'>{user.email}</h4>
            </div>
          </div>
        </div>
        <SliderItem/>
      </>
      }
    </div>
  )
}
