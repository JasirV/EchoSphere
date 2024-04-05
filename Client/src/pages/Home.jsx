import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TopBar from '../components/TopBar'
import ProfileCard from '../components/ProfileCard'
import FriendsCard from '../components/FriendsCard'
import { posts, requests, user } from '../components/data'
import { Link } from 'react-router-dom'
import NoProfile from '../assets/ProfilePng.png'
import CustomeButton from '../components/CustomeButton'
import { BsFiletypeGif, BsPersonFillAdd, BsPostcard } from 'react-icons/bs'
import { BiImages, BiSolidVideo } from 'react-icons/bi'
import TextInput from '../components/TextInput'
import { useForm } from 'react-hook-form'
import Loading from '../components/Loading'
import PostCard from '../components/PostCard'
import Story from '../components/Story'
import TopBarProfilwe from '../components/TopBarProfilwe'
import Profile from './Profile'
import axios from 'axios'

const Home = () => {
  //useSelector((state)=>state.user)
  const id=localStorage.getItem('user')
  const [users, setusers] = useState(id)
  const [errMsg, setErrMsg] = useState('')
  const [friendRequest, setFriendRequest] = useState(requests)
  const [file, setFile] = useState(null);
  const [posting, setPosting] = useState(false)
  const [loading, setloading] = useState(false)
  const [suggestion,setSuggestion]=useState(requests)
  const { register, formState: { errors } } = useForm()
  const handlePosrSubmit = async (data) => { }
  useEffect(() => {
    const profilesection = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/profilesection/${id}`);
        setusers(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    const Suggestion = async () => {
      const res = await axios.post(`http://localhost:3001/suggestFriends`, { id });
      setSuggestion(res.data.data);
    };
  
    const getrequst = async () => {
      const res = await axios.get(`http://localhost:3001/getRequeset/${id}`);
      setFriendRequest(res.data.data);
    };
    getrequst();
    Suggestion();
    profilesection();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const onSubmit = async (data) => {
    
    const formData = new FormData();
formData.append('description',data.description);
if (file) {
  formData.append('file', file);
}
console.log(formData,"ygwdhgw");
    try {
      setPosting(true);
      const response = await axios.post('http://localhost:3001/post/createPost',{id}, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Data uploaded successfully:', response.data);
      setPosting(false);
      setFile(null);
    } catch (error) {
      console.error('Error uploading data:', error);
      setPosting(false);
    }
  };

  
  return (
    <>
    <div className='home w-full px- lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden'>
      <TopBar />
      <div className='w-full flex gap-2 lg:gap-4 pt-5 pb-10 h-full'>
        {/* LIFT */}
        <div className='hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto'>
          <ProfileCard user={users} />
          <FriendsCard friends={users?.friends} />
        </div>
        {/* CENTER */}
        <div className='flex-1 h-full  px-4 flex flex-col gap-6 overflow-y-auto rounded-lg'>
          <Story posts={posts} />
          <form onSubmit={(e) => {
    e.preventDefault(); // Prevent default form submission
    onSubmit({ description: e.target.description.value }); // Pass description value to onSubmit
}} className='bg-primary px-4 rounded-lg'>
            <div className='w-full flex item-center gap-2 py-4 border-b border-[#66666645]'>
              <img src={user?.profileUrl ?? NoProfile} alt='UserImage' className='w-14 h-14 rounded-full object-cover' />
               <TextInput
            styles='w-full rounded-full py-5'
            placeholder='Whats on your mind...'
            name="description"
            register={register('description', { required: "Write something about the post." })}
            error={errors.description ? errors.description.message : ""}
        />

            </div>
            {errMsg?.message && (
              <span role='alert' className={`text-sm ${errMsg?.status === 'fail' ? "text-[#f64949fe]" : "text-[#2ba150fe]"}mt-0.5`}>
                {errMsg?.message}
              </span>
            )}
            <div className='flex items-center justify-between py-4'>
              <label htmlFor="imageUpload" className='flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer'>
                <BiImages />
                <span>Image</span>
                <input
                  type="file"
                  id="imageUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                  className='hidden'
                  data-max-size='5120'
                  accept='.jpg,.png,.jpeg'
                />
              </label>

              <label htmlFor="videoUpload" className='flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer'>
                <BiSolidVideo />
                <span>Video</span>
                <input
                  type="file"
                  id="videoUpload"
                  onChange={(e) => setFile(e.target.files[0])}
                  className='hidden'
                  data-max-size='5120'
                  accept='.mp4,.wav'
                />
              </label>
              <label htmlFor="vgifUpload" className='flex items-center gap-1 text-base text-ascent-2 text-ascent-1 cursor-pointer'>
                <BsFiletypeGif />
                <span>Gif </span>
                <input type="file" id="vgifUpload" onChange={(e) => setFile(e.target.files[0])} className='hidden' data-max-size='5120' accept='.gif' />
              </label>
              <div>{posting ? (
                <Loading />
              ) : (<CustomeButton type='submit' titile='post' containerStyle='bg-[#0444a4] text-white py-1 px-6 rounded-full font-semibold text-sm' />)}</div>
            </div>
          </form>
          {loading ? (<Loading />) : posts?.length > 0 ? (
            posts?.map((post) => (
              <PostCard key={post?._id} post={post}
                user={user}
                deletePost={() => { }}
                likePost={() => { }} />
            ))
          ) : (
            <div className='flex w-full item-center justify-center'>
              <p className='text-lg text-ascent-2'>No Post Available</p></div>
          )}
        </div>
        {/* RIGHT */}
        <div className='hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto'>
          {/* FRIEND REQUEST */}
          <div className='w-full bg-primary shadow-sm rounded-lg px-6 py-5'>
            <div className='flex item-center jstify-between text-xl text-ascente-1 pb-2 border-b border-[#66666645]'>
              <span>Friend Request</span>
              <span className='mx-3'>{friendRequest?.length}</span>
            </div>
            <div className='w-full flex flex-col gap-4 pt-4'>
              {friendRequest?.map((i) => (
                <div key={i._id} className='flex item-center justify-between'>
                  <Link to={`profile ${i.requestFrom._id}`} className='w-full flex gap-4 item-center cursor-pointer'>
                    <img src={i?.requestFrom?.profileUrl ?? NoProfile} alt={i.requestFrom?.firstName} className='w-10 h-10 object-cover rounded-full' />
                    <div className='flex-1'>
                      <p className='text-base font-medium text-ascent-1'>
                        {i?.requestFrom?.firstName}{i?.requestFrom?.lastName}
                      </p>
                      <span className='text-sm text-ascent-2'>
                        {i.requestFrom?.profession ?? "No Profession"}
                      </span>

                    </div>
                  </Link>
                  <div className='h-6 flex gap-1'>
                    <CustomeButton titile='Accept' containerStyle="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full" />
                    <CustomeButton titile='Deny ' containerStyle="border border -[#66] text-xs text-ascent-1 px-1.5 py-1 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* SUGGESTED FRIENDS */}
          <div className='w-full bg-primary shadow-sm rounded-lg px-5 py-5'>
            <div className='flex items-center justuify-between tex-lg text-ascent-1 border-b border-[#66666645]'>
              <span>Friend Suggestion</span>
            </div>
            <div className='w-full flex flex-col gap-4 pt-4'>
              {suggestion.map((i) => (
                <div className=' flex items-center justify-between' key={i._id}>
                  <Link to={`/profile/${i._id}`} key={i._id} className='w-full flex gap-4 items-center cursor-pointer'>
                    <img src={i?.profileUrl ?? NoProfile} alt={i.firstName} className='w-10 h-10 object-cover rounded-full' />
                    <div className='flex-1'>
                      <p className='text-base font-medium text-ascent-1'>
                        {i?.firstName}{i?.lastName}
                      </p>
                      <span className='text-sm text-ascent-2'>
                        {i?.profession ?? "No Profession"}
                      </span>
                    </div>
                  </Link>
                  <div className='flex gap-1'>
                    <button className='bg-[#0444a430] text-sm text-white p-1 rounded' onClick={() => { }}>
                      <BsPersonFillAdd size={20} className='text-[#0f52b6]' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home