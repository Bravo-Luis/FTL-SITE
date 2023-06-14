import * as React from "react"
import "./Navbar.css"

export default function Navbar() {
  return (
    <nav className="navbar">
      <img style={{width:"50px"}} src="https://www.tailorbrands.com/wp-content/uploads/2020/07/mcdonalds-logo.jpg" alt="" />
      <div style={{display:"flex", flexDirection:"row", justifyContent: "space-evenly", width:"40%"}}>
        <button>
          Home
        </button>
          <button>
          About Us
        </button> 
        <button>
          Contact Us
        </button>
        <button>
          Buy Now
        </button>
      </div>
    </nav>
  )
}
