import { Button } from "@chakra-ui/react";
import { SideNav, ListItem, Title } from "./RestaurantList.styled";

export default function RestaurantList({ restaurants, onRestorauntChange }) {
  return (
    <SideNav>
      <Title>Shops</Title>
      <ul>
        {restaurants?.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <Button
              variant="ghost"
              colorScheme="blue"
              onClick={() => {
                onRestorauntChange(restaurant);
              }}
            >
              {restaurant.name}
            </Button>
          </ListItem>
        ))}
      </ul>
    </SideNav>
  );
}
