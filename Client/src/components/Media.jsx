import React, { useEffect, useState } from 'react'
import axios from 'axios'
const Media = ({userId}) => {
    const [post,setPost]=useState()
    const fetchpost =async ()=>{
        try {
            const res=await axios.get(`https://www.api.echospheree.site/usergetpost/${userId}`)
            setPost(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchpost()
    },[])

  return (
    <div className='w-full bg-bgColor flex justify-center'>
        <div className=' w-1/2 rounded bg-primary'>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 ">
            {post?.map((i, index) => (
                 <div key={index} className="bg-white rounded-md p-1 border" style={{borderColor:'#c7c5d9'}}>
                 <img src={i.image} alt="Post" className="w-full h-auto rounded-md mb-2" />
             </div>
            ))}
        </div>
        </div>
    </div>
  )
}

export default Media