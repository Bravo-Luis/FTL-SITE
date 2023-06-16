import * as React from "react"
import "./Home.css"
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {

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
      <Sidebar/>
      <Navbar/>
      <div id="home-content">

      <div id="buy">
      {filteredProducts?.map((product, index) => (
          <Link className="product-link" key={index} to={"products/" + product.id}>
          <ProductBox key={index} product={product}/>
          </Link>
        ))}
      </div>


      </div>
    </div>
  )
}

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