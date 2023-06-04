import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useContext } from "react";
import cartContext from "../context/cartContext";

export default function ProductCard({ product }) {
  const { name, image, description, price } = product;

  const { addProductInCart } = useContext(cartContext);

  return (
    <li>
      <Card maxW="sm">
        <CardBody>
          <Image src={image} alt={name} borderRadius="lg" />
          <Stack mt="6" spacing="3">
            <Heading size="md">{name}</Heading>
            <Text>{description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${price}
            </Text>
          </Stack>
        </CardBody>
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button
              variant="solid"
              colorScheme="blue"
              onClick={() => addProductInCart(product)}
            >
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </li>
  );
}
