import * as React from "react"
import { BrowserRouter } from 'react-router-dom'
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import axios from 'axios'
import "./App.css"

export default function App() {

  const [products, setProducts] = React.useState()

  React.useEffect(()=>{
    const url = "https://codepath-store-api.herokuapp.com/store"
    axios.get(url).then((respnse)=>{
      setProducts(respnse)
    })
  },[])


  return (
    <div className="app">
      <BrowserRouter>
        <main> 
          {/* YOUR CODE HERE! */}
          <Navbar />
            <Sidebar/>
            
        </main>
      </BrowserRouter>
    </div>
  )
}
//<Home products={products} />