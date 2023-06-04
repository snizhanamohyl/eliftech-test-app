import axios from "axios";

const baseURL = "https://6458c0ad4eb3f674df7c3f76.mockapi.io";

export const fetchOrders = async () => {
  const response = await axios.get(`${baseURL}/orders`);
  return response.data;
};

export const addOrder = async (order) => {
  const response = await axios.post(`${baseURL}/orders`, order);
  return response.data;
};
