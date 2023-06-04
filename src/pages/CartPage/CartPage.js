import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import CartList from "../../components/CartList/CartList";
import ContactForm from "../../components/ContactForm/ContactForm";
import { CartContainer, Form } from "./CartPage.styled";
import { useContext } from "react";
import cartContext from "../../context/cartContext";
import { addOrder } from "../../services/ordersAPI";

export default function CartPage() {
  const { productsInCart, resetCart } = useContext(cartContext);

  const getTotal = () => {
    const total = productsInCart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );

    return total;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const contactFormData = new FormData(e.target);
    const contactFormProps = Object.fromEntries(contactFormData);

    const orderData = {
      user: contactFormProps,
      products: productsInCart,
    };

    try {
      addOrder(orderData);
    } catch (error) {
      console.log(error.message);
    }

    e.target.reset();
    resetCart();
  };

  return (
    <CartContainer>
      <Form onSubmit={onSubmit}>
        <Flex justify={"space-between"} mb={8}>
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
    </CartContainer>
  );
}
