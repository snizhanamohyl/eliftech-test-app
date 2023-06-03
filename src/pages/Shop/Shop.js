import { useEffect, useState } from "react";
import {
  fetchRestaurantProducts,
  fetchRestaurants,
} from "../../services/productsAPI";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import ProductList from "../../components/ProductList/ProductList";
import { ShopContainer } from "./Shop.styled";

export default function Shop() {
  const [restaurants, setRestaurants] = useState(null);
  // const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(
    () => async () => {
      const restaurants = await fetchRestaurants();
      setRestaurants(restaurants);
    },
    []
  );

  const onRestorauntChange = async (restaurant) => {
    const products = await fetchRestaurantProducts(restaurant.id);

    setProducts(products);
  };

  return (
    <ShopContainer>
      <RestaurantList
        restaurants={restaurants}
        onRestorauntChange={onRestorauntChange}
      />
      {products && <ProductList products={products} />}
    </ShopContainer>
  );
}
