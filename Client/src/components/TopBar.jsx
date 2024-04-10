import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SlSocialStumbleupon } from "react-icons/sl";
import {Link, useNavigate} from 'react-router-dom'
import TextInput from './TextInput';
import CustomeButton from './CustomeButton';
import { useForm } from 'react-hook-form';
import {BsMoon, BsSunFill } from 'react-icons/bs';
import {IoMdNotificationsOutline} from 'react-icons/io'
import Logout from '../ReduX/userSlice'
import {setTheme} from '../ReduX/theme'
import { Data } from '../App';
import axios from 'axios'
const TopBar = () => {
    const {setPosts}=useContext(Data)
    const Navigation=useNavigate()
    const {theme}=useSelector((state)=>state.theme)
    const {user}=useSelector((state)=>state.user)
    const dispath=useDispatch();
    const{register,handleSubmit,formState:{errors}}=useForm()
    const handleSearch=async (data)=>{
            const res=await axios.post('http://localhost:3001/post',{data})
            setPosts(res.data.data);
    }
    const handleTheme=()=>{
        const themeValue= theme==='light'?'dark':'light'
        console.log(themeValue);
        dispath(setTheme(themeValue))
    }
    const logOut=()=>{
        localStorage.clear()
        Navigation('/Login')
    }

  return (
    <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-primary'>
        <Link to='/' className='flex gap-2 items-center'>
            <div className='p-1 md:p-2 bg-[#065ad8] rounded text-white'>
                <SlSocialStumbleupon />
            </div>
            <span className='text-xl md:text-2xl text-[#065ad8] font-semibold'>EchoSphere</span>
        </Link>

        <form className='hidden md:flex items-center justify-center' onSubmit={handleSubmit(handleSearch)}>
            <TextInput placeholder="Search" styles="w-[18rem] lg:w-[38rem] rounded-l-full py-3" register={register("search")} />
            <CustomeButton titile="Search" type='submit' containerStyle='bg-[#0444a4] text-white px-6 py-2.5 mt-2 rounded-r-full'/>
        </form>

        {/* ICONS */}

        <div className='flex gap-4 items-center text-ascent-1 text-md md:text-xl'> 
        <button onClick={()=>{handleSearch()}}>
            {theme?<BsMoon onClick={()=>handleTheme()}/>:<BsSunFill onClick={()=>handleTheme()}/>}
        </button>
        <div className='hidden lg:flex'>
            <IoMdNotificationsOutline  />
        </div>
        <div>
            <CustomeButton onClick={()=>logOut()}
            titile='Log Out'
            containerStyle='text-sm text-ascent-1 px-4 md:px-6 py-1 md:py-2 border border-[#666] rounded-full' />
        </div>

        </div>
    </div>
  )
}

export default TopBar