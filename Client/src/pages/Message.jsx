import React, { useEffect, useRef, useState } from "react";
import TopBarProfilwe from "../components/TopBarProfilwe";
import NoProfile from "../assets/ProfilePng.png";
import MessageUser from "../components/MessageUser";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import {io} from 'socket.io-client'
import { useNavigate } from "react-router-dom";

import MessageProfile from "../components/MessageProfile";


const Message = () => {
  const [conversation,setConversation]=useState([{
    "_id": {
      "$oid": "662638cf8d95b3e7c6b3f9f6"
    },
    "members": [
      "66229f707d40407b9c99fda6",
      "66229e3c7d40407b9c99fd88"
    ],
    "createdAt": {
      "$date": "2024-04-22T10:15:43.999Z"
    },
    "updatedAt": {
      "$date": "2024-04-22T10:15:43.999Z"
    },
    "__v": 0
  }])
  const [currentChat, setCurrentChat] = useState(null);
  const [chats,setChats]=useState()
  const [sendMessage, setSendMessage] = useState(null);
  const [onlineUsers,setOnlineUsers]=useState()
  const [receivedMessage, setReceivedMessage] = useState(null);
  const [messages,SetMessages]=useState([])
  const socket =useRef()
    const [user,setusers]=useState()
    const [search ,setSearch]=useState("")
    const [msgUser,setMsgUser]=useState()
    const id =localStorage.getItem('user')
    const navigate= useNavigate()

    const getUsers=async()=>{
        const userId=id
        try {
          const response = await axios.get(`http://localhost:3001/profilesection/${userId}`);
          setusers(response?.data?.data) 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }

useEffect(()=>{
getUsers()
},[])

      useEffect(()=>{
        getUsers()
        socket.current=io("http://localhost:3002")
        socket.current.emit('new-user-add',id)
        socket.current.on('get-users',(users)=>{
          setOnlineUsers(users)
        })
      },[])

  
  const Search= user?.friends.filter((u)=>{
    if(search===""){
        return u
    }else if(u.firstName?.toLowerCase().includes(search?.toLowerCase())||u.lastName?.toLowerCase().includes(search?.toLowerCase())){
        return u
    }else{
        return ""
    }
  })
  const token = localStorage.getItem("token");
  useEffect(()=>{
    if(token){
      return navigate('/message')
    }else{
      navigate('/')
    }
  },[])
  
  return (
    <>
      <TopBarProfilwe />
      <div className="w-full flex overflow-hidden" >
        <div
          className="w-1/3 bg-[#065AD8]"
          style={{ height: "91vh" }}
        >
          <div className="w-full flex justify-start mt-3 mx-4 items-center">
          <input
                className="w-80 rounded-full py-3 text-center placeholder-center"
                placeholder="Search"
                name="serarch"
                onChange={(e)=>setSearch(e.target.value)}
              />
              <div className="">
              <FaSearch className="mx-3 text-white " size={20}/>
              </div>
              </div>
              <div className="mt-6">
              {conversation?.map((i)=>(
          <div  className="w-full h-16 flex justify-around items-center mt-1 hover:bg-red-300 "  onClick={()=>{setCurrentChat(i)}}>
           <MessageProfile conversation={i}/>
            <div
              className="rounded-full w-4 h-4"
              style={{ backgroundColor: "orange" }}
            ></div>
          </div>
          ))}
          </div>
        </div>
        <div className="w-2/3 ">
          <div style={{ height: "80vh" }}>
            <MessageUser chat={currentChat}
          currentUser={id}
          setSendMessage={setSendMessage}
          messages={messages}
          setMessages={SetMessages}
          currentChat={currentChat}
          conversation={conversation}
          setConversation={setConversation}/>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
