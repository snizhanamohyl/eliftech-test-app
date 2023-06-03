import axios from "axios";

axios.defaults.baseURL = "https://647b7496d2e5b6101db151b5.mockapi.io/api";

export const fetchRestaurants = async () => {
  const response = await axios.get("/restaurants");
  return response.data;
};

export const fetchRestaurantProducts = async (restaurantId) => {
  const response = await axios.get(`/restaurants/${restaurantId}/products`);
  return response.data;
};
