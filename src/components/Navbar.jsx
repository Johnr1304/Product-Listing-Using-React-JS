function Navbar({ cartCount }) {
  return (
    <div className="navbar">
      <h1>StyleHub</h1>
      <p>🛒 Cart: {cartCount}</p>
    </div>
  );
}

export default Navbar;