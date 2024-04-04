import React from 'react'

const NavProfile = () => {

  return (
    <div>
        <div className='topbar w-full flex items-center justify-between py-3 md:py-6 px-4 bg-bgColor '>
            <div className='flex flex-row m-1 mx-72' >
                <p className='text-ascent-1 text-ellipsis font-bold mx-3'>Post</p>
                <p className='text-ascent-1 text-ellipsis mx-3'>About</p>
                <p className='text-ascent-1 text-ellipsis mx-3'>Friends</p>
                <p className='text-ascent-1 text-ellipsis mx-3 '>Photos</p>
                <p className='text-ascent-1 text-ellipsis mx-3' >Videos</p>
            </div>
        </div>
    </div>
  )
}

export default NavProfile