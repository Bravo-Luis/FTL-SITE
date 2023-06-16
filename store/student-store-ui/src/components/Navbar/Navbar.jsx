import * as React from "react"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <img style={{width:"50px"}} src="" alt="" />
      <div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly", width:"40%"}}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#buy">Buy</a>
      </div>
    </nav>
  )
}
