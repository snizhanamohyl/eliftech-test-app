import { Nav, NavigationLink } from "./AppBar.styled";

export default function AppBar() {
  return (
    <Nav>
      <NavigationLink to="/">Shop</NavigationLink>
      <NavigationLink to="/cart">Cart</NavigationLink>
    </Nav>
  );
}
