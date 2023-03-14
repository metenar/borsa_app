import Navbar from "../components/Navbar"
import {NavLink} from "react-router-dom"
import "./homePage.css"


const HomePage = () => {
  return (
    <div className="homePage">
        <div className="container">
            <h1>Welcome to Istanbul Stock Market</h1>
            <h3>If you have an account please 
            <NavLink 
            to="/login"
            style={{ textDecoration: "none", color: "green" }}> login</NavLink> now</h3>
            <h3>If you want to create an account please click <NavLink 
            to="/register"
            style={{ textDecoration: "none", color: "blue" }}>here</NavLink></h3>
        </div>
    </div>
  )
}

export default HomePage