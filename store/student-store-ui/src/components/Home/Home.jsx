import * as React from "react"
import "./Home.css"
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home({cart, setCart}) {

  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("all categories");

  React.useEffect(() => {
    const url = "https://codepath-store-api.herokuapp.com/store";
    axios.get(url).then((response) => {
      setProducts(response.data.products); 
    });
  }, []);

  const categories = [
    "All Categories",
    "Clothing",
    "Food",
    "Accessories",
    "Tech",
  ];

  const filteredProducts = products?.filter((product) => {

    const searchTerm = search.toLowerCase();
    const productCategory = (category.toLowerCase() === "all categories") ? "" : category.toLowerCase();
    const productName = product.name.toLowerCase();
    const matchesSearch = (searchTerm === "") || productName.includes(searchTerm);
    const matchesCategory = (productCategory === "") || product.category?.toLowerCase() === productCategory;
    return matchesSearch && matchesCategory;
    
  })

  return (
    <div id="home" className="home">
      <Sidebar cart={cart} setCart={setCart}/>
      <Navbar/>
      <div id="home-content">
      <Banner displayText={{h1: "Welcome" , h2: "Buy Stuff" , h3: "please buy stuff"}}/>

      <br /> <br />
      <input id="search-bar" placeholder="Search..." type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/> <br/>
      {categories.map((cat, index) => (
            <button
              className="cat-button"
              key={index}
              onClick={() => setCategory(cat)}
              style={{
                backgroundColor: cat === category ? "gray" : "white",
              }}
            >
              {cat}
            </button>
          ))}

      <div id="buy">
      {filteredProducts?.map((product, index) => (
          <ProductBox key={index} product={product}/>
        ))}
      </div>
      <SectionBanner displayText={{h1: "About Me" , h2: "My name is Luis" , h3: "This is my store"}}/> <br/> <br />
      <div id="contact">
      <Banner displayText={{h1: "Contact Us" , h2: "(805)415-9758" , h3: "Don't call "}}/>
      </div>
      </div>
  </div>
  )
}

function ProductBox({ product }) {
  return (

    <>
      <Link className="product-link" to={"products/" + product.id}>
      <div className="product-box">
        <img className="product-img" src={product.image} alt="" />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>${product.price}</p>
      </div>
      </Link>
    </>

  );
}

function Banner({displayText}){

  return (
    <div className="banner">
      <h1>{displayText.h1}</h1>
      <h2>{displayText.h2}</h2>
      <h3>{displayText.h3}</h3>
    </div>
  )
}

function SectionBanner({displayText}){
  return (
    <div id="about" className="banner" style={{borderRadius: "2rem", width: "80%", marginLeft: "10%"}}>
      <h1>{displayText.h1}</h1>
      <h2>{displayText.h2}</h2>
      <h3>{displayText.h3}</h3>
    </div>
  )
}
