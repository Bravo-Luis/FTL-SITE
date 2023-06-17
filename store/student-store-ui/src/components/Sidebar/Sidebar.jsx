import * as React from "react"
import "./Sidebar.css"

export default function Sidebar(cart, setCart) {

  const [isOpen, setOpen] = React.useState(false)

  const arrowAddress = "https://cdn-icons-png.flaticon.com/512/32/32542.png"
  const cartAddress = "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png"
  const checkboxText = 
    `A confirmation email will be sent to you so that you can confirm this order. 
    Once you have confirmed the order, it will be delivered to your dorm room.`

  return (
    <section className="sidebar" style={{width: (isOpen ? "25%" : "7.5%")}}>
      <div >
        <img 
          onClick={()=>{setOpen(!isOpen)}}  
          style={{transform: (isOpen ? "rotate(0deg)" : "rotate(180deg)")}} 
          src={arrowAddress} 
          alt="Open sidebar button" 
        /> 
        <br/>
        <img 
          onClick={()=>{setOpen(!isOpen)}}   
          src={cartAddress} 
          alt="Open sidebar button" 
        />
        <h1 style={{display: (isOpen ? "block" : "none")}} > Shopping Cart </h1>
        <div style={{textAlign: "left", width: "90%", marginLeft: "10%"}}>
          <h2 style={{display: (isOpen ? "block" : "none")}} > Name </h2>
          <input type="text" alt="Name Input" placeholder="Your Name" style={{display: (isOpen ? "block" : "none")}} />
        </div>
        <div style={{textAlign: "left", width: "90%", marginLeft: "10%"}} >
          <h2 style={{display: (isOpen ? "block" : "none")}} > Email </h2>
          <input type="text" alt="Email Input" placeholder="your-email@email.com" style={{display: (isOpen ? "block" : "none")}} />
        </div>
        <b/>
        <div style={{textAlign: "left", width: "70%", marginLeft: "15%", marginTop: "2%", display: "flex", flexDirection: "row"}} >
          <input type="checkbox" alt="checkbox Input" style={{display: (isOpen ? "inline" : "none"), width: "5%", marginRight:"2%"}} />
          <p style={{display: (isOpen ? "inline" : "none")}} > {checkboxText} </p>
        </div>
      </div>
      <br/>
    </section>
  )
}