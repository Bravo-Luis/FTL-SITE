import * as React from "react"
import "./Home.css"


function productBox(product){
  let addrString = "\'" + product.image + "\'"
  return (
    <div>
      <img src={{addrString}} alt="" />
    </div>
  )
}

export default function Home(products) {
  return (
    <div className="home">
      <p>Home</p>
      {products?.data.products.map((prod)=>{
          return productBox(prod)
      })}
    </div>
  )
}



/* export default function Home(products) {
  return (
    <div className="home">
      <p>Home</p>
      {products?.map((product)=>{
        return (productBox(product))
      )}}}}
    </div>
  )
} */