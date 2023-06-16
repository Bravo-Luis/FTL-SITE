import * as React from "react"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
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
  const [product, setProduct] = React.useState({});

  React.useEffect(() => {
    const url = `https://codepath-store-api.herokuapp.com/store/${params.id}`;
    axios.get(url).then((response) => {
      setProduct(response.data.product); 
    });
  }, {});

  return (
    <div>

    </div>
  )

}