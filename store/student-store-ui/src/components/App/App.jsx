import * as React from "react"
import { BrowserRouter, Route, Routes, useParams, Link } from 'react-router-dom'
import Home from "../Home/Home"
import axios from 'axios'
import { useState } from "react"
import "./App.css"

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="products/:id" element={<ProductDetails/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

function ProductDetails(){

  const params = useParams()
  const [product, setProduct] = React.useState([]);

  React.useEffect(() => {
    const url = `https://codepath-store-api.herokuapp.com/store/${params.id}`;
    axios.get(url).then((response) => {
      setProduct(response.data.product); 
    });
  }, []);

  return (
    <div className="product-details">
      <BackNav/>
      <div className="product-info">
        <h1>{product.name}</h1>
        <img src={product.image} alt={`product image: ${product.name}`} />
        <h2>{product.description}</h2>
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