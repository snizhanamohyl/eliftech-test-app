import { useState } from "react";
import cartContext from "./cartContext";

export default function CartProvider({ children }) {
  const [productsInCart, setProductsInCart] = useState([]);

  const addProductInCart = (productToAdd) => {
    const productIsInCart = productsInCart.find(
      (product) => product.id === productToAdd.id
    );

    if (productIsInCart) return;

    setProductsInCart((prevState) => [
      ...prevState,
      { ...productToAdd, quantity: 1 },
    ]);
  };

  const increaseQuantity = (id) => {
    const updatedProducts = productsInCart.map((product) => {
      return product.id === id
        ? { ...product, quantity: product.quantity + 1 }
        : product;
    });
    setProductsInCart(updatedProducts);
  };

  const decreaseQuantity = (id) => {
    const updatedProducts = productsInCart.map((product) => {
      return product.id === id
        ? { ...product, quantity: product.quantity - 1 }
        : product;
    });
    setProductsInCart(updatedProducts);
  };

  const removeProductFromCart = (id) => {
    const index = productsInCart.findIndex((product) => product.id === id);

    const products = [...productsInCart];
    products.splice(index, 1);

    setProductsInCart(products);
  };

  const resetCart = () => {
    setProductsInCart([]);
  };

  return (
    <cartContext.Provider
      value={{
        productsInCart,
        addProductInCart,
        removeProductFromCart,
        increaseQuantity,
        decreaseQuantity,
        resetCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
