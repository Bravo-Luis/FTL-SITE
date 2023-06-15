import * as React from "react" 
import "./Sidebar.css"
import { useState } from "react"


export default function Sidebar(checkoutList, setCheckoutList) {
  const[isOpen, setOpen] = useState(false)
  return (
    <section className="sidebar" style={{borderStyle : "solid", width: (isOpen ? "25%" : "7.5%"), transition: "width 100ms ease"}}>

      <img onClick={()=>{setOpen(!isOpen)}} style={{height:"30px", transform: (isOpen ? "rotate(0deg)" : "rotate(180deg)"), transition : "transform 150ms ease", marginTop: "2.5vh"}} src="https://cdn-icons-png.flaticon.com/512/44/44607.png" alt="arrow" />
      {
        
      }
      <div style={{display: isOpen ? "block" : "none", textAlign: "left", padding: "5%"}}>
        Name 
        <input style={{width: "90%"}} type="text" />
        Email
        <input style={{width: "90%"}} type="text" /> <br/>
        <input type="checkbox" name="" id="" />
        I agree to the terms and conditions <br/><br/>
        <button>
          Checkout
        </button> <br/> <br/>
        A confirmation email will be sent to you so that you can confirm this order. Once you have confirmed the order, it will be delivered to your dorm room.
      </div>
      
    </section>
  )
}

