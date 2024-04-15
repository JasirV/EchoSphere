import React, { useContext, useState } from 'react'
import TopBarProfilwe from '../components/TopBarProfilwe';
import BgImage from '../assets/social-media-cropped.png';
import CustomeButton from '../components/CustomeButton';
import NavProfile from '../components/NavProfile';
import ProfilePost from '../components/ProfilePost';
import { Data } from '../App';
import About from '../components/About';
import Friends from '../components/Friends';
import Media from '../components/Media';
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  // const {id} =useParams();
  // const {posts} =useSelector((state)=>state.posts);
  const [shortImg,setShortImg]=useState([1,2,3,4])
  const {value}=useContext(Data)
  const navigate=useNavigate()


  return (
    <>
      <TopBarProfilwe  />
      <div className='home px-4 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg align-center flex justify-center flex-col'>
    {/* Cover Photo */}
    <img src={BgImage} alt="" className='object-cover h-96 w-full rounded-lg' />

    {/* Profile Section */}
    <div className='flex flex-col lg:flex-row items-center justify-between mt-4 lg:mt-0'>
        {/* Profile Image */}
        <div className='bg-white mx-4 sm:mx-16 mb-8 sm:mb-0 h-40 w-40 sm:w-36 sm:h-36 relative bottom-0 sm:bottom-10 rounded-full flex justify-center items-center'>
            <img src={BgImage} alt="" className='w-36 h-36 rounded-full lg:border-4 border-white' />
        </div>

        {/* Username Section */}
        <div className='flex items-center justify-center lg:justify-start lg:relative lg:right-80 lg:top-3'>
            <div className='text-center lg:text-left'>
                <p className='text-lg text-ascent-1'>Username</p>
                <p className='text-ascent-2'>8 friends</p>
                <div className='flex mt-2'>
                    {/* Displaying shortImg array items  */}
                    {shortImg.map((index, i) => (
                        <div key={`${index}-${i}`} className={`bg-white h-7 w-7 rounded-full flex justify-center items-center relative right-${index - 2}`}>
                            <img src={BgImage} alt="" className='w-6 h-6 rounded-full' />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>

    {/* Buttons Section */}
    <div className='flex justify-center lg:justify-start mt-4' style={{ marginLeft: '10vw', marginRight: '10vw' }}>
    <CustomeButton type='Add to story' titile='Add to story' containerStyle='bg-[#0444a4] text-white py-1 px-4 rounded-full font-semibold text-l  '/> 
      <CustomeButton type='Edit Profile' onClick={()=>navigate('/ProfileEditing')} titile='Edit Profile' containerStyle='bg-[#FFFFFF] text-black py-1 px-4 rounded-full font-semibold text-l mx-1 '/> 
</div>
    </div>
    <NavProfile />
    {value==='post'?<ProfilePost />:value==="about"?<About/>:value==="friends"?<Friends/>:<Media/>}
    </>
  )
}

export default Profile