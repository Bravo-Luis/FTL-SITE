import * as React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function ProductBox({ product }) {
  return (
    <div className="product-box">
      <img className="product-img" src={product.image} alt="" />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
    </div>
  );
}

export default function Home({ products, checkoutList, setCheckoutList }) {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("");

  const categories = [
    "All Categories",
    "Clothing",
    "Food",
    "Accessories",
    "Tech",
  ];

  function showProduct(product){
    return(
      <h1>product.name</h1>
    )
  }

  const filteredProducts = products?.filter((product) => {
    const searchTerm = search.toLowerCase();
    const productCategory = (category.toLowerCase() === "all categories") ? "" : category.toLowerCase();
    const productName = product.name.toLowerCase();
    const matchesSearch = (searchTerm === "") || productName.includes(searchTerm);
    const matchesCategory = (productCategory === "") || product.category?.toLowerCase() === productCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
       <div id={"home"} style={{ width: "92.5%", marginLeft: "7.5%" }}>
        {/* <div
          style={{
            display:"flex",
            width: "100%",
            height: "30vh",
            backgroundColor: "yellow",
            marginBottom: "0",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h1>
            THIS IS MY BANNER{" "}
          </h1>
        </div>  */}

        <div style={{width:"100%", textAlign: "center"}}>
        <img src={"https://i.gifer.com/4wqO.gif"} />
        </div>

        <div style={{display:"flex", flexDirection: "column"}}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <div style={{display: "flex", flexDirection: "row"}}>
        {categories.map((cat, index) => (
            <button
              key={index}
              onClick={() => setCategory(cat)}
              style={{
                backgroundColor: cat === category ? "rgb(74, 155, 247)" : "yellow",
              }}
            >
              {cat}
            </button>
          ))}

        </div>
          
        </div>
      </div>
      <div id={"buy"} className="home">
        {filteredProducts?.map((product, index) => (
          <Link className="product-link" key={index} to={"products/" + product.id}>
          <ProductBox key={index} product={product}/>
          </Link>
        ))}
      </div>
    </>
  );
}
