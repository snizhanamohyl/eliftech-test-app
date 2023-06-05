import { useContext } from "react";
import { CartStatus, Nav, NavigationLink } from "./AppBar.styled";
import cartContext from "../../context/cartContext";

export default function AppBar() {
  const { productsInCart } = useContext(cartContext);

  return (
    <Nav>
      <NavigationLink to="/">Shop</NavigationLink>
      <NavigationLink to="/cart">
        Cart{" "}
        {productsInCart?.length ? (
          <CartStatus>{productsInCart.length}</CartStatus>
        ) : (
          ""
        )}
      </NavigationLink>
    </Nav>
  );
}
