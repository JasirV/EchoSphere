import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import TopBar from '../components/TopBar';
import TopBarProfilwe from '../components/TopBarProfilwe';
import BgImage from '../assets/social-media-cropped.png';
import CustomeButton from '../components/CustomeButton';
import NavProfile from '../components/NavProfile';
import ProfilePost from '../components/ProfilePost';
const Profile = () => {
  // const {id} =useParams();
  const dispatch =useDispatch()
  const {user}=useSelector((state)=>state.user);
  const [userInfo,setUserInfo]=useState(null)
  // const {posts} =useSelector((state)=>state.posts);
  const [loading,setLoading]=useState(false)
  const [shortImg,setShortImg]=useState([1,2,3,4])
  return (
    <>
      <TopBarProfilwe  />
    <div className='home px- lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg align-center flex justify-center flex-col' >
      <img src={BgImage} alt="" className='object-cover h-96 w-full rounded-lg'/>
      <div className='flex flex-row justify-between' >
      <div className='bg-white mx-16 h-40 w-40 relative bottom-10 rounded-full flex justify-center items-center '>
        <img src={BgImage} alt="" className='w-36 h-36 rounded-full' />
        </div>
        <div className='relative right-80 top-3'>
        <p className='text-lg text-ascent-1' >userName</p>
        <p className='text- text-ascent-2 mx-2'>8 friends</p>
        <div className='flex relative '>
        {shortImg.map((index, i) => (
  <div key={`${index}-${i}`} className={`bg-white h-7 w-7 rounded-full flex justify-center items-center relative right-${index - 2}`}>
    <img src={BgImage} alt="" className='w-6 h-6 rounded-full'/>
  </div>
))}
        </div>
        </div>
      <div className='relative top-10'> 
      <CustomeButton type='Add to story' titile='Add to story' containerStyle='bg-[#0444a4] text-white py-1 px-4 rounded-full font-semibold text-l  '/> 
      <CustomeButton type='Add to story' titile='Edit Profile' containerStyle='bg-[#FFFFFF] text-black py-1 px-4 rounded-full font-semibold text-l mx-1 '/> 
      </div>
      </div>
    </div>
    <NavProfile />
    <ProfilePost />
    </>
  )
}

export default Profile