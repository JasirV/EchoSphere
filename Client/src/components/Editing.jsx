import React from 'react'
import TextInput from './TextInput'
import CustomeButton from './CustomeButton'

const Editing = () => {
  return (
    <div className='w-full h-svh flex justify-center items-center bg-bgColor'>
      <div className='w-1/3 bg-primary p-2 rounded-lg'>
        <form className='w-full  p-1' action="">
          <h1>Edit Profile</h1>
        <TextInput  name="firstName" placeholder="First Name" label="First Name" type="text" styles='w-full rounded-full' labelStyle='ml-2'/>
        <TextInput  name="lastName" placeholder="Last Name" label="Last Name" type="text" styles='w-full rounded-full' labelStyle='ml-2'/>
        <TextInput  name="profession" placeholder="Profession" label="Profession" type="text" styles='w-full rounded-full' labelStyle='ml-2'/>
        <TextInput  name="location" placeholder="Location" label="Location" type="text" styles='w-full rounded-full' labelStyle='ml-2'/>
        <div className='m-2 flex flex-col'>
        <label className='mt-2' >Profile Image</label>
        <input className='mt-2' type="file" name='photo' />
        </div>
        <div className='m-2 flex flex-col'>
        <label className='mt-2' >Cover Image</label>
        <input className='mt-2' type="file" name='coverPhoto' />
        </div>
        <div className='flex justify-end mb-2 mx-2'>
        <CustomeButton titile='Save' containerStyle="bg-[#0444a4] text-xs text-white px-6 py-2 mt-4 rounded-full" />
        </div>
        </form>
      </div>

    </div>
  )
}

export default Editing