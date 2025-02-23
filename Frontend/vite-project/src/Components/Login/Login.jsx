// Frontend/vite-project/src/Components/Login/Login.jsx
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Login() {
 const[email,setEmail]=  useState("")
 const[password,setPassword]=  useState("")
 
 const navigate =useNavigate()

const handleSubmit=async (e) => {
    e.preventDefault()
    try {
        
    } catch (err) {
        
    }
}

  return (
    <div>
    <div>
      <form  onSubmit={handleSubmit}>
        <div>
            <h4>Login</h4>
        </div>
        <input onChange={(e)=>setEmail(e.target.value)} 
        type="email" 
        name='email '
        value={email} 
        placeholder='Email Address' 
        required
        />
        <input onChange={(e)=>setPassword(e.target.value)} 
        type="password" 
        name='Ppssword '
        value={email} 
        placeholder='password' 
        required
        />
        <button type='submit'>
            Login
        </button>
        <div>
            Dont Have an account?
            <Link to={'./register' } classNaame="hi"
            >Register</Link>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
