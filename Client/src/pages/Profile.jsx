import React, { useContext, useEffect, useState } from "react";
import TopBarProfilwe from "../components/TopBarProfilwe";
import BgImage from "../assets/social-media-cropped.png";
import CustomeButton from "../components/CustomeButton";
import NavProfile from "../components/NavProfile";
import ProfilePost from "../components/ProfilePost";
import { Data } from "../App";
import About from "../components/About";
import Friends from "../components/Friends";
import Media from "../components/Media";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NoProfile from "../assets/ProfilePng.png";
import NoCover from "../assets/cover.jpg";
const Profile = () => {
  // const {posts} =useSelector((state)=>state.posts);
  // const [shortImg, setShortImg] = useState([]);
  const { value } = useContext(Data);
  const navigate = useNavigate();
  const { id } = useParams();
  const [user,setUser]=useState()
  console.log(id);
const [find,setFind]=useState(false)

function finderdind(){
  const userId=localStorage.getItem('user')
  if(userId===id){
    setFind(true)
  }
}


  const fetchData = async () => {
    try {
      const userId = id;
      const res = await axios.get(
        `http://localhost:3001/profilesection/${userId}`
      );
      setUser(res?.data?.data);
      // const img=user.friends.map((i)=> i.photo)
      // setShortImg(img)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    finderdind()

  }, []);
  return (
    <>
      <TopBarProfilwe user={user?.photo} />
      <div className="home px-4 lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg align-center flex justify-center flex-col">
        {/* Cover Photo */}
        <img
          src={user?.coverPhoto||NoCover}
          alt=""
          className="object-cover h-96 w-full rounded-lg hover:h-fu"
        />

        {/* Profile Section */}
        <div className="flex flex-col lg:flex-row items-center justify-start mt-4 lg:mt-0">
          {/* Profile Image */}
          <div className="bg-white mx-4 sm:mx-16 mb-8 sm:mb-0 h-40 w-40 sm:w-36 sm:h-36 relative bottom-0 sm:bottom-10 rounded-full flex justify-center items-center">
            <img
              src={user?.photo||NoProfile}
              alt="dffd"
              className="w-44 h-36 rounded-full lg:border-4 border-white"
            />
          </div>

          {/* Username Section */}
          <div className="flex items-center justify-center lg:justify-start" >
            <div className="text-center lg:text-left">
              <p className="text-2xl text-ascent-1">{user?.firstName}{user?.lastName}</p>
              <p className="text-ascent-2">{user?.friends.length||0} Friends</p>
              <div className="flex mt-2">
                {/* Displaying shortImg array items  */}
                {/* {shortImg?.map((index, i) => (
                  <>
                  <div
                    key={i.length}
                    className={`bg-white h-7 w-7 rounded-full flex justify-center items-center relative right-${
                      index - 2
                    }`}
                  >
                    <img
                      src={i}
                      alt="tgb"
                      className="w-6 h-6 rounded-full"
                    />
                  </div>
                  </>
                ))} */}
              </div>
            </div>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex justify-end mt-1">
          { find ?(
            <div>
          <CustomeButton
            type="Add to story"
            titile="Add to story"
            containerStyle="bg-[#0444a4] text-white py-1 px-4 rounded-full font-semibold text-l  "
          />
          <CustomeButton
            type="Edit Profile"
            onClick={() => navigate("/ProfileEditing")}
            titile="Edit Profile"
            containerStyle="bg-[#FFFFFF] text-black py-1 px-4 rounded-full font-semibold text-l mx-1 "
          /></div>
          ):(
            <div>
            <CustomeButton
            type="Add To Friend"
            titile="Add To Friend"
            containerStyle="bg-[#0444a4] text-white py-1 px-4 rounded-full font-semibold text-l  "
          />
          <CustomeButton
            type="Message"
            onClick={() => navigate(`/message`)}
            titile="Message"
            containerStyle="bg-[#FFFFFF] text-black py-1 px-4 rounded-full font-semibold text-l mx-1 "
          />
          </div>
          )}
        </div>
      </div>
      <NavProfile />
      {value === "post" && find? (
        <ProfilePost user={user}/>
      ) : value === "about" ? (
        <About user={user}/>
      ) : value === "friends" ? (
        <Friends user={user}/>
      ) : (
        <Media userId={id} />
      )}
    </>
  );
};

export default Profile;
