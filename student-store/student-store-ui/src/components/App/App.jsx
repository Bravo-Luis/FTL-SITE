import * as React from "react"
import { BrowserRouter, Route, Routes, useParams, Link } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import axios from 'axios'
import About from "../About/About"
import "./App.css"


export default function App() {

  const [checkoutList, setCheckoutList] = React.useState([])

  return (
    <div className="app">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage checkoutList={checkoutList} setCheckoutList={setCheckoutList}/>}/>
        <Route path="products/:id" element={<ProductDetails/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  )
}



function ProductDetails(){

  const params = useParams()
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const url = "https://codepath-store-api.herokuapp.com/store";
    axios.get(url).then((response) => {
      setProducts(response.data.products); 
    });
  }, []);

  let product = products[params.id-1]

  return (
    <div style={{width:"100%", height:"60vh",maxHeight: "100vh", display:"flex", justifyContent:"center", alignContent:"center"}}>
      <Link to={".."}> BACK</Link>
      <div style={{borderStyle:"solid", borderRadius: "15px", display:"flex", alignContent:"center"}}>
    <div>
    <h1> {product?.name}</h1>
    <img src={product?.image} style={{borderRadius: "15px", height: "100%", width : "auto"}} alt="" />
    </div>
    </div>
    </div>
  )
}

function HomePage(checkoutList, setCheckoutList ){

  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const url = "https://codepath-store-api.herokuapp.com/store";
    axios.get(url).then((response) => {
      setProducts(response.data.products); 
    });
  }, []);

  return(
    <div style={{width:"100%"}}>
    <Sidebar checkoutList={checkoutList} setCheckoutList={setCheckoutList}/>
    <div>
    <Navbar/>
    <Home products={products} checkoutList={checkoutList} setCheckoutList={setCheckoutList}/>
    <About/>
    </div>
    </div>
  )
}

