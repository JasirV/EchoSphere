import React, { useEffect, useRef, useState } from 'react'
import NoProfile from "../assets/ProfilePng.png";
import axios from 'axios';
import '../assets/messageUser.css'
import { TiAttachmentOutline } from "react-icons/ti";
import { BsFillSendFill } from "react-icons/bs";
import {io} from "socket.io-client"
const MessageUser = ({ chat, currentUser ,currentChat,conversation,setConversation}) => {
  const [arrivalmessage,setArrivalMessage]=useState(null)
  const [messages,setMessages]=useState([])
  const[messagess,setMessagess]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [newMessage,setnewMessage]=useState()
  const [onlineUsers,setOnlineUsers]=useState()
  const id =localStorage.getItem('user')
  const [user,setusers]=useState()
  const firendsId = currentChat?.members?.find(m => m !== id);
  const getUsers=async()=>{
    try { 
      const response = await axios.post(`http://localhost:3001/messageUser`,{firendsId});
      setusers(response?.data?.data) 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
useEffect(()=>{
getUsers()
},[firendsId])
  const socket = useRef();
  const handleChange=(e)=>{
    setnewMessage(e.target.value)
  }
  const handleSend = async(e)=>{
    e.preventDefault();
    const message = {
      sender : id,
      text : newMessage,
      conversationId : currentChat?._id,
    };
    
  const receiverId = currentChat.members?.find(member=> member !==id)
  console.log(receiverId,'revicerId');
  console.log(id,'this user Id'); 
  console.log(currentChat?.member,'this currentChat mebers Id'); 
    socket.current.emit("sendMessage",{
      sender: id,
      receiverId,
      text: newMessage,
    })
    try {
      const data=await axios.post('http://localhost:3001/message',{message});
      setMessages([...messages,data?.data])
      setnewMessage("")
      
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    const getConversaton = async ()=>{
      try{
       const res = await axios.get(`http://localhost:3001/chat/${id}`)
       setConversation(res.data)
      }catch(error){
      console.log(error);
      }
    }
    getConversaton()
  },[id])
  // useEffect(() => {
  //   const getConversation = async () => {
  //       const data = {
  //         senderId: id,
  //         receiverId: currentChat?._id}
  //       try {
  //         const res = await axios.post('http://localhost:3001/chat/', data);
  //         setConversation(res.data);
  //       } catch (error) {
  //         console.log('Error fetching conversation:', error);
  //       }
  //   };
  //   getConversation();
  // }, [id,currentChat]);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const  data  = await axios.get(`http://localhost:3001/message/${id}`);
        setMessages(data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();

  }, [chat]);

  useEffect(()=>{
    socket.current = io("http://localhost:3002/");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.sender,
        text: data.text,
        createdAt: Date.now(),
      });
    })});
  
  console.log(arrivalmessage,'arra');

  useEffect(() => {
    if (arrivalmessage && currentChat?.members.includes(arrivalmessage.sender)) {
      setMessages((prevMessages) => [...prevMessages, arrivalmessage]);
    }else{
      console.log('faile');
    }
  }, [arrivalmessage, currentChat]);
  const receiverId = currentChat?.members?.find(member=> member !==id)
   useEffect(()=>{
    socket.current.emit("addUser",receiverId);//revice id
    socket.current.on("getUsers",users=>{
      setOnlineUsers(users)
    })
  },[receiverId]);
  return (
    <>
    <div className="ChatBox-container rounded-lg grid grid-rows-chatLayout">
      {chat ? (
        <>
          {/* chat-header */}
          <div className="chat-header px-4 pt-4">
            <div className="follower flex items-center">
              <img
                src={
                  user?.photo||NoProfile
                }
                alt="Profile"
                className="followerImage w-12 h-12 rounded-full"
              />
              <div className="name text-sm mx-3">
                <span>{user?.firstName} {user?.lastName}</span>
              </div>
            </div>
            <hr className="w-11/12 border-gray-300 mt-4 mx-auto" />
          </div>

          {/* chat-body */}
          <div className="chat-body scroll-m-0" style={{height:'500px', maxHeight: '500px', overflowY: 'auto' }}>
      {messages?.map((message, index) => (
    <div 
      key={index || message.sender}
      className={`message ${message.sender === currentUser ? 'message own' : 'message'} text-white px-4 py-3 rounded-lg max-w-72`}
    >
      <span>{message.text}</span>
      <span className="text-xs text-textColor self-end"></span>
    </div>
  ))}
</div>

          {/* CHatscrion */}
          <div className="chat-sender h-20 border-ascent-2 flex justify-between items-center rounded-full overflow-hidden mx-2 ">
            <div className="w-24 h-14 mx-5 rounded-3xl bg-[#D9D9D9] flex justify-center items-center">
              <>
                <button
                  className=""
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  <TiAttachmentOutline size={25} />
                </button>
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Something Rong
                            </h3>
                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>
                          {/*body*/}
                          <div className="relative p-6 flex-auto">
                            <p className="my-4 text-blueGray-500 text-lg leading-relaxed">
                              Currently, we are testing certain functionalities,
                              and unfortunately, the processing is temporarily
                              unavailable. This is part of our testing phase to
                              ensure optimal performance and reliability. We
                              appreciate your patience as our technical team
                              works to resolve this issue
                            </p>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </>
            </div>
            <div className="w-4/5">
              <input
                placeholder="Whats on your mind..."
                name="Type"
                type="text"
                className="w-full rounded-full py-5 p-7"
                onChange={handleChange}
                value={newMessage}
              />
            </div>
            <div className="w-24 h-14 mx-5 rounded-3xl bg-[#D9D9D9] flex justify-center items-center">
              <BsFillSendFill size={22} onClick={handleSend} />
            </div>
          </div>

        </>
      ) : (
        <span className="block text-center p-4">
          Tap on a chat to start a conversation...
        </span>
      )}
    </div>
  </>
  )
}

export default MessageUser