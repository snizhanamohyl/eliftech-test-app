import {
  CloseButton,
  Flex,
  Heading,
  Image,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Item } from "./CartItem.styled";
import { useContext } from "react";
import cartContext from "../../context/cartContext";

export default function CartItem({ product }) {
  const { id, name, image, description, price, quantity } = product;

  const { removeProductFromCart, increaseQuantity, decreaseQuantity } =
    useContext(cartContext);

  return (
    <Item>
      <Flex align="center" w={720} justify={"space-between"}>
        <Flex align="center">
          <Image src={image} alt={name} borderRadius="lg" width={160} mr={8} />
          <Stack>
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
            <Flex align="center">
              <Text color="blue.600" fontSize="xl" mr={8}>
                ${price}
              </Text>
              <NumberInput value={quantity} min={1} size="sm" w={20}>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper
                    onClick={() => {
                      increaseQuantity(id);
                    }}
                  />
                  <NumberDecrementStepper
                    onClick={() => {
                      decreaseQuantity(id);
                    }}
                  />
                </NumberInputStepper>
              </NumberInput>
              {/* <Text color="blue.600" fontSize="xl" mr={8}>
                Total ${price * quantity}
              </Text> */}
            </Flex>
          </Stack>
        </Flex>
        <CloseButton
          size="lg"
          onClick={() => {
            removeProductFromCart(product.id);
          }}
        />
      </Flex>
    </Item>
  );
}
