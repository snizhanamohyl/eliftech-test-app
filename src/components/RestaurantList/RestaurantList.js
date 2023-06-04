import { SideNav, ListItem, Title, Btn } from "./RestaurantList.styled";

export default function RestaurantList({
  restaurants,
  onRestorauntChange,
  chosenRestaurant,
}) {
  return (
    <SideNav>
      <Title>Shops</Title>
      <ul>
        {restaurants?.map((restaurant) => (
          <ListItem key={restaurant.id}>
            <Btn
              // variant="ghost"
              // colorScheme="blue"
              onClick={() => {
                onRestorauntChange(restaurant);
              }}
              isChosen={chosenRestaurant.id === restaurant.id}
            >
              {restaurant.name}
            </Btn>
          </ListItem>
        ))}
      </ul>
    </SideNav>
  );
}
