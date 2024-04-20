import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'
import { BsShare } from "react-icons/bs";
import { CgLivePhoto } from "react-icons/cg";
import {ImConnection} from 'react-icons/im'
import { SlSocialStumbleupon } from "react-icons/sl";
import TextInput from '../components/TextInput';
import Loading from '../components/Loading';
import CustomeButton from '../components/CustomeButton';
import BgImage from '../assets/social-media-cropped.png';
import axios from 'axios';
const Login = () => {
  const navigation=useNavigate()
  const {
    register,handleSubmit,
    formState:{errors},
  }=useForm({
    mode:"onChange"
  })
  useEffect(()=>{
    const token=localStorage.getItem('token')
    if(token){
      navigation('/home')
    }else{
      navigation('/login')
    }
  })
  const onSubmit=async (data)=>{
    setSubmit(true);
    try {
      const res= await axios.post('http://localhost:3001/login',data)
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("user",res.data.data._id)
      
      if(res.status===404){
        setErrMsg(res)
      }else{
        setErrMsg('')
        navigation('/home')
        
          
      }
      setSubmit(false)
    } catch (error) {
console.log(error);  
setSubmit(false)    
    }

  }
  const [errMsg,setErrMsg]=useState("")
  const [submit,setSubmit]=useState(false)
  const dispatch=useDispatch()
  return (
    <div className='bg-bgColor w-full h-screen flex items-center justify-center p-6'>
      <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex flex-row-reverse bg-primary rounded-xl overflow-hidden shadow-xl'>
        {/* LEFT */}
        <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center'>
        <div className='w-full flex gap-2 items-center mb-6'>
            <div className='p-2 bg-[#065ad8] rounded text-white'>
            <SlSocialStumbleupon />
            </div>
            <span className='text-2xl texxt-[#065ad8]'>EchoSphere

            </span>
          </div>
          <p className='text-ascent-1 text-base font-semibold'>
            Log in to your account
          </p>
          <span className='text-sm mt-2 text-ascent-2'>Welcome Back</span>
          <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
          <TextInput  name="email" placeholder="email@example.com" label="Email Address" type="email" register={register("email",{required:"Email Address is required"})} styles='w-full rounded-full' labelStyle='ml-2' error={errors.email?errors.email.message:""} />
          <TextInput  name="password" placeholder="Password" label="Password" type="Password" register={register("password",{required:"Password is required"})} styles='w-full rounded-full' labelStyle='ml-2' error={errors.password?errors.password?.message:""} />
          
          <Link to ="/reset-password" className='text-sm text-right text-blue font-semibold'> Forget Password</Link>

          {errMsg?.message&&(
            <span className={`text-sm ${errMsg?.status=="failed"?"text-[#f64949fe]":"text-[#2ba150fe]"}mt-0.5`}>
              {errMsg?.message}
            </span>
          )}
          {submit?<Loading/>:<CustomeButton type="submit" containerStyle={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none `} titile='Login'  />}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Don't have an account?
            <Link to='/' className='text-[#065ad8] font-semibold ml-2 cursor-pointer'>Create Account
            </Link>
          </p>
        </div>
        {/* RIGHT */}
        <div className='hidden lg:flex w-1/2 h-full flex-col items-center justify-center bg-blue'>
          <div className='relative w-full flex items-center justify-center'>
            <img src={BgImage} alt="bgImage" className='w-48 2xl:w-64 h-48 2xl:h-64 rounded-full object-cover' />
            <div className='absolute flex items-center gap-1 bg-white left-12 bottom-6 py-2 px-5 rounded-full'>
              <CgLivePhoto /> 
            </div>
            
            <div className='absolute flex items-center gap-1 bg-white left-10 top-6 py-2 px-5 rounded-full'>
              <ImConnection />
            </div>

            <div className='absolute flex items-center gap-1 bg-white right-10 top-10  py-2 px-5 rounded-full'>
              <BsShare size={14}/>
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>Connect with friends & have share for fun</p>
            <span className='text-sm text-white/80'>Share memories with friends and the world.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login