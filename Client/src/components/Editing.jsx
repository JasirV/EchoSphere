import React, { useState } from 'react'
import TextInput from './TextInput'
import CustomeButton from './CustomeButton'
import { useDispatch } from 'react-redux'
import { useForm } from "react-hook-form";
import Loading from './Loading';
import { handleFileUpload } from '../utils';
import axios from 'axios';
import { UserLogin } from '../ReduX/userSlice';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

const Editing = () => {
  const userId=localStorage.getItem('user')
  const navigaion=useNavigate()
  const dispatch=useDispatch()
  const [errMsg,setErrMsg]=useState('')
  const [isSubmitting,setIsSubmitting]=useState(false)
  const [picture,setPicture]=useState(null)
  const [coverPic,setCoverPic]=useState(null)
  const {register,handleSubmit,formState:{errors},}=useForm({
    mode:'onChange',defaultValues:{...userId},
  })
  const onSubmit=async (data)=>{
    setIsSubmitting(true);
    setErrMsg("")
    try {
      const a= await handleFileUpload(picture)
      const uri=picture&&a
      const b= await handleFileUpload(coverPic)
      const uritwo=coverPic&&b
      const {firstName,lastName,location,profession}=data;
      const newData={firstName,lastName,location,profession,photo:uri,coverPhoto:uritwo,userId}
      const res=await axios.put('https://www.api.echospheree.site/updateUser',{newData})
      console.log(res);
      if(res?.status==='fail'){
        setErrMsg(res)
      }else{
        setErrMsg(res)
        // const newUser={token:res?.token,...res?.user}
        // dispatch(UserLogin(newUser))
        navigaion('/home')
        localStorage.removeItem("token")
        localStorage.setItem({"token":res.token})
        
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false)
    }
  }
  const handleSelect=(e)=>{
    setPicture(e.target.files[0])
  }
  const handleSelectTwo=(e)=>{
    setCoverPic(e.target.files[0])
  }
  return (
    <>
    <TopBar/>
    <div className='w-full h-svh flex justify-center items-center bg-bgColor'>
      <div className='w-1/3 bg-primary p-2 rounded-lg'>
        <form className='w-full  p-1' onSubmit={handleSubmit(onSubmit)}>
          <h1>Edit Profile</h1>
        <TextInput  name="firstName" placeholder="First Name" label="First Name" type="text" styles='w-full rounded-full' labelStyle='ml-2' register={register("firstName",{required:'First Name Is Required!'})} error={errors.firstName?errors.firstName?.message:""} />
        <TextInput  name="lastName" placeholder="Last Name" label="Last Name" type="text" styles='w-full rounded-full' labelStyle='ml-2' register={register("lastName",{required:'LastName do no matcch!'})} error={errors.lastName?errors.lastName?.message:""} />
        <TextInput  name="profession" placeholder="Profession" label="Profession" type="text" styles='w-full rounded-full' labelStyle='ml-2' register={register("profession",{required:'profession Is Required!'})} error={errors.profession?errors.profession?.message:""}/>
        <TextInput  name="location" placeholder="Location" label="Location" type="text" styles='w-full rounded-full' labelStyle='ml-2' register={register("location",{required:'location do no match'})} error={errors.location?errors.location?.message:""}/>
        <div className='m-2 flex flex-col'>
        <label className='mt-2' >Profile Image</label>
        <input className='mt-2' type="file" name='photo'  id='imgUpload' onChange={(e)=>handleSelect(e)} accept='.jpg,.png,.jpeg'/>
        </div>
        <div className='m-2 flex flex-col'>
        <label className='mt-2' >Cover Image</label>
        <input className='mt-2' type="file" name='coverPhoto' id='imgUpload' onChange={(e)=>handleSelectTwo(e)} accept='.jpg,.png,.jpeg' />
        </div>
        {errMsg?.message&&(
          <span role='alert' className={`text-sm${errMsg?.status==='fail'?"text-[#f64949fe]":"text-[#2ba150fe]"} mt-0.5`}>{errMsg.message}</span>
        )}
        <div className='flex justify-end mb-2 mx-2'>
          {isSubmitting?(
            <Loading/>
          ):(
            <CustomeButton type='submit' titile='Save' containerStyle="bg-[#0444a4] text-xs text-white px-6 py-2 mt-4 rounded-full" />
          )}
        </div>
        </form>
      </div>

    </div>
    </>
  )
}

export default Editing