import { Text } from "@chakra-ui/react";
import CartItem from "../CartItem/CartItem";
import { useContext, useEffect, useState } from "react";
import cartContext from "../../context/cartContext";
import { CartWrap } from "./CartList.styled";
import { fetchRestaurantById } from "../../services/productsAPI";

export default function CartList() {
  const { productsInCart, setProductsInCart } = useContext(cartContext);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem("productsInCart"));
    setProductsInCart(products ? products : []);
  }, [setProductsInCart]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const restaurantId = productsInCart[0]?.restaurantId;

      if (chosenRestaurant?.id === restaurantId) return;

      try {
        const restaurant = await fetchRestaurantById(restaurantId);

        setChosenRestaurant(restaurant);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRestaurant();
  }, [chosenRestaurant, productsInCart]);

  return (
    <CartWrap>
      <Text textAlign={"center"} fontWeight={500} fontSize={24} mb={8}>
        Your products {chosenRestaurant ? `from ${chosenRestaurant.name}` : ""}
      </Text>
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
