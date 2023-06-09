import { Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop/Shop";
import Layout from "./components/Layout/Layout";
import CartPage from "./pages/CartPage/CartPage";
import { NotFound } from "./pages/NotFound/NotFound";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
