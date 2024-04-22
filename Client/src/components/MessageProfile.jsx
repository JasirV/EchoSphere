import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NoProfile from "../assets/ProfilePng.png";


const MessageProfile = ({conversation}) => {
  const id =localStorage.getItem('user')
  const [user,setusers]=useState()
  const firendsId = conversation.members?.find(m => m !== id);
  const getUsers=async()=>{
    try {
      const response = await axios.post(`http://localhost:3001/messageUser`,{firendsId});
      setusers(response?.data?.data) 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
useEffect(()=>{
getUsers()
},[])
  return (
    <div>
       <img className="w-14 h-14 rounded-full" src={user?.photo||NoProfile} alt="" />
            <p className="text-ascent-1 text-lg text-white ">{user?.firstName}</p>
    </div>
  )
}

export default MessageProfile