import React, { useContext } from 'react'
import { Data } from '../App'

const NavProfile = () => {
const {value,setValue}=useContext(Data)
  return (
<div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-bgColor'>
    <div className='flex flex-row justify-center md:justify-start max-w-screen-xl mx-auto'>
        <p className='text-ascent-1 text-ellipsis mx-3 text-sm md:text-base cursor-pointer hover:text-ascent-2' onClick={()=>setValue("post")}>Post</p>
        <p className='text-ascent-1 text-ellipsis mx-3 text-sm md:text-base cursor-pointer hover:text-ascent-2' onClick={()=>setValue("about")}>About</p>
        <p className='text-ascent-1 text-ellipsis mx-3 text-sm md:text-base cursor-pointer hover:text-ascent-2' onClick={()=>setValue("friends")}>Friends</p>
        <p className='text-ascent-1 text-ellipsis mx-3 text-sm md:text-base cursor-pointer hover:text-ascent-2' onClick={()=>setValue("photos")}>Photos</p>
        <p className='text-ascent-1 text-ellipsis mx-3 text-sm md:text-base cursor-pointer hover:text-ascent-2' onClick={()=>setValue("videos")}>Videos</p>
    </div>
</div>


  )
}

export default NavProfile