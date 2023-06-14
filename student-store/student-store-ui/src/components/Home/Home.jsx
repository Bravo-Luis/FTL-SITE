import * as React from "react";
import "./Home.css";

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

export default function Home({ products }) {
  const [search, setSearch] = React.useState("");
  const [category, setCategory] = React.useState("");

  const categories = [
    "All Categories",
    "Clothing",
    "Food",
    "Accessories",
    "Tech",
  ];

  const filteredProducts = products?.filter((product) => {
    const searchTerm = search.toLowerCase();
    const productCategory =
      category.toLowerCase() === "all categories" ? "" : category.toLowerCase();
    const productName = product.name.toLowerCase();

    const matchesSearch = searchTerm === "" || productName.includes(searchTerm);
    const matchesCategory =
      productCategory === "" ||
      product.category?.toLowerCase() === productCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div style={{width:"92.5%", marginLeft:"7.5%"}}>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />
      <div>
      {categories.map((cat, index) => (
  <button
    key={index}
    onClick={() => setCategory(cat)}
    style={{ backgroundColor: cat === category ? 'blue' : 'transparent' }}
  >
    {cat}
  </button>
))}

      </div>

      </div>
      <div className="home">
        {filteredProducts?.map((product, index) => (
          <ProductBox key={index} product={product} />
        ))}
      </div>
    </>
  );
}
