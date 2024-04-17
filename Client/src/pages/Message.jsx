import React, { useEffect, useState } from "react";
import TopBarProfilwe from "../components/TopBarProfilwe";
import NoProfile from "../assets/ProfilePng.png";
import MessageUser from "../components/MessageUser";
import TextInput from "../components/TextInput";
import { TiAttachmentOutline } from "react-icons/ti";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
const Message = () => {
    const [user,setusers]=useState()
    const [search ,setSearch]=useState("")
    const [msgUser,setMsgUser]=useState()
    const id =localStorage.getItem('user')
    const getUsers=async()=>{
        const userId=id
        try {
          const response = await axios.get(`http://localhost:3001/profilesection/${userId}`);
          setusers(response.data.data) 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      useEffect(()=>{
        getUsers()
      },[])

  const [showModal, setShowModal] = useState(false);
  const Search= user?.friends.filter((u)=>{
    if(search===""){
        return u
    }else if(u.firstName?.toLowerCase().includes(search?.toLowerCase())||u.lastName?.toLowerCase().includes(search?.toLowerCase())){
        return u
    }else{
        return ""
    }
  })
  console.log(Search);
  return (
    <>
      <TopBarProfilwe />
      <div className="w-full flex overflow-hidden" >
        <div
          className="w-1/3 bg-[#065AD8]"
          style={{  height: "91vh" }}
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
              {Search?.map((i)=>(
          <div className="w-full h-16 flex justify-around items-center mt-1 hover:bg-red-300 "  onClick={()=>setMsgUser(i?._id)}>
            <img className="w-14 h-14 rounded-full" src={i.photo||NoProfile} alt="" />
            <p className="text-ascent-1 text-lg text-white ">{i.firstName}</p>
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
            <MessageUser msg={msgUser}/>
            <div></div>
          </div>
          <div className="h-20 border-ascent-2 flex justify-between items-center rounded-full overflow-hidden mx-2 ">
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
              <TextInput
                styles="w-full rounded-full py-5 "
                placeholder="Whats on your mind..."
                name="Type "
              />
            </div>
            <div className="w-24 h-14 mx-5 rounded-3xl bg-[#D9D9D9] flex justify-center items-center">
              <BsFillSendFill size={22} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
