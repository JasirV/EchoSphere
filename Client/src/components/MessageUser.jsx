import React, { useEffect, useState } from 'react'
import NoProfile from "../assets/ProfilePng.png";
import axios from 'axios';
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

  
  return (
    <>
    <div className="rounded-lg grid grid-rows-chatLayout">
      {chat ? (
        <>
          {/* chat-header */}
          <div className=" px-4 pt-4">
            <div className=" flex items-center">
              <img
                src={
                  chat?.photo
                }
                alt="Profile"
                className=" w-12 h-12 rounded-full"
              />
              <div className="text-sm mx-3">
                <span>{chat?.firstName} {chat?.lastName}</span>
              </div>
            </div>
            <hr className="w-11/12 border-gray-300 mt-4 mx-auto" />
          </div>

          {/* chat-body */}
          <div className=" flex flex-col gap-2 p-6 overflow-y-auto">
            {messages?.map((message, index) => (
              <div
                key={index}
                className={`message ${message.senderId === currentUser ? 'own' : ''}  text-white px-4 py-3 rounded-lg max-w-72`}
              >
                <span>{message.text}</span>
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