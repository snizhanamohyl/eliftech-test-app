import {
  Box,
  FormLabel,
  Input,
  Skeleton,
  IconButton,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FormGroup, FormWrap } from "./ContactForm.styled";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useContext, useEffect, useRef, useState } from "react";
import cartContext from "../../context/cartContext";
import { fetchRestaurantById } from "../../services/productsAPI";

const mapCenter = { lat: 50.44883735581672, lng: 30.524776376140995 };

export default function ContactForm() {
  const { productsInCart } = useContext(cartContext);

  const [chosenRestaurant, setChosenRestaurant] = useState(null);

  const [map, setMap] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");

  const destinationRef = useRef();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBNDbAjkSRW98OwpT0T4bYp0MngD8Bz8fQ",
    libraries: ["places"],
  });

  useEffect(() => {
    if (!productsInCart.length) return;

    const fetchRestaurant = async () => {
      const restaurantId = productsInCart[0].restaurantId;

      const restaurant = await fetchRestaurantById(restaurantId);

      setChosenRestaurant(restaurant);
    };

    fetchRestaurant();
  }, [productsInCart]);

  const calculateRoute = async () => {
    if (destinationRef.current.value === "" || !chosenRestaurant) return;

    // eslint-disable-next-line no-undef
    const directionsServices = new google.maps.DirectionsService();

    const results = await directionsServices.route({
      origin: chosenRestaurant.address,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.value);
    setDuration(results.routes[0].legs[0].duration.value);
  };

  const normalizeDistance = () => {
    if (!distance) return;

    if (distance < 1000) {
      return `${distance} m`;
    } else {
      return `${Math.floor(distance / 100) / 10} km`;
    }
  };

  const normalizeDuration = () => {
    if (!duration) return;

    if (duration < 60) {
      return `${duration} sec`;
    } else if (duration > 60 && duration < 3600) {
      return `${Math.floor(duration / 60)} min`;
    } else {
      return `${Math.floor(duration / 3600)} h ${Math.floor(
        (duration % 3600) / 60
      )} min`;
    }
  };

  // const onInputChange = ({ target }) => {
  //   switch (target.name) {
  //     case "name": {
  //       setName(target.value);
  //       break;
  //     }
  //     case "phone": {
  //       setPhone(target.value);
  //       break;
  //     }
  //     case "email": {
  //       setEmail(target.value);
  //       break;
  //     }
  //     case "address": {
  //       setAddress(target.value);
  //       break;
  //     }
  //     default: {
  //       break;
  //     }
  //   }
  // };

  return (
    <FormWrap>
      <Box
        h={300}
        w={400}
        mb={4}
        borderRadius={5}
        overflow={"hidden"}
        position={"relative"}
      >
        {isLoaded ? (
          <GoogleMap
            center={mapCenter}
            zoom={15}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
            }}
            onLoad={(map) => {
              setMap(map);
            }}
          >
            <IconButton
              icon={<SearchIcon />}
              aria-label="center back"
              position={"absolute"}
              zIndex={10}
              top={2}
              left={2}
              borderRadius={2}
              bgColor={"#FFFFFF"}
              onClick={() => {
                map.panTo(mapCenter);
              }}
            />
            <Button
              position={"absolute"}
              zIndex={10}
              bottom={2}
              right={2}
              bgColor={"#FFFFFF"}
              borderRadius={2}
              onClick={calculateRoute}
            >
              Lay route
            </Button>
            <Marker position={mapCenter} />
            {directionResponse && (
              <DirectionsRenderer directions={directionResponse} />
            )}
          </GoogleMap>
        ) : (
          <Skeleton w={"100%"} h={"100%"} speed={1.5} />
        )}
      </Box>
      <Flex justifyContent={"space-between"} mb={4}>
        <Text>
          <Text fontWeight={500} display={"inline-block"}>
            Distance:
          </Text>{" "}
          {distance ? normalizeDistance() : "close"}
        </Text>
        <Text>
          <Text fontWeight={500} display={"inline-block"}>
            {" "}
            Duration:
          </Text>{" "}
          {duration ? normalizeDuration() : "a bit"}
        </Text>
      </Flex>
      <Text mb={8}>Fill the address field below and lay a route.</Text>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="John"
          type="text"
          name="name"
          isRequired
          // value={name}
          // onChange={onInputChange}
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="johnsnow@mail.com"
          type="email"
          name="email"
          isRequired
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Phone</FormLabel>
        <Input
          placeholder="(786)-986-0989"
          type="tel"
          name="phone"
          isRequired
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>Address</FormLabel>
        {isLoaded ? (
          <Autocomplete>
            <Input
              placeholder="Verbova Street, 4, Kyiv"
              type="text"
              name="address"
              isRequired
              ref={destinationRef}
            />
          </Autocomplete>
        ) : (
          <Input
            placeholder="Verbova Street, 4, Kyiv"
            type="text"
            name="address"
            isRequired
            ref={destinationRef}
          />
        )}
      </FormGroup>
      {/* {showRecaptcha && (
        <ReCAPTCHA
          sitekey="6Ldh_2omAAAAAMmc_xeI43W7t1Q3eNHuv-jbt842"
          onChange={onChange}
          ref={recaptchaRef}
        />
      )} */}
    </FormWrap>
  );
}
