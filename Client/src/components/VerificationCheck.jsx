import React from 'react'
import { useNavigate } from 'react-router-dom'

const VerificationCheck = () => {
  const navigate = useNavigate();
  setInterval(()=>{
    navigate("/login")
  },5000)
  return (
    <div style={{ backgroundColor: '#007bff', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ backgroundColor: '#ffffff', padding: '50px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', color: '#007bff' }}>Check Your Email for Verification</h1>
        <p style={{ textAlign: 'center', color: '#333333' }}>Please check your email inbox for the verification link.</p>
    </div>
</div>
  )
}

export default VerificationCheck