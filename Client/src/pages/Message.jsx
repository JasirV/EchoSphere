import React from 'react'
import TopBarProfilwe from '../components/TopBarProfilwe'
import NoProfile from "../assets/ProfilePng.png";
import MessageUser from '../components/MessageUser';
const Message = () => {
  return (
    <>
    <TopBarProfilwe/>
    <div className='h-full w-full flex '>
        <div className='w-1/3 h-lvh ' style={{backgroundColor:'red'}}>
            <div className='flex justify-center'>
            <p className='text-ascent-1 text-2xl font-mono '> Messages</p>
            </div>
            <hr className='bg-primary mt-2 mb-7'style={{color:'white'}}/>
            <div className='w-full flex justify-around mt-1 mb-1'>
                <img className='w-14 h-14 rounded-full' src={NoProfile} alt="" />
                <p className='mt-2'>usere Name</p>
                <div className='rounded-full w-4 h-4 mt-3' style={{backgroundColor:'orange'}}></div>
            </div>
        </div>
        <div className='w-2/3 h-full' style={{backgroundColor:'blue'}} >
            <MessageUser/>
        </div>

    </div>
    </>
  )
}

export default Message