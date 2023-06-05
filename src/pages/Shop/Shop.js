import { useEffect, useState } from "react";
import {
  fetchRestaurantProducts,
  fetchRestaurants,
} from "../../services/productsAPI";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import ProductList from "../../components/ProductList/ProductList";
import { ShopContainer } from "./Shop.styled";
import { useContext } from "react";
import cartContext from "../../context/cartContext";

export default function Shop() {
  const [restaurants, setRestaurants] = useState(null);
  const { chosenRestaurant, setChosenRestaurant, setProductsInCart, productsInCart } =
    useContext(cartContext);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const restaurants = await fetchRestaurants();
        setRestaurants(restaurants);
      } catch (error) {
        console.log(error);
      }
    };
    getRestaurants();
  }, []);

  useEffect(() => {
    if (productsInCart?.length === 0) {
      const products = JSON.parse(localStorage.getItem("productsInCart"));
      setProductsInCart(products ? products : []);
    }

    if (!chosenRestaurant) {
      const chosenRestaurant = JSON.parse(
        localStorage.getItem("chosenRestaurant")
      );
      setChosenRestaurant(chosenRestaurant ? chosenRestaurant : null);
    }
  }, [chosenRestaurant, setChosenRestaurant, setProductsInCart, productsInCart]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!restaurants) return;

        if (!chosenRestaurant) {
          setChosenRestaurant(restaurants[0]);
        }

        try {
          const products = await fetchRestaurantProducts(chosenRestaurant.id);
          setProducts(products);
        } catch (error) {
          console.log(error.message);
        }

        // if (chosenRestaurant) {

        // }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [chosenRestaurant, restaurants, setChosenRestaurant]);

  const onRestorauntChange = async (restaurant) => {
    if (restaurant === chosenRestaurant) return;

    setChosenRestaurant(restaurant);

    try {
      const products = await fetchRestaurantProducts(restaurant.id);
      setProducts(products);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ShopContainer>
      {restaurants && (
        <>
          <RestaurantList
            restaurants={restaurants}
            onRestorauntChange={onRestorauntChange}
          />
          {products && <ProductList products={products} />}
        </>
      )}
    </ShopContainer>
  );
}
