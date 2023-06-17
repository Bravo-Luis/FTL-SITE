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

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home cart={cart} setCart={setCart}/>}/>
          <Route path="products/:id" element={<ProductDetails cart={cart} setCart={setCart}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}


function ProductDetails({cart, setCart}){

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
    const url = `https://codepath-store-api.herokuapp.com/store/${params?.id}`;
    axios.get(url).then((response) => {
      setProduct(response.data.product); 
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