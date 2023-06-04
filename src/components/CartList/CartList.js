import { Text } from "@chakra-ui/react";
import CartItem from "../CartItem/CartItem";
import { useContext } from "react";
import cartContext from "../../context/cartContext";
import { CartWrap } from "./CartList.styled";

export default function CartList() {
  const { productsInCart } = useContext(cartContext);

  return (
    <CartWrap>
      {productsInCart.length ? (
        <ul>
          {productsInCart.map((product) => (
            <CartItem key={product.id} product={product} />
          ))}
        </ul>
      ) : (
        <Text fontSize="xl">No products in cart yet</Text>
      )}{" "}
    </CartWrap>
  );
}
