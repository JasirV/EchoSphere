import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NoProfile from "../assets/ProfilePng.png";
import '../assets/messageUser.css'
const MessageProfile = ({conversation}) => {
  const id =localStorage.getItem('user')
  const [user,setusers]=useState()
  const firendsId = conversation.members?.find(m => m !== id);
  const getUsers=async()=>{
    try {
      const response = await axios.post(`https://echosphere-5ixt.onrender.com/messageUser`,{firendsId});
      setusers(response?.data?.data) 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
useEffect(()=>{
getUsers()
},[])
  return (
    <div className='flex justify-around items-center w-full hovereffect'>
       <img className="w-14 h-14 rounded-full" src={user?.photo||NoProfile} alt="" />
            <p className="text-ascent-1 text-lg text-white ">{user?.firstName}</p>
            <div
              className="rounded-full w-4 h-4 "
              style={{ backgroundColor: "orange" }}
            ></div>
    </div>
  )
}

export default MessageProfile