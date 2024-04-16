import React, { useRef } from 'react';
import NoProfile from '../assets/ProfilePng.png';
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const Story = ({ posts }) => {
  const scrollRef = useRef(null);

  const handleScroll = (scrollDirection) => {
    const scrollAmount = 90;
    if (scrollRef.current) {
      if (scrollDirection === 'left') {
        scrollRef.current.scrollLeft -= scrollAmount;
      } else if (scrollDirection === 'right') {
        scrollRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <div className="flex items-center">
      <button onClick={() => handleScroll('left')} className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
        <FaChevronCircleLeft />
      </button>
      <div ref={scrollRef} className="flex overflow-x-auto scrollbar-hide space-x-4">
        {posts?.map((post, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-20 h-20 overflow-hidden rounded-full border-4 border-[#1877F2]">
              <img src={post?.userId?.photo ?? NoProfile} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <p className="mt-2 text-xs text-center">{post?.userId?.firstName}</p>
          </div>
        ))}
      </div>
      <button onClick={() => handleScroll('right')} className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
      <FaChevronCircleRight />
      </button>
    </div>
  );
};

export default Story;
