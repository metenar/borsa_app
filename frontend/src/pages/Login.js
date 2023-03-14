import axios from 'axios'
import { useState } from 'react'
import {FcGoogle} from "react-icons/fc"
import {AiFillFacebook} from "react-icons/ai"
import {GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import {auth} from "../utils/firebase"
import { NavLink, useNavigate } from 'react-router-dom'
import './login.css'

const Login = () => {
  const googleProvider=new GoogleAuthProvider()
  const navigate =useNavigate()
  const googleLogin=async () => {
    try {
      const res=await signInWithPopup(auth,googleProvider)
      navigate("/bilanco")
    } catch (err){
      console.log(err)
    }
  }
    // const [formData, setFormData] = useState({
    //     username:'',
    //     password:'',
    // })
    // const [error, setError] = useState(null)
    
    // const {username, password} =formData
    // const handleChange = (e) => {
    //     setFormData((prevState)=>({
    //         ...prevState,
    //         [e.target.name]:e.target.value
    //     })
    // )}
    // const handleSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //       await axios.post("http://localhost:5001/api/auth/login",formData)
    //       navigate("/")
    //     } catch (err) {
    //       let errCode=(err.message).split("code")[1],message
    //       if(+errCode===404) {
    //         message="User already exist"
    //       } else if(+errCode===400) {message="Wrong credentials"}
    //       setError(message)
    //     }
    // }
    const isTrue=true
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <h1 className="login-title"> Sign In</h1>
        <h3 className="login-subTitle">Sign in with one of the providers</h3>
        <div className="buttonContainer">
          <button className="loginButton" onClick={googleLogin}><FcGoogle className='icons'/>Sign in with Google</button>
          <button className="loginButton"><AiFillFacebook className='face icons'/>Sign in with Facebook</button>
        </div>
        {isTrue &&<form className="login-form" onSubmit={(e)=>{}}>
          <label htmlFor="username" className="login-username-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="login-username"
            value="Mete"
            placeholder="Enter your username"
            onChange={()=>{}}
          />
          <label htmlFor="password" className="login-password-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="login-password"
            value="password"
            placeholder="Enter your password"
            onChange={()=>{}}
          />
          <button className="login-btn" type="submit">
            Sign In
          </button>
          {isTrue && <p className="error">Error</p>}
          <span className="Navbar-link">
            <NavLink
              to="/register"
              style={{
                textDecoration: "none",
                color: "Gray",
                fontSize: "12px",
              }}
            >
              Create New Account
            </NavLink>
          </span>
        </form>}
      </div>
    </div>
  );
}

export default Login