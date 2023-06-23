import * as React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Sidebar({ cart, setCart, loggedIn, setLoggedIn}) {
  const [isOpen, setOpen] = React.useState(false);
  const [showingLogIn, setShowingLogIn] = React.useState(true)
  const [userData, setUserData] = React.useState({email: '', name: '', password:''})

  React.useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) setUserData(JSON.parse(savedData));
  }, []);
  
  React.useEffect(() => {
    localStorage.setItem('userData', JSON.stringify(userData));
  }, [userData]);

  const arrowAddress = "https://cdn-icons-png.flaticon.com/512/32/32542.png";
  const cartAddress =
    "https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png";

    async function submitUserData(type) { 
      const url = type === "login" ? `http://localhost:3001/login` : `http://localhost:3001/signup`;
      console.log(userData)
    
      const data = userData
    
      try {
        const response = await axios.post(url, data);
        console.log(response.data)
        setLoggedIn(response.data)
      } catch (error) {
        console.error(error);
        alert(error)
      }
    }

    async function checkout() {
    
      const url = `http://localhost:3001/receipts`; 
      console.log(userData)
      const data = {...userData, newReceipt: cart}
    
      try {
        const response = await axios.post(url, data);
        console.log(response.data);
        
     
      } catch (error) {

        console.error(error);
        alert('Error during checkout.');
      }
    }

  return (
    <section className="sidebar" style={{ width: isOpen ? "25%" : "7.5%" }}>
      <div>
        <img
          onClick={() => {
            setOpen(!isOpen);
          }}
          style={{ transform: isOpen ? "rotate(0deg)" : "rotate(180deg)" }}
          src={arrowAddress}
          alt="Open sidebar button"
        />
        <br />
        <img
          onClick={() => {
            setOpen(!isOpen);
          }}
          src={cartAddress}
          alt="Open sidebar button"
        />
        <h1 style={{ display: isOpen ? "block" : "none" }}> Shopping Cart </h1>
        <div style={{ display: isOpen ? "block" : "none" }}>
          <ShoppingList cart={cart} setCart={setCart} />
        </div>
        {loggedIn != null ? (<>
          <button onClick={()=>{checkout()}}>Checkout</button>
          <h1>Welcome {loggedIn?.data?.name}! </h1>

          {Array.isArray(loggedIn?.data?.reciepts) && loggedIn.data.reciepts.map((recieptObj, index) => {
      const receiptId = Object.keys(recieptObj)[0];
      
      return (
        <Link to={`receipt/${receiptId}`} > <button key={index} className="receipt-button" >
        View Receipt {receiptId}
      </button> </Link>
      );
    })}
 
        </>) : (showingLogIn ? (<>
          <h1 style={{ display: isOpen ? "block" : "none" }}>Log in</h1>
        <div style={{ textAlign: "left", width: "90%", marginLeft: "10%" }}>
          <h2 style={{ display: isOpen ? "block" : "none" }}> Email </h2>
          <input
            type="text"
            alt="Email Input"
            placeholder="your-email@email.com"
            style={{ display: isOpen ? "block" : "none" }}
            onChange={(event)=>{setUserData({...userData, email: event.target.value})}}
          />
        </div>
        <div style={{ textAlign: "left", width: "90%", marginLeft: "10%" }}>
          <h2 style={{ display: isOpen ? "block" : "none" }}> Password </h2>
          <input
            type="password"
            alt="password Input"
            placeholder="password"
            style={{ display: isOpen ? "block" : "none" }}
            onChange={(event)=>{setUserData({...userData, password: event.target.value})}}
          />
          
        </div>
        <button style={{ display: isOpen ? "" : "none" }} onClick={()=>{submitUserData("login")}}> Log in </button>
        <div className="slider" onClick={()=>{setShowingLogIn(!showingLogIn)}} style={{ display: isOpen ? "block" : "none" }}>
          <h2>{showingLogIn ? ("Need to sign up?") : ("Already have an account?")}</h2>
        </div>
        
          </>) : (<> 

          

        <div style={{ textAlign: "left", width: "90%", marginLeft: "10%" }}>
          <h2 style={{ display: isOpen ? "block" : "none" }}> Name </h2>
          <input
            type="text"
            alt="Name Input"
            placeholder="your name"
            style={{ display: isOpen ? "block" : "none" }}
            onChange={(event)=>{setUserData({...userData, name: event.target.value})}}
          />
        </div>
        <div style={{ textAlign: "left", width: "90%", marginLeft: "10%" }}>
          <h2 style={{ display: isOpen ? "block" : "none" }}> Email </h2>
          <input
            type="text"
            alt="Email Input"
            placeholder="your-email@email.com"
            style={{ display: isOpen ? "block" : "none" }}
            onChange={(event)=>{setUserData({...userData, email: event.target.value})}}
          />
        </div>
        <div style={{ textAlign: "left", width: "90%", marginLeft: "10%" }}>
          <h2 style={{ display: isOpen ? "block" : "none" }}> Password </h2>
          <input
            type="password"
            alt="password Input"
            placeholder="password"
            style={{ display: isOpen ? "block" : "none" }}
            onChange={(event)=>{setUserData({...userData, password: event.target.value})}}
          />
        </div>
        <button style={{ display: isOpen ? "" : "none" }} onClick={()=>{submitUserData("signup")}}> Sign up </button>
        <div className="slider" onClick={()=>{setShowingLogIn(!showingLogIn)}}style={{ display: isOpen ? "block" : "none" }} >
          <h2>{showingLogIn ? ("Need to sign up?") : ("Already have an account?")}</h2>
        </div>
        
          </>))}
        <b />
      </div>
      <br />
    </section>
  );
}

function ShoppingList({ cart, setCart }) {
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    setTotalPrice(
      cart
        ? cart.reduce((total, item) => total + item.price * item.quantity, 0)
        : 0
    );
  }, [cart]);

  function decrementQuantity(productId) {
    let updatedCart = cart.map((item) => {
      if (item.id === productId && item.quantity >= 1) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
    updatedCart = updatedCart?.filter(item => item.quantity > 0)
    setCart(updatedCart);
  }

  return (
    <div className="shopping-list">
      {cart?.map(
        (item) =>
          item.quantity > 0 && (
            <div key={item.id} className="shopping-list-item">
              <button onClick={() => decrementQuantity(item.id)}>-</button>
              <Link className="cart-link" to={"products/" + item.id} ><span className="item-name">{item.name}</span></Link>
              <span className="item-quantity">Qty: {item.quantity}</span>
              <span className="item-price">
                Price: ${item.price.toFixed(2)}
              </span>
            </div>
          )
      )}
      {totalPrice > 0 ? (
        <>
        <div className="total-price">Subtotal: ${totalPrice.toFixed(2)}</div>
        <div className="total-price">Taxes: ${(totalPrice * 0.0875).toFixed(2) }</div>
        <div className="total-price">Total: ${(totalPrice + (totalPrice * 0.0875)).toFixed(2) }</div>
        </>
      ) : (
        <div>No Items in Shopping List</div>
      )}
    </div>
  );
}
