import React from 'react'
import {NavLink, useNavigate} from "react-router-dom"
import "./navbar.css"
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../utils/firebase"

const Navbar = () => {
  const [user,loading]  =useAuthState(auth)
  const navigate=useNavigate()
  // if (user) console.log(user)
  if(!user) navigate("/")
    return (
      <div className="Navbar">
        <div className="Navbar-container">
          <div className="left">
            <h3 className="logo">
              <NavLink
                to="/"
                style={{ textDecoration: "none", color: "white" }}
              >
                NarTech.
              </NavLink>
            </h3>
          </div>
          <div className="right">
            {user ? (
              <>
                <span className="Navbar-link">
                  <NavLink
                    to="/bilanco"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Yillik Bilanco
                  </NavLink>
                </span>
                <span className="Navbar-link">
                  <NavLink
                    to="/alimlar"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Alis Girisi
                  </NavLink>
                </span>
                <span className="Navbar-link">
                  <NavLink
                    to="/satislar"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Satis Girisi
                  </NavLink>
                </span>
                <span className="Navbar-link">
                  <NavLink
                    to="/bedel"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Bedelli/Bedelsiz Girisi
                  </NavLink>
                </span>
                <span className="Navbar-link">
                  <NavLink
                    to="/satis"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Satis Hesabi
                  </NavLink>
                </span>
                <span className="Navbar-link">
                  <NavLink
                    to="/temmettu"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Temmettu Hesabi
                  </NavLink>
                </span>
                <img src={user.photoURL} alt="avatar" className='avatar-image' height="30px"/>
                <button className='Navbar-button' onClick={()=>auth.signOut()}>Sign Out</button>
              </>
            ) : (
              <>
                <span className="Navbar-link">
                  <NavLink
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Sign In
                  </NavLink>
                </span>
                <span className="Navbar-link">
                  <NavLink
                    to="/register"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    Sign Up
                  </NavLink>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default Navbar
