import React from 'react'
import NoProfile from "../assets/ProfilePng.png";
const MessageUser = ({ chat, userData, messages, currentUser, newMessage, handleChange, handleSend, imageRef, scroll }) => {
  return (
    <>
    <div className="ChatBox-container bg-cardColor rounded-lg grid grid-rows-chatLayout">
      {chat ? (
        <>
          {/* chat-header */}
          <div className="chat-header px-4 pt-4">
            <div className="follower flex items-center">
              <img
                src={
                  userData?.profilePicture
                    ? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture
                    : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"
                }
                alt="Profile"
                className="followerImage w-12 h-12 rounded-full"
              />
              <div className="name text-sm ml-2">
                <span>{userData?.firstname} {userData?.lastname}</span>
              </div>
            </div>
            <hr className="w-11/12 border-gray-300 mt-4 mx-auto" />
          </div>

          {/* chat-body */}
          <div className="chat-body flex flex-col gap-2 p-6 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                ref={scroll}
                className={`message ${message.senderId === currentUser ? 'own' : ''} bg-buttonBg text-white px-4 py-3 rounded-lg max-w-72`}
              >
                <span>{message.text}</span>
                <span className="text-xs text-textColor self-end"></span>
              </div>
            ))}
          </div>

          {/* chat-sender */}
          <div className="chat-sender bg-white flex justify-between items-center p-2 rounded-lg">
            <div className="flex items-center justify-center bg-gray-300 rounded-full w-10 h-10 font-bold cursor-pointer" onClick={() => imageRef.current.click()}>
              +
            </div>
            {/* <InputEmoji
              value={newMessage}
              onChange={handleChange}
              className="flex-1 bg-gray-200 rounded-lg p-2 focus:outline-none"
            /> */}
            <div className="send-button bg-buttonBg text-white rounded-lg px-4 py-2 cursor-pointer" onClick={handleSend}>
              Send
            </div>
            <input type="file" name="" id="" className="hidden" ref={imageRef} />
          </div>
        </>
      ) : (
        <span className="chatbox-empty-message block text-center p-4">
          Tap on a chat to start a conversation...
        </span>
      )}
    </div>
  </>
  )
}

export default MessageUser