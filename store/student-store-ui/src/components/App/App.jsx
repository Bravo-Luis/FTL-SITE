import * as React from "react"
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import axios from 'axios'
import "./App.css"
import { Link } from "react-router-dom"


// Main App Function
export default function App() {

  const [cart, setCart] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(null)
  const [userData, setUserData] = React.useState({email: '', name: '', password:''})

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart} loggedIn={loggedIn} setLoggedIn={setLoggedIn} userData={userData} setUserData={setUserData}/>}/>
          <Route path="products/:id" element={<ProductDetails cart={cart} setCart={setCart} loggedIn={loggedIn}/>}/>
          <Route path="receipt/:id" element={<Receipt receiptList={loggedIn?.data}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


function ProductDetails({cart, setCart, loggedIn}){

  const params = useParams();
  const [product, setProduct] = React.useState(null);

  function onAddToCart(){
    const productInCart = cart?.find(item => item.id === product.id);

    if (productInCart) {
      const updatedCart = cart?.map(item =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, {...product, quantity: 1}]);
    }
  }

  function getQuantity(){
    const productInCart = cart?.find(item => item?.id === product?.id);
    return productInCart ? productInCart.quantity : 0;
  }
  

  React.useEffect(() => {
    const url = `http://localhost:3001/products/${params?.id}`;
    axios.get(url).then((response) => {
      setProduct(response.data); 
    });
  }, []);

  return (
    <div className="product-details" >
      <BackNav/>
      <div className="product-info">
        <h1>{product?.name}</h1>
        <img src={product?.image} alt="" /> <br />
        <h2>{product?.description}</h2>
        <button onClick={onAddToCart}>Add to Cart</button>
        <p>in cart: {getQuantity()}</p>
      </div>
    </div>
  )
}

function BackNav(){
  return (
    <nav className="navbar">
      <div style={{display:"flex", flexDirection:"row", justifyContent: "left", width:"90%"}}>
        <Link to=".."> 
          <button>
            Back
          </button>
        </Link>
      </div>
    </nav>
  )
}

function Receipt({receiptList}) {
  const { id } = useParams();

  const allReceipts = receiptList?.reciepts;
  const receiptObj = allReceipts?.find(receipt => Object.keys(receipt)[0] === id);
  const receiptItems = receiptObj ? Object.values(receiptObj)[0] : null;
  if (!receiptItems.data || !receiptItems.data.length) {
    return (
      <>
      <BackNav/>
      <div className="receipt">
        <h2>Receipt not found</h2>
      </div>
      </>
    );
  }

  return (
    <>
    <BackNav/>
    <div className="receipt">
    <p>Receipt ID: {id}</p>
      <p> Reciept Date: {receiptItems.date}</p>
      <ul>
        {receiptItems?.data.map((item, index) => (
          <li key={index}>
            <p>Item: {item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
          </li>
        ))}
        <li>
            <p> Subtotal: ${receiptItems?.total.toFixed(2)} </p>
            <p>Taxes: ${(receiptItems?.total * 0.0875).toFixed(2)}</p>
            <p>Total: ${(receiptItems?.total + receiptItems?.total * 0.0875).toFixed(2)}</p>
        </li>
      </ul>
    </div>
    </>
  );
}
