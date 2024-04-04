import { Outlet,Navigate,Route,Routes,useLocation } from "react-router-dom";
import { Home } from "./pages";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import {useSelector} from 'react-redux'
import axios from 'axios'
import VerificationCheck from "./components/VerificationCheck";
const token=localStorage.getItem('token')
export const Axios=axios.create({
  baseURL:'http://localhost:3001/',
  headers:{
    "Content-Type":'application/json',
    Authorization:localStorage.getItem('token')
  }
})

function Layout(){
  const {user}=useSelector(state=>state.user);
  const location=useLocation()
  // console.log(user);
  return user?.token?(
    <Outlet/>
  ):(<Navigate to="/login" state={{form:location}} replace />)
}

function App() {
  const {theme}=useSelector((state)=>state.theme)

  return (
    <div data-theme={theme} className="w-full min-h-[100vh]" >
 <Routes>
  <Route element={<Layout />}>
    <Route path="/home" element={<Home />} />
    <Route path="/profile" element={<Profile />} />
  </Route>
  <Route path="/" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/reset-password" element={<ResetPassword />} />
  <Route path="verificationCheck" element={<VerificationCheck />} />
</Routes>

    </div>
  );
}

export default App;
