import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import FilterSort from "./components/FilterSort";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import productsData from "./data/products";
import "./App.css";

function App() {
  const [products] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("default");

  const categories = [...new Set(products.map((p) => p.category))];

  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (category !== "all") {
    filteredProducts = filteredProducts.filter((p) => p.category === category);
  }

  if (sortOrder === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortOrder === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortOrder === "name-asc") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  if (sortOrder === "name-desc") filteredProducts.sort((a, b) => b.name.localeCompare(a.name));

  function handleAddToCart(product) {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function handleRemove(id) {
    setCart(cart.filter((item) => item.id !== id));
  }

  function handleReset() {
    setSearchTerm("");
    setCategory("all");
    setSortOrder("default");
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page-container">
      <Navbar cartCount={cartCount} />

      <div className="content">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <FilterSort
          category={category}
          setCategory={setCategory}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          categories={categories}
          onReset={handleReset}
        />

        <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />

        <Cart cartItems={cart} onRemove={handleRemove} />
      </div>
    </div>
  );
}

export default App;