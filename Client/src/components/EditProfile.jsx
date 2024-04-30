import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux'
import TextInput from './TextInput';
import Loading from './Loading';
import CustomeButton from './CustomeButton';
import { updateProfile } from '../ReduX/userSlice';
import { useNavigate } from 'react-router-dom';
import TopBar from './TopBar';

const EditProfile = () => {
    const navigaion=useNavigate()
    const {user} =useSelector((state)=>state.user)
    const dispatch=useDispatch();
    const [errMsg,setErrMsg]=useState('')
    const [submit,setSubmit]=useState(false)
    const [image,setImage]=useState(null)
    const {
        register,
        handleSubmit,
        formState:{errors},
    }=useForm({
        mode:'onChange',
        defaultValues:{...user}
    });
    const onSubmit =async (data)=>{}
    const handleClose =()=>{
        dispatch(updateProfile(false))
        
    }
    const handleSelect =(e)=>{
        setImage(e.target.files[0])
    }
  return (
    <>
    <div className='flex z-50 inset-0 overflow-y-auto  items-center justify-center'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div className='flex inset-0 transition-opacity'>
                <div className='absolute inset-0 bg-[#000] opacity-70'></div>
            </div>
            <span className='hidden sm:inline-block sm:align-middle sm:h-screen '></span> &#8203
            <div className='inline-block align-bottom bg-primary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my8 sm:align-middle sm:max-w-lg sm:w-full' role='dialog' aria-modal='true' aria-labelledby='modal-headline'>
                <div className='flex justify-between px-6 pt-5 pb-2'>
                    <label htmlFor="name" className='block font-medium text-xl text-ascent-1 text-left'>Edit Profile</label>
                    <button className='text-ascent-1' onClick={handleClose}>
                        <MdClose size={22} />
                    </button>
                </div>
                <form className='px-4 sm:px-6 flex flex-col gap-3 2xl:gap-6' onSubmit={handleSubmit(onSubmit)}>
                <TextInput  name='firstName' styles="w-full rounded-full py-3" placeholder={user.firstName}
    register={register('firstName',{
      required:"FirstName can not  be empty",
    })}
    error={errors.firstName? errors.firstName.message:''} />

<TextInput  name='lastName' styles="w-full rounded-full py-3" placeholder={user?.lastName}
    register={register('lastName',{
      required:"lastName can not  be empty",
    })}
    error={errors.lastName? errors.lastName.lastName:''} />

        <TextInput  profession='' styles="w-full rounded-full py-3" placeholder="Profession"
    register={register('profession',{
      required:"professiion can not  be empty",
    })}
    error={errors.profession? errors.profession.message:''} />

        <TextInput  name='location' styles="w-full rounded-full py-3" placeholder="location"
    register={register('location',{
      required:"location can not  be empty",
    })}
    error={errors.location? errors.location.message:''} />

    <label htmlFor="imgUpload" className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'>
        <input type="file" className='' id="imgUpload" onChange={(e)=>handleSelect(e)} accept='.jpg,.png,.jpeg' />
        
    </label>
    {errMsg?.message&&(
        <span role='alert' className={`text-sm ${errMsg?.status ==='fail'? "text-[#f64949fe]":"text-[#2ba150fe]"}mt-0.5`}>{errMsg?.message}</span>
    )}
    <div className='py-5 sm:flex sm:flex-row-reverse border-t border-[#66666645]'>
        {submit?(
            <Loading/>
        ):(
            <CustomeButton
            type='Submit'
            containerStyle={`inline-flex justify-centern rounded-md bg-blue px-8 py-3 text-sm font-medium text-white outline-none`} titile="Submit"
            />
        )}
    </div>
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default EditProfile