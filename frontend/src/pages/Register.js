import { useState } from 'react'
import axios from "axios"
import { NavLink, useNavigate } from 'react-router-dom'
import './register.css'

const Register = () => {
  const [formData, setFormData] = useState({
    username:'',
    email:'',
    password:'',
})
const [error, setError] = useState(null)
const navigate=useNavigate()
const {email, password,username} =formData
const handleChange = (e) => {
    setFormData((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value
    })
)}
const handleSubmit = async(e) => {
  e.preventDefault()
  try {
    await axios.post("http://localhost:5001/api/auth/register",formData)
    navigate("/login")
  } catch (err) {
    let errCode=(err.message).split("code")[1],message
    if(+errCode===409) message="User already exist"
    setError(message)
  }
}
  return (
    <div className="register-container">
      <div className="register-wrapper">
        <h1 className="register-title">Create New Account</h1>
        <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="username" className="register-username-label">
            Username
          </label>
          <input
            type="text"
            className="register-username"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={handleChange}
          />
          <label htmlFor="email" className="register-email-label">
            Email
          </label>
          <input
            type="email"
            className="register-email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleChange}
          />
          <label htmlFor="password" className="register-password-label">
            Password
          </label>
          <input
            type="password"
            className="register-password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleChange}
          />
          <button className="register-btn" type="submit">
            Sign Up
          </button>
          {error && <p className="error">{error}</p>}
          <span className="Navbar-link">
            <NavLink
              to="/login"
              style={{
                textDecoration: "none",
                color: "Gray",
                fontSize: "12px",
              }}
            >
              Already have an account?
            </NavLink>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Register