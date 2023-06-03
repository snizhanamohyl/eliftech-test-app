import { Link, Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import Shop from "./pages/Shop";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Shop</Link>
        <Link to="/cart">Cart</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
