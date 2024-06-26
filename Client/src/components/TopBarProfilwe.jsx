import React, { useEffect, useState } from 'react'
import { FaFacebookMessenger } from 'react-icons/fa'
import { SlSocialStumbleupon } from 'react-icons/sl'
import { Link, useNavigate } from 'react-router-dom'
import { IoNotifications } from "react-icons/io5";
import NoProfile from '../assets/ProfilePng.png'
import axios from 'axios';

const TopBarProfilwe = () => {
  const id=localStorage.getItem('user')
  const [user,setUser]=useState()
  const getUsers = async () => {
    const userId = id;
    try {
      const response = await axios.get(
        `https://echosphere-5ixt.onrender.com/profilesection/${userId}`
      );
      setUser(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(()=>{
    getUsers()
  },[])
  const Navigation=useNavigate()
  return (
    <div className='flex-1 h-16 px-4 flex gap-6 overflow-y-auto rounded-lg justify-between' >
                <Link to='/home' className='flex gap-2 items-center'>
                <div className='p-1 md:p-2 bg-[#065ad8] rounded text-white mt-2'>
                <SlSocialStumbleupon />
                </div>
                <span className='text-xl md:text-2xl text-[#065ad8] font-semibold mt-2'>EchoSphere</span>
                </Link>
        <div className='flex alignitem-center'>
            <div className='rounded-full w-10 h-10 bg-[#E4E6EB] flex items-center justify-center m-2'><FaFacebookMessenger onClick={()=>{Navigation('/message')}}/></div>
            <div className='rounded-full w-10 h-10 bg-[#E4E6EB] flex items-center justify-center m-2'><IoNotifications /></div>
            <div className='rounded-full w-10 h-10 bg-[#E4E6EB] flex items-center justify-center m-2 ' onClick={()=>{Navigation(`/profile/${user?._iid}`)}}><img className='w-10 h-10 rounded-full' src={user?.photo||NoProfile} alt="" /></div>
        </div>
    </div>
  )
}

export default TopBarProfilwe