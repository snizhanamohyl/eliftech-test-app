import { FormLabel, Input } from "@chakra-ui/react";
import { FormGroup, FormWrap } from "./ContactForm.styled";

export default function ContactForm() {
  return (
    <FormWrap>
      <FormGroup>
        <FormLabel>Name</FormLabel>
        <Input placeholder="John" type="text" name="name" isRequired />
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
        <Input
          placeholder="Verbova Street, 4, Kyiv"
          type="text"
          name="address"
          isRequired
        />
      </FormGroup>
    </FormWrap>
  );
}
