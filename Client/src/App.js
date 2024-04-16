import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home } from "./pages";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import { useSelector } from "react-redux";
import axios from "axios";
import VerificationCheck from "./components/VerificationCheck";
import { createContext, useState } from "react";
import Editing from "./components/Editing";
import Message from "./pages/Message";
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
        </Routes>
      </Data.Provider>
    </div>
  );
}

export default App;
