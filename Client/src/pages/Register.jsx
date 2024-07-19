import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BsShare } from "react-icons/bs";
import { CgLivePhoto } from "react-icons/cg";
import { ImConnection } from 'react-icons/im'
import { SlSocialStumbleupon } from "react-icons/sl";
import TextInput from '../components/TextInput';
import Loading from '../components/Loading';
import CustomeButton from '../components/CustomeButton';
import BgImage from '../assets/social-media-cropped.png';
import axios from 'axios';

const Register = () => {
  const navigation=useNavigate()
  const [errMsg, setErrMsg] = useState("")
  const [submit, setSubmit] = useState(false)
  const token=localStorage.getItem('token')
  useEffect(()=>{
    if(token){
      navigation('/home')
    }else{
      navigation('/')
    }
  })
  const {
    register, handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  })
  const onSubmit = async (data) => {
setSubmit(true)
try {
  const res = await axios.post(
    "https://echosphere-5ixt.onrender.com/register",
    data,
    {
      headers: {
        "Content-Type": "application/json",
      }
    }
  )
  if(res?.status==="fail"){
setErrMsg(res)
  }else{
    setErrMsg(res);
    
    setInterval(()=>{
      navigation("/verificationCheck")
    },3000)
   
  }
  setSubmit(false)
} catch (error) {
  console.log(error);
  setSubmit(false)
}
  }

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
            Create your account
          </p>
          <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput name="firstName" placeholder="FirstName" label="First Name" type="fristName" register={register("firstName", { required: "First Name is required" })} styles='w-full rounded-full' labelStyle='ml-2' error={errors.firstName ? errors.firstName?.message : ""} />
              <TextInput name="LastName" placeholder="Last Name" label="Last Name" type="lastName" register={register("lastName", { required: "Last Name Address is required" })} styles='w-full rounded-full' labelStyle='ml-2' error={errors.lastName ? errors.lastName?.message : ""} />
            </div>
            <TextInput name="email" placeholder="email@example.com" label="Email Address" type="email" register={register("email", { required: "Email Address is required" })} styles='w-full rounded-full' labelStyle='ml-2' error={errors.email ? errors.email.message : ""} />
            <div className='w-full flex flex-col lg:flex-row gap-1 md:gap-2'>
              <TextInput name="password" placeholder="Password" label="Password" type="Password" register={register("password", { required: "Password is required" })} styles='w-full rounded-full' labelStyle='ml-2' error={errors.password ? errors.password?.message : ""} />
              <TextInput name="password" placeholder="Password" label="Confirm Password" type="Password" register={register("cpassword", {
                validate: (value) => {
                  const { password } = getValues();
                  if (password !== value) {
                    return "Passwords do no match"
                  }
                }
              })} styles='w-full rounded-full' labelStyle='ml-2' error={errors.cpassword && errors.cpassword.type === "validate" ? errors.password?.message : ""} />
            </div>

            {errMsg?.message && (
              <span className={`text-sm ${errMsg?.status === "failed" ? "text-[#f64949fe]" : "text-[#2ba150fe]"}mt-0.5`}>
                {errMsg?.message}
              </span>
            )}
            {submit ? <Loading /> : <CustomeButton type="submit" containerStyle={`inline-flex justify-center rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none `} titile='Create Account' />}
          </form>

          <p className='text-ascent-2 text-sm text-center'>
            Already have an account?
            <Link to='/login' className='text-[#065ad8] font-semibold ml-2 cursor-pointer'>Login
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
              <BsShare size={14} />
            </div>
          </div>

          <div className='mt-16 text-center'>
            <p className='text-white text-base'>Connect with friends & have share for fun</p>
            <span className='text-sm text-white/80'>Share memories with friends and the world.</span>
          </div>
        </div>
      </div>
    </div>
      )}



export default Register