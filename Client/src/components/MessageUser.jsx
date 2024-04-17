import React from 'react'
import NoProfile from "../assets/ProfilePng.png";
const MessageUser = () => {
  
  return (
    <div className='w-full '>
        <div className='bg-primary flex'>
            <img className='w-16 h-16 rounded-full mx-4 mb-2' src={NoProfile} alt="" />
            <p className='text-ascent-1 text-xl font-medium mt-3 mx-9'>Name</p>
        </div>
        <hr />
        <div className='flex justify-end items-center flex-col'>
        </div>
    </div>
  )
}

export default MessageUser