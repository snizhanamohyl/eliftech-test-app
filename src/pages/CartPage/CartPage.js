import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import CartList from "../../components/CartList/CartList";
import ContactForm from "../../components/ContactForm/ContactForm";
import { CartContainer, Form } from "./CartPage.styled";
import { useContext, useRef, useState } from "react";
import cartContext from "../../context/cartContext";
import { addOrder } from "../../services/ordersAPI";
import BasicUsage from "../../components/Modal/Modal";

export default function CartPage() {
  const { productsInCart, resetCart } = useContext(cartContext);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const formRef = useRef();

  const getTotal = () => {
    const total = productsInCart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    return total;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (productsInCart?.length === 0) {
      alert("Add some products in cart to make an order");
      return;
    }

    setShowRecaptcha(true);

    const contactFormData = new FormData(e.target);
    const contactFormProps = Object.fromEntries(contactFormData);

    const orderInfo = {
      user: contactFormProps,
      products: productsInCart,
    };

    setOrderData(orderInfo);
  };

  async function onChange(value) {
    if (!value) return;

    try {
      await addOrder(orderData);

      formRef.current.reset();
      resetCart();

      setShowRecaptcha(false);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <CartContainer>
      <Form onSubmit={onSubmit} ref={formRef}>
        <Flex justify={"space-between"} mb={8} gap={8}>
          <ContactForm />
          <CartList />
        </Flex>
        <Divider mb={8} />
        <Flex align={"center"}>
          <Text fontSize="xl">
            Total:{" "}
            <Text color="blue.600" fontSize="xl" display={"inline"}>
              ${getTotal()}
            </Text>
          </Text>
          <Button type="submit" ml={"auto"}>
            Submit
          </Button>
        </Flex>
      </Form>
      <BasicUsage showRecaptcha={showRecaptcha} onChange={onChange} />
    </CartContainer>
  );
}
