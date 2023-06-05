import { useContext } from "react";
import { SideNav, ListItem, Title, Btn } from "./RestaurantList.styled";
import cartContext from "../../context/cartContext";

export default function RestaurantList({ restaurants, onRestorauntChange }) {
  const { chosenRestaurant } = useContext(cartContext);

  return (
    <SideNav>
      <Title>Shops</Title>
      <ul>
        {restaurants.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <Btn
              onClick={() => {
                onRestorauntChange(restaurant);
              }}
              isChosen={chosenRestaurant?.id === restaurant.id}
            >
              {restaurant.name}
            </Btn>
          </ListItem>
        ))}
      </ul>
    </SideNav>
  );
}
