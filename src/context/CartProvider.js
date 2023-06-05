import { useState } from "react";
import cartContext from "./cartContext";
import { useToast } from "@chakra-ui/react";

export default function CartProvider({ children }) {
  const [productsInCart, setProductsInCart] = useState([]);
  const [chosenRestaurant, setChosenRestaurant] = useState(null);
  const toast = useToast();

  const chooseRestaurant = (restaurant) => {
    setChosenRestaurant(restaurant);
    localStorage.setItem("chosenRestaurant", JSON.stringify(restaurant));
  };

  const addProductInCart = (productToAdd) => {
    const productIsInCart = productsInCart.find(
      (product) => product.id === productToAdd.id
    );

    if (productIsInCart) {
      toast({
        title: "The product is already in cart",
        status: "info",
        position: "top-right",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setProductsInCart((prevState) => {
      const updatedProducts = [...prevState, { ...productToAdd, quantity: 1 }];
      localStorage.setItem("productsInCart", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const increaseQuantity = (id) => {
    const updatedProducts = productsInCart.map((product) => {
      return product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    });
    setProductsInCart(updatedProducts);
    localStorage.setItem("productsInCart", JSON.stringify(updatedProducts));
  };

  const decreaseQuantity = (id) => {
    const updatedProducts = productsInCart.map((product) => {
      return product.id === id
        ? { ...product, quantity: product.quantity - 1 }
        : product;
    });
    setProductsInCart(updatedProducts);
    localStorage.setItem("productsInCart", JSON.stringify(updatedProducts));
  };

  const removeProductFromCart = (id) => {
    const index = productsInCart.findIndex((product) => product.id === id);

    const products = [...productsInCart];
    products.splice(index, 1);

    setProductsInCart(products);
    localStorage.setItem("productsInCart", JSON.stringify(products));
  };

  const resetCart = () => {
    setProductsInCart([]);
  };

  return (
    <cartContext.Provider
      value={{
        productsInCart,
        setProductsInCart,
        addProductInCart,
        removeProductFromCart,
        increaseQuantity,
        decreaseQuantity,
        resetCart,
        chosenRestaurant,
        setChosenRestaurant: chooseRestaurant,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
