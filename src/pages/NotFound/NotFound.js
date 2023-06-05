import { Text } from "@chakra-ui/react";

export function NotFound() {
  return (
    <Text textAlign={"center"} fontSize={20} fontWeight={500} py={36}>
      The page you're looking for does not seem to exist :(
    </Text>
  );
}
