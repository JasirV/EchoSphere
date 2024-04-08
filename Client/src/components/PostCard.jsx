import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import NoProfile from '../assets/ProfilePng.png'
import moment from 'moment'
import { BiSolidLike, BiLike, BiComment } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';
import {useForm} from 'react-hook-form'
import TextInput from './TextInput';
import CustomeButton from './CustomeButton'
import Loading from './Loading'
import { postComments, posts } from './data';
import axios from 'axios'

const getPostComments=async(id) =>{
try {
  const res=await axios.get(`http://localhost:3001/post/comments/${id}`)
  return res?.data
} catch (error) {
  console.log(error);
}
}

const CommentForm=({user,id,replayAt,getComments})=>{
  const [loading,setLoading]=useState(false)
  const [errMsg,setErrMsg]=useState("")
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  }=useForm({
    mode:"onChange",
  });
  const onSubmit= async (data)=>{
    setLoading(true)
    setErrMsg("");
    try {
      const URL =!replayAt?"/post/comment/"+id:"/post/replayComment"+id
      const newData={comment:data?.comment,
      from:`${user?.firstName}   ${user?.lastName}`,
      replayAt:replayAt};

      const res=await axios.post(`http://localhost:3001/${URL}`,{newData})
      console.log(res);
    } catch (error) {
      
    }
  }
  return  (<form className='w-full border-b border-[#66666645] '  onSubmit={handleSubmit(onSubmit)}>
  <div className='w-full flex items-center gap-2 py-4'>
    <img src={user?.profileUrl?? NoProfile} alt='UserImage' className='w-10 h-10 rounded-full object-cover' />
    <TextInput  name='comment' styles="w-full rounded-full py-3" placeholder={replayAt?`Replay @${replayAt}`:"Comment this Post"}
    register={register('comment',{
      required:"Comment can not  be empty",
    })}
    error={errors.comments? errors.comments.message:''} />
  </div>
  {errMsg?.message &&(
    <span role='alert' className={`text-sm${errMsg?.status ==="fail" ?"text-[#f64949fe]":"text-[#2ba150fe]"} mt-0.5`}>
      {errMsg?.message}
    </span>
  )}
  <div className='flex items-end justify-end pb-2'>
    {loading?(
      <Loading />
    ):(
      <CustomeButton titile="Submit" type="submit" containerStyle='bg-[#0444a4] text-white py-1 px-3 rounded-full font-semibold text-sm'/>
    )}
  </div>
  </form>
  )
}
const ReplayCard = ({reply,user,handleLike}) => {
  return (
    <div className='w-full py-3 '>
        <div className='flex gap-3 items-center mb-1'>
            <Link to={`/profile/${reply?.userId?._id}`}>
                <img src={reply?.userId?.profileUrl ??NoProfile} alt={reply?.userId?.firstName} className='w-10 h-10 rounded-full object-cover' />
            </Link>
            <div>
                <Link to={`/profile/${reply?.userId?._id}`}>
                    <p className='font-medium text-base text-ascent-1'>
                        {reply?.userId?.firstName}{reply?.userId?.lastName}
                    </p>
                </Link>
                <span className='text-ascent-2 text-sm'>
                    {moment(reply?.createdAt ?? "2024-05-27").fromNow()}
                </span>
            </div>
        </div>
        <div className='ml-12'>
          <p className='text-ascent-2'>{reply?.comment}</p>
          <div className='mt-2 flex gap-6'>
            <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer' onClick={handleLike}>
              {reply?.likes?.includes(user?._id)?(
                <BiSolidLike size={20} color='blue' />
              ):(
                <BiLike size={20} /> 
               )}
               {reply?.likes?.length} Likes
            </p>
          </div>
        </div>
    </div>
  )
}
const PostCard = ({post,user,deletePost,likePost}) => {
    const [showAll,setShowAll]=useState(0)
    const [showReplay,setShowReplay]=useState(0);
    const [comments,setComments]=useState([])
    const [loading,setLoading]=useState(false);
    const [replayComments,setReplayComments]=useState(0);
    const [showComments,setShowComments]=useState(0)
const getComments = async (id) => {
  setReplayComments(0)
  const result=await getPostComments(id)
  setComments(result)
  setLoading(false)
}
const handleLike =async(uri)=>{
  await likePost(uri)
  await getComments(post?._id)
}
  return (
    <div className='mb-2 bg-primary p-4 rounded-xl'>
        <div className='flex gap-3 items-center mb-2'>
            <Link to={`/profile/${post?.userId?._id}`}>
                <img src={post?.userId?.profileUrl??NoProfile} alt={post?.userId?.firstName} className='w-14 h-14 object-cover rounded-full' />
            </Link>
            <div className='w-full flex justify-between'>
              <div className=''>
                <Link to={`/profile/${post?.userId?._id}`}>
                  <p className='font-medium text-lg text-ascent-1'>
                    {post?.userId?.firstName} {post?.userId?.lastName}
                  </p>
                </Link>
                <span className='text-ascent-2'>{post?.userId?.lastName}</span>
              </div>
              <span className='text-ascent-2'>{moment(post?.createAt ?? "2024-03-27").fromNow()}</span>
            </div>
        </div>
        <div>
          <p className='text-ascent-2'>
          {showAll === post?._id ? post.description : (post?.description.slice(0, 300) || post?.description)}
          {post?.description?.length> 301 && (showAll === post?._id ?(<span className='text-blue ml-2 font-mediu cursor-pointer' onClick={()=>setShowAll(0)}>Show Lees</span>):(<span className='text-blue ml-2 font-medium cursor-pointer' onClick={()=>setShowAll(post?._id)}>Show More</span>))}
          </p>
          {post?.image&&(
          <img src={post?.image} alt='postImage' className='w-full mt-2 rounded-lg' />
          )}
        </div>
        <div className='mt-4 flex justify-between item-center px-3 py-2 text-ascent-2 text-base border-t border-[#66666645]'>
          <p className='flex gap-2 item-center text-base cursor-pointer'
          onClick={()=>handleLike('/post/like/'+post._id)}>
            {post?.likes?.includes(user)?(
              <BiSolidLike size={20} color='blue' />
            ):(
              <BiLike size={20} />
            )}
            {post?.likes?.length} Likes
          </p>
          <p className='flex gap-2 item-center text-base cursor-pointer' onClick={()=>{setShowComments(showComments ===post._id?null:post._id);
          getComments(post?._id)}}>
            <BiComment size={20} />
            {post?.comments?.length}Comments
          </p>
          {
            user?._id===post?.userId?._id && 
            <div className='flex gap-1 items-center text-base text-ascent-1 cursor-pointer' onClick={()=>deletePost(post?._id)}>
              <MdDeleteOutline size={20} />
              <span>Delete</span>
            </div>
          }
        </div>

        {/* COMMENTS */}
        {showComments === post?._id && (
          <div className='w-full mt-4 border-t border-[#66666646]'>
            <CommentForm 
            user={user}
            id={post?._id}
            getComments={()=>getComments(post?._id) }/>
            {loading?(<Loading />):(
              comments?.length>0?(
                comments?.map((c)=>(
                <div className='w-full py-2' key={c._id}>
                  <div className='flex gap-2 items-center mb-1'>
                    <Link to={`/profile/${c?.userId}._id`}>
                      <img src={c?.userId?.profileUrl??NoProfile} alt={c?.userId?.firstName} className='w-10 h-10 rounded-full object-cover' />
                    </Link>
                  <div>
                    <Link to={`/profile/${c?.userId?._id}`}>
                      <p className='font-medium text-base text-ascent-1'>
                        {c?.userId?.firstName}{c?.userId?.lastName}
                      </p>
                    </Link>
                    <span className='text-ascent-2 text-sm'>
                      {moment(c?.createAt??"2024-03-27").fromNow()}
                    </span>
                  </div>
                  </div>
                  <div className='ml-12'>
                    <p className='text-ascent-2'>{c?.comment}</p>
                    <div className='mt-2 flex gap-6'>
                      <p className='flex gap-2 items-center text-base text-ascent-2 cursor-pointer'>{c?.likes?.includes(user?._id)?(
                        <BiSolidLike size={20} color='blue'/>
                      ):(
                        <BiLike size={20} />
                      )}
                      {c?.likes?.length} Likes</p>
                      <span className='text-blue cursor-pointer' onClick={()=>setReplayComments(c?._id)}>
                        Reply
                      </span>
                    </div>
                    {replayComments ===c?._id&&(
                      <CommentForm user={user} id={c?._id} replayAt={c?.form} getComments={()=>getComments(post?._id)} />
                    )}
                  </div>
                  {/* REPLIES */}
                  <div className='py-2 px-8 mt-6'>
                    {c?.replies?.length >0 &&(
                      <p className='text-base text-ascent-1 cursor-pointer' onClick={()=>setShowReplay(showReplay === c?.replies?._id ?0 :c?.replies?.length)}>Show Replies({c?.replies?.length})</p>
                    )}
                    {
                      showReplay === c?.replies?._id &&
                      c?.replies?.map((reply)=>(
                        <ReplayCard reply={reply} user={user} key={reply?._id} handleLike={()=>handleLike(`/posts/like-comment/${c?._id}/${reply?._id}`)} />
                      ))
                    }
                  </div>

                </div>))
              ):(
                <span className='flex text-sm py-4 text-ascent-2 text-center'>
                  No Comments ,be first to comment
                </span>
              )
            )}
          </div>
        )}
    </div>
    
  )
}

export default PostCard