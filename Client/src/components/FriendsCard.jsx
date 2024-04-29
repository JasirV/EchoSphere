import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import NoProfile from '../assets/ProfilePng.png'
import axios from 'axios';


const FriendsCard = ({data}) => {
    const [user,setuser]=useState()
    const userId=localStorage.getItem('user')
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://echospheree.site/getFriendsacc/${userId}`);
          setuser(response.data.data) 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    
  return (
    <div>
        <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
            <div className='flex items-center justify-between text-ascent-1 pb-2 border-b border-[#66666645]'>
                <span>Friends</span>
                <span>{user?.friends?.length}</span>
            </div>
            <div className='w-full flex flex-col gap-4 pt-4'>
                {user?.friends?.map((i,indesx)=>(
                    <Link to={`/profile ${i._id}`} key={indesx} className='w-full flex gap-4 items-center cursor-pointer'>
                        <img src={i?.photo??NoProfile} alt={i?.firstName}  className='w-10 h-10 object-cover rounded-full'/>
                        <div className='flex-1'>
                            <p className='text-base font-medium text-ascent-1'>
                                {i.firstName}{i.lastName}
                            </p>
                            <span className='text-sm text-ascent-2'>
                                {i?.profession??"No Professioin"}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </div>
  )
}

export default FriendsCard