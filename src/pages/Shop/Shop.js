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
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurants = await fetchRestaurants();
        setRestaurants(restaurants);

        setChosenRestaurant(restaurants[0]);

        const products = await fetchRestaurantProducts(restaurants[0].id);
        setProducts(products);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const onRestorauntChange = async (restaurant) => {
    if (restaurant === chosenRestaurant) return;

    setChosenRestaurant(restaurant);

    const products = await fetchRestaurantProducts(restaurant.id);
    setProducts(products);
  };

  return (
    <ShopContainer>
      <RestaurantList
        restaurants={restaurants}
        chosenRestaurant={chosenRestaurant}
        onRestorauntChange={onRestorauntChange}
      />
      {products && <ProductList products={products} />}
    </ShopContainer>
  );
}
