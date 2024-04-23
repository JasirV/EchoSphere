import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { useSelector } from "react-redux";
import axios from "axios";
import VerificationCheck from "./components/VerificationCheck";
import { createContext, useEffect, useState } from "react";
import Editing from "./components/Editing";
import Message from "./pages/Message";
import RongRoutes from "./pages/RongRoutes";

import { io } from 'socket.io-client';

const token = localStorage.getItem("token");
export const Axios = axios.create({
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("token"),
  },
});

export const Data = createContext();
function Layout() {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  // console.log(user);
  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ form: location }} replace />
  );
}

function App() {
  const [posts, setPosts] = useState();
  const { theme } = useSelector((state) => state.theme);
  const [value, setValue] = useState("post");
 
  useEffect(() => {
    const socket = io('http://localhost:3002'); 

    socket.on('connection', () => {
      console.log('Connected to server');
    });

    socket.on('getUser', (activeUsers) => {
      console.log('Received active users:', activeUsers);
  });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, []); 

  
   
  

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]">
      <Data.Provider value={{ posts, setPosts, value, setValue }}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verificationCheck" element={<VerificationCheck />} />
          <Route path="/ProfileEditing" element={<Editing />} />
          <Route path="/message" element={<Message/>}/>
          <Route path="*" element={<RongRoutes/>}/>
        </Routes>
      </Data.Provider>
    </div>
  );
}

export default App;
