import React, { useEffect, useState } from 'react'
import NoProfile from "../assets/ProfilePng.png";
import axios from 'axios';
import '../assets/messageUser.css'
const MessageUser = ({ chat, currentUser, setSendMessage,  receivedMessage,messages,setMessages }) => {
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3001/message/${chat._id}`);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);
console.log(messages);
  
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
                  chat?.photo
                }
                alt="Profile"
                className="followerImage w-12 h-12 rounded-full"
              />
              <div className="name text-sm mx-3">
                <span>{chat?.firstName} {chat?.lastName}</span>
              </div>
            </div>
            <hr className="w-11/12 border-gray-300 mt-4 mx-auto" />
          </div>

          {/* chat-body */}
          <div className="chat-body ">
            {messages?.map((message, index) => (
              <div
                key={index}
                className={`message ${message.senderId === currentUser ? 'message own' : 'message'}  text-white px-4 py-3 rounded-lg max-w-72`}
              >
                <span>{message.text} hai</span>
                <span className="text-xs text-textColor self-end"></span>
              </div>
            ))}
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